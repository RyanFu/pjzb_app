/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NetInfo,
} from 'react-native';

import App from './app/app';

// class App extends Component {

//   constructor(props){
//       super(props);
//       this.state = {
//       isConnected: null,
//     };
//   }

//   componentDidMount() {

//     // 监听网络改变
//     NetInfo.isConnected.addEventListener('change',function(isConnected){
//         console.log(isConnected);
//     });

//   }

//   componentWillUnmount() {
    
//   }

//   fun1() {
//     //  NetInfo.fetch().done(function(reachability){
//     //     alert(reachability);
//     // });
//     //alert(NetInfoUtil.netType);
//   }

//    fun2() {
//      NetInfo.isConnected.fetch().done(function(isConnected){
//         alert(isConnected);
//     });
//   }

//    fun3() {
//     NetInfo.isConnected.addEventListener('change',function(isConnected){
//         alert(isConnected);
//     });
//   }
  


//   render() {
//     return (
//       <View>
//         <Text onPress={this.fun1}>网络类型</Text>

//         <Text onPress={this.fun2}>获取当前网络是否连接</Text>

//         <Text onPress={this.fun3}>监听网络是否连接</Text>
//       </View>
//     );
//   }

// }

AppRegistry.registerComponent('pjzbapp', () => App);
