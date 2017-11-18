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
} from 'react-native';

import {StyleConfig} from '../../style/index.js';
import {toastShort} from '../../utils/Toast.js';
let oPx = StyleConfig.oPx;

export default class Error extends Component {

  onPress = () => {
    this.props.onPress();

    NetInfo.isConnected.fetch().done(function(isConnected){
      NetInfo.fetch().done(function(reachability){
        if(reachability == 'none'){
          toastShort('当前设备未连接网络',0);
        }
      });
    });

  }
 
  render() {
    return (
		  <View style={styles.body}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.onPress()}>
			     <Image style={styles.image} source={require('../../images/error/image_error_notNetContent.png')} />
        </TouchableOpacity>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#E9ECF3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
    	color: '#999',
    	fontSize: 32/oPx,
    },
    image: {
    	width: 284/oPx,
    	height: 250/oPx,
    },
    
});
