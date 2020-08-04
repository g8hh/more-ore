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
  opc: 100000,
  ops: 0,
  inventory: {
    ores: 0,
    refined: 0
  },
  generation: {
    lv: 0,
    lvOnRefine: 0,
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
    oresEarned: 0,
    lifetimeOresEarned: 0,
    weakSpotMultiplier: 5,
    oreClicks: 0,
    weakSpotClicks: 0,
    currentCombo: 0,
    highestCombo: 0,
    rocksDestroyed: 0
  },
  research: {
    inProgress: false,
    currentProgress: null,
    currentUpgrade: null,
    power: 2,
    maxPower: 20,
    powerToOreRatio: 5 // 1 POWER = 5 ORES

  },
  settings: {
    tick: 60,
    oreHpType: 'percentage'
  },
  buildings: {},
  upgrades: {},
  researchUpgrades: {},
  achievements: {},
  textScrollerMessages: ['What is a rocks favorite fruit? ... Pom-a-granite', "Did you see that cleavage? Now that's some gneiss schist.", 'All rock and no clay makes you a dull boy (or girl)', "Don't take life for granite", 'What happens when you throw a blue rock in the red sea? ... It gets wet', 'As you can tell, these are pretty lame... Submit your own to /u/name_is_Syn', 'Rocks really rock!', "I can't believe I'm googling rock puns right now", 'There are a few gems amongst all these terrible rock puns', 'These puns sure are all ore nothing', 'Rock pun here']
};
exports.InstanceState = {
  selectedTab: 'store',
  buyAmount: 1,
  oreParticles: {},
  tabs: [],
  toasts: [],
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
      el.innerHTML = "+" + utils_1.beautifyNumber(amount);
      break;

    default:
      el.innerHTML = "+" + utils_1.beautifyNumber(amount);
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
  this.hasUpdates = o.hasUpdates || false;
};

var tabs = [{
  name: 'store',
  isLocked: false
}, {
  name: 'research',
  isLocked: true,
  hasUpdates: true
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
      str += "\n                <div class='tooltip-container tooltip-building tooltip-building-" + tt.building.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/building-" + tt.building.codeName + ".png'/>\n                        <div class='tooltip-target-name-container'>\n                            <p>" + tt.building.name + "</p>\n                            <small>[ " + tt.building.name + " Production Multiplier: <strong>" + tt.building.productionMultiplier + "x</strong> ]</small>\n                        </div>\n                        <p class='price' style='" + (State_1.State.inventory.ores < price ? 'color: crimson' : '') + "'>\n                            <img src='./images/ore.png'/>\n                            " + utils_1.beautifyNumber(price) + "\n                        </p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + tt.building.desc + "</p>";

      if (tt.building.owned > 0) {
        str += "\n                    <div class='stats'>\n                            <p>Each " + tt.building.name + " generates <strong>" + utils_1.beautifyNumber(tt.building.baseProduction * tt.building.productionMultiplier) + "</strong> ores per second.</p>\n                            <p><strong>" + tt.building.owned + " </strong>" + (tt.building.owned > 1 ? tt.building.namePlural + " are" : tt.building.name + " is") + " generating <strong>" + utils_1.beautifyNumber(tt.building.owned * (tt.building.baseProduction * tt.building.productionMultiplier)) + "</strong> ore per second.</p>\n                            <p class='building-percentage'>" + tt.building.name + "s are currently generating <strong>" + utils_1.beautifyNumber(utils_1.getPercentage(tt.building.owned * (tt.building.baseProduction * tt.building.productionMultiplier), State_1.State.ops)) + "%</strong> of your total OpS</p>\n                    </div>";
      }

      str += "\n                    </div>\n                    <div class='tooltip-bottom'>\n                        <p>" + tt.building.flavorText + "</p>\n                    </div>\n                </div>\n            ";
      break;

    case 'upgrade':
      str += "\n                <div class='tooltip-container tooltip-upgrade tooltip-upgrade-" + tt.upgrade.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/upgrade-" + tt.upgrade.codeName + ".png'/>\n                        <p>" + tt.upgrade.name + "</p>\n                        <p class='price' style='" + (State_1.State.inventory.ores < tt.upgrade.price ? 'color: crimson' : '') + "'>\n                            <img src='./images/ore.png'/>\n                            " + utils_1.beautifyNumber(tt.upgrade.price) + "\n                        </p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + tt.upgrade.desc + "</p>\n                    </div>\n                    <div class='tooltip-bottom'>\n                        <p>" + tt.upgrade.flavorText + "</p>\n                    </div>\n                </div>\n            ";
      break;

    case 'researchUpgrade':
      var upgrade = tt.researchUpgrade;
      str += "\n                <div class='tooltip-container tooltip-researchUpgrade tooltip-researchUpgrade-" + upgrade.codeName + "'>\n                    <div class='tooltip-top'>\n                        <img src='./images/researchUpgrade-" + upgrade.codeName + ".png'/>\n                        <p>" + upgrade.name + "</p>\n                    </div>\n                    <div class='tooltip-middle'>\n                        <p>" + upgrade.desc + "</p>\n                        <div class='cost'>\n                            <p>Requires:</p>\n                            <p>Refined Ores: " + upgrade.cost + "</p>\n                            <p>Power Needed: " + utils_1.beautifyNumber(upgrade.powerNeeded) + "</p>\n                        </div>\n                    </div>\n                    ";

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
      var tooltipWidth = 375;
      constants_1.tooltipWrapperEl.style.width = tooltipWidth + 'px';
      constants_1.tooltipWrapperEl.style.top = event.clientY - constants_1.tooltipWrapperEl.getBoundingClientRect().height / 2 + 'px';
      constants_1.tooltipWrapperEl.style.left = constants_1.gameContainerRight.getBoundingClientRect().left - tooltipWidth - 20 + 'px';
  }
};
},{"./constants":"scripts/constants.ts","./utils":"scripts/utils.ts","./State":"scripts/State.ts"}],"../node_modules/howler/dist/howler.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
 *  howler.js v2.2.0
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  /** Global Methods **/
  /***************************************************************************/

  /**
   * Create the global controller. All contained methods and properties apply
   * to all sounds that are currently playing or will be in the future.
   */
  var HowlerGlobal = function() {
    this.init();
  };
  HowlerGlobal.prototype = {
    /**
     * Initialize the global Howler object.
     * @return {Howler}
     */
    init: function() {
      var self = this || Howler;

      // Create a global ID counter.
      self._counter = 1000;

      // Pool of unlocked HTML5 Audio objects.
      self._html5AudioPool = [];
      self.html5PoolSize = 10;

      // Internal properties.
      self._codecs = {};
      self._howls = [];
      self._muted = false;
      self._volume = 1;
      self._canPlayEvent = 'canplaythrough';
      self._navigator = (typeof window !== 'undefined' && window.navigator) ? window.navigator : null;

      // Public properties.
      self.masterGain = null;
      self.noAudio = false;
      self.usingWebAudio = true;
      self.autoSuspend = true;
      self.ctx = null;

      // Set to false to disable the auto audio unlocker.
      self.autoUnlock = true;

      // Setup the various state values for global tracking.
      self._setup();

      return self;
    },

    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this || Howler;
      vol = parseFloat(vol);

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        self._volume = vol;

        // Don't update any of the nodes if we are muted.
        if (self._muted) {
          return self;
        }

        // When using Web Audio, we just need to adjust the master gain.
        if (self.usingWebAudio) {
          self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
        }

        // Loop through and change volume for all HTML5 audio nodes.
        for (var i=0; i<self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds();

            // Loop through all sounds and change the volumes.
            for (var j=0; j<ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node) {
                sound._node.volume = sound._volume * vol;
              }
            }
          }
        }

        return self;
      }

      return self._volume;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    mute: function(muted) {
      var self = this || Howler;

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      self._muted = muted;

      // With Web Audio, we just need to mute the master gain.
      if (self.usingWebAudio) {
        self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
      }

      // Loop through and mute all HTML5 Audio nodes.
      for (var i=0; i<self._howls.length; i++) {
        if (!self._howls[i]._webAudio) {
          // Get all of the sounds in this Howl group.
          var ids = self._howls[i]._getSoundIds();

          // Loop through all sounds and mark the audio node as muted.
          for (var j=0; j<ids.length; j++) {
            var sound = self._howls[i]._soundById(ids[j]);

            if (sound && sound._node) {
              sound._node.muted = (muted) ? true : sound._muted;
            }
          }
        }
      }

      return self;
    },

    /**
     * Handle stopping all sounds globally.
     */
    stop: function() {
      var self = this || Howler;

      // Loop through all Howls and stop them.
      for (var i=0; i<self._howls.length; i++) {
        self._howls[i].stop();
      }

      return self;
    },

    /**
     * Unload and destroy all currently loaded Howl objects.
     * @return {Howler}
     */
    unload: function() {
      var self = this || Howler;

      for (var i=self._howls.length-1; i>=0; i--) {
        self._howls[i].unload();
      }

      // Create a new AudioContext to make sure it is fully reset.
      if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
        self.ctx.close();
        self.ctx = null;
        setupAudioContext();
      }

      return self;
    },

    /**
     * Check for codec support of specific extension.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return (this || Howler)._codecs[ext.replace(/^x-/, '')];
    },

    /**
     * Setup various state values for global tracking.
     * @return {Howler}
     */
    _setup: function() {
      var self = this || Howler;

      // Keeps track of the suspend/resume state of the AudioContext.
      self.state = self.ctx ? self.ctx.state || 'suspended' : 'suspended';

      // Automatically begin the 30-second suspend process
      self._autoSuspend();

      // Check if audio is available.
      if (!self.usingWebAudio) {
        // No audio is available on this system if noAudio is set to true.
        if (typeof Audio !== 'undefined') {
          try {
            var test = new Audio();

            // Check if the canplaythrough event is available.
            if (typeof test.oncanplaythrough === 'undefined') {
              self._canPlayEvent = 'canplay';
            }
          } catch(e) {
            self.noAudio = true;
          }
        } else {
          self.noAudio = true;
        }
      }

      // Test to make sure audio isn't disabled in Internet Explorer.
      try {
        var test = new Audio();
        if (test.muted) {
          self.noAudio = true;
        }
      } catch (e) {}

      // Check for supported codecs.
      if (!self.noAudio) {
        self._setupCodecs();
      }

      return self;
    },

    /**
     * Check for browser support for various codecs and cache the results.
     * @return {Howler}
     */
    _setupCodecs: function() {
      var self = this || Howler;
      var audioTest = null;

      // Must wrap in a try/catch because IE11 in server mode throws an error.
      try {
        audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
      } catch (err) {
        return self;
      }

      if (!audioTest || typeof audioTest.canPlayType !== 'function') {
        return self;
      }

      var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, '');

      // Opera version <33 has mixed MP3 support, so we need to check for and block it.
      var checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);
      var isOldOpera = (checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33);

      self._codecs = {
        mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
        mpeg: !!mpegTest,
        opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
        ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
        aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
        caf: !!audioTest.canPlayType('audio/x-caf;').replace(/^no$/, ''),
        m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        m4b: !!(audioTest.canPlayType('audio/x-m4b;') || audioTest.canPlayType('audio/m4b;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ''),
        flac: !!(audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, '')
      };

      return self;
    },

    /**
     * Some browsers/devices will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _unlockAudio: function() {
      var self = this || Howler;

      // Only run this if Web Audio is supported and it hasn't already been unlocked.
      if (self._audioUnlocked || !self.ctx) {
        return;
      }

      self._audioUnlocked = false;
      self.autoUnlock = false;

      // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
      // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
      // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.
      if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
        self._mobileUnloaded = true;
        self.unload();
      }

      // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
      // http://stackoverflow.com/questions/24119684
      self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);

      // Call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS, Android, etc.
      var unlock = function(e) {
        // Create a pool of unlocked HTML5 Audio objects that can
        // be used for playing sounds without user interaction. HTML5
        // Audio objects must be individually unlocked, as opposed
        // to the WebAudio API which only needs a single activation.
        // This must occur before WebAudio setup or the source.onended
        // event will not fire.
        while (self._html5AudioPool.length < self.html5PoolSize) {
          try {
            var audioNode = new Audio();

            // Mark this Audio object as unlocked to ensure it can get returned
            // to the unlocked pool when released.
            audioNode._unlocked = true;

            // Add the audio node to the pool.
            self._releaseHtml5Audio(audioNode);
          } catch (e) {
            self.noAudio = true;
            break;
          }
        }

        // Loop through any assigned audio nodes and unlock them.
        for (var i=0; i<self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds();

            // Loop through all sounds and unlock the audio nodes.
            for (var j=0; j<ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node && !sound._node._unlocked) {
                sound._node._unlocked = true;
                sound._node.load();
              }
            }
          }
        }

        // Fix Android can not play in suspend state.
        self._autoResume();

        // Create an empty buffer.
        var source = self.ctx.createBufferSource();
        source.buffer = self._scratchBuffer;
        source.connect(self.ctx.destination);

        // Play the empty buffer.
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
        if (typeof self.ctx.resume === 'function') {
          self.ctx.resume();
        }

        // Setup a timeout to check that we are unlocked on the next event loop.
        source.onended = function() {
          source.disconnect(0);

          // Update the unlocked state and prevent this check from happening again.
          self._audioUnlocked = true;

          // Remove the touch start listener.
          document.removeEventListener('touchstart', unlock, true);
          document.removeEventListener('touchend', unlock, true);
          document.removeEventListener('click', unlock, true);

          // Let all sounds know that audio has been unlocked.
          for (var i=0; i<self._howls.length; i++) {
            self._howls[i]._emit('unlock');
          }
        };
      };

      // Setup a touch start listener to attempt an unlock in.
      document.addEventListener('touchstart', unlock, true);
      document.addEventListener('touchend', unlock, true);
      document.addEventListener('click', unlock, true);

      return self;
    },

    /**
     * Get an unlocked HTML5 Audio object from the pool. If none are left,
     * return a new Audio object and throw a warning.
     * @return {Audio} HTML5 Audio object.
     */
    _obtainHtml5Audio: function() {
      var self = this || Howler;

      // Return the next object from the pool if one exists.
      if (self._html5AudioPool.length) {
        return self._html5AudioPool.pop();
      }

      //.Check if the audio is locked and throw a warning.
      var testPlay = new Audio().play();
      if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
        testPlay.catch(function() {
          console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
        });
      }

      return new Audio();
    },

    /**
     * Return an activated HTML5 Audio object to the pool.
     * @return {Howler}
     */
    _releaseHtml5Audio: function(audio) {
      var self = this || Howler;

      // Don't add audio to the pool if we don't know if it has been unlocked.
      if (audio._unlocked) {
        self._html5AudioPool.push(audio);
      }

      return self;
    },

    /**
     * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
     * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
     * @return {Howler}
     */
    _autoSuspend: function() {
      var self = this;

      if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      // Check if any sounds are playing.
      for (var i=0; i<self._howls.length; i++) {
        if (self._howls[i]._webAudio) {
          for (var j=0; j<self._howls[i]._sounds.length; j++) {
            if (!self._howls[i]._sounds[j]._paused) {
              return self;
            }
          }
        }
      }

      if (self._suspendTimer) {
        clearTimeout(self._suspendTimer);
      }

      // If no sound has played after 30 seconds, suspend the context.
      self._suspendTimer = setTimeout(function() {
        if (!self.autoSuspend) {
          return;
        }

        self._suspendTimer = null;
        self.state = 'suspending';

        // Handle updating the state of the audio context after suspending.
        var handleSuspension = function() {
          self.state = 'suspended';

          if (self._resumeAfterSuspend) {
            delete self._resumeAfterSuspend;
            self._autoResume();
          }
        };

        // Either the state gets suspended or it is interrupted.
        // Either way, we need to update the state to suspended.
        self.ctx.suspend().then(handleSuspension, handleSuspension);
      }, 30000);

      return self;
    },

    /**
     * Automatically resume the Web Audio AudioContext when a new sound is played.
     * @return {Howler}
     */
    _autoResume: function() {
      var self = this;

      if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      if (self.state === 'running' && self.ctx.state !== 'interrupted' && self._suspendTimer) {
        clearTimeout(self._suspendTimer);
        self._suspendTimer = null;
      } else if (self.state === 'suspended' || self.state === 'running' && self.ctx.state === 'interrupted') {
        self.ctx.resume().then(function() {
          self.state = 'running';

          // Emit to all Howls that the audio has resumed.
          for (var i=0; i<self._howls.length; i++) {
            self._howls[i]._emit('resume');
          }
        });

        if (self._suspendTimer) {
          clearTimeout(self._suspendTimer);
          self._suspendTimer = null;
        }
      } else if (self.state === 'suspending') {
        self._resumeAfterSuspend = true;
      }

      return self;
    }
  };

  // Setup the global audio controller.
  var Howler = new HowlerGlobal();

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Create an audio group controller.
   * @param {Object} o Passed in properties for this group.
   */
  var Howl = function(o) {
    var self = this;

    // Throw an error if no source is provided.
    if (!o.src || o.src.length === 0) {
      console.error('An array of source files must be passed with any new Howl.');
      return;
    }

    self.init(o);
  };
  Howl.prototype = {
    /**
     * Initialize a new Howl group object.
     * @param  {Object} o Passed in properties for this group.
     * @return {Howl}
     */
    init: function(o) {
      var self = this;

      // If we don't have an AudioContext created yet, run the setup.
      if (!Howler.ctx) {
        setupAudioContext();
      }

      // Setup user-defined default properties.
      self._autoplay = o.autoplay || false;
      self._format = (typeof o.format !== 'string') ? o.format : [o.format];
      self._html5 = o.html5 || false;
      self._muted = o.mute || false;
      self._loop = o.loop || false;
      self._pool = o.pool || 5;
      self._preload = (typeof o.preload === 'boolean' || o.preload === 'metadata') ? o.preload : true;
      self._rate = o.rate || 1;
      self._sprite = o.sprite || {};
      self._src = (typeof o.src !== 'string') ? o.src : [o.src];
      self._volume = o.volume !== undefined ? o.volume : 1;
      self._xhr = {
        method: o.xhr && o.xhr.method ? o.xhr.method : 'GET',
        headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
        withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false,
      };

      // Setup all other default properties.
      self._duration = 0;
      self._state = 'unloaded';
      self._sounds = [];
      self._endTimers = {};
      self._queue = [];
      self._playLock = false;

      // Setup event listeners.
      self._onend = o.onend ? [{fn: o.onend}] : [];
      self._onfade = o.onfade ? [{fn: o.onfade}] : [];
      self._onload = o.onload ? [{fn: o.onload}] : [];
      self._onloaderror = o.onloaderror ? [{fn: o.onloaderror}] : [];
      self._onplayerror = o.onplayerror ? [{fn: o.onplayerror}] : [];
      self._onpause = o.onpause ? [{fn: o.onpause}] : [];
      self._onplay = o.onplay ? [{fn: o.onplay}] : [];
      self._onstop = o.onstop ? [{fn: o.onstop}] : [];
      self._onmute = o.onmute ? [{fn: o.onmute}] : [];
      self._onvolume = o.onvolume ? [{fn: o.onvolume}] : [];
      self._onrate = o.onrate ? [{fn: o.onrate}] : [];
      self._onseek = o.onseek ? [{fn: o.onseek}] : [];
      self._onunlock = o.onunlock ? [{fn: o.onunlock}] : [];
      self._onresume = [];

      // Web Audio or HTML5 Audio?
      self._webAudio = Howler.usingWebAudio && !self._html5;

      // Automatically try to enable audio.
      if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.autoUnlock) {
        Howler._unlockAudio();
      }

      // Keep track of this Howl group in the global controller.
      Howler._howls.push(self);

      // If they selected autoplay, add a play event to the load queue.
      if (self._autoplay) {
        self._queue.push({
          event: 'play',
          action: function() {
            self.play();
          }
        });
      }

      // Load the source file unless otherwise specified.
      if (self._preload && self._preload !== 'none') {
        self.load();
      }

      return self;
    },

    /**
     * Load the audio file.
     * @return {Howler}
     */
    load: function() {
      var self = this;
      var url = null;

      // If no audio is available, quit immediately.
      if (Howler.noAudio) {
        self._emit('loaderror', null, 'No audio support.');
        return;
      }

      // Make sure our source is in an array.
      if (typeof self._src === 'string') {
        self._src = [self._src];
      }

      // Loop through the sources and pick the first one that is compatible.
      for (var i=0; i<self._src.length; i++) {
        var ext, str;

        if (self._format && self._format[i]) {
          // If an extension was specified, use that instead.
          ext = self._format[i];
        } else {
          // Make sure the source is a string.
          str = self._src[i];
          if (typeof str !== 'string') {
            self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');
            continue;
          }

          // Extract the file extension from the URL or base64 data URI.
          ext = /^data:audio\/([^;,]+);/i.exec(str);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          }
        }

        // Log a warning if no extension was found.
        if (!ext) {
          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
        }

        // Check if this extension is available.
        if (ext && Howler.codecs(ext)) {
          url = self._src[i];
          break;
        }
      }

      if (!url) {
        self._emit('loaderror', null, 'No codec support for selected audio sources.');
        return;
      }

      self._src = url;
      self._state = 'loading';

      // If the hosting page is HTTPS and the source isn't,
      // drop down to HTML5 Audio to avoid Mixed Content errors.
      if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
        self._html5 = true;
        self._webAudio = false;
      }

      // Create a new sound object and add it to the pool.
      new Sound(self);

      // Load and decode the audio data for playback.
      if (self._webAudio) {
        loadBuffer(self);
      }

      return self;
    },

    /**
     * Play a sound or resume previous playback.
     * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Number}          Sound ID.
     */
    play: function(sprite, internal) {
      var self = this;
      var id = null;

      // Determine if a sprite, sound id or nothing was passed
      if (typeof sprite === 'number') {
        id = sprite;
        sprite = null;
      } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
        // If the passed sprite doesn't exist, do nothing.
        return null;
      } else if (typeof sprite === 'undefined') {
        // Use the default sound sprite (plays the full audio length).
        sprite = '__default';

        // Check if there is a single paused sound that isn't ended.
        // If there is, play that sound. If not, continue as usual.
        if (!self._playLock) {
          var num = 0;
          for (var i=0; i<self._sounds.length; i++) {
            if (self._sounds[i]._paused && !self._sounds[i]._ended) {
              num++;
              id = self._sounds[i]._id;
            }
          }

          if (num === 1) {
            sprite = null;
          } else {
            id = null;
          }
        }
      }

      // Get the selected node, or get one from the pool.
      var sound = id ? self._soundById(id) : self._inactiveSound();

      // If the sound doesn't exist, do nothing.
      if (!sound) {
        return null;
      }

      // Select the sprite definition.
      if (id && !sprite) {
        sprite = sound._sprite || '__default';
      }

      // If the sound hasn't loaded, we must wait to get the audio's duration.
      // We also need to wait to make sure we don't run into race conditions with
      // the order of function calls.
      if (self._state !== 'loaded') {
        // Set the sprite value on this sound.
        sound._sprite = sprite;

        // Mark this sound as not ended in case another sound is played before this one loads.
        sound._ended = false;

        // Add the sound to the queue to be played on load.
        var soundId = sound._id;
        self._queue.push({
          event: 'play',
          action: function() {
            self.play(soundId);
          }
        });

        return soundId;
      }

      // Don't play the sound if an id was passed and it is already playing.
      if (id && !sound._paused) {
        // Trigger the play event, in order to keep iterating through queue.
        if (!internal) {
          self._loadQueue('play');
        }

        return sound._id;
      }

      // Make sure the AudioContext isn't suspended, and resume it if it is.
      if (self._webAudio) {
        Howler._autoResume();
      }

      // Determine how long to play for and where to start playing.
      var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
      var duration = Math.max(0, ((self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000) - seek);
      var timeout = (duration * 1000) / Math.abs(sound._rate);
      var start = self._sprite[sprite][0] / 1000;
      var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
      sound._sprite = sprite;

      // Mark the sound as ended instantly so that this async playback
      // doesn't get grabbed by another call to play while this one waits to start.
      sound._ended = false;

      // Update the parameters of the sound.
      var setParams = function() {
        sound._paused = false;
        sound._seek = seek;
        sound._start = start;
        sound._stop = stop;
        sound._loop = !!(sound._loop || self._sprite[sprite][2]);
      };

      // End the sound instantly if seek is at the end.
      if (seek >= stop) {
        self._ended(sound);
        return;
      }

      // Begin the actual playback.
      var node = sound._node;
      if (self._webAudio) {
        // Fire this when the sound is ready to play to begin Web Audio playback.
        var playWebAudio = function() {
          self._playLock = false;
          setParams();
          self._refreshBuffer(sound);

          // Setup the playback params.
          var vol = (sound._muted || self._muted) ? 0 : sound._volume;
          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
          sound._playStart = Howler.ctx.currentTime;

          // Play the sound using the supported method.
          if (typeof node.bufferSource.start === 'undefined') {
            sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
          } else {
            sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
          }

          // Start a new timer if none is present.
          if (timeout !== Infinity) {
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            setTimeout(function() {
              self._emit('play', sound._id);
              self._loadQueue();
            }, 0);
          }
        };

        if (Howler.state === 'running' && Howler.ctx.state !== 'interrupted') {
          playWebAudio();
        } else {
          self._playLock = true;

          // Wait for the audio context to resume before playing.
          self.once('resume', playWebAudio);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      } else {
        // Fire this when the sound is ready to play to begin HTML5 Audio playback.
        var playHtml5 = function() {
          node.currentTime = seek;
          node.muted = sound._muted || self._muted || Howler._muted || node.muted;
          node.volume = sound._volume * Howler.volume();
          node.playbackRate = sound._rate;

          // Some browsers will throw an error if this is called without user interaction.
          try {
            var play = node.play();

            // Support older browsers that don't support promises, and thus don't have this issue.
            if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
              // Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
              self._playLock = true;

              // Set param values immediately.
              setParams();

              // Releases the lock and executes queued actions.
              play
                .then(function() {
                  self._playLock = false;
                  node._unlocked = true;
                  if (!internal) {
                    self._emit('play', sound._id);
                    self._loadQueue();
                  }
                })
                .catch(function() {
                  self._playLock = false;
                  self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
                    'on mobile devices and Chrome where playback was not within a user interaction.');

                  // Reset the ended and paused values.
                  sound._ended = true;
                  sound._paused = true;
                });
            } else if (!internal) {
              self._playLock = false;
              setParams();
              self._emit('play', sound._id);
              self._loadQueue();
            }

            // Setting rate before playing won't work in IE, so we set it again here.
            node.playbackRate = sound._rate;

            // If the node is still paused, then we can assume there was a playback issue.
            if (node.paused) {
              self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
                'on mobile devices and Chrome where playback was not within a user interaction.');
              return;
            }

            // Setup the end timer on sprites or listen for the ended event.
            if (sprite !== '__default' || sound._loop) {
              self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
            } else {
              self._endTimers[sound._id] = function() {
                // Fire ended on this audio node.
                self._ended(sound);

                // Clear this listener.
                node.removeEventListener('ended', self._endTimers[sound._id], false);
              };
              node.addEventListener('ended', self._endTimers[sound._id], false);
            }
          } catch (err) {
            self._emit('playerror', sound._id, err);
          }
        };

        // If this is streaming audio, make sure the src is set and load again.
        if (node.src === 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') {
          node.src = self._src;
          node.load();
        }

        // Play immediately if ready, or wait for the 'canplaythrough'e vent.
        var loadedNoReadyState = (window && window.ejecta) || (!node.readyState && Howler._navigator.isCocoonJS);
        if (node.readyState >= 3 || loadedNoReadyState) {
          playHtml5();
        } else {
          self._playLock = true;

          var listener = function() {
            // Begin playback.
            playHtml5();

            // Clear this listener.
            node.removeEventListener(Howler._canPlayEvent, listener, false);
          };
          node.addEventListener(Howler._canPlayEvent, listener, false);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      }

      return sound._id;
    },

    /**
     * Pause playback and save current position.
     * @param  {Number} id The sound ID (empty to pause all in group).
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'pause',
          action: function() {
            self.pause(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be paused.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound && !sound._paused) {
          // Reset the seek position.
          sound._seek = self.seek(ids[i]);
          sound._rateSeek = 0;
          sound._paused = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound has been created.
              if (!sound._node.bufferSource) {
                continue;
              }

              if (typeof sound._node.bufferSource.stop === 'undefined') {
                sound._node.bufferSource.noteOff(0);
              } else {
                sound._node.bufferSource.stop(0);
              }

              // Clean up the buffer source.
              self._cleanBuffer(sound._node);
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.pause();
            }
          }
        }

        // Fire the pause event, unless `true` is passed as the 2nd argument.
        if (!arguments[1]) {
          self._emit('pause', sound ? sound._id : null);
        }
      }

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {Number} id The sound ID (empty to stop all in group).
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Howl}
     */
    stop: function(id, internal) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to stop when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'stop',
          action: function() {
            self.stop(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be stopped.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          // Reset the seek position.
          sound._seek = sound._start || 0;
          sound._rateSeek = 0;
          sound._paused = true;
          sound._ended = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound's AudioBufferSourceNode has been created.
              if (sound._node.bufferSource) {
                if (typeof sound._node.bufferSource.stop === 'undefined') {
                  sound._node.bufferSource.noteOff(0);
                } else {
                  sound._node.bufferSource.stop(0);
                }

                // Clean up the buffer source.
                self._cleanBuffer(sound._node);
              }
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.currentTime = sound._start || 0;
              sound._node.pause();

              // If this is a live stream, stop download once the audio is stopped.
              if (sound._node.duration === Infinity) {
                self._clearSound(sound._node);
              }
            }
          }

          if (!internal) {
            self._emit('stop', sound._id);
          }
        }
      }

      return self;
    },

    /**
     * Mute/unmute a single sound or all sounds in this Howl group.
     * @param  {Boolean} muted Set to true to mute and false to unmute.
     * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
     * @return {Howl}
     */
    mute: function(muted, id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to mute when capable.
      if (self._state !== 'loaded'|| self._playLock) {
        self._queue.push({
          event: 'mute',
          action: function() {
            self.mute(muted, id);
          }
        });

        return self;
      }

      // If applying mute/unmute to all sounds, update the group's value.
      if (typeof id === 'undefined') {
        if (typeof muted === 'boolean') {
          self._muted = muted;
        } else {
          return self._muted;
        }
      }

      // If no id is passed, get all ID's to be muted.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          sound._muted = muted;

          // Cancel active fade and set the volume to the end value.
          if (sound._interval) {
            self._stopFade(sound._id);
          }

          if (self._webAudio && sound._node) {
            sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
          } else if (sound._node) {
            sound._node.muted = Howler._muted ? true : muted;
          }

          self._emit('mute', sound._id);
        }
      }

      return self;
    },

    /**
     * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
     *   volume() -> Returns the group's volume value.
     *   volume(id) -> Returns the sound id's current volume.
     *   volume(vol) -> Sets the volume of all sounds in this Howl group.
     *   volume(vol, id) -> Sets the volume of passed sound id.
     * @return {Howl/Number} Returns self or current volume.
     */
    volume: function() {
      var self = this;
      var args = arguments;
      var vol, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // Return the value of the groups' volume.
        return self._volume;
      } else if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
        // First check if this is an ID, and if not, assume it is a new volume.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          vol = parseFloat(args[0]);
        }
      } else if (args.length >= 2) {
        vol = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the volume or return the current volume.
      var sound;
      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        // If the sound hasn't loaded, add it to the load queue to change volume when capable.
        if (self._state !== 'loaded'|| self._playLock) {
          self._queue.push({
            event: 'volume',
            action: function() {
              self.volume.apply(self, args);
            }
          });

          return self;
        }

        // Set the group volume.
        if (typeof id === 'undefined') {
          self._volume = vol;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            sound._volume = vol;

            // Stop currently running fades.
            if (!args[2]) {
              self._stopFade(id[i]);
            }

            if (self._webAudio && sound._node && !sound._muted) {
              sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
            } else if (sound._node && !sound._muted) {
              sound._node.volume = vol * Howler.volume();
            }

            self._emit('volume', sound._id);
          }
        }
      } else {
        sound = id ? self._soundById(id) : self._sounds[0];
        return sound ? sound._volume : 0;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id (omit to fade all sounds).
     * @return {Howl}
     */
    fade: function(from, to, len, id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to fade when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'fade',
          action: function() {
            self.fade(from, to, len, id);
          }
        });

        return self;
      }

      // Make sure the to/from/len values are numbers.
      from = Math.min(Math.max(0, parseFloat(from)), 1);
      to = Math.min(Math.max(0, parseFloat(to)), 1);
      len = parseFloat(len);

      // Set the volume to the start position.
      self.volume(from, id);

      // Fade the volume of one or all sounds.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        // Create a linear fade or fall back to timeouts with HTML5 Audio.
        if (sound) {
          // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
          if (!id) {
            self._stopFade(ids[i]);
          }

          // If we are using Web Audio, let the native methods do the actual fade.
          if (self._webAudio && !sound._muted) {
            var currentTime = Howler.ctx.currentTime;
            var end = currentTime + (len / 1000);
            sound._volume = from;
            sound._node.gain.setValueAtTime(from, currentTime);
            sound._node.gain.linearRampToValueAtTime(to, end);
          }

          self._startFadeInterval(sound, from, to, len, ids[i], typeof id === 'undefined');
        }
      }

      return self;
    },

    /**
     * Starts the internal interval to fade a sound.
     * @param  {Object} sound Reference to sound to fade.
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id to fade.
     * @param  {Boolean} isGroup   If true, set the volume on the group.
     */
    _startFadeInterval: function(sound, from, to, len, id, isGroup) {
      var self = this;
      var vol = from;
      var diff = to - from;
      var steps = Math.abs(diff / 0.01);
      var stepLen = Math.max(4, (steps > 0) ? len / steps : len);
      var lastTick = Date.now();

      // Store the value being faded to.
      sound._fadeTo = to;

      // Update the volume value on each interval tick.
      sound._interval = setInterval(function() {
        // Update the volume based on the time since the last tick.
        var tick = (Date.now() - lastTick) / len;
        lastTick = Date.now();
        vol += diff * tick;

        // Make sure the volume is in the right bounds.
        if (diff < 0) {
          vol = Math.max(to, vol);
        } else {
          vol = Math.min(to, vol);
        }

        // Round to within 2 decimal points.
        vol = Math.round(vol * 100) / 100;

        // Change the volume.
        if (self._webAudio) {
          sound._volume = vol;
        } else {
          self.volume(vol, sound._id, true);
        }

        // Set the group's volume.
        if (isGroup) {
          self._volume = vol;
        }

        // When the fade is complete, stop it and fire event.
        if ((to < from && vol <= to) || (to > from && vol >= to)) {
          clearInterval(sound._interval);
          sound._interval = null;
          sound._fadeTo = null;
          self.volume(to, sound._id);
          self._emit('fade', sound._id);
        }
      }, stepLen);
    },

    /**
     * Internal method that stops the currently playing fade when
     * a new fade starts, volume is changed or the sound is stopped.
     * @param  {Number} id The sound id.
     * @return {Howl}
     */
    _stopFade: function(id) {
      var self = this;
      var sound = self._soundById(id);

      if (sound && sound._interval) {
        if (self._webAudio) {
          sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
        }

        clearInterval(sound._interval);
        sound._interval = null;
        self.volume(sound._fadeTo, id);
        sound._fadeTo = null;
        self._emit('fade', id);
      }

      return self;
    },

    /**
     * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
     *   loop() -> Returns the group's loop value.
     *   loop(id) -> Returns the sound id's loop value.
     *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
     *   loop(loop, id) -> Sets the loop value of passed sound id.
     * @return {Howl/Boolean} Returns self or current loop value.
     */
    loop: function() {
      var self = this;
      var args = arguments;
      var loop, id, sound;

      // Determine the values for loop and id.
      if (args.length === 0) {
        // Return the grou's loop value.
        return self._loop;
      } else if (args.length === 1) {
        if (typeof args[0] === 'boolean') {
          loop = args[0];
          self._loop = loop;
        } else {
          // Return this sound's loop value.
          sound = self._soundById(parseInt(args[0], 10));
          return sound ? sound._loop : false;
        }
      } else if (args.length === 2) {
        loop = args[0];
        id = parseInt(args[1], 10);
      }

      // If no id is passed, get all ID's to be looped.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        sound = self._soundById(ids[i]);

        if (sound) {
          sound._loop = loop;
          if (self._webAudio && sound._node && sound._node.bufferSource) {
            sound._node.bufferSource.loop = loop;
            if (loop) {
              sound._node.bufferSource.loopStart = sound._start || 0;
              sound._node.bufferSource.loopEnd = sound._stop;
            }
          }
        }
      }

      return self;
    },

    /**
     * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   rate() -> Returns the first sound node's current playback rate.
     *   rate(id) -> Returns the sound id's current playback rate.
     *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
     *   rate(rate, id) -> Sets the playback rate of passed sound id.
     * @return {Howl/Number} Returns self or the current playback rate.
     */
    rate: function() {
      var self = this;
      var args = arguments;
      var rate, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current rate of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new rate value.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          rate = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        rate = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the playback rate or return the current value.
      var sound;
      if (typeof rate === 'number') {
        // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
        if (self._state !== 'loaded' || self._playLock) {
          self._queue.push({
            event: 'rate',
            action: function() {
              self.rate.apply(self, args);
            }
          });

          return self;
        }

        // Set the group rate.
        if (typeof id === 'undefined') {
          self._rate = rate;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            // Keep track of our position when the rate changed and update the playback
            // start position so we can properly adjust the seek position for time elapsed.
            if (self.playing(id[i])) {
              sound._rateSeek = self.seek(id[i]);
              sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
            }
            sound._rate = rate;

            // Change the playback rate.
            if (self._webAudio && sound._node && sound._node.bufferSource) {
              sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
            } else if (sound._node) {
              sound._node.playbackRate = rate;
            }

            // Reset the timers.
            var seek = self.seek(id[i]);
            var duration = ((self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000) - seek;
            var timeout = (duration * 1000) / Math.abs(sound._rate);

            // Start a new end timer if sound is already playing.
            if (self._endTimers[id[i]] || !sound._paused) {
              self._clearTimer(id[i]);
              self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
            }

            self._emit('rate', sound._id);
          }
        }
      } else {
        sound = self._soundById(id);
        return sound ? sound._rate : self._rate;
      }

      return self;
    },

    /**
     * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   seek() -> Returns the first sound node's current seek position.
     *   seek(id) -> Returns the sound id's current seek position.
     *   seek(seek) -> Sets the seek position of the first sound node.
     *   seek(seek, id) -> Sets the seek position of passed sound id.
     * @return {Howl/Number} Returns self or the current seek position.
     */
    seek: function() {
      var self = this;
      var args = arguments;
      var seek, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current position of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new seek position.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else if (self._sounds.length) {
          id = self._sounds[0]._id;
          seek = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        seek = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // If there is no ID, bail out.
      if (typeof id === 'undefined') {
        return self;
      }

      // If the sound hasn't loaded, add it to the load queue to seek when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'seek',
          action: function() {
            self.seek.apply(self, args);
          }
        });

        return self;
      }

      // Get the sound.
      var sound = self._soundById(id);

      if (sound) {
        if (typeof seek === 'number' && seek >= 0) {
          // Pause the sound and update position for restarting playback.
          var playing = self.playing(id);
          if (playing) {
            self.pause(id, true);
          }

          // Move the position of the track and cancel timer.
          sound._seek = seek;
          sound._ended = false;
          self._clearTimer(id);

          // Update the seek position for HTML5 Audio.
          if (!self._webAudio && sound._node && !isNaN(sound._node.duration)) {
            sound._node.currentTime = seek;
          }

          // Seek and emit when ready.
          var seekAndEmit = function() {
            self._emit('seek', id);

            // Restart the playback if the sound was playing.
            if (playing) {
              self.play(id, true);
            }
          };

          // Wait for the play lock to be unset before emitting (HTML5 Audio).
          if (playing && !self._webAudio) {
            var emitSeek = function() {
              if (!self._playLock) {
                seekAndEmit();
              } else {
                setTimeout(emitSeek, 0);
              }
            };
            setTimeout(emitSeek, 0);
          } else {
            seekAndEmit();
          }
        } else {
          if (self._webAudio) {
            var realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
            var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
            return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
          } else {
            return sound._node.currentTime;
          }
        }
      }

      return self;
    },

    /**
     * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
     * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
     * @return {Boolean} True if playing and false if not.
     */
    playing: function(id) {
      var self = this;

      // Check the passed sound ID (if any).
      if (typeof id === 'number') {
        var sound = self._soundById(id);
        return sound ? !sound._paused : false;
      }

      // Otherwise, loop through all sounds and check if any are playing.
      for (var i=0; i<self._sounds.length; i++) {
        if (!self._sounds[i]._paused) {
          return true;
        }
      }

      return false;
    },

    /**
     * Get the duration of this sound. Passing a sound id will return the sprite duration.
     * @param  {Number} id The sound id to check. If none is passed, return full source duration.
     * @return {Number} Audio duration in seconds.
     */
    duration: function(id) {
      var self = this;
      var duration = self._duration;

      // If we pass an ID, get the sound and return the sprite length.
      var sound = self._soundById(id);
      if (sound) {
        duration = self._sprite[sound._sprite][1] / 1000;
      }

      return duration;
    },

    /**
     * Returns the current loaded state of this Howl.
     * @return {String} 'unloaded', 'loading', 'loaded'
     */
    state: function() {
      return this._state;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all sound instances attached to this group.
     */
    unload: function() {
      var self = this;

      // Stop playing any active sounds.
      var sounds = self._sounds;
      for (var i=0; i<sounds.length; i++) {
        // Stop the sound if it is currently playing.
        if (!sounds[i]._paused) {
          self.stop(sounds[i]._id);
        }

        // Remove the source or disconnect.
        if (!self._webAudio) {
          // Set the source to 0-second silence to stop any downloading (except in IE).
          self._clearSound(sounds[i]._node);

          // Remove any event listeners.
          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);
          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);

          // Release the Audio object back to the pool.
          Howler._releaseHtml5Audio(sounds[i]._node);
        }

        // Empty out all of the nodes.
        delete sounds[i]._node;

        // Make sure all timers are cleared out.
        self._clearTimer(sounds[i]._id);
      }

      // Remove the references in the global Howler object.
      var index = Howler._howls.indexOf(self);
      if (index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // Delete this sound from the cache (if no other Howl is using it).
      var remCache = true;
      for (i=0; i<Howler._howls.length; i++) {
        if (Howler._howls[i]._src === self._src || self._src.indexOf(Howler._howls[i]._src) >= 0) {
          remCache = false;
          break;
        }
      }

      if (cache && remCache) {
        delete cache[self._src];
      }

      // Clear global errors.
      Howler.noAudio = false;

      // Clear out `self`.
      self._state = 'unloaded';
      self._sounds = [];
      self = null;

      return null;
    },

    /**
     * Listen to a custom event.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
     * @return {Howl}
     */
    on: function(event, fn, id, once) {
      var self = this;
      var events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(once ? {id: id, fn: fn, once: once} : {id: id, fn: fn});
      }

      return self;
    },

    /**
     * Remove a custom event. Call without parameters to remove all events.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to remove. Leave empty to remove all.
     * @param  {Number}   id    (optional) Only remove events for this sound.
     * @return {Howl}
     */
    off: function(event, fn, id) {
      var self = this;
      var events = self['_on' + event];
      var i = 0;

      // Allow passing just an event and ID.
      if (typeof fn === 'number') {
        id = fn;
        fn = null;
      }

      if (fn || id) {
        // Loop through event store and remove the passed function.
        for (i=0; i<events.length; i++) {
          var isId = (id === events[i].id);
          if (fn === events[i].fn && isId || !fn && isId) {
            events.splice(i, 1);
            break;
          }
        }
      } else if (event) {
        // Clear out all events of this type.
        self['_on' + event] = [];
      } else {
        // Clear out all events of every type.
        var keys = Object.keys(self);
        for (i=0; i<keys.length; i++) {
          if ((keys[i].indexOf('_on') === 0) && Array.isArray(self[keys[i]])) {
            self[keys[i]] = [];
          }
        }
      }

      return self;
    },

    /**
     * Listen to a custom event and remove it once fired.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @return {Howl}
     */
    once: function(event, fn, id) {
      var self = this;

      // Setup the event listener.
      self.on(event, fn, id, 1);

      return self;
    },

    /**
     * Emit all events of a specific type and pass the sound id.
     * @param  {String} event Event name.
     * @param  {Number} id    Sound ID.
     * @param  {Number} msg   Message to go with event.
     * @return {Howl}
     */
    _emit: function(event, id, msg) {
      var self = this;
      var events = self['_on' + event];

      // Loop through event store and fire all functions.
      for (var i=events.length-1; i>=0; i--) {
        // Only fire the listener if the correct ID is used.
        if (!events[i].id || events[i].id === id || event === 'load') {
          setTimeout(function(fn) {
            fn.call(this, id, msg);
          }.bind(self, events[i].fn), 0);

          // If this event was setup with `once`, remove it.
          if (events[i].once) {
            self.off(event, events[i].fn, events[i].id);
          }
        }
      }

      // Pass the event type into load queue so that it can continue stepping.
      self._loadQueue(event);

      return self;
    },

    /**
     * Queue of actions initiated before the sound has loaded.
     * These will be called in sequence, with the next only firing
     * after the previous has finished executing (even if async like play).
     * @return {Howl}
     */
    _loadQueue: function(event) {
      var self = this;

      if (self._queue.length > 0) {
        var task = self._queue[0];

        // Remove this task if a matching event was passed.
        if (task.event === event) {
          self._queue.shift();
          self._loadQueue();
        }

        // Run the task if no event type is passed.
        if (!event) {
          task.action();
        }
      }

      return self;
    },

    /**
     * Fired when playback ends at the end of the duration.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _ended: function(sound) {
      var self = this;
      var sprite = sound._sprite;

      // If we are using IE and there was network latency we may be clipping
      // audio before it completes playing. Lets check the node to make sure it
      // believes it has completed, before ending the playback.
      if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
        setTimeout(self._ended.bind(self, sound), 100);
        return self;
      }

      // Should this sound loop?
      var loop = !!(sound._loop || self._sprite[sprite][2]);

      // Fire the ended event.
      self._emit('end', sound._id);

      // Restart the playback for HTML5 Audio loop.
      if (!self._webAudio && loop) {
        self.stop(sound._id, true).play(sound._id);
      }

      // Restart this timer if on a Web Audio loop.
      if (self._webAudio && loop) {
        self._emit('play', sound._id);
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        sound._playStart = Howler.ctx.currentTime;

        var timeout = ((sound._stop - sound._start) * 1000) / Math.abs(sound._rate);
        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
      }

      // Mark the node as paused.
      if (self._webAudio && !loop) {
        sound._paused = true;
        sound._ended = true;
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        self._clearTimer(sound._id);

        // Clean up the buffer source.
        self._cleanBuffer(sound._node);

        // Attempt to auto-suspend AudioContext if no sounds are still playing.
        Howler._autoSuspend();
      }

      // When using a sprite, end the track.
      if (!self._webAudio && !loop) {
        self.stop(sound._id, true);
      }

      return self;
    },

    /**
     * Clear the end timer for a sound playback.
     * @param  {Number} id The sound ID.
     * @return {Howl}
     */
    _clearTimer: function(id) {
      var self = this;

      if (self._endTimers[id]) {
        // Clear the timeout or remove the ended listener.
        if (typeof self._endTimers[id] !== 'function') {
          clearTimeout(self._endTimers[id]);
        } else {
          var sound = self._soundById(id);
          if (sound && sound._node) {
            sound._node.removeEventListener('ended', self._endTimers[id], false);
          }
        }

        delete self._endTimers[id];
      }

      return self;
    },

    /**
     * Return the sound identified by this ID, or return null.
     * @param  {Number} id Sound ID
     * @return {Object}    Sound object or null.
     */
    _soundById: function(id) {
      var self = this;

      // Loop through all sounds and find the one with this ID.
      for (var i=0; i<self._sounds.length; i++) {
        if (id === self._sounds[i]._id) {
          return self._sounds[i];
        }
      }

      return null;
    },

    /**
     * Return an inactive sound from the pool or create a new one.
     * @return {Sound} Sound playback object.
     */
    _inactiveSound: function() {
      var self = this;

      self._drain();

      // Find the first inactive node to recycle.
      for (var i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          return self._sounds[i].reset();
        }
      }

      // If no inactive node was found, create a new one.
      return new Sound(self);
    },

    /**
     * Drain excess inactive sounds from the pool.
     */
    _drain: function() {
      var self = this;
      var limit = self._pool;
      var cnt = 0;
      var i = 0;

      // If there are less sounds than the max pool size, we are done.
      if (self._sounds.length < limit) {
        return;
      }

      // Count the number of inactive sounds.
      for (i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          cnt++;
        }
      }

      // Remove excess inactive sounds, going in reverse order.
      for (i=self._sounds.length - 1; i>=0; i--) {
        if (cnt <= limit) {
          return;
        }

        if (self._sounds[i]._ended) {
          // Disconnect the audio source when using Web Audio.
          if (self._webAudio && self._sounds[i]._node) {
            self._sounds[i]._node.disconnect(0);
          }

          // Remove sounds until we have the pool size.
          self._sounds.splice(i, 1);
          cnt--;
        }
      }
    },

    /**
     * Get all ID's from the sounds pool.
     * @param  {Number} id Only return one ID if one is passed.
     * @return {Array}    Array of IDs.
     */
    _getSoundIds: function(id) {
      var self = this;

      if (typeof id === 'undefined') {
        var ids = [];
        for (var i=0; i<self._sounds.length; i++) {
          ids.push(self._sounds[i]._id);
        }

        return ids;
      } else {
        return [id];
      }
    },

    /**
     * Load the sound back into the buffer source.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _refreshBuffer: function(sound) {
      var self = this;

      // Setup the buffer source for playback.
      sound._node.bufferSource = Howler.ctx.createBufferSource();
      sound._node.bufferSource.buffer = cache[self._src];

      // Connect to the correct node.
      if (sound._panner) {
        sound._node.bufferSource.connect(sound._panner);
      } else {
        sound._node.bufferSource.connect(sound._node);
      }

      // Setup looping and playback rate.
      sound._node.bufferSource.loop = sound._loop;
      if (sound._loop) {
        sound._node.bufferSource.loopStart = sound._start || 0;
        sound._node.bufferSource.loopEnd = sound._stop || 0;
      }
      sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);

      return self;
    },

    /**
     * Prevent memory leaks by cleaning up the buffer source after playback.
     * @param  {Object} node Sound's audio node containing the buffer source.
     * @return {Howl}
     */
    _cleanBuffer: function(node) {
      var self = this;
      var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf('Apple') >= 0;

      if (Howler._scratchBuffer && node.bufferSource) {
        node.bufferSource.onended = null;
        node.bufferSource.disconnect(0);
        if (isIOS) {
          try { node.bufferSource.buffer = Howler._scratchBuffer; } catch(e) {}
        }
      }
      node.bufferSource = null;

      return self;
    },

    /**
     * Set the source to a 0-second silence to stop any downloading (except in IE).
     * @param  {Object} node Audio node to clear.
     */
    _clearSound: function(node) {
      var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);
      if (!checkIE) {
        node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      }
    }
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Setup the sound object, which each node attached to a Howl group is contained in.
   * @param {Object} howl The Howl parent group.
   */
  var Sound = function(howl) {
    this._parent = howl;
    this.init();
  };
  Sound.prototype = {
    /**
     * Initialize a new Sound object.
     * @return {Sound}
     */
    init: function() {
      var self = this;
      var parent = self._parent;

      // Setup the default parameters.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a unique ID for this sound.
      self._id = ++Howler._counter;

      // Add itself to the parent's pool.
      parent._sounds.push(self);

      // Create the new node.
      self.create();

      return self;
    },

    /**
     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
     * @return {Sound}
     */
    create: function() {
      var self = this;
      var parent = self._parent;
      var volume = (Howler._muted || self._muted || self._parent._muted) ? 0 : self._volume;

      if (parent._webAudio) {
        // Create the gain node for controlling volume (the source will connect to this).
        self._node = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
        self._node.paused = true;
        self._node.connect(Howler.masterGain);
      } else if (!Howler.noAudio) {
        // Get an unlocked Audio object from the pool.
        self._node = Howler._obtainHtml5Audio();

        // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).
        self._errorFn = self._errorListener.bind(self);
        self._node.addEventListener('error', self._errorFn, false);

        // Listen for 'canplaythrough' event to let us know the sound is ready.
        self._loadFn = self._loadListener.bind(self);
        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false);

        // Setup the new audio node.
        self._node.src = parent._src;
        self._node.preload = parent._preload === true ? 'auto' : parent._preload;
        self._node.volume = volume * Howler.volume();

        // Begin loading the source.
        self._node.load();
      }

      return self;
    },

    /**
     * Reset the parameters of this sound to the original state (for recycle).
     * @return {Sound}
     */
    reset: function() {
      var self = this;
      var parent = self._parent;

      // Reset all of the parameters of this sound.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._rateSeek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a new ID so that it isn't confused with the previous sound.
      self._id = ++Howler._counter;

      return self;
    },

    /**
     * HTML5 Audio error listener callback.
     */
    _errorListener: function() {
      var self = this;

      // Fire an error event and pass back the code.
      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0);

      // Clear the event listener.
      self._node.removeEventListener('error', self._errorFn, false);
    },

    /**
     * HTML5 Audio canplaythrough listener callback.
     */
    _loadListener: function() {
      var self = this;
      var parent = self._parent;

      // Round up the duration to account for the lower precision in HTML5 Audio.
      parent._duration = Math.ceil(self._node.duration * 10) / 10;

      // Setup a sprite if none is defined.
      if (Object.keys(parent._sprite).length === 0) {
        parent._sprite = {__default: [0, parent._duration * 1000]};
      }

      if (parent._state !== 'loaded') {
        parent._state = 'loaded';
        parent._emit('load');
        parent._loadQueue();
      }

      // Clear the event listener.
      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
    }
  };

  /** Helper Methods **/
  /***************************************************************************/

  var cache = {};

  /**
   * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
   * @param  {Howl} self
   */
  var loadBuffer = function(self) {
    var url = self._src;

    // Check if the buffer has already been cached and use it instead.
    if (cache[url]) {
      // Set the duration from the cache.
      self._duration = cache[url].duration;

      // Load the sound into this Howl.
      loadSound(self);

      return;
    }

    if (/^data:[^;]+;base64,/.test(url)) {
      // Decode the base64 data URI without XHR, since some browsers don't support it.
      var data = atob(url.split(',')[1]);
      var dataView = new Uint8Array(data.length);
      for (var i=0; i<data.length; ++i) {
        dataView[i] = data.charCodeAt(i);
      }

      decodeAudioData(dataView.buffer, self);
    } else {
      // Load the buffer from the URL.
      var xhr = new XMLHttpRequest();
      xhr.open(self._xhr.method, url, true);
      xhr.withCredentials = self._xhr.withCredentials;
      xhr.responseType = 'arraybuffer';

      // Apply any custom headers to the request.
      if (self._xhr.headers) {
        Object.keys(self._xhr.headers).forEach(function(key) {
          xhr.setRequestHeader(key, self._xhr.headers[key]);
        });
      }

      xhr.onload = function() {
        // Make sure we get a successful response back.
        var code = (xhr.status + '')[0];
        if (code !== '0' && code !== '2' && code !== '3') {
          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');
          return;
        }

        decodeAudioData(xhr.response, self);
      };
      xhr.onerror = function() {
        // If there is an error, switch to HTML5 Audio.
        if (self._webAudio) {
          self._html5 = true;
          self._webAudio = false;
          self._sounds = [];
          delete cache[url];
          self.load();
        }
      };
      safeXhrSend(xhr);
    }
  };

  /**
   * Send the XHR request wrapped in a try/catch.
   * @param  {Object} xhr XHR to send.
   */
  var safeXhrSend = function(xhr) {
    try {
      xhr.send();
    } catch (e) {
      xhr.onerror();
    }
  };

  /**
   * Decode audio data from an array buffer.
   * @param  {ArrayBuffer} arraybuffer The audio data.
   * @param  {Howl}        self
   */
  var decodeAudioData = function(arraybuffer, self) {
    // Fire a load error if something broke.
    var error = function() {
      self._emit('loaderror', null, 'Decoding audio data failed.');
    };

    // Load the sound on success.
    var success = function(buffer) {
      if (buffer && self._sounds.length > 0) {
        cache[self._src] = buffer;
        loadSound(self, buffer);
      } else {
        error();
      }
    };

    // Decode the buffer into an audio source.
    if (typeof Promise !== 'undefined' && Howler.ctx.decodeAudioData.length === 1) {
      Howler.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
    } else {
      Howler.ctx.decodeAudioData(arraybuffer, success, error);
    }
  }

  /**
   * Sound is now loaded, so finish setting everything up and fire the loaded event.
   * @param  {Howl} self
   * @param  {Object} buffer The decoded buffer sound source.
   */
  var loadSound = function(self, buffer) {
    // Set the duration.
    if (buffer && !self._duration) {
      self._duration = buffer.duration;
    }

    // Setup a sprite if none is defined.
    if (Object.keys(self._sprite).length === 0) {
      self._sprite = {__default: [0, self._duration * 1000]};
    }

    // Fire the loaded event.
    if (self._state !== 'loaded') {
      self._state = 'loaded';
      self._emit('load');
      self._loadQueue();
    }
  };

  /**
   * Setup the audio context when available, or switch to HTML5 Audio mode.
   */
  var setupAudioContext = function() {
    // If we have already detected that Web Audio isn't supported, don't run this step again.
    if (!Howler.usingWebAudio) {
      return;
    }

    // Check if we are using Web Audio and setup the AudioContext if we are.
    try {
      if (typeof AudioContext !== 'undefined') {
        Howler.ctx = new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        Howler.ctx = new webkitAudioContext();
      } else {
        Howler.usingWebAudio = false;
      }
    } catch(e) {
      Howler.usingWebAudio = false;
    }

    // If the audio context creation still failed, set using web audio to false.
    if (!Howler.ctx) {
      Howler.usingWebAudio = false;
    }

    // Check if a webview is being used on iOS8 or earlier (rather than the browser).
    // If it is, disable Web Audio as it causes crashing.
    var iOS = (/iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform));
    var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    var version = appVersion ? parseInt(appVersion[1], 10) : null;
    if (iOS && version && version < 9) {
      var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
      if (Howler._navigator && !safari) {
        Howler.usingWebAudio = false;
      }
    }

    // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).
    if (Howler.usingWebAudio) {
      Howler.masterGain = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
      Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
      Howler.masterGain.connect(Howler.ctx.destination);
    }

    // Re-run the setup on Howler.
    Howler._setup();
  };

  // Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  // Add support for CommonJS libraries such as browserify.
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // Add to global in Node.js (for testing, etc).
  if (typeof global !== 'undefined') {
    global.HowlerGlobal = HowlerGlobal;
    global.Howler = Howler;
    global.Howl = Howl;
    global.Sound = Sound;
  } else if (typeof window !== 'undefined') {  // Define globally in case AMD is not available or unused.
    window.HowlerGlobal = HowlerGlobal;
    window.Howler = Howler;
    window.Howl = Howl;
    window.Sound = Sound;
  }
})();


/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.0
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  // Setup default properties.
  HowlerGlobal.prototype._pos = [0, 0, 0];
  HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];

  /** Global Methods **/
  /***************************************************************************/

  /**
   * Helper method to update the stereo panning position of all current Howls.
   * Future Howls will not use this value unless explicitly set.
   * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
   * @return {Howler/Number}     Self or current stereo panning value.
   */
  HowlerGlobal.prototype.stereo = function(pan) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Loop through all Howls and update their stereo panning.
    for (var i=self._howls.length-1; i>=0; i--) {
      self._howls[i].stereo(pan);
    }

    return self;
  };

  /**
   * Get/set the position of the listener in 3D cartesian space. Sounds using
   * 3D position will be relative to the listener's position.
   * @param  {Number} x The x-position of the listener.
   * @param  {Number} y The y-position of the listener.
   * @param  {Number} z The z-position of the listener.
   * @return {Howler/Array}   Self or current listener position.
   */
  HowlerGlobal.prototype.pos = function(x, y, z) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._pos[1] : y;
    z = (typeof z !== 'number') ? self._pos[2] : z;

    if (typeof x === 'number') {
      self._pos = [x, y, z];

      if (typeof self.ctx.listener.positionX !== 'undefined') {
        self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
      }
    } else {
      return self._pos;
    }

    return self;
  };

  /**
   * Get/set the direction the listener is pointing in the 3D cartesian space.
   * A front and up vector must be provided. The front is the direction the
   * face of the listener is pointing, and up is the direction the top of the
   * listener is pointing. Thus, these values are expected to be at right angles
   * from each other.
   * @param  {Number} x   The x-orientation of the listener.
   * @param  {Number} y   The y-orientation of the listener.
   * @param  {Number} z   The z-orientation of the listener.
   * @param  {Number} xUp The x-orientation of the top of the listener.
   * @param  {Number} yUp The y-orientation of the top of the listener.
   * @param  {Number} zUp The z-orientation of the top of the listener.
   * @return {Howler/Array}     Returns self or the current orientation vectors.
   */
  HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    var or = self._orientation;
    y = (typeof y !== 'number') ? or[1] : y;
    z = (typeof z !== 'number') ? or[2] : z;
    xUp = (typeof xUp !== 'number') ? or[3] : xUp;
    yUp = (typeof yUp !== 'number') ? or[4] : yUp;
    zUp = (typeof zUp !== 'number') ? or[5] : zUp;

    if (typeof x === 'number') {
      self._orientation = [x, y, z, xUp, yUp, zUp];

      if (typeof self.ctx.listener.forwardX !== 'undefined') {
        self.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
      }
    } else {
      return or;
    }

    return self;
  };

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core init.
   * @param  {Function} _super Core init method.
   * @return {Howl}
   */
  Howl.prototype.init = (function(_super) {
    return function(o) {
      var self = this;

      // Setup user-defined default properties.
      self._orientation = o.orientation || [1, 0, 0];
      self._stereo = o.stereo || null;
      self._pos = o.pos || null;
      self._pannerAttr = {
        coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
        coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
        coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
        distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
        maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
        panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
        refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
        rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
      };

      // Setup event listeners.
      self._onstereo = o.onstereo ? [{fn: o.onstereo}] : [];
      self._onpos = o.onpos ? [{fn: o.onpos}] : [];
      self._onorientation = o.onorientation ? [{fn: o.onorientation}] : [];

      // Complete initilization with howler.js core's init function.
      return _super.call(this, o);
    };
  })(Howl.prototype.init);

  /**
   * Get/set the stereo panning of the audio source for this sound or all in the group.
   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Number}    Returns self or the current stereo panning value.
   */
  Howl.prototype.stereo = function(pan, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'stereo',
        action: function() {
          self.stereo(pan, id);
        }
      });

      return self;
    }

    // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.
    var pannerType = (typeof Howler.ctx.createStereoPanner === 'undefined') ? 'spatial' : 'stereo';

    // Setup the group's stereo panning if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's stereo panning if no parameters are passed.
      if (typeof pan === 'number') {
        self._stereo = pan;
        self._pos = [pan, 0, 0];
      } else {
        return self._stereo;
      }
    }

    // Change the streo panning of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof pan === 'number') {
          sound._stereo = pan;
          sound._pos = [pan, 0, 0];

          if (sound._node) {
            // If we are falling back, make sure the panningModel is equalpower.
            sound._pannerAttr.panningModel = 'equalpower';

            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || !sound._panner.pan) {
              setupPanner(sound, pannerType);
            }

            if (pannerType === 'spatial') {
              if (typeof sound._panner.positionX !== 'undefined') {
                sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
              } else {
                sound._panner.setPosition(pan, 0, 0);
              }
            } else {
              sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
            }
          }

          self._emit('stereo', sound._id);
        } else {
          return sound._stereo;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the 3D spatial position of the audio source for this sound or group relative to the global listener.
   * @param  {Number} x  The x-position of the audio source.
   * @param  {Number} y  The y-position of the audio source.
   * @param  {Number} z  The z-position of the audio source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
   */
  Howl.prototype.pos = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change position when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'pos',
        action: function() {
          self.pos(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? 0 : y;
    z = (typeof z !== 'number') ? -0.5 : z;

    // Setup the group's spatial position if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial position if no parameters are passed.
      if (typeof x === 'number') {
        self._pos = [x, y, z];
      } else {
        return self._pos;
      }
    }

    // Change the spatial position of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._pos = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || sound._panner.pan) {
              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.positionX !== 'undefined') {
              sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
              sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
              sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setPosition(x, y, z);
            }
          }

          self._emit('pos', sound._id);
        } else {
          return sound._pos;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
   * space. Depending on how direction the sound is, based on the `cone` attributes,
   * a sound pointing away from the listener can be quiet or silent.
   * @param  {Number} x  The x-orientation of the source.
   * @param  {Number} y  The y-orientation of the source.
   * @param  {Number} z  The z-orientation of the source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
   */
  Howl.prototype.orientation = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change orientation when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'orientation',
        action: function() {
          self.orientation(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._orientation[1] : y;
    z = (typeof z !== 'number') ? self._orientation[2] : z;

    // Setup the group's spatial orientation if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial orientation if no parameters are passed.
      if (typeof x === 'number') {
        self._orientation = [x, y, z];
      } else {
        return self._orientation;
      }
    }

    // Change the spatial orientation of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._orientation = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner) {
              // Make sure we have a position to setup the node with.
              if (!sound._pos) {
                sound._pos = self._pos || [0, 0, -0.5];
              }

              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.orientationX !== 'undefined') {
              sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
              sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
              sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setOrientation(x, y, z);
            }
          }

          self._emit('orientation', sound._id);
        } else {
          return sound._orientation;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the panner node's attributes for a sound or group of sounds.
   * This method can optionall take 0, 1 or 2 arguments.
   *   pannerAttr() -> Returns the group's values.
   *   pannerAttr(id) -> Returns the sound id's values.
   *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
   *   pannerAttr(o, id) -> Set's the values of passed sound id.
   *
   *   Attributes:
   *     coneInnerAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      inside of which there will be no volume reduction.
   *     coneOuterAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      outside of which the volume will be reduced to a constant value of `coneOuterGain`.
   *     coneOuterGain - (0 by default) A parameter for directional audio sources, this is the gain outside of the
   *                     `coneOuterAngle`. It is a linear value in the range `[0, 1]`.
   *     distanceModel - ('inverse' by default) Determines algorithm used to reduce volume as audio moves away from
   *                     listener. Can be `linear`, `inverse` or `exponential.
   *     maxDistance - (10000 by default) The maximum distance between source and listener, after which the volume
   *                   will not be reduced any further.
   *     refDistance - (1 by default) A reference distance for reducing volume as source moves further from the listener.
   *                   This is simply a variable of the distance model and has a different effect depending on which model
   *                   is used and the scale of your coordinates. Generally, volume will be equal to 1 at this distance.
   *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener. This is simply a
   *                     variable of the distance model and can be in the range of `[0, 1]` with `linear` and `[0, ∞]`
   *                     with `inverse` and `exponential`.
   *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
   *                     Can be `HRTF` or `equalpower`.
   *
   * @return {Howl/Object} Returns self or current panner attributes.
   */
  Howl.prototype.pannerAttr = function() {
    var self = this;
    var args = arguments;
    var o, id, sound;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // Determine the values based on arguments.
    if (args.length === 0) {
      // Return the group's panner attribute values.
      return self._pannerAttr;
    } else if (args.length === 1) {
      if (typeof args[0] === 'object') {
        o = args[0];

        // Set the grou's panner attribute values.
        if (typeof id === 'undefined') {
          if (!o.pannerAttr) {
            o.pannerAttr = {
              coneInnerAngle: o.coneInnerAngle,
              coneOuterAngle: o.coneOuterAngle,
              coneOuterGain: o.coneOuterGain,
              distanceModel: o.distanceModel,
              maxDistance: o.maxDistance,
              refDistance: o.refDistance,
              rolloffFactor: o.rolloffFactor,
              panningModel: o.panningModel
            };
          }

          self._pannerAttr = {
            coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== 'undefined' ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
            coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== 'undefined' ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
            coneOuterGain: typeof o.pannerAttr.coneOuterGain !== 'undefined' ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
            distanceModel: typeof o.pannerAttr.distanceModel !== 'undefined' ? o.pannerAttr.distanceModel : self._distanceModel,
            maxDistance: typeof o.pannerAttr.maxDistance !== 'undefined' ? o.pannerAttr.maxDistance : self._maxDistance,
            refDistance: typeof o.pannerAttr.refDistance !== 'undefined' ? o.pannerAttr.refDistance : self._refDistance,
            rolloffFactor: typeof o.pannerAttr.rolloffFactor !== 'undefined' ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
            panningModel: typeof o.pannerAttr.panningModel !== 'undefined' ? o.pannerAttr.panningModel : self._panningModel
          };
        }
      } else {
        // Return this sound's panner attribute values.
        sound = self._soundById(parseInt(args[0], 10));
        return sound ? sound._pannerAttr : self._pannerAttr;
      }
    } else if (args.length === 2) {
      o = args[0];
      id = parseInt(args[1], 10);
    }

    // Update the values of the specified sounds.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      sound = self._soundById(ids[i]);

      if (sound) {
        // Merge the new values into the sound.
        var pa = sound._pannerAttr;
        pa = {
          coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
          coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
          coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
          distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
          maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
          refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
          rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor,
          panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel
        };

        // Update the panner values or create a new panner if none exists.
        var panner = sound._panner;
        if (panner) {
          panner.coneInnerAngle = pa.coneInnerAngle;
          panner.coneOuterAngle = pa.coneOuterAngle;
          panner.coneOuterGain = pa.coneOuterGain;
          panner.distanceModel = pa.distanceModel;
          panner.maxDistance = pa.maxDistance;
          panner.refDistance = pa.refDistance;
          panner.rolloffFactor = pa.rolloffFactor;
          panner.panningModel = pa.panningModel;
        } else {
          // Make sure we have a position to setup the node with.
          if (!sound._pos) {
            sound._pos = self._pos || [0, 0, -0.5];
          }

          // Create a new panner node.
          setupPanner(sound, 'spatial');
        }
      }
    }

    return self;
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core Sound init.
   * @param  {Function} _super Core Sound init method.
   * @return {Sound}
   */
  Sound.prototype.init = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Setup user-defined default properties.
      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // Complete initilization with howler.js core Sound's init function.
      _super.call(this);

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      }
    };
  })(Sound.prototype.init);

  /**
   * Override the Sound.reset method to clean up properties from the spatial plugin.
   * @param  {Function} _super Sound reset method.
   * @return {Sound}
   */
  Sound.prototype.reset = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Reset all spatial plugin properties on this sound.
      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      } else if (self._panner) {
        // Disconnect the panner.
        self._panner.disconnect(0);
        self._panner = undefined;
        parent._refreshBuffer(self);
      }

      // Complete resetting of the sound.
      return _super.call(this);
    };
  })(Sound.prototype.reset);

  /** Helper Methods **/
  /***************************************************************************/

  /**
   * Create a new panner node and save it on the sound.
   * @param  {Sound} sound Specific sound to setup panning on.
   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
   */
  var setupPanner = function(sound, type) {
    type = type || 'spatial';

    // Create the new panner node.
    if (type === 'spatial') {
      sound._panner = Howler.ctx.createPanner();
      sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
      sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
      sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
      sound._panner.distanceModel = sound._pannerAttr.distanceModel;
      sound._panner.maxDistance = sound._pannerAttr.maxDistance;
      sound._panner.refDistance = sound._pannerAttr.refDistance;
      sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
      sound._panner.panningModel = sound._pannerAttr.panningModel;

      if (typeof sound._panner.positionX !== 'undefined') {
        sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);
        sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);
        sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
      }

      if (typeof sound._panner.orientationX !== 'undefined') {
        sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);
        sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);
        sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
      }
    } else {
      sound._panner = Howler.ctx.createStereoPanner();
      sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
    }

    sound._panner.connect(sound._node);

    // Update the connections.
    if (!sound._paused) {
      sound._parent.pause(sound._id, true).play(sound._id, true);
    }
  };
})();

},{}],"scripts/Sounds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sounds = void 0;

var howler_1 = require("howler");

exports.Sounds = {
  oreHit: new howler_1.Howl({
    src: ['./sounds/oreHit.wav'],
    volume: 0.2
  }),
  oreWeakSpotHit: new howler_1.Howl({
    src: ['./sounds/oreWeakSpotHit.wav'],
    volume: 0.2
  }),
  orePercentageLost: new howler_1.Howl({
    src: ['./sounds/orePercentageLost.wav'],
    volume: 0.2
  }),
  oreDestroyed: new howler_1.Howl({
    src: ['./sounds/oreDestroyed.wav'],
    volume: 0.2
  }),
  storeItemHover: new howler_1.Howl({
    src: ['./sounds/storeItemHover.wav'],
    volume: 0.2
  }),
  buy: new howler_1.Howl({
    src: ['./sounds/buy.wav'],
    volume: 0.2
  }),
  notEnough: new howler_1.Howl({
    src: ['./sounds/notEnough.wav'],
    volume: 0.2
  }),
  researchUpgradeStart: new howler_1.Howl({
    src: ['./sounds/researchUpgradeStart.wav'],
    volume: 0.2
  }),
  misc: new howler_1.Howl({
    src: ['./sounds/misc.wav'],
    volume: 0.1
  })
};
},{"howler":"../node_modules/howler/dist/howler.js"}],"scripts/Buildings.ts":[function(require,module,exports) {
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

var Sounds_1 = require("./Sounds");

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
  this.priceScale = b.priceScale; //1.07 to 1.15

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

      Sounds_1.Sounds.buy.play();
      Updates_1.UpdatesState.updateOres = true;
      Updates_1.UpdatesState.updateTabContent = true;
      updateBuildingsVisibility(_this.id);

      if (_this.onBuy) {
        if (_this.onBuy.unlockUpgrade) {
          _this.onBuy.unlockUpgrade.forEach(function (upgrade) {
            if (_this.owned >= upgrade.amountNeeded) {
              State_1.State.upgrades[upgrade.name].isLocked = false;
              Updates_1.UpdatesState.updateTabContent = true;
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
  basePrice: 30,
  priceScale: 1.07,
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
  baseProduction: 3,
  basePrice: 180,
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
  basePrice: 1300,
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
  baseProduction: 105,
  basePrice: 11800,
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
  baseProduction: 525,
  basePrice: 125000,
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
  baseProduction: 3675,
  basePrice: 2000000,
  priceScale: 1.15,
  isLocked: true,
  isHidden: true
}, {
  name: 'Hospital',
  namePlural: 'Hospitals',
  desc: 'Heal the poor ol damaged ores.',
  flavorText: 'An apple a day keeps the ore cancer away.',
  baseProduction: 18000,
  basePrice: 23600000,
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
},{"./utils":"scripts/utils.ts","./index":"scripts/index.ts","./State":"scripts/State.ts","./Updates":"scripts/Updates.ts","./Tooltip":"scripts/Tooltip.ts","./RisingText":"scripts/RisingText.ts","./Sounds":"scripts/Sounds.ts"}],"scripts/ResearchUpgrades.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateResearchUpgrades = exports.unlockResearchUpgrade = void 0;

var utils_1 = require("./utils");

var State_1 = require("./State");

var _1 = require(".");

var Updates_1 = require("./Updates");

var RisingText_1 = require("./RisingText");

var Tooltip_1 = require("./Tooltip");

var Sounds_1 = require("./Sounds"); // once quest board is unlocked,
// upgrade called Boots of Swiftness
// that'll increase quest speed


var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = MINUTE * 60;

var ResearchUpgrade = function ResearchUpgrade(u) {
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
    State_1.State.research.currentProgress = 0;
    State_1.State.research.inProgress = false;
    State_1.State.research.currentUpgrade = _this;

    _1.completeResearchUpgrade(_this.codeName);

    if (_this.isRepeatable) {
      _this.powerNeeded *= _this.priceIncrease;
    }

    if (_this.onComplete) {
      if (_this.onComplete.unlockResearchUpgrade) {
        _this.onComplete.unlockResearchUpgrade.forEach(function (upgrade) {
          exports.unlockResearchUpgrade(upgrade, _this.codeName);
        });
      }
    }
  };

  this.start = function () {
    console.log('starting a research upgrade');
    Sounds_1.Sounds.researchUpgradeStart.play();
    _this.isInProgress = true;
    _this.startedOn = new Date();
    Updates_1.UpdatesState.updateTabContent = true;
    Updates_1.UpdatesState.updateTabs = true;
    State_1.State.research.currentProgress = 0;
    State_1.State.research.inProgress = true;
    State_1.State.research.currentUpgrade = _this;
  };

  this.buy = function (event) {
    console.log('buying a research upgrade', event);

    if (!State_1.State.research.inProgress) {
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

exports.unlockResearchUpgrade = function (targetUpgrade, previousUpgrade) {
  var upgrade = State_1.State.researchUpgrades[targetUpgrade];
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
        unlock = false;
      }
    }
  }

  if (unlock) {
    upgrade.isLocked = false;

    if (State_1.InstanceState.selectedTab === 'research') {
      Updates_1.UpdatesState.updateTabContent = true;
    } else {
      State_1.InstanceState.tabs[1].hasUpdates = true;
      Updates_1.UpdatesState.updateTabs = true;
    }
  }
};

var researchUpgrades = [{
  name: 'Fragility Spectacles',
  desc: 'Allows you to spot "weak spots" within the ore. Hitting the weak spot generates 5x the normal amount.',
  flavorText: 'I can see... I can FIGHT!',
  powerNeeded: 40,
  cost: 0,
  isLocked: false,
  onComplete: {
    unlockResearchUpgrade: ['Research Power Up']
  }
}, {
  name: 'Quest Board',
  desc: 'Onwards to adventure! Go on quests to find greater rewards and even mysterious artifacts!',
  flavorText: "Fetch quests are the greatest aren't they?",
  powerNeeded: 20000,
  cost: 1,
  isLocked: false
}, {
  name: 'Research Power Up',
  desc: 'Increase maximum research power by a set amount',
  powerNeeded: 100,
  cost: 0,
  isLocked: true,
  requires: {
    fragilitySpectacles: false
  },
  isRepeatable: true,
  priceIncrease: 1.75
}, {
  name: 'Refinement',
  desc: 'Allows for... REFINEMENT!',
  powerNeeded: 5000,
  cost: 0,
  isLocked: true
}];

exports.instantiateResearchUpgrades = function () {
  var state = JSON.parse(localStorage.getItem('state'));
  var builtUpgrades = {};

  if (state) {
    if (!utils_1.isObjEmpty(state.researchUpgrades)) {
      for (var key in state.researchUpgrades) {
        builtUpgrades[key] = new ResearchUpgrade(state.researchUpgrades[key]);
      }
    }
  } else {
    researchUpgrades.forEach(function (upgrade) {
      builtUpgrades[upgrade.name] = new ResearchUpgrade(upgrade);
    });
  }

  State_1.State.researchUpgrades = builtUpgrades;
}; // export function instantiateResearchUpgrades(u = JSON.parse(localStorage.getItem('researchUpgrades')) || researchUpgrades) {
//     const builtResearchUpgrades: ResearchUpgrade[] = [];
//     u.forEach((upgrade: ResearchUpgrade) => {
//         builtResearchUpgrades.push(new ResearchUpgrade(upgrade));
//     });
//     InstanceState.researchUpgrades = builtResearchUpgrades;
// }
},{"./utils":"scripts/utils.ts","./State":"scripts/State.ts",".":"scripts/index.ts","./Updates":"scripts/Updates.ts","./RisingText":"scripts/RisingText.ts","./Tooltip":"scripts/Tooltip.ts","./Sounds":"scripts/Sounds.ts"}],"scripts/Toast.ts":[function(require,module,exports) {
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

var Sounds_1 = require("./Sounds");

var RisingText_1 = require("./RisingText");

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
      Sounds_1.Sounds.buy.play();
      RisingText_1.generateRisingText(event, 'buy');

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
},{"./utils":"scripts/utils.ts","./State":"scripts/State.ts","./Tooltip":"scripts/Tooltip.ts","./upgrades/index":"scripts/upgrades/index.ts",".":"scripts/index.ts","./Updates":"scripts/Updates.ts","./Sounds":"scripts/Sounds.ts","./RisingText":"scripts/RisingText.ts"}],"scripts/index.ts":[function(require,module,exports) {
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
exports.completeResearchUpgrade = exports.updateOPS = exports.spend = void 0;

var State_1 = require("./State");

var Updates_1 = require("./Updates");

var constants = __importStar(require("./constants"));

var utils_1 = require("./utils");

var OreParticle_1 = require("./OreParticle");

var RisingText_1 = require("./RisingText");

var Tabs_1 = require("./Tabs");

var Buildings_1 = require("./Buildings");

var Tooltip_1 = require("./Tooltip");

var ResearchUpgrades_1 = require("./ResearchUpgrades");

var Achievements_1 = require("./Achievements");

var Upgrades_1 = require("./Upgrades");

var Sounds_1 = require("./Sounds");

var gainOre = function gainOre(amount, damageOre) {
  if (damageOre === void 0) {
    damageOre = true;
  }

  State_1.State.inventory.ores += amount;
  State_1.State.stats.oresEarned += amount;
  State_1.State.stats.lifetimeOresEarned += amount;
  if (State_1.State.stats.lifetimeOresEarned >= 1000000 && State_1.State.researchUpgrades['Refinement'].isLocked) ResearchUpgrades_1.unlockResearchUpgrade('Refinement');
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
  Sounds_1.Sounds.oreDestroyed.play();
  State_1.State.stats.rocksDestroyed++;
  if (State_1.State.stats.rocksDestroyed === 1) winAchievement('Newbie Miner');
  if (State_1.State.stats.rocksDestroyed === 10) winAchievement('Novice Miner');
  if (State_1.State.stats.rocksDestroyed === 25) winAchievement('Intermediate Miner');
  if (State_1.State.stats.rocksDestroyed === 50) winAchievement('Advanced Miner');
  if (State_1.State.stats.rocksDestroyed === 100) winAchievement('Master Miner');
  if (State_1.State.stats.rocksDestroyed === 200) winAchievement('Chief Miner');
  if (State_1.State.stats.rocksDestroyed === 500) winAchievement('Exalted Miner');
  if (State_1.State.stats.rocksDestroyed === 1000) winAchievement('God Miner');
  if (State_1.State.stats.rocksDestroyed === 3) unlockTab('research');
};

var generateNewOre = function generateNewOre() {
  State_1.State.ore.maxHp *= 1.16;
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
    Sounds_1.Sounds.oreWeakSpotHit.play();
  } else {
    if (State_1.State.stats.currentCombo > 0) {
      State_1.State.stats.currentCombo = 0;
    }

    Sounds_1.Sounds.oreHit.play();
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
    str += " <span class='ops'>(" + utils_1.beautifyNumber(State_1.State.ops) + "/s)</span>";
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
    Sounds_1.Sounds.orePercentageLost.play();
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
// - RESEARCH STUFF --------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var updateResearchProgress = function updateResearchProgress() {
  if (State_1.State.research.currentProgress >= State_1.State.research.currentUpgrade.powerNeeded) return;
  var powerPerTick = State_1.State.research.power / State_1.State.settings.tick;
  var oreNeeded = Math.pow(powerPerTick, 1.2) * State_1.State.research.powerToOreRatio;

  if (exports.spend(oreNeeded)) {
    State_1.State.research.currentProgress += powerPerTick;
    updateResearchProgressBar();
  }
};

var updateResearchProgressBar = function updateResearchProgressBar() {
  var tabProgressBar = utils_1.select('.research-tab-progress-bar .bar');
  var percentage = utils_1.getPercentage(State_1.State.research.currentProgress, State_1.State.research.currentUpgrade.powerNeeded);
  tabProgressBar.style.width = percentage + '%';
  tabProgressBar.style.filter = "grayscale( " + (100 - percentage) + "% )";

  if (State_1.InstanceState.selectedTab === 'research') {
    var progressBar = utils_1.select('.research-progress-bar .bar');
    progressBar.style.filter = "grayscale( " + (100 - percentage) + "% )";
    progressBar.style.width = percentage + '%';
  }

  if (percentage >= 100) {
    if (State_1.InstanceState.selectedTab === 'research') {
      Updates_1.UpdatesState.updateTabContent = true;
    } else {
      State_1.InstanceState.tabs[1].hasUpdates = true;
    }

    Updates_1.UpdatesState.updateTabs = true;
  }
};

exports.completeResearchUpgrade = function (codeName) {
  Object.values(State_1.State.researchUpgrades).forEach(function (upgrade) {
    if (upgrade.codeName === codeName) {
      upgrade.isOwned = true;

      switch (codeName) {
        case 'fragilitySpectacles':
          generateWeakSpot();
          break;

        case 'researchPowerUp':
          State_1.State.research.maxPower *= 1.5;
          break;

        default:
          console.log('default case firing', codeName);
      }

      return;
    }
  });
};

var updateResearchPower = function updateResearchPower(power) {
  var researchPowerEl = utils_1.select('.research-power span');
  State_1.State.research.power = power;
  researchPowerEl.innerHTML = power;
  var researchOreUsageEl = utils_1.select('.research-ore-usage strong');
  researchOreUsageEl.innerHTML = utils_1.beautifyNumber(Math.pow(State_1.State.research.power, 1.2) * State_1.State.research.powerToOreRatio);
}; // - -----------------------------------------------------------------------------------
// - TAB BUILD STUFF -------------------------------------------------------------------
// - -----------------------------------------------------------------------------------


var updateTabs = function updateTabs() {
  var tabsContainer = document.createElement('div');
  tabsContainer.classList.add('tabs-container');
  State_1.InstanceState.tabs.filter(function (tab) {
    return !tab.isLocked;
  }).forEach(function (tab) {
    var tabEl = utils_1.createEl('div', ['tab', "tab-" + tab.codeName, "" + (tab.hasUpdates && 'has-updates')]);
    tabEl.addEventListener('click', function () {
      return changeTab(tab);
    });
    if (State_1.InstanceState.selectedTab === tab.codeName) tabEl.classList.add('tab-selected');
    tabEl.innerHTML = tab.name;

    if (tab.codeName === 'research' && State_1.State.research.inProgress && utils_1.getPercentage(State_1.State.research.currentProgress, State_1.State.research.currentUpgrade.powerNeeded) <= 100) {
      tabEl.innerHTML = "\n                    " + tab.name + "\n                    <div class='research-tab-progress-bar'>\n                        <div class='bar'></div>\n                    </div>\n                ";
    }

    tabsContainer.append(tabEl);
  });
  utils_1.updateEl(constants.tabsWrapperEl, tabsContainer);
  Updates_1.UpdatesState.updateTabs = false;
};

var changeTab = function changeTab(tab) {
  if (State_1.InstanceState.selectedTab !== tab.codeName) {
    if (tab.hasUpdates) tab.hasUpdates = false;
    State_1.InstanceState.selectedTab = tab.codeName;
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

    case 'research':
      tabContent = buildResearchTabContent();
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
    upgradeEl.addEventListener('mouseenter', function () {
      return Sounds_1.Sounds.storeItemHover.play();
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
        buildingEl.addEventListener('mouseenter', function () {
          return Sounds_1.Sounds.storeItemHover.play();
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
      changeBuyAmount(amount);
      Sounds_1.Sounds.misc.play();
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

var buildResearchTabContent = function buildResearchTabContent() {
  var researchTabContentContainer = utils_1.createEl('div', ['tab-content', 'tab-content-research']);
  var underTabBar = utils_1.createEl('div', ['under-tab-bar']);
  var researchSettingsContainer = buildResearchSettings();
  var researchProgressContainer = State_1.State.research.inProgress ? buildResearchProgressContainer() : '';
  var researchUpgradesContainer = buildResearchUpgrades();
  researchTabContentContainer.append(underTabBar);
  researchTabContentContainer.append(researchSettingsContainer);
  researchTabContentContainer.append(researchProgressContainer);
  researchTabContentContainer.append(researchUpgradesContainer);
  return researchTabContentContainer;
};

var buildResearchProgressContainer = function buildResearchProgressContainer() {
  var researchProgressContainer = utils_1.createEl('div', ['research-progress-container']);
  var upgrade = State_1.State.research.currentUpgrade;
  var percentage = utils_1.getPercentage(State_1.State.research.currentProgress, upgrade.powerNeeded);
  var researchProgressTopEl = utils_1.createEl('div', ['research-progress-top'], "\n        <p class='research-upgrade-name'>" + upgrade.name + "</p>\n        ");
  var collectBtn = utils_1.createEl('button', ['collect-btn'], 'COLLECT');
  collectBtn.addEventListener('click', function () {
    return upgrade.complete();
  });
  var researchProgressBottom = percentage >= 100 ? collectBtn : utils_1.createEl('div', ['research-progress-bar'], " <div class='research-progress-bar'>\n                        <div class='bar'></div>\n                    </div>");
  var div = utils_1.createEl('div');
  div.append(researchProgressTopEl);
  div.append(researchProgressBottom);
  var upgradeImg = document.createElement('img');
  upgradeImg.src = "./images/researchUpgrade-" + upgrade.codeName + ".png";
  researchProgressContainer.append(upgradeImg);
  researchProgressContainer.append(div);
  return researchProgressContainer;
};

var buildResearchUpgrades = function buildResearchUpgrades() {
  var researchUpgradesWrapper = utils_1.createEl('div', ['research-upgrades-wrapper']);
  var availableUpgradesHeader = utils_1.createEl('p', ['research-header-text'], 'Available Upgrades');
  var lockedUpgradesHeader = utils_1.createEl('p', ['research-header-text', 'small'], 'Locked Upgrades');
  var ownedUpgradesHeader = utils_1.createEl('p', ['research-header-text', 'small'], 'Owned Upgrades');
  var researchAvailableUpgradesContainer = utils_1.createEl('div', ['research-upgrades-container', 'available-research-upgrades-container']);
  var researchLockedUpgradesContainer = utils_1.createEl('div', ['research-upgrades-container', 'locked-research-upgrades-container']);
  var researchOwnedUpgradesContainer = utils_1.createEl('div', ['research-upgrades-container', 'owned-research-upgrades-container']);
  var hasAvailableUpgrades = false;
  var hasLockedUpgrades = false;
  var hasOwnedUpgrades = false;
  Object.values(State_1.State.researchUpgrades).forEach(function (upgrade) {
    var upgradeEl = utils_1.createEl('div', ['research-upgrade']);
    var upgradeImg = document.createElement('img');
    upgradeImg.src = "./images/researchUpgrade-" + upgrade.codeName + ".png";
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
        Sounds_1.Sounds.storeItemHover.play();
        upgrade.removeNew(event);
      });
      upgradeEl.addEventListener('mousemove', function (event) {
        return Tooltip_1.showTooltip(event, {
          type: 'researchUpgrade',
          researchUpgrade: upgrade
        });
      });
      upgradeEl.addEventListener('mouseleave', function () {
        return Tooltip_1.hideTooltip();
      });
      researchAvailableUpgradesContainer.append(upgradeEl);
    } else if (upgrade.isLocked) {
      hasLockedUpgrades = true;
      researchLockedUpgradesContainer.append(upgradeEl);
    } else if (upgrade.isOwned) {
      hasOwnedUpgrades = true;
      upgradeEl.addEventListener('mousemove', function (event) {
        return Tooltip_1.showTooltip(event, {
          type: 'researchUpgrade',
          researchUpgrade: upgrade
        });
      });
      upgradeEl.addEventListener('mouseleave', function () {
        return Tooltip_1.hideTooltip();
      });
      researchOwnedUpgradesContainer.append(upgradeEl);
    }
  });

  if (hasAvailableUpgrades) {
    researchUpgradesWrapper.append(availableUpgradesHeader);
    researchUpgradesWrapper.append(researchAvailableUpgradesContainer);
  }

  if (hasOwnedUpgrades) {
    researchUpgradesWrapper.append(ownedUpgradesHeader);
    researchUpgradesWrapper.append(researchOwnedUpgradesContainer);
  }

  return researchUpgradesWrapper;
};

var buildResearchSettings = function buildResearchSettings() {
  var el = utils_1.createEl('div', ['research-settings-container'], "\n        <p class='research-power-text'>Research Power</p>\n        <p class='research-power'><span>" + State_1.State.research.power + "</span><small>/sec</small></p>\n    ");
  var inputRange = document.createElement('input');
  inputRange.classList.add('research-slider');
  inputRange.type = 'range';
  inputRange.min = '0';
  inputRange.max = "" + Math.floor(State_1.State.research.maxPower);
  inputRange.value = "" + State_1.State.research.power;
  inputRange.step = '1';
  inputRange.addEventListener('input', function (e) {
    return updateResearchPower(e.target.value);
  });
  el.append(inputRange);
  var oreUsageEl = utils_1.createEl('p', ['research-ore-usage'], "Using <strong>" + utils_1.beautifyNumber(Math.pow(State_1.State.research.power, 1.2) * State_1.State.research.powerToOreRatio) + "</strong> ores per second while researching.");
  el.append(oreUsageEl);
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
  if (State_1.State.research.inProgress) updateResearchProgress();
  gainOre(State_1.State.ops / State_1.State.settings.tick);

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
  ResearchUpgrades_1.instantiateResearchUpgrades();
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
},{"./State":"scripts/State.ts","./Updates":"scripts/Updates.ts","./constants":"scripts/constants.ts","./utils":"scripts/utils.ts","./OreParticle":"scripts/OreParticle.ts","./RisingText":"scripts/RisingText.ts","./Tabs":"scripts/Tabs.ts","./Buildings":"scripts/Buildings.ts","./Tooltip":"scripts/Tooltip.ts","./ResearchUpgrades":"scripts/ResearchUpgrades.ts","./Achievements":"scripts/Achievements.ts","./Upgrades":"scripts/Upgrades.ts","./Sounds":"scripts/Sounds.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64972" + '/');

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