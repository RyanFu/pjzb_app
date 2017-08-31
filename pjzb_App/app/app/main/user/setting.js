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
    Alert,
    TouchableWithoutFeedback,
    RefreshControl,
    TouchableOpacity,
    Linking,
    Platform
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemList from '../../components/ItemList';
  import Loading from '../../components/Loading';
  import passwordSetting from './passwordSetting';
  import { goBack } from '../../utils/NavigatorBack';
  import Request from '../../utils/Request';
  import Storage from '../../utils/Storage';
  import {StyleConfig} from '../../style';
  import AppMain from '../appMain';
  import ChangeBindingMobile from './changeBindingMobile';
  import BindingEmail from './bindingEmail';
  import UserRegister from './UserRegister';
  import RegIpayPersonalPage from './regIpayPersonal';
  import LoginChinapnr from './loginChinapnr';
  import SetGesture from '../other/setGesture';
  const oPx = StyleConfig.oPx;
  export default class Setting extends Component {
    constructor(props){
      super(props);
      this.state = {
          showPhone:'',
          mobilePhone:'',
          email:'',
          ipayAccount:'',
          idNo:'',
          busiCode:'',
          gest:'set',
          funList:[
              {leftText:'手机号',rightText:'',listPress:()=>{this.props.navigator.push({component:ChangeBindingMobile,name:'ChangeBindingMobile',params:{showPhone:this.state.showPhone,mobilePhone:this.state.mobilePhone}});},style:{marginTop:40/oPx}},
              {leftText:'邮箱',rightText:'',listPress:()=>{ this.state.email==""?this.props.navigator.push({component:BindingEmail,name:'BindingEmail'}):null},style:styles.lineTop},
              {leftText:'身份认证',rightText:'',listPress:()=>{this.state.idNo==''?this.props.navigator.push({component:RegIpayPersonalPage,name:'RegIpayPersonalPage'}):null},style:styles.lineTop},
              {leftText:'密码设置',rightText:'',listPress:()=>{this.props.navigator.push({component:passwordSetting,name:'passwordSetting'});},style:styles.lineTop},
              {leftText:'手势密码',rightText:'',listPress:()=>{this.props.navigator.push({component:SetGesture,name:'SetGesture',params:{isSetOrLogn:this.state.gest}})},style:styles.lineTop},
              {leftText:'手势密码状态',rightText:'',showSwitch:true,switchValue:false,switchEvent:(e)=>{this.switchEvent(e)},style:styles.lineTop},
              {leftText:'注册汇付账户',rightText:'',listPress:()=>{(this.state.ipayAccount==''||this.state.ipayAccount==null)&&this.state.busiCode!=''?this.corpRegisterQueryApp():this.state.ipayAccount==''||this.state.ipayAccount==null?this.props.navigator.push({component:RegIpayPersonalPage,name:'RegIpayPersonalPage'}):this.loginChinapnr()},style:{marginTop:40/oPx}},
              {leftText:'版本信息',rightText:global.packageVersion,listPress:()=>{this.checkVersion()},style:styles.lineTop,showIcon:false,isNotClick:true},
          ],
          showDialog: true,
      }
    }
    componentDidMount () {
      setTimeout(()=>{this._getData()},300);
    }
    switchEvent = (e) => {
      let status = this.state.gestureStatus;
      if(e){
        if(status == '1'){
          return;
          //开启
        }else if(status == '2'){
          Request.post('openGesturesPassword.do',{uid:''},(data)=>{
            if(data.error == '0'){
              Alert.alert('提示', data.msg);
              let funList = this.state.funList;
              funList[5].switchValue = true;
              this.setState({funList:funList,gestureStatus:'1'});
              //手势密码时间
              Storage.setItem('GestTime',Date.now());
            }else{
              Alert.alert('提示', data.msg);
            }
          })
        }else if(status == '3'){
          Alert.alert('提示', '您还没有设置手势密码，是否立即去设置手势密码？', [
            {text: '确定', onPress: ()=>{
              this.props.navigator.push({component:SetGesture,name:'SetGesture',params:{isSetOrLogn:this.state.gest}});
            }},
            {text: '取消'}
          ]);
          return;
        }
      }else{
        //关闭
        if(status == '1'){
          Request.post('closeGesturesPassword.do',{uid:''},(data)=>{
            if(data.error == '0'){
              Alert.alert('提示', data.msg);
              let funList = this.state.funList;
              funList[5].switchValue = false;
              this.setState({funList:funList,gestureStatus:'2'});
              Storage.clearItem('GestTime');
            }else{
              Alert.alert('提示', data.msg);
            }
          })
        }
      }
      // let funList = this.state.funList;
      // funList[5].switchValue = e;
      // this.setState({funList:funList});
      //;
    }
    checkVersion =()=>{
      Request.post('getAppVersion.do',{uid:''},(data)=>{
        if(data.error == '0'){
          if(Platform.OS==='ios'){
            if(global.packageVersion >= data.iosVersion.version){
              // Alert.alert('提示','您的版本已经是最新版本！',[{text: '确定'}]);
            }else{
              Alert.alert('提示', '您的应用版本已更新,请前往苹果应用商店下载新的版本', [
                {text: '确定', onPress: ()=>{data.iosVersion.downloadPath && Linking.openURL(data.iosVersion.downloadPath)}},
                {text: '取消'}
              ]);
            }
          }else{
            if(global.packageVersion >= data.androidVersion.version){
              Alert.alert('提示','您的版本已经是最新版本！',[{text: '确定'}]);
            }else{
              Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                {text: '确定', onPress: ()=>{data.androidVersion.downloadPath && Linking.openURL(data.androidVersion.downloadPath)}},
                {text: '取消'}
              ]);
            }
          }
        }
      });
    }
    _getData(){
        //ajax
        Request.post('safeCenterData.do',{
            uid: '',
        },async (data)=>{
            if(data.error == 0){
              console.log(data);
                let funList = this.state.funList;
                if(data.gestureMap){
                    funList[4].leftText = '手势密码修改';
                    this.setState({gest:'change'});
                }else{
                    funList[4].leftText = '手势密码设置';
                }
                // 手机号
                funList[0].rightText = data.map.cellPhone;
                // 邮箱
                if(data.usermap.email==''){
                    funList[1].rightText = '添加邮箱';
                } else {
                    funList[1].rightText = data.usermap.email;
                    funList[1].showIcon = false;
                }
                // 身份证
                if(data.map.idNo==''){
                    funList[2].rightText = '一旦实名认证通过将不能修改';
                } else {
                    funList[2].rightText =data.map.realName + '  ' + data.map.idNo;
                    funList[2].showIcon = false;
                }

                //判断是否企业开户
                if(data.usermap.ipayAccount!=''&& data.usermap.ipayAccount!=null){
                    funList[6].leftText = '登录汇付';
                } else {
                    if(data.usermap.busiCode!=''&&data.usermap.busiCode!=null){
                        funList[6].leftText = '查看企业账户申请状态';
                        this.setState({
                            busiCode:data.usermap.busiCode,
                        });
                    } else {
                        funList[6].leftText = '注册汇付账户';
                    }
                }
                //手势密码
                let gestureStatus;
                if(data.gestureMap && data.gestureMap.password && data.gestureMap.status=='1'){
                  funList[5].switchValue = true;
                  gestureStatus = '1';
                }else if(data.gestureMap && data.gestureMap.status=='2'){
                  funList[5].switchValue = false;
                  gestureStatus = '2';
                }else if(!data.gestureMap){
                  gestureStatus = '3';
                }else{
                  gestureStatus = '99';
                }
                this.setState({
                    showDialog:false,
                    showPhone:data.map.cellPhone,
                    mobilePhone:data.usermap.mobilePhone,
                    funList: funList,
                    email:data.usermap.email,
                    ipayAccount:data.usermap.ipayAccount,
                    idNo:data.map.idNo,
                    gestureStatus:gestureStatus
                });

            } else {
                this.setState({showDialog:false});
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            this.setState({showDialog:false});
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });

    }

    //查看企业账户申请状态
    corpRegisterQueryApp(){
          let params = { uid:'',pageType:'reactAPP'};
          //alert(this.state.repayWay);
          Request.post('corpRegisterQueryApp.do',params,(data)=>{
              if(data.error == '0'){
                  //刷新本页面
                  Alert.alert(
                      '提示',
                      data.msg,
                      [{text: '确认', onPress: () => this._getData()},]
                  );
              }else{
                  Alert.alert('提示',data.msg);
              }
          },(error)=>{
              Alert.alert('提示','您的网络不稳定，请稍后再试！');
          });

      }

      loginChinapnr(){
          let params = {ipayAccount:this.state.ipayAccount,pageType:'reactAPP',uid:''};

          //alert(this.state.repayWay);

          Request.post('loginChinapnr.do',params,(data)=>{
              if(data.error == '0'){
                  this.props.navigator.push({
                      component: LoginChinapnr,
                      name: 'LoginChinapnr',
                      params: {
                          html: data.chinapnrHtml,
                      }
                  });
              }else{
                  Alert.alert('提示',data.msg);
              }
          },(error)=>{
              Alert.alert('提示','您的网络不稳定，请稍后再试！');
          });
      }

    //功能列表生成
    _funList(row,index){
      return (
          <ItemList title={row.leftText} ref={"ItemList"+index} rightText={row.rightText} style={row.style} onPress={row.listPress} showIcon={row.showIcon} key={index} showSwitch={row.showSwitch} switchValue={row.switchValue} switchEvent={row.switchEvent} isNotClick={row.isNotClick}/>
      )
    }

    onPressExit = async() =>{
      global.USER = null;
      global.userHeadPic = null;
      global.gestTime = null;
      await Storage.clear();
      this.props.navigator.resetTo({component:AppMain,name:'AppMain'});
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
      return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
              <NavigationBar
              title="设置"
              leftShowIcon={true}
              leftBtnFunc={this._goBack.bind(this)}
              />
              <View style={styles.userListTap}>
                {
                  this.state.funList.map((row, index) =>{
                      return this._funList(row,index);
                  })
                }
              </View>

              <TouchableOpacity style={[styles.userListItem,{marginTop:40/oPx}]} onPress={this.onPressExit}>
                  <Text style={styles.centerTextStyle}>退出登录</Text>
              </TouchableOpacity>
             </ScrollView>
            <Loading show={this.state.showDialog} top={true}/>
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

    },
    centerTextStyle:{
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        fontSize:28/oPx,
        color:'#333',
    },
    userListItem:{
        flex:1,
        height:88/oPx,
        flexDirection:'row',
        backgroundColor:'#fff',
    },
    lineTop:{
      borderColor:'#e0e0e0',
      borderTopWidth:StyleConfig.borderWidth
    }

  });
