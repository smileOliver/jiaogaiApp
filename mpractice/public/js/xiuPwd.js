var register_button=$('#register_button')[0]
mui.init()
register_button.addEventListener("tap",function(){	
	var password=$('#mypwd').val()
    var newPassword=$('#newpwd').val()
    var pwd=$('#pwd').val()
    
    if(logincheck(password,newPassword,pwd)){
    $.ajax({
	xhrFields: {withCredentials: true},
    crossDomain: true,
    type:'post',
    url:url,
   async: false,
   dataType:"json",
   data:{password:mypwd,newPassword:newpwd},
   success: function (data) {
    /* if(data.code==200){
     	mui.toast(data.resMsg)
     }*/
   }
});
    }

})
function logincheck(password,newPassword,pwd){			
			if(password==""){
			 mui.toast("请输入旧密码"); 
		        return false; 
			}
			if(newPassword==""){
			 mui.toast("请输入新密码"); 
		        return false; 
			}
			if(pwd==""){
			 mui.toast("请输入新密码"); 
		        return false; 
			}
			if(newPassword!=pwd){
				mui.toast('两次密码不一致')
				return false
			}
			return true;
		}
