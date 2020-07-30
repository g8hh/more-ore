import { getCodeName, removeEl } from './utils';
import { InstanceState, State } from './State';
import { spend, completeSmithUpgrade } from '.';
import { UpdatesState } from './Updates';
import { generateRisingText } from './RisingText';
import { hideTooltip } from './Tooltip';

// once quest board is unlocked,
// upgrade called Boots of Swiftness
// that'll increase quest speed
const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;

export interface SmithUpgrade {
    name: string;
    codeName?: string;
    desc: string;
    flavorText?: string;
    powerNeeded: number;
    cost: number;
    requires?: {};
    isLocked: boolean;
    isInProgress?: boolean;
    isNew?: boolean;
    isOwned?: boolean;
    isRepeatable?: boolean;
    priceIncrease?: number;
    complete?: () => void;
    start?: () => void;
    buy?: (event: MouseEvent) => void;
    removeNew?: (event: MouseEvent) => void;
    startedOn?: Date;
    completedOn?: Date;
    onComplete?: {};
}

const SmithUpgrade = function (u) {
    this.name = u.name;
    this.codeName = getCodeName(u.name);
    this.desc = u.desc;
    this.flavorText = u.flavorText || null;
    this.powerNeeded = u.powerNeeded;
    this.cost = u.cost;
    this.requires = u.requires || [];
    this.isLocked = u.isLocked;
    this.isInProgress = u.isInProgress || false;
    this.isNew = u.isNew || true;
    this.isOwned = u.isOwned || false;
    this.isRepeatable = u.isRepeatable || false;
    if (this.isRepeatable) this.priceIncrease = u.priceIncrease;
    this.onComplete = u.onComplete || null;

    this.complete = () => {
        this.completedOn = new Date();
        this.isInProgress = false;

        UpdatesState.updateTabContent = true;
        UpdatesState.updateTabs = true;

        State.smith.currentProgress = 0;
        State.smith.inProgress = false;
        State.smith.currentUpgrade = this;

        completeSmithUpgrade(this.codeName);

        if (this.isRepeatable) {
            this.powerNeeded *= this.priceIncrease;
        }

        if (this.onComplete) {
            if (this.onComplete.unlockSmithUpgrade) {
                this.onComplete.unlockSmithUpgrade.forEach((upgrade) => {
                    unlockSmithUpgrade(upgrade, this.codeName);
                });
            }
        }
    };

    this.start = () => {
        console.log('starting a smith upgrade');
        this.isInProgress = true;
        this.startedOn = new Date();

        UpdatesState.updateTabContent = true;
        UpdatesState.updateTabs = true;

        State.smith.currentProgress = 0;
        State.smith.inProgress = true;
        State.smith.currentUpgrade = this;
    };

    this.buy = (event: MouseEvent) => {
        console.log('buying a smith upgrade', event);
        if (!State.smith.inProgress) {
            if (spend(this.cost, 'refined')) {
                generateRisingText(event, 'buy');
                hideTooltip();
                this.start();
            }
        }
    };

    this.removeNew = (event: any) => {
        this.isNew = false;
        if (event.target.children[1]) {
            removeEl(event.target.children[1]);
        }
    };
};

const unlockSmithUpgrade = (targetUpgrade: string, previousUpgrade: string) => {
    const upgrade = InstanceState.smithUpgrades.find((upgrade) => upgrade.codeName === targetUpgrade);

    let unlock = true;

    // Checks to see if there is a requires object
    if (upgrade.requires) {
        // Loop through the object
        for (let upgradeName in upgrade.requires) {
            // Check if key is equal to a just-completed upgrade
            if (upgradeName === previousUpgrade) {
                // Set to true (owned)
                upgrade.requires[upgradeName] = true;
            }
            // If any values are false, don't unlock
            if (upgrade.requires[upgradeName] === false) {
                console.log('You dont own:', upgradeName);
                unlock = false;
            }
        }
    }

    if (unlock) {
        console.log('unlocking upgrade:', upgrade);
        upgrade.isLocked = false;
    }
};

const smithUpgrades: SmithUpgrade[] = [
    {
        name: 'Fragility Spectacles',
        desc: 'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 5x the normal amount.',
        flavorText: 'I can see... I can FIGHT!',
        powerNeeded: 150,
        cost: 0,
        isLocked: false,
        onComplete: {
            unlockSmithUpgrade: ['smithPowerUp']
        }
    },
    {
        name: 'Quest Board',
        desc: 'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!',
        flavorText: "Fetch quests are the greatest aren't they?",
        powerNeeded: 1000,
        cost: 1,
        isLocked: false
    },
    {
        name: 'Smith Power Up',
        desc: 'Increase maximum smith power by a set amount',
        powerNeeded: 100,
        cost: 0,
        isLocked: true,
        requires: {
            fragilitySpectacles: false
        },
        isRepeatable: true,
        priceIncrease: 2.5
    }
];

export function instantiateSmithUpgrades(u = JSON.parse(localStorage.getItem('smithUpgrades')) || smithUpgrades) {
    const builtSmithUpgrades: SmithUpgrade[] = [];

    u.forEach((upgrade: SmithUpgrade) => {
        builtSmithUpgrades.push(new SmithUpgrade(upgrade));
    });

    InstanceState.smithUpgrades = builtSmithUpgrades;
}
