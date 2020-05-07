
/*http://www.technologyx.cn/systemUser/login?username=noone&password=123
*/


/**
 * @author Dong Changqing
 * 登录
 */
function login() {
	var login_username = $("#login_username").val();
	var login_password = $("#login_password").val();
	$.ajax({
		type: 'GET',
		url: 'http://www.technologyx.cn/systemUser/login',
		dataType:'jsonp',
		data:{
			'username':login_username,
			'password':login_password,
			/*'username':'noone',
			'password':'123'*/
		},
		jsonp:'jsonpcallback',
		jsonpCallback:"jsonpcallback",
		error: function(XmlHttpRequest,textStatus,errorThrown){
			$("#input_error").show();
		},
		success: function(msg){
			console.log(login_username);
			setcookie("login_username", login_username);
			window.location.href = "recommend.html";
		}		
	});
}

/**
 * @author Dong Changqing
 * 跳转到注册页
 */
function register() {
	window.location.href = "register.html";
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
