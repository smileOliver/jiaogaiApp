	mui.init({
	  pullRefresh : {
	    container: '#pullrefresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up :{
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback :pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    },
	    down:{
	    	style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
		    color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
		    height:'50px',//可选,默认50px.下拉刷新控件的高度,
		    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
		    offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
		    auto: true,//可选,默认false.首次加载自动上拉刷新一次
		    contentdown:'下拉可以刷新', //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover:'释放立即刷新', //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh:'正在刷新…', //可选，正在刷新状态时，下拉刷新控件上显示的标题内容 
            callback: pulldownRefresh  
        } 
	  }
	});

    
	 var pageSize = 15;//每页显示条数
	 var counter = 1;//计数器
	 var pageStart = 0;//开始数据条数
	 var Flag=true;
	 var status="";
	 var tid=localStorage.getItem("teacherId");
 function data() {
	  //业务   
	mui.ajax({
		xhrFields: {withCredentials: true},
	    crossDomain: true,
	    type:'post',
	    url:getRootPath+"/project/selectProject",
	    jsonp: "jsonpCallback",
	    data:{
	    	"page":counter,
	    	"pageSize":pageSize,
	    	"tId":tid,
	    	"status":status
	    },
	   async: true,
	   dataType: "json",
	   success:function(result){
	   	 Flag=result["obj"]==null||result["obj"]==undefined||result["obj"]=='';
		//判断是否有返回值 当没有返回值的时候就为空，则代表没有更多数据了
	    if(Flag==false){
	     counter++;
	    }
	    if(result["obj"].length<pageSize){
	    	Flag=true;
	    }
	    var html=""
	   	if(result.success){
	   		if(result["obj"].length>0){
	   			$.each(result["obj"],function(i,value){	   				
	   				var id=value.id;
	   				html+='<li class="mui-table-view-cell mui-media" id="'+value.id+'" style="list-style:none;">'+
								'<div class="mui-media-body">'+
									'<span  style="color:black;">'+value.pTitle+'</span>'+
									'<p>申请部门：'+value.declareDepartment+'</p>'+
									'<p>申请类型：'+value.typeName+'</p>'+
									'<p>发布时间：&nbsp;&nbsp;&nbsp;'+relTime(value.createTime)+'</p>'+
								'</div>'+
							'</li>';
	   			});
	   		 $('.mui-table-view').append(html);
	   		  //jQuery(html).insertBefore('#pullrefresh .mui-scroll .mui-table-view');
	   			$(".mui-media").each(function() {  	
						this.addEventListener("tap",function() {
						var jumpUrl ='projet_detail.html?id='+ $(this).attr("id");				
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
            //plus.nativeUI.closeWaiting();  
           // mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
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
/** 
   * 下拉刷新具体业务实现 
   */  
function pulldownRefresh(){
	 window.setTimeout(function() { //0.5秒后执行函数
            //刷新数据前清空以前数据
            $("#newsMore").empty();
            //重新加载数据
            //在这个函数里面获取数据后会调用_createNewsMoreList 
            //停止刷新
            data();
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        }, 500);
}
function chonseProject(){
	status=$(".select_xz").val();
	$("#newsMore").empty();
	data();
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
