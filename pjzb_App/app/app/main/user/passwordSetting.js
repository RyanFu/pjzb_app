/**
 * Created by wsl on 2017/02/05.
 */
  'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    ScrollView,
    TouchableWithoutFeedback,
    RefreshControl,
    TouchableOpacity
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ChangeLoginPassword from './changeLoginPassword';
  import { goBack } from '../../utils/NavigatorBack';
  import ChangeTradePassword from './changeTradePassword';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class PasswordSetting extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'重置登录密码',listPress:()=>{this.props.navigator.push({component:ChangeLoginPassword,name:'ChangeLoginPassword'});},style:{marginTop:40/oPx}},
              // {leftText:'重置交易密码',listPress:()=>{this.props.navigator.push({component:ChangeTradePassword,name:'ChangeTradePassword'});},style:styles.lineTop},
          ]
      }
    }

    //功能列表生成
    _funList(row,index){
        return (
            <TouchableOpacity style={[styles.userListItem,row.style]} key={index} onPress={row.listPress}>
                <Text style={styles.leftTextStyle}>{row.leftText}</Text>
                <Image style={styles.listBtn} source={require('../../images/icon/icon_user_right.png')}/>
            </TouchableOpacity>
        )
    }
    componentDidMount(){

    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
      return (
        <View style={styles.container}>
          <NavigationBar title="密码设置" leftShowIcon={true} leftBtnFunc={this._goBack.bind(this)}  />
          <View style={styles.userListTap}>
            {
              this.state.funList.map((row, index) =>{
                  return this._funList(row,index);
              })
            }
          </View>
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
    user_icon:{
      width:137/oPx,
      height:94/oPx,
      alignSelf:'center',
    },
    button:{
      width:300/oPx,
      height:68/oPx,
      borderRadius:20,
      backgroundColor:'#f00',
      shadowColor:'#eb3331',
      shadowOffset:{h:3,w:0},
      shadowOpacity:.3,
      alignSelf:'center',
      justifyContent:'center',
    },
    button_text:{
      alignSelf:'center',
      justifyContent:'center',
      color:'#fff',
      fontSize:30/oPx
    },
    userListTap:{
        backgroundColor:'transparent',
    },
    leftTextStyle:{
        flex:1,
        alignSelf:'center',
        fontSize:28/oPx,
        color:'#333',
        marginLeft:20/oPx,
    },
    userListItem:{
        width:StyleConfig.screen_width,
        height:88/oPx,
        flexDirection:'row',
        backgroundColor:'#fff',
    },
    listBtn:{
      width:18/oPx,
      height:34/oPx,
      alignSelf:'center',
      marginRight:30/oPx,
    },
    lineTop:{
      borderColor:'#e0e0e0',
      borderTopWidth:StyleConfig.borderWidth
    }

  });
