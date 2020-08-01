import { Upgrade } from '../Upgrades';

export const churchUpgrades: Upgrade[] = [
    {
        name: 'Scripture Reading',
        flavorText: 'Read the words of our l-ore-d and savior.',
        price: 60_000,
        onBuy: {
            increaseBuildingProduction: ['church', 2]
        }
    },
    {
        name: 'Communion',
        flavorText: 'Note: Not communism.',
        price: 740_000,
        onBuy: {
            increaseBuildingProduction: ['church', 2]
        }
    },
    {
        name: 'Worship Session',
        flavorText: 'More like W-ore-ship... haha...',
        price: 2_800_000,
        onBuy: {
            increaseBuildingProduction: ['church', 2]
        }
    },
    {
        name: '7th Day',
        flavorText: 'You would think a day of worship is one less day of work but somehow it works out to more ore!',
        price: 62_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 2]
        }
    },
    {
        name: 'Eden Apple',
        flavorText: "You can't resist this forbidden fruit.",
        price: 777_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 2]
        }
    },
    {
        name: 'Apocalypse',
        flavorText: 'Hell on earth.',
        price: 8_200_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 5]
            // change_building_image: 'building-church-evil',
            // change_building_desc: 'Praise to the Ore Demons',
        }
    },
    {
        name: 'Judgement Day',
        flavorText: "It's the end of the world.",
        price: 32_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 4]
        }
    },
    {
        name: 'Rapture',
        flavorText: 'Are you saved?',
        price: 700_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 4]
        }
    },
    {
        name: 'Chaos',
        flavorText: '...',
        price: 2_450_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 3]
        }
    },
    {
        name: 'Satanic Ritual',
        flavorText: 'Sacrifices are the only way to appease the demons.',
        price: 33_000_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['church', 3]
        }
    }
];
