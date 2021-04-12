/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export to clipboard': '导出到剪贴板',
    'Export': '导出',
    'Import': '导入',
    ' Generation': '产量',
    'Generation': '产量',
    'Buy Amount': '购买数量',
    'Current Combo': '当前组合',
    'max': '最大',
    'Ores': '矿石',
    'School': '学校',
    'store': '商店',
    'Newbie Miner': '新手矿工',
    'Farm': '农场',
    'ore per second.': '矿石每秒。',
    'ores per second.': '矿石每秒。',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'What happens when you throw a blue rock in the red sea? ... It gets wet': '如果你把一块蓝石扔进红海会发生什么?…它会湿',
    '[ School Production Multiplier': '[学校生产倍数',
    'This totally makes sense...': '这完全有道理…',
    'Teach students about the wonders of ore.': '教学生关于矿石的神奇之处。',
    'Schools are generating': '学校正在产生',
    'Schools are currently generating': '学校目前正在产生',
    'School is generating': '学校正在产生',
    'of your total OpS': '你的全部行动',
    'Jesus christ Marie, they\'re minerals!': '上帝啊，它们是矿物质!',
    'Increases the production multiplier of Schools by 1': '使学校的生产乘数增加1',
    'Cultivate the lands for higher quality ores.': '耕种土地以获得更高质量的矿石。',
    'Each School generates': '每个学校产生',
    'College ruled!': '大学说了算!',
    'Break your first rock': '打破你的第一块石头',
    'All rock and no clay makes you a dull boy (or girl': '只有石头没有泥土，会使你成为一个迟钝的男孩(或女孩',
    'Did you see that cleavage? Now that\'s some gneiss schist.': '你看到分裂了吗？ 现在，这是一些片麻岩片岩。',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);