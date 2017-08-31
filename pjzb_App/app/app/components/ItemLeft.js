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
     const { title,style,onPress,isTop,index,content} = this.props;
     let borderBottom = null;
     if (isTop) {
         borderBottom = styles.bottomBorder;
     }
     return (
         <View>
           <TouchableOpacity style={[styles.userListItem,style,borderBottom]} onPress={()=>onPress(index)}>
               <Text style={styles.leftTextStyle}>{title}</Text>
               {
                   isTop ? <Image style={styles.listIcon} source={require('../images/find/icon_top.png')}/>
                       : <Image style={styles.listIcon} source={require('../images/find/icon_bottom.png')}/>
               }
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
   listIcon:{
     width:34/oPx,
     height:19/oPx,
     alignSelf:'center',
     marginRight:30/oPx,
   },
    bottomBorder:{
        borderColor:'#e0e0e0',
        borderBottomWidth:StyleConfig.borderWidth
   },

 })
