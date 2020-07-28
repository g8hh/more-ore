import { getRandomNum, removeEl } from './utils';
import { pageContainer } from './constants';

export const generateRisingText = (event: MouseEvent, type: string, amount: number) => {
    const el = document.createElement('div');

    el.style.position = 'absolute';
    el.style.pointerEvents = 'none';
    el.style.color = 'white';
    el.style.fontSize = '24px';
    el.style.fontFamily = 'Germania One';
    el.style.zIndex = '2';
    el.style.textShadow = '0 0 1px rgba(0, 0, 0, 0.5)';
    el.style.animation = 'flyingNumber 2s forwards ease-out';

    el.innerHTML = `+${amount}`;

    if (event) {
        el.style.left = event.clientX + getRandomNum(-20, 20) + 'px';
        el.style.top = event.clientY + getRandomNum(-5, 5) + 'px';
    }

    pageContainer.append(el);

    el.addEventListener('animationend', () => removeEl(el));
};
