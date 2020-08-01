import { findCodeNameInArr, isObjEmpty, getCodeName } from './utils';
import { State, InstanceState } from './State';
import { Building } from './Buildings';
import { showTooltip, hideTooltip } from './Tooltip';
import { upgrades as u } from './upgrades/index';

export interface Upgrade {
    name: string;
    flavorText?: string;
    price: number;
    onBuy: {
        increaseBuildingProduction: [string, number];
    };
}

const Upgrade = function (upgrade) {
    this.name = upgrade.name;
    this.codeName = getCodeName(upgrade.name);
    this.desc = upgrade.desc || buildUpgradeDesc(upgrade);
    this.flavorText = upgrade.flavorText;
    this.price = upgrade.price;
    this.onBuy = upgrade.onBuy;
    this.isLocked = upgrade.isLocked === false ? false : true;
    this.isOwned = upgrade.isOwned === false ? false : false;

    this.buy = (event: MouseEvent) => {};

    this.mousemove = (event: MouseEvent): void => showTooltip(event, { type: 'upgrade', upgrade: this });
};

const buildUpgradeDesc = (upgrade) => {
    const building: Building = findCodeNameInArr(upgrade.onBuy.increaseBuildingProduction[0], InstanceState.buildings);

    let desc = '';

    switch (upgrade.onBuy.increaseBuildingProduction[1]) {
        case 2:
            desc += 'Doubles ';
            break;
        case 3:
            desc += 'Triples ';
            break;
        case 4:
            desc += 'Quadruples ';
            break;
        case 5:
            desc += 'Quintuples ';
            break;
        default:
            console.log('err with', upgrade.onBuy.increaseBuildingProduction[1]);
    }

    desc += `the production of ${building.namePlural}`;

    return desc;
};

const upgrades = [...u.schoolUpgrades, ...u.farmUpgrades, ...u.quarryUpgrades, ...u.churchUpgrades, ...u.factoryUpgrades];

export const instantiateUpgrades = (): void => {
    const state = JSON.parse(localStorage.getItem('state'));

    const builtUpgrades = {};

    if (state) {
        if (!isObjEmpty(state.upgrades)) {
            for (let key in state.upgrades) {
                builtUpgrades[key] = new Upgrade(state.upgrades[key]);
            }
        }
    } else {
        upgrades.forEach((upgrade) => {
            builtUpgrades[upgrade.name] = new Upgrade(upgrade);
        });
    }

    State.upgrades = builtUpgrades;
};
