interface Updates {
    updateOPS: boolean;

    updateOres: boolean;
    updateOreHp: boolean;
    updateOreSprite: boolean;
    updateGenerationLv: boolean;
    updateGenerationLvOnRefine: boolean;
    updateGenerationXp: boolean;

    updateTabs: boolean;
    updateTabContent: boolean;
}

export const UpdatesState: Updates = {
    updateOPS: true,

    updateOres: true,
    updateOreHp: true,
    updateOreSprite: true,
    updateGenerationLv: true,
    updateGenerationLvOnRefine: true,
    updateGenerationXp: true,

    updateTabs: true,
    updateTabContent: true
};
