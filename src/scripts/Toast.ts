import { InstanceState } from './State';
import { createEl, removeEl } from './utils';
import { toastsContainerEl, toastsContainerLeftEl, toastsContainerRightEl } from './constants';

let toastIndex = 0;

export const Toast = function (type, achievement?) {
    const toastEl = createEl('div', ['toast', `toast-${toastIndex}`]);

    this.id = toastIndex;
    this.self = toastEl;

    this.close = () => {
        this.self.addEventListener('transitionend', () => removeEl(this.self));
        this.self.classList.add('close');
    };

    InstanceState.toasts.push(this);
    toastIndex++;

    switch (type) {
        case 'achievement':
            toastEl.classList.add('toast-achievement');
            const closeBtn = createEl('svg');
            closeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            `;
            closeBtn.addEventListener('click', () => this.close());
            toastEl.innerHTML = `
                <div class='toast-top'>
                    <img src='https://via.placeholder.com/32/'>
                    <h2 class='achievement-name'>${achievement.name}</h2>
                </div>
                <div class='toast-middle'>${achievement.desc}</div>
            `;

            toastEl.append(closeBtn);
            toastsContainerLeftEl.append(toastEl);
            break;

        case 'notification':
            toastsContainerRightEl.append(toastEl);
            break;

        default:
            console.log('type not recognized', type);
    }
};
