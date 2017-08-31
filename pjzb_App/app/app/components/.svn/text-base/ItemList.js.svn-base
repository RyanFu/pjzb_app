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
   TouchableOpacity,
   Switch
 } from 'react-native';
 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;
 export default class ItemList extends Component{
   constructor(props) {
     super(props);
   }
   render(){
     const { title,rightText,style,onPress,showIcon,showSwitch,switchValue,switchEvent,isNotClick} = this.props;
     let opacity = isNotClick==true?1:0;

     let right;
      if(showSwitch){
        right = <Switch style={styles.switch} value={switchValue} onValueChange={switchEvent}/>
      }else if(showIcon==false){
        right = <Text style={{marginRight:48/oPx}}></Text>
      }else{
        right = <Image style={styles.listIcon} source={require('../images/icon/icon_user_right.png')}/>
      }
     return (
       <TouchableOpacity style={[styles.userListItem,style]} onPress={onPress} activeOpacity={opacity}>
           <Text style={styles.leftTextStyle}>{title}</Text>
           <Text style={styles.rightTextStyle}>{rightText}</Text>
           {right}
       </TouchableOpacity>
     )
   }
 }
 const styles = StyleSheet.create({
   userListItem:{
       flex:1,
       height:88/oPx,
       flexDirection:'row',
       backgroundColor:'#fff',
   },
   leftTextStyle:{
     flex:1,
     alignSelf:'center',
     fontSize:28/oPx,
     color:'#333',
     marginLeft:20/oPx
   },
   rightTextStyle:{
       flex:1,
       alignSelf:'center',
       fontSize:22/oPx,
       textAlign:'right',
       color:'#adadad',
       marginRight:20/oPx,
   },
   listIcon:{
     width:18/oPx,
     height:34/oPx,
     alignSelf:'center',
     marginRight:30/oPx,
   },
   switch:{
    alignSelf:'center',
    marginRight:30/oPx,
   }
 })
