import { Building } from './Buildings';
import { InstanceState } from './State';

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

export const getCodeName = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '')
        .replace(/\./g, '');
};

export const updateEl = (targetEl: HTMLElement, updates: HTMLElement): void => {
    targetEl.innerHTML = '';
    targetEl.append(updates);
};

export const createEl = (type: string, classes: string[] = [], content: string | number = null) => {
    const el = document.createElement(type);

    classes.forEach((c: string) => el.classList.add(c));

    el.innerHTML = content;

    return el;
};

export const beautifyNumber = (number: number) => {
    var SI_PREFIXES = [
        '', // number is less than 1,000
        'Thousand', // number is in the thousands
        'Million',
        'Billion',
        'Trillion',
        'Quadrillion',
        'Quintillion',
        'Sextillion',
        'Septillion',
        'Octillion',
        'Nonillion',
        'Decillion',
        'Undecillion',
        'Dodecillion',
        'Tredecillion',
        'Quattuordecillion',
        'Quindecillion',
        'Sexdecillion',
        'Septendecillion',
        'Octodecillion',
        'Novemdecillion',
        'Vigintillion',
        'Unvigintillion',
        'Dovigintillion',
        'Trevigintillion',
        'Quattuorvigintillion',
        'Quinvigintillion',
        'Sexvigintillion',
        'Septenvigintillion',
        'Octovigintillion',
        'Novemvigintillion',
        'Trigintillion',
        'Untrigintillion',
        'Dotrigintillion',
        'Tretrigintillion',
        'Quattuortrigintillion',
        'Quintrigintillion',
        'Sextrigintillion',
        'Septentrigintillion',
        'Octotrigintillion',
        'Novemtrigintillion',
        'F*ckloadillion',
        'F*cktonillion'
    ];

    if (!number) return 0;
    if (number <= 10) {
        // if ( number % 1 == 0 ) return number.toFixed( 0 )

        if (Math.round(number) === number) return number;

        return number.toFixed(1);
    }
    // what tier? (determines SI prefix)
    var tier = (Math.log10(number) / 3) | 0;

    // if zero, we don't need a prefix
    if (tier === 0) return Math.round(number);
    // if (tier === 1) return Math.round(number)

    // get prefix and determine scale
    var prefix = SI_PREFIXES[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add prefix as suffix
    return parseFloat(scaled.toFixed(2)) + ' ' + prefix;
};

export const getGeometricSequencePrice = (b: Building) => {
    // 10 = 211

    if (InstanceState.buyAmount !== 'max') {
        const alreadyOwned = (b.basePrice * (1 - Math.pow(b.priceScale, b.owned))) / (1 - b.priceScale);
        const total = (b.basePrice * (1 - Math.pow(b.priceScale, InstanceState.buyAmount + b.owned))) / (1 - b.priceScale);

        return total - alreadyOwned;
    }

    // return (
    //     b.currentPrice * ((Math.pow(b.priceScale, InstanceState.buyAmount - b.owned + 1) - Math.pow(1, InstanceState.buyAmount)) / 1.12 - 1)
    // );
};

export const findCodeNameInArr = (codeName: string, arr: []) => {
    arr.forEach((obj: any) => {
        if (obj.codeName === codeName) {
            return obj;
        }
    });
};
