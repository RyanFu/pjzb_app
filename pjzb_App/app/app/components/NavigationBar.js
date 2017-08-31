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
 import LinearGradient from 'react-native-linear-gradient';
 import {StyleConfig} from '../style';
 let oPx = StyleConfig.oPx;
 let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
 //状态栏高度
 const NAV_BAR_HEIGHT = 100/StyleConfig.oPx;
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
         <Text style={styles.statusName} numberOfLines={1}>
           {this.props.title}
         </Text>
       </View>
     );
   }
   //left
   getLeftButtonElement(){
     //
     const { leftTitle, leftDisplay, leftStyle, leftBtnFunc, leftShowIcon, leftImageSource} = this.props;
     return (
       <View style={styles.leftButton}>
          {
            !leftDisplay
            ? <TouchableOpacity
                    style={styles.btn}
               onPress={leftBtnFunc}>
               { // 左侧是图片还是文字
                 leftShowIcon
                 ? <Image
                   style={[styles.statusImage,leftStyle?leftStyle:null]}
                   source={leftImageSource==null?require('../images/icon/icon_left.png'):leftImageSource}/>
                 : <Text style={[styles.statusFont,{color:'#fff'}]} numberOfLines={1}>
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
                style={[styles.btn,{alignItems:'flex-end'}]}
               onPress={rightBtnFunc}>
               { // 左侧是图片还是文字
                 rightShowIcon
                 ? <Image
                   style={styles.statusImage}
                   source={rightImageSource}/>
                 : <Text style={[styles.statusFont,{color:'#fff'}]} numberOfLines={1}>
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
     const { statusStyle, bgColor, title, leftButton, rightButton, style, withOutLinearGradient,beginColor,endColor} = this.props;
     //状态栏背景颜色
     //const customStatusBarBgColor = bgColor ? { backgroundColor: bgColor } : 'transparent';
     let linerColor = !beginColor?['#f3553e', '#eb3549']:[beginColor, endColor];
     //初始化状态栏
     let statusBar = <View style={[styles.statusBarHeight, ]} />;
     return (
       withOutLinearGradient ? <View style={[
         styles.navBarContainer,
         styles.transparent,
         {height: !statusBar ? NAV_BAR_HEIGHT : NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,},
         //customStatusBarBgColor,
         statusStyle]
       }>
       {statusBar}
        <View style={styles.nvBarView}>
         {this.getLeftButtonElement()}
         {this.getElementTitle()}
         {this.getRightButtonElement()}
       </View>
     </View> : <LinearGradient colors={linerColor} style={[
       styles.navBarContainer,
       {height: !statusBar ? NAV_BAR_HEIGHT : NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,},
       //customStatusBarBgColor,
       statusStyle]
     }>
     {statusBar}
      <View style={styles.nvBarView}>
       {this.getLeftButtonElement()}
       {this.getElementTitle()}
       {this.getRightButtonElement()}
     </View>
   </LinearGradient>
     )
   }
 }

 const styles = StyleSheet.create({
   navBarContainer: {
   },
   transparent:{
     backgroundColor:'transparent'
   },
   nvBarView:{
     flex: 1,
     flexDirection:'row'
   },
   statusBarHeight:{
     height:STATUS_BAR_HEIGHT
   },
   statusFont:{
     fontSize:28/oPx,
     backgroundColor:'transparent'
   },
   statusTitle:{
     flex:2,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'transparent'
   },
   statusName:{
     fontSize:42/oPx,
     color:'#fff',
     backgroundColor:'transparent'
   },
   statusTitleText:{
     flex:1,
     justifyContent:'center',
     backgroundColor:'transparent'
   },
   leftButton:{
     marginLeft:30/oPx,
     flex:1,
     justifyContent:'center',
     alignItems:'flex-start'
   },
   rightButton:{
     marginRight:30/oPx,
     flex:1,
     justifyContent:'center',
     alignItems:'flex-end'
   },
   statusImage:{
     height:46/oPx,
     width:46/oPx,
   },
   btn: {
       width:130/oPx,
       height:100/oPx,
       justifyContent:'center',
   },

 })
