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
	                 html += "<option value= '"+result["obj"][i].dName+"'>"+result["obj"][i].dName+"</option>";
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
	})
	//校验金额
 	$(".money0").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money0").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money0").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   	});
    $(".money1").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money1").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money1").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
    $(".money2").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money2").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money2").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
    $(".money3").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money3").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money3").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
    $(".money4").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money4").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money4").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
    $(".money5").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money5").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money5").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
    $(".money6").blur(function(){
       var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
       var money = $(".money6").val();
       if(money==null||money==''){
       }else{
       		if(!reg.test(money)){
	    		mui.toast("请输入正确的金额，例：1000.00");
	    		$(".money6").val("");
	    	}else{                                                                        
	    	}
       }
		    	
   });
