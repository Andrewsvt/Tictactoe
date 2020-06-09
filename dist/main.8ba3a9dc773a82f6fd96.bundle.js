/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var winRows = [];
var move_counter = 0;
var arr_undo = [];
var arr_redo = [];

if (localStorage.getItem('move')) {
  turn = +localStorage.getItem('move');
}

if (localStorage.getItem('UndoArray')) {
  arr_undo = JSON.parse(localStorage.getItem('UndoArray'));
}

if (localStorage.getItem('RedoArray')) {
  arr_redo = JSON.parse(localStorage.getItem('RedoArray'));
}

if (localStorage.getItem('UndoArray')) {
  for (var i in arr_undo) {
    document.getElementById(arr_undo[i].id).classList.add(arr_undo[i].type);
  }
} //create dynamic massive from cells amount;


var size = Math.sqrt(document.querySelectorAll('.cell').length);
var arr = new Array(),
    x,
    y;
var c = 0;

for (x = 0; x < size; x++) {
  arr[x] = new Array();

  for (y = 0; y < size; y++) {
    arr[x][y] = c;
    c++;
  }
} //X or 0 print func


function print(e) {
  if (e.target.className === 'cell') {
    if (move_counter % 2 === 0) {
      e.target.classList.add('ch');
      arr_undo.push(new History(e.target.id, "ch"));
    }

    if (move_counter % 2 !== 0) {
      e.target.classList.add('r');
      arr_undo.push(new History(e.target.id, 'r'));
    }

    check();
    move_counter++;
    localStorage.setItem('move', move_counter);
    localStorage.setItem('UndoArray', JSON.stringify(arr_undo));
    arr_redo = [];
    localStorage.setItem('RedoArray', JSON.stringify(arr_redo));

    if (!document.querySelector('.won-title').classList.contains('hidden')) {
      localStorage.clear();
    }
  } //undo enable


  if (move_counter > 0) {
    document.querySelector('.undo-btn').disabled = false;
  }

  if (move_counter <= 0) {
    document.querySelector('.undo-btn').disabled = true;
  }
}

window.addEventListener('click', print); //Undo

document.querySelector('.undo-btn').addEventListener('click', function (event) {
  var obj_undo = arr_undo.pop();
  document.getElementById(obj_undo.id).classList.remove(obj_undo.type);
  move_counter--;
  arr_redo.push(obj_undo);
  document.querySelector('.redo-btn').disabled = false;
}); //Redo

document.querySelector('.redo-btn').addEventListener('click', function (event) {
  var obj_redo = arr_redo.pop();
  document.getElementById(obj_redo.id).classList.add(obj_redo.type);
  move_counter++;
  arr_undo.push(obj_redo);

  if (arr_redo.length == 0) {
    document.querySelector('.redo-btn').disabled = true;
  }
}); //Constructor func

function History(id, type) {
  this.id = id;
  this.type = type;
}

function win(x, y) {
  document.querySelector('.won-title').classList.remove('hidden');

  if (move_counter % 2 === 0) {
    var message_box = document.querySelector('.won-message');
    message_box.innerHTML = 'Crosses won!';
  }

  if (move_counter % 2 !== 0) {
    var _message_box = document.querySelector('.won-message');

    _message_box.innerHTML = 'Toes won!';
  }

  switch (x) {
    case 1:
      for (var _i = 0; _i < y.length; _i++) {
        document.getElementById("c-".concat(y[_i])).classList.add('horizontal', 'win');
      }

      break;

    case 2:
      for (var _i2 = 0; _i2 < y.length; _i2++) {
        document.getElementById("c-".concat(y[_i2])).classList.add('vertical', 'win');
      }

      break;

    case 3:
      for (var _i3 = 0; _i3 < y.length; _i3++) {
        document.getElementById("c-".concat(y[_i3])).classList.add('diagonal-right', 'win');
      }

      break;

    case 4:
      for (var _i4 = 0; _i4 < y.length; _i4++) {
        document.getElementById("c-".concat(y[_i4])).classList.add('diagonal-left', 'win');
      }

      break;
  }
}

function draw() {
  document.querySelector('.won-title').classList.remove('hidden');
  var message_box = document.querySelector('.won-message');
  message_box.innerHTML = "It's a draw!";
}

document.querySelector('.restart-btn').addEventListener('click', function (event) {
  move_counter = 0;
  arr_undo = [];
  arr_redo = [];
  document.querySelector('.won-title').classList.add('hidden');

  for (var _i5 = 0; _i5 < document.querySelectorAll('.cell').length; _i5++) {
    document.getElementById("c-".concat(_i5)).classList.remove('ch', 'r', 'vertical', 'horizontal', 'diagonal-right', 'diagonal-left', 'win');
  }
});

function check() {
  var winCells = [];
  var player = move_counter % 2 === 0 ? 'ch' : 'r'; //horizontal matches

  for (x = 0; x < size; x++) {
    matches = 0;

    for (y = 0; y < size; y++) {
      if (document.getElementById("c-".concat(arr[x][y])).classList.contains(player)) {
        matches++;
        winCells.push(arr[x][y]);

        if (matches >= size) {
          win(1, winCells);
        }
      } else {
        matches = 0;
        winCells = [];
      }
    }
  } //vertical matchs 


  for (x = 0; x < size; x++) {
    matches = 0;

    for (y = 0; y < size; y++) {
      if (document.getElementById("c-".concat(arr[y][x])).classList.contains(player)) {
        matches++;
        winCells.push(arr[y][x]);

        if (matches >= size) {
          win(2, winCells);
        }
      } else {
        matches = 0;
        winCells = [];
      }
    }
  } //top left to bottom right matches


  winCells = [];
  matches = 0;

  for (x = 0; x < size; x++) {
    if (document.getElementById("c-".concat(arr[x][x])).classList.contains(player)) {
      winCells.push(arr[x][x]);
      matches++;

      if (matches >= size) {
        win(3, winCells);
      }
    } else {
      winCells = [];
      matches = 0;
    }
  } //top right to bottom left matches


  winCells = [];
  matches = 0;

  for (x = size - 1; x >= 0; x--) {
    if (document.getElementById("c-".concat(arr[x][Math.abs(size - 1 - x)])).classList.contains(player)) {
      winCells.push(arr[x][Math.abs(size - 1 - x)]);
      matches++;

      if (matches >= size) {
        win(4, winCells);
      }
    } else {
      winCells = [];
      matches = 0;
    }
  }

  if (arr_undo.length >= document.querySelectorAll('.cell').length) {
    draw();
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpblJvd3MiLCJtb3ZlX2NvdW50ZXIiLCJhcnJfdW5kbyIsImFycl9yZWRvIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInR1cm4iLCJKU09OIiwicGFyc2UiLCJpIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiY2xhc3NMaXN0IiwiYWRkIiwidHlwZSIsInNpemUiLCJNYXRoIiwic3FydCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsIngiLCJ5IiwiYyIsInByaW50IiwiZSIsInRhcmdldCIsImNsYXNzTmFtZSIsInB1c2giLCJIaXN0b3J5IiwiY2hlY2siLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5zIiwiY2xlYXIiLCJkaXNhYmxlZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9ial91bmRvIiwicG9wIiwicmVtb3ZlIiwib2JqX3JlZG8iLCJ3aW4iLCJtZXNzYWdlX2JveCIsImlubmVySFRNTCIsImRyYXciLCJ3aW5DZWxscyIsInBsYXllciIsIm1hdGNoZXMiLCJhYnMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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UCxJQUFJLEdBQUcsQ0FBaEIsRUFBbUJPLENBQUMsSUFBSSxDQUF4QixFQUE0QkEsQ0FBQyxFQUE3QixFQUFpQztBQUM3QixRQUFJYixRQUFRLENBQUNDLGNBQVQsYUFBNkJVLEdBQUcsQ0FBQ0UsQ0FBRCxDQUFILENBQU9OLElBQUksQ0FBQ29DLEdBQUwsQ0FBVXJDLElBQUksR0FBRyxDQUFSLEdBQWFPLENBQXRCLENBQVAsQ0FBN0IsR0FBaUVWLFNBQWpFLENBQTJFdUIsUUFBM0UsQ0FBb0ZlLE1BQXBGLENBQUosRUFBaUc7QUFDN0ZELGNBQVEsQ0FBQ3BCLElBQVQsQ0FBY1QsR0FBRyxDQUFDRSxDQUFELENBQUgsQ0FBT04sSUFBSSxDQUFDb0MsR0FBTCxDQUFVckMsSUFBSSxHQUFHLENBQVIsR0FBYU8sQ0FBdEIsQ0FBUCxDQUFkO0FBQ0E2QixhQUFPOztBQUNQLFVBQUlBLE9BQU8sSUFBSXBDLElBQWYsRUFBcUI7QUFDakI4QixXQUFHLENBQUMsQ0FBRCxFQUFJSSxRQUFKLENBQUg7QUFDSDtBQUNKLEtBTkQsTUFPSztBQUNEQSxjQUFRLEdBQUcsRUFBWDtBQUNBRSxhQUFPLEdBQUcsQ0FBVjtBQUNIO0FBQ0o7O0FBQ0QsTUFBR2xELFFBQVEsQ0FBQ2tCLE1BQVQsSUFBbUJWLFFBQVEsQ0FBQ1MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNDLE1BQXpELEVBQWdFO0FBQzVENkIsUUFBSTtBQUNQO0FBQ0gsQyIsImZpbGUiOiJtYWluLjhiYTNhOWRjNzczYTgyZjZmZDk2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3Qgd2luUm93cyA9IFtdO1xyXG5sZXQgbW92ZV9jb3VudGVyID0gMDtcclxuXHJcbmxldCBhcnJfdW5kbyA9IFtdO1xyXG5sZXQgYXJyX3JlZG8gPSBbXTtcclxuXHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtb3ZlJykpe1xyXG4gICAgdHVybiA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbW92ZScpO1xyXG59XHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVbmRvQXJyYXknKSl7XHJcbiAgICBhcnJfdW5kbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VuZG9BcnJheScpKTsgXHJcbn1cclxuaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1JlZG9BcnJheScpKXtcclxuICAgIGFycl9yZWRvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnUmVkb0FycmF5JykpOyBcclxufVxyXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVW5kb0FycmF5Jykpe1xyXG4gICAgZm9yKGxldCBpIGluIGFycl91bmRvKXtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJfdW5kb1tpXS5pZCkuY2xhc3NMaXN0LmFkZChhcnJfdW5kb1tpXS50eXBlKTtcclxuICAgIH1cclxufVxyXG4vL2NyZWF0ZSBkeW5hbWljIG1hc3NpdmUgZnJvbSBjZWxscyBhbW91bnQ7XHJcbmxldCBzaXplID0gTWF0aC5zcXJ0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykubGVuZ3RoKTtcclxubGV0IGFyciA9IG5ldyBBcnJheSgpLCB4LCB5O1xyXG5sZXQgYyA9IDA7XHJcbmZvciAoeCA9IDA7IHggPCBzaXplOyB4KyspIHtcclxuICAgIGFyclt4XSA9IG5ldyBBcnJheSgpO1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHNpemU7IHkrKykge1xyXG4gICAgICAgIGFyclt4XVt5XSA9IGM7XHJcbiAgICAgICAgYysrO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1ggb3IgMCBwcmludCBmdW5jXHJcbmZ1bmN0aW9uIHByaW50KGUpe1xyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSAnY2VsbCcpIHtcclxuICAgICAgICBpZihtb3ZlX2NvdW50ZXIgJSAyID09PSAwKXtcclxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY2gnKTtcclxuICAgICAgICAgICAgYXJyX3VuZG8ucHVzaChuZXcgSGlzdG9yeShlLnRhcmdldC5pZCwgXCJjaFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1vdmVfY291bnRlciAlIDIgIT09IDApIHtcclxuICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdyJyk7XHJcbiAgICAgICAgICAgYXJyX3VuZG8ucHVzaChuZXcgSGlzdG9yeShlLnRhcmdldC5pZCwgJ3InKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoZWNrKCk7XHJcbiAgICAgICAgbW92ZV9jb3VudGVyKys7XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtb3ZlJywgbW92ZV9jb3VudGVyKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVW5kb0FycmF5JywgSlNPTi5zdHJpbmdpZnkoYXJyX3VuZG8pKTtcclxuICAgICAgICBhcnJfcmVkbyA9IFtdO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdSZWRvQXJyYXknLCBKU09OLnN0cmluZ2lmeShhcnJfcmVkbykpO1xyXG4gICAgICAgIGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29uLXRpdGxlJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3VuZG8gZW5hYmxlXHJcbiAgICBpZihtb3ZlX2NvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuZG8tYnRuJykuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKG1vdmVfY291bnRlciA8PSAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuZG8tYnRuJykuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByaW50KTtcclxuXHJcbi8vVW5kb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5kby1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBsZXQgb2JqX3VuZG8gPSBhcnJfdW5kby5wb3AoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9ial91bmRvLmlkKS5jbGFzc0xpc3QucmVtb3ZlKG9ial91bmRvLnR5cGUpO1xyXG4gICAgbW92ZV9jb3VudGVyLS07XHJcbiAgICBhcnJfcmVkby5wdXNoKG9ial91bmRvKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVkby1idG4nKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG59KTtcclxuXHJcbi8vUmVkb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVkby1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBsZXQgb2JqX3JlZG8gPSBhcnJfcmVkby5wb3AoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9ial9yZWRvLmlkKS5jbGFzc0xpc3QuYWRkKG9ial9yZWRvLnR5cGUpO1xyXG4gICAgbW92ZV9jb3VudGVyKys7XHJcbiAgICBhcnJfdW5kby5wdXNoKG9ial9yZWRvKTtcclxuICAgIFxyXG4gICAgaWYgKGFycl9yZWRvLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlZG8tYnRuJykuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vQ29uc3RydWN0b3IgZnVuY1xyXG5mdW5jdGlvbiBIaXN0b3J5KGlkLCB0eXBlKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW4oeCwgeSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvbi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuICAgIGlmIChtb3ZlX2NvdW50ZXIgJSAyID09PSAwKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VfYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvbi1tZXNzYWdlJyk7XHJcbiAgICAgICAgbWVzc2FnZV9ib3guaW5uZXJIVE1MID0gJ0Nyb3NzZXMgd29uISc7XHJcbiAgICB9XHJcbiAgICBpZiAobW92ZV9jb3VudGVyICUgMiAhPT0gMCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlX2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b24tbWVzc2FnZScpO1xyXG4gICAgICAgIG1lc3NhZ2VfYm94LmlubmVySFRNTCA9ICdUb2VzIHdvbiEnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoeCkge1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke3lbaV19YCkuY2xhc3NMaXN0LmFkZCgnaG9yaXpvbnRhbCcsICd3aW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtJHt5W2ldfWApLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJywgJ3dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke3lbaV19YCkuY2xhc3NMaXN0LmFkZCgnZGlhZ29uYWwtcmlnaHQnLCAnd2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLSR7eVtpXX1gKS5jbGFzc0xpc3QuYWRkKCdkaWFnb25hbC1sZWZ0JywgJ3dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn0gXHJcblxyXG5mdW5jdGlvbiBkcmF3KCl7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29uLXRpdGxlJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgbGV0IG1lc3NhZ2VfYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvbi1tZXNzYWdlJyk7XHJcbiAgICBtZXNzYWdlX2JveC5pbm5lckhUTUwgPSBgSXQncyBhIGRyYXchYDtcclxufVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgbW92ZV9jb3VudGVyID0gMDtcclxuICAgIGFycl91bmRvID0gW107XHJcbiAgICBhcnJfcmVkbyA9IFtdO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvbi10aXRsZScpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtJHtpfWApLmNsYXNzTGlzdC5yZW1vdmUoJ2NoJywgJ3InLCAndmVydGljYWwnLCAnaG9yaXpvbnRhbCcsICdkaWFnb25hbC1yaWdodCcsICdkaWFnb25hbC1sZWZ0JywgJ3dpbicpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrKCl7XHJcbiAgICBsZXQgd2luQ2VsbHMgPSBbXTtcclxuICAgIGxldCBwbGF5ZXIgPSAobW92ZV9jb3VudGVyICUgMiA9PT0gMCkgPyAnY2gnIDogJ3InO1xyXG5cclxuICAgIC8vaG9yaXpvbnRhbCBtYXRjaGVzXHJcbiAgIGZvciAoeCA9IDA7IHggPCBzaXplOyB4KyspIHtcclxuICAgICAgIG1hdGNoZXMgPSAwO1xyXG4gICAgICAgZm9yICh5ID0gMDsgeSA8IHNpemU7IHkrKykge1xyXG4gICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke2Fyclt4XVt5XX1gKS5jbGFzc0xpc3QuY29udGFpbnMocGxheWVyKSkge1xyXG4gICAgICAgICAgICAgICBtYXRjaGVzKys7XHJcbiAgICAgICAgICAgICAgIHdpbkNlbGxzLnB1c2goYXJyW3hdW3ldKTtcclxuICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgPj0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgd2luKDEsIHdpbkNlbGxzKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgIG1hdGNoZXMgPSAwO1xyXG4gICAgICAgICAgICAgICB3aW5DZWxscyA9IFtdXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgIC8vdmVydGljYWwgbWF0Y2hzIFxyXG4gICBmb3IgKHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XHJcbiAgICAgICBtYXRjaGVzID0gMDtcclxuICAgICAgIGZvciAoeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcclxuICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtJHthcnJbeV1beF19YCkuY2xhc3NMaXN0LmNvbnRhaW5zKHBsYXllcikpIHtcclxuICAgICAgICAgICAgICAgbWF0Y2hlcysrO1xyXG4gICAgICAgICAgICAgICB3aW5DZWxscy5wdXNoKGFyclt5XVt4XSk7XHJcbiAgICAgICAgICAgICAgIGlmIChtYXRjaGVzID49IHNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgIHdpbigyLCB3aW5DZWxscyk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9IFxyXG4gICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICBtYXRjaGVzID0gMDtcclxuICAgICAgICAgICAgICAgd2luQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgLy90b3AgbGVmdCB0byBib3R0b20gcmlnaHQgbWF0Y2hlc1xyXG4gICB3aW5DZWxscyA9IFtdO1xyXG4gICBtYXRjaGVzID0gMDtcclxuICAgZm9yICh4ID0gMDsgeCA8IHNpemUgOyB4KyspIHtcclxuICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke2Fyclt4XVt4XX1gKS5jbGFzc0xpc3QuY29udGFpbnMocGxheWVyKSkge1xyXG4gICAgICAgICAgIHdpbkNlbGxzLnB1c2goYXJyW3hdW3hdKTtcclxuICAgICAgICAgICBtYXRjaGVzKys7XHJcbiAgICAgICAgICAgaWYgKG1hdGNoZXMgPj0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICB3aW4oMywgd2luQ2VsbHMpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0gXHJcbiAgICAgICBlbHNlIHtcclxuICAgICAgICAgICB3aW5DZWxscyA9IFtdO1xyXG4gICAgICAgICAgIG1hdGNoZXMgPSAwO1xyXG4gICAgICAgfVxyXG4gICB9XHJcbiAgIC8vdG9wIHJpZ2h0IHRvIGJvdHRvbSBsZWZ0IG1hdGNoZXNcclxuICAgd2luQ2VsbHMgPSBbXTtcclxuICAgbWF0Y2hlcyA9IDA7XHJcbiAgIGZvciAoeCA9IHNpemUgLSAxOyB4ID49IDAgOyB4LS0pIHtcclxuICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke2Fyclt4XVtNYXRoLmFicygoc2l6ZSAtIDEpIC0geCldfWApLmNsYXNzTGlzdC5jb250YWlucyhwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgd2luQ2VsbHMucHVzaChhcnJbeF1bTWF0aC5hYnMoKHNpemUgLSAxKSAtIHgpXSk7XHJcbiAgICAgICAgICAgbWF0Y2hlcysrO1xyXG4gICAgICAgICAgIGlmIChtYXRjaGVzID49IHNpemUpIHtcclxuICAgICAgICAgICAgICAgd2luKDQsIHdpbkNlbGxzKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9IFxyXG4gICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgd2luQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICBtYXRjaGVzID0gMDtcclxuICAgICAgIH1cclxuICAgfVxyXG4gICBpZihhcnJfdW5kby5sZW5ndGggPj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKS5sZW5ndGgpe1xyXG4gICAgICAgZHJhdygpO1xyXG4gICB9ICAgXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==