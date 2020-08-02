// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/State.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceState = exports.State = void 0;
exports.State = {
  opc: 50,
  ops: 0,
  inventory: {
    ores: 0,
    refined: 0
  },
  generation: {
    lv: 1,
    lvOnRefine: 1,
    xp: 0,
    maxXp: 10
  },
  ore: {
    hp: 50,
    maxHp: 50,
    spriteType: 5,
    spriteHp: 1
  },
  stats: {
    weakSpotMultiplier: 5,
    oreClicks: 0,
    weakSpotClicks: 0,
    currentCombo: 0,
    highestCombo: 0,
    rocksDestroyed: 0
  },
  smith: {
    inProgress: false,
    currentProgress: null,
    currentUpgrade: null,
    power: 5,
    maxPower: 5
  },
  settings: {
    tick: 60,
    oreHpType: 'percentage'
  },
  buildings: {},
  upgrades: {},
  achievements: {},
  textScrollerMessages: ['What is a rocks favorite fruit? ... Pom-a-granite', "Did you see that cleavage? Now that's some gneiss schist.", 'All rock and no clay makes you a dull boy (or girl)', "Don't take life for granite", 'What happens when you throw a blue rock in the red sea? ... It gets wet', 'As you can tell, these are pretty lame... Submit your own to /u/name_is_Syn', 'Rocks really rock!', "I can't believe I'm googling rock puns right now", 'There are a few gems amongst all these terrible rock puns', 'These puns sure are all ore nothing', 'Rock pun here']
};
exports.InstanceState = {
  selectedTab: 'store',
  buyAmount: 1,
  oreParticles: {},
  tabs: [],
  toasts: [],
  smithUpgrades: [],
  textScroller: {
    isInProgress: true,
    backlog: []
  }
};
},{}],"scripts/Updates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatesState = void 0;
exports.UpdatesState = {
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
},{}],"scripts/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElEmpty = exports.sortObj = exports.isObjEmpty = exports.getRandomFromArr = exports.getRandomColor = exports.findCodeNameInArr = exports.getGeometricSequencePrice = exports.beautifyNumber = exports.createEl = exports.updateEl = exports.getCodeName = exports.getRandomNum = exports.removeEl = exports.formatNumber = exports.getPercentage = exports.select = void 0;

var State_1 = require("./State");

exports.select = function (el) {
  return document.querySelector("" + el);
};

exports.getPercentage = function (current, max) {
  return current / max * 100;
};

exports.formatNumber = function (num) {
  // return num.toFixed(0);
  return Math.ceil(num);
};

exports.removeEl = function (el) {
  if (el.parentNode) el.parentNode.removeChild(el);
};

exports.getRandomNum = function (min, max, fractionDigits, inclusive) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1;
  }

  if (fractionDigits === void 0) {
    fractionDigits = 0;
  }

  if (inclusive === void 0) {
    inclusive = true;
  }

  var precision = Math.pow(10, Math.max(fractionDigits, 0));
  var scaledMax = max * precision;
  var scaledMin = min * precision;
  var offset = inclusive ? 1 : 0;
  var num = Math.floor(Math.random() * (scaledMax - scaledMin + offset)) + scaledMin;
  return num / precision;
};

exports.getCodeName = function (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '').replace(/\./g, '');
};

exports.updateEl = function (targetEl, updates) {
  targetEl.innerHTML = '';
  targetEl.append(updates);
};

exports.createEl = function (type, classes, content) {
  if (classes === void 0) {
    classes = [];
  }

  if (content === void 0) {
    content = '';
  }

  var el = document.createElement(type);
  classes.forEach(function (c) {
    return el.classList.add(c);
  });
  el.innerHTML = content + '';
  return el;
};

exports.beautifyNumber = function (number) {
  var SI_PREFIXES = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Dodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion', 'Sexdecillion', 'Septendecillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Unvigintillion', 'Dovigintillion', 'Trevigintillion', 'Quattuorvigintillion', 'Quinvigintillion', 'Sexvigintillion', 'Septenvigintillion', 'Octovigintillion', 'Novemvigintillion', 'Trigintillion', 'Untrigintillion', 'Dotrigintillion', 'Tretrigintillion', 'Quattuortrigintillion', 'Quintrigintillion', 'Sextrigintillion', 'Septentrigintillion', 'Octotrigintillion', 'Novemtrigintillion', 'F*ckloadillion', 'F*cktonillion'];
  if (!number) return 0;

  if (number <= 10) {
    // if ( number % 1 == 0 ) return number.toFixed( 0 )
    if (Math.round(number) === number) return number;
    return number.toFixed(1);
  } // what tier? (determines SI prefix)


  var tier = Math.log10(number) / 3 | 0; // if zero, we don't need a prefix

  if (tier === 0) return Math.round(number); // if (tier === 1) return Math.round(number)
  // get prefix and determine scale

  var prefix = SI_PREFIXES[tier];
  var scale = Math.pow(10, tier * 3); // scale the number

  var scaled = number / scale; // format number and add prefix as suffix

  return parseFloat(scaled.toFixed(2)) + ' ' + prefix;
};

exports.getGeometricSequencePrice = function (b) {
  // 10 = 211
  if (State_1.InstanceState.buyAmount !== 'max') {
    var alreadyOwned = b.basePrice * (1 - Math.pow(b.priceScale, b.owned)) / (1 - b.priceScale);
    var total = b.basePrice * (1 - Math.pow(b.priceScale, State_1.InstanceState.buyAmount + b.owned)) / (1 - b.priceScale);
    return total - alreadyOwned;
  } // return (
  //     b.currentPrice * ((Math.pow(b.priceScale, InstanceState.buyAmount - b.owned + 1) - Math.pow(1, InstanceState.buyAmount)) / 1.12 - 1)
  // );

};

exports.findCodeNameInArr = function (codeName, arr) {
  return arr.find(function (obj) {
    return obj.codeName === codeName;
  });
};

exports.getRandomColor = function () {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

exports.getRandomFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

exports.isObjEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

exports.sortObj = function (obj, key) {
  var entries = Object.entries(obj);
  return entries.sort(function (a, b) {
    return a[1][key] - b[1][key];
  });
};

exports.isElEmpty = function (el) {
  return el.innerHTML.length <= 0;
};
},{"./State":"scripts/State.ts"}],"scripts/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipWrapperEl = exports.tabsContentWrapperEl = exports.tabsWrapperEl = exports.particlesCanvasContext = exports.particlesCanvasEl = exports.comboSignNumberEl = exports.comboSignEl = exports.topbarInventoryGenerationXpBarEl = exports.topbarInventoryGenerationLvOnRefine = exports.topbarInventoryGenerationLv = exports.topbarInventoryOresEl = exports.topbarInventoryEl = exports.oreHpEl = exports.oreSpriteEl = exports.oreSpriteContainerEl = exports.toastsContainerRightEl = exports.toastsContainerLeftEl = exports.toastsContainerEl = exports.textScrollerTextEl = exports.textScrollerContainerEl = exports.torchRight = exports.torchLeft = exports.gameContainerRight = exports.pageContainer = void 0;

var utils_1 = require("./utils");

exports.pageContainer = utils_1.select('.page-container');
exports.gameContainerRight = utils_1.select('.game-container-right');
exports.torchLeft = utils_1.select('.torch-left');
exports.torchRight = utils_1.select('.torch-right');
exports.textScrollerContainerEl = utils_1.select('.text-scroller-container');
exports.textScrollerTextEl = utils_1.select('.text-scroller-container p');
exports.toastsContainerEl = utils_1.select('.toasts-container');
exports.toastsContainerLeftEl = utils_1.select('.toasts-container .left');
exports.toastsContainerRightEl = utils_1.select('.toasts-container .right');
exports.oreSpriteContainerEl = utils_1.select('.ore-sprite-container');
exports.oreSpriteEl = utils_1.select('.ore-sprite');
exports.oreHpEl = utils_1.select('.ore-hp');
exports.topbarInventoryEl = utils_1.select('.topbar-inventory');
exports.topbarInventoryOresEl = utils_1.select('.topbar-inventory-ores > .amount');
exports.topbarInventoryGenerationLv = utils_1.select('.topbar-inventory-generation > .level');
exports.topbarInventoryGenerationLvOnRefine = utils_1.select('.topbar-inventory-generation > .level-on-refine');
exports.topbarInventoryGenerationXpBarEl = utils_1.select('.topbar-inventory-generation-xp .bar');
exports.comboSignEl = utils_1.select('.combo-sign');
exports.comboSignNumberEl = utils_1.select('.combo-sign span');
exports.particlesCanvasEl = utils_1.select('#particles');
exports.particlesCanvasContext = exports.particlesCanvasEl.getContext('2d');
exports.tabsWrapperEl = utils_1.select('.tabs-wrapper');
exports.tabsContentWrapperEl = utils_1.select('.tabs-content-wrapper');
exports.tooltipWrapperEl = utils_1.select('.tooltip-wrapper');
},{"./utils":"scripts/utils.ts"}],"scripts/OreParticle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateOreParticles = void 0;

var utils_1 = require("./utils");

var constants_1 = require("./constants");

var State_1 = require("./State");

var oreParticlesIndex = 0;
var settings = {
  gravity: 0.5,
  maxLife: 100
};

exports.generateOreParticles = function (event, amount) {
  if (amount === void 0) {
    amount = 4;
  }

  for (var i = 0; i < amount; i++) {
    new OreParticle(event);
  }
};

var OreParticle = function OreParticle(event) {
  // Particle position
  if (event) {
    this.x = event.clientX;
    this.y = event.clientY;
  } else {
    var oreSpriteDimensions = constants_1.oreSpriteEl.getBoundingClientRect();
    this.x = utils_1.getRandomNum(oreSpriteDimensions.left, oreSpriteDimensions.right);
    this.y = oreSpriteDimensions.top;
  } // Velocities


  this.vx = utils_1.getRandomNum(-2, 2, 5);
  this.vy = utils_1.getRandomNum(-2, -1, 5); // Size

  this.size = utils_1.getRandomNum(0.5, 2.5, 3); // Adding particle to index

  oreParticlesIndex += 1;
  State_1.InstanceState.oreParticles[oreParticlesIndex] = this;
  this.id = oreParticlesIndex;
  this.life = 0;
  this.opacity = 1;
};

OreParticle.prototype.draw = function () {
  // Move particle
  this.x += this.vx;
  this.y += this.vy; // Adjust for gravity

  this.vy += settings.gravity * Math.random(); // Age particle

  this.life += 1;
  this.opacity -= 0.02;

  if (this.life > settings.maxLife || this.y >= window.innerHeight) {
    delete State_1.InstanceState.oreParticles[this.id];
  } // Draw particle


  var color = utils_1.getRandomNum(150, 200);
  constants_1.particlesCanvasContext.beginPath();
  constants_1.particlesCanvasContext.fillStyle = "rgba( 255, 255, 255, " + this.opacity + " )"; // ctx.fillStyle = `rgba( ${color}, ${color}, ${color}, ${this.opacity} )`;

  constants_1.particlesCanvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
  constants_1.particlesCanvasContext.closePath();
  constants_1.particlesCanvasContext.fill();
};
},{"./utils":"scripts/utils.ts","./constants":"scripts/constants.ts","./State":"scripts/State.ts"}],"scripts/RisingText.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRisingText = void 0;

var utils_1 = require("./utils");

var constants_1 = require("./constants");

exports.generateRisingText = function (event, type, amount) {
  var el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.pointerEvents = 'none';
  el.style.color = 'white';
  el.style.fontSize = '24px';
  el.style.fontFamily = 'Germania One';
  el.style.zIndex = '2';
  el.style.textShadow = '0 0 1px rgba(0, 0, 0, 0.5)';
  el.style.animation = 'flyingNumber 2s forwards ease-out';

  switch (type) {
    case 'buy':
      el.style.color = 'crimson';
      el.style.fontSize = '30px';
      el.innerHTML = "-$";
      break;

    case 'weakSpot':
      el.style.fontSize = '28px';
      el.style.animationDuration = '2.5s';
      el.innerHTML = "+" + amount;
      break;

    case 'combo':
      el.innerHTML = amount + " hit combo";
      el.style.color = utils_1.getRandomColor();
      el.style.fontSize = '35px';
      el.style.animationDuration = '3s';
      break;

    case 'buildingOps':
      var oreSpriteDimensions = constants_1.oreSpriteEl.getBoundingClientRect();
      el.style.animation = 'buildingFlyingNumber 1.2s ease-out';
      el.style.left = (oreSpriteDimensions.left + oreSpriteDimensions.right) / 2 + 'px';
      el.style.top = (oreSpriteDimensions.top + oreSpriteDimensions.bottom) / 2 + 'px';
      el.innerHTML = "+" + amount;
      break;

    default:
      el.innerHTML = "+" + amount;
      break;
  }

  if (event) {
    el.style.left = event.clientX + utils_1.getRandomNum(-20, 20) + 'px';
    el.style.top = event.clientY + utils_1.getRandomNum(-5, 5) + 'px';
  }

  constants_1.pageContainer.append(el);
  el.addEventListener('animationend', function () {
    return utils_1.removeEl(el);
  });
};
},{"./utils":"scripts/utils.ts","./constants":"scripts/constants.ts"}],"scripts/Tabs.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateTabs = void 0;

var utils_1 = require("./utils");

var State_1 = require("./State");

var Tab = function Tab(o) {
  this.name = o.name;
  this.codeName = utils_1.getCodeName(o.name);
  this.isLocked = o.isLocked;
};

var tabs = [{
  name: 'store',
  isLocked: false
}, {
  name: 'smith',
  isLocked: true
}];

exports.instantiateTabs = function (t) {
  if (t === void 0) {
    t = JSON.parse(localStorage.getItem('tabs')) || tabs;
  }

  var builtTabs = [];
  t.forEach(function (tab) {
    builtTabs.push(new Tab(tab));
  });
  State_1.InstanceState.tabs = builtTabs;
};
},{"./utils":"scripts/utils.ts","./State":"scripts/State.ts"}],"scripts/Tooltip.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showTooltip = exports.hideTooltip = void 0;

var constants_1 = require("./constants");

var utils_1 = require("./utils");

var State_1 = require("./State");

exports.hideTooltip = function () {
  constants_1.tooltipWrapperEl.innerHTML = '';
  constants_1.tooltipWrapperEl.classList.remove('visible');
};

exports.showTooltip = function (event, tt) {
  constants_1.tooltipWrapperEl.classList.add('visible');
  var str = '';

  switch (tt.type) {
    case 'building':
      var price = utils_1.getGeometricSequencePrice(tt.building);
      str += "\n                <div class='tooltip-container tooltip-building tooltip-building-" + tt.building.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/building-" + tt.building.codeName + ".png'/>\n                        <div class='tooltip-target-name-container'>\n                            <p>" + tt.building.name + "</p>\n                            <small>[ " + tt.building.name + " Production Multiplier: <strong>" + tt.building.productionMultiplier + "x</strong> ]</small>\n                        </div>\n                        <p class='price' style='" + (State_1.State.inventory.ores < price ? 'color: crimson' : '') + "'>\n                            <img src='./images/ore.png'/>\n                            " + utils_1.beautifyNumber(price) + "\n                        </p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + tt.building.desc + "</p>\n                        <div class='stats'>\n                            <p>Each " + tt.building.name + " generates <strong>" + tt.building.baseProduction * tt.building.productionMultiplier + "</strong> ores per second.</p>";

      if (tt.building.owned > 0) {
        str += "\n                    <p><strong>" + tt.building.owned + " </strong>" + (tt.building.owned > 1 ? tt.building.namePlural + " are" : tt.building.name + " is") + " generating <strong>" + tt.building.owned * (tt.building.baseProduction * tt.building.productionMultiplier) + "</strong> ore per second.</p>\n                    <p class='building-percentage'>" + tt.building.name + "s are currently generating <strong>" + utils_1.beautifyNumber(utils_1.getPercentage(tt.building.owned * (tt.building.baseProduction * tt.building.productionMultiplier), State_1.State.ops)) + "%</strong> of your total OpS</p>\n                    ";
      }

      str += "\n                        </div>\n                    </div>\n                    <div class='tooltip-bottom'>\n                        <p>" + tt.building.flavorText + "</p>\n                    </div>\n                </div>\n            ";
      break;

    case 'upgrade':
      str += "\n                <div class='tooltip-container tooltip-upgrade tooltip-upgrade-" + tt.upgrade.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/upgrade-" + tt.upgrade.codeName + ".png'/>\n                        <p>" + tt.upgrade.name + "</p>\n                        <p class='price' style='" + (State_1.State.inventory.ores < tt.upgrade.price ? 'color: crimson' : '') + "'>\n                            <img src='./images/ore.png'/>\n                            " + utils_1.beautifyNumber(tt.upgrade.price) + "\n                        </p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + tt.upgrade.desc + "</p>\n                    </div>\n                    <div class='tooltip-bottom'>\n                        <p>" + tt.upgrade.flavorText + "</p>\n                    </div>\n                </div>\n            ";
      break;

    case 'smithUpgrade':
      var upgrade = tt.smithUpgrade;
      str += "\n                <div class='tooltip-container tooltip-smithUpgrade tooltip-smithUpgrade-" + upgrade.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/smithUpgrade-" + upgrade.codeName + ".png'/>\n                        <p>" + upgrade.name + "</p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + upgrade.desc + "</p>\n                        <div class='cost'>\n                            <p>Requires:</p>\n                            <p>Refined Ores: " + upgrade.cost + "</p>\n                            <p>Power Needed: " + utils_1.beautifyNumber(upgrade.powerNeeded) + "</p>\n                        </div>\n                    </div>\n                    ";

      if (upgrade.flavorText) {
        str += "\n                    <div class='tooltip-bottom'>\n                        <p>" + upgrade.flavorText + "</p>\n                    </div>";
      }

      str += "\n                </div>\n            ";
      break;

    default:
      console.log('no tooltip yet for this type:', tt.type);
  }

  constants_1.tooltipWrapperEl.innerHTML = str;

  switch (tt.type) {
    default:
      var tooltipWidth = 350;
      constants_1.tooltipWrapperEl.style.width = tooltipWidth + 'px';
      constants_1.tooltipWrapperEl.style.top = event.clientY - constants_1.tooltipWrapperEl.getBoundingClientRect().height / 2 + 'px';
      constants_1.tooltipWrapperEl.style.left = constants_1.gameContainerRight.getBoundingClientRect().left - tooltipWidth - 20 + 'px';
  }
};
},{"./constants":"scripts/constants.ts","./utils":"scripts/utils.ts","./State":"scripts/State.ts"}],"scripts/Buildings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateBuildings = void 0;

var utils_1 = require("./utils");

var index_1 = require("./index");

var State_1 = require("./State");

var Updates_1 = require("./Updates");

var Tooltip_1 = require("./Tooltip");

var RisingText_1 = require("./RisingText");

var id = 0;

var Building = function Building(b) {
  var _this = this;

  this.id = id;
  this.name = b.name;
  this.codeName = utils_1.getCodeName(b.name);
  this.namePlural = b.namePlural;
  this.desc = b.desc;
  this.flavorText = b.flavorText;
  this.currentPrice = b.currentPrice || b.basePrice;
  this.basePrice = b.basePrice;
  this.priceScale = b.priceScale;
  this.baseProduction = b.baseProduction;
  this.productionMultiplier = b.productionMultiplier || 1;
  this.isLocked = b.isLocked;
  this.isHidden = b.isHidden;
  this.owned = b.owned || 0;
  this.onBuy = b.onBuy || null;
  id += 1;

  this.buy = function (event) {
    if (index_1.spend(utils_1.getGeometricSequencePrice(_this))) {
      _this.owned += State_1.InstanceState.buyAmount;
      _this.currentPrice = _this.basePrice * Math.pow(_this.priceScale, _this.owned);
      index_1.updateOPS(); // Need to call the function directly so OPS gets calculated instantly

      Updates_1.UpdatesState.updateOres = true;
      Updates_1.UpdatesState.updateTabContent = true;
      updateBuildingsVisibility(_this.id);

      if (_this.onBuy) {
        if (_this.onBuy.unlockUpgrade) {
          _this.onBuy.unlockUpgrade.forEach(function (upgrade) {
            if (_this.owned >= upgrade.amountNeeded) {
              State_1.State.upgrades[upgrade.name].isLocked = false;
              Updates_1.UpdatesState.updateTabContent = true;
              console.log('UPGRADES', State_1.State.upgrades);
            }
          });
        }
      }

      RisingText_1.generateRisingText(event, 'buy');
      Tooltip_1.showTooltip(event, {
        type: 'building',
        building: _this
      });
    }
  };

  this.mousemove = function (event) {
    return Tooltip_1.showTooltip(event, {
      type: 'building',
      building: _this
    });
  };
};

var updateBuildingsVisibility = function updateBuildingsVisibility(index) {
  var sortedBuildingsById = utils_1.sortObj(State_1.State.buildings, id);
  var nextBuilding = sortedBuildingsById[index + 1][1];
  var nextNextNextBuilding = sortedBuildingsById[index + 3][1];
  if (nextBuilding) nextBuilding.isLocked = false;
  if (nextNextNextBuilding) nextNextNextBuilding.isHidden = false;
};

var buildings = [{
  name: 'School',
  namePlural: 'Schools',
  desc: 'Teach students about the wonders of ore.',
  flavorText: "Jesus christ Marie, they're minerals!",
  baseProduction: 0.5,
  basePrice: 12,
  priceScale: 1.12,
  isLocked: false,
  isHidden: false,
  onBuy: {
    unlockUpgrade: [{
      name: 'Composition Notebooks',
      amountNeeded: 1
    }, {
      name: 'No. 2 Pencil',
      amountNeeded: 5
    }, {
      name: '3 Ring Binder',
      amountNeeded: 10
    }, {
      name: 'Looseleaf',
      amountNeeded: 20
    }, {
      name: 'Schoolbag',
      amountNeeded: 50
    }, {
      name: 'Fresh Pink Eraser',
      amountNeeded: 100
    }, {
      name: 'Gum',
      amountNeeded: 200
    }, {
      name: 'Report Card',
      amountNeeded: 400
    }]
  }
}, {
  name: 'Farm',
  namePlural: 'Farms',
  desc: 'Cultivate the lands for higher quality ores.',
  flavorText: 'This totally makes sense...',
  baseProduction: 2,
  basePrice: 240,
  priceScale: 1.15,
  isLocked: true,
  isHidden: false,
  onBuy: {
    unlockUpgrade: [{
      name: 'Manure Spreader',
      amountNeeded: 1
    }, {
      name: 'Pitchfork',
      amountNeeded: 5
    }, {
      name: 'Tractor',
      amountNeeded: 10
    }, {
      name: 'Rotary Cutter',
      amountNeeded: 20
    }, {
      name: 'Hoe',
      amountNeeded: 50
    }, {
      name: 'Baler',
      amountNeeded: 100
    }, {
      name: 'Sickle',
      amountNeeded: 200
    }, {
      name: 'Scythe',
      amountNeeded: 400
    }]
  }
}, {
  name: 'Quarry',
  namePlural: 'Quarries',
  desc: 'Designated mining area.',
  flavorText: 'Diggy diggy hole.',
  baseProduction: 20,
  basePrice: 2520,
  priceScale: 1.15,
  isLocked: true,
  isHidden: false,
  onBuy: {
    unlockUpgrade: [{
      name: 'Floodlights',
      amountNeeded: 1
    }, {
      name: 'Twill Rope',
      amountNeeded: 5
    }, {
      name: 'Wooden Compass',
      amountNeeded: 10
    }, {
      name: 'Ore Filter',
      amountNeeded: 20
    }, {
      name: 'Waterproof Tape',
      amountNeeded: 50
    }, {
      name: 'Metallic Compass',
      amountNeeded: 100
    }, {
      name: 'Miners Mask',
      amountNeeded: 200
    }, {
      name: 'Cape Chisel',
      amountNeeded: 400
    }]
  }
}, {
  name: 'Church',
  namePlural: 'Churches',
  desc: 'Praise to ye Old Ore Gods.',
  flavorText: 'In ore name we pray, amen.',
  baseProduction: 320,
  basePrice: 37800,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true,
  onBuy: {
    unlockUpgrade: [{
      name: 'Scripture Reading',
      amountNeeded: 1
    }, {
      name: 'Communion',
      amountNeeded: 5
    }, {
      name: 'Worship Session',
      amountNeeded: 10
    }, {
      name: '7th Day',
      amountNeeded: 20
    }, {
      name: 'Eden Apple',
      amountNeeded: 50
    }, {
      name: 'Apocalypse',
      amountNeeded: 100
    }, {
      name: 'Judgement Day',
      amountNeeded: 200
    }, {
      name: 'Rapture',
      amountNeeded: 400
    }]
  }
}, {
  name: 'Factory',
  namePlural: 'Factories',
  desc: 'Manufacture your ores.',
  flavorText: 'Assembly line this SH%* up!',
  baseProduction: 4480,
  basePrice: 490000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true,
  onBuy: {
    unlockUpgrade: [{
      name: 'Rubber Conveyor Belt',
      amountNeeded: 1
    }, {
      name: 'Floppy Squiggle Tubes',
      amountNeeded: 5
    }, {
      name: 'Clicky Squish Buttons',
      amountNeeded: 10
    }, {
      name: 'Metallic Magnetic Panels',
      amountNeeded: 20
    }, {
      name: 'Hydroponic Auxilleration',
      amountNeeded: 50
    }]
  }
}, {
  name: 'Crypt',
  namePlural: 'Crypts',
  desc: 'Raise dead ores from the graves.',
  flavorText: 'Spooky dooky ores.',
  baseProduction: 67200,
  basePrice: 7900000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Hospital',
  namePlural: 'Hospitals',
  desc: 'Heal the poor ol damaged ores.',
  flavorText: 'An apple a day keeps the ore cancer away.',
  baseProduction: 1350000,
  basePrice: 196600000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Citadel',
  namePlural: 'Citadels',
  desc: 'wip',
  flavorText: 'wip',
  baseProduction: 14800000,
  basePrice: 2800000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Xeno Spaceship',
  namePlural: 'Xeno Spaceships',
  desc: 'wip',
  flavorText: 'wip',
  baseProduction: 192200000,
  basePrice: 49500000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Sky Castle',
  namePlural: 'Sky Castles',
  desc: 'Use magic beans to reach an egg based source of ores.',
  flavorText: 'wip',
  baseProduction: 3800000000,
  basePrice: 1240000000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Eon Portal',
  namePlural: 'Eon Portals',
  desc: 'Steal ore from your past and future self.',
  flavorText: 'wip',
  baseProduction: 45150000000,
  basePrice: 18580000000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Sacred Mine',
  namePlural: 'Sacred Mines',
  desc: 'wip',
  flavorText: 'wip',
  baseProduction: 691900000000,
  basePrice: 297200000000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'O.A.R.D.I.S.',
  namePlural: 'O.A.R.D.I.S.',
  desc: 'wip',
  flavorText: 'wip',
  baseProduction: 17300000000000,
  basePrice: 8915000000000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Final Destination',
  namePlural: 'Final Destinations',
  desc: 'The Final Destination.',
  flavorText: 'Thank you so much for playing <3.',
  baseProduction: 1000000000000000000,
  basePrice: 1e+33,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}];

exports.instantiateBuildings = function () {
  var state = JSON.parse(localStorage.getItem('state'));
  var builtBuildings = {};

  if (state) {
    if (!utils_1.isObjEmpty(state.buildings)) {
      for (var key in state.buildings) {
        builtBuildings[key] = new Building(state.buildings[key]);
      }
    }
  } else {
    buildings.forEach(function (building) {
      builtBuildings[building.name] = new Building(building);
    });
  }

  State_1.State.buildings = builtBuildings;
  console.log('buildings', State_1.State.buildings);
};
},{"./utils":"scripts/utils.ts","./index":"scripts/index.ts","./State":"scripts/State.ts","./Updates":"scripts/Updates.ts","./Tooltip":"scripts/Tooltip.ts","./RisingText":"scripts/RisingText.ts"}],"scripts/SmithUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateSmithUpgrades = void 0;

var utils_1 = require("./utils");

var State_1 = require("./State");

var _1 = require(".");

var Updates_1 = require("./Updates");

var RisingText_1 = require("./RisingText");

var Tooltip_1 = require("./Tooltip"); // once quest board is unlocked,
// upgrade called Boots of Swiftness
// that'll increase quest speed


var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = MINUTE * 60;

var SmithUpgrade = function SmithUpgrade(u) {
  var _this = this;

  this.name = u.name;
  this.codeName = utils_1.getCodeName(u.name);
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

  this.complete = function () {
    _this.completedOn = new Date();
    _this.isInProgress = false;
    Updates_1.UpdatesState.updateTabContent = true;
    Updates_1.UpdatesState.updateTabs = true;
    State_1.State.smith.currentProgress = 0;
    State_1.State.smith.inProgress = false;
    State_1.State.smith.currentUpgrade = _this;

    _1.completeSmithUpgrade(_this.codeName);

    if (_this.isRepeatable) {
      _this.powerNeeded *= _this.priceIncrease;
    }

    if (_this.onComplete) {
      if (_this.onComplete.unlockSmithUpgrade) {
        _this.onComplete.unlockSmithUpgrade.forEach(function (upgrade) {
          unlockSmithUpgrade(upgrade, _this.codeName);
        });
      }
    }
  };

  this.start = function () {
    console.log('starting a smith upgrade');
    _this.isInProgress = true;
    _this.startedOn = new Date();
    Updates_1.UpdatesState.updateTabContent = true;
    Updates_1.UpdatesState.updateTabs = true;
    State_1.State.smith.currentProgress = 0;
    State_1.State.smith.inProgress = true;
    State_1.State.smith.currentUpgrade = _this;
  };

  this.buy = function (event) {
    console.log('buying a smith upgrade', event);

    if (!State_1.State.smith.inProgress) {
      if (_1.spend(_this.cost, 'refined')) {
        RisingText_1.generateRisingText(event, 'buy');
        Tooltip_1.hideTooltip();

        _this.start();
      }
    }
  };

  this.removeNew = function (event) {
    _this.isNew = false;

    if (event.target.children[1]) {
      utils_1.removeEl(event.target.children[1]);
    }
  };
};

var unlockSmithUpgrade = function unlockSmithUpgrade(targetUpgrade, previousUpgrade) {
  var upgrade = State_1.InstanceState.smithUpgrades.find(function (upgrade) {
    return upgrade.codeName === targetUpgrade;
  });
  var unlock = true; // Checks to see if there is a requires object

  if (upgrade.requires) {
    // Loop through the object
    for (var upgradeName in upgrade.requires) {
      // Check if key is equal to a just-completed upgrade
      if (upgradeName === previousUpgrade) {
        // Set to true (owned)
        upgrade.requires[upgradeName] = true;
      } // If any values are false, don't unlock


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

var smithUpgrades = [{
  name: 'Fragility Spectacles',
  desc: 'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 5x the normal amount.',
  flavorText: 'I can see... I can FIGHT!',
  powerNeeded: 15,
  // powerNeeded: 150,
  cost: 0,
  isLocked: false,
  onComplete: {
    unlockSmithUpgrade: ['smithPowerUp']
  }
}, {
  name: 'Quest Board',
  desc: 'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!',
  flavorText: "Fetch quests are the greatest aren't they?",
  powerNeeded: 1000,
  cost: 1,
  isLocked: false
}, {
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
}];

function instantiateSmithUpgrades(u) {
  if (u === void 0) {
    u = JSON.parse(localStorage.getItem('smithUpgrades')) || smithUpgrades;
  }

  var builtSmithUpgrades = [];
  u.forEach(function (upgrade) {
    builtSmithUpgrades.push(new SmithUpgrade(upgrade));
  });
  State_1.InstanceState.smithUpgrades = builtSmithUpgrades;
}

exports.instantiateSmithUpgrades = instantiateSmithUpgrades;
},{"./utils":"scripts/utils.ts","./State":"scripts/State.ts",".":"scripts/index.ts","./Updates":"scripts/Updates.ts","./RisingText":"scripts/RisingText.ts","./Tooltip":"scripts/Tooltip.ts"}],"scripts/Toast.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;

var State_1 = require("./State");

var utils_1 = require("./utils");

var constants_1 = require("./constants");

var toastIndex = 0;

exports.Toast = function (type, achievement) {
  var _this = this;

  var toastEl = utils_1.createEl('div', ['toast', "toast-" + toastIndex]);
  this.id = toastIndex;
  this.self = toastEl;

  this.close = function () {
    _this.self.addEventListener('transitionend', function () {
      return utils_1.removeEl(_this.self);
    });

    _this.self.classList.add('close');
  };

  State_1.InstanceState.toasts.push(this);
  toastIndex++;

  switch (type) {
    case 'achievement':
      toastEl.classList.add('toast-achievement');
      var closeBtn = utils_1.createEl('svg');
      closeBtn.innerHTML = "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-x\" width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#ffffff\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\"/>\n                    <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\" />\n                    <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\" />\n                </svg>\n            ";
      closeBtn.addEventListener('click', function () {
        return _this.close();
      });
      toastEl.innerHTML = "\n                <div class='toast-top'>\n                    <img src='https://via.placeholder.com/32/'>\n                    <h2 class='achievement-name'>" + achievement.name + "</h2>\n                </div>\n                <div class='toast-middle'>" + achievement.desc + "</div>\n            ";
      toastEl.append(closeBtn);
      constants_1.toastsContainerLeftEl.append(toastEl);
      break;

    case 'notification':
      constants_1.toastsContainerRightEl.append(toastEl);
      break;

    default:
      console.log('type not recognized', type);
  }
};
},{"./State":"scripts/State.ts","./utils":"scripts/utils.ts","./constants":"scripts/constants.ts"}],"scripts/Achievements.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateAchievements = void 0;

var utils_1 = require("./utils");

var Toast_1 = require("./Toast");

var State_1 = require("./State");

var Achievement = function Achievement(achievement) {
  var _this = this;

  this.name = achievement.name;
  this.codeName = utils_1.getCodeName(achievement.name);
  this.desc = achievement.desc;
  this.isWon = achievement.won || false;

  this.win = function () {
    if (!_this.isWon) {
      _this.isWon = true;
      new Toast_1.Toast('achievement', _this);
    }
  };
};

var achievements = [{
  name: 'Newbie Miner',
  desc: 'Break your first rock'
}, {
  name: 'Novice Miner',
  desc: 'Break 10 rocks'
}, {
  name: 'Intermediate Miner',
  desc: 'Break 25 rocks'
}, {
  name: 'Advanced Miner',
  desc: 'Break 50 rocks'
}, {
  name: 'Master Miner',
  desc: 'Break 100 rocks'
}, {
  name: 'Chief Miner',
  desc: 'Break 200 rocks'
}, {
  name: 'Exalted Miner',
  desc: 'Break 500 rocks'
}, {
  name: 'God Miner',
  desc: 'Break 1000 rocks'
}, {
  name: 'Combo Baby',
  desc: 'Reach a 5 hit combo'
}, {
  name: 'Combo Pleb',
  desc: 'Reach a 20 hit combo'
}, {
  name: 'Combo Squire',
  desc: 'Reach a 50 hit combo'
}, {
  name: 'Combo Knight',
  desc: 'Reach a 100 hit combo'
}, {
  name: 'Combo King',
  desc: 'Reach a 200 hit combo'
}, {
  name: 'Combo Master',
  desc: 'Reach a 350 hit combo'
}, {
  name: 'Combo Devil',
  desc: 'Reach a 666 hit combo'
}, {
  name: 'Combo Jackpot',
  desc: 'Reach a 777 hit combo'
}, {
  name: 'Combo God',
  desc: 'Reach a 1000 hit combo'
}, {
  name: 'Combo Saiyan',
  desc: 'Reach a 5000 hit combo'
}, {
  name: 'Combo Saitama',
  desc: 'Reach a 10000 hit combo'
}, {
  name: 'Not Even A Scratch',
  desc: 'Deal more than 100 damage from a hit'
}, {
  name: 'Didnt Even Hurt',
  desc: 'Deal more than 1,000 damage from a hit'
}, {
  name: 'That Tickled',
  desc: 'Deal more than 100,000 damage from a hit'
}, {
  name: 'I Felt That',
  desc: 'Deal more than 1,000,000 damage from a hit'
}, {
  name: 'Ore-aid Stand',
  desc: 'Reach 50 OpS'
}, {
  name: 'Ore Store',
  desc: 'Reach 10,000 OpS'
}, {
  name: '401k',
  desc: 'Reach 401,000 OpS'
}, {
  name: 'Retirement Plan',
  desc: 'Reach 5,000,000 OpS'
}, {
  name: 'Hedge Fund',
  desc: '1,000,000,000 OpS'
}];

exports.instantiateAchievements = function () {
  var state = JSON.parse(localStorage.getItem('state'));
  var builtAchievements = {};

  if (state) {
    if (!utils_1.isObjEmpty(state.achievements)) {
      for (var key in state.achievements) {
        builtAchievements[key] = new Achievement(state.achievements[key]);
      }
    }
  } else {
    achievements.forEach(function (achievement) {
      builtAchievements[achievement.name] = new Achievement(achievement);
    });
  }

  State_1.State.achievements = builtAchievements;
};
},{"./utils":"scripts/utils.ts","./Toast":"scripts/Toast.ts","./State":"scripts/State.ts"}],"scripts/upgrades/schoolUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schoolUpgrades = void 0;
exports.schoolUpgrades = [{
  name: 'Composition Notebooks',
  flavorText: 'College ruled!',
  price: 300,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'No. 2 Pencil',
  flavorText: 'Test ready!',
  price: 1000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: '3 Ring Binder',
  flavorText: 'Be the Lord of the Rings with our new 2.5" binder!',
  price: 12000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'Looseleaf',
  flavorText: '"Can I borrow a sheet?"',
  price: 450000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'Schoolbag',
  flavorText: 'Break your back carrying on of these stylish bags!',
  price: 5500000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 2]
  }
}, {
  name: 'Fresh Pink Eraser',
  flavorText: 'Never use this. Keep it pristine.',
  price: 22500000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'Gum',
  flavorText: "With this, you'll be the most popular kid in the class.",
  price: 620000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'Hallpass',
  flavorText: 'Wander the halls without a care in the world.',
  price: 3000000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}, {
  name: 'Report Card',
  flavorText: 'Determines your fate for the upcoming months.',
  price: 82000000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['School', 1]
  }
}];
},{}],"scripts/upgrades/farmUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.farmUpgrades = void 0;
exports.farmUpgrades = [{
  name: 'Manure Spreader',
  flavorText: 'The poop helps the ore mature.',
  price: 950,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Pitchfork',
  flavorText: 'Torches not included...',
  price: 12500,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Tractor',
  flavorText: 'Im in me mums tractor.',
  price: 265000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Rotary Cutter',
  flavorText: 'Not even grass can stop us now.',
  price: 3450000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Hoe',
  flavorText: 'hehe...',
  price: 69000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Baler',
  flavorText: '"Baler? I hardly know her."',
  price: 400000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Sickle',
  flavorText: 'For easy sickle-ing of course.',
  price: 4700300000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}, {
  name: 'Scythe',
  flavorText: "It's like a sickle... but bigger.",
  price: 70000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Farm', 1]
  }
}];
},{}],"scripts/upgrades/quarryUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quarryUpgrades = void 0;
exports.quarryUpgrades = [{
  name: 'Floodlights',
  flavorText: 'Staring into one of them is like starting into a billion suns.',
  price: 1900,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Twill Rope',
  flavorText: 'Study enuff...',
  price: 11000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Wooden Compass',
  flavorText: 'Responds to ore magnetism.',
  price: 510000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Ore Filter',
  flavorText: 'Less sorting, more ore.',
  price: 7000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Waterproof Tape',
  flavorText: 'Poor mans Flex Tape®',
  price: 80000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Metallic Compass',
  flavorText: 'Looks cooler, does the same thing.',
  price: 210500000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Miners Mask',
  flavorText: 'Asbestos be gone!',
  price: 5000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Cape Chisel',
  flavorText: 'Faster than mining!',
  price: 27000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Ore Splitter',
  flavorText: 'Right down the middle',
  price: 600000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}, {
  name: 'Laser Drill',
  flavorText: 'tbd',
  price: 6300000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Quarry', 1]
  }
}];
},{}],"scripts/upgrades/churchUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.churchUpgrades = void 0;
exports.churchUpgrades = [{
  name: 'Scripture Reading',
  flavorText: 'Read the words of our l-ore-d and savior.',
  price: 60000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 1]
  }
}, {
  name: 'Communion',
  flavorText: 'Note: Not communism.',
  price: 740000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 1]
  }
}, {
  name: 'Worship Session',
  flavorText: 'More like W-ore-ship... haha...',
  price: 2800000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 1]
  }
}, {
  name: '7th Day',
  flavorText: 'You would think a day of worship is one less day of work but somehow it works out to more ore!',
  price: 62000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 1]
  }
}, {
  name: 'Eden Apple',
  flavorText: "You can't resist this forbidden fruit.",
  price: 777000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 1]
  }
}, {
  name: 'Apocalypse',
  flavorText: 'Hell on earth.',
  price: 8200000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 4] // change_building_image: 'building-church-evil',
    // change_building_desc: 'Praise to the Ore Demons',

  }
}, {
  name: 'Judgement Day',
  flavorText: "It's the end of the world.",
  price: 32000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 3]
  }
}, {
  name: 'Rapture',
  flavorText: 'Are you saved?',
  price: 700000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 3]
  }
}, {
  name: 'Chaos',
  flavorText: '...',
  price: 2450000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 2]
  }
}, {
  name: 'Satanic Ritual',
  flavorText: 'Sacrifices are the only way to appease the demons.',
  price: 33000000000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Church', 2]
  }
}];
},{}],"scripts/upgrades/factoryUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factoryUpgrades = void 0;
exports.factoryUpgrades = [{
  name: 'Rubber Conveyor Belt',
  flavorText: "These moves the things to there, that's all I know.",
  price: 30000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Factory', 1]
  }
}, {
  name: 'Floppy Squiggle Tubes',
  flavorText: "If I could tell you what these were for you'd buy twice as many.",
  price: 300000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Factory', 1]
  }
}, {
  name: 'Clicky Squish Buttons',
  flavorText: 'These go next to the Squishy Click Buttons.',
  price: 44000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Factory', 1]
  }
}, {
  name: 'Metallic Magnetic Panels',
  flavorText: 'These are actually for my fridge.',
  price: 800000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Factory', 1]
  }
}, {
  name: 'Hydroponic Auxilleration',
  flavorText: 'Aquaman is here to stay.',
  price: 5300000000,
  onBuy: {
    increaseBuildingProductionMultiplier: ['Factory', 1]
  }
}];
},{}],"scripts/upgrades/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upgrades = void 0;

var schoolUpgrades_1 = require("./schoolUpgrades");

var farmUpgrades_1 = require("./farmUpgrades");

var quarryUpgrades_1 = require("./quarryUpgrades");

var churchUpgrades_1 = require("./churchUpgrades");

var factoryUpgrades_1 = require("./factoryUpgrades");

exports.upgrades = {
  schoolUpgrades: schoolUpgrades_1.schoolUpgrades,
  farmUpgrades: farmUpgrades_1.farmUpgrades,
  quarryUpgrades: quarryUpgrades_1.quarryUpgrades,
  churchUpgrades: churchUpgrades_1.churchUpgrades,
  factoryUpgrades: factoryUpgrades_1.factoryUpgrades
};
},{"./schoolUpgrades":"scripts/upgrades/schoolUpgrades.ts","./farmUpgrades":"scripts/upgrades/farmUpgrades.ts","./quarryUpgrades":"scripts/upgrades/quarryUpgrades.ts","./churchUpgrades":"scripts/upgrades/churchUpgrades.ts","./factoryUpgrades":"scripts/upgrades/factoryUpgrades.ts"}],"scripts/Upgrades.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateUpgrades = void 0;

var utils_1 = require("./utils");

var State_1 = require("./State");

var Tooltip_1 = require("./Tooltip");

var index_1 = require("./upgrades/index");

var _1 = require(".");

var Updates_1 = require("./Updates");

var Upgrade = function Upgrade(upgrade) {
  var _this = this;

  this.name = upgrade.name;
  this.codeName = utils_1.getCodeName(upgrade.name);
  this.desc = upgrade.desc || buildUpgradeDesc(upgrade);
  this.flavorText = upgrade.flavorText;
  this.price = upgrade.price;
  this.onBuy = upgrade.onBuy;
  this.isLocked = upgrade.isLocked === false ? false : true;
  this.isOwned = upgrade.isOwned === false ? false : false;

  this.buy = function (event) {
    if (_1.spend(_this.price)) {
      _this.isOwned = true;

      if (_this.onBuy) {
        if (_this.onBuy.increaseBuildingProductionMultiplier) {
          State_1.State.buildings[_this.onBuy.increaseBuildingProductionMultiplier[0]].productionMultiplier += _this.onBuy.increaseBuildingProductionMultiplier[1];
          Updates_1.UpdatesState.updateOPS = true;
        }
      }

      var upgradeEl = event.target;
      var upgradesContainerEl = utils_1.select('.upgrades-container');
      utils_1.removeEl(upgradeEl);
      if (utils_1.isElEmpty(upgradesContainerEl)) Updates_1.UpdatesState.updateTabContent = true;
    }
  };

  this.mousemove = function (event) {
    return Tooltip_1.showTooltip(event, {
      type: 'upgrade',
      upgrade: _this
    });
  };
};

var buildUpgradeDesc = function buildUpgradeDesc(upgrade) {
  var building = State_1.State.buildings[upgrade.onBuy.increaseBuildingProductionMultiplier[0]];
  var desc = "Increases the production multiplier of " + building.namePlural + " by " + upgrade.onBuy.increaseBuildingProductionMultiplier[1];
  return desc;
};

var upgrades = __spreadArrays(index_1.upgrades.schoolUpgrades, index_1.upgrades.farmUpgrades, index_1.upgrades.quarryUpgrades, index_1.upgrades.churchUpgrades, index_1.upgrades.factoryUpgrades);

exports.instantiateUpgrades = function () {
  var state = JSON.parse(localStorage.getItem('state'));
  var builtUpgrades = {};

  if (state) {
    if (!utils_1.isObjEmpty(state.upgrades)) {
      for (var key in state.upgrades) {
        builtUpgrades[key] = new Upgrade(state.upgrades[key]);
      }
    }
  } else {
    upgrades.forEach(function (upgrade) {
      builtUpgrades[upgrade.name] = new Upgrade(upgrade);
    });
  }

  State_1.State.upgrades = builtUpgrades;
};
},{"./utils":"scripts/utils.ts","./State":"scripts/State.ts","./Tooltip":"scripts/Tooltip.ts","./upgrades/index":"scripts/upgrades/index.ts",".":"scripts/index.ts","./Updates":"scripts/Updates.ts"}],"scripts/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeSmithUpgrade = exports.updateOPS = exports.spend = void 0;

var State_1 = require("./State");

var Updates_1 = require("./Updates");

var constants = __importStar(require("./constants"));

var utils_1 = require("./utils");

var OreParticle_1 = require("./OreParticle");

var RisingText_1 = require("./RisingText");

var Tabs_1 = require("./Tabs");

var Buildings_1 = require("./Buildings");

var Tooltip_1 = require("./Tooltip");

var SmithUpgrades_1 = require("./SmithUpgrades");

var Achievements_1 = require("./Achievements");

var Upgrades_1 = require("./Upgrades");

var gainOre = function gainOre(amount, damageOre) {
  if (damageOre === void 0) {
    damageOre = true;
  }

  State_1.State.inventory.ores += amount;
  if (damageOre) handleOreDamage(amount);
  Updates_1.UpdatesState.updateOres = true;
};

exports.spend = function (amount, type) {
  if (type === void 0) {
    type = 'ores';
  }

  if (State_1.State.inventory[type] >= amount) {
    State_1.State.inventory.ores -= amount;
    return true;
  }

  return false;
};

var handleOreDamage = function handleOreDamage(damage) {
  State_1.State.ore.hp -= damage;
  if (State_1.State.ore.hp <= 0) handleBrokenOre();
  Updates_1.UpdatesState.updateOreSprite = true;
  Updates_1.UpdatesState.updateOreHp = true;
};

var handleBrokenOre = function handleBrokenOre() {
  gainGenerationXp(50);
  generateNewOre();
  State_1.State.ore.spriteType = utils_1.getRandomNum(1, 5);
  State_1.State.stats.rocksDestroyed++;
  if (State_1.State.stats.rocksDestroyed === 1) winAchievement('Newbie Miner');
  if (State_1.State.stats.rocksDestroyed === 10) winAchievement('Novice Miner');
  if (State_1.State.stats.rocksDestroyed === 25) winAchievement('Intermediate Miner');
  if (State_1.State.stats.rocksDestroyed === 50) winAchievement('Advanced Miner');
  if (State_1.State.stats.rocksDestroyed === 100) winAchievement('Master Miner');
  if (State_1.State.stats.rocksDestroyed === 200) winAchievement('Chief Miner');
  if (State_1.State.stats.rocksDestroyed === 500) winAchievement('Exalted Miner');
  if (State_1.State.stats.rocksDestroyed === 1000) winAchievement('God Miner');
  if (State_1.State.stats.rocksDestroyed === 1) unlockTab('smith');
};

var generateNewOre = function generateNewOre() {
  State_1.State.ore.maxHp *= 1.13;
  State_1.State.ore.hp = State_1.State.ore.maxHp;
};

var updateComboSign = function updateComboSign() {
  if (!constants.comboSignEl.classList.contains('visible')) instantiateComboSign();
  constants.comboSignNumberEl.innerHTML = "" + State_1.State.stats.currentCombo;
};

var handleOreClick = function handleOreClick(event, weakSpotClick) {
  if (weakSpotClick === void 0) {
    weakSpotClick = false;
  }

  var amount = State_1.State.opc;

  if (weakSpotClick) {
    amount *= State_1.State.stats.weakSpotMultiplier;
    State_1.State.stats.weakSpotClicks++;
    State_1.State.stats.currentCombo++;
    gainGenerationXp(3);
    RisingText_1.generateRisingText(event, 'weakSpot', amount);
    if (State_1.State.stats.currentCombo % 5 === 0) RisingText_1.generateRisingText(event, 'combo', State_1.State.stats.currentCombo);
    if (State_1.State.stats.currentCombo > State_1.State.stats.highestCombo) State_1.State.stats.highestCombo = State_1.State.stats.currentCombo;
    if (State_1.State.stats.currentCombo === 5) winAchievement('Combo Baby');
    if (State_1.State.stats.currentCombo === 20) winAchievement('Combo Pleb');
    if (State_1.State.stats.currentCombo === 50) winAchievement('Combo Squire');
    if (State_1.State.stats.currentCombo === 100) winAchievement('Combo Knight');
    if (State_1.State.stats.currentCombo === 200) winAchievement('Combo King');
    if (State_1.State.stats.currentCombo === 350) winAchievement('Combo Master');
    if (State_1.State.stats.currentCombo === 666) winAchievement('Combo Devil');
    if (State_1.State.stats.currentCombo === 777) winAchievement('Combo Jackpot');
    if (State_1.State.stats.currentCombo === 1000) winAchievement('Combo God');
    if (State_1.State.stats.currentCombo === 5000) winAchievement('Combo Saiyan');
    if (State_1.State.stats.currentCombo === 10000) winAchievement('Combo Saitama');
    generateWeakSpot();
  } else {
    if (State_1.State.stats.currentCombo > 0) {
      State_1.State.stats.currentCombo = 0;
    }

    gainGenerationXp(1);
    RisingText_1.generateRisingText(event, null, amount);
  }

  if (amount >= 100) winAchievement('Not Even A Scratch');
  if (amount >= 1000) winAchievement('Didnt Even Hurt');
  if (amount >= 100000) winAchievement('That Tickled');
  if (amount >= 1000000) winAchievement('I Felt That');
  updateComboSign();
  gainOre(amount);
  OreParticle_1.generateOreParticles(event);
  State_1.State.stats.oreClicks++;
};

var generateWeakSpot = function generateWeakSpot() {
  var weakSpot = utils_1.select('.weak-spot');

  if (!weakSpot) {
    weakSpot = utils_1.createEl('div', ['weak-spot']);
    weakSpot.addEventListener('click', function (event) {
      return handleOreClick(event, true);
    });
    constants.oreSpriteContainerEl.append(weakSpot);
  }

  var x = utils_1.getRandomNum(0, constants.oreSpriteContainerEl.offsetWidth - 20);
  var y = utils_1.getRandomNum(0, constants.oreSpriteContainerEl.offsetHeight - 20);
  weakSpot.style.left = x + 'px';
  weakSpot.style.bottom = y + 'px';
};

var winAchievement = function winAchievement(achievementName) {
  var achievement = State_1.State.achievements[achievementName];
  achievement.win();
}; // - -----------------------------------------------------------------------------------
// - GENERATION STUFF ------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var gainGenerationXp = function gainGenerationXp(amount) {
  State_1.State.generation.xp += amount;
  if (State_1.State.generation.xp >= State_1.State.generation.maxXp) handleGenerationLvlUp();
  Updates_1.UpdatesState.updateGenerationXp = true;
};

var handleGenerationLvlUp = function handleGenerationLvlUp() {
  State_1.State.generation.maxXp *= 1.15;
  State_1.State.generation.xp = 0;
  State_1.State.generation.lvOnRefine += 1;
  Updates_1.UpdatesState.updateGenerationLvOnRefine = true;
}; // - -----------------------------------------------------------------------------------
// - UPDATES ---------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var updateOres = function updateOres() {
  var str = utils_1.beautifyNumber(State_1.State.inventory.ores);

  if (State_1.State.ops > 0) {
    str += " <span class='ops'>(" + State_1.State.ops + "/s)</span>";
  }

  constants.topbarInventoryOresEl.innerHTML = "" + str;
  Updates_1.UpdatesState.updateOres = false;
};

var updateOreHp = function updateOreHp() {
  switch (State_1.State.settings.oreHpType) {
    case 'percentage':
      constants.oreHpEl.innerHTML = utils_1.formatNumber(utils_1.getPercentage(State_1.State.ore.hp, State_1.State.ore.maxHp)) + "%";
      break;

    case 'number':
      constants.oreHpEl.innerHTML = utils_1.formatNumber(State_1.State.ore.hp) + "/" + utils_1.formatNumber(State_1.State.ore.maxHp);
      break;

    case 'none':
    default:
      return;
  }

  Updates_1.UpdatesState.updateOreHp = false;
};

var updateOreSprite = function updateOreSprite() {
  constants.oreSpriteEl.src = "./images/ore" + State_1.State.ore.spriteType + "-" + State_1.State.ore.spriteHp + ".png";
  var differentOreSprites = 5;
  var percentage = utils_1.getPercentage(State_1.State.ore.hp, State_1.State.ore.maxHp);
  var calcSprite = Math.min(differentOreSprites, 6 - Math.ceil(percentage / 20));

  if (State_1.State.ore.spriteHp !== calcSprite) {
    State_1.State.ore.spriteHp = calcSprite;
    constants.oreSpriteEl.src = "./images/ore" + State_1.State.ore.spriteType + "-" + State_1.State.ore.spriteHp + ".png";
    OreParticle_1.generateOreParticles(null, 5);
  }

  Updates_1.UpdatesState.updateOreSprite = false;
};

var updateGenerationLv = function updateGenerationLv() {
  constants.topbarInventoryGenerationLv.innerHTML = "" + State_1.State.generation.lv;
  Updates_1.UpdatesState.updateGenerationLv = false;
};

var updateGenerationLvOnRefine = function updateGenerationLvOnRefine() {
  if (State_1.State.generation.lv < State_1.State.generation.lvOnRefine) {
    constants.topbarInventoryGenerationLvOnRefine.innerHTML = "(" + State_1.State.generation.lvOnRefine + ")";
  }

  Updates_1.UpdatesState.updateGenerationLvOnRefine = false;
};

var updateGenerationXp = function updateGenerationXp() {
  constants.topbarInventoryGenerationXpBarEl.style.width = utils_1.getPercentage(State_1.State.generation.xp, State_1.State.generation.maxXp) + '%';
  Updates_1.UpdatesState.updateGenerationXp = false;
};

exports.updateOPS = function () {
  var ops = 0;

  for (var b in State_1.State.buildings) {
    var building = State_1.State.buildings[b];
    ops += building.baseProduction * building.productionMultiplier * building.owned;
  }

  State_1.State.ops = ops;
  if (ops >= 50) winAchievement('Ore-aid Stand');
  if (ops >= 10000) winAchievement('Ore Store');
  if (ops >= 401000) winAchievement('401k');
  if (ops >= 5000000) winAchievement('Retirement Plan');
  if (ops >= 1000000000) winAchievement('Hedge Fund');
  Updates_1.UpdatesState.updateOPS = false;
};

var changeBuyAmount = function changeBuyAmount(amount) {
  State_1.InstanceState.buyAmount = amount;
  Updates_1.UpdatesState.updateTabContent = true;
};

var updateStorePriceClasses = function updateStorePriceClasses() {
  for (var building in State_1.State.buildings) {
    var b = State_1.State.buildings[building];

    if (!b.isHidden && !b.isLocked) {
      var buildingPriceEl = document.querySelector(".building-" + b.codeName + " .building-price");

      if (State_1.State.inventory.ores >= utils_1.getGeometricSequencePrice(b)) {
        if (buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.remove('not-enough');
      } else {
        if (!buildingPriceEl.classList.contains('not-enough')) buildingPriceEl.classList.add('not-enough');
      }
    }
  }

  for (var upgrade in State_1.State.upgrades) {
    var u = State_1.State.upgrades[upgrade];

    if (!u.isLocked && !u.isOwned) {
      var upgradeEl = document.querySelector(".upgrade-" + u.codeName);

      if (State_1.State.inventory.ores >= u.price) {
        if (upgradeEl.classList.contains('not-enough')) upgradeEl.classList.remove('not-enough');
      } else {
        if (!upgradeEl.classList.contains('not-enough')) upgradeEl.classList.add('not-enough');
      }
    }
  }
}; // - -----------------------------------------------------------------------------------
// - SMITH STUFF -----------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var updateSmithProgress = function updateSmithProgress() {
  if (State_1.State.smith.currentProgress >= State_1.State.smith.currentUpgrade.powerNeeded) return;
  var powerPerTick = State_1.State.smith.power / State_1.State.settings.tick;

  if (exports.spend(powerPerTick)) {
    State_1.State.smith.currentProgress += powerPerTick;
    updateSmithProgressBar();
  }
};

var updateSmithProgressBar = function updateSmithProgressBar() {
  var tabProgressBar = utils_1.select('.smith-tab-progress-bar .bar');
  var percentage = utils_1.getPercentage(State_1.State.smith.currentProgress, State_1.State.smith.currentUpgrade.powerNeeded);
  tabProgressBar.style.width = percentage + '%';
  tabProgressBar.style.filter = "grayscale( " + (100 - percentage) + "% )";

  if (State_1.InstanceState.selectedTab === 'smith') {
    if (percentage >= 100) {
      Updates_1.UpdatesState.updateTabContent = true;
      return;
    }

    var progressBar = utils_1.select('.smith-progress-bar .bar');
    progressBar.style.filter = "grayscale( " + (100 - percentage) + "% )";
    progressBar.style.width = percentage + '%';
  }
};

exports.completeSmithUpgrade = function (codeName) {
  State_1.InstanceState.smithUpgrades.forEach(function (upgrade) {
    if (upgrade.codeName === codeName) {
      upgrade.isOwned = true;

      switch (codeName) {
        case 'fragilitySpectacles':
          generateWeakSpot();
          break;

        case 'smithPowerUp':
          State_1.State.smith.maxPower *= 1.5;
          break;

        default:
          console.log('default case firing', codeName);
      }

      return;
    }
  });
};

var updateSmithPower = function updateSmithPower(power) {
  var el = utils_1.select('.smith-power');
  State_1.State.smith.power = power;
  el.innerHTML = power;
}; // - -----------------------------------------------------------------------------------
// - TAB BUILD STUFF -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var updateTabs = function updateTabs() {
  var tabsContainer = document.createElement('div');
  tabsContainer.classList.add('tabs-container');
  State_1.InstanceState.tabs.filter(function (tab) {
    return !tab.isLocked;
  }).forEach(function (tab) {
    var tabEl = utils_1.createEl('div', ['tab', "tab-" + tab.codeName]);
    tabEl.addEventListener('click', function () {
      return changeTab(tab.codeName);
    });
    if (State_1.InstanceState.selectedTab === tab.codeName) tabEl.classList.add('tab-selected');
    tabEl.innerHTML = tab.name;

    if (tab.codeName === 'smith' && State_1.State.smith.inProgress) {
      tabEl.innerHTML = "\n                    " + tab.name + "\n                    <div class='smith-tab-progress-bar'>\n                        <div class='bar'></div>\n                    </div>\n                ";
    }

    tabsContainer.append(tabEl);
  });
  utils_1.updateEl(constants.tabsWrapperEl, tabsContainer);
  Updates_1.UpdatesState.updateTabs = false;
};

var changeTab = function changeTab(tab) {
  if (State_1.InstanceState.selectedTab !== tab) {
    State_1.InstanceState.selectedTab = tab;
    Updates_1.UpdatesState.updateTabs = true;
    updateTabContent();
  }
};

var unlockTab = function unlockTab(tabName) {
  State_1.InstanceState.tabs.forEach(function (tab) {
    if (tab.codeName === tabName) {
      tab.isLocked = false;
      Updates_1.UpdatesState.updateTabs = true;
      return;
    }
  });
};

var updateTabContent = function updateTabContent() {
  var tabsContentContainer = document.createElement('div');
  tabsContentContainer.classList.add('tabs-content-container');
  var tabContent;

  switch (State_1.InstanceState.selectedTab) {
    case 'store':
      tabContent = buildStoreTabContent();
      break;

    case 'smith':
      tabContent = buildSmithTabContent();
      break;

    default:
      console.log('not built yet');
  }

  tabsContentContainer.append(tabContent);
  utils_1.updateEl(constants.tabsContentWrapperEl, tabsContentContainer);
  Updates_1.UpdatesState.updateTabContent = false;
};

var buildStoreTabContent = function buildStoreTabContent() {
  var storeTabContainer = utils_1.createEl('div', ['tab-content', 'tab-content-store']);
  var upgradesContainer = buildUpgrades();
  var buyAmountContainer = buildBuyAmountContainer();
  var buildingsContainer = buildBuildings();
  if (upgradesContainer.innerHTML) storeTabContainer.append(upgradesContainer);
  storeTabContainer.append(buyAmountContainer);
  storeTabContainer.append(buildingsContainer);
  return storeTabContainer;
};

var buildUpgrades = function buildUpgrades() {
  var upgradesContainer = utils_1.createEl('div', ['upgrades-container']);
  upgradesContainer.addEventListener('mouseenter', function () {
    return resizeUpgradesContainer('enter');
  });
  upgradesContainer.addEventListener('mouseleave', function () {
    return resizeUpgradesContainer('leave');
  });
  utils_1.sortObj(State_1.State.upgrades, 'price').filter(function (upgrade) {
    return !upgrade[1].isOwned && !upgrade[1].isLocked;
  }).forEach(function (upgrade) {
    var upgradeEl = utils_1.createEl('div', ['upgrade', "upgrade-" + upgrade[1].codeName, "" + (State_1.State.inventory.ores < upgrade[1].price && 'not-enough')], "\n                <img src='./images/upgrade-" + upgrade[1].codeName + ".png'/>\n            ");
    upgradeEl.addEventListener('click', function (event) {
      return upgrade[1].buy(event);
    });
    upgradeEl.addEventListener('mousemove', function (event) {
      return upgrade[1].mousemove(event);
    });
    upgradeEl.addEventListener('mouseleave', function (event) {
      return Tooltip_1.hideTooltip();
    });
    upgradesContainer.append(upgradeEl);
  });
  return upgradesContainer;
};

var resizeUpgradesContainer = function resizeUpgradesContainer(type) {
  var upgradesContainer = utils_1.select('.upgrades-container');
  if (type === 'enter') upgradesContainer.style.height = upgradesContainer.scrollHeight + 'px';
  if (type === 'leave') upgradesContainer.style.height = '60px';
};

var buildBuildings = function buildBuildings() {
  var buildingsContainer = utils_1.createEl('div', ['buildings-container']);

  var _loop_1 = function _loop_1(b) {
    var building = State_1.State.buildings[b];

    if (!building.isHidden) {
      var buildingEl = utils_1.createEl('div', ['building', "building-" + building.codeName, "" + (building.isLocked && 'locked')]);
      var price = utils_1.getGeometricSequencePrice(building);
      var str = "<img class='building-img' src='./images/building-" + building.codeName + ".png' />";

      if (!building.isLocked) {
        str += "\n                    <div class='building-left'>\n                        <p class='building-name'>" + building.name + " " + (State_1.InstanceState.buyAmount != 1 ? "x" + State_1.InstanceState.buyAmount : '') + "</p>\n                        <p class='building-price'>\n                            <img src='./images/ore.png' />\n                            " + utils_1.beautifyNumber(price) + "\n                        </p>\n                    </div>\n                    <p class='building-owned'>" + building.owned + "</p>\n                ";
      }

      buildingEl.innerHTML = str;

      if (!building.isLocked) {
        buildingEl.addEventListener('click', function (event) {
          return building.buy(event);
        });
        buildingEl.addEventListener('mousemove', function (event) {
          return building.mousemove(event);
        });
        buildingEl.addEventListener('mouseleave', function () {
          return Tooltip_1.hideTooltip();
        });
      }

      buildingsContainer.append(buildingEl);
    }
  };

  for (var b in State_1.State.buildings) {
    _loop_1(b);
  }

  return buildingsContainer;
};

var buildBuyAmountContainer = function buildBuyAmountContainer() {
  var buyAmountContainer = document.createElement('div');
  buyAmountContainer.classList.add('buy-amount-container');
  var buyAmountText = utils_1.createEl('p', ['buy-amount-text'], 'Buy Amount');
  var buyAmounts = document.createElement('div');
  buyAmounts.classList.add('buy-amounts');
  var buyAmountChoices = [1, 10, 100, 'max'];
  buyAmountChoices.forEach(function (amount) {
    var buyAmount = utils_1.createEl('p', ['buy-amount'], amount);
    buyAmount.addEventListener('click', function () {
      return changeBuyAmount(amount);
    });

    if (amount === State_1.InstanceState.buyAmount) {
      buyAmount.classList.add('selected');
    }

    buyAmounts.append(buyAmount);
  });
  buyAmountContainer.append(buyAmountText);
  buyAmountContainer.append(buyAmounts);
  return buyAmountContainer;
};

var buildSmithTabContent = function buildSmithTabContent() {
  var smithTabContentContainer = utils_1.createEl('div', ['tab-content', 'tab-content-smith']);
  var underTabBar = utils_1.createEl('div', ['under-tab-bar']);
  var smithSettingsContainer = buildSmithSettings();
  var smithProgressContainer = State_1.State.smith.inProgress ? buildSmithProgressContainer() : '';
  var smithUpgradesContainer = buildSmithUpgrades();
  smithTabContentContainer.append(underTabBar);
  smithTabContentContainer.append(smithSettingsContainer);
  smithTabContentContainer.append(smithProgressContainer);
  smithTabContentContainer.append(smithUpgradesContainer);
  return smithTabContentContainer;
};

var buildSmithProgressContainer = function buildSmithProgressContainer() {
  var smithProgressContainer = utils_1.createEl('div', ['smith-progress-container']);
  var upgrade = State_1.State.smith.currentUpgrade;
  var percentage = utils_1.getPercentage(State_1.State.smith.currentProgress, upgrade.powerNeeded);
  var smithProgressTopEl = utils_1.createEl('div', ['smith-progress-top'], "\n        <p class='smith-upgrade-name'>" + upgrade.name + "</p>\n        ");
  var collectBtn = utils_1.createEl('button', ['collect-btn'], 'COLLECT');
  collectBtn.addEventListener('click', function () {
    return upgrade.complete();
  });
  var smithProgressBottom = percentage >= 100 ? collectBtn : utils_1.createEl('div', ['smith-progress-bar'], " <div class='smith-progress-bar'>\n                        <div class='bar'></div>\n                    </div>");
  var div = utils_1.createEl('div');
  div.append(smithProgressTopEl);
  div.append(smithProgressBottom);
  var upgradeImg = document.createElement('img');
  upgradeImg.src = "./images/smithUpgrade-" + upgrade.codeName + ".png";
  smithProgressContainer.append(upgradeImg);
  smithProgressContainer.append(div);
  return smithProgressContainer;
};

var buildSmithUpgrades = function buildSmithUpgrades() {
  var smithUpgradesWrapper = utils_1.createEl('div', ['smith-upgrades-wrapper']);
  var availableUpgradesHeader = utils_1.createEl('p', ['smith-header-text'], 'Available Upgrades');
  var lockedUpgradesHeader = utils_1.createEl('p', ['smith-header-text', 'small'], 'Locked Upgrades');
  var ownedUpgradesHeader = utils_1.createEl('p', ['smith-header-text', 'small'], 'Owned Upgrades');
  var smithAvailableUpgradesContainer = utils_1.createEl('div', ['smith-upgrades-container', 'available-smith-upgrades-container']);
  var smithLockedUpgradesContainer = utils_1.createEl('div', ['smith-upgrades-container', 'locked-smith-upgrades-container']);
  var smithOwnedUpgradesContainer = utils_1.createEl('div', ['smith-upgrades-container', 'owned-smith-upgrades-container']);
  var hasAvailableUpgrades = false;
  var hasLockedUpgrades = false;
  var hasOwnedUpgrades = false;
  State_1.InstanceState.smithUpgrades.forEach(function (upgrade) {
    var upgradeEl = utils_1.createEl('div', ['smith-upgrade']);
    var upgradeImg = document.createElement('img');
    upgradeImg.src = "./images/smithUpgrade-" + upgrade.codeName + ".png";
    upgradeEl.append(upgradeImg);

    if (upgrade.isNew) {
      var newText = utils_1.createEl('p', ['new'], 'New!');
      upgradeEl.append(newText);
    }

    if (!upgrade.isLocked && !upgrade.isOwned && !upgrade.isInProgress || upgrade.isRepeatable && !upgrade.isLocked && !upgrade.isInProgress) {
      hasAvailableUpgrades = true;
      upgradeEl.addEventListener('click', function (event) {
        return upgrade.buy(event);
      });
      upgradeEl.addEventListener('mouseover', function (event) {
        return upgrade.removeNew(event);
      });
      upgradeEl.addEventListener('mousemove', function (event) {
        return Tooltip_1.showTooltip(event, {
          type: 'smithUpgrade',
          smithUpgrade: upgrade
        });
      });
      upgradeEl.addEventListener('mouseleave', function () {
        return Tooltip_1.hideTooltip();
      });
      smithAvailableUpgradesContainer.append(upgradeEl);
    } else if (upgrade.isLocked) {
      hasLockedUpgrades = true;
      smithLockedUpgradesContainer.append(upgradeEl);
    } else if (upgrade.isOwned) {
      hasOwnedUpgrades = true;
      upgradeEl.addEventListener('mousemove', function (event) {
        return Tooltip_1.showTooltip(event, {
          type: 'smithUpgrade',
          smithUpgrade: upgrade
        });
      });
      upgradeEl.addEventListener('mouseleave', function () {
        return Tooltip_1.hideTooltip();
      });
      smithOwnedUpgradesContainer.append(upgradeEl);
    }
  });

  if (hasAvailableUpgrades) {
    smithUpgradesWrapper.append(availableUpgradesHeader);
    smithUpgradesWrapper.append(smithAvailableUpgradesContainer);
  } // if (hasLockedUpgrades) {
  //     smithUpgradesWrapper.append(lockedUpgradesHeader);
  //     smithUpgradesWrapper.append(smithLockedUpgradesContainer);
  // }


  if (hasOwnedUpgrades) {
    smithUpgradesWrapper.append(ownedUpgradesHeader);
    smithUpgradesWrapper.append(smithOwnedUpgradesContainer);
  }

  return smithUpgradesWrapper;
};

var buildSmithSettings = function buildSmithSettings() {
  var el = utils_1.createEl('div', ['smith-settings-container'], "\n        <p class='smith-power-text'>Smith Power</p>\n        <p class='smith-power'>" + State_1.State.smith.power + "</p>\n    ");
  var inputRange = document.createElement('input');
  inputRange.classList.add('smith-slider');
  inputRange.type = 'range';
  inputRange.min = '0';
  inputRange.max = "" + State_1.State.smith.maxPower;
  inputRange.value = "" + State_1.State.smith.power;
  inputRange.step = '1';
  inputRange.addEventListener('input', function (e) {
    return updateSmithPower(e.target.value);
  });
  el.append(inputRange);
  return el;
}; // - -----------------------------------------------------------------------------------
// - TEXT SCROLLER ---------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var startTextScroller = function startTextScroller() {
  var selectedMessage = utils_1.getRandomFromArr(State_1.State.textScrollerMessages);
  constants.textScrollerTextEl.innerHTML = selectedMessage;
  State_1.InstanceState.textScroller.isInProgress = true;
};

var moveTextInScroller = function moveTextInScroller() {
  var speed = State_1.State.settings.tick === 30 ? 2 : 1;
  var currentLeft = constants.textScrollerTextEl.offsetLeft;
  constants.textScrollerTextEl.style.left = currentLeft - speed + 'px';

  if (currentLeft + constants.textScrollerTextEl.offsetWidth <= 0) {
    constants.textScrollerTextEl.innerHTML = '';
    constants.textScrollerTextEl.style.left = '100%';
    State_1.InstanceState.textScroller.isInProgress = false;
    startTextScroller();
  }
}; // - -----------------------------------------------------------------------------------
// - INIT STUFF ------------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var tick = 0;

var gameLoop = function gameLoop() {
  if (Updates_1.UpdatesState.updateOres) updateOres();
  if (Updates_1.UpdatesState.updateOreHp) updateOreHp();
  if (Updates_1.UpdatesState.updateOreSprite) updateOreSprite();
  if (Updates_1.UpdatesState.updateGenerationLv) updateGenerationLv();
  if (Updates_1.UpdatesState.updateGenerationXp) updateGenerationXp();
  if (Updates_1.UpdatesState.updateGenerationLvOnRefine) updateGenerationLvOnRefine();
  if (Updates_1.UpdatesState.updateTabs) updateTabs();
  if (Updates_1.UpdatesState.updateTabContent) updateTabContent();
  if (Updates_1.UpdatesState.updateOPS) exports.updateOPS();

  if (State_1.InstanceState.selectedTab === 'store') {
    updateStorePriceClasses();
  }

  if (State_1.InstanceState.textScroller.isInProgress) moveTextInScroller();
  if (State_1.State.smith.inProgress) updateSmithProgress();
  gainOre(State_1.State.ops / State_1.State.settings.tick, false);

  if (Object.keys(State_1.InstanceState.oreParticles).length > 0) {
    constants.particlesCanvasContext.clearRect(0, 0, constants.particlesCanvasContext.canvas.width, constants.particlesCanvasContext.canvas.height);

    for (var i in State_1.InstanceState.oreParticles) {
      State_1.InstanceState.oreParticles[i].draw();
    }
  }

  tick++;

  if (tick >= State_1.State.settings.tick) {
    tick = 0;
    if (State_1.State.ops > 0) RisingText_1.generateRisingText(null, 'buildingOps', State_1.State.ops);
  }
};

var initiateCanvasParticles = function initiateCanvasParticles() {
  constants.particlesCanvasEl.height = window.innerHeight;
  constants.particlesCanvasEl.width = window.innerWidth;
};

var instantiateComboSign = function instantiateComboSign() {
  if (State_1.State.stats.highestCombo >= 5) {
    constants.comboSignEl.classList.add('visible');
  }
};

var initialLoad = function initialLoad() {
  initiateCanvasParticles();
  Tabs_1.instantiateTabs();
  Buildings_1.instantiateBuildings();
  SmithUpgrades_1.instantiateSmithUpgrades();
  Achievements_1.instantiateAchievements();
  instantiateComboSign();
  Upgrades_1.instantiateUpgrades();
  constants.oreSpriteEl.onclick = handleOreClick; // ! DELETE LATER - TESTING

  startTextScroller();
  setInterval(gameLoop, 1000 / State_1.State.settings.tick);
};

window.onload = function () {
  return initialLoad();
}; // - -----------------------------------------------------------------------------------
// - TESTING PURPOSES -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var before, now, fps;
var fpsEl = document.querySelector('.fps');
fpsEl.style.zIndex = '5';
before = Date.now();
requestAnimationFrame(function loop() {
  now = Date.now();
  fps = Math.round(1000 / (now - before));
  before = now;
  requestAnimationFrame(loop);
  fpsEl.innerHTML = fps;
});
},{"./State":"scripts/State.ts","./Updates":"scripts/Updates.ts","./constants":"scripts/constants.ts","./utils":"scripts/utils.ts","./OreParticle":"scripts/OreParticle.ts","./RisingText":"scripts/RisingText.ts","./Tabs":"scripts/Tabs.ts","./Buildings":"scripts/Buildings.ts","./Tooltip":"scripts/Tooltip.ts","./SmithUpgrades":"scripts/SmithUpgrades.ts","./Achievements":"scripts/Achievements.ts","./Upgrades":"scripts/Upgrades.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55172" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.ts"], null)
//# sourceMappingURL=/scripts.2ed900e3.js.map