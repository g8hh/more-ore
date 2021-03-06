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
    ' Generation': '产生',
    'Generation': '产生',
    'Buy Amount': '购买数量',
    'Current Combo': '当前连击',
    'max': '最大',
    'Ores': '矿石',
    'School': '学校',
    'store': '商店',
    'Newbie Miner': '菜鸟矿工',
    'Farm': '农场',
    'ore per second.': '矿石每秒。',
    'ores per second.': '矿石每秒。',
    'Quarry': '采石场',
    'research': '研究',
    'New!': '新!',
    'COLLECT': '收集',
    'Available Upgrades': '可用升级',
    'Break 10 rocks': '打破10岩石',
    '[ Quarry Production Multiplier': '[ 采石场产量乘数',
    'Quest Board': '任务板',
    "Available points": "可用点数",
    "Church": "教堂",
    "Copper Coating": "镀铜",
    "Crypt": "地下室",
    "EXPORT": "导出",
    "Factory": "工厂",
    "Farms": "农场",
    "Loading...": "加载中...",
    "OK": "确定",
    "ores educated.": "受过教育的矿石。",
    "ores harvested.": "收获的矿石。",
    "Save Game": "保存游戏",
    "Solo": "单人",
    "Schools": "学校",
    "Save Loaded Successfully": "存档加载成功",
    "The rock reminisced about ages past and felt sedimental": "这块岩石让人想起过去的岁月，感觉像是沉积物",
    "Unfortunately, the device you are playing on has a screen too small for More Ore.": "不幸的是，您正在玩的设备的屏幕对于 本游戏 来说太小了。",
    "View Changelog": "查看更新日志",
    "Wipe Save": "删除存档",
    "WIPE": "删档",
    "You can": "你可以",
    "your save": "你的存档",
    "your save and reach out to the developer on": "您的存档并与开发人员联系",
    "Hospital": "医院",
    "If the game doesn't load, your save might be corrupted.": "如果游戏无法加载，则您的保存可能已损坏。",
    "Join Our Discord": "加入我们的Discord",
    "Monolith": "巨石",
    "What is a rocks favorite lullaby? Rock-A-Bye baby.": "石头最喜欢的摇篮曲是什么？ 摇滚再见宝贝。",
    "\"weak spots\"": "\"弱点\"",
    "/sec": "/秒",
    "Allows you to spot": "让你一眼就看出来",
    "Announcement: To test the quality of your pickaxe, try whacking yourself with it a couple times.": "公告：要测试您的镐的质量，请尝试用它敲打自己几次。",
    "Available Research": "可用研究",
    "[ INSERT ROCK PUN HERE ]": "[在此处插入摇滚双关语]",
    "ACHIEVEMENT UNLOCKED": "成就解锁",
    "Created by Syns Studio": "作者是 Syns Studio",
    "Designated mining area.": "指定矿区。",
    "for every building you own.": "对于您拥有的每一栋建筑。",
    "Game Saved": "游戏已保存",
    "Hitting the weak spot generates": "击中弱点产生",
    "How do you put a rock baby to sleep? You rock it.": "你如何让石头婴儿入睡？ 你摇摇它就可以。",
    "Increase": "提高",
    "Increase base production of": "提高基础产量",
    "or": "或",
    "Permanently increase": "永久增加",
    "So what are you serving time for? Granite theft auto, you? Basalt and battery.": "那么你服务的时间是什么？ 花岗岩盗窃汽车，你呢？ 玄武岩和电池。",
    "Thank you so much for playing my game!": "非常感谢你玩我的游戏！",
    "the normal amount.": "正常数量。",
    "Using": "使用",
    "What is a rocks favorite compliment? You rock!": "石头最喜欢的赞美是什么？ 你摇滚！",
    "within the ore.": "矿石之中。",
    "by": " ",
    "Gold Coating": "镀金",
    "OpC": "矿石每次点击",
    "ago on": "以前",
    "Bork bork.": "博克博克。",
    "Caps out at": "上限在",
    "Enables offline gain": "启用离线增益",
    "ferocious animal": "凶猛动物",
    "Increase maximum": "提高最大值",
    "Increase the": "提高",
    "normal speed.": "正常的速度。",
    "of your": "你的",
    "Offline gain is": "离线增益",
    "Owned Research": "拥有的研究",
    "research power": "研究力量",
    "size": "尺寸",
    "This": "这",
    "Unlocked": "已解锁",
    "Watchdog": "看门狗",
    "watches over your buildings and makes sure they don't slack!": "监视您的建筑物并确保它们不会松懈！",
    "weak spot": "弱点",
    "[ Church Production Multiplier": "[教堂生产乘数",
    "Combo Loss": "连击损失",
    "Each Quarry generates": "每个采石场产生",
    "Floodlights": "射灯",
    "ores mined.": "开采的矿石。",
    "Quarries": "采石场",
    "Some of these jokes might flourite over your head...": "其中一些笑话可能会在你的脑海中浮现......",
    "Staring into one of them is like starting into a billion suns.": "凝视其中一个就像开始进入十亿个太阳。",
    "weak spot multiplier": "弱点倍增器",
    "A research is already in progress": "一项研究已经在进行中",
    "after use.": "使用后。",
    "Combo Shield": "连击护盾",
    "Iron Coating": "镀铁",
    "Prevents an accidental click on the ore when on a combo. Becomes available again": "防止在连击时意外点击矿石。 再次可用",
    "Confucious once said: \"Don't forget to make backups!\"": "孔子曾经说过：“不要忘记备份！”",
    "Not enough ores": "没有足够的矿石",
    "Intermediate Miner": "中级矿工",
    "Stats": "统计",
    "Strike the Earth": "冲击地球",
    "That Tickled": "那个挠痒痒的",
    "Times Refined": "时代精进",
    "Total Ores Earned": "获得的矿石总量",
    "Total time": "总时间",
    "Volume": "音量",
    "Weak Spot Clicks": "弱点点击",
    "Weekly": "每周",
    "What do you call an Irish gem thats fake? A sham rock.": "你怎么称呼爱尔兰宝石是假的？ 一块假石头。",
    "What does a rock and prison have in common? They both did hard time.": "岩石和监狱有什么共同点？ 他们俩都过得很辛苦。",
    "Yearly": "每年",
    "You don't have this unlocked": "你还没有解锁这个",
    "[achievement]": "[成就]",
    "[building achievement]": "[建筑成就]",
    "[combo achievement]": "[连击成就]",
    "[generation achievement]": "[世代成就]",
    "[LOCKED]": "[未解锁]",
    "[opc achievement]": "[矿石每次点击成就]",
    "[ops achievement]": "[矿石每秒成就]",
    "Achievements": "成就",
    "Advanced Miner": "高级矿工",
    "bar": "条形",
    "bar+number": "条形+数字",
    "Can you pass me the basalt and bapepper?": "你能把玄武岩和 黑胡椒 递给我吗？",
    "Copy this to your clipboard!": "将此复制到您的剪贴板！",
    "default": "默认",
    "Debug - Careful here!": "调试 - 这里要小心！",
    "Export Save": "导出存档",
    "export save": "导出存档",
    "Exalted Miner": "尊贵的矿工",
    "Educated": "博学",
    "first": "第一",
    "General": "常规",
    "God Miner": "优秀矿工",
    "Hide Ore Particles": "隐藏矿石粒子",
    "Hide Rising Text": "隐藏上升文本",
    "Highest Combo": "最高连击",
    "I Felt That": "我觉得",
    "import save": "导入保存",
    "Master Miner": "矿工大师",
    "Mine your first ore": "开采你的第一个矿石",
    "Miscellaneous": "杂项",
    "Missing research power up": "缺少研究能力",
    "Mute SFXs": "静音 SFX",
    "New": "新",
    "none": "无",
    "number": "数字",
    "Number Format": "数字格式",
    "Ok": "确定",
    "Ore Clicks": "矿石点击",
    "Ore HP Type": "矿石HP类型",
    "Ore Store": "矿石商店",
    "Ore-aid Stand": "助矿台",
    "Ores Earned": "获得的矿石",
    "percentage": "百分比",
    "Performance": "表现",
    "Preferences": "喜好",
    "Refinee": "精炼者",
    "Refiner": "精炼机",
    "Retirement Plan": "退休计划",
    "rock.": "岩石。",
    "Rocks Destroyed": "岩石被毁",
    "rocks.": "岩石。",
    "Saves": "保存",
    "scientific-notation": "科学计数法",
    "Settings": "设置",
    "bar+percentage": "条形+百分比",
    "Cancel": "取消",
    "click above to copy to your clipboard": "单击上方以复制到剪贴板",
    "Import Save": "导入存档",
    "Paste Your Save Here": "在此处粘贴您的保存",
    "Show Animated Bg": "显示动画背景",
    "Show FPS": "显示 FPS",
    "The ingot were gossiping about the ore: They're so unrefined!": "铁锭在议论矿石：它们太不精炼了！",
    "[ Factory Production Multiplier": "[ 工厂生产乘数",
    "Assembly line this SH%* up!": "组装线这个 SH%* 提升！",
    "Churches": "教堂",
    "Each Church generates": "每个教堂生产",
    "Join our discord and add your name into the game!": "加入我们的 discord，将您的名字添加到游戏中！",
    "Manufacture your ores.": "制造你的矿石。",
    "OpS": "矿石每秒",
    "ores enlightened.": "矿石开悟了。",
    "Read the words of our l-ore-d and savior.": "阅读我们的 l-ore-d 和救世主的话。",
    "Scripture Reading": "经文阅读",
    "are generating": "正在生成",
    "Did you know rock was magma before it was cool?": "你知道岩石在冷却之前是岩浆吗？",
    "Doggybag": "打包袋",
    "Increases maximum amount of ores gained while away to": "增加离开时获得的最大矿石量",
    "item while away.": "物品当离开时。",
    "Lowers offline production penalty from": "降低离线生产惩罚",
    "makes it ever more menacing.": "让它变得更具威胁性。",
    "Ore Storage": "矿石储存",
    "Spiked Collar": "有刺项圈",
    "This little accessory for your": "这个小配件适合你",
    "to": "到",
    "watchdog": "看门狗",
    "What's a rocks favorite kind of music? Rock music.": "石头最喜欢的音乐是什么？ 摇滚（Rock）音乐。",
    "Your doggo will now store up to": "您的 打包袋 现在最多可存储",
    "As you can tell, these are pretty lame... Submit your own in our Discord!": "如您所知，这些非常蹩脚……在我们的 Discord 中提交您自己的！",
    "Destroyed": "摧毁",
    "Gained": "获得",
    "Hmmm... I wonder what happens if I click on the left torch 20 times...": "嗯...我想知道如果我点击左边的火炬 20 次会发生什么...",
    "ores.": "矿石.",
    "RECAP": "回顾",
    "Welcome Back": "欢迎回来",
    "You want to escape the rock puns? Too slate!": "你想逃离石头双关语吗？ 太片面了！",
    "You were gone for": "你离开了",
    "[ level": "[ 等级",
    "Common Pickaxe": "普通镐",
    "Currently Equipped": "当前已装备",
    "Damage": "伤害",
    "Epic Pickaxe": "史诗镐",
    "Equip": "装备",
    "Gold Pickaxe": "金镐",
    "if the building amount owned is a multiple of": "如果拥有的建筑数量是",
    "Increase building production by": "增加建筑产量",
    "New Item -": "新物品 -",
    "OCD": "OCD",
    "overall ore gain": "总矿石收益",
    "Platinum Coating": "铂金涂层",
    "Polished Nuggy": "抛光块",
    "Shitty Wood Pickaxe": "烂木镐",
    "Trash": "垃圾",
    "What's a rocks favorite band? Rolling Stones. I'll leave now.": "什么是摇滚最喜欢的乐队？ 滚石乐队。 我现在就走。",
    "Combo Pleb": "连击共享",
    "Not Even A Scratch": "连划痕都没有",
    "Agility": "敏捷",
    "Armor": "护甲",
    "Attack": "攻击",
    "BOSS APPROACHING...": "Boss正在接近...",
    "Crypt Lv.": "地下室等级",
    "Dexterity": "灵巧",
    "Equips": "装备",
    "ERR NO.42069 - No rocks found": "ERR NO.42069 - 没有发现岩石",
    "Factory Lv.": "工厂等级",
    "Hospital Lv.": "医院等级",
    "Hp": "生命值",
    "Level Up": "升级",
    "Luck": "运气",
    "Lv.": "等级",
    "Monolith Lv.": "巨石等级。",
    "Skills": "技能",
    "Speed": "速度",
    "Strength": "力量",
    "O.A.R.D.I.S.": "O.A.R.D.I.S.",
    "[hero achievement]": "[英雄成就]",
    "[land achievement]": "[土地成就]",
    "[research achievement]": "[研究成果]",
    "[wtf achievement]": "[wtf成就]",
    "and combos don't count": "并且连击不算数",
    "Artifact Bag": "神器包",
    "Break me!": "打碎我！",
    "Can you smell what hes cooking": "你能闻到他在煮什么吗",
    "Cheater Detected": "检测到作弊者",
    "Combo Blessing Bonus": "组合祝福奖励",
    "Combo Preventor": "组合预防器",
    "Dexterity I": "灵巧我",
    "Extended Family": "大家庭",
    "Family Tree": "家谱",
    "Follow Syns Studio on Twitter": "在 Twitter 上关注 Syns Studio",
    "How can she slap": "她怎么能打",
    "Relatives": "亲戚们",
    "Sky Castle": "天空城堡",
    "sponsors :": "赞助商：",
    "Stone Hut": "石屋",
    "Student Researcher": "学生研究员",
    "Sussy Rock": "苏西摇滚",
    "Teehee I Lied": "Teehee 我说谎了",
    "Time in Game": "游戏时间",
    "UFO": "飞碟",
    "Visit r/moreore": "访问 r/moreore",
    "Wishlist More Ore on Steam": "Steam 上的 无尽的挖矿",
    "You can hold down your mouse to click!": "你可以按住鼠标点击！",
    "your save and reach out to the developer\n                on": "保存并联系开发者\n",
    "Oreverse": "逆向",
    "Join the Discord": "加入 Discord",
    "Ore Treasury Bonus": "矿石宝库奖励",
    "OpS and OpC is reduced by": "OpS 和 OpC 减少了",
    "[ Stone Hut Production Multiplier": "[石屋生产乘数",
    "And more as you unlock new things ;": "当你解锁新事物时还有更多；",
    "Heck yea! 😘": "哎呀！ 😘",
    "Hire the homo-erectus for cheap manual labor": "雇用直立人以获得廉价的体力劳动",
    "If nothing happens, you might have an adblocker on. Turn it off, refresh and try again": "如果没有任何反应，您可能打开了广告拦截器。 关闭它，刷新并重试",
    "Nah": "不",
    "once it's over!": "一旦结束！",
    "Oonga-boonga!": "呜呜呜！",
    "Potential Rewards": "潜在回报",
    "Power to the pebble": "卵石的力量",
    "random reward": "随机奖励",
    "Support the Dev": "支持开发",
    "This is a great way to show your love and support to me! The dev 😊❤️": "这是表达您对我的爱和支持的好方法！ 开发者😊❤️",
    "v. 1.5.9 Beta": "v. 1.5.9 测试版",
    "Watch a 10 second video and get a": "观看 10 秒视频并获得",
    "[ Upgrade ]": "[ 升级 ]",
    "Break": "打破",
    "Break your": "打破你的",
    "Buy buildings for passive income": "购买建筑物以获得被动收入",
    "Can't blow this house down.": "不能炸毁这房子。",
    "Combo Knight": "组合骑士",
    "Combo Master": "组合大师",
    "Combo Squire": "组合乡绅",
    "Each Stone Hut generates": "每个石屋都会生成",
    "Geology rocks, but Geography is where it's at.": "地质岩石，但地理是它的所在。",
    "Got some thoughts or concerns? Join the discord and post a message for the dev to see!": "有什么想法或顾虑吗？ 加入 discord 并发布消息以供开发人员查看！",
    "Hehe Funny Number I": "呵呵 搞笑数一",
    "I really lava you.": "我真的很喜欢你。",
    "IN TOTAL": "总共",
    "Keep purchasing buildings to increase your passive": "继续购买建筑来增加你的被动",
    "Looking at you Dylan.": "看着你，迪伦。",
    "Mine": "矿",
    "Misclick": "误点击",
    "more to unlock": "更多解锁",
    "OpS(Ores per Second": "OpS（每秒矿石",
    "ores": "矿石",
    "ores gathered.": "矿石聚集。",
    "Reach": "达到",
    "Refinest": "精炼",
    "RESEARCH": "研究",
    "save game": "保存游戏",
    "Show Boss Encounter Animation": "展示Boss遭遇动画",
    "Show Reward Ads": "显示奖励广告",
    "Stone Hut is generating": "石屋正在生成",
    "Stone Hut Upgrade I": "石屋升级 I",
    "Stone Huts": "石屋",
    "Stone Huts are currently generating": "石屋目前正在生成",
    "Stone Huts are generating": "石屋正在生成",
    "to unlock something special.": "解锁一些特别的东西。",
    "total ores mined": "开采的矿石总量",
    "v1.5.9 Beta": "v1.5.9 测试版",
    "while picking up new items.": "在拿起新物品时。",
    "wipe save": "擦除保存",
    "Pet Rocks": "宠物岩石",
    "Philantropist": "慈善家",
    "Pokemon Trainer": "口袋妖怪训练师",
    "Pooped": "拉屎",
    "Prescription Glasses": "处方眼镜",
    "Promoter": "发起人",
    "Rabbits Foot": "兔脚",
    "Roses": "玫瑰",
    "Rumpelstiltskin": "矮胖子皮",
    "Slum Lord": "贫民窟领主",
    "Subscriber": "订户",
    "Supporter": "支持者",
    "T1 T1 T1": "T1 T1 T1",
    "The Gangs All Here": "帮派都在这里",
    "Thornmail": "荆棘甲",
    "Travelled": "旅行",
    "Tulips": "郁金香",
    "Tweet Tweet": "鸣叫 鸣叫",
    "UFO I": "UFO I",
    "UFO II": "UFO II",
    "UFO III": "UFO III",
    "UFO IV": "UFO IV",
    "UFO V": "UFO V",
    "Wow a bat": "哇一只蝙蝠",
    "You've got to commit to geology... it's all ore nothing": "你必须致力于地质学......这一切都不是矿石",
    "[gold nugget achievement]": "[金块成就]",
    "[item achievement]": "[物品成就]",
    "[misc achievement]": "[杂项成就]",
    "[pet achievement]": "【宠物成就】",
    "Altruist": "利他主义者",
    "Backer": "支持者",
    "Beamed": "横梁",
    "Bi-Centennial": "双百年纪念",
    "Blind as a Bat": "像蝙蝠一样盲目",
    "Chonky Boi": "矮胖的博伊",
    "Combo Exodus": "组合出埃及记",
    "Combo God": "组合神",
    "Combo Jackpot": "组合大奖",
    "Combo King": "组合王",
    "Combo L337": "组合 L337",
    "Combo Saitama": "组合埼玉",
    "Combo Saiyan": "组合赛亚人",
    "Crypt III": "地穴 III",
    "Daisies": "雏菊",
    "Disco Discord": "迪斯科不和谐",
    "Egg III": "蛋 III",
    "Egg IV": "蛋 IV",
    "Egg V": "蛋 V",
    "Exuded": "渗出",
    "Factory Mastery I": "工厂精通 I",
    "Galaxy Lord": "银河领主",
    "Getting Steamy": "变得热气腾腾",
    "Global Lord": "全球领主",
    "Gold Finger": "金手指",
    "Gold Rushing": "淘金",
    "Good Pet": "好宠物",
    "Good Samaritan": "好撒玛利亚人",
    "Hidden in Plain Sight": "隐藏在众目睽睽之下",
    "Luck V": "幸运五",
    "Mastery IV": "精通IV",
    "Miss a gold nugget.": "错过金块。",
    "Nice Guy": "好人",
    "Not a Neckbeard": "不是颈须",
    "Ooo Shiny": "哦闪亮",
    "[ Research Upgrade ]": "[ 研究升级 ]",
    "Clicking this doesn't give an achievement": "点击这个不会获得成就",
    "I liked carbon before it was coal.": "在它是煤之前，我喜欢碳。",
    "REQUIRES": "要求",
    "Start on your first research": "开始你的第一次研究",
    "[ Research Upgrade ] [ Repeatable ]": "[研究升级] [可重复]",
    "Can you pass me the basalt and pepper?": "你能把玄武岩和胡椒递给我吗？",
    "How does a rock make his name stand out... it makes it big and boulder": "一块岩石如何让他的名字脱颖而出......它使它变得又大又巨",
    "Silver Pickaxe": "银镐",
    "What's squidwards favorite painting? Boulder and Brash.": "章鱼哥最喜欢的画是什么？ 博尔德和布拉什。",
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
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "are generating": "正在产生",
    'are currently generating': '现在正在生产',
    "DISCORD": "DISCORD",
    'In ore name we pray, amen.': '我们祈祷，阿门。',
    'Research Power': '研究效果',
    'Diggy diggy hole.': '挖洞，挖洞。',
    'Praise to ye Old Ore Gods.': '赞美你们古老的矿石神。',
    'Rock pun here': '岩石双关语在这里',
    'Research Power Up': '研究效果提升',
    'Requires': '需要',
    'Reach a 5 hit combo': '达到5点连击',
    'Combo Baby': '连击宝贝',
    'Fetch quests are the greatest aren\'t they?': '获取任务是最棒的不是吗?',
    'ores per second while researching.': '研究时的每秒矿石量。',
    'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!': '开始冒险吧!继续寻找更大的奖励，甚至是神秘的文物!',
    'Fragility Spectacles': '易碎眼镜',
    'I can see... I can FIGHT!': '我能看到……我能战斗!',
    'As you can tell, these are pretty lame... Submit your own to /u/name_is_Syn': '正如你所看到的，这些很差劲……提交你自己的到/u/name_is_Syn',
    'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 5x the normal amount.': '让你发现矿石的“弱点”。击中弱点会产生5倍于正常数量的能量。',
    ' research': '研究',
    'Research Power': '研究效果',
    'The poop helps the ore mature.': '粪便有助于矿石的成熟。',
    'Novice Miner': '新手矿工',
    'What is a rocks favorite fruit? ... Pom-a-granite': '岩石最喜欢的水果是什么?…花岗岩',
    'Manure Spreader': '撒肥机',
    'These puns sure are all ore nothing': '这些双关语毫无意义',
    'There are a few gems amongst all these terrible rock puns': '在所有这些可怕的岩石双关语中有一些宝石',
    'Rocks really rock!': '岩石真摇滚!',
    'I can\'t believe I\'m googling rock puns right now': '真不敢相信我现在在谷歌上搜索摇滚双关语',
    'is generating': '正在生产',
    'Each Farm generates': '每个农场生成',
    'Don\'t take life for granite': '不要为花岗岩而死',
    'Composition Notebooks': '作文笔记本',
    'What happens when you throw a blue rock in the red sea? ... It gets wet': '如果你把一块蓝石扔进红海会发生什么?…它会湿',
    '[ School Production Multiplier': '[学校生产倍数',
    '[ Farm Production Multiplier': '[农场生产倍数',
    'This totally makes sense...': '这完全有道理…',
    'Teach students about the wonders of ore.': '教学生关于矿石的神奇之处。',
    'of your total OpS': '你的全部矿石生产每秒（OpS）',
    'Jesus christ Marie, they\'re minerals!': '上帝啊，它们是矿物质!',
    'Increases the production multiplier of Schools by 1': '使学校的生产倍数增加1',
    'Increases the production multiplier of Farms by 1': '使农场的生产倍数增加1',
    'Increases the production multiplier of Quarries by 1': '使采石场的生产倍数增加1',
    'Cultivate the lands for higher quality ores.': '耕种土地以获得更高质量的矿石。',
    'Each School generates': '每个学校产生',
    'College ruled!': '大学说了算!',
    'Break your first rock': '打破你的第一块石头',
    'All rock and no clay makes you a dull boy (or girl': '只有石头没有泥土，会使你成为一个迟钝的男孩(或女孩',
    'Did you see that cleavage? Now that\'s some gneiss schist.': '你看到分裂了吗？ 现在，这是一些片麻岩片岩。',

    //原样
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'Patron': 'Patron',
    'x': 'x',
    "V": "V",
    "VI": "VI",
    "VII": "VII",
    'I': 'I',
    'II': 'II',
    'III': 'III',
    'IV': 'IV',
    '': '',
    '': '',
    '': '',
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
    "Power Needed: ": "力量需求: ",
    "Refined Ores: ": "提炼矿石: ",
    "[repeatable lv.": "[可重复 等级",
    "Farm ": "农场 ",
    "School ": "学校 ",
    "Church ": "教堂 ",
    "Quarry ": "采石场 ",
    'Schools ': '学校 ',
    'Farms ': '农场 ',
    "Quarrys ": "采石场 ",
    "Churchs ": "教堂 ",
    "WTF ": "什么鬼 ",
    'Schools ': '学校 ',
    "Quarries ": "采石场 ",
    "Churches ": "教堂 ",
    "Oreverse Mastery ": "逆向精通 ",
    "O.A.R.D.I.S. Mastery ": "O.A.R.D.I.S. 精通 ",
    "O.A.R.D.I.S. ": "O.A.R.D.I.S. ",
    "Armor ": "护甲 ",
    "Pet Power ": "宠物力量 ",
    "Oreverse ": "逆向 ",
    "Monolith Mastery ": "单体精通 ",
    "Monolith ": "巨石 ",
    "Sky Castle Mastery ": "天空之城精通 ",
    "Sky Castle ": "天空之城 ",
    "The Collector ": "收藏家 ",
    "UFO Mastery ": "UFO 精通  ",
    "Stone Hut Mastery ": "石屋精通 ",
    "Strength ": "力量 ",
    "Speed ": "速度 ",
    "Egg Trasher ": "打蛋器 ",
    "Hospital Mastery ": "医院精通 ",
    "Hatcheries ": "孵化场 ",
    "Shiny Hunter ": "闪亮的猎人 ",
    "Trasher ": "捣毁者 ",
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
    " Thousand": " 千",
    " hit combo": " 点击连击",
    " sec": " 秒",
    " Vision": " 视野",
    " Random Legendary Pickaxe -": " 随机传奇镐 -",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^(\d+)\:(\d+)$/,
    /^(\d+)\:(\d+)\:(\d+)$/,
    /^([\d\.]+) Million\/([\d\.]+) Million$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+) T$/,
    /^([\d\.]+) Qa$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) Million$/,
    /^([\d\.]+) Billion$/,
    /^([\d\.]+)$/,
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
    [/^Fast Forward (.+) minutes \-$/, '快进 $1 分钟 \-'],
    [/^lv.(\d+)$/, '等级 $1'],
    [/^(\d+) hour$/, '$1 小时'],
    [/^(\d+) min (\d+)$/, '$1 分钟 $2'],
    [/^(\d+) hour (\d+) min (\d+)$/, '$1 小时 $2 分钟 $3'],
    [/^(\d+) hours (\d+) min$/, '$1 小时 $2 分钟'],
    [/^(\d+) hours (\d+) min (\d+)$/, '$1 小时 $2 分钟 $3'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);