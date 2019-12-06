function ajax(obj){
    obj=obj||{};
    obj.data=obj.data||{};
    obj.url=obj.url||'';
    obj.type=obj.type||'get';

    //data处理一下
    let arr=[];
    for(let key in obj.data){
        arr.push(`${key}=${obj.data[key]}`)
    }
    obj.data=arr.join('&');
    
    let xhr=new XMLHttpRequest();
    if(obj.type.toLowerCase()==='get'){
        obj.url+='?'+obj.data;
    }
    xhr.open(obj.type,obj.url);
    if(obj.type.toLowerCase()==='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(obj.data);
    }else{
        xhr.send();
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            let response=xhr.responseText;
            if(xhr.getResponseHeader('Content-Type').indexOf('json')!==-1){
                response=JSON.parse(xhr.responseText);
            }
            // response=JSON.parse(xhr.responseText);

            obj.callback&&obj.callback(response);
        }
    }
    // xhr.open()
}