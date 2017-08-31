/**
 * Created by wsl on 2017/01/12.
 */

 import React,{Component} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   Platform,
   Image,
   TouchableOpacity,
   PixelRatio
 } from 'react-native';
 import {StyleConfig} from '../style';
 let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
 //状态栏高度
 const NAV_BAR_HEIGHT = 100/StyleConfig.oPx;
 let PIXEL_RATIO = StyleConfig.oPx;
 export default class NavigatorBar extends Component{
   constructor(props){
     super(props);
     this.state = {

     }
   }
   //title
   getElementTitle(){
     return (
       <View style={styles.statusTitle}>
           {
             this.props.checked ? (
                     <View style={styles.bottomBorder}>
                         <Text style={styles.statusName}>
                             {this.props.title}
                         </Text>
                     </View>
                 ) : (
                     <View style={[styles.bottomBorder, {borderBottomWidth: 0}]}>
                       <TouchableOpacity onPress={this.props.leftBtnFunc}>
                         <Text style={styles.statusName}>
                             {this.props.title}
                         </Text>
                       </TouchableOpacity>
                     </View>
                 )
           }
         <View style={{width: 75/PIXEL_RATIO}} />
           {
               this.props.checked ? (
                       <View style={[styles.bottomBorder, {borderBottomWidth: 0}]}>
                         <TouchableOpacity onPress={this.props.leftBtnFunc}>
                           <Text style={styles.statusName}>
                               {this.props.title1}
                           </Text>
                         </TouchableOpacity>
                       </View>
                   ) : (
                       <View style={styles.bottomBorder}>
                         <Text style={styles.statusName}>
                             {this.props.title1}
                         </Text>
                       </View>
                   )
           }
       </View>
     );
   }
   //left
   getLeftButtonElement(){
     //
     const { leftTitle, leftDisplay, leftBtnFunc, leftShowIcon, leftImageSource} = this.props;
     return (
       <View style={styles.leftButton}>
          {
            !leftDisplay
            ? <TouchableOpacity
               onPress={leftBtnFunc}>
               { // 左侧是图片还是文字
                 leftShowIcon
                 ? <Image
                   style={styles.statusImage}
                   source={leftImageSource}/>
                 : <Text style={[styles.statusFont,{color:'#fff'}]}>
                     {leftTitle}
                   </Text>
               }
             </TouchableOpacity>
            : null
          }
        </View>
     )
   }
   //rightButton
   getRightButtonElement(){
     //
     const { rightTitle, rightDisplay, rightBtnFunc, rightShowIcon, rightImageSource} = this.props;
     return (
       <View style={styles.rightButton}>
          {
            !rightDisplay
            ? <TouchableOpacity
               onPress={rightBtnFunc}>
               { // 左侧是图片还是文字
                 rightShowIcon
                 ? <Image
                   style={styles.statusImage}
                   source={rightImageSource}/>
                 : <Text style={[styles.statusFont,{color:'#fff'}]}>
                     {rightTitle}
                   </Text>
               }
             </TouchableOpacity>
            : null
          }
        </View>
     )
   }
   render(){
     const { statusStyle, bgColor, title, title1, leftButton, rightButton, style, } = this.props;
     console.log(this.props);
     //状态栏背景颜色
     const customStatusBarBgColor = bgColor ? { backgroundColor: bgColor } : '#f00';

     //初始化状态栏
     let statusBar = null;
     if (Platform.OS === 'ios') {
       statusBar = !this.props.hidden ?
         <View style={[styles.statusBarHeight, customStatusBarBgColor, ]} /> : null;
     }
     return (
       <View style={[
         styles.navBarContainer,
         {height: !statusBar ? NAV_BAR_HEIGHT : NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,},
         customStatusBarBgColor,
         statusStyle]
       }>
       {statusBar}
        <View style={styles.nvBarView}>
         {this.getLeftButtonElement()}
         {this.getElementTitle()}
         {this.getRightButtonElement()}
       </View>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   navBarContainer: {
     backgroundColor: '#000',
   },
   nvBarView:{
     flex: 1,
     flexDirection:'row'
   },
   statusBarHeight:{
     height:STATUS_BAR_HEIGHT
   },
   statusFont:{
     fontSize:28/PIXEL_RATIO,
   },
   statusTitle:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     flexDirection: "row",
   },
   bottomBorder: {
      width:  120/PIXEL_RATIO,
      height:  65/PIXEL_RATIO,
      borderBottomWidth: 3/PIXEL_RATIO,
      borderBottomColor: 'white',
       marginTop: 10/PIXEL_RATIO,
   },
   statusName:{
     fontSize:42/PIXEL_RATIO,
     color:'#fff',
     textAlign: 'center',
   },
   statusTitleText:{
     flex:1,
     justifyContent:'center',
   },
   leftButton:{
     marginLeft:30/PIXEL_RATIO,
     flex:1,
     justifyContent:'center',
     alignItems:'flex-start'
   },
   rightButton:{
     marginRight:30/PIXEL_RATIO,
     flex:1,
     justifyContent:'center',
     alignItems:'flex-end'
   },
   statusImage:{
     height:46/PIXEL_RATIO,
     width:46/PIXEL_RATIO,
   }

 })
