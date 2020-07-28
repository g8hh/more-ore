import { getCodeName } from './utils';
import { InstanceState } from './State';

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
    duration: number;
    cost: number;
    requires?: string[];
    locked: boolean;
}

const SmithUpgrade = function (u) {
    this.name = u.name;
    this.codeName = getCodeName(u.name);
    this.desc = u.desc;
    this.flavorText = u.flavorText;
    this.duration = u.duration;
    this.cost = u.cost;
    this.requires = u.requires || [];
    this.locked = u.locked;

    // build buy funciton
};

const smithUpgrades: SmithUpgrade[] = [
    {
        name: 'Fragility Spectacles',
        desc: 'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 7x the normal amount.',
        flavorText: 'I can see... I can FIGHT!',
        duration: 1 * MINUTE,
        cost: 0,
        locked: false
    },
    {
        name: 'Quest Board',
        desc: 'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!',
        flavorText: "Fetch quests are the greatest aren't they?",
        duration: 10 * MINUTE,
        cost: 1,
        locked: true
    }
];

export function instantiateSmithUpgrades(u = JSON.parse(localStorage.getItem('smithUpgrades')) || smithUpgrades) {
    const builtSmithUpgrades: SmithUpgrade[] = [];

    u.forEach((upgrade: SmithUpgrade) => {
        builtSmithUpgrades.push(new SmithUpgrade(upgrade));
    });

    InstanceState.smithUpgrades = builtSmithUpgrades;
}
