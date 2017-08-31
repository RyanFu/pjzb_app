/**
 * Created by wsl on 2017/01/12.
 * Button 按钮的简单封装
 *示例：
 <Button
   text={'立即投资'}
   textColor={'#fff'}
   onPress={this._onPress}
   imgSource={require('../../images/index/index_exp_btn.png')}
   height={number}
   width={number}
 />
 */
 import React,{Component} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;

 export default class Button extends Component{
   constructor(props) {
     super(props);
   }
   render(){
     //初始化按钮组件
     let height = !this.props.height ? 88/oPx :this.props.height;
     let width = !this.props.width ? 576/oPx :this.props.width;
     let imgSource = !this.props.imgSource ? require('../images/index/index_exp_btn.png') : this.props.imgSource;
     let oText = this.props.text;
     let textColor = !this.props.textColor ? '#fff': this.props.textColor;
     let textSize = !this.props.textSize ? null : this.props.textSize;
     return (
       <TouchableOpacity onPress={this.props.onPress} >
         <Image style={{height:height, width:width, justifyContent:'center',alignSelf:'center'}} source={imgSource}>
           <Text style={{backgroundColor:'transparent',textAlign:'center',color:textColor,fontSize: textSize}}>
             {oText}
           </Text>
         </Image>
       </TouchableOpacity>
     )
   }
 }
