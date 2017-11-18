/**
 * Created by wsl on 2017/01/13.
 */
 // let HOST='http://192.168.1.168:8080/pjzb';
 
let HOST='http://192.168.1.124:8080/pjzb'; 

// let HOST='http://120.78.89.202:8080/pjzb';

// let HOST='https://www.pujinziben.com';
let URL = HOST+'/reactapp/';

import {
  NetInfo,
} from 'react-native';

import fetchUtil from './fetch-polyfill';
import {toastShort} from './Toast.js';
import Storage from './Storage';

let Request = {
   post : async (url,data,successCallback,failCallback) => {
      let user = await Storage.getItem('USER');
      let data_gloabl = data.hasOwnProperty("uid")?{
             pageType:"reactAPP",
             uid:user?user.UID:''
           }:{
            pageType:"reactAPP"
          };
      let postData = Object.assign(data,data_gloabl);
      fetchUtil(URL+url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 5 * 1000,
        body:JSON.stringify(postData)
      })
      .then((response) => response.json())
      .then((responseData) => {
          successCallback(responseData);
      })
      .catch((error) => {
        if(failCallback)
          failCallback(error);

        NetInfo.isConnected.fetch().done(function(isConnected){
          NetInfo.fetch().done(function(reachability){
            if(reachability != 'none'){
              toastShort('请求超时，请重试或检查您的网络设置',0);
            }
          });
        });
      });
  },
  get:(url,data,successCallback,failCallback) =>{
    let data_gloabl = {
      pageType:"reactAPP"
    };
    let postData = Object.assign(data,data_gloabl);
    fetch(URL+url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
        successCallback(responseData);
    })
    .catch((error) => {
        failCallback(error);
    });
  },
}

// 公司动态，媒体报道，平台公告pc端页面地址
let pcWeChatPath = HOST + '/WEB-PC/news_mobile.html';
let wapWeChatPath = HOST + '/wap/app.html#!/dynamicdetail';


//方便外部调用
Request.HOST=HOST;
Request.URL=URL;
Request.pcWeChatPath=pcWeChatPath;
Request.wapWeChatPath=wapWeChatPath;

export default Request;