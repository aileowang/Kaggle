
/*http://www.technologyx.cn/systemUser/login?username=noone&password=123
*/
/**
 * @author Dong Changqing
 * 定义全局参数
 */
var pagesize = 20;
var pages;
var current = 1;
var movieid;
$(function () {
	
	movieid = getCookie("OneMovieID");
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/movie/fetchone?movieid=' + movieid,
		dataType:'jsonp',
		data:{},
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		error: function(XmlHttpRequest,textStatus,errorThrown){
			alert("error1");
		},
		success: function(msg){
			console.log(msg.data);
			$("#movie_img").prop("src", msg.data.img);
			$("#movie_name").text(msg.data.name);
			$("#movie_director").text(msg.data.director);
			$("#movie_actors").text(msg.data.actors);
			$("#movie_rat").text(msg.data.rat);
			$("#movie_type").text(msg.data.type);
			$("#movie_region").text(msg.data.region);
			$("#movie_description").text(msg.data.description);
			loadComment();
		}		
	});
});

/**
 * @author Dong Changqing
 * 从cookie中取数据
 */
function getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}

/**
 * @author Dong Changqing
 * 加载评论
 */
function loadComment() {
	
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/comment/getbymovieid',
		dataType:'jsonp',
		data:{
			"movieid":movieid,
			"n":current,
			"pagesize":pagesize,
			/*'username':'noone',
			'password':'123'*/
		},
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		error: function(XmlHttpRequest,textStatus,errorThrown){
			alert("error1");
		},
		success: function(msg){	
			current = current + 1;
			pages = msg.data.pages;
			records = msg.data.records;
			appendToComment(records);
			if(pages != null && current >= pages) {
				$("#more_comment_button").hide();
				$("#no_more_comment").show();
			}
		}		
	});
}

/**
 * @author Dong Changqing
 * 向页面拼接评论
 */
function appendToComment(records) {
	var html = "";
	for(var i = 0; i < records.length; i++) {
		html = html + '<div class="row">'
						+	'<div class="col-md-8" style="text-align: left;">'
						+	records[i].creator + '：' + records[i].rating + '分' 
						+	'	</div>'
						+	'	<div class="col-md-4" style="text-align:right;">'
						+	records[i].addTime
						+	'	</div>'
						+	'	<div class="col-md-12">'
						+	records[i].content
						+	'	</div>'
						+	'</div>'
						+	'<hr/>';
	}
	$("#comment").append(html);
}
/**
 * @author Dong Changqing
 * 开始写评论
 */
function writeComment() {
	var login_username = getCookie("login_username");
	if(login_username == null || login_username == "") {
		window.location.href = "login.html";
	} else {
		console.log(login_username);
		$("#write_comment_div").show();
	}
	
}
/**
 * @author Dong Changqing
 * 提交评论信息
 */
function commitComment() {
	var write_comment_comment = $("#write_comment_comment").val();
	var write_comment_rating = $("input[name='write_comment_rating']:checked").val();
	/*jQuery.post('http://www.technologyx.cn/comment/add',
			{
				"movieid":movieid,
				"rating":write_comment_rating,
				"content":write_comment_comment,
			},function(msg){	
				console.log(msg);
				$("#write_comment_div").hide();
			},'jsonp'
	);*/
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/comment/add',
		contentType: 'application/json',
		dataType:'jsonp',
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		data:{
			"movieid":movieid,
			"rating":write_comment_rating,
			"content":write_comment_comment,
		},
		
		error: function(XmlHttpRequest,textStatus,errorThrown){
			alert("未知错误！");
		},
		success: function(msg){	
			
			$("#write_comment_div").hide();
		}		
	});
	
}

