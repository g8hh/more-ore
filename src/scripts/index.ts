import { state } from './state';
import {
    pageContainer,
    oreSpriteEl,
    topbarInventoryOresEl,
    oreHpEl,
    topbarInventoryGenerationLv,
    topbarInventoryGenerationLvOnRefine,
    topbarInventoryGenerationXpBarEl
} from './elements';
import { getPercentage, formatNumber, getRandomNum, removeEl } from './utils';

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
    state.updates.updateOres = true;
};

const generateOreParticles = (event?: MouseEvent, amount: number = 2) => {
    for (let i = 0; i < amount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // DETERMINE COLOR
        const color = getRandomNum(150, 200);
        particle.style.background = `rgb( ${color}, ${color}, ${color} )`;

        // DETERMINE SIZE OF PARTICLES
        let size = getRandomNum(2, 4);

        // DETERMINE PLACEMENT OF PARTICLES
        let x: number, y: number;
        if (event) {
            x = event.clientX;
            y = event.clientY;
        } else {
            size = getRandomNum(3, 5);
            const oreSpriteDimensions = oreSpriteEl.getBoundingClientRect();
            x = getRandomNum(oreSpriteDimensions.left, oreSpriteDimensions.right);
            y = oreSpriteDimensions.top;
        }

        particle.style.height = size + 'px';
        particle.style.width = size + 'px';

        particle.style.left = x + 'px';
        particle.style.top = y + getRandomNum(-10, 10) + 'px';

        particle.style.transitionDuration = getRandomNum(5, 10) * 0.1 + 's';

        const animationDuration = getRandomNum(5, 10) * 0.1;
        particle.style.animation = `particle_fall ${animationDuration}s forwards ease-in`;

        particle.addEventListener('animationend', () => removeEl(particle));

        pageContainer.append(particle);

        //reflow
        particle.getBoundingClientRect();

        const moveAmount = getRandomNum(10, 40) * (Math.round(Math.random()) * 2 - 1);
        particle.style.left = x + moveAmount + 'px';
    }
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

    console.log('state', state);
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
};

const initialLoad = () => {
    setInterval(gameLoop, 1000 / state.settings.tick);

    updateOres();
    updateOreHp();
    updateOreSprite();
    updateGenerationLv();
    updateGenerationLvOnRefine();

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
