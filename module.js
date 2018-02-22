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
		this.self = this;
		this.$this = this.$ele;
	}

	_createClass(Module, [{
		key: 'init',
		value: function init() {
			$('.dateTab').append('<div class="changList col-md-12"><a href="javascript:;">' + '<p>切換列表顯示</p>' + '<p style="display:none;">切換月曆顯示</p>' + '</a></div>');

			$('.calendar').append('<div class="calendars_tabWrap">' + '<a href="javascript:;" class="prev"></a>' + '<ul class="ntb_tab"></ul>' + '<a href="javascript:;" class="next"></a>' + '</div>');
			this.self.creatMonth();
			this.self.ajaxGetJson();
			this.self.onClickMonth();
			this.self.onClickNext();
			this.self.onClickPrev();
			this.self.onClickChang();
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
			}).done(function (dataSource) {

				var lookup = {};
				var items = dataSource;
				var dataSource = [];

				for (var item, i = 0; item = items[i++];) {

					var date = item.date;

					//不同資料的key 刪除再新增
					var statusKey = item.status || item.state;
					delete (item.status || item.state);
					item.status = statusKey;

					var availableVancancyKey = item.availableVancancy || item.onsell;
					delete (item.availableVancancy || item.onsell);
					item.availableVancancy = availableVancancyKey;

					var totalVacnacyKey = item.totalVacnacy || item.total;
					delete (item.totalVacnacy || item.total);
					item.totalVacnacy = totalVacnacyKey;

					var guaranteedKey = item.guaranteed || item.certain;
					delete (item.guaranteed || item.certain);
					item.guaranteed = guaranteedKey;

					if (!(date in lookup)) {
						lookup[date] = 1;
						dataSource.push(item);
					}
				}
				//資料日期排序 由小到大
				dataSource = dataSource.sort(function (a, b) {
					return a.date > b.date ? 1 : -1;
				});
				self.creatCalendar(dataSource);
				self.creatCalendarList(dataSource);
			});
		}
	}, {
		key: 'creatWeek',
		value: function creatWeek() {

			this.$this.find('.calendars_tabWrap').append('<div class="calendars_wrap">' + '<table class="calendars_tableWrap">' + '<thead>' + '<tr class="calendars_weeksWrap">' + '<th>星期日</th>' + '<th>星期一</th>' + '<th>星期二</th>' + '<th>星期三</th>' + '<th>星期四</th>' + '<th>星期五</th>' + '<th>星期六</th>' + '</tr>' + '</thead>' + '<tbody id="tbody" class="tbody">');
			this.$this.find('.calendars_wrap').append('<div class="calendars_list_wrap">' + '<ul id="calendarList" class="calendarList" style="min-height: 496px;"></ul>' + '</div></tbody></table>' + '<div class="listPage_wrap">' + '<div class="listPage_box">' + '<div class="list_prev"><a href="javascript:;">«上一頁</a></div>' + '<div class="current_page"></div>' + '<div class="list_next"><a href="javascript:;">下一頁»</a></div>' + '</div>' + '</div>' + '</div>');
		}
	}, {
		key: 'creatMonth',
		value: function creatMonth() {
			var initYearMonth = this.option.initYearMonth;
			var $ntb_tab = this.$this.find('.ntb_tab');
			var html = '';
			var i = void 0;
			for (i = 0; i <= 3; i++) {
				var nextMonth = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
				html += '<li class="tab"><a href="#"><span>' + nextMonth + '</span></a></li>';
			}
			$ntb_tab.append(html);
			this.$this.find('.tab' + ':first-child a span').addClass('tab_active');

			this.self.creatWeek();
		}

		//正規表達式 增加逗號

	}, {
		key: 'addCommas',
		value: function addCommas(val) {
			return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
		}
	}, {
		key: 'creatCalendar',
		value: function creatCalendar(dataSource) {
			var _this = this;

			var today = new Date();

			//抓取active選擇到的年、月份
			var year = parseInt($(".tab_active").text().slice(0, 4));
			var month = parseInt($(".tab_active").text().slice(4, 8));
			// console.log(year)
			// console.log(month)

			var day = today.getDate();

			//本月的第一天是星期幾(距星期日的天數)
			var startDay = new Date(year, month - 1, 1).getDay();
			var nextStartDay = startDay - 1;

			//本月有多少天 可以用上個月的0 來表示這個月的最後一天
			var nDays = new Date(year, month, 0).getDate();

			var numRow = 0; //到達7的時候創建tr
			var i = void 0; //日期
			var html = '';

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

			document.getElementById("tbody").innerHTML = html;
			// $this.find('.calendars_tableWrap').append('</tbody></table></div>');


			var dataOfDate = dataSource.length;

			var _loop = function _loop() {
				var $day = _this.$this.find('.day');
				var dataYear = dataSource[i].date.substring(0, 4);
				var dataMonth = dataSource[i].date.substring(5, 7);
				var dataDay = dataSource[i].date.substring(8, 10);
				var data_date = parseInt(dataYear + dataMonth + dataDay);

				// console.log(data_date);


				if ($day.hasClass(data_date)) {

					// 資料內值為0  顯示0 
					if (dataSource[i].guaranteed === undefined && dataSource[i].totalVacnacy === undefined) {
						dataSource[i].totalVacnacy = 0;
						dataSource[i].guaranteed = false;
					} else if (dataSource[i].guaranteed === undefined && dataSource[i].availableVancancy === undefined) {
						dataSource[i].availableVancancy = 0;
						dataSource[i].guaranteed = false;
					} else if (dataSource[i].availableVancancy === undefined) {
						dataSource[i].availableVancancy = 0;
					} else if (dataSource[i].totalVacnacy === undefined) {
						dataSource[i].totalVacnacy = 0;
					} else if (dataSource[i].guaranteed === undefined) {
						dataSource[i].guaranteed = false;
					};
					//如果可賣、團位 數量為0 顯示undefined 強制轉為0
					// if( dataSource[i].availableVancancy === undefined ){
					// 	dataSource[i].availableVancancy = 0 ;
					// }else if( dataSource[i].totalVacnacy === undefined ){
					// 	dataSource[i].totalVacnacy = 0  ;
					// }

					var guaranteed = "<span class='guaranteed'>" + dataSource[i].guaranteed + '</span>';
					var status = "<span class='status'>" + dataSource[i].status + '</span>';
					var available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy + '</span>';
					var total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy + '</span>';
					var price = "<span class='price'>" + '$' + _this.self.addCommas(dataSource[i].price) + '起' + '</span>';

					if (dataSource[i].guaranteed === true) {
						$('.' + data_date + '').children().append(guaranteed);
						$('.guaranteed').text('保證出團');
					}

					$('.' + data_date + '').append(status + available + total + price);

					//如果資料內其中一筆 是undefined 就刪除所有資料
					if (dataSource[i].guaranteed === undefined || dataSource[i].date === undefined || dataSource[i].price === undefined || dataSource[i].totalVacnacy === undefined || dataSource[i].status === undefined) {
						$('.' + data_date + '>' + '.day_div' + '>' + 'span:nth-child(2)').remove();
						$('.' + data_date + '>' + 'span').remove();
					}

					//不同狀態 產生不同顏色
					if (dataSource[i].status === '報名' || dataSource[i].status === '預定' || dataSource[i].status === '後補') {
						$('.' + data_date + '>' + 'span:nth-child(2)').css('color', '#24a07c');
					} else if (dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '關團') {
						$('.' + data_date + '>' + 'span:nth-child(2)').css('color', '#ff7800');
					};

					//點擊含有資料的td
					$day.on('click', function () {
						if ($(this).children().hasClass('price')) {
							$day.removeClass('hasDataActive');
							$(this).addClass('hasDataActive');
						}
					});
				}
			};

			for (i = 0; i < dataOfDate; i++) {
				_loop();
			} //for迴圈
		}
	}, {
		key: 'creatCalendarList',
		value: function creatCalendarList(dataSource) {
			var _this2 = this;

			var today = new Date();

			//抓取active選擇到的年、月份
			var year = parseInt($(".tab_active").text().slice(0, 4));
			var month = parseInt($(".tab_active").text().slice(4, 8));

			var day = today.getDate();

			//本月有多少天 可以用上個月的0 來表示這個月的最後一天
			var nDays = new Date(year, month, 0).getDate();

			var numRow = 0; //到達7的時候創建tr
			var i = void 0; //日期
			var html = '';

			for (var j = 1; j <= nDays; j++) {

				if (month < 10 && j < 10) {
					html += '<li class="list_day hideData ' + year + '0' + month + '0' + j + '"><div class="list_day_div"><span class="list_day_num">' + j + '</span>';
					'</div></li>';
				} else if (month < 10) {
					html += '<li class="list_day hideData ' + year + '0' + month + j + '"><div class="list_day_div"><span class="list_day_num">' + j + '</span>';
					'</div></li>';
				} else if (j < 10) {
					html += '<li class="list_day hideData ' + year + month + '0' + j + '"><div class="list_day_div"><span class="list_day_num">' + j + '</span>';
					'</div></li>';
				} else {
					html += '<li class="list_day hideData ' + year + month + j + '"><div class="list_day_div"><span class="list_day_num">' + j + '</span>';
					'</div></li>';
				}
				numRow++;
			}

			document.getElementById("calendarList").innerHTML = html;

			var dataOfDate = dataSource.length;

			var _loop2 = function _loop2() {
				var $list_day = _this2.$this.find('.list_day');
				var dataYear = dataSource[i].date.substring(0, 4);
				var dataMonth = dataSource[i].date.substring(5, 7);
				var dataDay = dataSource[i].date.substring(8, 10);
				var data_date = parseInt(dataYear + dataMonth + dataDay);

				if ($('.list_day').hasClass(data_date)) {

					var available = "<div class='secDiv_wrap'><div class='secDiv'><span class='list_availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy + '</span>';
					var total = "<span class='list_totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy + '</span></div>';
					var guaranteed = "<div class='secDiv_guaranteed'><span class='ic-ln list_guaranteed'>" + dataSource[i].guaranteed + '</span></div></div>';
					var status = "<div class='thirdDiv'><span class='list_status'>" + dataSource[i].status + '</span>';
					var price = "<span class='list_price'>" + '$' + _this2.self.addCommas(dataSource[i].price) + '起' + '</span></div>';

					$('.list_day' + '.' + data_date + '').append(available + total);

					if (dataSource[i].guaranteed === true) {
						$('.' + data_date + '>' + '.secDiv_wrap').append(guaranteed);
						$('.list_guaranteed').text('保證出團');
					}

					$('.list_day' + '.' + data_date + '').append(status + price);

					$('.list_day' + '.' + data_date + '').addClass('hasData').removeClass('hideData');

					//如果資料內其中一筆 是undefined 就刪除所有資料 除了可賣數量可以為0
					if (dataSource[i].guaranteed === undefined || dataSource[i].date === undefined || dataSource[i].price === undefined || dataSource[i].totalVacnacy === undefined || dataSource[i].status === undefined) {
						$('.calendarList' + '>' + '.' + data_date + '').remove();
					}

					//不同狀態 產生不同顏色
					if (dataSource[i].status === '報名' || dataSource[i].status === '預定' || dataSource[i].status === '後補') {
						$('.' + data_date + '>' + '.thirdDiv' + '>' + 'span:nth-child(1)').css('color', '#24a07c');
					} else if (dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '關團') {
						$('.' + data_date + '>' + '.thirdDiv' + '>' + 'span:nth-child(1)').css('color', '#ff7800');
					};

					//點擊含有資料的td
					$list_day.on('click', function () {
						$list_day.removeClass('list_hasDataActive');
						$(this).addClass('list_hasDataActive');
					});
				} //if

				//增加星期幾
				//要輸入 , 串起來 才能印出時間
				var list_days = new Date(dataYear + ',' + dataMonth + ',' + dataDay); //所有資料的日期
				var list_day_ch = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				var list_day = new Date(list_days).getDay(); //只抓取 星期幾
				var list_week = '<span class="list_week">' + list_day_ch[list_day] + '</span>'; //對應到的日期 轉成中文

				// console.log(list_week)
				$('.' + data_date + '>' + '.list_day_div').append(list_week);
			};

			for (i = 0; i < dataOfDate; i++) {
				_loop2();
			} //for迴圈
			$('.hideData').remove();
			this.self.creatPagination();
		}

		//	資料只有一頁的話 按下一頁還是會增加

	}, {
		key: 'creatPagination',
		value: function creatPagination() {
			var pageSize = 8; //每頁顯示數據條數
			var currentPage = 1; //當前頁數
			var totalSize = $(".calendarList .list_day").length; //獲取總數據
			var totalPage = Math.ceil(totalSize / pageSize); //計算總頁數 ceil無條件進位
			$(".calendarList .list_day:gt(7)").hide(); //設置首頁顯示8條數據
			$(".total").text(totalPage); //設置總頁數
			$(".current_page").text(currentPage + '/' + totalPage); //設置當前頁數
			// console.log(totalSize)

			//實現下一頁
			$(".list_next").click(function () {
				if (currentPage == totalPage) {
					//當前頁數==最後一頁，禁止下一頁
					return false;
				} else {
					//不是最後一頁，顯示應該顯示的數據.
					$(".current_page").text(++currentPage + '/' + totalPage); //當前頁數先+1
					var start = pageSize * (currentPage - 1);
					var end = pageSize * currentPage;
					$.each($('.calendarList .list_day'), function (index, item) {
						if (index >= start && index < end) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}
			});

			//實現上一頁
			$(".list_prev").click(function () {
				if (currentPage == 1) {
					//當前頁數==1，禁止上一頁
					return false;
				} else {
					$(".current_page").text(--currentPage + '/' + totalPage); //當前頁數先-1
					var start = pageSize * (currentPage - 1);
					var end = pageSize * currentPage;
					$.each($('.calendarList .list_day'), function (index, item) {
						if (index >= start && index < end) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}
			});
		}
	}, {
		key: 'onClickMonth',
		value: function onClickMonth() {
			var self = this;
			var $this = this.$ele;
			var $tab = this.$this.find('.tab');
			var srcollWidth = this.$this.find('.tab').width();

			$tab.on('click', function () {
				$('.tab span').removeClass('tab_active');
				$(this).children().children().addClass('tab_active');
				self.ajaxGetJson();
			});
		}
	}, {
		key: 'onClickPrev',
		value: function onClickPrev() {
			var self = this;
			var $this = this.$ele;
			$('.prev').on('click', function () {
				$('.ntb_tab li').css({
					"right": "0%"
				});

				$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
				$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
				self.ajaxGetJson();
			});
		}
	}, {
		key: 'onClickNext',
		value: function onClickNext() {
			var self = this;
			var $this = this.$ele;
			$('.next').on('click', function () {
				$('.ntb_tab li').css({
					"right": "33.3%"
				});

				$this.find('.tab_active').parent().parent().next().children().children().addClass('tab_active');
				$this.find('.tab_active').parent().parent().prev().children().children().removeClass('tab_active');
				self.ajaxGetJson();
			});
		}

		//切換列表 月曆顯示

	}, {
		key: 'switch',
		value: function _switch() {
			$('.changList p').toggle(0, "d-no");
			this.$this.find('.calendars_tableWrap').toggle(0, '.d-no');
			this.$this.find('.calendarList').toggle(0, '.d-no');
			this.$this.find('.listPage_wrap').toggle(0, '.d-no');
		}
	}, {
		key: 'onClickChang',
		value: function onClickChang() {
			var self = this;
			$('.changList').on('click', function () {
				self.switch();
			});
		}

		// 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份

	}, {
		key: 'inputData',
		value: function inputData(_inputData) {
			var self = this;
			var $this = this.$ele;

			$.ajax({
				method: 'GET',
				url: './json/data1.json',
				dataType: 'json'
			}).done(function (dataSource) {

				var lookup = {};
				var items = dataSource;
				var dataSource = [];

				for (var item, i = 0; item = items[i++];) {

					var date = item.date;

					//不同資料的key 刪除再新增
					var statusKey = item.status || item.state;
					delete (item.status || item.state);
					item.status = statusKey;

					var availableVancancyKey = item.availableVancancy || item.onsell;
					delete (item.availableVancancy || item.onsell);
					item.availableVancancy = availableVancancyKey;

					var totalVacnacyKey = item.totalVacnacy || item.total;
					delete (item.totalVacnacy || item.total);
					item.totalVacnacy = totalVacnacyKey;

					var guaranteedKey = item.guaranteed || item.certain;
					delete (item.guaranteed || item.certain);
					item.guaranteed = guaranteedKey;

					if (!(date in lookup)) {
						lookup[date] = 1;
						dataSource.push(item);
					}
				}
				//排序之前 合併陣列
				var dataSource = _inputData.concat(dataSource);
				console.log(dataSource);
				//資料日期排序 由小到大
				dataSource = dataSource.sort(function (a, b) {
					return a.date > b.date ? 1 : -1;
				});
				self.creatCalendar(dataSource);
				self.creatCalendarList(dataSource);
			});
		}

		// 重設資料時，月曆、tab重新產出

	}, {
		key: 'resetData',
		value: function resetData(_resetData) {
			var self = this;
			var $this = this.$ele;

			$.ajax({
				method: 'GET',
				url: './json/data1.json',
				dataType: 'json'
			}).done(function (dataSource) {

				var lookup = {};
				var items = dataSource;
				var dataSource = [];

				for (var item, i = 0; item = items[i++];) {

					var date = item.date;

					//不同資料的key 刪除再新增
					var statusKey = item.status || item.state;
					delete (item.status || item.state);
					item.status = statusKey;

					var availableVancancyKey = item.availableVancancy || item.onsell;
					delete (item.availableVancancy || item.onsell);
					item.availableVancancy = availableVancancyKey;

					var totalVacnacyKey = item.totalVacnacy || item.total;
					delete (item.totalVacnacy || item.total);
					item.totalVacnacy = totalVacnacyKey;

					var guaranteedKey = item.guaranteed || item.certain;
					delete (item.guaranteed || item.certain);
					item.guaranteed = guaranteedKey;

					if (!(date in lookup)) {
						lookup[date] = 1;
						dataSource.push(item);
					}
				}
				//排序之前 合併陣列
				var dataSource = _resetData.concat(dataSource);
				//資料日期排序 由小到大
				dataSource = dataSource.sort(function (a, b) {
					return a.date > b.date ? 1 : -1;
				});
				self.creatCalendar(dataSource);
				self.creatCalendarList(dataSource);
			});
		}

		// destroy calendar，destroy時連class new出來的實例物件也要刪除

	}, {
		key: 'destroy',
		value: function destroy() {
			$('.calendar').remove();
			$('.changList').remove();
		}
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