import { getCodeName } from './utils';
import { Toast } from './Toast';

const Achievement = function (achievement) {
    this.name = achievement.name;
    this.codeName = getCodeName(achievement.name);
    this.won = achievement.won;

    this.win = () => {
        new Toast();
        this.won = 1;
    };
};
