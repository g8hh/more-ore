import { getRandomNum } from './utils';
import { particlesCanvasContext as ctx, oreSpriteEl } from './constants';
import { InstanceState } from './State';

let oreParticlesIndex = 0;

const settings = {
    gravity: 0.5,
    maxLife: 100
};

export const generateOreParticles = (event?: MouseEvent, amount = 4) => {
    for (let i = 0; i < amount; i++) new OreParticle(event);
};

const OreParticle = function (event?: MouseEvent) {
    // Particle position
    if (event) {
        this.x = event.clientX;
        this.y = event.clientY;
    } else {
        const oreSpriteDimensions = oreSpriteEl.getBoundingClientRect();
        this.x = getRandomNum(oreSpriteDimensions.left, oreSpriteDimensions.right);
        this.y = oreSpriteDimensions.top;
    }

    // Velocities
    this.vx = getRandomNum(-2, 2, 5);
    this.vy = getRandomNum(-2, -1, 5);

    // Size
    this.size = getRandomNum(0.5, 2.5, 3);

    // Adding particle to index
    oreParticlesIndex += 1;
    InstanceState.oreParticles[oreParticlesIndex] = this;
    this.id = oreParticlesIndex;
    this.life = 0;
    this.opacity = 1;
};

OreParticle.prototype.draw = function () {
    // Move particle
    this.x += this.vx;
    this.y += this.vy;

    // Adjust for gravity
    this.vy += settings.gravity * Math.random();

    // Age particle
    this.life += 1;
    this.opacity -= 0.02;

    if (this.life > settings.maxLife || this.y >= window.innerHeight) {
        delete InstanceState.oreParticles[this.id];
    }

    // Draw particle
    const color = getRandomNum(150, 200);

    ctx.beginPath();
    ctx.fillStyle = `rgba( 255, 255, 255, ${this.opacity} )`;
    // ctx.fillStyle = `rgba( ${color}, ${color}, ${color}, ${this.opacity} )`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
};
