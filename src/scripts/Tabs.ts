import { getCodeName } from './utils';
import { State, InstanceState } from './State';
import { UpdatesState } from './Updates';

export interface Tab {
    name: string;
    codeName?: TabName;
    isLocked: boolean;
}

export type TabName = 'store' | 'smith';

const Tab = function (o) {
    this.name = o.name;
    this.codeName = getCodeName(o.name);
    this.isLocked = o.isLocked;
};

const tabs = [
    {
        name: 'store',
        isLocked: false
    },
    {
        name: 'smith',
        isLocked: true
    }
];

export const instantiateTabs = (t: Tab[] = JSON.parse(localStorage.getItem('tabs')) || tabs): void => {
    const builtTabs = [];

    t.forEach((tab: Tab) => {
        builtTabs.push(new Tab(tab));
    });

    InstanceState.tabs = builtTabs;
};
