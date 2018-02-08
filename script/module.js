const ModuleName = 'dateTab';
const ModuleDefaults =  {

};
const ModuleReturns = [];

class Module {
	constructor ( ele, options ) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	}



	init () {
		let self = this ;
		let $this = this.$ele;
		let options = this.option;



		$('.calendar').append('<div class="calendars_tabWrap"></div>');
		$('.calendars_tabWrap').append('<a href="#" class="prev on"></a><ul class="ntb_tab"><li class="tab"><a href="#"><span>2018 1月</span></a></li><li class="tab"><a href="#"><span>2018 2月</span></a></li><li class="tab"><a href="#"><span>2018 3月</span></a></li><li class="tab"><a href="#"><span>2018 4月</span></a></li><li class="tab"><a href="#"><span>2018 5月</span></a></li></ul><a href="#" class="next on"></a></div><table class="calendars_tableWrap"><thead><tr class="calendars_weeksWrap"><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr></thead>');

		$.ajax({
			method: 'GET',
			url: './json/data1.json',
			dataType: 'json'
		}).done(function( data ) {
			// $('.day_div').append('<div class="details"><span class="status">'+ data[0].guaranteed +'<span></div>')
		});


		self.creatCalendar();
		self.onClickMonth();
		self.onClickNext();
	}





	creatCalendar () {
		let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let day = today.getDate();

        //本月的第一天是星期幾(距星期日的天數)
        let startDay = new Date(year, month - 1, 1).getDay();
        let nextStartDay = startDay - 1 ;


        //本月有多少天 可以用上個月的0 來表示這個月的最後一天
        let nDays = new Date(year, month, 0).getDate();


        let numRow = 0;  //到達7的時候創建tr
        let i;        //日期
        let html = '';

        html += '<tbody>';
        html += '<tr class="days">';


        //月曆開頭
        for (i = 0; i < startDay; i++) {
	        html += '<td class="day disabled"><div class="day_div"><span class="num"></span></div></td>';
	        numRow++;
    	}

    	//本月日期
    	for (var j = 1; j <= nDays; j++) {
			html += '<td class="day"><div class="day_div"><span class="num">'+ j +'</span></div></td>';
            numRow++;
        if (numRow == 7) {  //如果已經到一行（一週）了，建造新的tr
            numRow = 0;
            html += '</tr><tr class="days">';
        	}
        }

        //本月結尾
        let lastDay = startDay + nDays ;
        for (i = lastDay; i < 42; i++) {
	        html += '<td class="day disabled"><div class="day_div"><span class="num"></span></div></td>';
	        numRow++;
        if (numRow == 7) {  //如果已經到一行（一週）了，建造新的tr
            numRow = 0;
            html += '</tr><tr class="days">';
            }
    	}

    	$('.calendars_tableWrap').append(''+ html +'');
	}

	onClickMonth () {
		let self = this;
		let $tab_span = $('.tab span') ;
		$tab_span.on('click',function(){
			$tab_span.removeClass('tab_active');
			$(this).addClass('tab_active');
		// self.creatCalendar();
		});
	}

	onClickNext () {
		$('.next').on('click',function(){
			$('.ntb_tab').css('left','195px');
		});
	}

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };