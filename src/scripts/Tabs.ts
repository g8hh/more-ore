import { camelcase } from './utils';
import { State } from './State';

export interface Tab {
    name: string;
    codeName?: TabName;
    isLocked: boolean;
}

export type TabName = 'store' | 'smith';

const Tab = function (o) {
    this.name = o.name;
    this.codeName = camelcase(o.name);
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

export function instantiateTabs(t: Tab[] = tabs): void {
    const builtTabs = [];

    t.forEach((tab: Tab) => {
        builtTabs.push(new Tab(tab));
    });

    State.tabs = builtTabs;
}
