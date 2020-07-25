import { state } from './state';
import {
    pageContainer,
    oreSpriteEl,
    topbarInventoryOresEl,
    oreHpEl,
    topbarInventoryGenerationLv,
    topbarInventoryGenerationLvOnRefine,
    topbarInventoryGenerationXpBarEl,
    particlesCanvasEl,
    particlesCanvasContext as ctx
} from './elements';
import { getPercentage, formatNumber, getRandomNum, removeEl } from './utils';
import { generateOreParticles, oreParticlesList } from './OreParticle';
import { generateRisingText } from './RisingText';

const gainOre = (amount: number, damageOre: boolean = true) => {
    state.inventory.ores += amount;

    if (damageOre) handleOreDamage(amount);
};

const handleOreDamage = (damage: number) => {
    state.ore.hp -= damage;

    if (state.ore.hp <= 0) handleBrokenOre();

    state.updates.updateOreSprite = true;
    state.updates.updateOreHp = true;
};

const handleBrokenOre = () => {
    gainGenerationXp(50);
    generateNewOre();
    state.ore.spriteType = getRandomNum(1, 5);
};

const generateNewOre = () => {
    state.ore.maxHp *= 1.13;
    state.ore.hp = state.ore.maxHp;
};

const handleOreClick = (event: MouseEvent) => {
    gainOre(state.opc);
    gainGenerationXp(1);
    generateOreParticles(event);
    generateRisingText(event, null, state.opc);
    state.updates.updateOres = true;
};

// - -----------------------------------------------------------------------------------
// - GENERATION STUFF ------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const gainGenerationXp = (amount: number) => {
    state.generation.xp += amount;
    if (state.generation.xp >= state.generation.maxXp) handleGenerationLvlUp();
    state.updates.updateGenerationXp = true;
};

const handleGenerationLvlUp = () => {
    state.generation.maxXp *= 1.15;
    state.generation.xp = 0;
    state.generation.lvOnRefine += 1;

    state.updates.updateGenerationLvOnRefine = true;
};

// - -----------------------------------------------------------------------------------
// - UPDATES ---------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const updateOres = () => {
    topbarInventoryOresEl.innerHTML = state.inventory.ores;
    state.updates.updateOres = false;
};

const updateOreHp = () => {
    switch (state.settings.oreHpType) {
        case 'percentage':
            oreHpEl.innerHTML = formatNumber(getPercentage(state.ore.hp, state.ore.maxHp));
            break;
        case 'number':
            oreHpEl.innerHTML = `${formatNumber(state.ore.hp)}/${formatNumber(state.ore.maxHp)}`;
            break;
        case 'none':
        default:
            return;
    }
    state.updates.updateOreHp = false;
};

const updateOreSprite = () => {
    oreSpriteEl.src = `./images/ore${state.ore.spriteType}-${state.ore.spriteHp}.png`;

    const differentOreSprites = 5;
    const percentage = getPercentage(state.ore.hp, state.ore.maxHp);
    const calcSprite = Math.min(differentOreSprites, 6 - Math.ceil(percentage / 20));

    if (state.ore.spriteHp !== calcSprite) {
        state.ore.spriteHp = calcSprite;
        oreSpriteEl.src = `./images/ore${state.ore.spriteType}-${state.ore.spriteHp}.png`;
        generateOreParticles(null, 5);
    }

    state.updates.updateOreSprite = false;
};

const updateGenerationLv = () => {
    topbarInventoryGenerationLv.innerHTML = state.generation.lv;
    state.updates.updateGenerationLv = false;
};

const updateGenerationLvOnRefine = () => {
    if (state.generation.lv < state.generation.lvOnRefine) {
        topbarInventoryGenerationLvOnRefine.innerHTML = `(${state.generation.lvOnRefine})`;
    }
    state.updates.updateGenerationLvOnRefine = false;
};

const updateGenerationXp = () => {
    topbarInventoryGenerationXpBarEl.style.width = getPercentage(state.generation.xp, state.generation.maxXp) + '%';
    state.updates.updateGenerationXp = false;
};

// - -----------------------------------------------------------------------------------
// - INIT STUFF ------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------

const gameLoop = () => {
    if (state.updates.updateOres) updateOres();
    if (state.updates.updateOreHp) updateOreHp();
    if (state.updates.updateOreSprite) updateOreSprite();
    if (state.updates.updateGenerationLv) updateGenerationLv();
    if (state.updates.updateGenerationXp) updateGenerationXp();
    if (state.updates.updateGenerationLvOnRefine) updateGenerationLvOnRefine();

    if (Object.keys(oreParticlesList).length > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i in oreParticlesList) oreParticlesList[i].draw();
    }
};

const initiateCanvasParticles = () => {
    particlesCanvasEl.height = window.innerHeight;
    particlesCanvasEl.width = window.innerWidth;
    // const ctx = particlesCanvasEl.getContext('2d');
};

const initialLoad = () => {
    setInterval(gameLoop, 1000 / state.settings.tick);

    updateOres();
    updateOreHp();
    updateOreSprite();
    updateGenerationLv();
    updateGenerationLvOnRefine();

    initiateCanvasParticles();

    oreSpriteEl.onclick = handleOreClick;
};

initialLoad();

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
