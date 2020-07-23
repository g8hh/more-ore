interface State {
    opc: number;
    ops: number;
    inventory: Inventory;
    generation: Generation;
    ore: Ore;
    updates: Updates;
    settings: Settings;
}

interface Inventory {
    ores: number;
}

interface Generation {
    lv: number;
    lvOnRefine: number;
    xp: number;
    maxXp: number;
}

interface Ore {
    hp: number;
    maxHp: number;
    spriteType: number;
    spriteHp: number;
}

interface Updates {
    updateOres: boolean;
    updateOreHp: boolean;
    updateOreSprite: boolean;
    updateGenerationLv: boolean;
    updateGenerationLvOnRefine: boolean;
    updateGenerationXp: boolean;
}

interface Settings {
    tick: 15 | 30 | 60;
    oreHpType: 'none' | 'percentage' | 'number' | 'bar-percentage' | 'bar-number';
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
        tick: 15,
        oreHpType: 'number'
    }
};
