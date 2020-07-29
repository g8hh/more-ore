import { getCodeName, removeEl } from './utils';
import { InstanceState, State } from './State';
import { spend, unlockSmithUpgrade } from '.';
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
    requires?: string[];
    isLocked: boolean;
    isInProgress?: boolean;
    isNew?: boolean;
    isOwned?: boolean;
    complete?: () => void;
    start?: () => void;
    buy?: (event: MouseEvent) => void;
    removeNew?: (event: MouseEvent) => void;
    startedOn?: Date;
    completedOn?: Date;
}

const SmithUpgrade = function (u) {
    this.name = u.name;
    this.codeName = getCodeName(u.name);
    this.desc = u.desc;
    this.flavorText = u.flavorText;
    this.powerNeeded = u.powerNeeded;
    this.cost = u.cost;
    this.requires = u.requires || [];
    this.isLocked = u.isLocked;
    this.isInProgress = u.isInProgress || false;
    this.isNew = u.isNew || true;
    this.isOwned = u.isOwned || false;

    this.complete = () => {
        console.log('completed upgrade:', this.name);

        this.completedOn = new Date();

        UpdatesState.updateTabContent = true;
        UpdatesState.updateTabs = true;

        State.smith.currentProgress = 0;
        State.smith.inProgress = false;
        State.smith.currentUpgrade = this;

        unlockSmithUpgrade(this.codeName);
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

const smithUpgrades: SmithUpgrade[] = [
    {
        name: 'Fragility Spectacles',
        desc: 'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 5x the normal amount.',
        flavorText: 'I can see... I can FIGHT!',
        powerNeeded: 150,
        cost: 0,
        isLocked: false
    },
    {
        name: 'Quest Board',
        desc: 'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!',
        flavorText: "Fetch quests are the greatest aren't they?",
        powerNeeded: 1000,
        cost: 1,
        isLocked: false
    }
];

export function instantiateSmithUpgrades(u = JSON.parse(localStorage.getItem('smithUpgrades')) || smithUpgrades) {
    const builtSmithUpgrades: SmithUpgrade[] = [];

    u.forEach((upgrade: SmithUpgrade) => {
        builtSmithUpgrades.push(new SmithUpgrade(upgrade));
    });

    InstanceState.smithUpgrades = builtSmithUpgrades;
}
