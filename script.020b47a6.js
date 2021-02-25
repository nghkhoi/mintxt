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
})({"mpVp":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var txtEditor = document.querySelector('.textedit');
var toolbarButtonList = document.querySelectorAll("[id^='btn']");

var _iterator = _createForOfIteratorHelper(toolbarButtonList),
    _step;

try {
  var _loop = function _loop() {
    var toolbarButton = _step.value;
    var buttonActionName = toolbarButton.id + '_Action';

    toolbarButton.onclick = function () {
      window[buttonActionName](txtEditor);
    };
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  } // To add a new toolbar button:
  // In HTML: add a new <button> element with id as 'btnFunction'.
  // In JS: add a normal function with name as 'btnFunction_Action' and a parameter for <textarea> element.
  // The code above will automatically bind the action function with corresponding function.
  // Auto-save functionality

} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

if (localStorage.getItem('text_content')) txtEditor.value = localStorage.getItem('text_content');
setInterval(function () {
  localStorage.setItem('text_content', txtEditor.value);
}, 3000); // Prevent accidental unload

window.onbeforeunload = function (e) {
  if (txtEditor.value === '') delete e.returnValue;else {
    e.preventDefault();
    e.returnValue = '';
  }
};

function btnClear_Action(tx) {
  tx.value = '';
  tx.focus();
}

function btnUndo_Action(tx) {
  document.execCommand('undo');
}

function btnRedo_Action(tx) {
  document.execCommand('redo');
}

function btnCopy_Action(tx) {
  if (tx.value.trim().length > 0) navigator.clipboard.writeText(tx.value);
}

function btnPaste_Action(tx) {
  navigator.clipboard.readText().then(function (clip) {
    var selStart = tx.selectionStart;
    var selEnd = tx.selectionEnd;
    var old = tx.value;
    tx.value = old.slice(0, selStart) + clip + old.slice(selEnd);
    tx.setSelectionRange(selStart, selStart !== selEnd ? selStart + clip.length : selEnd);
    tx.focus();
  });
}

function btnWrap_Action(tx) {
  tx.wrap = tx.wrap === 'off' ? 'soft' : 'off';
}

function btnQuote_Action(tx) {
  insertText(tx, '“', '”');
}

function btnEnDash_Action(tx) {
  insertText(tx, '–');
}

function btnEmDash_Action(tx) {
  insertText(tx, '—');
}

function btnJapaneseLongVowel_Action(tx) {
  var selStart = tx.selectionStart;
  var selEnd = tx.selectionEnd;
  var old = tx.value;
  if (selStart === selEnd && selStart > 0) selStart--;
  var selected = old.slice(selStart, selEnd);
  if (selected.length !== 1) return;

  switch (selected) {
    case 'a':
      selected = 'ā';
      break;

    case 'i':
      selected = 'ī';
      break;

    case 'u':
      selected = 'ū';
      break;

    case 'e':
      selected = 'ē';
      break;

    case 'o':
      selected = 'ō';
      break;

    case 'A':
      selected = 'Ā';
      break;

    case 'I':
      selected = 'Ī';
      break;

    case 'U':
      selected = 'Ū';
      break;

    case 'E':
      selected = 'Ē';
      break;

    case 'O':
      selected = 'Ō';
  }

  tx.value = old.slice(0, selStart) + selected + old.slice(selEnd);
  tx.setSelectionRange(selEnd, selEnd);
  tx.focus();
}

function btnUpperCase_Action(tx) {
  var selStart = tx.selectionStart;
  var selEnd = tx.selectionEnd;
  var old = tx.value;
  tx.value = old.slice(0, selStart) + old.slice(selStart, selEnd).toUpperCase() + old.slice(selEnd);
  tx.setSelectionRange(selStart, selEnd);
  tx.focus();
}

function btnLowerCase_Action(tx) {
  var selStart = tx.selectionStart;
  var selEnd = tx.selectionEnd;
  var old = tx.value;
  tx.value = old.slice(0, selStart) + old.slice(selStart, selEnd).toLowerCase() + old.slice(selEnd);
  tx.setSelectionRange(selStart, selEnd);
  tx.focus();
}

function insertText(tx, openText, closeText) {
  // If supplied just one: insert {openText}.
  // If supplied both: insert or wrap with both.
  var selStart = tx.selectionStart;
  var selEnd = tx.selectionEnd;
  var old = tx.value;
  if (closeText === undefined) closeText = '';
  tx.value = old.slice(0, selStart) + openText + old.slice(selStart, selEnd) + closeText + old.slice(selEnd);
  tx.setSelectionRange(selStart + openText.length, selEnd + openText.length);
  tx.focus();
}
},{}]},{},["mpVp"], null)