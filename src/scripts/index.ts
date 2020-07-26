import { State, InstanceState } from './State';
import { UpdatesState } from './Updates';

import {
    pageContainer,
    oreSpriteEl,
    topbarInventoryOresEl,
    oreHpEl,
    topbarInventoryGenerationLv,
    topbarInventoryGenerationLvOnRefine,
    topbarInventoryGenerationXpBarEl,
    particlesCanvasEl,
    particlesCanvasContext as ctx,
    tabsWrapperEl,
    tabsContentWrapperEl
} from './elements';
import {
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

const gainOre = (amount: number, damageOre: boolean = true) => {
    State.inventory.ores += amount;

    if (damageOre) handleOreDamage(amount);
    UpdatesState.updateOres = true;
};

export const spend = (amount: number): boolean => {
    if (State.inventory.ores >= amount) {
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

    topbarInventoryOresEl.innerHTML = str;

    UpdatesState.updateOres = false;
};

const updateOreHp = () => {
    switch (State.settings.oreHpType) {
        case 'percentage':
            oreHpEl.innerHTML = formatNumber(getPercentage(State.ore.hp, State.ore.maxHp));
            break;
        case 'number':
            oreHpEl.innerHTML = `${formatNumber(State.ore.hp)}/${formatNumber(State.ore.maxHp)}`;
            break;
        case 'none':
        default:
            return;
    }
    UpdatesState.updateOreHp = false;
};

const updateOreSprite = () => {
    oreSpriteEl.src = `./images/ore${State.ore.spriteType}-${State.ore.spriteHp}.png`;

    const differentOreSprites = 5;
    const percentage = getPercentage(State.ore.hp, State.ore.maxHp);
    const calcSprite = Math.min(differentOreSprites, 6 - Math.ceil(percentage / 20));

    if (State.ore.spriteHp !== calcSprite) {
        State.ore.spriteHp = calcSprite;
        oreSpriteEl.src = `./images/ore${State.ore.spriteType}-${State.ore.spriteHp}.png`;
        generateOreParticles(null, 5);
    }

    UpdatesState.updateOreSprite = false;
};

const updateGenerationLv = () => {
    topbarInventoryGenerationLv.innerHTML = State.generation.lv;
    UpdatesState.updateGenerationLv = false;
};

const updateGenerationLvOnRefine = () => {
    if (State.generation.lv < State.generation.lvOnRefine) {
        topbarInventoryGenerationLvOnRefine.innerHTML = `(${State.generation.lvOnRefine})`;
    }
    UpdatesState.updateGenerationLvOnRefine = false;
};

const updateGenerationXp = () => {
    topbarInventoryGenerationXpBarEl.style.width = getPercentage(State.generation.xp, State.generation.maxXp) + '%';
    UpdatesState.updateGenerationXp = false;
};

const updateOPS = () => {
    let ops = 0;

    State.buildings.forEach((b) => {
        ops += b.baseProduction * b.owned;
    });

    State.ops = ops;
    UpdatesState.updateOPS = false;
};

const updateTabs = () => {
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    State.tabs
        .filter((tab: Tab) => !tab.isLocked)
        .forEach((tab: Tab) => {
            const tabEl = document.createElement('div');
            tabEl.addEventListener('click', () => changeTab(tab.codeName));

            tabEl.classList.add('tab', `tab-${tab.codeName}`);
            if (InstanceState.selectedTab === tab.codeName) tabEl.classList.add('tab-selected');
            tabEl.innerHTML = tab.name;

            tabsContainer.append(tabEl);
        });

    updateEl(tabsWrapperEl, tabsContainer);

    UpdatesState.updateTabs = false;
};

const changeTab = (tab: TabName) => {
    InstanceState.selectedTab = tab;
    UpdatesState.updateTabs = true;
    updateTabContent();
};

const updateTabContent = () => {
    const tabsContentContainer = document.createElement('div');
    tabsContentContainer.classList.add('tabs-content-container');

    let tabContent;

    switch (InstanceState.selectedTab) {
        case 'store':
            tabContent = buildStoreTabContent();
            break;
        default:
            console.log('not built yet');
    }

    tabsContentContainer.append(tabContent);
    updateEl(tabsContentWrapperEl, tabsContentContainer);

    UpdatesState.updateTabContent = false;
};

const buildStoreTabContent = () => {
    const storeTabContainer = createEl('div', ['tab-content', 'tab-content-store']);

    const buyAmountContainer = buildBuyAmountContainer();
    const buildingsContainer = buildBuildings();

    storeTabContainer.append(buyAmountContainer);
    storeTabContainer.append(buildingsContainer);

    return storeTabContainer;
};

const buildBuyAmountContainer = () => {
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

const changeBuyAmount = (amount) => {
    InstanceState.buyAmount = amount;
    UpdatesState.updateTabContent = true;
};

const buildBuildings = () => {
    const buildingsContainer = createEl('div', ['buildings-container']);

    State.buildings.forEach((building) => {
        const price = getGeometricSequencePrice(building);

        let str = `
            <img class='building-img' src='./../images/building-${building.codeName}.png' />
            <div class='building-left'>
                <p class='building-name'>${building.name} ${InstanceState.buyAmount != 1 ? `x${InstanceState.buyAmount}` : ''}</p>
                <p class='building-price'>
                    <img src='./../images/ore.png' />
                    ${beautifyNumber(price)}
                </p>
            </div>
            <p class='building-owned'>${building.owned}</p>
        `;

        let buildingEl = createEl('div', ['building', `building-${building.codeName}`], str);
        buildingEl.addEventListener('click', (event) => building.buy(event));
        buildingEl.addEventListener('mousemove', (event) => showTooltip(event, { type: 'building', building }));
        buildingEl.addEventListener('mouseleave', () => hideTooltip());

        buildingsContainer.append(buildingEl);
    });

    return buildingsContainer;
};

const updateBuildingPriceClass = () => {
    State.buildings.forEach((building) => {
        const buildingPriceEl = document.querySelector(`.building-${building.codeName} .building-price`);
        if (State.inventory.ores >= getGeometricSequencePrice(building)) {
            if (buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.remove('not-enough');
        } else {
            if (!buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.add('not-enough');
        }
    });
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

    gainOre(State.ops / State.settings.tick, false);

    if (Object.keys(InstanceState.oreParticles).length > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i in InstanceState.oreParticles) InstanceState.oreParticles[i].draw();
    }
};

const initiateCanvasParticles = () => {
    particlesCanvasEl.height = window.innerHeight;
    particlesCanvasEl.width = window.innerWidth;
    // const ctx = particlesCanvasEl.getContext('2d');
};

const initialLoad = () => {
    initiateCanvasParticles();
    instantiateTabs();
    instantiateBuildings();

    oreSpriteEl.onclick = handleOreClick;

    setInterval(gameLoop, 1000 / State.settings.tick);
};

window.onload = () => initialLoad();

// - -----------------------------------------------------------------------------------
// - TESTING PURPOSES -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

var before, now, fps;
let fpsEl = document.querySelector('.fps');
before = Date.now();
fps = 0;
requestAnimationFrame(function loop() {
    now = Date.now();
    fps = Math.round(1000 / (now - before));
    before = now;
    requestAnimationFrame(loop);
    fpsEl.innerHTML = fps;
});
