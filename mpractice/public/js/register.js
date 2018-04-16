 	//跳转页面
 	function jump (id) {
			mui.openWindow({
				id: id,
				url: id+'.html'			
			});
		}
	/*正则校验*/
	//用户名失去焦点
	function nickblur(){
		reg=/^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/;//只支持字母数字和中文汉字16位
		if($("#nickname").val()==""||$("#nickname").val()=="请输入用户名"){
			mui.toast("请输入用户名");
		}else if($("#nickname").val().length>10||$("#nickname").val().length<2){
			mui.toast("请输入2到10位字母、数字或中文");
		    $("#nickname").val("");
		}else if(!reg.test($("#nickname").val())){
			mui.toast("不支持字符");
			$("#nickname").val("");
		}else {
			var nickName=$("#nickname").val();
			$.ajax({
				type:"post",
	    		url:getRootPath+"/teacher/selectRepeat?nickname="+nickName,
	    		success:function(result){
	    			if (result.success) {
					   $("#nickname").css("color","black");
	    			}else{
	    				mui.toast("该用户名已被注册");
	    				$("#nickname").val("");
	    				
	    			}
	    		}
	    	});
	    }
	}
	//教师编号失去焦点
	function numblur(){
		reg=/^[0-9]{4}$/;//4位数字编号
		if($("#teacherNum").val()=="" || $("#teacherNum").val()=="请输入4位数的教师编号"){
			mui.toast("请输入4位数的教师编号");
		}else if(!reg.test($("#teacherNum").val())){
			mui.toast("教师编号由4位数组成");
			$("#teacherNum").val("");
			
		} else {
			var teacherNum=$("#teacherNum").val();
			$.ajax({
				type:"post",
	    		url:getRootPath+"/teacher/selectRepeat?teacherNum="+teacherNum,
	    		success:function(result){
	    			if (result.success) {
	    				$("#teacherNum").css("color","black");
	    			}else{
	    				mui.toast("该编号已被注册");
	    				$("#teacherNum").val("");
	    			}
	    		}
	    	});
	    }
	    
	}
	//加载部门
	$(function(){
	   $.ajax({
	   	type:"post",
	   	url:getRootPath+"/teacher/selectDepartments",
	   	success:function(result) {
	   		if(result.success){
	   			if (result["obj"].length>0) {
	   			var html="";
	            for(var i=0;i<result["obj"].length;i++){
	                 html += "<option value= '"+result["obj"][i].id+"'>"+result["obj"][i].dName+"</option>";
	            }
	            $("#departmentId").html('').append(html); 
	   		}
	   		}else{
	   			mui.toast(result.msg);
	   		}
	   	}
	   });
	})
	//邮箱失去焦点
	function emailblur(){
		reg=/@.*\.[a-z]{2,6}/;//验证邮箱正则表达式
	    if ($("#tEmail").val() == "" || $("#tEmail").val() == "请输入您的邮箱") {
	        mui.toast("请输入您的邮箱");
	    } else if (!reg.test($("#tEmail").val())) {
	    	mui.toast("请检查邮箱是否正确");
	    	$("#tEmail").val("");
	       
	    } else {
	    	var tEmail=$("#tEmail").val();
			$.ajax({
				type:"post",
	    		url:getRootPath+"/teacher/selectRepeat?tEmail="+tEmail,
	    		success:function(result){
	    			if (result.success) {
	    				$("#tEmail").css("color","black");
	    			}else{
	    				mui.toast("该邮箱已被注册");
	    				$("#tEmail").val("");
	    			}
	    		}
	    	});
	    }
	}
	//真实姓名失去焦点
	function nameblur(){
		reg=/^[\u4e00-\u9fa5]{2,10}$/;//中文汉字16位
		if($("#tName").val()==""||$("#tName").val()=="请输入真实姓名"){
			mui.toast("请输入真实姓名");
		}else if($("#tName").val().length>10||$("#tName").val().length<2){
			mui.toast("请输入正确的名字");
			$("#tName").val("");
		}else if(!reg.test($("#tName").val())){
			mui.toast("请输入正确的名字");
			$("#tName").val("");
		}else {
	        $("#tName").css("color","black");
	    }
	}
	//手机号失去焦点
	function telblur(){
		reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i; //验证手机正则(输入前7位至11位)    
	    if ($("#tTel").val() == "" || $("#tTel").val() == "请输入您的手机号") {
	        mui.toast("请输入您的手机号");
	    } else if ($("#tTel").val().length !=11) {
	    	mui.toast("输入的号码长度有误");
	    	$("#tTel").val("");
	    } else if (!reg.test($("#tTel").val())) {
	    	mui.toast("输入的手机号格式有误");
	    	$("#tTel").val("");
	    } else {
	    	var phone=$("#tTel").val();
			$.ajax({
				type:"post",
	    		url:getRootPath+"/teacher/selectRepeat?tTel="+phone,
	    		success:function(result){
	    			if (result.success) {
	    				$("#tTel").css("color","black");
	    			}else{
	    				mui.toast("该手机号已经被注册");
	    				$("#tTel").val("");
	    			}
	    		}
	    	});
	    }
	}
	//密码失去焦点
	function passwordblur(){
		reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
		if($("#tPassword").val()==null && $("#tPassword").val()==''){
			mui.toast("请输入密码");
		}else if (!reg.test($("#tPassword").val())) {
	    	mui.toast("格式有误，由6-12位大小写字母和数字组成");
	    	$("#tPassword").val("");
	    } else {
	      $("#tPassword").css("color","black");
	    }
	}
	//确认密码失去焦点
	function passwordblur2(){
		var pwd1 = $("#tPassword").val();
	    var pwd2 = $("#tPassword2").val();
	    if ($("#tPassword2").val() == '请再次输入密码' || $("#tPassword2").val() == "") {
	       mui.toast("请输入确认密码");
	    } else if (pwd1!=$("#tPassword2").val()) {
	    	mui.toast("两次密码不一致，请确认后输入");
	    	$("#tPassword2").val("");
	    } else {
	        $("#tPassword2").css("color","black");
	    }
	}
	//验证码倒计时
	function invokeSettime(obj){
	    var countdown=60;
	    settime(obj);
	    function settime(obj) {
	        if (countdown == 0) {
	            $(obj).attr("disabled",false);
	            $(obj).text("免费获取验证码");
	            $(obj).css("background-color","#E9B800");
	            countdown = 60;
	            return;
	        } else {
	            $(obj).attr("disabled",true);
	            $(obj).text("(" + countdown + ") s 重新发送");
	            $(obj).css("background-color","gray");
	            countdown--;
	        }
	        setTimeout(function() {
	                    settime(obj) }
	                ,1000)
	    }
	}
	//发送验证码
	function sendyzm(){
		var phone=$("#tTel").val();
		var obj =$(".yzm").val();
		if (phone== '' || phone == null) {
			mui.toast("手机号不能为空");
		}else{
			$.ajax({
				type:"post",
				url:getRootPath+"/teacher/phoneNumber?tTel="+phone,
			    success:function(result){
		    		if(result.success){
						invokeSettime("#btn");
		    		}
			    }
			});
		}
	}
	//比对验证码
	function scodeblur(){
		var code=$("#scode").val();
		if($("#scode").val()==null || $("#scode").val()==''){
			mui.toast("验证码不能为空");
		}else{
			$.ajax({
			type:"post",
			url:getRootPath+"/teacher/blastCode?code="+code,
			async:true,
			success:function(result){
				if(result.success){
					$("#scode").css("color","black");
				}else{
					mui.toast(result.msg);
				}
			}
		});
		}
	}