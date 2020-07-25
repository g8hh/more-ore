export const select = (el: string): any => document.querySelector(`${el}`);

export const getPercentage = (current: number, max: number): number => (current / max) * 100;

export const formatNumber = (num: number): number => {
    // return num.toFixed(0);
    return Math.ceil(num);
};

export const removeEl = (el: HTMLElement): void => {
    el.parentNode.removeChild(el);
};

export const getRandomNum = (min = 0, max = 1, fractionDigits = 0, inclusive = true) => {
    const precision = Math.pow(10, Math.max(fractionDigits, 0));
    const scaledMax = max * precision;
    const scaledMin = min * precision;
    const offset = inclusive ? 1 : 0;
    const num = Math.floor(Math.random() * (scaledMax - scaledMin + offset)) + scaledMin;

    return num / precision;
};
