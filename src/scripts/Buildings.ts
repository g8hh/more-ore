import { camelcase, getGeometricSequencePrice } from './utils';
import { spend } from './index';
import { State, InstanceState } from './State';
import { UpdatesState } from './Updates';
import { showTooltip } from './Tooltip';

export interface Building {
    name: string;
    codeName: string;
    desc: string;
    flavorText: string;
    currentPrice: number;
    basePrice: number;
    baseProduction: number;
    priceScale: number;
    isLocked: boolean;
    isHidden: boolean;
    owned: number;
    buy: Function;
    buyCallback?: Function;
}

const Building = function (b) {
    this.name = b.name;
    this.codeName = camelcase(b.name);
    this.desc = b.desc;
    this.flavorText = b.flavorText;
    this.currentPrice = b.currentPrice || b.basePrice;
    this.basePrice = b.basePrice;
    this.baseProduction = b.baseProduction;
    this.priceScale = b.priceScale;
    this.locked = b.isLocked;
    this.isHidden = b.isHidden;
    this.owned = b.owned || 0;
    this.buyCallback = b.buyCallback || null;

    this.buy = (event) => {
        if (spend(getGeometricSequencePrice(this))) {
            this.owned += InstanceState.buyAmount;
            this.currentPrice = this.basePrice * Math.pow(this.priceScale, this.owned);

            if (this.buyCallback) this.buyCallback();

            UpdatesState.updateOPS = true;
            UpdatesState.updateOres = true;
            UpdatesState.updateTabContent = true;

            showTooltip(event, { type: 'building', building: this });
        }
    };
};

const buildings = [
    {
        name: 'School',
        desc: 'Teach students about the wonders of ore',
        flavorText: "Jesus christ Marie, they're minerals!",
        basePrice: 12,
        baseProduction: 0.5,
        priceScale: 1.12,
        isLocked: false,
        isHidden: false
    }
];

export function instantiateBuildings(b = buildings) {
    const builtBuildings = [];

    b.forEach((building) => {
        builtBuildings.push(new Building(building));
    });

    State.buildings = builtBuildings;
}
