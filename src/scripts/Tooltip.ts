import { tooltipWrapperEl, gameContainerRight } from './elements';
import { getGeometricSequencePrice, beautifyNumber } from './utils';
import { Building } from './Buildings';
import { State } from './State';

interface Tooltip {
    type: 'building';
    building: Building;
}

export const hideTooltip = () => {
    console.log('hiding tooltip');
    tooltipWrapperEl.innerHTML = '';
    tooltipWrapperEl.classList.remove('visible');
};

export const showTooltip = (event: MouseEvent, tt: Tooltip) => {
    console.log('showing tooltip', event, tt);
    tooltipWrapperEl.classList.add('visible');

    let str = '';

    switch (tt.type) {
        case 'building':
            const price = getGeometricSequencePrice(tt.building);
            str += `
                <div class='tooltip-container tooltip-building tooltip-building-${tt.building.codeName}'>
                    <div class='tooltip-top'>
                        <p>${tt.building.name}</p>
                        <p class='building-price' style='${State.inventory.ores < price ? 'color: crimson' : ''}'>
                            <img src='./../images/ore.png'/>
                            ${beautifyNumber(price)}
                        </p>
                    </div>
                    <div class='tooltip-middle'>
                        <p>${tt.building.desc}</p>
                        <div class='building-stats'>
                            <p>Each ${tt.building.name} generates <strong>${tt.building.baseProduction}</strong> ores per second.</p>`;

            if (tt.building.owned > 0) {
                str += `
                    <p><strong>${tt.building.owned}</strong> ${tt.building.name}${
                    tt.building.owned > 1 ? 's are' : ' is'
                } generating <strong>${tt.building.owned * tt.building.baseProduction}</strong> ore per second.</p>
                `;
            }

            str += `
                        </div>
                    </div>
                    <div class='tooltip-bottom'>
                        <p>${tt.building.flavorText}</p>
                    </div>
                </div>
            `;
            break;

        default:
            console.log('no tooltip yet for this type:', tt.type);
    }

    tooltipWrapperEl.innerHTML = str;

    switch (tt.type) {
        case 'building':
            tooltipWrapperEl.style.width = '300px';
            tooltipWrapperEl.style.top = event.clientY - tooltipWrapperEl.getBoundingClientRect().height / 2 + 'px';
            tooltipWrapperEl.style.left = gameContainerRight.getBoundingClientRect().left - 300 + 'px';
    }
};
