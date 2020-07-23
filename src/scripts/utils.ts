export const select = (el: string): HTMLImageElement => document.querySelector(`${el}`);

export const getPercentage = (current: number, max: number): number => (current / max) * 100;

export const formatNumber = (num: number): number => {
    // return num.toFixed(0);
    return Math.ceil(num);
};

export const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const removeEl = (el: HTMLElement): void => {
    el.parentNode.removeChild(el);
};
