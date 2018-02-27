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
            $('.container').append('<div class="changList col-md-12"><a href="#">' + '<p>切換列表顯示</p>' + '<p style="display:none;">切換月曆顯示</p>' + '</a></div>');

            $('.calendar').append('<div class="calendars_tabWrap">' + '<a href="#" class="prev"></a>' + '<ul class="ntb_tab"></ul>' + '<a href="#" class="next"></a>' + '</div>' + '<div class="calendars_weeksWrap"></div>' + '<ul id="ul_wrap" class="dateTab_ul_wrap"></ul>' + '<div class="listPage_wrap d-no"></div>');
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
                self.creatPagination();
            });
        }
    }, {
        key: 'creatWeek',
        value: function creatWeek() {

            this.$this.find('.calendars_weeksWrap').append('<span>星期日</span>' + '<span>星期一</span>' + '<span>星期二</span>' + '<span>星期三</span>' + '<span>星期四</span>' + '<span>星期五</span>' + '<span>星期六</span>' + '</div>');

            this.$this.find('.listPage_wrap').append('<div class="listPage_box">' + '<div class="list_prev"><a href="#">«上一頁</a></div>' + '<div class="current_page"></div>' + '<div class="list_next"><a href="#">下一頁»</a></div>' + '</div>');
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
                html += '<li class="tab"><a href="#" class="month_a"><span>' + nextMonth + '</span></a></li>';
            }
            $ntb_tab.append(html);
            this.$this.find('.tab:first-child ').addClass('tab_active');
            this.$this.find('.tab:first-child ').children().children().css('color', '#e10500');

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

            // let self = this;
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

            //月曆開頭
            for (i = 0; i < startDay; i++) {
                html += '<li class="hideData dateTab_day disabled "></li>';
                numRow++;
            }

            //本月日期
            for (var j = 1; j <= nDays; j++) {
                if (month < 10 && j < 10) {
                    html += '<li class="hideData dateTab_day ' + year + '0' + month + '0' + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
                } else if (month < 10) {
                    html += '<li class="hideData dateTab_day ' + year + '0' + month + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
                } else if (j < 10) {
                    html += '<li class="hideData dateTab_day ' + year + month + '0' + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
                } else {
                    html += '<li class="hideData dateTab_day ' + year + month + j + '"><div class="day_div"><span class="num">' + j + '</span></div></td>';
                }
                numRow++;
                if (numRow == 7) {
                    //如果已經到一行（一週）了，建造新的tr
                    numRow = 0;
                }
            }

            //本月結尾
            var lastDay = startDay + nDays;
            for (i = lastDay; i < 42; i++) {
                html += '<li class="hideData dateTab_day disabled"></li>';
                numRow++;
                if (numRow == 7) {
                    //如果已經到一行（一週）了，建造新的tr
                    numRow = 0;
                }
            }

            document.getElementById("ul_wrap").innerHTML = html;
            // $this.find('.calendars_tableWrap').append('</tbody></table></div>');


            var dataOfDate = dataSource.length;

            var _loop = function _loop() {
                var $day = _this.$this.find('.dateTab_day');
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

                    if ($('.dateTab_day').hasClass(data_date)) {
                        $('.' + data_date + '').addClass('hasData').removeClass('hideData');
                    }

                    var list_days = new Date(dataYear + ',' + dataMonth + ',' + dataDay); //所有資料的日期
                    var list_day_ch = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                    var list_day = new Date(list_days).getDay(); //只抓取 星期幾
                    var list_week = '<span class="list_week">' + list_day_ch[list_day] + '</span>'; //對應到的日期 轉成中文

                    $('.' + data_date + '>' + '.day_div').append(list_week);
                    var guaranteed = "<span class='ic-ln guaranteed'>" + dataSource[i].guaranteed + '</span>';
                    var status = "<span class='status'>" + dataSource[i].status + '</span>';
                    var available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy + '</span>';
                    var total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy + '</span>';
                    var price = "<span class='price'>" + '$' + _this.self.addCommas(dataSource[i].price) + '起' + '</span>';

                    $('.' + data_date + '').append(status + available + total);

                    if (dataSource[i].guaranteed === true) {
                        $('.' + data_date + '').append(guaranteed);
                        $('.guaranteed').text('保證出團');
                    }
                    $('.' + data_date + '').append(price);

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
            $('.dateTab_daymode .list_week').addClass('d-no');
            $('.dateTab_listmode .hideData').addClass('d-no');
            // self.creatPagination();
        }

        //	資料只有一頁的話 按下一頁還是會增加

    }, {
        key: 'creatPagination',
        value: function creatPagination() {
            var pageSize = 8; //每頁顯示數據條數
            var currentPage = 1; //當前頁數
            var totalSize = $(".dateTab_listmode .hasData").length; //獲取總數據
            var totalPage = Math.ceil(totalSize / pageSize); //計算總頁數 ceil無條件進位
            $(".dateTab_listmode .hasData:gt(7)").addClass('d-no'); //設置首頁顯示8條數據
            $(".dateTab_listmode .hasData:eq(7)").css('border-bottom', ' 1px solid #eee'); //第一頁最後一個加底線
            $(".dateTab_listmode .hasData:last").css('border-bottom', ' 1px solid #eee'); //最後一筆資料加底線
            $(".total").text(totalPage); //設置總頁數
            $(".current_page").text(currentPage + '/' + totalPage); //設置當前頁數


            //判斷頁數 隱藏上下頁
            if (currentPage == 1) {
                $(".list_prev a").addClass('v-hide');
            }
            if (currentPage == totalPage) {
                $(".list_next a").addClass('v-hide');
            }
            if (currentPage !== totalPage) {
                $(".list_next a").removeClass('v-hide');
            }

            //實現下一頁
            $(".list_next").click(function () {
                if ($(".list_next a").hasClass('v-hide')) {
                    return false;
                };
                if (currentPage == totalPage) {
                    //當前頁數==最後一頁，禁止下一頁
                    return false;
                } else {
                    //不是最後一頁，顯示應該顯示的數據.
                    $(".current_page").text(++currentPage + '/' + totalPage); //當前頁數先+1
                    console.log(currentPage);
                    var start = pageSize * (currentPage - 1);
                    var end = pageSize * currentPage;
                    $.each($('.dateTab_listmode .hasData'), function (index, item) {
                        if (index >= start && index < end) {
                            $(this).removeClass('d-no');
                        } else {
                            $(this).addClass('d-no');
                        }
                    });
                }
                //判斷頁數 隱藏上下頁
                if (currentPage == totalPage) {
                    $(".list_next a").addClass('v-hide');
                }
                if (currentPage !== totalPage) {
                    $(".list_prev a").removeClass('v-hide');
                }
            });

            // 實現上一頁
            $(".list_prev").click(function () {
                if (currentPage == 1) {
                    return false;
                } else {
                    $(".current_page").text(--currentPage + '/' + totalPage); //當前頁數先-1
                    var start = pageSize * (currentPage - 1);
                    var end = pageSize * currentPage;
                    $.each($('.dateTab_listmode .hasData'), function (index, item) {
                        if (index >= start && index < end) {
                            $(this).removeClass('d-no');
                        } else {
                            $(this).addClass('d-no');
                        }
                    });
                }

                //判斷頁數 隱藏上下頁    
                if (currentPage !== totalPage) {
                    $(".list_next a").removeClass('v-hide');
                }
                if (currentPage == 1) {
                    $(".list_prev a").addClass('v-hide');
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
                $('.tab').removeClass('tab_active');
                $('.tab').children().children().css('color', '#666');
                $(this).addClass('tab_active');
                $(this).children().children().css('color', '#e10500');
                self.ajaxGetJson();
            });
        }
    }, {
        key: 'onClickPrev',
        value: function onClickPrev() {
            var self = this;
            var $this = this.$ele;
            $('.prev').on('click', function () {
                $('.ntb_tab > .tab:first-child').css({
                    "margin-left": "0%"
                });

                $this.find('.tab_active').prev().addClass('tab_active');
                $this.find('.tab_active').children().children().css('color', '#e10500');
                $this.find('.tab_active').next().children().children().css('color', '#666');
                $this.find('.tab_active').next().removeClass('tab_active');
                self.ajaxGetJson();
            });
        }
    }, {
        key: 'onClickNext',
        value: function onClickNext() {
            var self = this;
            var $this = this.$ele;
            $('.next').on('click', function () {
                $('.ntb_tab > .tab:first-child').css({
                    "margin-left": "-33.3%"
                });

                $this.find('.tab_active').next().addClass('tab_active');
                $this.find('.tab_active').children().children().css('color', '#e10500');
                $this.find('.tab_active').prev().children().children().css('color', '#666');
                $this.find('.tab_active').prev().removeClass('tab_active');
                self.ajaxGetJson();
            });
        }

        //切換列表 月曆顯示

    }, {
        key: 'switch',
        value: function _switch() {
            var self = this;
            $('.changList p').toggle(0, 'd-no');
            $('.dateTab').toggleClass('dateTab_listmode');
            $('.dateTab').toggleClass('dateTab_daymode');
            this.$this.find('.hideData').toggleClass('d-no');
            this.$this.find('.list_week').toggleClass('d-no');
            this.$this.find('.listPage_wrap').toggleClass('d-no');
            $('.dateTab_daymode .hasData').removeClass('d-no');
            self.creatPagination();
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
                var items = _inputData.concat(dataSource);
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
                var items = _resetData.concat(dataSource);;
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
                // var dataSource = resetData.concat(dataSource);
                //資料日期排序 由小到大
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                });
                self.creatCalendar(dataSource);
            });
        }

        // destroy calendar，destroy時連class new出來的實例物件也要刪除

    }, {
        key: 'destroy',
        value: function destroy() {
            $('.calendar').empty();
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