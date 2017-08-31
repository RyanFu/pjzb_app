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
import { goBack } from '../../utils/NavigatorBack';
import NavigationBar from '../../components/NavigationBar';
import RememberTradePassword from './rememberTradePassword';
import ForgetTradePassword from './forgetTradePassword';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class ChangeTradePassword extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'我记得交易密码',listPress:()=>{this.props.navigator.push({component:RememberTradePassword,name:'RememberTradePassword'});},style:{marginTop:40/oPx}},
              {leftText:'我忘记交易密码',listPress:()=>{this.props.navigator.push({component:ForgetTradePassword,name:'ForgetTradePassword'});},style:styles.lineTop},
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
          <NavigationBar title="重置交易密码" leftShowIcon={true} leftBtnFunc={this._goBack.bind(this)}  />
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
    userListTap:{
        height:200/oPx,
        backgroundColor:'transparent',
    },
    leftTextStyle:{
        flex:1,
        alignSelf:'center',
        fontSize:28/oPx,
        color:'#333',
        marginLeft:20/oPx,
        zIndex:10,
        backgroundColor:'transparent',
    },
    userListItem:{
        flex:1,
        height:88/oPx,
        flexDirection:'row',
        backgroundColor:'#fff',
        zIndex:100,
    },
    listBtn:{
        width:18/oPx,
        height:34/oPx,
        alignSelf:'center',
        marginRight:30/oPx,
        zIndex:10,
        backgroundColor:'transparent',
    },
    lineTop:{
      borderColor:'#e0e0e0',
      borderTopWidth:StyleConfig.borderWidth
    }

  });
