const ModuleName = 'dateTab';
const ModuleDefaults = {

};
const ModuleReturns = [];

class Module {
    constructor(ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.self = this;
        this.$this = this.$ele;
    }



    init() {
        $('.container').append('<div class="changList col-md-12"><a href="#">' +
            '<p>切換列表顯示</p>' +
            '<p style="display:none;">切換月曆顯示</p>' +
            '</a></div>');

        $('.calendar').append('<div class="calendars_tabWrap">' +
            '<a href="#" class="prev"></a>' +
            '<ul class="ntb_tab"></ul>' +
            '<a href="#" class="next"></a>' +
            '</div>' +
            '<div class="calendars_weeksWrap"></div>' +
            '<ul id="ul_wrap" class="dateTab_ul_wrap"></ul>' +
            '<div class="listPage_wrap d-no"></div>');
        this.self.creatMonth();
        this.self.ajaxGetJson();
        this.self.onClickMonth();
        this.self.onClickNext();
        this.self.onClickPrev();
        this.self.onClickChang();
    }






    ajaxGetJson() {
        let self = this;
        let $this = this.$ele;


        $.ajax({
            method: 'GET',
            url: './json/data1.json',
            dataType: 'json'
        }).done(function(dataSource) {

            var lookup = {};
            var items = dataSource;
            var dataSource = [];

            for (var item, i = 0; item = items[i++];) {

                var date = item.date;

                //不同資料的key 刪除再新增
                var statusKey = (item.status || item.state);
                delete(item.status || item.state);
                item.status = statusKey;


                var availableVancancyKey = (item.availableVancancy || item.onsell);
                delete(item.availableVancancy || item.onsell);
                item.availableVancancy = availableVancancyKey;


                var totalVacnacyKey = (item.totalVacnacy || item.total);
                delete(item.totalVacnacy || item.total);
                item.totalVacnacy = totalVacnacyKey;


                var guaranteedKey = (item.guaranteed || item.certain);
                delete(item.guaranteed || item.certain);
                item.guaranteed = guaranteedKey;


                if (!(date in lookup)) {
                    lookup[date] = 1;
                    dataSource.push(item);
                }
            }
            //資料日期排序 由小到大
            dataSource = dataSource.sort(function(a, b) {
                return a.date > b.date ? 1 : -1;
            })
            self.creatCalendar(dataSource);
            self.creatPagination();
        });

    }




    creatWeek() {

        this.$this.find('.calendars_weeksWrap').append('<span>星期日</span>' +
            '<span>星期一</span>' +
            '<span>星期二</span>' +
            '<span>星期三</span>' +
            '<span>星期四</span>' +
            '<span>星期五</span>' +
            '<span>星期六</span>' +
            '</div>');

        this.$this.find('.listPage_wrap').append('<div class="listPage_box">' +
            '<div class="list_prev"><a href="#">«上一頁</a></div>' +
            '<div class="current_page"></div>' +
            '<div class="list_next"><a href="#">下一頁»</a></div>' +
            '</div>');
    }


    creatMonth() {
        let initYearMonth = this.option.initYearMonth;
        let $ntb_tab = this.$this.find('.ntb_tab');
        let html = '';
        let i;
        for (i = 0; i <= 3; i++) {
            let nextMonth = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
            html += '<li class="tab"><a href="#" class="month_a"><span>' + nextMonth + '</span></a></li>'
        }
        $ntb_tab.append(html);
        this.$this.find('.tab:first-child ').addClass('tab_active');
        this.$this.find('.tab:first-child ').children().children().css('color', '#e10500');

        this.self.creatWeek();
    }



    //正規表達式 增加逗號
    addCommas(val) {
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }



    creatCalendar(dataSource) {
        // let self = this;
        let today = new Date();

        //抓取active選擇到的年、月份
        let year = parseInt($(".tab_active").text().slice(0, 4));
        let month = parseInt($(".tab_active").text().slice(4, 8));
        // console.log(year)
        // console.log(month)

        let day = today.getDate();

        //本月的第一天是星期幾(距星期日的天數)
        let startDay = new Date(year, month - 1, 1).getDay();
        let nextStartDay = startDay - 1;

        //本月有多少天 可以用上個月的0 來表示這個月的最後一天
        let nDays = new Date(year, month, 0).getDate();

        let numRow = 0; //到達7的時候創建tr
        let i; //日期
        let html = '';




        //月曆開頭
        for (i = 0; i < startDay; i++) {
            html += '<li class="hideData dateTab_day disabled "></li>';
            numRow++;
        }

        //本月日期
        for (let j = 1; j <= nDays; j++) {
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
            if (numRow == 7) { //如果已經到一行（一週）了，建造新的tr
                numRow = 0;
            }
        }

        //本月結尾
        let lastDay = startDay + nDays;
        for (i = lastDay; i < 42; i++) {
            html += '<li class="hideData dateTab_day disabled"></li>';
            numRow++;
            if (numRow == 7) { //如果已經到一行（一週）了，建造新的tr
                numRow = 0;
            }
        }



        document.getElementById("ul_wrap").innerHTML = html;
        // $this.find('.calendars_tableWrap').append('</tbody></table></div>');



        let dataOfDate = dataSource.length;

        for (i = 0; i < dataOfDate; i++) {
            let $day = this.$this.find('.dateTab_day');
            let dataYear = dataSource[i].date.substring(0, 4);
            let dataMonth = dataSource[i].date.substring(5, 7);
            let dataDay = dataSource[i].date.substring(8, 10);
            let data_date = parseInt(dataYear + dataMonth + dataDay);

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

                let list_days = new Date(dataYear + ',' + dataMonth + ',' + dataDay); //所有資料的日期
                let list_day_ch = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                let list_day = new Date(list_days).getDay(); //只抓取 星期幾
                let list_week = '<span class="list_week">' + list_day_ch[list_day] + '</span>'; //對應到的日期 轉成中文

                $('.' + data_date + '>' + '.day_div').append(list_week);
                let guaranteed = "<span class='ic-ln guaranteed'>" + dataSource[i].guaranteed + '</span>'
                let status = "<span class='status'>" + dataSource[i].status + '</span>';
                let available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy + '</span>';
                let total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy + '</span>';
                let price = "<span class='price'>" + '$' + this.self.addCommas(dataSource[i].price) + '起' + '</span>';





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
                $day.on('click', function() {
                    if ($(this).children().hasClass('price')) {
                        $day.removeClass('hasDataActive');
                        $(this).addClass('hasDataActive');
                    }
                });
            }

        } //for迴圈
        $('.dateTab_daymode .list_week').addClass('d-no');
        $('.dateTab_listmode .hideData').addClass('d-no');
        // self.creatPagination();
    }

    //	資料只有一頁的話 按下一頁還是會增加
    creatPagination() {
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
        $(".list_next").click(function() {
            if ($(".list_next a").hasClass('v-hide')) {
                return false;
            };
            if (currentPage == totalPage) { //當前頁數==最後一頁，禁止下一頁
                return false;
            } else { //不是最後一頁，顯示應該顯示的數據.
                $(".current_page").text(++currentPage + '/' + totalPage); //當前頁數先+1
                console.log(currentPage)
                var start = pageSize * (currentPage - 1);
                var end = pageSize * currentPage;
                $.each($('.dateTab_listmode .hasData'), function(index, item) {
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
        $(".list_prev").click(function() {
            if (currentPage == 1) {
                return false;
            } else {
                $(".current_page").text(--currentPage + '/' + totalPage); //當前頁數先-1
                var start = pageSize * (currentPage - 1);
                var end = pageSize * currentPage;
                $.each($('.dateTab_listmode .hasData'), function(index, item) {
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


    onClickMonth() {
        let self = this;
        let $this = this.$ele;
        let $tab = this.$this.find('.tab');
        let srcollWidth = this.$this.find('.tab').width();


        $tab.on('click', function() {
            $('.tab').removeClass('tab_active');
            $('.tab').children().children().css('color', '#666');
            $(this).addClass('tab_active');
            $(this).children().children().css('color', '#e10500');
            self.ajaxGetJson();
        });

    }

    onClickPrev() {
        let self = this;
        let $this = this.$ele;
        $('.prev').on('click', function() {
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


    onClickNext() {
        let self = this;
        let $this = this.$ele;
        $('.next').on('click', function() {
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
    switch () {
        let self = this;
        $('.changList p').toggle(0, 'd-no');
        $('.dateTab').toggleClass('dateTab_listmode');
        $('.dateTab').toggleClass('dateTab_daymode');
        this.$this.find('.hideData').toggleClass('d-no');
        this.$this.find('.list_week').toggleClass('d-no');
        this.$this.find('.listPage_wrap').toggleClass('d-no');
        $('.dateTab_daymode .hasData').removeClass('d-no');
        self.creatPagination();
    }

    onClickChang() {
        let self = this;
        $('.changList').on('click', function() {
            self.switch();
        });
    }



    // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
    inputData(inputData) {
        let self = this;
        let $this = this.$ele;

        $.ajax({
            method: 'GET',
            url: './json/data1.json',
            dataType: 'json'
        }).done(function(dataSource) {

            var lookup = {};
            var items = inputData.concat(dataSource);
            var dataSource = [];

            for (var item, i = 0; item = items[i++];) {

                var date = item.date;

                //不同資料的key 刪除再新增
                var statusKey = (item.status || item.state);
                delete(item.status || item.state);
                item.status = statusKey;


                var availableVancancyKey = (item.availableVancancy || item.onsell);
                delete(item.availableVancancy || item.onsell);
                item.availableVancancy = availableVancancyKey;


                var totalVacnacyKey = (item.totalVacnacy || item.total);
                delete(item.totalVacnacy || item.total);
                item.totalVacnacy = totalVacnacyKey;


                var guaranteedKey = (item.guaranteed || item.certain);
                delete(item.guaranteed || item.certain);
                item.guaranteed = guaranteedKey;


                if (!(date in lookup)) {
                    lookup[date] = 1;
                    dataSource.push(item);
                }
            }
            //資料日期排序 由小到大
            dataSource = dataSource.sort(function(a, b) {
                return a.date > b.date ? 1 : -1;
            })
            self.creatCalendar(dataSource);
        });
    }

    // 重設資料時，月曆、tab重新產出
    resetData(resetData) {
        let self = this;
        let $this = this.$ele;

        $.ajax({
            method: 'GET',
            url: './json/data1.json',
            dataType: 'json'
        }).done(function(dataSource) {

            var lookup = {};
            var items = resetData.concat(dataSource);;
            var dataSource = [];

            for (var item, i = 0; item = items[i++];) {

                var date = item.date;

                //不同資料的key 刪除再新增
                var statusKey = (item.status || item.state);
                delete(item.status || item.state);
                item.status = statusKey;


                var availableVancancyKey = (item.availableVancancy || item.onsell);
                delete(item.availableVancancy || item.onsell);
                item.availableVancancy = availableVancancyKey;


                var totalVacnacyKey = (item.totalVacnacy || item.total);
                delete(item.totalVacnacy || item.total);
                item.totalVacnacy = totalVacnacyKey;


                var guaranteedKey = (item.guaranteed || item.certain);
                delete(item.guaranteed || item.certain);
                item.guaranteed = guaranteedKey;


                if (!(date in lookup)) {
                    lookup[date] = 1;
                    dataSource.push(item);
                }
            }
            // var dataSource = resetData.concat(dataSource);
            //資料日期排序 由小到大
            dataSource = dataSource.sort(function(a, b) {
                return a.date > b.date ? 1 : -1;
            })
            self.creatCalendar(dataSource);
        });
    }

    // destroy calendar，destroy時連class new出來的實例物件也要刪除
    destroy() {
        $('.calendar').empty();
    }

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };