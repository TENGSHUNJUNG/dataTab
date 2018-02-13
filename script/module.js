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
		}).done(function(dataSource) {

			//資料日期重複篩選 楷翔提供!!!
			var lookup = {};
			var items = dataSource;
			var dataSource = [];
		
			for (var item, i = 0; item = items[i++];) {
			  let date = item.date;

			  if (!(date in lookup)) {
			    lookup[date] = 1;
			    dataSource.push(item);
			  }
			}
			//資料日期排序 由小到大
			dataSource = dataSource.sort(function(a,b){ 
				return a.date > b.date ? 1 : -1;
			})
		self.creatCalendar(dataSource);
		});

		//先做切換列表 整理資料等切換列表做完做
		//切換列表 複製一份TABLE過去 換成ul li
     //            	var temp = dataSource[i].status;
     //            	delete(dataSource[i].status)
                	
     //            	j.nick=temp;
					// console.log(j)
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
			let nextMonth = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
			html += '<li class="tab"><a href="#"><span>'+ nextMonth +'</span></a></li>'
		}
		$ntb_tab.append(html);
		$('.tab:first-child a span').addClass('tab_active');
	}




	creatCalendar (dataSource) {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		let initYearMonth = this.option.initYearMonth ;
		let today = new Date();

		//抓取active選擇到的年、月份
        let year = parseInt($(".tab_active").text().slice(0, 4));
        let month = parseInt($(".tab_active").text().slice(4, 8));
        // console.log(year)
        // console.log(month)

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



    	let dataOfDate = dataSource.length;

            for (i=0; i<dataOfDate; i++){
                let self = this;
                let $this = this.$ele;
                let $day = $this.find('.day');
                let dataYear = dataSource[i].date.substring(0,4);
                let dataMonth = dataSource[i].date.substring(5,7);
                let dataDay = dataSource[i].date.substring(8,10);
                let data_date = parseInt(dataYear + dataMonth + dataDay);

                // console.log(data_date);

                //不同資料 都要可以work 尚未完成!!!!!
                if($day.hasClass(data_date)){

                	let status = "<span class='status'>" + dataSource[i].status + '</span>';
                	let available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy  + '</span>';
                	let total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy  + '</span>';
                	let price = "<span class='price'>" + '$' + dataSource[i].price  + '起' + '</span>';
            



                	$('.'+data_date+'').append(status + available + total + price);

                	//不同狀態 產生不同顏色
                	if(dataSource[i].status === '報名'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#24a07c');
                	}else if(dataSource[i].status === '預定'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#24a07c');
                	}else if(dataSource[i].status === '額滿'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#ff7800');
                	}else if(dataSource[i].status === '截止'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#ff7800');
                	}else if(dataSource[i].status === '後補'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#24a07c');
                	}else if(dataSource[i].status === '關團'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#ff7800');
                	};



                	//點擊含有資料的td
                	$day.on('click',function(){
                		if($(this).children().hasClass('price')){
	                		$day.removeClass('hasDataActive');
	                		$(this).addClass('hasDataActive');
                	}
                	});
                }

            }//for迴圈


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
			// $this.find('.tab').remove();

			
			// self.creatMonth();
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