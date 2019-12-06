function ajax(obj){
  obj=obj||{};
  obj.url=obj.url||'';
  obj.data=obj.data||{};
  obj.type=obj.type||'get';

  //遍历data
  let arr=[];
  for(let key in obj.data){
    arr.push(`${key}=${obj.data[key]}`)
  }
  obj.data=arr.join('&');

  let xhr=new XMLHttpRequest();
  if(type.toLowerCase()=='get'){
    obj.url+='?'+obj.data;
  }
  if(type.toLowerCase()=='post'){
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(obj.data);
  }else{
    xhr.send(obj.data);
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      let response=xhr.responseText;
      if(xhr.getResponseHeader('Content-Type').indexOf('json')!==0){
        response=JSON.parse(xhr.responseText);
      }
      obj.callback && obj.callback(response);
    }
  }
}