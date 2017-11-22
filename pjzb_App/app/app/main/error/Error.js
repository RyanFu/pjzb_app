/**
 * 无网络连接时显示页面
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  PixelRatio,
  View,
  Image,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
  NetInfo,
  ActivityIndicator,
} from 'react-native';

import {StyleConfig} from '../../style/index.js';
import {toastShort} from '../../utils/Toast.js';
let oPx = StyleConfig.oPx;

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    // 监听网络连接，连接网络自动刷新数据
    NetInfo.addEventListener(
      'connectionChange',
      this.props.onPress
    );

  }

  componentWillUnmount() {
    // 当组件销毁时remove掉监听事件
    NetInfo.removeEventListener('connectionChange');
  }

  onPress = () => {
    this.props.onPress();

    // 如果没有网络，点击刷新那么展示刷新图标5秒后隐藏，此方案时为了解决在NetInfo方法内部无法设置state的值而做的折中方案
    this.setState({ isShow: true });
    this.interval = setTimeout(() =>{
      this.interval&&clearInterval(this.interval);
      this.setState({ isShow: false });
    },5000);

    // 判断如果没有网络情况下点击刷新，提示用户当前无网络
    NetInfo.isConnected.fetch().done(function(isConnected){
        if(!isConnected) {
          NetInfo.fetch().done(function(reachability){
            if(reachability == 'none' || reachability == 'NONE'){
              toastShort('当前设备未连接网络',0);
            }
          });
        }
    });

  }
 
  render() {
    return (
      <TouchableOpacity style={styles.body} activeOpacity={0.8} onPress={() => this.onPress()}>
		     <Image style={styles.image} source={require('../../images/error/image_error_notNetContent.png')} />
          <View style={styles.activityView}>
            {
              this.state.isShow ? <ActivityIndicator /> : null
            }
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#E9ECF3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
    	color: '#999',
    	fontSize: 32/oPx,
    },
    image: {
    	width: 201/oPx,
    	height: 264/oPx,
      marginBottom: 30/oPx,
    },
    activityView: {
      height: 50/oPx,
    },
    
});
