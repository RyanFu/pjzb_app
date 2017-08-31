/**
 * Created by wsl on 2017/02/13.
 */
let AmtRegExp =/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/

import {
    Alert,
} from 'react-native';
import Storage from './Storage';
import Login from '../main/other/login';

var Email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
let Utils = {
  /*金额逗号添加
   * @param value 输入的金额
   * @auth wsl
   */
  formatCurrency:(value)=>{
    let ostr = Number(value).toFixed(2)+'';
    if(ostr.indexOf('.')>0){
      let ls = ostr.substring(ostr.indexOf('.'));
      let num = ostr.substring(0,ostr.indexOf('.'));
      return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+ls;
    }else{
      let num = ostr+'';
      return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+'.00';
    }
  },
  isMoney:(value)=>{
    if(!AmtRegExp.test(value)){
  		return true;
  	}else{
  		return false;
  	}
  },
  isLogin: async (nav,callback,loginCallBack)=>{
    let data = await Storage.getItem('USER');
    if(data){
      callback(data);
    }else{
      Alert.alert(
          '提示信息',
          '您还未登录，请先登录！',
          [
            {text: '取消' },
            {text: '确定', onPress: () => nav.push({component:Login,name:'Login',params:{back:true,loginCallBack:loginCallBack}})},
          ]
        )
    }
  },
  isEmail:(value)=>{
      if(Email.test(value)){
          return true;
      }else{
          return false;
      }
  },
  isGestLock:async()=>{
    let lastTime = await Storage.getItem('GestTime');
    let nowTime = Date.now();
    if(lastTime && (nowTime-lastTime)>1000){
      return true;
    }else{
      return false;
    }
  }
}
export default Utils;
