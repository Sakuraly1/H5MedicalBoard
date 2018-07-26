import { buildingId, baseUrl } from'../config.js'
export function formatDate(){
    let now_time = new Date();
    let time = {
        time:"",
        date:"",
        week:""
    }
    if( now_time.getMinutes()< 10){
        time.time =  now_time.getHours()+ ":0"+now_time.getMinutes()
    }else{
        time.time =  now_time.getHours()+":"+now_time.getMinutes() 
    }
    
    time.date =  now_time.getFullYear()+"."+ (now_time.getMonth()+1)+"."+now_time.getDate();
    let weekList = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
    time.week = weekList[now_time.getDay()];
    return time;
}

export function get( api, parameters){
    parameters = parameters+"&bdid="+buildingId + '&bdId=' + buildingId;
    let settings = {
        method: 'GET',
        header: {
            "Content-Type": "application/json;charset=utf-8"
        }
    };
    return fetch( baseUrl + "/"+api+"?"+parameters, settings).then(response => {
        return response.json();
    }).then(data => {
      return  data.data
    }).catch(err => {
        console.log(err.toString());
    })
}

export function post( api,body){
    let settings = {
        method: 'POST',
        header: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify( body)
    };
    return fetch( baseUrl+ "/"+api, settings).then(response => {
        return response.json();
    }).then(data => {
      return  data.data
    }).catch(err => {
        console.log(err.toString());
    })
}