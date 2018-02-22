const ModuleName = 'dateTab';
const ModuleDefaults =  {

};
const ModuleReturns = [];

class Module {
	constructor ( ele, options ) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
		this.self = this ;
		this.$this = this.$ele ;
	}



	init () {
		$('.dateTab').append('<div class="changList col-md-12"><a href="javascript:;">'+
								'<p>切換列表顯示</p>'+
								'<p style="display:none;">切換月曆顯示</p>'+
								'</a></div>');

		$('.calendar').append('<div class="calendars_tabWrap">'+
								'<a href="javascript:;" class="prev"></a>'+
								'<ul class="ntb_tab"></ul>'+
								'<a href="javascript:;" class="next"></a>'+
							  '</div>');
		this.self.creatMonth();	
		this.self.ajaxGetJson();
		this.self.onClickMonth();
		this.self.onClickNext();
		this.self.onClickPrev();
		this.self.onClickChang();
	}






	ajaxGetJson () {
		let self = this ;
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
		
		this.$this.find('.calendars_tabWrap').append(
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
    	this.$this.find('.calendars_wrap').append('<div class="calendars_list_wrap">'+
    												'<ul id="calendarList" class="calendarList" style="min-height: 496px;"></ul>'+
														'</div></tbody></table>'+
														'<div class="listPage_wrap">'+
    														'<div class="listPage_box">'+
    														'<div class="list_prev"><a href="javascript:;">«上一頁</a></div>'+
    														'<div class="current_page"></div>'+
    														'<div class="list_next"><a href="javascript:;">下一頁»</a></div>'+
    														'</div>'+
    													'</div>'+
    												'</div>');
	}


	creatMonth () {
		let initYearMonth = this.option.initYearMonth ;
		let $ntb_tab = this.$this.find('.ntb_tab') ;
		let html = '';
		let i;
		for ( i = 0 ; i <= 3 ; i++ ) {
			let nextMonth = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
			html += '<li class="tab"><a href="#"><span>'+ nextMonth +'</span></a></li>'
		}
		$ntb_tab.append(html);
		this.$this.find(('.tab') + ':first-child a span').addClass('tab_active');

		this.self.creatWeek();
	}



	//正規表達式 增加逗號
	addCommas (val) {
		return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	}



	creatCalendar (dataSource) {
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
		// $this.find('.calendars_tableWrap').append('</tbody></table></div>');



    	let dataOfDate = dataSource.length;

            for (i=0; i<dataOfDate; i++){
                let $day = this.$this.find('.day');
                let dataYear = dataSource[i].date.substring(0,4);
                let dataMonth = dataSource[i].date.substring(5,7);
                let dataDay = dataSource[i].date.substring(8,10);
                let data_date = parseInt(dataYear + dataMonth + dataDay);

                // console.log(data_date);

               
                if($day.hasClass(data_date)){

                	// 資料內值為0  顯示0 
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
	              	//如果可賣、團位 數量為0 顯示undefined 強制轉為0
	              	// if( dataSource[i].availableVancancy === undefined ){
	              	// 	dataSource[i].availableVancancy = 0 ;
	              	// }else if( dataSource[i].totalVacnacy === undefined ){
	              	// 	dataSource[i].totalVacnacy = 0  ;
	              	// }

	              	let guaranteed = "<span class='guaranteed'>" + dataSource[i].guaranteed + '</span>'
                	let status = "<span class='status'>" + dataSource[i].status + '</span>';
                	let available = "<span class='availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy  + '</span>';
                	let total = "<span class='totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy  + '</span>';
                	let price = "<span class='price'>" + '$' + this.self.addCommas(dataSource[i].price)  + '起' + '</span>';
            

                	if(dataSource[i].guaranteed === true){
                		$('.'+data_date+'').children().append( guaranteed );
                		$('.guaranteed').text('保證出團');
                	}
                	

                	$('.'+data_date+'').append(status + available + total + price);


                	//如果資料內其中一筆 是undefined 就刪除所有資料
                	if( dataSource[i].guaranteed === undefined || dataSource[i].date === undefined || dataSource[i].price === undefined || dataSource[i].totalVacnacy === undefined || dataSource[i].status === undefined ){
                		$('.'+data_date+'>'+'.day_div'+'>'+'span:nth-child(2)').remove();
                		$('.'+data_date+'>'+'span').remove();
                	}



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


    	
    	for (let j = 1; j <= nDays; j++) {
            	
    		if( month < 10 && j < 10 ){
				html += '<li class="list_day hideData ' + year +'0'+ month + '0' +j +'"><div class="list_day_div"><span class="list_day_num">'+j+'</span>'
				'</div></li>';
			}else if( month < 10 ){
				html += '<li class="list_day hideData ' + year +'0'+ month + j +'"><div class="list_day_div"><span class="list_day_num">'+j+'</span>'
				'</div></li>';
			}else if( j < 10 ){
				html += '<li class="list_day hideData ' + year + month + '0' + j +'"><div class="list_day_div"><span class="list_day_num">'+j+'</span>'
				'</div></li>';
			}else{
				html += '<li class="list_day hideData ' + year + month + j +'"><div class="list_day_div"><span class="list_day_num">'+j+'</span>'
				'</div></li>';
			}
            numRow++;

        }

    	
    	document.getElementById("calendarList").innerHTML = html;


    	let dataOfDate = dataSource.length;

            for (i=0; i<dataOfDate; i++){
                let $list_day = this.$this.find('.list_day');
                let dataYear = dataSource[i].date.substring(0,4);
                let dataMonth = dataSource[i].date.substring(5,7);
                let dataDay = dataSource[i].date.substring(8,10);
                let data_date = parseInt(dataYear + dataMonth + dataDay);
               

             
                if($('.list_day').hasClass(data_date)){

                	
                	let available = "<div class='secDiv_wrap'><div class='secDiv'><span class='list_availableVancancy'>" + '可賣：' + dataSource[i].availableVancancy  + '</span>';
                	let total = "<span class='list_totalVacnacy'>" + '團位：' + dataSource[i].totalVacnacy  + '</span></div>';
                	let guaranteed = "<div class='secDiv_guaranteed'><span class='ic-ln list_guaranteed'>"  + dataSource[i].guaranteed  + '</span></div></div>';
                	let status = "<div class='thirdDiv'><span class='list_status'>" + dataSource[i].status + '</span>';
                	let price = "<span class='list_price'>" + '$' + this.self.addCommas(dataSource[i].price)  + '起' + '</span></div>';

                	$('.list_day'+'.'+data_date+'').append( available + total );

                	if( dataSource[i].guaranteed === true ){
                		$('.'+data_date+'>'+'.secDiv_wrap').append(guaranteed);
                		$('.list_guaranteed').text('保證出團');
                	}

            		$('.list_day'+'.'+data_date+'').append( status + price );

                	$('.list_day'+'.'+data_date+'').addClass('hasData').removeClass('hideData');

                	//如果資料內其中一筆 是undefined 就刪除所有資料 除了可賣數量可以為0
                	if( dataSource[i].guaranteed === undefined || dataSource[i].date === undefined || dataSource[i].price === undefined || dataSource[i].totalVacnacy === undefined || dataSource[i].status === undefined ){
                		$('.calendarList'+'>'+'.'+data_date+'').remove();
                	}


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

                //增加星期幾
                //要輸入 , 串起來 才能印出時間
                let list_days = new Date(dataYear + ',' + dataMonth + ',' + dataDay); //所有資料的日期
                let list_day_ch = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                let list_day = new Date(list_days).getDay() ; //只抓取 星期幾
                let list_week = '<span class="list_week">' + list_day_ch[list_day] + '</span>'; //對應到的日期 轉成中文

		        // console.log(list_week)
		        $('.'+data_date+ '>' + '.list_day_div' ).append(list_week);

            }//for迴圈
            $('.hideData').remove();
            this.self.creatPagination();
	}




	//	資料只有一頁的話 按下一頁還是會增加
	creatPagination () {
		var pageSize=8;      //每頁顯示數據條數
		var currentPage=1;   //當前頁數
		var totalSize=$(".calendarList .list_day").length; //獲取總數據
		var totalPage=Math.ceil(totalSize/pageSize); //計算總頁數 ceil無條件進位
		$(".calendarList .list_day:gt(7)").hide(); //設置首頁顯示8條數據
		$(".total").text(totalPage);  //設置總頁數
		$(".current_page").text(currentPage+'/'+totalPage); //設置當前頁數
		// console.log(totalSize)

		//實現下一頁
		$(".list_next").click(function(){
			if(currentPage == totalPage){ //當前頁數==最後一頁，禁止下一頁
				   return false;
				}else{//不是最後一頁，顯示應該顯示的數據.
				    $(".current_page").text(++currentPage+'/'+totalPage);  //當前頁數先+1
					var start=pageSize*(currentPage-1);
					var end=pageSize*currentPage;
					$.each($('.calendarList .list_day'),function(index,item){
							if(index >=start && index < end){
								$(this).show();
								}
								else{
									$(this).hide();
									}
						});
					
					}
			});
			
			//實現上一頁
		$(".list_prev").click(function(){
			if(currentPage == 1){//當前頁數==1，禁止上一頁
			     return false;
				}else{
					 $(".current_page").text(--currentPage+'/'+totalPage);  //當前頁數先-1
					 var start=pageSize*(currentPage-1);
					 var end=pageSize*currentPage;
					 $.each($('.calendarList .list_day'),function(index,item){
						   if(index >=start && index < end){
								$(this).show();
								}
								else{
									$(this).hide();
									}
						 });
					}
			
			});
	}


	onClickMonth () {
		let self = this;
		let $this = this.$ele;
		let $tab = this.$this.find('.tab');
		let srcollWidth = this.$this.find('.tab').width();


		$tab.on('click',function(){
			$('.tab span').removeClass('tab_active');
			$(this).children().children().addClass('tab_active');
			self.ajaxGetJson();
		});

	}

	onClickPrev () {
		let self = this;
		let $this = this.$ele;
		$('.prev').on('click',function(){
			$('.ntb_tab li').css({
				"right":"0%"
			});

			$this.find('.tab_active').parent().parent().prev().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().next().children().children().removeClass('tab_active');
			self.ajaxGetJson();
		});
	}


	onClickNext () {
		let self = this;
		let $this = this.$ele;
		$('.next').on('click',function(){
			$('.ntb_tab li').css({
				"right":"33.3%"
			});

			$this.find('.tab_active').parent().parent().next().children().children().addClass('tab_active');
			$this.find('.tab_active').parent().parent().prev().children().children().removeClass('tab_active');
			self.ajaxGetJson();
		});
	}

	//切換列表 月曆顯示
	switch () {
		$('.changList p').toggle(0,"d-no");
		this.$this.find('.calendars_tableWrap').toggle(0,'.d-no');
		this.$this.find('.calendarList').toggle(0,'.d-no');
		this.$this.find('.listPage_wrap').toggle(0,'.d-no');
	}

	onClickChang () {
		let self = this;
		$('.changList').on('click',function(){
			self.switch();
		});
	}



	// 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
	inputData (inputData) {
		let self = this ;
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
			//排序之前 合併陣列
			var dataSource = inputData.concat(dataSource);
			console.log(dataSource)
			//資料日期排序 由小到大
			dataSource = dataSource.sort(function(a,b){ 
				return a.date > b.date ? 1 : -1;
			})
		self.creatCalendar(dataSource);
		self.creatCalendarList(dataSource);
		});	
	}

	// 重設資料時，月曆、tab重新產出
	resetData (resetData) {
		let self = this ;
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
			//排序之前 合併陣列
			var dataSource = resetData.concat(dataSource);
			//資料日期排序 由小到大
			dataSource = dataSource.sort(function(a,b){ 
				return a.date > b.date ? 1 : -1;
			})
		self.creatCalendar(dataSource);
		self.creatCalendarList(dataSource);
		});	
	}

	// destroy calendar，destroy時連class new出來的實例物件也要刪除
	destroy () {
		$('.calendar').remove();
		$('.changList').remove();
	}

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };