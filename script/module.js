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
		$('.dateTab').append('<div class="changList col-md-12"><a href="#">'+
								'<p>切換列表顯示</p>'+
								'<p style="display:none;">切換月曆顯示</p>'+
								'</a></div>');

		$('.calendar').append('<div class="calendars_tabWrap">'+
								'<a href="#" class="prev"></a>'+
								'<ul class="ntb_tab"></ul>'+
								'<a href="#" class="next"></a>'+
							  '</div>');
		self.creatMonth();	
		self.ajaxGetJson();

		self.onClickMonth();
		self.onClickChang();
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

			  var date = item.date ;


			  //不同資料的key 刪除再新增
			  var statusKey = (item.status||item.state) ;
              delete(item.status||item.state) ;
              item.status = statusKey ;	
              

			  var availableVancancyKey = (item.availableVancancy||item.onsell) ;
              delete(item.availableVancancy||item.onsell) ;
              item.availableVancancy = availableVancancyKey ;	


              var totalVacnacyKey = (item.totalVacnacy||item.total) ;
              delete(item.totalVacnacy||item.total) ;
              item.totalVacnacy = totalVacnacyKey ;


              var guaranteedKey = (item.guaranteed || item.certain) ;
              delete(item.guaranteed || item.certain) ;
              item.guaranteed = guaranteedKey ;


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
		self.creatCalendarList(dataSource);
		});

	}




	creatWeek () {
		let self = this ;
		let $this = this.$ele;
		let options = this.option;
		
		$this.find('.calendars_tabWrap').append(
										'<div class="calendars_wrap">'+
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
												'</tr>'+'</thead>'+
												'<tbody id="tbody" class="tbody">');
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
		$this.find(('.tab') + ':first-child a span').addClass('tab_active');

		self.creatWeek();
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

    	
    	
    	document.getElementById("tbody").innerHTML = html;
		$this.find('.calendars_tableWrap').append('</tbody></table></div>');



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

               
                if($day.hasClass(data_date)){

                	//資料內值為0  顯示0 列表版可以不用再寫一次
	              if( dataSource[i].guaranteed === undefined && dataSource[i].totalVacnacy === undefined ){
	              		dataSource[i].totalVacnacy = 0  ;
	              		dataSource[i].guaranteed = false ;
	              }else if( dataSource[i].guaranteed === undefined && dataSource[i].availableVancancy === undefined ){
	              		dataSource[i].availableVancancy = 0  ;
	              		dataSource[i].guaranteed = false ;
	              }else if(dataSource[i].availableVancancy === undefined ){
	              		dataSource[i].availableVancancy = 0  ;
	              }else if(dataSource[i].totalVacnacy === undefined ){
	              		dataSource[i].totalVacnacy = 0  ;
	              }else if(dataSource[i].guaranteed === undefined ){
	              		dataSource[i].guaranteed = false ;
	              };


	              	let guaranteed = "<span class='guaranteed'>" + dataSource[i].guaranteed + '</span>'
                	let status = "<span class='status'>" + dataSource[i].status + '</span>';
                	let available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy  + '</span>';
                	let total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy  + '</span>';
                	let price = "<span class='price'>" + '$' + dataSource[i].price  + '起' + '</span>';
            



                	$('.'+data_date+'').children().append( guaranteed );
                	$('.'+data_date+'').append(status + available + total + price);

                	//不同狀態 產生不同顏色
                	if(dataSource[i].status === '報名' || dataSource[i].status === '預定' || dataSource[i].status === '後補'){
                		$('.'+data_date+'>'+'span:nth-child(2)').css('color','#24a07c');
                	}else if(dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '關團'){
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


	creatCalendarList (dataSource) {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		let initYearMonth = this.option.initYearMonth ;
		let today = new Date();

		//抓取active選擇到的年、月份
        let year = parseInt($(".tab_active").text().slice(0, 4));
        let month = parseInt($(".tab_active").text().slice(4, 8));


        let day = today.getDate();


        //本月有多少天 可以用上個月的0 來表示這個月的最後一天
        let nDays = new Date(year, month, 0).getDate();

        let numRow = 0;  //到達7的時候創建tr
        let i;        //日期
        let html = '';

        $this.find('.calendars_wrap').append('<div id="calendars_wrap" class="calendarList"><ul class="calendars_daysWrap">');


    	//本月日期
    	for (let j = 1; j <= nDays; j++) {
    		if( month < 10 && j < 10 ){
				html += '<li class="list_day hideData ' + year +'0'+ month + '0' +j +'"><div class="list_day_div">'+j+
				'<span></span></div></li>';
			}else if( month < 10 ){
				html += '<li class="list_day hideData ' + year +'0'+ month + j +'"><div class="list_day_div">'+j+
				'<span></span></div></li>';
			}else if( j < 10 ){
				html += '<li class="list_day hideData ' + year + month + '0' + j +'"><div class="list_day_div">'+j+
				'<span></span></div></li>';
			}else{
				html += '<li class="list_day hideData ' + year + month + j +'"><div class="list_day_div">'+j+
				'<span></span></div></li>';
			}
            numRow++;

        }


    	$('.calendars_wrap').append('</ul></div></div>');
    	document.getElementById("calendars_wrap").innerHTML = html;


    	let dataOfDate = dataSource.length;

            for (i=0; i<dataOfDate; i++){
                let self = this;
                let $this = this.$ele;
                let $list_day = $this.find('.list_day');
                let dataYear = dataSource[i].date.substring(0,4);
                let dataMonth = dataSource[i].date.substring(5,7);
                let dataDay = dataSource[i].date.substring(8,10);
                let data_date = parseInt(dataYear + dataMonth + dataDay);

               

             
                if($('.list_day').hasClass(data_date)){

                	
                	let available = "<div class='secDiv_wrap'><div class='secDiv'><span class='list_availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy  + '</span>';
                	let total = "<span class='list_totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy  + '</span></div>';
                	let guaranteed = "<div class='secDiv_guaranteed'><span class='ic-ln list_guaranteed'>" + '保證出團：' + dataSource[i].guaranteed  + '</span></div></div>';
                	let status = "<div class='thirdDiv'><span class='list_status'>" + dataSource[i].status + '</span>';
                	let price = "<span class='list_price'>" + '$' + dataSource[i].price  + '起' + '</span></div>';
                	$('.list_day'+'.'+data_date+'').append( available + total + guaranteed + status + price);
            		


                	$('.list_day'+'.'+data_date+'').addClass('hasData').removeClass('hideData');


                	


                	//不同狀態 產生不同顏色
                	if(dataSource[i].status === '報名' || dataSource[i].status === '預定' || dataSource[i].status === '後補' ){
                		$('.'+data_date+'>'+'.thirdDiv'+'>'+'span:nth-child(1)').css('color','#24a07c');
                	}else if(dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '關團'){
                		$('.'+data_date+'>'+'.thirdDiv'+'>'+'span:nth-child(1)').css('color','#ff7800');
                	};



                	//點擊含有資料的td
                	$list_day.on('click',function(){
	                		$list_day.removeClass('list_hasDataActive');
	                		$(this).addClass('list_hasDataActive');
                	});

                }//if
            }//for迴圈
            $('.hideData').remove();
	}




	onClickMonth () {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		let initYearMonth = this.option.initYearMonth ;
		let $tab = $this.find('.tab');
		let srcollWidth = $this.find('.tab').width();



		$tab.on('click',function(){
			$('.tab span').removeClass('tab_active');
			$(this).children().children().addClass('tab_active');
			self.ajaxGetJson();
		});




		//左邊箭頭
		$('.prev').on('click',function(){

			$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
			self.ajaxGetJson();
			
		});





		//右邊箭頭
		$('.next').on('click',function(){
			
			
			$this.find('.tab_active').parent().parent().next().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().prev().children().children().removeClass('tab_active');
			self.ajaxGetJson();


		});



	}

	onClickChang () {
		let self = this;
		let $this = this.$ele;
		let options = this.option;
		$('.changList').on('click',function(){
			$('.changList p').toggle(0,"d-no");
			$this.find('.calendars_tableWrap').toggle(0,'.d-no');
			$this.find('.calendarList').toggle(0,'.d-no');
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