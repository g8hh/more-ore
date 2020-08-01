import { Upgrade } from '../Upgrades';

export const farmUpgrades: Upgrade[] = [
    {
        name: 'Manure Spreader',
        flavorText: 'The poop helps the ore mature.',
        price: 950,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Pitchfork',
        flavorText: 'Torches not included...',
        price: 12_500,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Tractor',
        flavorText: 'Im in me mums tractor.',
        price: 265_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Rotary Cutter',
        flavorText: 'Not even grass can stop us now.',
        price: 3_450_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Hoe',
        flavorText: 'hehe...',
        price: 69_000_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Baler',
        flavorText: '"Baler? I hardly know her."',
        price: 400_000_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Sickle',
        flavorText: 'For easy sickle-ing of course.',
        price: 4_700_300_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    },
    {
        name: 'Scythe',
        flavorText: "It's like a sickle... but bigger.",
        price: 70_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['farm', 2]
        }
    }
];
