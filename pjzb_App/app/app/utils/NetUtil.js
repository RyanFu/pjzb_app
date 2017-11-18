/**
 * 网络断开连接提醒组件
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NetInfo,
  View,
} from 'react-native';

import {toastShort} from './Toast';

export default class Index extends Component {

	componentDidMount(){
		// 监听网络改变
		NetInfo.isConnected.addEventListener('change',function(isConnected){
			if (!isConnected) {
			  NetInfo.isConnected.fetch().done(function(isConnected){
			    if (!isConnected) // 当前无网络
			      toastShort('已断开网络连接，请检查您的网络设置',0);
			  });
			} else { // 从无网络切换到有网络，重新获取数据
			  // toastShort('设备已连接到网络',0);
			}
		});
   }

   componentWillUnmount() {
      // 删除监听
      NetInfo.isConnected.removeEventListener('change');
   }

	render() {
   		return(
   			<View />
		);
    }

}



AppRegistry.registerComponent('app', () => App);

