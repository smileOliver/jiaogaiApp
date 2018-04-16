var url="http://47.94.144.116/medicalPortal/personal/validatePWD"
var button=$('#button')[0]

button.addEventListener("tap",function(){
var password=$('#pwd').val()
   if(logincheck(password)){ 
	$.ajax({
	xhrFields: {withCredentials: true},
    crossDomain: true,
    type:'post',
    url:url,
   async: false,
   dataType: "json",
   data:{password:password},
   success: function (data) { 
   	if(data.resCode==200){
   		mui.toast(data.resMsg)
   	}
   	 jump("phone");
   }
  
}); 	
   }
})

function logincheck(password){
			if(password==''){
				mui.toast("请输入正确密码")
				return false;
			}
			
			return true;
		}
 function jump (id) {
			mui.openWindow({
				id: id,
				url: id+'.html'			
			});
		}