
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
		   	    '<span>'+userName+'</span>'+	   	   	
		   	   '</div>'+
		   	    '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<span>'+userSex+'</span>'+	   	   	
		   	   '</div>'+
		   	    '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">教师编号&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<span>'+teacherNum+'</span>'+	   	   	
		   	   '</div>'+
		   	    '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">职称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<span>'+jobTitle+'</span>'+	   	   	
		   	   '</div>'+
		   	   '<div class="register_con_list" >'+
		   	   	'<span class="register_con_text">学历&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   		'<span>'+degree+'</span>'+	   	   	
		   	   '</div>'
		   	   
		   	   $('#res').append(html)
		htm1='<div class="register_con_list">'+
		   	   	'<span class="register_con_text">所在城市&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<span>'+userCity+'</span>'+		   	   	
		   	   '</div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">所属部门&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<span>'+departmentName+'</span>'+
		   	  ' </div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">QQ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	   ' <span>'+userQq+'</span>'+  	   	
		   	   '</div>'+
		   	   '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">手机号码&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<span>'+userTel+'</span>'+	   	   	
		   	  '</div>'+
		   	  '<div class="register_con_list">'+
		   	   	'<span class="register_con_text">电子邮箱&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
		   	    '<span>'+email+'</span>'+	   	   	
		   	  '</div>'
		   	    $('#res1').append(htm1)
   	  }
   }
});
