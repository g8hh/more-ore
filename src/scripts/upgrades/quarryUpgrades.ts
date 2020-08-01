import { Upgrade } from '../Upgrades';

export const quarryUpgrades: Upgrade[] = [
    {
        name: 'Floodlights',
        flavorText: 'Staring into one of them is like starting into a billion suns.',
        price: 1_900,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Twill Rope',
        flavorText: 'Study enuff...',
        price: 11_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Wooden Compass',
        flavorText: 'Responds to ore magnetism.',
        price: 510_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Ore Filter',
        flavorText: 'Less sorting, more ore.',
        price: 7_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Waterproof Tape',
        flavorText: 'Poor mans Flex Tape®',
        price: 80_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Metallic Compass',
        flavorText: 'Looks cooler, does the same thing.',
        price: 210_500_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Miners Mask',
        flavorText: 'Asbestos be gone!',
        price: 5_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Cape Chisel',
        flavorText: 'Faster than mining!',
        price: 27_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Ore Splitter',
        flavorText: 'Right down the middle',
        price: 600_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    },
    {
        name: 'Laser Drill',
        flavorText: 'tbd',
        price: 6_300_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['quarry', 2]
        }
    }
];
