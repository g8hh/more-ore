import { getCodeName, getGeometricSequencePrice } from './utils';
import { spend, updateOPS } from './index';
import { State, InstanceState } from './State';
import { UpdatesState } from './Updates';
import { showTooltip } from './Tooltip';
import { generateRisingText } from './RisingText';

export interface Building {
    name: string;
    codeName?: string;
    namePlural: string;
    desc: string;
    flavorText: string;
    production: number;
    currentPrice?: number;
    basePrice: number;
    priceScale: number;
    isLocked: boolean;
    isHidden: boolean;
    owned?: number;
    buy?: Function;
    mousemove?: Function;
    onBuy?: any;
}

let id = 0;
const Building = function (b) {
    this.id = id;
    this.name = b.name;
    this.codeName = getCodeName(b.name);
    this.namePlural = b.namePlural;
    this.desc = b.desc;
    this.flavorText = b.flavorText;
    this.currentPrice = b.currentPrice || b.basePrice;
    this.basePrice = b.basePrice;
    this.priceScale = b.priceScale;
    this.production = b.production;
    this.isLocked = b.isLocked;
    this.isHidden = b.isHidden;
    this.owned = b.owned || 0;
    this.onBuy = b.onBuy || null;
    id += 1;

    this.buy = (event) => {
        if (spend(getGeometricSequencePrice(this))) {
            this.owned += InstanceState.buyAmount;
            this.currentPrice = this.basePrice * Math.pow(this.priceScale, this.owned);

            updateOPS(); // Need to call the function directly so OPS gets calculated instantly

            UpdatesState.updateOres = true;
            UpdatesState.updateTabContent = true;

            updateBuildingsVisibility(this.id);

            if (this.onBuy) {
                if (this.onBuy.unlockUpgrade) {
                    this.onBuy.unlockUpgrade.forEach((upgrade) => {
                        if (this.owned >= upgrade.amountNeeded) {
                            State.upgrades[upgrade.name].isLocked = false;
                            UpdatesState.updateTabContent = true;

                            console.log('UPGRADES', State.upgrades);
                        }
                    });
                }
            }

            generateRisingText(event, 'buy');
            showTooltip(event, { type: 'building', building: this });
        }
    };

    this.mousemove = (event) => showTooltip(event, { type: 'building', building: this });
};

const updateBuildingsVisibility = (index: number) => {
    const nextBuilding = InstanceState.buildings[index + 1];
    const nextNextNextBuilding = InstanceState.buildings[index + 3];
    if (nextBuilding) nextBuilding.isLocked = false;
    if (nextNextNextBuilding) nextNextNextBuilding.isHidden = false;
};

const buildings: Building[] = [
    {
        name: 'School',
        namePlural: 'Schools',
        desc: 'Teach students about the wonders of ore.',
        flavorText: "Jesus christ Marie, they're minerals!",
        production: 0.5,
        basePrice: 12,
        priceScale: 1.12,
        isLocked: false,
        isHidden: false,
        onBuy: {
            unlockUpgrade: [
                { name: 'Composition Notebooks', amountNeeded: 1 },
                { name: 'No. 2 Pencil', amountNeeded: 5 },
                { name: '3 Ring Binder', amountNeeded: 10 },
                { name: 'Looseleaf', amountNeeded: 20 },
                { name: 'Schoolbag', amountNeeded: 50 },
                { name: 'Fresh Pink Eraser', amountNeeded: 100 },
                { name: 'Gum', amountNeeded: 200 },
                { name: 'Report Card', amountNeeded: 400 }
            ]
        }
    },
    {
        name: 'Farm',
        namePlural: 'Farms',
        desc: 'Cultivate the lands for higher quality ores.',
        flavorText: 'This totally makes sense...',
        production: 2,
        basePrice: 240,
        priceScale: 1.15,
        isLocked: true,
        isHidden: false,
        onBuy: {
            unlockUpgrade: [
                { name: 'Manure Spreader', amountNeeded: 1 },
                { name: 'Pitchfork', amountNeeded: 5 },
                { name: 'Tractor', amountNeeded: 10 },
                { name: 'Rotary Cutter', amountNeeded: 20 },
                { name: 'Hoe', amountNeeded: 50 },
                { name: 'Baler', amountNeeded: 100 },
                { name: 'Sickle', amountNeeded: 200 },
                { name: 'Scythe', amountNeeded: 400 }
            ]
        }
    },
    {
        name: 'Quarry',
        namePlural: 'Quarries',
        desc: 'Designated mining area.',
        flavorText: 'Diggy diggy hole.',
        production: 20,
        basePrice: 2_520,
        priceScale: 1.15,
        isLocked: true,
        isHidden: false,
        onBuy: {
            unlockUpgrade: [
                { name: 'Floodlights', amountNeeded: 1 },
                { name: 'Twill Rope', amountNeeded: 5 },
                { name: 'Wooden Compass', amountNeeded: 10 },
                { name: 'Ore Filter', amountNeeded: 20 },
                { name: 'Waterproof Tape', amountNeeded: 50 },
                { name: 'Metallic Compass', amountNeeded: 100 },
                { name: 'Miners Mask', amountNeeded: 200 },
                { name: 'Cape Chisel', amountNeeded: 400 }
            ]
        }
    },
    {
        name: 'Church',
        namePlural: 'Churches',
        desc: 'Praise to ye Old Ore Gods.',
        flavorText: 'In ore name we pray, amen.',
        production: 320,
        basePrice: 37_800,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true,
        onBuy: {
            unlockUpgrade: [
                { name: 'Scripture Reading', amountNeeded: 1 },
                { name: 'Communion', amountNeeded: 5 },
                { name: 'Worship Session', amountNeeded: 10 },
                { name: '7th Day', amountNeeded: 20 },
                { name: 'Eden Apple', amountNeeded: 50 },
                { name: 'Apocalypse', amountNeeded: 100 },
                { name: 'Judgement Day', amountNeeded: 200 },
                { name: 'Rapture', amountNeeded: 400 }
            ]
        }
    },
    {
        name: 'Factory',
        namePlural: 'Factories',
        desc: 'Manufacture your ores.',
        flavorText: 'Assembly line this SH%* up!',
        production: 4_480,
        basePrice: 490_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true,
        onBuy: {
            unlockUpgrade: [
                { name: 'Rubber Conveyor Belt', amountNeeded: 1 },
                { name: 'Floppy Squiggle Tubes', amountNeeded: 5 },
                { name: 'Clicky Squish Buttons', amountNeeded: 10 },
                { name: 'Metallic Magnetic Panels', amountNeeded: 20 },
                { name: 'Hydroponic Auxilleration', amountNeeded: 50 }
            ]
        }
    },
    {
        name: 'Crypt',
        namePlural: 'Crypts',
        desc: 'Raise dead ores from the graves.',
        flavorText: 'Spooky dooky ores.',
        production: 67_200,
        basePrice: 7_900_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Hospital',
        namePlural: 'Hospitals',
        desc: 'Heal the poor ol damaged ores.',
        flavorText: 'An apple a day keeps the ore cancer away.',
        production: 1_350_000,
        basePrice: 196_600_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Citadel',
        namePlural: 'Citadels',
        desc: 'wip',
        flavorText: 'wip',
        production: 14_800_000,
        basePrice: 2_800_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Xeno Spaceship',
        namePlural: 'Xeno Spaceships',
        desc: 'wip',
        flavorText: 'wip',
        production: 192_200_000,
        basePrice: 49_500_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Sky Castle',
        namePlural: 'Sky Castles',
        desc: 'Use magic beans to reach an egg based source of ores.',
        flavorText: 'wip',
        production: 3_800_000_000,
        basePrice: 1_240_000_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Eon Portal',
        namePlural: 'Eon Portals',
        desc: 'Steal ore from your past and future self.',
        flavorText: 'wip',
        production: 45_150_000_000,
        basePrice: 18_580_000_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Sacred Mine',
        namePlural: 'Sacred Mines',
        desc: 'wip',
        flavorText: 'wip',
        production: 691_900_000_000,
        basePrice: 297_200_000_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'O.A.R.D.I.S.',
        namePlural: 'O.A.R.D.I.S.',
        desc: 'wip',
        flavorText: 'wip',
        production: 17_300_000_000_000,
        basePrice: 8_915_000_000_000_000,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    },
    {
        name: 'Final Destination',
        namePlural: 'Final Destinations',
        desc: 'The Final Destination.',
        flavorText: 'Thank you so much for playing <3.',
        production: 999_999_999_999_999_999,
        basePrice: 999_999_999_999_999_999_999_999_999_999_999,
        priceScale: 1.15,
        isLocked: true,
        isHidden: true
    }
];

export function instantiateBuildings(b = JSON.parse(localStorage.getItem('buildings')) || buildings) {
    const builtBuildings = [];

    b.forEach((building: Building) => {
        builtBuildings.push(new Building(building));
    });

    InstanceState.buildings = builtBuildings;
}
