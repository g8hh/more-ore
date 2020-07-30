import { select as s } from './utils';

export const pageContainer: HTMLElement = s('.page-container');
export const gameContainerRight: HTMLElement = s('.game-container-right');

export const torchLeft: HTMLElement = s('.torch-left');
export const torchRight: HTMLElement = s('.torch-right');

export const textScrollerContainerEl: HTMLElement = s('.text-scroller-container');
export const textScrollerTextEl: HTMLElement = s('.text-scroller-container p');

export const toastsContainerEl: HTMLElement = s('.toasts-container');

export const oreSpriteContainerEl: HTMLElement = s('.ore-sprite-container');
export const oreSpriteEl: HTMLImageElement = s('.ore-sprite');
export const oreHpEl: HTMLElement = s('.ore-hp');

export const topbarInventoryEl: HTMLElement = s('.topbar-inventory');
export const topbarInventoryOresEl: HTMLElement = s('.topbar-inventory-ores > .amount');
export const topbarInventoryGenerationLv: HTMLElement = s('.topbar-inventory-generation > .level');
export const topbarInventoryGenerationLvOnRefine: HTMLElement = s('.topbar-inventory-generation > .level-on-refine');
export const topbarInventoryGenerationXpBarEl: HTMLElement = s('.topbar-inventory-generation-xp .bar');

export const particlesCanvasEl: HTMLCanvasElement = s('#particles');
export const particlesCanvasContext: CanvasRenderingContext2D = particlesCanvasEl.getContext('2d');

export const tabsWrapperEl: HTMLElement = s('.tabs-wrapper');
export const tabsContentWrapperEl: HTMLElement = s('.tabs-content-wrapper');

export const tooltipWrapperEl: HTMLElement = s('.tooltip-wrapper');
