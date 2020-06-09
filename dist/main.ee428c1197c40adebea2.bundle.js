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

if (localStorage.getItem("move")) {
  turn = +localStorage.getItem("move");
}

if (localStorage.getItem("UndoArray")) {
  arr_undo = JSON.parse(localStorage.getItem("UndoArray"));
}

if (localStorage.getItem("RedoArray")) {
  arr_redo = JSON.parse(localStorage.getItem("RedoArray"));
}

if (localStorage.getItem("UndoArray")) {
  for (var i in arr_undo) {
    document.getElementById(arr_undo[i].id).classList.add(arr_undo[i].type);
  }
} //create dynamic massive from cells amount;


var size = Math.sqrt(document.querySelectorAll(".cell").length);
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
  if (e.target.className === "cell") {
    if (move_counter % 2 === 0) {
      e.target.classList.add("ch");
      arr_undo.push(new History(e.target.id, "ch"));
    }

    if (move_counter % 2 !== 0) {
      e.target.classList.add("r");
      arr_undo.push(new History(e.target.id, "r"));
    }

    check();
    move_counter++;
    localStorage.setItem("move", move_counter);
    localStorage.setItem("UndoArray", JSON.stringify(arr_undo));
    arr_redo = [];
    localStorage.setItem("RedoArray", JSON.stringify(arr_redo));

    if (!document.querySelector(".won-title").classList.contains("hidden")) {
      localStorage.clear();
    }
  } //undo enable


  if (move_counter > 0) {
    document.querySelector(".undo-btn").disabled = false;
  }

  if (move_counter <= 0) {
    document.querySelector(".undo-btn").disabled = true;
  }
}

window.addEventListener("click", print); //Undo

document.querySelector(".undo-btn").addEventListener("click", function (event) {
  var obj_undo = arr_undo.pop();
  document.getElementById(obj_undo.id).classList.remove(obj_undo.type);
  move_counter--;
  arr_redo.push(obj_undo);
  document.querySelector(".redo-btn").disabled = false;
}); //Redo

document.querySelector(".redo-btn").addEventListener("click", function (event) {
  var obj_redo = arr_redo.pop();
  document.getElementById(obj_redo.id).classList.add(obj_redo.type);
  move_counter++;
  arr_undo.push(obj_redo);

  if (arr_redo.length == 0) {
    document.querySelector(".redo-btn").disabled = true;
  }
}); //Constructor func

function History(id, type) {
  this.id = id;
  this.type = type;
}

function win(x, y) {
  document.querySelector(".won-title").classList.remove("hidden");

  if (move_counter % 2 === 0) {
    var message_box = document.querySelector(".won-message");
    message_box.innerHTML = "Crosses won!";
  }

  if (move_counter % 2 !== 0) {
    var _message_box = document.querySelector(".won-message");

    _message_box.innerHTML = "Toes won!";
  }

  switch (x) {
    case 1:
      for (var _i = 0; _i < y.length; _i++) {
        document.getElementById("c-".concat(y[_i])).classList.add("horizontal", "win");
      }

      break;

    case 2:
      for (var _i2 = 0; _i2 < y.length; _i2++) {
        document.getElementById("c-".concat(y[_i2])).classList.add("vertical", "win");
      }

      break;

    case 3:
      for (var _i3 = 0; _i3 < y.length; _i3++) {
        document.getElementById("c-".concat(y[_i3])).classList.add("diagonal-right", "win");
      }

      break;

    case 4:
      for (var _i4 = 0; _i4 < y.length; _i4++) {
        document.getElementById("c-".concat(y[_i4])).classList.add("diagonal-left", "win");
      }

      break;
  }
}

function draw() {
  document.querySelector(".won-title").classList.remove("hidden");
  var message_box = document.querySelector(".won-message");
  message_box.innerHTML = "It's a draw!";
}

document.querySelector(".restart-btn").addEventListener("click", function (event) {
  move_counter = 0;
  arr_undo = [];
  arr_redo = [];
  document.querySelector(".won-title").classList.add("hidden");

  for (var _i5 = 0; _i5 < document.querySelectorAll(".cell").length; _i5++) {
    document.getElementById("c-".concat(_i5)).classList.remove("ch", "r", "vertical", "horizontal", "diagonal-right", "diagonal-left", "win");
  }
});

function check() {
  var winCells = [];
  var player = move_counter % 2 === 0 ? "ch" : "r"; //horizontal matches

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

  if (arr_undo.length >= document.querySelectorAll(".cell").length) {
    draw();
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpblJvd3MiLCJtb3ZlX2NvdW50ZXIiLCJhcnJfdW5kbyIsImFycl9yZWRvIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInR1cm4iLCJKU09OIiwicGFyc2UiLCJpIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiY2xhc3NMaXN0IiwiYWRkIiwidHlwZSIsInNpemUiLCJNYXRoIiwic3FydCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsIngiLCJ5IiwiYyIsInByaW50IiwiZSIsInRhcmdldCIsImNsYXNzTmFtZSIsInB1c2giLCJIaXN0b3J5IiwiY2hlY2siLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5zIiwiY2xlYXIiLCJkaXNhYmxlZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9ial91bmRvIiwicG9wIiwicmVtb3ZlIiwib2JqX3JlZG8iLCJ3aW4iLCJtZXNzYWdlX2JveCIsImlubmVySFRNTCIsImRyYXciLCJ3aW5DZWxscyIsInBsYXllciIsIm1hdGNoZXMiLCJhYnMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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SUFBSSxDQUF4QixFQUEyQkEsQ0FBQyxFQUE1QixFQUFnQztBQUM5QixRQUNFYixRQUFRLENBQ0xDLGNBREgsYUFDdUJVLEdBQUcsQ0FBQ0UsQ0FBRCxDQUFILENBQU9OLElBQUksQ0FBQ29DLEdBQUwsQ0FBU3JDLElBQUksR0FBRyxDQUFQLEdBQVdPLENBQXBCLENBQVAsQ0FEdkIsR0FFR1YsU0FGSCxDQUVhdUIsUUFGYixDQUVzQmUsTUFGdEIsQ0FERixFQUlFO0FBQ0FELGNBQVEsQ0FBQ3BCLElBQVQsQ0FBY1QsR0FBRyxDQUFDRSxDQUFELENBQUgsQ0FBT04sSUFBSSxDQUFDb0MsR0FBTCxDQUFTckMsSUFBSSxHQUFHLENBQVAsR0FBV08sQ0FBcEIsQ0FBUCxDQUFkO0FBQ0E2QixhQUFPOztBQUNQLFVBQUlBLE9BQU8sSUFBSXBDLElBQWYsRUFBcUI7QUFDbkI4QixXQUFHLENBQUMsQ0FBRCxFQUFJSSxRQUFKLENBQUg7QUFDRDtBQUNGLEtBVkQsTUFVTztBQUNMQSxjQUFRLEdBQUcsRUFBWDtBQUNBRSxhQUFPLEdBQUcsQ0FBVjtBQUNEO0FBQ0Y7O0FBQ0QsTUFBSWxELFFBQVEsQ0FBQ2tCLE1BQVQsSUFBbUJWLFFBQVEsQ0FBQ1MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNDLE1BQTFELEVBQWtFO0FBQ2hFNkIsUUFBSTtBQUNMO0FBQ0YsQyIsImZpbGUiOiJtYWluLmVlNDI4YzExOTdjNDBhZGViZWEyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3Qgd2luUm93cyA9IFtdO1xyXG5sZXQgbW92ZV9jb3VudGVyID0gMDtcclxuXHJcbmxldCBhcnJfdW5kbyA9IFtdO1xyXG5sZXQgYXJyX3JlZG8gPSBbXTtcclxuXHJcbmlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1vdmVcIikpIHtcclxuICB0dXJuID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwibW92ZVwiKTtcclxufVxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJVbmRvQXJyYXlcIikpIHtcclxuICBhcnJfdW5kbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJVbmRvQXJyYXlcIikpO1xyXG59XHJcbmlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlJlZG9BcnJheVwiKSkge1xyXG4gIGFycl9yZWRvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlJlZG9BcnJheVwiKSk7XHJcbn1cclxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVW5kb0FycmF5XCIpKSB7XHJcbiAgZm9yIChsZXQgaSBpbiBhcnJfdW5kbykge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXJyX3VuZG9baV0uaWQpLmNsYXNzTGlzdC5hZGQoYXJyX3VuZG9baV0udHlwZSk7XHJcbiAgfVxyXG59XHJcbi8vY3JlYXRlIGR5bmFtaWMgbWFzc2l2ZSBmcm9tIGNlbGxzIGFtb3VudDtcclxubGV0IHNpemUgPSBNYXRoLnNxcnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpLmxlbmd0aCk7XHJcbmxldCBhcnIgPSBuZXcgQXJyYXkoKSxcclxuICB4LFxyXG4gIHk7XHJcbmxldCBjID0gMDtcclxuZm9yICh4ID0gMDsgeCA8IHNpemU7IHgrKykge1xyXG4gIGFyclt4XSA9IG5ldyBBcnJheSgpO1xyXG4gIGZvciAoeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcclxuICAgIGFyclt4XVt5XSA9IGM7XHJcbiAgICBjKys7XHJcbiAgfVxyXG59XHJcblxyXG4vL1ggb3IgMCBwcmludCBmdW5jXHJcbmZ1bmN0aW9uIHByaW50KGUpIHtcclxuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImNlbGxcIikge1xyXG4gICAgaWYgKG1vdmVfY291bnRlciAlIDIgPT09IDApIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImNoXCIpO1xyXG4gICAgICBhcnJfdW5kby5wdXNoKG5ldyBIaXN0b3J5KGUudGFyZ2V0LmlkLCBcImNoXCIpKTtcclxuICAgIH1cclxuICAgIGlmIChtb3ZlX2NvdW50ZXIgJSAyICE9PSAwKSB7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJyXCIpO1xyXG4gICAgICBhcnJfdW5kby5wdXNoKG5ldyBIaXN0b3J5KGUudGFyZ2V0LmlkLCBcInJcIikpO1xyXG4gICAgfVxyXG4gICAgY2hlY2soKTtcclxuICAgIG1vdmVfY291bnRlcisrO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibW92ZVwiLCBtb3ZlX2NvdW50ZXIpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJVbmRvQXJyYXlcIiwgSlNPTi5zdHJpbmdpZnkoYXJyX3VuZG8pKTtcclxuICAgIGFycl9yZWRvID0gW107XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlJlZG9BcnJheVwiLCBKU09OLnN0cmluZ2lmeShhcnJfcmVkbykpO1xyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndvbi10aXRsZVwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL3VuZG8gZW5hYmxlXHJcbiAgaWYgKG1vdmVfY291bnRlciA+IDApIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudW5kby1idG5cIikuZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbiAgaWYgKG1vdmVfY291bnRlciA8PSAwKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVuZG8tYnRuXCIpLmRpc2FibGVkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcmludCk7XHJcblxyXG4vL1VuZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51bmRvLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICBsZXQgb2JqX3VuZG8gPSBhcnJfdW5kby5wb3AoKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvYmpfdW5kby5pZCkuY2xhc3NMaXN0LnJlbW92ZShvYmpfdW5kby50eXBlKTtcclxuICBtb3ZlX2NvdW50ZXItLTtcclxuICBhcnJfcmVkby5wdXNoKG9ial91bmRvKTtcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWRvLWJ0blwiKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG59KTtcclxuXHJcbi8vUmVkb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZG8tYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gIGxldCBvYmpfcmVkbyA9IGFycl9yZWRvLnBvcCgpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9ial9yZWRvLmlkKS5jbGFzc0xpc3QuYWRkKG9ial9yZWRvLnR5cGUpO1xyXG4gIG1vdmVfY291bnRlcisrO1xyXG4gIGFycl91bmRvLnB1c2gob2JqX3JlZG8pO1xyXG5cclxuICBpZiAoYXJyX3JlZG8ubGVuZ3RoID09IDApIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVkby1idG5cIikuZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxufSk7XHJcblxyXG4vL0NvbnN0cnVjdG9yIGZ1bmNcclxuZnVuY3Rpb24gSGlzdG9yeShpZCwgdHlwZSkge1xyXG4gIHRoaXMuaWQgPSBpZDtcclxuICB0aGlzLnR5cGUgPSB0eXBlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW4oeCwgeSkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29uLXRpdGxlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gIGlmIChtb3ZlX2NvdW50ZXIgJSAyID09PSAwKSB7XHJcbiAgICBsZXQgbWVzc2FnZV9ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndvbi1tZXNzYWdlXCIpO1xyXG4gICAgbWVzc2FnZV9ib3guaW5uZXJIVE1MID0gXCJDcm9zc2VzIHdvbiFcIjtcclxuICB9XHJcbiAgaWYgKG1vdmVfY291bnRlciAlIDIgIT09IDApIHtcclxuICAgIGxldCBtZXNzYWdlX2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29uLW1lc3NhZ2VcIik7XHJcbiAgICBtZXNzYWdlX2JveC5pbm5lckhUTUwgPSBcIlRvZXMgd29uIVwiO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoICh4KSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLSR7eVtpXX1gKS5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiLCBcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLSR7eVtpXX1gKS5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIiwgXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzOlxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkb2N1bWVudFxyXG4gICAgICAgICAgLmdldEVsZW1lbnRCeUlkKGBjLSR7eVtpXX1gKVxyXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJkaWFnb25hbC1yaWdodFwiLCBcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDQ6XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvY3VtZW50XHJcbiAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoYGMtJHt5W2ldfWApXHJcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImRpYWdvbmFsLWxlZnRcIiwgXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29uLXRpdGxlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gIGxldCBtZXNzYWdlX2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29uLW1lc3NhZ2VcIik7XHJcbiAgbWVzc2FnZV9ib3guaW5uZXJIVE1MID0gYEl0J3MgYSBkcmF3IWA7XHJcbn1cclxuXHJcbmRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydC1idG5cIilcclxuICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBtb3ZlX2NvdW50ZXIgPSAwO1xyXG4gICAgYXJyX3VuZG8gPSBbXTtcclxuICAgIGFycl9yZWRvID0gW107XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndvbi10aXRsZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZG9jdW1lbnRcclxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoYGMtJHtpfWApXHJcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXHJcbiAgICAgICAgICBcImNoXCIsXHJcbiAgICAgICAgICBcInJcIixcclxuICAgICAgICAgIFwidmVydGljYWxcIixcclxuICAgICAgICAgIFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgXCJkaWFnb25hbC1yaWdodFwiLFxyXG4gICAgICAgICAgXCJkaWFnb25hbC1sZWZ0XCIsXHJcbiAgICAgICAgICBcIndpblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gIGxldCB3aW5DZWxscyA9IFtdO1xyXG4gIGxldCBwbGF5ZXIgPSBtb3ZlX2NvdW50ZXIgJSAyID09PSAwID8gXCJjaFwiIDogXCJyXCI7XHJcblxyXG4gIC8vaG9yaXpvbnRhbCBtYXRjaGVzXHJcbiAgZm9yICh4ID0gMDsgeCA8IHNpemU7IHgrKykge1xyXG4gICAgbWF0Y2hlcyA9IDA7XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy0ke2Fyclt4XVt5XX1gKS5jbGFzc0xpc3QuY29udGFpbnMocGxheWVyKVxyXG4gICAgICApIHtcclxuICAgICAgICBtYXRjaGVzKys7XHJcbiAgICAgICAgd2luQ2VsbHMucHVzaChhcnJbeF1beV0pO1xyXG4gICAgICAgIGlmIChtYXRjaGVzID49IHNpemUpIHtcclxuICAgICAgICAgIHdpbigxLCB3aW5DZWxscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1hdGNoZXMgPSAwO1xyXG4gICAgICAgIHdpbkNlbGxzID0gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy92ZXJ0aWNhbCBtYXRjaHNcclxuICBmb3IgKHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XHJcbiAgICBtYXRjaGVzID0gMDtcclxuICAgIGZvciAoeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLSR7YXJyW3ldW3hdfWApLmNsYXNzTGlzdC5jb250YWlucyhwbGF5ZXIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIG1hdGNoZXMrKztcclxuICAgICAgICB3aW5DZWxscy5wdXNoKGFyclt5XVt4XSk7XHJcbiAgICAgICAgaWYgKG1hdGNoZXMgPj0gc2l6ZSkge1xyXG4gICAgICAgICAgd2luKDIsIHdpbkNlbGxzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWF0Y2hlcyA9IDA7XHJcbiAgICAgICAgd2luQ2VsbHMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAvL3RvcCBsZWZ0IHRvIGJvdHRvbSByaWdodCBtYXRjaGVzXHJcbiAgd2luQ2VsbHMgPSBbXTtcclxuICBtYXRjaGVzID0gMDtcclxuICBmb3IgKHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtJHthcnJbeF1beF19YCkuY2xhc3NMaXN0LmNvbnRhaW5zKHBsYXllcikpIHtcclxuICAgICAgd2luQ2VsbHMucHVzaChhcnJbeF1beF0pO1xyXG4gICAgICBtYXRjaGVzKys7XHJcbiAgICAgIGlmIChtYXRjaGVzID49IHNpemUpIHtcclxuICAgICAgICB3aW4oMywgd2luQ2VsbHMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5DZWxscyA9IFtdO1xyXG4gICAgICBtYXRjaGVzID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgLy90b3AgcmlnaHQgdG8gYm90dG9tIGxlZnQgbWF0Y2hlc1xyXG4gIHdpbkNlbGxzID0gW107XHJcbiAgbWF0Y2hlcyA9IDA7XHJcbiAgZm9yICh4ID0gc2l6ZSAtIDE7IHggPj0gMDsgeC0tKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRvY3VtZW50XHJcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKGBjLSR7YXJyW3hdW01hdGguYWJzKHNpemUgLSAxIC0geCldfWApXHJcbiAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhwbGF5ZXIpXHJcbiAgICApIHtcclxuICAgICAgd2luQ2VsbHMucHVzaChhcnJbeF1bTWF0aC5hYnMoc2l6ZSAtIDEgLSB4KV0pO1xyXG4gICAgICBtYXRjaGVzKys7XHJcbiAgICAgIGlmIChtYXRjaGVzID49IHNpemUpIHtcclxuICAgICAgICB3aW4oNCwgd2luQ2VsbHMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5DZWxscyA9IFtdO1xyXG4gICAgICBtYXRjaGVzID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGFycl91bmRvLmxlbmd0aCA+PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIikubGVuZ3RoKSB7XHJcbiAgICBkcmF3KCk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=