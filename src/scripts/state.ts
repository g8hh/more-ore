import Inventory from './interfaces/Inventory';
import Generation from './interfaces/Generation';
import Ore from './interfaces/Ore';
import Settings from './interfaces/Settings';
import { Tab } from './Tabs';
import { Building } from './Buildings';

interface State {
    opc: number;
    ops: number;
    inventory: Inventory;
    generation: Generation;
    ore: Ore;
    tabs: Tab[];
    buildings: Building[];
    settings: Settings;
}

export const State: State = {
    opc: 1,
    ops: 0,

    inventory: {
        ores: 0
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

    tabs: [],
    buildings: [],

    settings: {
        tick: 60,
        oreHpType: 'number'
    }
};

interface InstanceState {
    selectedTab: string;
    buyAmount: 1 | 10 | 100 | 'max';
    oreParticles: {};
}

export const InstanceState = {
    selectedTab: 'store',
    buyAmount: 1,
    oreParticles: {}
};
