 //上拉加载数据
mui.init({
      pullRefresh : {
        container:"#pullrefresh",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
        up : {
          height:50,//可选.默认50.触发上拉加载拖动距离
          auto:false,//可选,默认false.自动上拉加载一次
          contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback : pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      }
});
/*重新mui.back方法防止其返回上一级*/
  	var first = null;
    mui.back = function(){
        mui.plusReady(function() {
            //首页返回键处理
            //处理逻辑：1秒内，连续两次按返回键，则退出应用；
            if(!first){
                first = new Date().getTime();
                mui.toast('再按一次退出应用');
                setTimeout(function(){
                    first = null;
                },1000);
            }else{
                if(new Date().getTime()-first<1000){
                    plus.runtime.quit();
                }
            }
        });
    }
    $.ajax({
		xhrFields: {withCredentials: true},
	    crossDomain: true,
	    type:'post',
	    url:getRootPath+"/notice/newNotice",
	    jsonp: "jsonpCallback",
	   async: true,
	   dataType: "json",
	   success:function(result){
	   	if(result.success){
	   		var html=""
			var title=result["obj"].noticeTitle
			var content=result["obj"].noticeContent
			html +='<div class="Baike_con_top clear">'+
					'<div class="con_title">'+title+'</div>'+
					'<p class="con_content">'+content+'</>'+
				  '</div>';
			 $('#marqueebox').html(html)
	   	}else{
	   		mui.toast(result.msg);
	   	}
	   }
	});
 var pageSize = 8;//每页显示条数
 var counter = 1;//计数器
 var pageStart = 0;//开始数据条数
 var Flag=true;
  data();

 function data() {
	  //业务   
	var html="";
	mui.ajax({
		xhrFields: {withCredentials: true},
	    type:'post',
	    url:getRootPath+"/declaration/selectByPage",
	    jsonp: "jsonpCallback",
	    data:{
	    	page:counter,
	    	pageSize:pageSize
	    },
	   async: true,
	   dataType: "json",
	   success:function(result){
	   	if(result.success){
	   		 Flag=result["obj"][0].declarationTitle==null||result["obj"][0].declarationTitle==undefined||result["obj"][0].declarationTitle=='';
				 //判断是否有返回值 当没有返回值的时候就为空，则代表没有更多数据了
			    if(Flag==false){
			     counter++;
	     	 }
	     	if(result["obj"].length<pageSize){
	    	Flag=true;
	    	}
	   		if(result["obj"].length>0){
	   			for(i=0;i<result["obj"].length;i++){
	   				var title=result["obj"][i].declarationTitle
	   				var id=result["obj"][i].id
	   				var time=relTime(result["obj"][i].createTime)
	   				
	   				html+='<li class="mui-table-view-cell mui-media"  id="'+id+'"  style="list-style:none;">'+
								'<div class="mui-media-body">'+
									'<span  style="color:black;">'+title+'</span>'+
									'<p class="mui-ellipsis-2">发布时间：&nbsp;&nbsp;&nbsp;'+time+'</p>'+
								'</div>'+
							'</li>'
	   			}
	   			$('.mui-table-view').html(html);
	   			$(".mui-media").each(function() {  	
						this.addEventListener("tap",function() {
						var jumpUrl ='declaration.html?id='+ $(this).attr("id");	
						console.log(jumpUrl);
							jump(jumpUrl);
						});
					});
	   		}else{
	   			mui.toast(result.msg);
	   		}
	   		
	   	}else{
	   		mui.toast(result.msg);
	   	}
	   },
	   error: function(xhr, type, errerThrown) {
            mui.toast('网络异常,请稍候再试');
        }
	});
}

 /**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
 setTimeout(function () {
 	data();
    mui("#pullrefresh").pullRefresh().endPullupToRefresh((Flag)); //参数为true代表没有更多数据了。
 }, 1500);
}
function relTime(date){
	 /**
	 * 
	 * 获取当前时间
	 */
	function p(s) {
	    return s < 10 ? '0' + s: s;
	}
	
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  
	
	var now=year+'年'+p(month)+"月"+p(date)+"日";
	return now;
}

function jump(jumpUrl) {

			mui.openWindow({
				id:'my_notes_list.html',
				url: jumpUrl,
		        
				styles: {
					popGesture: "none"
				},
				show: {
					aniShow: 'none'
				},
				waiting: {
					autoShow: false
				}
			});
		}
