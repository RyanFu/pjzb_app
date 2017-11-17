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
} from 'react-native';


import {StyleConfig} from '../../style/index.js';
let oPx = StyleConfig.oPx;

export default class Error extends Component {

  render() {
    return (
		  <View style={styles.body}>
			 <Image style={styles.image} source={require('../../images/error/image_error_notNetContent.png')} />
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
