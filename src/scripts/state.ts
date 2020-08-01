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
    upgrades: any;
    achievements: any;
    textScrollerMessages: string[];
}

export const State: State = {
    opc: 100,
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
        currentCombo: 0,
        highestCombo: 0,
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
        oreHpType: 'percentage'
    },

    upgrades: {},
    achievements: {},

    textScrollerMessages: [
        'What is a rocks favorite fruit? ... Pom-a-granite',
        "Did you see that cleavage? Now that's some gneiss schist.",
        'All rock and no clay makes you a dull boy (or girl)',
        "Don't take life for granite",
        'What happens when you throw a blue rock in the red sea? ... It gets wet',
        'As you can tell, these are pretty lame... Submit your own to /u/name_is_Syn',
        'Rocks really rock!',
        "I can't believe I'm googling rock puns right now",
        'There are a few gems amongst all these terrible rock puns',
        'These puns sure are all ore nothing',
        'Rock pun here'
    ]
};

interface InstanceState {
    selectedTab: string;
    buyAmount: 1 | 10 | 100 | 'max';
    oreParticles: {};
    tabs: Tab[];
    buildings: Building[];
    toasts: any[];
    smithUpgrades: SmithUpgrade[];
    textScroller: {
        isInProgress: boolean;
        backlog: string[];
    };
}

export const InstanceState: InstanceState = {
    selectedTab: 'store',
    buyAmount: 1,
    oreParticles: {},
    tabs: [],
    buildings: [],
    toasts: [],
    smithUpgrades: [],
    textScroller: {
        isInProgress: true,
        backlog: []
    }
};
