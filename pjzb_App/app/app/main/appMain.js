/**
 * Created by wsl on 2017/01/13.
 */
 'use strict';

 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   PixelRatio,
   Dimensions,
   Alert,
 } from 'react-native';

 import TabNavigator from 'react-native-tab-navigator';
 import Invest from './invest/Invest';
 import Index from './index/index';
 import Find from './find/find';
 import Activity from './activity';
 import User from './user';
 import Login from './other/login';
 import {StyleConfig} from '../style';
 import Storage from '../utils/Storage';
 import Utils from '../utils/utils';
 import SetGesture from './other/setGesture';
 import Request from '../utils/Request';
 
 // 版本更新提示组件
 import VersionUpdate from '../components/VersionUpdate';
 // 领取红包组件
 import RedEnvelope from '../components/RedEnvelope';

 // 热更新
 import ThermalRenewal from '../components/ThermalRenewal';

 export default class AppMain extends Component {
   constructor(props){
     super(props);
     this.state = {
       selectedTab:props.selectedTab||'home',
       // 是否显示版本更新提示组件
       isShowVersion: false,
       // 版本数据map
       vMap: [],
       // 发现图片
       findImage: props.findImage?props.findImage:<Image source={require("../images/icon/icon_find_left.png")} style={styles.iconStyle}/>,
       // 填写风险评估次数
       riskCount: 1,
       // 红包数据
       redEnvelopeMap: [],
     }
     //alert('像素密度为'+PixelRatio.get());
     //alert('200转化为像素值为'+PixelRatio.getPixelSizeForLayoutSize(200))
   }

  _setFindImage() {
    this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
  }

   async _myAccount(){
       //Utils.isLogin(this.props.navigator,()=>this.setState({ selectedTab: 'user' }));
       let data = await Storage.getItem('USER');
       let GestTime = await Storage.getItem('GestTime');
       let unGestLock = await Storage.getItem('unGestLock');
       let nowTime = Date.now();
       if(data){
          if(data.GESTPWD){
            //针对之前已经设置过手势密码的用户
            Storage.clear();
            this.props.navigator.push({component:Login,name:'Login',params:{noRight:true}});
            this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
          }else if(GestTime){
            if(GestTime && (nowTime-GestTime)>1800000){
              this.props.navigator.push({component:SetGesture,name:'SetGesture',params:{findOnPress: this._setFindImage.bind(this)}});
            }else{
              Storage.setItem('GestTime',nowTime);
              this.setState({ selectedTab: 'user' });

              this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
            }
          }else if(unGestLock){
            this.setState({ selectedTab: 'user' });

            this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
          }else{
            Request.post('queryGesturesPassword.do',{uid:''},(data)=>{
              //已设置手势密码，但是第一次使用手势密码验证
              if(data.map){
                if(data.map.status == '1'){
                  Storage.setItem('GestTime',nowTime);
                  this.setState({ selectedTab: 'user' });
                }else{
                  this.setState({ selectedTab: 'user' });
                }

                this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
              }else{
                //没有设置手势密码，直接进入我的账户
                Alert.alert('提示', '您当前没有设置手势密码，为了账户安全，建议您立即设置手势密码！', [
                    {text: '设置', onPress: ()=>{this.props.navigator.push({component:SetGesture,name:'SetGesture',params:{isSetOrLogn:'set'}})}},
                    {text: '不设置', onPress: ()=>{
                      Storage.setItem('unGestLock',true);
                      this.setState({ selectedTab: 'user' });
                    }}
                ]);

                this.setState({findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/>});
              }
            }, (error) => {
              this.setState({ selectedTab: 'user' });
            });

          }
       }else{
           Alert.alert(
               '提示信息',
               '您还未登录，请先登录！',
               [
                   {text: '取消' },
                   {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
               ]
           )
       }
   }

   // app版本更新提示方法
   _showVersionUpdate = (isShowVersion, vMap) => {
      if (isShowVersion && vMap) {
        this.setState({
          isShowVersion: isShowVersion,
          vMap: vMap,
        });
      }
   }

   // 领取红包方法
   _showRedEnvelope = (isShowRedEnvelope, redEnvelopeMap, _goCouponCard) => {
      if (isShowRedEnvelope && redEnvelopeMap) {
        this.setState({
          redEnvelopeMap: redEnvelopeMap,
          isShowRedEnvelope: isShowRedEnvelope,
          _goCouponCard: _goCouponCard,
        });
      }
   }

   render(){
     return (
       <View style={{flex:1}}>
       <TabNavigator tabBarStyle={styles.TabNavigator}>
         <TabNavigator.Item
           title="首页"
           selected={this.state.selectedTab === 'home'}
           selectedTitleStyle={styles.selectedTextStyle}
           titleStyle={styles.textStyle}
           renderIcon={() => <Image source={require("../images/icon/icon_index.png")} style={styles.iconStyle}/>}
           renderSelectedIcon={() => <Image source={require("../images/icon/icon_index_h.png")} style={styles.iconStyle}/>}
           onPress={() => this.setState({ selectedTab: 'home', findImage: <Image source={require("../images/icon/icon_find_left.png")} style={styles.iconStyle}/> })}>
           <Index {...this.props} _showVersionUpdate={this._showVersionUpdate} _showRedEnvelope={this._showRedEnvelope} />
         </TabNavigator.Item>
         <TabNavigator.Item
           title="投资"
           selected={this.state.selectedTab === 'index'}
           selectedTitleStyle={styles.selectedTextStyle}
           titleStyle={styles.textStyle}
           renderIcon={() => <Image source={require("../images/icon/icon_invest.png")} style={styles.iconStyle}/>}
           renderSelectedIcon={() => <Image source={require("../images/icon/icon_invest_h.png")} style={styles.iconStyle}/>}
           onPress={() => this.setState({ selectedTab: 'index', findImage: <Image source={require("../images/icon/icon_find_left.png")} style={styles.iconStyle}/> })}>
           <Invest {...this.props}/>
         </TabNavigator.Item>
         <TabNavigator.Item
           title="发现"
           selected={this.state.selectedTab === 'find'}
           selectedTitleStyle={styles.selectedTextStyle}
           titleStyle={styles.textStyle}
           renderIcon={() => this.state.findImage}
           renderSelectedIcon={() => <Image source={require("../images/icon/icon_find_h.png")} style={styles.iconStyle}/>}
           onPress={() => this.setState({ selectedTab: 'find' })}>
           <Find {...this.props}/>
         </TabNavigator.Item>
         <TabNavigator.Item
           title="活动"
           selected={this.state.selectedTab === 'activity'}
           selectedTitleStyle={styles.selectedTextStyle}
           titleStyle={styles.textStyle}
           renderIcon={() => <Image source={require("../images/icon/icon_activity.png")} style={styles.iconStyle}/>}
           renderSelectedIcon={() => <Image source={require("../images/icon/icon_activity_h.png")} style={styles.iconStyle}/>}
           onPress={() => this.setState({ selectedTab: 'activity', findImage: <Image source={require("../images/icon/icon_find_right.png")} style={styles.iconStyle}/> })}>
           <Activity {...this.props}/>
         </TabNavigator.Item>
         <TabNavigator.Item
           title="我的"
           selected={this.state.selectedTab === 'user'}
           selectedTitleStyle={styles.selectedTextStyle}
           titleStyle={styles.textStyle}
           renderIcon={() => <Image source={require("../images/icon/icon_user.png")} style={styles.iconStyle}/>}
           renderSelectedIcon={() => <Image source={require("../images/icon/icon_user_h.png")} style={styles.iconStyle}/>}
           onPress={this._myAccount.bind(this)}>
           <User {...this.props}/>
         </TabNavigator.Item>
       </TabNavigator>

      {/* 版本更新提示组件 */}
      <VersionUpdate vMap={this.state.vMap} isShowVersion={this.state.isShowVersion} onPress={() => {this.setState({isShowVersion: false})}} />

      {/* 领取红包组件 */}
      <RedEnvelope redEnvelopeMap={this.state.redEnvelopeMap} isShowRedEnvelope={this.state.isShowRedEnvelope} onPress={() => {this.setState({isShowRedEnvelope: false})}} _goCouponCard={this.state._goCouponCard} />

      {/* 热更新组件 正式环境不要注释！！！，打测试包时注释不会更新 */}
      <ThermalRenewal />
      
     </View>
     )
   }

 }
 const styles = StyleSheet.create({
    TabNavigator:{
      backgroundColor:'#fff',
      borderColor:'#ccc',
      borderTopWidth:StyleConfig.borderWidth,
      shadowColor:'#000',
      shadowOffset:{height:0,width:0},
      shadowOpacity:.2
    },
    activity:{
      width:StyleConfig.screen_width,
      height:StyleConfig.screen_height,
      position:'absolute',
      top:0,
      left:0,
      zIndex:100,
    },
    iconStyle:{
        width:48/StyleConfig.oPx,
        height:48/StyleConfig.oPx
    },
    textStyle:{
        color:'#777',
        marginBottom:4
    },
    selectedTextStyle:{
        color:'#eb3331',
    }
 });
