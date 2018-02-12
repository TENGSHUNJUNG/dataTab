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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _module = __webpack_require__(4);

var root = function (root) {
	if ((typeof root === 'undefined' ? 'undefined' : _typeof(root)) === 'object' && (root.self === root || root.global === global) && root) {
		return root;
	}
}(self || global || {});

var $ = function ($) {
	if (typeof $ === 'function') {
		return $;
	} else {
		throw 'You must import jQuery';
	}
}(root.jQuery);

$.fn[_module.ModuleName] = function () {
	var module = void 0;
	var args = Array.prototype.slice.call(arguments, 0);
	var method = args[0];
	var options = args.slice(1).length <= 0 ? undefined : args.slice(1, args.length);;
	var isReturnMethod = this.length === 1 && typeof method === 'string' && _module.ModuleReturns.indexOf(method) !== -1;
	var methodRunner = function methodRunner(method, options, uesReturn) {
		var $this = $(this);
		var module = $this.data(_module.ModuleName);
		if (!!module) {
			if (typeof method == 'string' && !uesReturn) {
				module[method].apply(module, options);
			} else if (typeof method == 'string' && !!uesReturn) {
				return module[method].apply(module, options);
			} else {
				throw 'unsupported options!';
			}
		} else {
			throw 'You must run first this plugin!';
		}
	};
	if (isReturnMethod) {
		return methodRunner.call(this, method, options, isReturnMethod);
	} else {
		return this.each(function () {
			var $this = $(this);
			var module = $this.data(_module.ModuleName);
			var opts = null;
			if (!!module) {
				methodRunner.call(this, method, options);
			} else {
				opts = $.extend(true, {}, _module.ModuleDefaults, (typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' && method, (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options);
				module = new _module.Module(this, opts);
				$this.data(_module.ModuleName, module);
				module.init();
			}
		});
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleName = 'dateTab';
var ModuleDefaults = {};
var ModuleReturns = [];

var Module = function () {
	function Module(ele, options) {
		_classCallCheck(this, Module);

		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	}

	_createClass(Module, [{
		key: 'init',
		value: function init() {
			var self = this;
			var $this = this.$ele;
			var options = this.option;

			self.creatWeek();
			self.creatMonth();
			self.ajaxGetJson();
			self.onClickMonth();
		}
	}, {
		key: 'ajaxGetJson',
		value: function ajaxGetJson() {
			var self = this;
			var $this = this.$ele;

			$.ajax({
				method: 'GET',
				url: './json/data1.json',
				dataType: 'json'
			}).done(function (dataSort) {
				dataSort = dataSort.sort(function (a, b) {
					return a.date > b.date ? 1 : -1;
				});
				// self.creatWeek();
				// self.creatMonth();
				self.creatCalendar(dataSort);
			});

			// self.creatCalendar();
		}
	}, {
		key: 'creatWeek',
		value: function creatWeek() {
			$('.calendar').append('<div class="calendars_tabWrap">');
			$('.calendars_tabWrap').append('<a href="#" class="prev on"></a>' + '<ul class="ntb_tab"></ul>' + '<a href="#" class="next on"></a></div>' + '<table class="calendars_tableWrap">' + '<thead>' + '<tr class="calendars_weeksWrap">' + '<th>星期日</th>' + '<th>星期一</th>' + '<th>星期二</th>' + '<th>星期三</th>' + '<th>星期四</th>' + '<th>星期五</th>' + '<th>星期六</th>' + '</tr>' + '</thead>');
		}
	}, {
		key: 'creatMonth',
		value: function creatMonth() {
			var self = this;
			var $this = this.$ele;
			var initYearMonth = this.option.initYearMonth;
			var $ntb_tab = $this.find('.ntb_tab');
			var html = '';
			var i = void 0;
			for (i = 0; i <= 2; i++) {
				var nextMonth = moment().add(i, 'months').format("YYYY MMM");
				html += '<li class="tab"><a href="#"><span>' + nextMonth + '</span></a></li>';
			}
			$ntb_tab.append(html);
			$('.tab:first-child a span').addClass('tab_active');
		}
	}, {
		key: 'creatCalendar',
		value: function creatCalendar(dataSort) {

			var initYearMonth = this.option.initYearMonth;
			var today = new Date();

			//抓取active選擇到的年、月份
			var year = parseInt($(".tab_active").text().slice(0, 4));
			var month = parseInt($(".tab_active").text().slice(4, 8));
			console.log(year);
			console.log(month);

			var day = today.getDate();

			//本月的第一天是星期幾(距星期日的天數)
			var startDay = new Date(year, month - 1, 1).getDay();
			var nextStartDay = startDay - 1;

			//本月有多少天 可以用上個月的0 來表示這個月的最後一天
			var nDays = new Date(year, month, 0).getDate();

			var numRow = 0; //到達7的時候創建tr
			var i = void 0; //日期
			var html = '';

			html += '<tbody class="tbody">';
			html += '<tr class="days">';

			//月曆開頭
			for (i = 0; i < startDay; i++) {
				html += '<td class="day disabled"></td>';
				numRow++;
			}

			//本月日期
			for (var j = 1; j <= nDays; j++) {
				if (month < 10 && j < 10) {
					html += '<td class="day ' + year + '0' + month + '0' + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
				} else if (month < 10) {
					html += '<td class="day ' + year + '0' + month + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
				} else if (j < 10) {
					html += '<td class="day ' + year + month + '0' + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
				} else {
					html += '<td class="day ' + year + month + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
				}
				numRow++;
				if (numRow == 7) {
					//如果已經到一行（一週）了，建造新的tr
					numRow = 0;
					html += '</tr><tr class="days">';
				}
			}

			//本月結尾
			var lastDay = startDay + nDays;
			for (i = lastDay; i < 42; i++) {
				html += '<td class="day disabled"></td>';
				numRow++;
				if (numRow == 7) {
					//如果已經到一行（一週）了，建造新的tr
					numRow = 0;
					html += '</tr><tr class="days">';
				}
			}
			$('.calendars_tableWrap').append(html + '</tbody></table></div>');

			var dataOfDate = dataSort.length;

			for (i = 0; i < dataOfDate; i++) {
				var self = this;
				var $this = this.$ele;
				var dataYear = dataSort[i].date.substring(0, 4);
				var dataMonth = dataSort[i].date.substring(5, 7);
				var dataDay = dataSort[i].date.substring(8, 10);
				var data_date = parseInt(dataYear + dataMonth + dataDay);

				console.log(data_date);

				//price的class還沒設定 明天接著做完!!!!!!!!
				if ($('.day').hasClass(data_date)) {
					var price = "<span class='price'>" + "$" + dataSort[i].price + "起" + "</span>";
					$('.' + data_date + '').append(price);
				}
			}
		}
	}, {
		key: 'onClickMonth',
		value: function onClickMonth() {
			var self = this;
			var $this = this.$ele;
			var options = this.option;
			var initYearMonth = this.option.initYearMonth;
			var $tab = $this.find('.tab');
			var srcollWidth = $this.find('.tab').width();

			$tab.on('click', function () {
				$this.find('.tbody').remove();
				$('.tab span').removeClass('tab_active');
				$(this).children().children().addClass('tab_active');
				self.ajaxGetJson();
			});

			//左邊箭頭
			$('.prev').on('click', function () {
				$this.find('.tbody').remove();

				$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
				$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
				self.ajaxGetJson();
			});

			//右邊箭頭
			$('.next').on('click', function () {
				$this.find('.tbody').remove();

				$this.find('.tab_active').parent().parent().next().children().children().addClass('tab_active');
				$this.find('.tab_active').parent().parent().prev().children().children().removeClass('tab_active');
				self.ajaxGetJson();
			});
		}

		// onClickPrev () {
		// 	let srcollWidth = $('.tab').width();
		// 	let srcollCount = srcollWidth * 5 ;
		// 	let num = 0;
		// 	$('.prev').on('click',function(){
		// 		if(num>0){
		//        		num=num-1;
		//        	console.log(num)
		// 		$('.tab').animate({
		// 			left: "+="+ srcollWidth +"",
		// 		},0) ;
		// 		}
		// 	});
		// }


		// onClickNext () {
		// 	let srcollWidth = $('.tab').width();
		// 	let srcollCount = srcollWidth * 5 ;
		// 	let num = 0;
		// 	$('.next').on('click',function(){
		// 		if(num< (srcollCount-1) ){
		//        		num=num+1;
		//        		console.log(num)
		// 		$('.tab').animate({
		// 			left: "-="+ srcollWidth +"",
		// 		},0) ;
		// 		}
		// 	});
		// }

	}]);

	return Module;
}();

;

exports.ModuleName = ModuleName;
exports.ModuleDefaults = ModuleDefaults;
exports.ModuleReturns = ModuleReturns;
exports.Module = Module;

/***/ })
/******/ ]);