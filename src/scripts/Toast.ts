import { InstanceState } from './State';
import { createEl, removeEl } from './utils';
import { toastsContainerEl } from './constants';

let toastIndex = 0;
const toastSettings = {
    life: 100
};

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

// export const Toast = function (type = 'test') {
//     const toastEl = createEl('div', ['toast', `toast-${toastIndex}`]);

//     this.type = type;
//     this.id = toastIndex;
//     this.life = toastSettings.life;
//     this.self = toastEl;

//     this.update = () => {
//         this.life -= 1;

//         const toastsLength = Object.keys(InstanceState.toasts).length;
//         console.log('length:', toastsLength);

//         if (this.life <= 0) {
//             removeEl(this.self);
//             delete InstanceState.toasts[this.id];
//         }
//     };

//     InstanceState.toasts[this.id] = this;

//     toastIndex++;

//     toastsContainerEl.append(toastEl);
// };
