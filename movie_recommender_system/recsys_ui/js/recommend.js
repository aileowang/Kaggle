
/*http://www.technologyx.cn/systemUser/login?username=noone&password=123
*/
/**
 * @author Dong Changqing
 * 定义全局参数
 */
var start = 0;
var pagesize = 20;
var pages;
var current = 1;
$(function () {
	
	recommend();
	window.roll_bottom_event = function() {
		appendData();
	}
	
});

function recommend() {
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/movie/recbyuser',
		dataType:'jsonp',
		data:{
			'size':50,
			'start':start,
			'pagesize':pagesize,
			/*'username':'noone',
			'password':'123'*/
		},
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		error: function(XmlHttpRequest,textStatus,errorThrown){
		},
		success: function(msg){	
			console.log(JSON.stringify(msg));
			var records = msg.data;
			if(records == null || records.length == 0) {
				appendData();
			} else {
				if(records.length > 24){
					records_tmp = []
					for(var i = 0; i < 24; ++ i){
						records_tmp.push(records[i]);
					}
					records = records_tmp;
				}	
				appendHTML(records, true);
				appendData();
			}
			
			/*for(var i = 0; i < records.length; i++) {
				
			}*/
		}		
	});
}
/**
 * @author Dong Changqing
 * 加载数据并拼接到最底部
 */
function appendData() {
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/movie/get',
		dataType:'jsonp',
		data:{
			'start':start,
			'pagesize':pagesize,
			/*'username':'noone',
			'password':'123'*/
		},
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		error: function(XmlHttpRequest,textStatus,errorThrown){
		},
		success: function(msg){	
			/*msg.*/
			current = current + 1;
			start = start + pagesize;
			var records = msg.data.records;
			appendHTML(records, false);
			/*for(var i = 0; i < records.length; i++) {
				
			}*/
		}		
	});
}

/**
 * @author Dong Changqing
 * 拼接数据到最底部
 */
function appendHTML(records, is_rec) {
	console.log(records);
	var conter = document.querySelector('#fh5co-board');
	var hts=[];
   /* for(var i = 0; i < records.length; i++ ){*/
   for(var i = 0; i < records.length; i++ ){
		var movid_id = undefined
		var m_name = records[i].name

		if(is_rec){
			movid_id = records[i].movieid
			m_name = m_name+'(推荐)'
		}else{
			movid_id = records[i].id
		}
        hts[i]=$('<div class="item" onclick="javascript:toOneMovie(\'' + movid_id + '\')" >' +
        			'<div class="animate-box" >' +
        				'<a href="javascript:void(0)"   class=" fh5co-board-img" title="Lorem">' +
        					'<img src="' + records[i].img + '" alt="Free HTML5 Bootstrap template" />' +
        				'</a>' +
        			'</div>' +
        			'<div class="fh5co-desc" style="text-align:center; width:100%;">' +
        			m_name + '   <p style="color:red;display:inline;">' + records[i].rat + '</p>' +
        			'</div>' + 
        		'</div>')[0];
    }
   /*	console.log(hts);*/
    salvattore['append_elements'](conter, hts);
    magnifPopup();
	offCanvass();
	mobileMenuOutsideClick();
	animateBoxWayPoint();
   /* $("#fh5co-board").append('<div class="item">' +
			'<div class="animate-box">' +
			'<a href="images/img_' + (i + 1) + '.jpg" class="image-popup fh5co-board-img" title="Lorem">' +
				'<img src="images/img_' + (i + 1) + '.jpg" alt="Free HTML5 Bootstrap template" />' +
			'</a>' +
		'</div>' +
		'<div class="fh5co-desc">一个魔幻效果的摄影网站模板<br>凡科建站 [科技]</div>' + 
	'</div>');
    $("img").show();*/

	/*console.log(JSON.stringify(record));
	var html = '<div class="item">' +
	'<div class="animate-box bounceIn animated">' + 
		'<a href="images/img_1.jpg" class="image-popup fh5co-board-img" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, eos?"><img src="images/img_1.jpg" alt="Free HTML5 Bootstrap template"></a>' + 
	'</div>' + 
	'<div class="fh5co-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, eos?</div>' +
	'</div>';
	$("#fh5co-board").append(html);
	$("#fh5co-board").show();
	console.log($("#fh5co-board").html());*/
}


/**
 * @author Dong Changqing
 * 设置cookie
 */
function setcookie(name, value) { 

    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";

}

/**
 * @author Dong Changqing
 * 跳转页面
 */
function toOneMovie(id) {
	setcookie("OneMovieID", id);
	window.location.href = "oneMovie.html";
}


