import { Upgrade } from '../Upgrades';

export const factoryUpgrades: Upgrade[] = [
    {
        name: 'Rubber Conveyor Belt',
        flavorText: "These moves the things to there, that's all I know.",
        price: 30_000,
        onBuy: {
            increaseBuildingProduction: ['factory', 2]
        }
    },
    {
        name: 'Floppy Squiggle Tubes',
        flavorText: "If I could tell you what these were for you'd buy twice as many.",
        price: 300_000,
        onBuy: {
            increaseBuildingProduction: ['factory', 2]
        }
    },
    {
        name: 'Clicky Squish Buttons',
        flavorText: 'These go next to the Squishy Click Buttons.',
        price: 44_000_000,
        onBuy: {
            increaseBuildingProduction: ['factory', 2]
        }
    },
    {
        name: 'Metallic Magnetic Panels',
        flavorText: 'These are actually for my fridge.',
        price: 800_000_000,
        onBuy: {
            increaseBuildingProduction: ['factory', 2]
        }
    },
    {
        name: 'Hydroponic Auxilleration',
        flavorText: 'Aquaman is here to stay.',
        price: 5_300_000_000,
        onBuy: {
            increaseBuildingProduction: ['factory', 2]
        }
    }
];
