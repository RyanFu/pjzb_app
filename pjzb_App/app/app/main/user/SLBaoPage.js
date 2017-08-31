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
    TouchableOpacity,
    Alert
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import LinearGradient from 'react-native-linear-gradient';
  import Request from '../../utils/Request';
  import Utils from '../../utils/utils';
  import Loading from '../../components/Loading';
  import SLBaoManageDetail from './SLBaoManageDetail';
  import Button from '../../components/Button';
  import RegIpayPersonal from './regIpayPersonal';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import {toastShort} from '../../utils/Toast';
  import OwebView from '../../components/OwebView';
  const oPx = StyleConfig.oPx;
  export default class User extends Component {
    constructor(props){
      super(props);
      this.state = {
        animating: false,
        isRefreshing: false,
        annuRate:0.00,
        prdRate:0.00,
        totalAsset:0.00,
        totalProfit:0.00,
      }
    }

    componentDidMount(){
      this.setState({animating: true});
      this._getState();
    }

    _getState(){
      Request.post('querShengLiBaoInfo.do',{uid:''},(data)=>{
        if (data.error == 0) {
          this.setState({
            isRefreshing: false,
            animating: false,
            annuRate:data.annuRate,
            prdRate:data.prdRate,
            totalAsset:data.totalAsset,
            totalProfit:data.totalProfit,
          });

        } else if (data.error == -1) {
          this._goBack();
          Alert.alert(
              '提示信息',
              '请先注册汇付天下',
              [
                  {text: '取消', },
                  {text: '确定', onPress: () =>
                      this.props.navigator.push({component:RegIpayPersonal,name:'RegIpayPersonal',params: {
                          backUser:{true}
                      }})},
              ]
          )
        } else {
          toastShort(data.msg,-300);
        }
      },(error)=>{});
    }
    
    _onRefresh(){
      this.setState({isRefreshing:true});
      this._getState();
    }

     //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    //设置
    _settings(){
      this.props.navigator.push({component:SLBaoManageDetail,name:'SLBaoManageDetail'});
    }

    // 转入 转出
    onPress() {
      this.setState({animating: true});
      Request.post('slbaoTrading.do',{uid:''},(data)=>{
        if (data.error == 0) {
          this.setState({animating: false});
          this.props.navigator.push({
              component: OwebView,
              name: 'OwebView',
              params: {
                  url: data.html,
                  title:'转入／转出',
                  back:{true},
              }
          });
        } else {
          toastShort(data.msg,-300);
        }
      },(error)=>{
        alert(error);
      });
    }

    render(){
      let rightImageSource = require('../../images/icon/icon_settings_slbDetails_icon.png');
      let backgroundImageSource = require('../../images/user/icon_slb_background.png');
      let introduceImageSource = require('../../images/user/icon_slb_introduce.png');
      return (
        <View style={{flex:1}}>
          <NavigationBar
            title={"生利宝"}
            leftShowIcon={true}
            leftImageSource={this.state.leftImageSource}
            leftStyle={{borderRadius:23/oPx}}
            leftBtnFunc={this._goBack.bind(this)}
            rightShowIcon={true}
            rightImageSource={rightImageSource}
            rightBtnFunc={this._settings.bind(this)}
            beginColor={'#f3553e'}
            endColor={'#f14e40'}
          />
        <ScrollView style={styles.container}
          refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={this._onRefresh.bind(this)}
           />}>
          <LinearGradient colors={['#f14e41', '#eb3549']} style={styles.top}>
            <View style={styles.total}>
              <View style={styles.totalAmtView}><Text style={styles.totalAmt}>{Utils.formatCurrency(this.state.totalAsset)}</Text></View>
              <View style={styles.totalTextView}><Text style={styles.totalText}>总金额(元)</Text></View>
            </View>
            <View style={styles.userAmt}>
              <View style={styles.userLeft}>
                <View style={styles.userNumView}><Text style={styles.userNum}>{Utils.formatCurrency(this.state.totalProfit)}</Text></View>
                <View style={styles.userTextView}><Text style={styles.userText}>累积收益(元)</Text></View>
              </View>
              <View style={styles.userRight}>
                <View style={styles.userNumView}><Text style={styles.userNum}>{(this.state.prdRate)}</Text></View>
                <View style={styles.userTextView}><Text style={styles.userText}>最新收益(%)</Text></View>
              </View>
              <View style={styles.userRight}>
                <View style={styles.userNumView}><Text style={styles.userNum}>{(this.state.annuRate)}</Text></View>
                <View style={styles.userTextView}><Text style={styles.userText}>七日年化(%)</Text></View>
              </View>
            </View>
          </LinearGradient>
         
          <View style={styles.contentView}>
            <View style={styles.contentTop}>
               <Image source={backgroundImageSource} style={styles.backgroundImgStyle}>
                  <View style={styles.contentTextView}>
                      <View style={styles.imageTextView}>
                          <Image source={introduceImageSource} style={styles.introduceImgStyle} />
                          <Text style={styles.titleTextStyle}>转入流程</Text>
                      </View>
                      <Text style={[styles.contentTextStyle,{marginTop: 25/oPx}]}>1.在生利宝主界面中，选择“转入”。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>2.输入“转入金额”（最低1元）。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>3.输入“专属账户交易密码”。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>4.勾选“同意生利宝使用协议”，并点击确认转入。即可实时将闲</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>置资金转入生利宝，进行投资获取收益。</Text>
                  </View>
              </Image>
            </View>
          </View>

          <View style={[styles.contentView,{marginTop: 10/oPx, marginBottom: 10/oPx}]}>
            <View style={styles.contentTop}>
               <Image source={backgroundImageSource} style={styles.backgroundImgStyle}>
                  <View style={styles.contentTextView}>
                      <View style={styles.imageTextView}>
                          <Image source={introduceImageSource} style={styles.introduceImgStyle} />
                          <Text style={styles.titleTextStyle}>转出流程</Text>
                      </View>
                      <Text style={[styles.contentTextStyle,{marginTop: 25/oPx}]}>1.在生利宝主界面中，选择“转出”。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>2.输入“转出金额”（最低0.01元）。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>3.输入“专属账户交易密码”。</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>4.点击“确认转出”，即可实时将资金转入到P2P账户中，用户投</Text>
                      <Text style={[styles.contentTextStyle,{marginTop: 15/oPx}]}>标或还款。</Text>
                  </View>
              </Image>
            </View>
          </View>
         </ScrollView>
         <Button width={StyleConfig.screen_width+100/oPx} text="转入／转出" textSize={46/oPx} onPress={this.onPress.bind(this)} />
         <Loading show={this.state.animating} top={true}/>
       </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
    top:{
      height:377/oPx
    },
    total:{
      marginTop:36/oPx,
      height:150/oPx,
      backgroundColor:'transparent'
    },
    totalAmtView:{
      alignItems:'center',
      height:90/oPx,
    },
    totalAmt:{
      color:'#fff',
      fontSize:68/oPx,
      fontWeight:'300',
    },
    totalTextView:{
      alignItems:'center',
      height:60/oPx,
    },
    totalText:{
      fontSize:24/oPx,
      color:'#fff',
      fontWeight:'300'
    },
    userAmt:{
      marginTop:70/oPx,
      height:88/oPx,
      backgroundColor:'transparent',
      flexDirection:'row',
      justifyContent:'center'
    },
    userLeft:{
      flex:1
    },
    userRight:{
      flex:1,
    },
    userNumView:{
      alignItems:'center',
      height:54/oPx,
    },
    userNum:{
      fontSize:40/oPx,
      color:'#fff'
    },
    userTextView:{
      alignItems:'center',
      height:34/oPx,
    },
    userText:{
      fontSize:24/oPx,
      color:'#fff',
      fontWeight:'200'
    },
    line:{
      width:1/oPx,
      height:70/oPx,
      backgroundColor:'#fff',
      alignSelf:'center'
    },
    userCenter:{
      height:100/oPx,
      marginTop:20/oPx,
      flexDirection:'row',
      justifyContent:'center',
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
      shadowOffset:{height:3,width:0},
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
    userListItem:{
      flex:1,
      height:88/oPx,
      flexDirection:'row',
      backgroundColor:'#fff',
    },
    listIcon:{
      alignSelf:'center',
      width:40/oPx,
      height:40/oPx,
      marginLeft:30/oPx,
    },
    listText:{
      flex:1,
      alignSelf:'center',
      fontSize:28/oPx,
      color:'#333',
      marginLeft:20/oPx
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
    },
    contentView:{
      width: StyleConfig.screen_width-60/oPx,
      marginTop: 30/oPx,
      marginLeft: 30/oPx,
    },
    contentTop:{
      flex:1,

    },
    backgroundImgStyle:{
      width: 690/oPx,
      height: 327/oPx,
    },
    contentTextView:{
      marginTop:35/oPx,
      marginLeft:40/oPx,
    },
    imageTextView:{
      flexDirection: 'row',
    },
    introduceImgStyle:{
      width: 41/oPx,
      height: 41/oPx,
    },
    titleTextStyle:{
      fontSize: 36/oPx,
      marginLeft: 15/oPx,
      backgroundColor: 'transparent',
      marginTop: 3/oPx,
      color: '#333',
    },
    contentTextStyle: {
      fontSize: 22/oPx,
      backgroundColor: 'transparent',
      color: '#999',
    },
  });
