function GetQueryString(name)
		{
		    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if(r!=null)return  unescape(r[2]); return null;
		}
	var myurl=GetQueryString("id");
$(function(){
	if(myurl !=null){
	 var id=myurl
	  $.ajax({
		xhrFields: {withCredentials: true},
	    crossDomain: true,
	    type:'post',
	    url:getRootPath+"/project/selectProjectById",
	    jsonp: "jsonpCallback",
	    data:{
	    	"id":id
	    },
	   async:true,
	   dataType: "json",
	   success:function(result){
	   	if(result.success){ 
	   		var html=""
			var pTitle=result["obj"].project.pTitle;
			var according=result["obj"].project.according;
			var teacherName=result["obj"].project.teacherName;
			var typeName=result["obj"].project.typeName;
			var groups=result["obj"].project.groups;
			var endTime=result["obj"].project.endTime;
			var status=result["obj"].project.status;
			var realMoney=result["obj"].project.realMoney;
			var budgetMoney=result["obj"].project.budgetMoney;
			var applyTime=result["obj"].project.applyTime;
			var declareDepartment=result["obj"].project.declareDepartment;
			var beginEndtime=result["obj"].project.beginEndtime;
			var teacherSex=result["obj"].project.teacherSex;
			var teacherBirthday=result["obj"].project.teacherBirthday;
			var tEmail=result["obj"].project.tEmail;
			var workPhone=result["obj"].project.workPhone;
			var tTel=result["obj"].project.tTel;
			var resume=result["obj"].project.resume;
			var basicsOne=result["obj"].project.basicsOne;
			var basicsTwo=result["obj"].project.basicsTwo;
			var printOne=result["obj"].project.printOne;
			var printTwo=result["obj"].project.printTwo;
			var printThree=result["obj"].project.printThree;
			var printFour=result["obj"].project.printFour;
			var liveDepartment=result["obj"].project.liveDepartment
			
			html = '<div class="tab_con">'+
    	'<div class="tab_bd" style="padding-bottom:20px;">'+
    		'<div class="tab_bd_con">'+
		      	'<div class="tab_bd_top clear">'+
		      		'<div class="tab_bd_top_text">教学改革与研究项目申请书</div>'+
		      	'</div>'+
    			'<div class="tab1_bd">'+
    				'<form action="" id="objectForm" method="post">'+
    					'<div class="tab_bd_con1">'+
					   	    '<div class="tab_bd_con_list">'+
						   	   '<span class="tab_bd_con_text">项目名称：</span>'+
						   	   	'<input type="text" class="notNull" name="pTitle" value="'+pTitle+'"/>'+
					   	   ' </div>'+
					   	   ' <div class="tab_bd_con_list">'+
						   	   '<span class="tab_bd_con_text">项目主持人：</span>'+
						   	   '<input type="text" class="notNull" name="teacherName"  value="'+teacherName+'"/>'+
					   	   ' </div>'+
					   	   ' <div class="tab_bd_con_list">'+
						   	   	'<span class="tab_bd_con_text">项目成员：</span>'+
						   	   	'<input type="text"  name="groups" value="'+groups+'"/>'+
					   	   ' </div>'+
					   	    '<div class="tab_bd_con_list">'+
						   	   '<span class="tab_bd_con_text">申请部门：</span>'+
						   	   	'<div class="tab_bd_select">'+
							   	   	'<select id="departmentId" name="declareDepartment"> '+
	   	   							'</select>'+
   	   							'</div>'+
					   	    '</div>'+
					   	    '<div class="tab_bd_con_list">'+
						   	   	'<span class="tab_bd_con_text">申报类别：</span>'+
						   	   	'<div class="tab_bd_select">'+
							   	   	'<select id="typeName" name="typeName"> '+
	   	   							'</select>'+
   	   							'</div>'+
					   	    '</div>'+
					   	    '<div class="tab_bd_con_list">'+
						   	   	'<span class="tab_bd_con_text">完成时间：</span>'+
						   	   	'<input type="text" class="notNull" name="endTime" value="'+endTime+'"/>'+
					   	    '</div>'+
					   	    '<div class="tab_bd_con_list">'+
						   	   	'<span class="tab_bd_con_text">申请时间：</span>'+
						   	   	'<input type="text" class="notNull applyTime" name="applyTime" value="'+applyTime+'""/>'+
					   	    '</div>'+
					   	'</div> '  +
	    				'<div class="tab_bd_con1">'+
	    					'<div class="tab_bd_top clear">'+
			    		      	'<div class="tab_bd_top_text1">一、简表</div>'+
			    		    '</div>'+
			    		    '<div class="content_c1">'+
			    		     	'<div class="content_title">项目简况</div>'+
			    		     	'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">起止年月：</span>'+
						   	   		'<input type="text" name="beginEndtime" placeholder="   年   月      至       年      月" value="'+beginEndtime+'"/>'+
					   	   		'</div>'+
			    		    '</div>'+
			    		    '<div class="content_c1">'+
			    		     	'<div class="content_title">项目主持人</div>'+
					   	   		'<div class="content_text_t1">'+
					   	   			'<div class="tab1_bd_left">'+
		    							'<span class="tab1_bd_text">姓名：</span>'+
		    							'<input type="text"  value="'+teacherName+'"/>'+
	    							'</div>'+
		    						'<div class="tab1_bd_right">'+
		    							'<div class="tab1_bd_right">性别：</div>'+
		    							'<input type="text" name="teacherSex" value="'+teacherSex+'" />'+
		    						'</div>'+
					   	   		'</div>'	+
					   	   		'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">出生年月:</span>'+
						   	   		'<input type="text" name="teacherBirthday" value="'+teacherBirthday+'"/>'+
					   	   		'</div>'+
					   	   		'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">所在部门:</span>'+
						   	   		'<input type="text" name="liveDepartment" value="'+liveDepartment+'"/>'+
					   	   		'</div>'+
					   	   		'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">电子邮箱:</span>'+
						   	   		'<input type="text" name="tEmail" value="'+tEmail+'"/ >'+
					   	   		'</div>'+
					   	   		'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">办公电话:</span>'+
						   	   		'<input type="text" name="workPhone" value="'+workPhone+'"/>'+
					   	   		'</div>'+
					   	   		'<div class="tab_bd_con_list">'+
						   	   		'<span class="tab_bd_con_text">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>'+
						   	   		'<input type="text" name="tTel" value="'+tTel+'"/>'+
					   	   		'</div>'+
					   	   		'<div class="tab_bd_con_list">'+
					   	   			'<span class="tab_bd_con_text">主要教学工作简历:</span>'+
									'<textarea id="textarea5" rows="5" style="color: #222222;" name="resume" >'+resume+'</textarea>'+
								'</div>'+
								'<div class="tab_bd_con_list">'+
					   	   			'<span class="tab_bd_con_text">主要教学改革和研究成果:</span>'+
									'<div class="con_content_table">'+
									'</div>'+
								'</div>'+
								'<div class="content_title">项目组</div>'+
								'<div class="tab_bd_con_list">'+
					   	   			'<span class="tab_bd_con_text">主要成员:</span>'+
									'<div class="con_content_table2">'+
									'</div>'+
			    		     	'</div>'+
	    					'</div>'+
	    					'<div class="content_c1">'+
		    					'<div class="tab_bd_top clear">'+
				    		      	'<div class="tab_bd_top_text1 ">二、立项依据：（项目的意义、现状分析）</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="according">'+according+'</textarea>'+
								'</div>'+
	    					'</div>'+
	    					'<div class="content_c1">'+
		    					'<div class="tab_bd_top clear">'+
				    		      	'<div class="tab_bd_top_text1 ">三、项目实施方案及实施计划</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="printOne">'+printOne+'</textarea>'+
				    		    	'</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="printTwo">'+printTwo+'</textarea>'+
				    		    	'</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="printThree">'+printThree+'</textarea>'+
				    		    	'</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="printFour">'+printFour+'</textarea>'+
				    		    	'</div>'+
				    		    '</div>	'+
	    					'</div>'+
	    					'<div class="content_c1">'+
		    					'<div class="tab_bd_top clear">'+
				    		      	'<div class="tab_bd_top_text1 "> 四、教学改革基础</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="basicsOne">'+basicsOne+'</textarea>'+
				    		    	'</div>'+
				    		    	'<div class="tab_bd_con_list">'+
										'<textarea id="textarea5" rows="5" style="color: #222222;" name="basicsTwo">'+basicsTwo+'</textarea>'+
				    		    	'</div>'+
								'</div>'+
	    					'</div>'+
	    					'<div class="content_c1">'+
		    					'<div class="tab_bd_top clear">'+
				    		      	'<div class="tab_bd_top_text1 "> 五、经费预算</div>'+
				    		      	'<div class="tab_bd_con_list">'+
					    		    	'<div class="con_content_table3">'+
											
										'</div>'+	
									'</div>'+
								'</div>'+
	    					'</div>'+
					    	'<div class="content_c1">'+
						    	'<div class="tab_bd_top clear">'+
									'<div class="tab_bd_con_list btn_span">'+
										
									'</div>'+
						    	'</div>'+
					    	'</div>'+
					   ' </div>	'+
    				'</form>'+
    			'</div>	'+
    		'</div>'+
    	'</div>'+
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
	            	if(result["obj"][i].dName==declareDepartment){
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
	   //加载申请类别
	    $.ajax({
	   	type:"post",
	   	url:getRootPath+"/declareType/selectTypes",
	   	success:function(result) {
	   		if(result.success){
	   			if (result["obj"].length>0) {
	   			var html="";
	            for(var i=0;i<result["obj"].length;i++){
	                 html += "<option value= '"+result["obj"][i].typeName+"'>"+result["obj"][i].typeName+"</option>";
	            }
	            $("#typeName").html('').append(html); 
	   		}
	   		}else{
	   			mui.toast(result.msg);
	   		}
	   		
	   	}
	   });
	   //将结果写入到html页面
	   $('.mui-content').append(html)
	   //循环遍历  教学改革和研究结果
	   var res="";
	   res+='<table border="1">'+
				'<tr>'+
					'<td>时间</td>'+
					'<td>项目名称</td>'+
					'<td>颁发部门</td>'+
					'<td>获奖等次</td>'+
					'<td>名次</td>'+
				'</tr>'
	   	for(var i=0;i<result["obj"].resultList.length;i++){
		res+='<tr>'+
				'<td><input type="text" name="resultTime" value="'+result["obj"].resultList[i].resultTime+'">'+
				'<input type="hidden" name="resultId" value="'+result["obj"].resultList[i].id+'"></td>'+
				'<td><input type="text" name="resultPTitle" value="'+result["obj"].resultList[i].projectTitle+'"></td>'+
				'<td><input type="text" name="departmentName" value="'+result["obj"].resultList[i].departmentName+'"></td>'+
				'<td><input type="text" name="award" value="'+result["obj"].resultList[i].award+'"></td>'+
				'<td><input type="text" name="grade" value="'+result["obj"].resultList[i].grade+'"></td>'+
			'</tr>'
	  	 }
	   	if(result["obj"].resultList.length<5){
	   		for(var i=0;i<5-result["obj"].resultList.length;i++){
			res+='<tr>'+
					'<td><input type="text" name="resultTime"></td>'+
					'<td><input type="text" name="resultPTitle" ></td>'+
					'<td><input type="text" name="departmentName"></td>'+
					'<td><input type="text" name="award"></td>'+
					'<td><input type="text" name="grade"></td>'+
				'</tr>'
	  	 	}
	   	}
	   	res+='</table>'
	   	$(".con_content_table").html('').append(res); 
	   	//循环遍历 小组成员
		var team="";
	   team+='<table border="1">'+
				'<tr>'+
					'<td>姓名</td>'+
					'<td>出生年月</td>'+
					'<td>职称</td>'+
					'<td>工作单位</td>'+
					'<td>分工</td>'+
					'<td>签章</td>'+
				'</tr>'
	   	for(var i=0;i<result["obj"].teams.length;i++){
		team+='<tr>'+
				'<td><input type="text" name="gName" value="'+result["obj"].teams[i].gName+'">'+
				'<input type="hidden" name="teamId" value="'+result["obj"].teams[i].id+'"></td>'+
				'<td><input type="text" name="birthday" value="'+result["obj"].teams[i].birthday+'"></td>'+
				'<td><input type="text" name="jobTitle" value="'+result["obj"].teams[i].jobTitle+'"></td>'+
				'<td><input type="text" name="workUnit" value="'+result["obj"].teams[i].workUnit+'"></td>'+
				'<td><input type="text" name="fengong" value="'+result["obj"].teams[i].fengong+'"></td>'+
				'<td><input type="text" name="qianzhang" value="'+result["obj"].teams[i].qianzhang+'"></td>'+
			'</tr>'
	  	 }
	   	if(result["obj"].teams.length<6){
	   		for(var i=0;i<6-result["obj"].teams.length;i++){
			team+='<tr>'+
					'<td><input type="text" name="gName"></td>'+
					'<td><input type="text" name="birthday"></td>'+
					'<td><input type="text" name="jobTitle"></td>'+
					'<td><input type="text" name="workUnit"></td>'+
					'<td><input type="text" name="fengong"></td>'+
					'<td><input type="text" name="qianzhang"></td>'+
					'</tr>'
	  	 	}
	   	}
	   	team+='</table>'
	   	$(".con_content_table2").html('').append(team); 
	   	//循环遍历经费预算
	   	var budget="";
	   	budget+='<table border="1">'+
					'<tr>'+
						'<td>支出科目（含配套经费）</td>'+
						'<td>金额（元）</td>'+
						'<td>计算根据及理由</td>'+
					'</tr>'+
					'<tr>'+
						'<td>合计</td>'+
						'<td><input type="text" class="money0" name="budgetMoney" value="'+budgetMoney+'"></td>'+
						'<td></td>'+
					'</tr>'
	   	for(var i=0;i<result["obj"].budgetList.length;i++){
		budget+='<tr>'+
					'<td>'+(i+1)+'.<input type="text" name="subject" value="'+result["obj"].budgetList[i].subject+'"'+
					'><input type="hidden" name="budgetId" value="'+result["obj"].budgetList[i].id+'"></td>'+
					'<td><input type="text" class="money1" name="money"  value="'+result["obj"].budgetList[i].money+'"></td>'+
					'<td><input type="text" name="reason"  value="'+result["obj"].budgetList[i].reason+'"></td>'+
				'</tr>'
	  	 }
	   	if(result["obj"].budgetList.length<6){
	   		for(var i=0;i<6-result["obj"].budgetList.length;i++){
			budget+='<tr>'+
					'<td>'+(i+result["obj"].budgetList.length+1)+'.<input type="text" name="subject"></td>'+
					'<td><input type="text" class="money1" name="money"></td>'+
					'<td><input type="text" name="reason"></td>'+
				'</tr>'
	  	 	}
	   	}
	   	budget+='</table>'
	   	$(".con_content_table3").html('').append(budget); 
	   	//根据状态显示不同的按钮
	   	var btn="";
	   	if(status==0){
	   		// 看似保存实则修改
	   		btn+='<button type="button" class="submitFrom" onclick="submitClick()">提交</button>'+
				'<button  type="button" class="saveFrom" onclick="editClick()">保存</button>'+ 
				'<button  type="button" class="saveFrom" onclick="deleteClick()">删除</button>'
				
	   	}else if(status==1|| status==2){
	   		//看似提交实则修改
	   		btn+='<button type="button" class="submitFrom" onclick="editClick()">提交</button>'
	   	}
	   	$(".btn_span").html('').append(btn);
	   	}else{
	   		mui.toast(result.msg);
	   	}
	   }
	});
	
    }
})
	
var tId=localStorage.getItem("teacherId");
	//发送
	function submitClick(){
		if($(".notNull").val()==null||$(".notNull").val()==''){
			mui.toast("请确认信息已填写完整");
		}else{
			$.ajax({
				type:"post",
				url:getRootPath+"/project/addProject?status=1&tId="+tId,
				data:$('#objectForm').serialize(),
				async:true,
				success:function(result){
					if(result.success){
						mui.toast("提交成功，请耐心等待审批");
						jQuery(':input','#objectForm').val('');
						
				       /*.not(':bu tton,:submit,:reset,:hidden')   //将myform表单中input元素type为button、submit、reset、hidden排除
				         //将input元素的value设为空值
				       .removeAttr('checked')*/
					}else{
						mui.toast(result.msg);
					}
				}
			});
		}	
	}
	
	//删除
	function deleteClick(){
		if(myurl !=null){
			var id2=myurl
			$.ajax({
				type:"post",
				url:getRootPath+"/project/deleteById?id="+id2,
				async:true,
				success:function(result){
					if(result.success){
						mui.toast(result.msg);
						jump("project");
					}else{
						mui.toast(result.msg);
					}
				}
			});
		}
	}
	//修改  
	function editClick(){
	    if(myurl !=null){
	        var id3=myurl
			$.ajax({
				type:"post",
				url:getRootPath+"/project/editProject?id="+id3,
				data:$('#objectForm').serialize(),
				async:true,
				success:function(result){
					if(result.success){
						mui.toast("修改成功，请耐心等待审批");
						jQuery(':input','#objectForm').val('');
					}else{
						mui.toast(result.msg);
					}
				}
			});
		}
	}	

