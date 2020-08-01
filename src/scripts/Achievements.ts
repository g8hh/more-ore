import { getCodeName, isObjEmpty } from './utils';
import { Toast } from './Toast';
import { State } from './State';

interface Achievement {
    name: string;
    desc: string;
}

const Achievement = function (achievement) {
    this.name = achievement.name;
    this.codeName = getCodeName(achievement.name);
    this.desc = achievement.desc;
    this.isWon = achievement.won || false;

    this.win = () => {
        if (!this.isWon) {
            this.isWon = true;
            new Toast('achievement', this);
        }
    };
};

let achievements: Achievement[] = [
    { name: 'Newbie Miner', desc: 'Break your first rock' },
    { name: 'Novice Miner', desc: 'Break 10 rocks' },
    { name: 'Intermediate Miner', desc: 'Break 25 rocks' },
    { name: 'Advanced Miner', desc: 'Break 50 rocks' },
    { name: 'Master Miner', desc: 'Break 100 rocks' },
    { name: 'Chief Miner', desc: 'Break 200 rocks' },
    { name: 'Exalted Miner', desc: 'Break 500 rocks' },
    { name: 'God Miner', desc: 'Break 1000 rocks' },

    { name: 'Combo Baby', desc: 'Reach a 5 hit combo' },
    { name: 'Combo Pleb', desc: 'Reach a 20 hit combo' },
    { name: 'Combo Squire', desc: 'Reach a 50 hit combo' },
    { name: 'Combo Knight', desc: 'Reach a 100 hit combo' },
    { name: 'Combo King', desc: 'Reach a 200 hit combo' },
    { name: 'Combo Master', desc: 'Reach a 350 hit combo' },
    { name: 'Combo Devil', desc: 'Reach a 666 hit combo' },
    { name: 'Combo Jackpot', desc: 'Reach a 777 hit combo' },
    { name: 'Combo God', desc: 'Reach a 1000 hit combo' },
    { name: 'Combo Saiyan', desc: 'Reach a 5000 hit combo' },
    { name: 'Combo Saitama', desc: 'Reach a 10000 hit combo' },

    { name: 'Not Even A Scratch', desc: 'Deal more than 100 damage from a hit' },
    { name: 'Didnt Even Hurt', desc: 'Deal more than 1,000 damage from a hit' },
    { name: 'That Tickled', desc: 'Deal more than 100,000 damage from a hit' },
    { name: 'I Felt That', desc: 'Deal more than 1,000,000 damage from a hit' },

    { name: 'Ore-aid Stand', desc: 'Reach 50 OpS' },
    { name: 'Ore Store', desc: 'Reach 10,000 OpS' },
    { name: '401k', desc: 'Reach 401,000 OpS' },
    { name: 'Retirement Plan', desc: 'Reach 5,000,000 OpS' },
    { name: 'Hedge Fund', desc: '1,000,000,000 OpS' }
];

export const instantiateAchievements = (): void => {
    const state = JSON.parse(localStorage.getItem('state'));

    const builtAchievements = {};

    if (state) {
        if (!isObjEmpty(state.achievements)) {
            for (let key in state.achievements) {
                builtAchievements[key] = new Achievement(state.achievements[key]);
            }
        }
    } else {
        achievements.forEach((achievement) => {
            builtAchievements[achievement.name] = new Achievement(achievement);
        });
    }

    State.achievements = builtAchievements;
};
