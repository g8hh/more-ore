import Inventory from './interfaces/Inventory';
import Generation from './interfaces/Generation';
import Ore from './interfaces/Ore';
import Updates from './interfaces/Updates';
import Settings from './interfaces/Settings';

interface State {
    opc: number;
    ops: number;
    inventory: Inventory;
    generation: Generation;
    ore: Ore;
    updates: Updates;
    settings: Settings;
}

export const state: State = {
    opc: 1,
    ops: 1,

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
        spriteType: 1,
        spriteHp: 1
    },

    updates: {
        updateOres: false,
        updateOreHp: false,
        updateOreSprite: false,
        updateGenerationLv: false,
        updateGenerationLvOnRefine: false,
        updateGenerationXp: false
    },

    settings: {
        tick: 30,
        oreHpType: 'number'
    }
};
