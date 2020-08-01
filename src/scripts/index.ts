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
    getGeometricSequencePrice,
    findCodeNameInArr,
    getRandomFromArr,
    sortObj
} from './utils';
import { generateOreParticles } from './OreParticle';
import { generateRisingText } from './RisingText';
import { instantiateTabs, TabName, Tab } from './Tabs';
import { instantiateBuildings } from './Buildings';
import { showTooltip, hideTooltip } from './Tooltip';
import { Toast } from './Toast';
import { instantiateSmithUpgrades } from './SmithUpgrades';
import { instantiateAchievements } from './Achievements';
import { instantiateUpgrades } from './Upgrades';

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
    if (State.stats.rocksDestroyed === 1) winAchievement('Newbie Miner');
    if (State.stats.rocksDestroyed === 10) winAchievement('Novice Miner');
    if (State.stats.rocksDestroyed === 25) winAchievement('Intermediate Miner');
    if (State.stats.rocksDestroyed === 50) winAchievement('Advanced Miner');
    if (State.stats.rocksDestroyed === 100) winAchievement('Master Miner');
    if (State.stats.rocksDestroyed === 200) winAchievement('Chief Miner');
    if (State.stats.rocksDestroyed === 500) winAchievement('Exalted Miner');
    if (State.stats.rocksDestroyed === 1000) winAchievement('God Miner');

    if (State.stats.rocksDestroyed === 1) unlockTab('smith');
};

const generateNewOre = () => {
    State.ore.maxHp *= 1.13;
    State.ore.hp = State.ore.maxHp;
};

const updateComboSign = () => {
    if (!constants.comboSignEl.classList.contains('visible')) instantiateComboSign();
    constants.comboSignNumberEl.innerHTML = `${State.stats.currentCombo}`;
};

const handleOreClick = (event: MouseEvent, weakSpotClick: boolean = false) => {
    let amount = State.opc;

    if (weakSpotClick) {
        amount *= State.stats.weakSpotMultiplier;
        State.stats.weakSpotClicks++;
        State.stats.currentCombo++;

        gainGenerationXp(3);
        generateRisingText(event, 'weakSpot', amount);

        if (State.stats.currentCombo % 5 === 0) generateRisingText(event, 'combo', State.stats.currentCombo);
        if (State.stats.currentCombo > State.stats.highestCombo) State.stats.highestCombo = State.stats.currentCombo;

        if (State.stats.currentCombo === 5) winAchievement('Combo Baby');
        if (State.stats.currentCombo === 20) winAchievement('Combo Pleb');
        if (State.stats.currentCombo === 50) winAchievement('Combo Squire');
        if (State.stats.currentCombo === 100) winAchievement('Combo Knight');
        if (State.stats.currentCombo === 200) winAchievement('Combo King');
        if (State.stats.currentCombo === 350) winAchievement('Combo Master');
        if (State.stats.currentCombo === 666) winAchievement('Combo Devil');
        if (State.stats.currentCombo === 777) winAchievement('Combo Jackpot');
        if (State.stats.currentCombo === 1000) winAchievement('Combo God');
        if (State.stats.currentCombo === 5000) winAchievement('Combo Saiyan');
        if (State.stats.currentCombo === 10000) winAchievement('Combo Saitama');
        generateWeakSpot();
    } else {
        if (State.stats.currentCombo > 0) {
            State.stats.currentCombo = 0;
        }
        gainGenerationXp(1);
        generateRisingText(event, null, amount);
    }

    if (amount >= 100) winAchievement('Not Even A Scratch');
    if (amount >= 1_000) winAchievement('Didnt Even Hurt');
    if (amount >= 100_000) winAchievement('That Tickled');
    if (amount >= 1_000_000) winAchievement('I Felt That');

    updateComboSign();
    gainOre(amount);
    generateOreParticles(event);

    State.stats.oreClicks++;
};

const generateWeakSpot = () => {
    let weakSpot = select('.weak-spot');
    if (!weakSpot) {
        weakSpot = createEl('div', ['weak-spot']);
        weakSpot.addEventListener('click', (event: MouseEvent) => handleOreClick(event, true));
        constants.oreSpriteContainerEl.append(weakSpot);
    }

    const x = getRandomNum(0, constants.oreSpriteContainerEl.offsetWidth - 20);
    const y = getRandomNum(0, constants.oreSpriteContainerEl.offsetHeight - 20);

    weakSpot.style.left = x + 'px';
    weakSpot.style.bottom = y + 'px';
};

const winAchievement = (achievementName: string) => {
    const achievement = State.achievements[achievementName];
    achievement.win();
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
            constants.oreHpEl.innerHTML = `${formatNumber(getPercentage(State.ore.hp, State.ore.maxHp))}%`;
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

    if (ops >= 50) winAchievement('Ore-aid Stand');
    if (ops >= 10000) winAchievement('Ore Store');
    if (ops >= 401000) winAchievement('401k');
    if (ops >= 5_000_000) winAchievement('Retirement Plan');
    if (ops >= 1_000_000_000) winAchievement('Hedge Fund');

    UpdatesState.updateOPS = false;
};

const changeBuyAmount = (amount) => {
    InstanceState.buyAmount = amount;
    UpdatesState.updateTabContent = true;
};

const updateStorePriceClasses = () => {
    InstanceState.buildings.forEach((building) => {
        if (!building.isHidden && !building.isLocked) {
            const buildingPriceEl = document.querySelector(`.building-${building.codeName} .building-price`);
            if (State.inventory.ores >= getGeometricSequencePrice(building)) {
                if (buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.remove('not-enough');
            } else {
                if (!buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.add('not-enough');
            }
        }
    });

    for (const upgrade in State.upgrades) {
        const u = State.upgrades[upgrade];
        if (!u.isLocked && !u.isOwned) {
            const upgradeEl = document.querySelector(`.upgrade-${u.codeName}`);
            if (State.inventory.ores >= u.price) {
                if (upgradeEl.classList.contains('not-enough')) upgradeEl.classList.remove('not-enough');
            } else {
                if (!upgradeEl.classList.contains('not-enough')) upgradeEl.classList.add('not-enough');
            }
        }
        // console.log('upgrade', State.upgrades[upgrade]);
    }
};

// - -----------------------------------------------------------------------------------
// - SMITH STUFF -----------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

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
    tabProgressBar.style.filter = `grayscale( ${100 - percentage}% )`;

    if (InstanceState.selectedTab === 'smith') {
        if (percentage >= 100) {
            UpdatesState.updateTabContent = true;
            return;
        }

        const progressBar = select('.smith-progress-bar .bar');

        progressBar.style.filter = `grayscale( ${100 - percentage}% )`;
        progressBar.style.width = percentage + '%';
    }
};

export const completeSmithUpgrade = (codeName: string) => {
    InstanceState.smithUpgrades.forEach((upgrade) => {
        if (upgrade.codeName === codeName) {
            upgrade.isOwned = true;

            switch (codeName) {
                case 'fragilitySpectacles':
                    generateWeakSpot();
                    break;
                case 'smithPowerUp':
                    State.smith.maxPower *= 1.5;
                    break;
                default:
                    console.log('default case firing', codeName);
            }

            return;
        }
    });
};

const updateSmithPower = (power) => {
    const el = select('.smith-power');
    State.smith.power = power;
    el.innerHTML = power;
};

// - -----------------------------------------------------------------------------------
// - TAB BUILD STUFF -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const updateTabs = (): void => {
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

const updateTabContent = (): void => {
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

    const upgradesContainer = buildUpgrades();
    const buyAmountContainer = buildBuyAmountContainer();
    const buildingsContainer = buildBuildings();

    if (upgradesContainer.innerHTML) storeTabContainer.append(upgradesContainer);
    storeTabContainer.append(buyAmountContainer);
    storeTabContainer.append(buildingsContainer);

    return storeTabContainer;
};

const buildUpgrades = (): HTMLElement => {
    const upgradesContainer = createEl('div', ['upgrades-container']);
    upgradesContainer.addEventListener('mouseenter', () => resizeUpgradesContainer('enter'));
    upgradesContainer.addEventListener('mouseleave', () => resizeUpgradesContainer('leave'));

    sortObj(State.upgrades, 'price')
        .filter((upgrade: any) => !upgrade[1].isOwned && !upgrade[1].isLocked)
        .forEach((upgrade: any) => {
            const upgradeEl = createEl(
                'div',
                ['upgrade', `upgrade-${upgrade[1].codeName}`, `${State.inventory.ores < upgrade[1].price && 'not-enough'}`],
                `
                <img src='./images/upgrade-${upgrade[1].codeName}.png'/>
            `
            );
            upgradeEl.addEventListener('mousemove', (event: MouseEvent) => upgrade[1].mousemove(event));
            upgradeEl.addEventListener('mouseleave', (event: MouseEvent) => hideTooltip());
            upgradesContainer.append(upgradeEl);
        });

    return upgradesContainer;
};

const resizeUpgradesContainer = (type: 'enter' | 'leave') => {
    const upgradesContainer: HTMLElement = select('.upgrades-container');
    if (type === 'enter') upgradesContainer.style.height = upgradesContainer.scrollHeight + 'px';
    if (type === 'leave') upgradesContainer.style.height = '60px';
};

const buildBuildings = (): HTMLElement => {
    const buildingsContainer = createEl('div', ['buildings-container']);

    InstanceState.buildings
        .filter((building) => !building.isHidden)
        .forEach((building) => {
            const buildingEl = createEl('div', ['building', `building-${building.codeName}`, `${building.isLocked && 'locked'}`]);
            const price = getGeometricSequencePrice(building);

            let str = `<img class='building-img' src='./images/building-${building.codeName}.png' />`;

            if (!building.isLocked) {
                str += `
                    <div class='building-left'>
                        <p class='building-name'>${building.name} ${InstanceState.buyAmount != 1 ? `x${InstanceState.buyAmount}` : ''}</p>
                        <p class='building-price'>
                            <img src='./images/ore.png' />
                            ${beautifyNumber(price)}
                        </p>
                    </div>
                    <p class='building-owned'>${building.owned}</p>
                `;
            }

            buildingEl.innerHTML = str;

            if (!building.isLocked) {
                buildingEl.addEventListener('click', (event) => building.buy(event));
                buildingEl.addEventListener('mousemove', (event) => building.mousemove(event));
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

const buildSmithTabContent = (): HTMLElement => {
    const smithTabContentContainer = createEl('div', ['tab-content', 'tab-content-smith']);
    const underTabBar = createEl('div', ['under-tab-bar']);

    const smithSettingsContainer = buildSmithSettings();
    const smithProgressContainer = State.smith.inProgress ? buildSmithProgressContainer() : '';
    const smithUpgradesContainer = buildSmithUpgrades();

    smithTabContentContainer.append(underTabBar);
    smithTabContentContainer.append(smithSettingsContainer);
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
        `
    );

    const collectBtn = createEl('button', ['collect-btn'], 'COLLECT');
    collectBtn.addEventListener('click', () => upgrade.complete());

    const smithProgressBottom =
        percentage >= 100
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
    upgradeImg.src = `./images/smithUpgrade-${upgrade.codeName}.png`;

    smithProgressContainer.append(upgradeImg);
    smithProgressContainer.append(div);

    return smithProgressContainer;
};

const buildSmithUpgrades = (): HTMLElement => {
    const smithUpgradesWrapper = createEl('div', ['smith-upgrades-wrapper']);

    const availableUpgradesHeader = createEl('p', ['smith-header-text'], 'Available Upgrades');
    const lockedUpgradesHeader = createEl('p', ['smith-header-text', 'small'], 'Locked Upgrades');
    const ownedUpgradesHeader = createEl('p', ['smith-header-text', 'small'], 'Owned Upgrades');

    const smithAvailableUpgradesContainer = createEl('div', ['smith-upgrades-container', 'available-smith-upgrades-container']);
    const smithLockedUpgradesContainer = createEl('div', ['smith-upgrades-container', 'locked-smith-upgrades-container']);
    const smithOwnedUpgradesContainer = createEl('div', ['smith-upgrades-container', 'owned-smith-upgrades-container']);

    let hasAvailableUpgrades = false;
    let hasLockedUpgrades = false;
    let hasOwnedUpgrades = false;

    InstanceState.smithUpgrades.forEach((upgrade) => {
        const upgradeEl = createEl('div', ['smith-upgrade']);
        const upgradeImg = document.createElement('img');
        upgradeImg.src = `./images/smithUpgrade-${upgrade.codeName}.png`;

        upgradeEl.append(upgradeImg);

        if (upgrade.isNew) {
            const newText = createEl('p', ['new'], 'New!');
            upgradeEl.append(newText);
        }

        if (
            (!upgrade.isLocked && !upgrade.isOwned && !upgrade.isInProgress) ||
            (upgrade.isRepeatable && !upgrade.isLocked && !upgrade.isInProgress)
        ) {
            hasAvailableUpgrades = true;
            upgradeEl.addEventListener('click', (event) => upgrade.buy(event));
            upgradeEl.addEventListener('mouseover', (event) => upgrade.removeNew(event));
            upgradeEl.addEventListener('mousemove', (event) => showTooltip(event, { type: 'smithUpgrade', smithUpgrade: upgrade }));
            upgradeEl.addEventListener('mouseleave', () => hideTooltip());
            smithAvailableUpgradesContainer.append(upgradeEl);
        } else if (upgrade.isLocked) {
            hasLockedUpgrades = true;
            smithLockedUpgradesContainer.append(upgradeEl);
        } else if (upgrade.isOwned) {
            hasOwnedUpgrades = true;
            upgradeEl.addEventListener('mousemove', (event) => showTooltip(event, { type: 'smithUpgrade', smithUpgrade: upgrade }));
            upgradeEl.addEventListener('mouseleave', () => hideTooltip());
            smithOwnedUpgradesContainer.append(upgradeEl);
        }
    });

    if (hasAvailableUpgrades) {
        smithUpgradesWrapper.append(availableUpgradesHeader);
        smithUpgradesWrapper.append(smithAvailableUpgradesContainer);
    }

    // if (hasLockedUpgrades) {
    //     smithUpgradesWrapper.append(lockedUpgradesHeader);
    //     smithUpgradesWrapper.append(smithLockedUpgradesContainer);
    // }

    if (hasOwnedUpgrades) {
        smithUpgradesWrapper.append(ownedUpgradesHeader);
        smithUpgradesWrapper.append(smithOwnedUpgradesContainer);
    }

    return smithUpgradesWrapper;
};

const buildSmithSettings = (): HTMLElement => {
    const el = createEl(
        'div',
        ['smith-settings-container'],
        `
        <p class='smith-power-text'>Smith Power</p>
        <p class='smith-power'>${State.smith.power}</p>
    `
    );

    const inputRange = document.createElement('input');
    inputRange.classList.add('smith-slider');
    inputRange.type = 'range';
    inputRange.min = '0';
    inputRange.max = `${State.smith.maxPower}`;
    inputRange.value = `${State.smith.power}`;
    inputRange.step = '1';
    inputRange.addEventListener('input', (e: any) => updateSmithPower(e.target.value));

    el.append(inputRange);

    return el;
};

// - -----------------------------------------------------------------------------------
// - TEXT SCROLLER ---------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const startTextScroller = () => {
    const selectedMessage = getRandomFromArr(State.textScrollerMessages);
    constants.textScrollerTextEl.innerHTML = selectedMessage;
    InstanceState.textScroller.isInProgress = true;
};

const moveTextInScroller = () => {
    const speed = State.settings.tick === 30 ? 2 : 1;
    const currentLeft = constants.textScrollerTextEl.offsetLeft;

    constants.textScrollerTextEl.style.left = currentLeft - speed + 'px';

    if (currentLeft + constants.textScrollerTextEl.offsetWidth <= 0) {
        constants.textScrollerTextEl.innerHTML = '';
        constants.textScrollerTextEl.style.left = '100%';
        InstanceState.textScroller.isInProgress = false;
        startTextScroller();
    }
};

// - -----------------------------------------------------------------------------------
// - INIT STUFF ------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

let tick = 0;
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
        updateStorePriceClasses();
    }

    if (InstanceState.textScroller.isInProgress) moveTextInScroller();
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

    tick++;
    if (tick >= State.settings.tick) {
        tick = 0;
        if (State.ops > 0) generateRisingText(null, 'buildingOps', State.ops);
    }
};

const initiateCanvasParticles = () => {
    constants.particlesCanvasEl.height = window.innerHeight;
    constants.particlesCanvasEl.width = window.innerWidth;
};

const instantiateComboSign = () => {
    if (State.stats.highestCombo >= 5) {
        constants.comboSignEl.classList.add('visible');
    }
};

const initialLoad = () => {
    initiateCanvasParticles();
    instantiateTabs();
    instantiateBuildings();
    instantiateSmithUpgrades();
    instantiateAchievements();
    instantiateComboSign();
    instantiateUpgrades();

    constants.oreSpriteEl.onclick = handleOreClick;

    // ! DELETE LATER - TESTING
    startTextScroller();

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
requestAnimationFrame(function loop() {
    now = Date.now();
    fps = Math.round(1000 / (now - before));
    before = now;
    requestAnimationFrame(loop);
    fpsEl.innerHTML = fps;
});
