			/**
			 * @description 显示消息
			 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
			 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
			 * @param {JSON} data 消息数据,可选参数: {params} {{el:'消息容器选择器'},{senderAvatar:'发送者头像地址'},{receiverAvatar:'接收者头像地址'},{msg:'消息内容'}}
			 * ('text'和'url'类型的msg是文字，img类型的msg是img地址)
			 */
			var appendMsg = function(who,type,data) {
			    // 生成节点
			    var domCreat = function(node){
			        return document.createElement(node)
			    };
			    
			    // 基本节点
			    var msgItem = domCreat("div"),
			        avatarBox = domCreat("div"),
			        contentBox = domCreat("div"),
			        avatar = domCreat("img"),
			        triangle = domCreat("div");
			    
			    // 头像节点
			    avatarBox.className="chat-avatar";
			    avatar.src = (who=="sender")?data.senderAvatar:data.receiverAvatar;
			    avatarBox.appendChild(avatar);
			    
			    // 内容节点
			    contentBox.className="chat-content";
			    triangle.className="chat-triangle";
			    contentBox.appendChild(triangle);
			    
			    // 消息类型
			    switch (type){
			        case "text":
			            var msgTextNode = domCreat("span");
			            var textnode=document.createTextNode(data.msg);
			            msgTextNode.appendChild(textnode);
			            contentBox.appendChild(msgTextNode);
			            break;
			        case "url":
			            var msgUrlNode = domCreat("a");
			            var textnode=document.createTextNode(data.msg);
			            if(data.indexOf('http://') < 0){
			                data.msg = "http://" + data.msg;
			            }
			            msgUrlNode.setAttribute("href",data.msg); 
			            msgUrlNode.appendChild(textnode);
			            contentBox.appendChild(msgUrlNode);            
			            break;
			        case "img":
			            var msgImgNode = domCreat("img");
			            msgImgNode.src = data.msg;
			            contentBox.appendChild(msgImgNode);
			            break;
			        default:
			            break;
			    }
			    
			    // 节点连接
			    msgItem.className="chat-"+who;
			    msgItem.appendChild(avatarBox);
			    msgItem.appendChild(contentBox);
			    document.querySelector(data.el).appendChild(msgItem);
			}
			
			
			//获取RUL参数值
			var urlTools = {
			    getUrlParam: function(name) {               /*?videoId=identification  */
			        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
			        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			        var r = params.substr(1).match(reg);
			        if (r!=null) return unescape(r[2]); return null;
			    }
			};
			var categoryId = urlTools.getUrlParam("id");  // 获取url中的参数
			
			if(categoryId!=null){
				mui.ajax({
		      	type:'POST',
		      	url:getRootPath+"/comment/selectByProjectId",
		      	data:{
		      		"page":1,
		      		"pageSize":15,
		      		"projectId":categoryId
		      	},
		      	success:function(result){
		      		if(result.success){
		      			var comments=result["obj"];
		      			//隐藏数据
		      			if(comments.length>0){
		      				html='<input type="hidden" class="toId" value="'+comments[0].teacherId+'">'+
					        '<input type="hidden" class="toName" value="'+comments[0].commentator+'">'+
					        '<input type="hidden" class="projectId" value="'+comments[0].projectId+'">'+
					        '<input type="hidden" class="projectTitle" value="'+comments[0].projectTitle+'">'+
					        '<input type="hidden" class="hostId" value="'+comments[0].hostId+'">';
					        $('#msg-list').html(html);
		      			}
		      			
		      			$.each(result["obj"],function(i,value){
		      			if(tid==value.toId){
		      				appendMsg("sender","text",{
		      					    el: '#msg-list',
							        senderAvatar: '../public/image/touxiang2.png',
							        receiverAvatar: '../public/image/touxiang1.png',
							        msg: value.content
		      				});
		      			}else{
		      					appendMsg("receiver","text",{
		      					  el: '#msg-list',
							        senderAvatar: '../public/image/touxiang2.png',
							        receiverAvatar: '../public/image/touxiang1.png',
							        msg: value.content
		      				});
		      			}
		      			});
		      		}else{
		      			mui.toast(result.msg);
		      		}
		      	}
		      });
			}
      		/**
			 * 消息初始化
			 */
			var msgInit = {
			    el: '#msg-list', //消息容器
			    senderAvatar: '../public/image/touxiang2.png',  //发送者头像
			    receiverAvatar: '../public/image/touxiang1.png', //接收者头像
			}
			/**
			 * @description 展示消息精简版
			 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
			 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
			 * @param {Object} msg ('text'和'url'类型的msg是文字，img类型的msg是img地址)
			 */
			var msgShow = function(who,type,msg){
			    appendMsg(who,type,{
			        el: msgInit.el,
			        senderAvatar: msgInit.senderAvatar,
			        receiverAvatar: msgInit.receiverAvatar,
			        msg: msg
			    });
			}
			// UI控件对象
			var ui = {
			    content: mui('.mui-content'[0]),
			    msgList: mui('#msg-list')[0],
			    footer: mui('footer')[0],
			    msgChooseImg: mui("#msg-choose-img")[0],
			    msgText: mui('#msg-text')[0],
			    msgSendText: mui('#msg-send-text')[0]
			}
			// 发送文本消息
			ui.msgSendText.addEventListener('tap',function(){
			    sendText();
			})
			// 获得输入框键盘焦点
			var msgTextFocus = function(){
			    ui.msgText.focus();
			    setTimeout(function() {
			        ui.msgText.focus();
			    }, 150);
			}
			// 消息滚动
			var msgScrollTop = function(){
			    ui.msgList.scrollTop = ui.msgList.scrollHeight + ui.msgList.offsetHeight;
			}
			//获取当前登录教师的信息
			var tid=localStorage.getItem("teacherId");
			// 发送文本
			var sendText = function(){
			    var msg = ui.msgText.value.replace(new RegExp('\n', 'gm'), '<br/>');
			    var validateReg = /^\S+$/;
			    // 获得键盘焦点
			    msgTextFocus();
			    if(validateReg.test(msg)){
			        // 消息展示出来
			        msgShow('sender','text',msg);
			        // 发送文本消息到环信服务器
			      /*  conn.sendTextMessage({
			            to: chatName, //用户登录名，SDK根据AppKey和domain组织jid，如easemob-demo#chatdemoui_**TEST**@easemob.com，中"to:TEST",下同
			            msg: msg, //文本消息
			            type: "chat"
			            //ext :{"extmsg":"extends messages"}//用户自扩展的消息内容（群聊用法相同）
			        }); */ 
			        if(categoryId!=null){
					    	var toId=$(".toId").val();
					    	var toName=$(".toName").val();
					    	var projectId=$(".projectId").val();
					    	var projectTitle=$(".projectTitle").val();
					    	var hostId=$(".hostId").val();
			        	mui.ajax({
			        	type:'POST',
			        	url:getRootPath+'/comment/addComment',
			        	data:{
			        		"projectId":categoryId,
			        		"content":msg,
			    			"toId":toId,
			    			"projectTitle":projectTitle,
			    			"hostId":hostId,
			    			"teacherId":tid
			        	},
			        	success:function(result){
			        		if(result.success){
			        			console.log(result.msg);
			        		}
			        	}
			        });
			        }
			        // 清空文本框
			        ui.msgText.value = '';
			        // 恢复输入框高度(因为我们这里是50px，你可以写一个全局变量)
			        ui.footer.style.height = '50px';
			        // 保持输入状态
			        mui.trigger(ui.msgText, 'input', null);
			        // 这一句让内容滚动起来
			        msgScrollTop();
			    }else{
			        mui.toast("文本消息不能为空");
			    }
			}
			// 初始化连接
			mui.init({
			   /* onOpened : function(){
			        //mui.toast("成功登录");
			        conn.setPresence();
			    },*/
			    // 收到文本消息时的回调函数
			    onTextMessage : function(message) {
			        // console.log(JSON.stringify(message));
			        var from = message.from;//消息的发送者
			        var msg = message.data;//文本消息体    
			        //mui.toast(msg);
			        // 收到文本消息在页面展示
			        msgShow('receiver','text',msg);
			        msgScrollTop();
			    },
			    // 收到图片消息时的回调函数
			    onPictureMessage : function(message) {
			        handlePictureMessage(message);
			    }
			});
			
			// 强制弹出软键盘
			var showKeyboard = function() {
			    if (mui.os.ios) {
			        var webView = plus.webview.currentWebview().nativeInstanceObject();
			        webView.plusCallMethod({
			            "setKeyboardDisplayRequiresUserAction": false
			        });
			    } else if(mui.os.android) {
			        var Context = plus.android.importClass("android.content.Context");
			        var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			        var main = plus.android.runtimeMainActivity();
			        var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
			        imm.toggleSoftInput(0,InputMethodManager.SHOW_FORCED);
			    }
			};
			
			// 输入框监听事件
			ui.msgText.addEventListener('input', function(event) {
			    msgTextFocus();
			    ui.footer.style.height = this.scrollHeight + 'px';
			});
			// 解决长按“发送”按钮，导致键盘关闭的问题；
			ui.msgSendText.addEventListener('touchstart', function(event) {
			    msgTextFocus();
			    event.preventDefault();
			});
			ui.msgSendText.addEventListener('touchmove', function(event) {
			    msgTextFocus();
			    event.preventDefault();
			});