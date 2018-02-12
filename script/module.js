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


		
		self.ajaxGetJson();
		self.onClickMonth();
	}






	ajaxGetJson () {
		let self = this ;
		let $this = this.$ele;


		$.ajax({
			method: 'GET',
			url: './json/data1.json',
			dataType: 'json'
		}).done(function(dataSort) {
			dataSort = dataSort.sort(function(a,b){ 
				return a.date > b.date ? 1 : -1;
			})
		});

		self.creatWeek();
		self.creatMonth();
		self.creatCalendar();
	}




	creatWeek () {
		$('.calendar').append('<div class="calendars_tabWrap">');
		$('.calendars_tabWrap').append('<a href="#" class="prev on"></a>'+
										'<ul class="ntb_tab"></ul>'+
										'<a href="#" class="next on"></a></div>'+
										'<table class="calendars_tableWrap">'+
											'<thead>'+
												'<tr class="calendars_weeksWrap">'+
													'<th>星期日</th>'+
													'<th>星期一</th>'+
													'<th>星期二</th>'+
													'<th>星期三</th>'+
													'<th>星期四</th>'+
													'<th>星期五</th>'+
													'<th>星期六</th>'+
												'</tr>'+'</thead>');
	}




   //產生月份 跟 日期 尚未同步!!!!!!
	creatMonth () {
		let self = this ;
		let $this = this.$ele ;
		let initYearMonth = this.option.initYearMonth ;
		let $ntb_tab = $this.find('.ntb_tab') ;
		let html = '';
		let year = new Date(initYearMonth).getFullYear();
		let month = new Date(initYearMonth).getMonth()+1;
		let i;
		for ( i = 0 ; i <= 2 ; i++ ) {
			let nextMonth = moment().add(i, 'months').format("YYYY MMM");
			console.log(nextMonth)
			html += '<li class="tab"><a href="#"><span>'+ nextMonth +'</span></a></li>'
		}
		$ntb_tab.append(html);
	}



	creatCalendar () {
		let initYearMonth = this.option.initYearMonth ;
		let today = new Date();
        let year = new Date(initYearMonth).getFullYear();
        let month = new Date(initYearMonth).getMonth()+1;

        let day = today.getDate();

        //本月的第一天是星期幾(距星期日的天數)
        let startDay = new Date(year, month - 1, 1).getDay();
        let nextStartDay = startDay - 1 ;

        //本月有多少天 可以用上個月的0 來表示這個月的最後一天
        let nDays = new Date(year, month, 0).getDate();

        let numRow = 0;  //到達7的時候創建tr
        let i;        //日期
        let html = '';

        $('.tab:first-child a span').addClass('tab_active');

        html += '<tbody class="tbody">';
        html += '<tr class="days">';


        //月曆開頭
        for (i = 0; i < startDay; i++) {
	        html += '<td class="day disabled"></td>';
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
	        html += '<td class="day disabled"></td>';
	        numRow++;
        if (numRow == 7) {  //如果已經到一行（一週）了，建造新的tr
            numRow = 0;
            html += '</tr><tr class="days">';
            }
    	}

    	$('.calendars_tableWrap').append(html + '</tbody></table></div>');
	}











	onClickMonth () {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		let initYearMonth = this.option.initYearMonth ;
		let $tab = $this.find('.tab');
		let srcollWidth = $this.find('.tab').width();
		let num = 0 ;


		$tab.on('click',function(){
			num = $(this).index();
			$('.tab span').removeClass('tab_active');
			$(this).children().children().addClass('tab_active');
		// self.creatCalendar();
		});




		//左邊箭頭
		$('.prev').on('click',function(){
			// $('.tab span').removeClass('tab_active');
			$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
			// $(this).children().children().addClass('tab_active');




			// if(num > 2){
   //      		num = num - 2;
			// $('.tab').animate({
			// 	left: "+="+ srcollWidth +"",
			// },0) ;
			// }
		});

		//右邊箭頭
		$('.next').on('click',function(){
			$this.find('.tbody').remove();
			
			self.creatCalendar();
			$this.find('.tab_active').parent().parent().next().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().prev().children().children().removeClass('tab_active');





			// if(num < 2 ){
   //      		num = num + 2;
   //      		console.log(num)
			// $('.tab').animate({
			// 	left: "-="+ srcollWidth +"",
			// },0) ;
			// }
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

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };