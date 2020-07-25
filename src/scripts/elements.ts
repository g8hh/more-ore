import { select as s } from './utils';

export const pageContainer: HTMLElement = s('.page-container');

export const oreSpriteEl: HTMLImageElement = s('.ore-sprite');

export const topbarInventoryEl: HTMLElement = s('.topbar-inventory');
export const topbarInventoryOresEl: HTMLElement = s('.topbar-inventory-ores > .amount');
export const topbarInventoryGenerationLv: HTMLElement = s('.topbar-inventory-generation > .level');
export const topbarInventoryGenerationLvOnRefine: HTMLElement = s('.topbar-inventory-generation > .level-on-refine');
export const topbarInventoryGenerationXpBarEl: HTMLElement = s('.topbar-inventory-generation-xp .bar');

export const oreHpEl: HTMLElement = s('.ore-hp');

export const particlesCanvasEl: HTMLCanvasElement = s('#particles');
export const particlesCanvasContext: CanvasRenderingContext2D = particlesCanvasEl.getContext('2d');
