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


		self.creatWeek();
		self.creatMonth();
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
		// self.creatWeek();
		// self.creatMonth();
		self.creatCalendar(dataSort);

		});

		// self.creatCalendar();
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




	creatMonth () {
		let self = this ;
		let $this = this.$ele ;
		let initYearMonth = this.option.initYearMonth ;
		let $ntb_tab = $this.find('.ntb_tab') ;
		let html = '';
		let i;
		for ( i = 0 ; i <= 2 ; i++ ) {
			let nextMonth = moment().add(i, 'months').format("YYYY MMM");
			html += '<li class="tab"><a href="#"><span>'+ nextMonth +'</span></a></li>'
		}
		$ntb_tab.append(html);
		$('.tab:first-child a span').addClass('tab_active');
	}



	creatCalendar (dataSort) {

		let initYearMonth = this.option.initYearMonth ;
		let today = new Date();

		//抓取active選擇到的年、月份
        let year = parseInt($(".tab_active").text().slice(0, 4));
        let month = parseInt($(".tab_active").text().slice(4, 8));
        console.log(year)
        console.log(month)

        let day = today.getDate();

        //本月的第一天是星期幾(距星期日的天數)
        let startDay = new Date(year, month - 1, 1).getDay();
        let nextStartDay = startDay - 1 ;

        //本月有多少天 可以用上個月的0 來表示這個月的最後一天
        let nDays = new Date(year, month, 0).getDate();

        let numRow = 0;  //到達7的時候創建tr
        let i;        //日期
        let html = '';


        html += '<tbody class="tbody">';
        html += '<tr class="days">';


        //月曆開頭
        for (i = 0; i < startDay; i++) {
	        html += '<td class="day disabled"></td>';
	        numRow++;
    	}

    	//本月日期
    	for (let j = 1; j <= nDays; j++) {
    		if( month < 10 && j < 10 ){
				html += '<td class="day ' + year +'0'+ month + '0' +j +'"><div class="day_div"><span class="num">'+ j +'</span></div></td>';
			}else if( month < 10 ){
				html += '<td class="day ' + year +'0'+ month + j +'"><div class="day_div"><span class="num">'+ j +'</span></div></td>';
			}else if( j < 10 ){
				html += '<td class="day ' + year + month + '0' + j +'"><div class="day_div"><span class="num">'+ j +'</span></div></td>';
			}else{
				html += '<td class="day ' + year + month + j +'"><div class="day_div"><span class="num">'+ j +'</span></div></td>';
			}
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


    	let dataOfDate = dataSort.length;

            for (i=0; i<dataOfDate; i++){
                let self = this;
                let $this = this.$ele;
                let dataYear = dataSort[i].date.substring(0,4);
                let dataMonth = dataSort[i].date.substring(5,7);
                let dataDay = dataSort[i].date.substring(8,10);
                let data_date = parseInt(dataYear + dataMonth + dataDay);

                console.log(data_date);

                //price的class還沒設定 明天接著做完!!!!!!!!
                if($('.day').hasClass(data_date)){
                	let price = "<span class='price'>"+"$"+dataSort[i].price+"起"+"</span>";
                	$('.'+data_date+'').append(price);
                }

            }


	}



	onClickMonth () {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		let initYearMonth = this.option.initYearMonth ;
		let $tab = $this.find('.tab');
		let srcollWidth = $this.find('.tab').width();


		$tab.on('click',function(){
			$this.find('.tbody').remove();
			$('.tab span').removeClass('tab_active');
			$(this).children().children().addClass('tab_active');
			self.ajaxGetJson();
		});




		//左邊箭頭
		$('.prev').on('click',function(){
			$this.find('.tbody').remove();
			
			$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
			self.ajaxGetJson();
			
		});





		//右邊箭頭
		$('.next').on('click',function(){
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

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };