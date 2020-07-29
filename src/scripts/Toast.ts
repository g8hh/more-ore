import { InstanceState } from './State';
import { createEl, removeEl } from './utils';
import { toastsContainerEl } from './constants';

let toastIndex = 0;

export const Toast = function () {
    const toastEl = createEl('div', ['toast', `toast-${toastIndex}`]);
    toastEl.addEventListener('click', () => this.close());

    this.id = toastIndex;
    this.self = toastEl;

    this.close = () => {
        console.log('closing');
        removeEl(this.self);
    };

    InstanceState.toasts.push(this);
    toastIndex++;

    toastsContainerEl.append(toastEl);
};
1;
