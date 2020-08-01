import { Upgrade } from '../Upgrades';

export const schoolUpgrades: Upgrade[] = [
    {
        name: 'Composition Notebooks',
        flavorText: 'College ruled!',
        price: 300,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'No. 2 Pencil',
        flavorText: 'Test ready!',
        price: 1_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: '3 Ring Binder',
        flavorText: 'Be the Lord of the Rings with our new 2.5" binder!',
        price: 12_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'Looseleaf',
        flavorText: '"Can I borrow a sheet?"',
        price: 450_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'Schoolbag',
        flavorText: 'Break your back carrying on of these stylish bags!',
        price: 5_500_000,
        onBuy: {
            increaseBuildingProduction: ['school', 3]
        }
    },
    {
        name: 'Fresh Pink Eraser',
        flavorText: 'Never use this. Keep it pristine.',
        price: 22_500_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'Gum',
        flavorText: "With this, you'll be the most popular kid in the class.",
        price: 620_000_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'Hallpass',
        flavorText: 'Wander the halls without a care in the world.',
        price: 3_000_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    },
    {
        name: 'Report Card',
        flavorText: 'Determines your fate for the upcoming months.',
        price: 82_000_000_000_000,
        onBuy: {
            increaseBuildingProduction: ['school', 2]
        }
    }
];
