/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import {StyleConfig} from '../style';
import NavigationBar from './NavigationBar';
import AppMain from '../main/appMain';
let oPx = StyleConfig.oPx;
export default class Result extends Component{
  constructor(props) {
      super(props);
  }
  _toIndex(){
    this.props.navigator.resetTo({component:AppMain,name:'AppMain'});
  }
	render(){
		return (
      <View style={{flex:1}}>
        <NavigationBar
          title={'返回结果'}
          leftShowIcon={false}
        />
    		<View style={[styles.flex,styles.body]}>
      		  <View style={styles.container}>
        			<View style={styles.successImageContainer}>
        			{
                this.props.error=='0'?
                <Image style={styles.successImage} source={require('../images/icon/icon_result_success.png')}/>:
                <Image style={styles.successImage} source={require('../images/icon/icon_result_fail.png')}/>
              }
        			</View>
        			<View style={styles.textContainer}>
        				<Text style = {styles.textFont}>{this.props.result}</Text>
        			</View>
        			<View style={styles.btnContainer}>
                <TouchableOpacity onPress={this._toIndex.bind(this)} style={styles.button}>
                  <Text style={styles.button_text}>返回首页</Text>
                </TouchableOpacity>
        			</View>
      		  </View>
  	    </View>
      </View>
		);
	}
};

const styles = StyleSheet.create({
  body:{
  	width:StyleConfig.screen_width,
  	height:StyleConfig.screen_height,
  	backgroundColor:'#FFFFFF'
  },
  flex: {
	   flex: 1
  },
  container: {
  	height:448/StyleConfig.oPx,
  	width:StyleConfig.screen_width,
  },
  successImageContainer:{
	  flexDirection: 'row',
	  height:210/StyleConfig.oPx,
    justifyContent:'center',
  },
  successImage:{
    marginTop:70/StyleConfig.oPx,
	  height:130/StyleConfig.oPx,
	  width:130/StyleConfig.oPx,
  },
  textContainer:{
  	height:70/StyleConfig.oPx,
    width:StyleConfig.screen_width-40,
    alignSelf:'center',
  	justifyContent:'center',
    alignItems:'center',
    marginBottom:60/oPx,
    marginTop:50/oPx,
  },
    /**文字字体*/
  textFont: {
    fontSize:36/oPx,
    color:'#333',
  },
  btnContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:StyleConfig.screen_width-60/StyleConfig.oPx,
    height:88/oPx,
    borderRadius:88/oPx,
    backgroundColor:'#eb3331',
    shadowColor:'#eb3331',
    shadowOffset:{height:3,width:0},
    shadowOpacity:.3,
    alignSelf:'center',
    justifyContent:'center',
  },
  button_text:{
    color:'#fff',
    fontSize:30/oPx,
    textAlign:'center',
    backgroundColor:'transparent'
  },
});
