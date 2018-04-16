
var id=localStorage.getItem("teacherId");
$.ajax({
   xhrFields: {withCredentials: true},
    crossDomain: true,
    type:'post',
    url:getRootPath+"/teacher/myselfInfo?id="+id,
   async: false,
   dataType: "json",
   success: function (result){
   	  if(result.success){
   	  	var html=""
   	  	var htm1=""
   	  	var userName=result["obj"].nickname
   	  	var teacherNum=result["obj"].teacherNum
   	  	var jobTitle=result["obj"].jobTitle
   	  	var userSex=result["obj"].tSex
   	  	var degree=result["obj"].maxDegree
   	  	var userCity=result["obj"].tCity
   	  	var userTel=result["obj"].tTel
   	  	var departmentName=result["obj"].departmentName
   	  	var userQq=result["obj"].tQq
   	  	var email=result["obj"].tEmail
   	  	html='<div class="register_con_list">'+
		   	   	'<span class="register_con_text">用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<input type="text" name="nickname" value="'+userName+'">'+
		   	    '<input type="hidden" name="id" value="'+id+'">'+	
		   	   '</div>';
		   	 html+= '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
		   	   		if(userSex=="男"){
		   	   		html+='<span class="radio_inline mui-radio">'+
                    '<input name="tSex" type="radio" id="radio_man" checked value="男">'+
                    '<label for="radio_man">男</label>'+
                    '<input name="tSex" type="radio" id="radio_woman" value="女">'+
                    '<label for="radio_woman">女</label>'+  
                    '</span>'     
		   	   		}
		   	   		if(userSex=="女"){
		   	   		html+='<span class="radio_inline mui-radio">'+
                    '<input name="tSex" type="radio" id="radio_man"  value="男">'+
                    '<label for="radio_man">男</label>'+
                    '<input name="tSex" type="radio" id="radio_woman" checked value="女">'+
                    '<label for="radio_woman">女</label>'+  
                    '</span>'     
		   	   		}
		   	   		
		   	html+='</div>';
		   	html+='<div class="register_con_list">'+
		   	   	'<span class="register_con_text">教师编号&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<input type="text" name="teacherNum" value="'+teacherNum+'">'+	   	   	
		   	   '</div>'+
		   	    '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">职称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<input type="text" name="jobTitle" value="'+jobTitle+'">'+	   	   	
		   	   '</div>'+
		   	   '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">学历&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<input type="text" name="maxDegree" value="'+degree+'">'+	   	   	
		   	   '</div>';
		   	   
		   	   $('#res').append(html);
		htm1+='<div class="register_con_list">'+
		   	   	'<span class="register_con_text">所在城市&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<input type="text" name="tCity" value="'+userCity+'">'+		   	   	
		   	   '</div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">所属部门&nbsp;&nbsp;&nbsp;</span>'+
		   	   	'<div class="tab_bd_select">'+
		   	    	'<select id="departmentId" name="departmentName"> '+
	   	   			'</select>'+
	   	   			'</div>'+
		   	  ' </div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">QQ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   ' <input type="text" name="tQq" value="'+userQq+'">'+  	   	
		   	   '</div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">手机号码&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<span>'+userTel+'</span>'+	   	   	
		   	  '</div>'+
		   	  '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">电子邮箱&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<input type="text" name="tEmail" value="'+email+'">'+	   	   	
		   	  '</div>'
		   	  //加载部门
	    $.ajax({
		   	type:"post",
		   	url:getRootPath+"/teacher/selectDepartments",
		   	success:function(result) {
		   		if(result.success){
		   			if (result["obj"].length>0) {
		   			var html="";
		            for(var i=0;i<result["obj"].length;i++){
		            	//console.log(declareDepartment);
		            	if(result["obj"][i].dName==departmentName){
	            		html += "<option value= '"+result["obj"][i].dName+"' selected>"+result["obj"][i].dName+"</option>";
		            	}else{
		            		html += "<option value= '"+result["obj"][i].dName+"'>"+result["obj"][i].dName+"</option>";
		            	}
		            }
		            $("#departmentId").html('').append(html); 
		   		}
		   		}else{
		   			mui.toast(result.msg);
		   		}
		   	}
		   });
		   	    $('#res1').append(htm1);
   	  }
   }
});
function submitBtn(){
	mui.prompt('','','请输入登录密码',['取消','提交'],function(e){
		if(e.index==1){
			$.ajax({
				type:"post",
				url:getRootPath+"/teacher/checkPW",
				async:true,
				data:{
					"id":id,
					"password":e.value
				},
				success:function(result){
					if(result.success){
						$.ajax({
							type:"post",
							url:getRootPath+"/teacher/editInfo",
							async:true,
							data:$("#myInfo").serialize(),
							success:function(result){
								if(result.success){
									mui.toast(result.msg);
									jump("information");
								}else{
									mui.toast(result.msg);
								}
							}
						});
					}else{
						mui.toast(result.msg);
					}
				}
			});
			
		}else{
			//关闭对话框
		}
	
	},'div');
    document.querySelector('.mui-popup-input input').type='password' 
	
}

