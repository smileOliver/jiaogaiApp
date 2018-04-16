var url="http://47.94.144.116/medicalPortal/notes/findNotesById"
mui.init()
function getUrlParam(url, name) {
			var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
			var matcher = pattern.exec(url);
			var items = null;
			if(null != matcher) {
				try {
					items = decodeURIComponent(decodeURIComponent(matcher[1]));
				} catch(e) {
					try {
						items = decodeURIComponent(matcher[1]);
					} catch(e) {
						items = matcher[1];
					}
				}
			}
			return items;
		}
var notesId= getUrlParam(location.href, "notesId");
$.ajax({
	 url:url,
	 xhrFields:{withCredentials: true},
                crossDomain: true,
				data:{notesId:notesId},
		    	dataType:"json",		    
		    	type:"post",
		    	success:function(data){		    	
		    		
		    		if(data.resCode==200){
		    		  var notesGzdate =data.resData.notesGzdate
		    		  var notesSex=data.resData.notesSex
		    		  var notesSymptom=data.resData.notes_symptom
		    		  var notesSizhen=data.resData.notesSizhen
		    		
		    		  var notesPathogen=data.resData.notesPathogen
		    		  var notesOnset=data.resData.notesOnset
		    		  var notesDialectical=data.resData.notesDialectical
		    		  var trickName=data.resData.trickName
		    		  var notesQuxue=data.resData.notesQuxue
		    		  var notesPrescription=data.resData.notesPrescription
		    		  var notesXinde=data.resData.notesXinde
		    		  var html=""
		    		  var text1=""
		    		  text1='<div class="all_content_bttom_top">心得体会</div>'+
					'<div class="all_content_bttom_p">'+notesXinde+'</div>'
					$('.all_content_bottom').append(text1)
		    		  html='<div class="all_content_text_list clear">'+
						'<div class="all_content_left">[跟诊时间]</div>'+
						'<div class="all_context_right">'+notesGzdate +'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[病人性别]</div>'+
						'<div class="all_context_right">'+notesSex+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[主要症状]</div>'+
						'<div class="all_context_right">'+notesSymptom+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[四诊]</div>'+
						'<div class="all_context_right">'+notesSizhen+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[病因]</div>'+
						'<div class="all_context_right">'+notesPathogen+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[病机]</div>'+
						'<div class="all_context_right">'+notesOnset+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[辩证]</div>'+
						'<div class="all_context_right">'+notesDialectical+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[临床手法]</div>'+
						'<div class="all_context_right">'+trickName+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[取穴]</div>'+
						'<div class="all_context_right">'+notesQuxue+'</div>'+
					'</div>'+
					'<div class="all_content_text_list  clear">'+
						'<div class="all_content_left">[方药]</div>'+
						'<div class="all_context_right">'+notesPrescription+'</div>'+
					'</div>'
					$('.all_content_text').append(html)
		    		}
		    		
		    	}
});