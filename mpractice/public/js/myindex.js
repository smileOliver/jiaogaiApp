mui.init({
			swipeBack: true //启用右滑关闭功能
		});
		var slider = mui("#slider");
		slider.slider({
			interval: 0
		});
		//检查网络连接状况
		mui.plusReady(function() {
			document.addEventListener("netchange", wainshow, false);
		});
	
		function wainshow() {
			if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
				mui.toast("网络异常，请检查网络设置！");
	
			} else {
	
			}
		}
		
		//底部跳转事件
		mui('#footer').on('tap', 'a', function() {
			var id = this.getAttribute("data-wid");
			if(!id) {
				id = this.getAttribute('href');
			}
			var href = this.getAttribute('href');

			//非plus环境，直接走href跳转
			if(!mui.os.plus) {
				location.href = href;
				return;
			}
			mui.openWindow({
				id: href,
				url: href,
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
		});
		/**头像*/
		var tSex=localStorage.getItem("tSex");
		if(tSex=="男"){
			html='<img src="../public/image/man.jpg" id="headImage">';
			$('#myHead').html(html);
		}else if(tSex=="女"){
			html='<img src="../public/image/women.jpg" id="headImage">';
			$('#myHead').html(html);
		}
		/*更换头像*/
        /*点击头像触发*/ 
        document.getElementById('headImage').addEventListener('tap', function() { 
            if (mui.os.plus) { 
                var a = [{ 
                    title: "拍照" 
                }, { 
                    title: "从手机相册选择" 
                }]; 
                plus.nativeUI.actionSheet({ 
                    cancel: "取消", 
                    buttons: a 
                }, function(b) { /*actionSheet 按钮点击事件*/ 
                    switch (b.index) { 
                        case 0: 
                            break; 
                        case 1: 
                            getImage(); /*拍照*/ 
                            break; 
                        case 2: 
                            galleryImg();/*打开相册*/ 
                            break; 
                        default: 
                            break; 
                    } 
                }) 
            } 
        }, false); 



        //拍照 
        function getImage() { 
            var c = plus.camera.getCamera(); 
            c.captureImage(function(e) { 
                plus.io.resolveLocalFileSystemURL(e, function(entry) { 
                    var s = entry.toLocalURL() + "?version=" + new Date().getTime(); 
                    uploadHead(s); /*上传图片*/ 
                }, function(e) { 
                    console.log("读取拍照文件错误：" + e.message); 
                }); 
            }, function(s) { 
                console.log("error" + s); 
            }, { 
                filename: "_doc/head.png" 
            }) 
        } 

        //本地相册选择 
        function galleryImg() { 
            plus.gallery.pick(function(a) { 
                plus.io.resolveLocalFileSystemURL(a, function(entry) { 
                    plus.io.resolveLocalFileSystemURL("_doc/", function(root) { 
                        root.getFile("head.png", {}, function(file) { 
                            //文件已存在 
                            file.remove(function() { 
                                console.log("file remove success"); 
                                entry.copyTo(root, 'head.png', function(e) { 
                                        var e = e.fullPath + "?version=" + new Date().getTime(); 
                                        uploadHead(e); /*上传图片*/ 
                                        //变更大图预览的src 
                                        //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
                                    }, 
                                    function(e) { 
                                        console.log('copy image fail:' + e.message); 
                                    }); 
                            }, function() { 
                                console.log("delete image fail:" + e.message); 
                            }); 
                        }, function() { 
                            //文件不存在 
                            entry.copyTo(root, 'head.png', function(e) { 
                                    var path = e.fullPath + "?version=" + new Date().getTime(); 
                                    uploadHead(path); /*上传图片*/ 
                                }, 
                                function(e) { 
                                    console.log('copy image fail:' + e.message); 
                                }); 
                        }); 
                    }, function(e) { 
                        console.log("get _www folder fail"); 
                    }) 
                }, function(e) { 
                    console.log("读取拍照文件错误：" + e.message); 
                }); 
            }, function(a) {}, { 
                filter: "image" 
            }) 
        }; 



        //上传头像图片 
	        function uploadHead(imgPath) { 
	            console.log("imgPath === " + imgPath); 
	            var mainImage= document.getElementById("headImage");
 　　			     mainImage.src = imgPath
	            var image = new Image(); 
	            image.src = imgPath; 
	            image.onload = function() { 
		            var imgData = getBase64Image(image); 
		            var teId=localStorage.getItem("teacherId");
		            var fd = new FormData(document.forms[0]);
		            fd.append("file", imgData, 'image.png');
		              $.ajax({ 
			              	type:'post', 
			              	url:getRootPath+'/teacher/upHeadImg',
			                data:fd,
			                dataType: 'json', 
							processData : false, 
							contentType : false,
			                success: function(data) { 
			                    console.log('上传成功'); 
			                }, 
			                error: function(xhr, type, errorThrown) { 
			                    mui.toast('网络异常，请稍后再试！'); 
			                } 
		              }); 
	            } 
	    } 
        //将图片压缩转成base64 
        function getBase64Image(img) { 
            var canvas = document.createElement("canvas"); 
            var width = img.width; 
            var height = img.height; 
            // calculate the width and height, constraining the proportions 
            if (width > height) { 
                if (width > 100) { 
                    height = Math.round(height *= 100 / width); 
                    width = 100; 
                } 
            } else { 
                if (height > 100) { 
                    width = Math.round(width *= 100 / height); 
                    height = 100; 
                } 
            } 
            canvas.width = width;   /*设置新的图片的宽度*/ 
            canvas.height = height; /*设置新的图片的长度*/ 
            var ctx = canvas.getContext("2d"); 
            ctx.drawImage(img, 0, 0, width, height); /*绘图*/ 
            var dataURL = canvas.toDataURL("image/png", 0.8); 
            return dataURL.replace("data:image/png;base64,", ""); 
        }    


/************以上是头部************/
    var isProfessor=localStorage.getItem("isProfessor");
    if(isProfessor==1){
    	html='<div class="myindex_bt_litem_img">'+
				'<img src="../public/image/my_icon3.png">'+
			  '</div>'+
			'<div class="myindex_bt_litem_text">我的审批</div>'			
      $("#shenpi").html(html);
    }
   $(".nav_content_litem").click(function(){
   	   var  index_div = $(this).index()
   	   $(this).addClass("active").siblings().removeClass("active");
   	   $(".mui_views_con").hide().eq($(this).index()).show();
   })
   /************/
	var xiaoxi=$('#xiaoxi') [0]
	var shenpi=$('#shenpi')[0]
	var fankui=$('#fankui')[0]
	var help=$('#help')[0]
	var information=$('#information')[0]
	var newphone=$('#newphone')[0]
	var Cpassword=$('#Cpassword')[0]
	 xiaoxi.addEventListener("tap",function(){
			jump('news')
	  })
	  shenpi.addEventListener("tap",function(){
			jump('shenpi')
	  })
	 information.addEventListener("tap",function(){
			jump('information')
	  })
	newphone.addEventListener("tap",function(){
			jump('my_phone')
	  })
	Cpassword.addEventListener("tap",function(){
			jump('password')
	  })

  	help.addEventListener("tap",function(){
			jump('help')
  	})

  
  	//退出登录
  	function exit(){
  		var id=localStorage.getItem("teacherId");
  		$.ajax({
  			type:"post",
  			url:getRootPath+"/teacher/exit",
  			data:{
  				"id":id
  			},
  			success:function(result){
  				if(result.success){
  					localStorage.clear();
  					jump("login");
  				}else{
  					mui.toast(result.msg);
  				}
  			}
  		});
  	}