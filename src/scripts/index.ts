import { State, InstanceState } from './State';
import { UpdatesState } from './Updates';

import * as constants from './constants';
import {
    select,
    getPercentage,
    formatNumber,
    getRandomNum,
    removeEl,
    updateEl,
    createEl,
    beautifyNumber,
    getGeometricSequencePrice
} from './utils';
import { generateOreParticles } from './OreParticle';
import { generateRisingText } from './RisingText';
import { instantiateTabs, TabName, Tab } from './Tabs';
import { instantiateBuildings } from './Buildings';
import { showTooltip, hideTooltip } from './Tooltip';
import { Toast } from './Toast';
import { instantiateSmithUpgrades } from './SmithUpgrades';

const gainOre = (amount: number, damageOre: boolean = true) => {
    State.inventory.ores += amount;

    if (damageOre) handleOreDamage(amount);
    UpdatesState.updateOres = true;
};

export const spend = (amount: number, type: 'ores' | 'refined' = 'ores'): boolean => {
    if (State.inventory[type] >= amount) {
        State.inventory.ores -= amount;
        return true;
    }

    return false;
};

const handleOreDamage = (damage: number) => {
    State.ore.hp -= damage;

    if (State.ore.hp <= 0) handleBrokenOre();

    UpdatesState.updateOreSprite = true;
    UpdatesState.updateOreHp = true;
};

const handleBrokenOre = () => {
    gainGenerationXp(50);
    generateNewOre();
    State.ore.spriteType = getRandomNum(1, 5);
    State.stats.rocksDestroyed++;

    if (State.stats.rocksDestroyed === 1) unlockTab('smith');
};

const generateNewOre = () => {
    State.ore.maxHp *= 1.13;
    State.ore.hp = State.ore.maxHp;
};

const handleOreClick = (event: MouseEvent) => {
    gainOre(State.opc);
    gainGenerationXp(1);
    generateOreParticles(event);
    generateRisingText(event, null, State.opc);

    State.stats.oreClicks++;
};

// - -----------------------------------------------------------------------------------
// - GENERATION STUFF ------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const gainGenerationXp = (amount: number) => {
    State.generation.xp += amount;
    if (State.generation.xp >= State.generation.maxXp) handleGenerationLvlUp();
    UpdatesState.updateGenerationXp = true;
};

const handleGenerationLvlUp = () => {
    State.generation.maxXp *= 1.15;
    State.generation.xp = 0;
    State.generation.lvOnRefine += 1;

    UpdatesState.updateGenerationLvOnRefine = true;
};

// - -----------------------------------------------------------------------------------
// - UPDATES ---------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const updateOres = () => {
    let str = beautifyNumber(State.inventory.ores);

    if (State.ops > 0) {
        str += ` <span class='ops'>(${State.ops}/s)</span>`;
    }

    constants.topbarInventoryOresEl.innerHTML = `${str}`;

    UpdatesState.updateOres = false;
};

const updateOreHp = () => {
    switch (State.settings.oreHpType) {
        case 'percentage':
            constants.oreHpEl.innerHTML = `${formatNumber(getPercentage(State.ore.hp, State.ore.maxHp))}`;
            break;
        case 'number':
            constants.oreHpEl.innerHTML = `${formatNumber(State.ore.hp)}/${formatNumber(State.ore.maxHp)}`;
            break;
        case 'none':
        default:
            return;
    }
    UpdatesState.updateOreHp = false;
};

const updateOreSprite = () => {
    constants.oreSpriteEl.src = `./images/ore${State.ore.spriteType}-${State.ore.spriteHp}.png`;

    const differentOreSprites = 5;
    const percentage = getPercentage(State.ore.hp, State.ore.maxHp);
    const calcSprite = Math.min(differentOreSprites, 6 - Math.ceil(percentage / 20));

    if (State.ore.spriteHp !== calcSprite) {
        State.ore.spriteHp = calcSprite;
        constants.oreSpriteEl.src = `./images/ore${State.ore.spriteType}-${State.ore.spriteHp}.png`;
        generateOreParticles(null, 5);
    }

    UpdatesState.updateOreSprite = false;
};

const updateGenerationLv = () => {
    constants.topbarInventoryGenerationLv.innerHTML = `${State.generation.lv}`;
    UpdatesState.updateGenerationLv = false;
};

const updateGenerationLvOnRefine = () => {
    if (State.generation.lv < State.generation.lvOnRefine) {
        constants.topbarInventoryGenerationLvOnRefine.innerHTML = `(${State.generation.lvOnRefine})`;
    }
    UpdatesState.updateGenerationLvOnRefine = false;
};

const updateGenerationXp = () => {
    constants.topbarInventoryGenerationXpBarEl.style.width = getPercentage(State.generation.xp, State.generation.maxXp) + '%';
    UpdatesState.updateGenerationXp = false;
};

export const updateOPS = () => {
    let ops = 0;

    InstanceState.buildings.forEach((b) => {
        ops += b.production * b.owned;
    });

    State.ops = ops;
    UpdatesState.updateOPS = false;
};

const changeBuyAmount = (amount) => {
    InstanceState.buyAmount = amount;
    UpdatesState.updateTabContent = true;
};

const updateBuildingPriceClass = () => {
    InstanceState.buildings
        .filter((building) => !building.isHidden && !building.isLocked)
        .forEach((building) => {
            const buildingPriceEl = document.querySelector(`.building-${building.codeName} .building-price`);
            if (State.inventory.ores >= getGeometricSequencePrice(building)) {
                if (buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.remove('not-enough');
            } else {
                if (!buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.add('not-enough');
            }
        });
};

// - -----------------------------------------------------------------------------------
// - TAB BUILD STUFF -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const updateTabs = () => {
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    InstanceState.tabs
        .filter((tab: Tab) => !tab.isLocked)
        .forEach((tab: Tab) => {
            const tabEl = createEl('div', ['tab', `tab-${tab.codeName}`]);

            tabEl.addEventListener('click', () => changeTab(tab.codeName));

            if (InstanceState.selectedTab === tab.codeName) tabEl.classList.add('tab-selected');

            tabEl.innerHTML = tab.name;
            if (tab.codeName === 'smith' && State.smith.inProgress) {
                tabEl.innerHTML = `
                    ${tab.name}
                    <div class='smith-tab-progress-bar'>
                        <div class='bar'></div>
                    </div>
                `;
            }

            tabsContainer.append(tabEl);
        });

    updateEl(constants.tabsWrapperEl, tabsContainer);

    UpdatesState.updateTabs = false;
};

const changeTab = (tab: TabName): void => {
    if (InstanceState.selectedTab !== tab) {
        InstanceState.selectedTab = tab;
        UpdatesState.updateTabs = true;
        updateTabContent();
    }
};

const unlockTab = (tabName: string): void => {
    InstanceState.tabs.forEach((tab) => {
        if (tab.codeName === tabName) {
            tab.isLocked = false;
            UpdatesState.updateTabs = true;
            return;
        }
    });
};

const updateTabContent = () => {
    const tabsContentContainer = document.createElement('div');
    tabsContentContainer.classList.add('tabs-content-container');

    let tabContent;

    switch (InstanceState.selectedTab) {
        case 'store':
            tabContent = buildStoreTabContent();
            break;
        case 'smith':
            tabContent = buildSmithTabContent();
            break;
        default:
            console.log('not built yet');
    }

    tabsContentContainer.append(tabContent);
    updateEl(constants.tabsContentWrapperEl, tabsContentContainer);

    UpdatesState.updateTabContent = false;
};

const buildStoreTabContent = (): HTMLElement => {
    const storeTabContainer = createEl('div', ['tab-content', 'tab-content-store']);

    const buyAmountContainer = buildBuyAmountContainer();
    const buildingsContainer = buildBuildings();

    storeTabContainer.append(buyAmountContainer);
    storeTabContainer.append(buildingsContainer);

    return storeTabContainer;
};

const buildBuildings = (): HTMLElement => {
    const buildingsContainer = createEl('div', ['buildings-container']);

    InstanceState.buildings
        .filter((building) => !building.isHidden)
        .forEach((building) => {
            const buildingEl = createEl('div', ['building', `building-${building.codeName}`, `${building.isLocked && 'locked'}`]);
            const price = getGeometricSequencePrice(building);

            let str = `<img class='building-img' src='./../images/building-${building.codeName}.png' />`;

            if (!building.isLocked) {
                str += `
                    <div class='building-left'>
                        <p class='building-name'>${building.name} ${InstanceState.buyAmount != 1 ? `x${InstanceState.buyAmount}` : ''}</p>
                        <p class='building-price'>
                            <img src='./../images/ore.png' />
                            ${beautifyNumber(price)}
                        </p>
                    </div>
                    <p class='building-owned'>${building.owned}</p>
                `;
            }

            buildingEl.innerHTML = str;

            if (!building.isLocked) {
                buildingEl.addEventListener('click', (event) => building.buy(event));
                buildingEl.addEventListener('mousemove', (event) => showTooltip(event, { type: 'building', building }));
                buildingEl.addEventListener('mouseleave', () => hideTooltip());
            }

            buildingsContainer.append(buildingEl);
        });

    return buildingsContainer;
};

const buildBuyAmountContainer = (): HTMLElement => {
    const buyAmountContainer = document.createElement('div');
    buyAmountContainer.classList.add('buy-amount-container');

    const buyAmountText = createEl('p', ['buy-amount-text'], 'Buy Amount');

    const buyAmounts = document.createElement('div');
    buyAmounts.classList.add('buy-amounts');

    const buyAmountChoices = [1, 10, 100, 'max'];
    buyAmountChoices.forEach((amount) => {
        const buyAmount = createEl('p', ['buy-amount'], amount);
        buyAmount.addEventListener('click', () => changeBuyAmount(amount));
        if (amount === InstanceState.buyAmount) {
            buyAmount.classList.add('selected');
        }
        buyAmounts.append(buyAmount);
    });

    buyAmountContainer.append(buyAmountText);
    buyAmountContainer.append(buyAmounts);

    return buyAmountContainer;
};

const buildSmithTabContent = () => {
    const smithTabContentContainer = createEl('div', ['tab-content', 'tab-content-smith']);
    const underTabBar = createEl('div', ['under-tab-bar']);

    const smithProgressContainer = State.smith.inProgress ? buildSmithProgressContainer() : '';
    const smithUpgradesContainer = buildSmithUpgrades();

    smithTabContentContainer.append(underTabBar);
    smithTabContentContainer.append(smithProgressContainer);
    smithTabContentContainer.append(smithUpgradesContainer);

    return smithTabContentContainer;
};

const buildSmithProgressContainer = (): HTMLElement => {
    const smithProgressContainer = createEl('div', ['smith-progress-container']);
    const upgrade = State.smith.currentUpgrade;
    const percentage = getPercentage(State.smith.currentProgress, upgrade.powerNeeded);

    const smithProgressTopEl = createEl(
        'div',
        ['smith-progress-top'],
        `
        <p class='smith-upgrade-name'>${upgrade.name}</p>
        <p class='smith-progress-percentage'>${beautifyNumber(percentage)}%</p>
        `
    );

    const collectBtn = createEl('button', ['collect-btn'], 'COLLECT');
    collectBtn.addEventListener('click', () => upgrade.complete());

    const smithProgressBottom =
        percentage > 100
            ? collectBtn
            : createEl(
                  'div',
                  ['smith-progress-bar'],
                  ` <div class='smith-progress-bar'>
                        <div class='bar'></div>
                    </div>`
              );

    const div = createEl('div');
    div.append(smithProgressTopEl);
    div.append(smithProgressBottom);

    const upgradeImg = document.createElement('img');
    upgradeImg.src = `./../images/smithUpgrade-${upgrade.codeName}.png`;

    smithProgressContainer.append(upgradeImg);
    smithProgressContainer.append(div);

    return smithProgressContainer;
};

const updateSmithProgress = () => {
    if (State.smith.currentProgress >= State.smith.currentUpgrade.powerNeeded) return;

    const powerPerTick = State.smith.power / State.settings.tick;

    if (spend(powerPerTick)) {
        State.smith.currentProgress += powerPerTick;

        updateSmithProgressBar();
    }
};

const updateSmithProgressBar = () => {
    const tabProgressBar = select('.smith-tab-progress-bar .bar');
    const percentage = getPercentage(State.smith.currentProgress, State.smith.currentUpgrade.powerNeeded);

    tabProgressBar.style.width = percentage + '%';

    if (InstanceState.selectedTab === 'smith') {
        if (percentage > 100) {
            UpdatesState.updateTabContent = true;
            return;
        }

        const progressBar = select('.smith-progress-bar .bar');
        const progressPercentage = select('.smith-progress-percentage');

        progressBar.style.width = percentage + '%';
        progressPercentage.innerHTML = beautifyNumber(percentage) + '%';
    }
};

const buildSmithUpgrades = (): HTMLElement => {
    const smithUpgradesContainer = createEl('div', ['smith-upgrades-container']);

    InstanceState.smithUpgrades
        .filter((upgrade) => !upgrade.isLocked && !upgrade.isInProgress)
        .forEach((upgrade) => {
            const upgradeEl = createEl('div', ['smith-upgrade']);

            let str = `
                <img src='./../images/smithUpgrade-${upgrade.codeName}.png'/>
                <div>
                    <p class='smith-upgrade-name'>${upgrade.name}</p>
                    <p class='smith-upgrade-cost'>
                        <img src='./../images/refined-ore.png' />
                        ${upgrade.cost > 0 ? upgrade.cost : 'FREE'}
                    </p>
                </div>
            `;

            upgradeEl.addEventListener('click', () => upgrade.buy());

            upgradeEl.innerHTML = str;
            smithUpgradesContainer.append(upgradeEl);
        });

    return smithUpgradesContainer;
};

// - -----------------------------------------------------------------------------------
// - INIT STUFF ------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const gameLoop = () => {
    if (UpdatesState.updateOres) updateOres();
    if (UpdatesState.updateOreHp) updateOreHp();
    if (UpdatesState.updateOreSprite) updateOreSprite();
    if (UpdatesState.updateGenerationLv) updateGenerationLv();
    if (UpdatesState.updateGenerationXp) updateGenerationXp();
    if (UpdatesState.updateGenerationLvOnRefine) updateGenerationLvOnRefine();
    if (UpdatesState.updateTabs) updateTabs();
    if (UpdatesState.updateTabContent) updateTabContent();
    if (UpdatesState.updateOPS) updateOPS();

    if (InstanceState.selectedTab === 'store') {
        updateBuildingPriceClass();
    }

    if (State.smith.inProgress) updateSmithProgress();

    gainOre(State.ops / State.settings.tick, false);

    if (Object.keys(InstanceState.oreParticles).length > 0) {
        constants.particlesCanvasContext.clearRect(
            0,
            0,
            constants.particlesCanvasContext.canvas.width,
            constants.particlesCanvasContext.canvas.height
        );
        for (let i in InstanceState.oreParticles) InstanceState.oreParticles[i].draw();
    }
};

const initiateCanvasParticles = () => {
    constants.particlesCanvasEl.height = window.innerHeight;
    constants.particlesCanvasEl.width = window.innerWidth;
};

const initialLoad = () => {
    initiateCanvasParticles();
    instantiateTabs();
    instantiateBuildings();
    instantiateSmithUpgrades();
    constants.oreSpriteEl.onclick = handleOreClick;

    setInterval(gameLoop, 1000 / State.settings.tick);
};

window.onload = () => initialLoad();

// - -----------------------------------------------------------------------------------
// - TESTING PURPOSES -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

var before, now, fps;
let fpsEl: HTMLElement = document.querySelector('.fps');
fpsEl.style.zIndex = '5';
before = Date.now();
fps = 0;
requestAnimationFrame(function loop() {
    now = Date.now();
    fps = Math.round(1000 / (now - before));
    before = now;
    requestAnimationFrame(loop);
    fpsEl.innerHTML = fps;
});
