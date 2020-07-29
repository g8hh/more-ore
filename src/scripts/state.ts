import Inventory from './interfaces/Inventory';
import Generation from './interfaces/Generation';
import Ore from './interfaces/Ore';
import Settings from './interfaces/Settings';
import { Tab } from './Tabs';
import { Building } from './Buildings';
import { Stats } from './interfaces/Stats';
import { SmithUpgrade } from './SmithUpgrades';

interface State {
    opc: number;
    ops: number;
    inventory: Inventory;
    generation: Generation;
    ore: Ore;
    smith: {
        inProgress: boolean;
        currentProgress: number;
        currentUpgrade: SmithUpgrade;
        power: number;
        maxPower: number;
    };
    stats: Stats;
    settings: Settings;
}

export const State: State = {
    opc: 50,
    ops: 0,

    inventory: {
        ores: 0,
        refined: 0
    },

    generation: {
        lv: 1,
        lvOnRefine: 1,
        xp: 0,
        maxXp: 10
    },

    ore: {
        hp: 50,
        maxHp: 50,
        spriteType: 5,
        spriteHp: 1
    },

    stats: {
        weakSpotMultiplier: 5,
        oreClicks: 0,
        weakSpotClicks: 0,
        rocksDestroyed: 0
    },

    smith: {
        inProgress: false,
        currentProgress: null,
        currentUpgrade: null,
        power: 5,
        maxPower: 5
    },

    settings: {
        tick: 60,
        oreHpType: 'number'
    }
};

interface InstanceState {
    selectedTab: string;
    buyAmount: 1 | 10 | 100 | 'max';
    oreParticles: {};
    tabs: Tab[];
    buildings: Building[];
    toasts: any[];
    smithUpgrades: SmithUpgrade[];
}

export const InstanceState: InstanceState = {
    selectedTab: 'store',
    buyAmount: 1,
    oreParticles: {},
    tabs: [],
    buildings: [],
    toasts: [],
    smithUpgrades: []
};
