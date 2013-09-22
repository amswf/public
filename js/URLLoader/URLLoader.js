(function(window){
	window.com = window.com || {};
	var net = window.com.net = window.com.net || {};
	net.URLLoader = function(){
		var http;
		var event = {};
		if(window.ActiveXObject){
			http = new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest){
			http = new window.XMLHttpRequest();
		};
		http.onreadystatechange = function() { 
            if (http.readyState == 4) {  
                if ((http.status >= 200 && http.status < 300) || http.status == 304) { //成功
                    if(event.hasOwnProperty('success'))event.success(http.responseText || http.responseXML);
                } else if (http.status >= 400) { //客户端出错，404啊神马的
                    if(event.hasOwnProperty('error'))event.error(http.status);
                }
            } 
        };
		return{
			success:"success",
			error:"error",
			load:function(url,method){
				http.open(method,url,true);
				http.send(null);
			},
			addEventListener:function(type,fun){
				event[type] = fun;
			},
			close:function(){
				http.abort();
			}
		};
	}
})(window)