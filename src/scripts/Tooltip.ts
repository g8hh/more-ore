import { tooltipWrapperEl, gameContainerRight } from './constants';
import { getGeometricSequencePrice, beautifyNumber, getPercentage } from './utils';
import { Building } from './Buildings';
import { State } from './State';
import { SmithUpgrade } from './SmithUpgrades';

interface Tooltip {
    type: 'building' | 'smithUpgrade' | 'upgrade';
    building?: Building;
    smithUpgrade?: SmithUpgrade;
    upgrade?: any;
}

export const hideTooltip = () => {
    tooltipWrapperEl.innerHTML = '';
    tooltipWrapperEl.classList.remove('visible');
};

export const showTooltip = (event: MouseEvent, tt: Tooltip) => {
    tooltipWrapperEl.classList.add('visible');

    let str = '';

    switch (tt.type) {
        case 'building':
            const price = getGeometricSequencePrice(tt.building);
            str += `
                <div class='tooltip-container tooltip-building tooltip-building-${tt.building.codeName}'>
                    <div class='tooltip-top'>
                        <img src='./images/building-${tt.building.codeName}.png'/>
                        <p>${tt.building.name}</p>
                        <p class='price' style='${State.inventory.ores < price ? 'color: crimson' : ''}'>
                            <img src='./images/ore.png'/>
                            ${beautifyNumber(price)}
                        </p>
                    </div>
                    <div class='tooltip-middle'>
                        <p>${tt.building.desc}</p>
                        <div class='stats'>
                            <p>Each ${tt.building.name} generates <strong>${tt.building.production}</strong> ores per second.</p>`;

            if (tt.building.owned > 0) {
                str += `
                    <p><strong>${tt.building.owned} </strong>${
                    tt.building.owned > 1 ? `${tt.building.namePlural} are` : `${tt.building.name} is`
                } generating <strong>${tt.building.owned * tt.building.production}</strong> ore per second.</p>
                    <p class='building-percentage'>${tt.building.name}s are currently generating <strong>${beautifyNumber(
                    getPercentage(tt.building.owned * tt.building.production, State.ops)
                )}%</strong> of your total OpS</p>
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
        case 'upgrade':
            str += `
                <div class='tooltip-container tooltip-upgrade tooltip-upgrade-${tt.upgrade.codeName}'>
                    <div class='tooltip-top'>
                        <img src='./images/upgrade-${tt.upgrade.codeName}.png'/>
                        <p>${tt.upgrade.name}</p>
                        <p class='price' style='${State.inventory.ores < tt.upgrade.price ? 'color: crimson' : ''}'>
                            <img src='./images/ore.png'/>
                            ${beautifyNumber(tt.upgrade.price)}
                        </p>
                    </div>
                    <div class='tooltip-middle'>
                        <p>${tt.upgrade.desc}</p>
                    </div>
                    <div class='tooltip-bottom'>
                        <p>${tt.upgrade.flavorText}</p>
                    </div>
                </div>
            `;
            break;
        case 'smithUpgrade':
            const upgrade = tt.smithUpgrade;
            str += `
                <div class='tooltip-container tooltip-smithUpgrade tooltip-smithUpgrade-${upgrade.codeName}'>
                    <div class='tooltip-top'>
                        <img src='./images/smithUpgrade-${upgrade.codeName}.png'/>
                        <p>${upgrade.name}</p>
                    </div>
                    <div class='tooltip-middle'>
                        <p>${upgrade.desc}</p>
                        <div class='cost'>
                            <p>Requires:</p>
                            <p>Refined Ores: ${upgrade.cost}</p>
                            <p>Power Needed: ${beautifyNumber(upgrade.powerNeeded)}</p>
                        </div>
                    </div>
                    `;
            if (upgrade.flavorText) {
                str += `
                    <div class='tooltip-bottom'>
                        <p>${upgrade.flavorText}</p>
                    </div>`;
            }

            str += `
                </div>
            `;
            break;

        default:
            console.log('no tooltip yet for this type:', tt.type);
    }

    tooltipWrapperEl.innerHTML = str;

    switch (tt.type) {
        default:
            const tooltipWidth = 350;

            tooltipWrapperEl.style.width = tooltipWidth + 'px';
            tooltipWrapperEl.style.top = event.clientY - tooltipWrapperEl.getBoundingClientRect().height / 2 + 'px';
            tooltipWrapperEl.style.left = gameContainerRight.getBoundingClientRect().left - tooltipWidth - 20 + 'px';
    }
};
