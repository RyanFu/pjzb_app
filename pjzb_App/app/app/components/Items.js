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
 export default class ItemList extends Component{
   constructor(props) {
     super(props);
   }
   render(){
     const { title1,title2,title3,style,onPress,isTop,index,content} = this.props;
     let borderBottom = null;
     if (isTop) {
         borderBottom = styles.bottomBorder;
     }
     return (
         <View style={styles.bottomBorder}>
           <TouchableOpacity style={[styles.userListItem,style,borderBottom]} onPress={()=>onPress(index)}>
               <Text style={[styles.leftTextStyle,{marginLeft: 30/oPx}]}>{title1}</Text>
               <Text style={styles.leftTextStyle}>{title2}</Text>
               <Text style={styles.leftTextStyle}>{title3}</Text>
           </TouchableOpacity>
             {
                 isTop ? content : null
             }
         </View>
     )
   }
 }
 const styles = StyleSheet.create({
   userListItem:{
       height:88/oPx,
       flexDirection:'row',
       backgroundColor:'#fff' ,
       marginTop: 0,
       marginBottom: StyleConfig.borderWidth,
   },
   leftTextStyle:{
        flex: 1,
        fontSize:28/oPx,
        color:'#333',
        lineHeight: 36,
   },
    bottomBorder:{
        borderColor: StyleConfig.borderColor,
        borderBottomWidth:StyleConfig.borderWidth,
   },

 })
