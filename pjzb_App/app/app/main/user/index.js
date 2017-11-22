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
  import LinearGradient from 'react-native-linear-gradient';
  import Request from '../../utils/Request';
  import Utils from '../../utils/utils';
  import Loading from '../../components/Loading';
  import CouponCard from '../../main/user/couponCard';
  import UserCenter from './UserCenter';
  import Recharge from './recharge';
  import Withdraw from './withdraw';
  import Setting from './setting';
  import TZGLIntroduction from './TZGLIntroduction';
  import DebtHasBuy from './debtHasBuy';
  import Funddetail from './Funddetail';
  import SLBaoPage from './SLBaoPage';
  import Loan from './LoanManagement';
  import {StyleConfig} from '../../style';
  import Error from '../error/Error.js';
  import NetUtil from '../../utils/NetUtil.js';
  const oPx = StyleConfig.oPx;
  export default class User extends Component {
    constructor(props){
      super(props);
      this.state = {
        activityList:[],
        isRefreshing:false,
        leftImageSource:global.userHeadPic ? {uri:global.userHeadPic} : require('../../images/icon/icon_header.png'),
        // funList:[
        //   {text:'投资明细',imgSource:require('../../images/icon/icon_user_invest.png'),listPress:()=>{this.props.navigator.push({component:TZGLIntroduction,name:'TZGLIntroduction'});}},
        //   {text:'资金记录',imgSource:require('../../images/icon/icon_user_record.png'),listPress:()=>{this.props.navigator.push({component:Funddetail,name:'Funddetail'})},style:styles.lineTop},
        //   {text:'生利宝',imgSource:require('../../images/icon/icon_user_slb.png'),listPress:()=>{this.props.navigator.push({component:SLBaoPage,name:'SLBaoPage'})},style:styles.lineTop},
        //   {text:'我的赠券',imgSource:require('../../images/icon/icon_user_coupon.png'),listPress:()=>{this.props.navigator.push({component:CouponCard,name:'CouponCard'})},style:styles.lineTop},
        //   {text:'债权管理',imgSource:require('../../images/icon/icon_user_deptbuy.png'),listPress:()=>{this.props.navigator.push({component:DebtHasBuy,name:'DebtHasBuy'});},style:styles.lineTop},
        //   {text:'借款管理',imgSource:require('../../images/icon/icon_user_loan.png'),listPress:()=>{this.props.navigator.push({component:Loan,name:'Loan'});},style:styles.lineTop},
        // ],
        animating:true,
        allTotal:'0.00',//总资产
        forPaySum:'0.00',//待收
        usableSum:'0.00',//可用余额
        isRegistHuiFu:false,
        nickname:'',
        headImg:'',
        msgCount:0,
        slbao: '资金随进随出 不耽误', // 生利宝总收益
        huikuanqd: '项目回款 一目了然', // 回款清单
        wodezq: '暂无可用赠券', // 我的赠券
        zijinjl: '暂无资金记录', // 资金记录
        zaiquanzr: '债权转让 周转灵活', // 债权转让
        jiekuangl: '借款灵活 还款方便', // 借款管理
        // 是否发生网络错误
        isError: false,
        NetData: [],
      }
    }
    componentDidMount(){
      this._getState();
      this._refresh();
    }
    _getState(){
      Request.post('accountOverview.do',{uid:''},(data)=>{
        let allTotal = data.allTotal;
        //parseFloat(data.usableSum) + parseFloat(data.freezeAmount) + parseFloat(data.forPaySum);
        this.setState({
          animating:false,
          usableSum:data.usableSum,
          allTotal:allTotal,
          forPaySum:data.forPaySum,
          isRefreshing:false,
          nickname:data.nickname,
          headImg:data.headImg,
          msgCount:data.count,
          slbao: data.slbao?data.slbao:this.state.slbao,
          huikuanqd: data.huikuanqd?data.huikuanqd:this.state.huikuanqd,
          wodezq: data.wodezq?data.wodezq:this.state.wodezq,
          zijinjl: data.zijinjl?data.zijinjl:this.state.zijinjl,
          zaiquanzr: data.zaiquanzr?data.zaiquanzr:this.state.zaiquanzr,
          jiekuangl: data.jiekuangl?data.jiekuangl:this.state.jiekuangl,
          // 网络正常
          isError: false,
          NetData: data,
        });
        if(data.headImg){
          this.setState({leftImageSource:{uri:data.headImg}});
          global.userHeadPic = data.headImg;
        }
        if(data.ipayAccount!=''){
          this.setState({isRegistHuiFu:true});
        }
      },(error)=>{
        this.setState({animating:false});
        if (this.state.NetData == [] || this.state.NetData == '' || this.state.NetData == null)
          this.setState({isError: true});
      });
    }

    // 每隔五分钟请求一次数据
    _refresh() {
      this.interval=setInterval(() =>{
          this._getState();
      },1000*60*5);
   }

    //功能列表生成
    _funList(row,index){
      let msg = null;
      if (index == 3 && this.state.msgCount != null && this.state.msgCount > 0) {
        msg = <Image style={styles.msgIcon} source={require('../../images/icon/icon_msg.png')}>
                  <Text style={styles.msgText}>{this.state.msgCount}</Text>
                </Image>;
      }

      return (
        <TouchableOpacity style={[styles.userListItem,row.style]} key={index} onPress={row.listPress}>
          <Image style={styles.listIcon} source={row.imgSource}/>
          <Text style={styles.listText}>{row.text}</Text>
          <View style={styles.msgView}>
            {msg}
          </View>
          <Image style={styles.listBtn} source={require('../../images/icon/icon_user_right.png')}/>
        </TouchableOpacity>
      )
    }
    //功能列表点击事件
    _listPress(index){
      alert(index)
    }
    //个人中心
    _selfCenter(){
      this.props.navigator.push({component:UserCenter,name:'UserCenter',animated:'PushLeft',params:{'nickname':this.state.nickname,'headImg':this.state.headImg}});
    }
    //设置
    _settings(){
      this.props.navigator.push({component:Setting,name:'Setting'});
    }
    //充值
    _toIpay(){
        this.props.navigator.push({component:Recharge,name:'Recharge',params:{'usableSum':this.state.usableSum,'nickname':this.state.nickname}});
    }
    //提现
    _toCash(){
        this.props.navigator.push({component:Withdraw,name:'Withdraw',params:{'nickname':this.state.nickname}});
    }
    _onPress(){
      alert('touch');
    }
    _onRefresh(){
      this.setState({isRefreshing:true});
      this._getState();
    }

    _getUserBottomView() {
        return  <View>
                  <View style={styles.userBottomView_top}>
                    <View style={styles.titleView}>
                      <Text style={styles.titleText}>我的理财</Text>
                    </View>
                    <View style={styles.iconItemView}>
                      <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:SLBaoPage,name:'SLBaoPage'})}}>
                        <Image source={require('../../images/icon/icon_user_slb.png')} style={styles.itemIcon} />
                        <View style={styles.textView}>
                          <Text style={styles.itemTitle}>生利宝</Text>
                          <Text style={styles.itemText} numberOfLines={1}>{this.state.slbao}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:TZGLIntroduction,name:'TZGLIntroduction'})}}>
                        <Image source={require('../../images/icon/icon_user_invest.png')} style={styles.itemIcon} />
                        <View style={styles.textView}>
                          <Text style={styles.itemTitle}>回款清单</Text>
                          <Text style={styles.itemText} numberOfLines={1}>{this.state.huikuanqd}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.userBottomView_top}>
                    <View style={styles.titleView}>
                      <Text style={styles.titleText}>更多</Text>
                    </View>
                    <View style={styles.iconItemView}>
                      <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:CouponCard,name:'CouponCard'})}}>
                        <Image source={require('../../images/icon/icon_user_coupon.png')} style={styles.itemIcon} />
                        <View style={styles.textView}>
                          <Text style={styles.itemTitle}>我的赠券</Text>
                          <Text style={styles.itemText} numberOfLines={1}>{this.state.wodezq}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:Funddetail,name:'Funddetail'})}}>
                        <Image source={require('../../images/icon/icon_user_record.png')} style={styles.itemIcon} />
                        <View style={styles.textView}>
                          <Text style={styles.itemTitle}>资金记录</Text>
                          <Text style={styles.itemText} numberOfLines={1}>{this.state.zijinjl}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.iconItemView, {borderBottomWidth: StyleConfig.borderWidth, borderColor: StyleConfig.borderColor,}]}>
                    <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:DebtHasBuy,name:'DebtHasBuy'})}}>
                      <Image source={require('../../images/icon/icon_user_deptbuy.png')} style={styles.itemIcon} />
                      <View style={styles.textView}>
                        <Text style={styles.itemTitle}>债权管理</Text>
                        <Text style={styles.itemText} numberOfLines={1}>{this.state.zaiquanzr}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.navigator.push({component:Loan,name:'Loan'})}}>
                      <Image source={require('../../images/icon/icon_user_loan.png')} style={styles.itemIcon} />
                      <View style={styles.textView}>
                        <Text style={styles.itemTitle}>借款管理</Text>
                        <Text style={styles.itemText} numberOfLines={1}>{this.state.jiekuangl}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>;
    }

    render(){
      let rightImageSource = require('../../images/icon/icon_settings.png')
      return (
        <View style={{flex:1}}>
          <NavigationBar
            title={"我的"}
            leftShowIcon={this.state.isError?false:true}
            leftImageSource={this.state.leftImageSource}
            leftStyle={{borderRadius:23/oPx}}
            leftBtnFunc={this.state.isError?null:this._selfCenter.bind(this)}
            rightShowIcon={this.state.isError?false:true}
            rightImageSource={rightImageSource}
            rightBtnFunc={this.state.isError?null:this._settings.bind(this)}
            beginColor={'#f3553e'}
            endColor={'#f14e40'}
          />
           {
            this.state.isError
            ?
            <Error onPress={this._getState.bind(this)} />
            :
            <ScrollView style={styles.container}
              refreshControl={
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={this._onRefresh.bind(this)}
                 tintColor="#ff0000"
                 title="刷新中..."
                 titleColor="#999"
               />}>
              <LinearGradient colors={['#f14e41', '#eb3549']} style={styles.top}>
                <View style={styles.total}>
                  <View style={styles.totalAmtView}><Text style={styles.totalAmt}>{Utils.formatCurrency(this.state.allTotal)}</Text></View>
                  <View style={styles.totalTextView}><Text style={styles.totalText}>总资产(元)</Text></View>
                </View>
                <View style={styles.userAmt}>
                  <View style={styles.userLeft}>
                    <View style={styles.userNumView}><Text style={styles.userNum}>{Utils.formatCurrency(this.state.usableSum)}</Text></View>
                    <View style={styles.userTextView}><Text style={styles.userText}>可用余额(元)</Text></View>
                  </View>
                  <View style={styles.line}>
                  </View>
                  <View style={styles.userRight}>
                    <View style={styles.userNumView}><Text style={styles.userNum}>{Utils.formatCurrency(this.state.forPaySum)}</Text></View>
                    <View style={styles.userTextView}><Text style={styles.userText}>待收总额(元)</Text></View>
                  </View>
                </View>
              </LinearGradient>
              <View style={{backgroundColor: '#fff'}}>
                <View style={styles.userCenter}>
                  <View style={{flex:1}}><Image style={styles.user_icon} source={require('../../images/icon/icon_user_pay.png')}/></View>
                  <View style={[styles.line,{height:85/oPx,backgroundColor:'#c8c9cd'}]}></View>
                  <View style={{flex:1}}><Image style={styles.user_icon} source={require('../../images/icon/icon_user_cash.png')}/></View>
                </View>
                <View style={styles.userCenter}>
                  <View style={{flex:1}}>
                    <TouchableOpacity onPress={this._toIpay.bind(this)} style={styles.button}>
                      <Text style={styles.button_text}>充值</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1}}>
                    <TouchableOpacity onPress={this._toCash.bind(this)} style={[styles.button,{backgroundColor:'#ffa44b',shadowColor:'#ffa44b',}]}>
                      <Text style={styles.button_text}>提现</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.userListTap}>
                
                  {/*this.state.funList.map((row, index) =>{ */}
                      {/*return this._funList(row,index); */}
                  {/*}) */}
               

                { this._getUserBottomView() }

              </View>
             </ScrollView>
           }
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
    msgView: {
      flex:1,
    },
    msgIcon:{
      width:30/oPx,
      height:30/oPx,
      marginTop:12/oPx,
    },
    msgText:{
      alignSelf:'center',
      fontSize:21/oPx,
      color:'#fff',
      backgroundColor:'transparent',
      marginTop:1/oPx,
    },
    lineTop:{
      borderColor:'#e0e0e0',
      borderTopWidth:StyleConfig.borderWidth
    },

    userBottomView_top: {
      height: 196/oPx,
      backgroundColor: '#fff',
      marginTop: 20/oPx,
    },
    titleView: {
      height: 75/oPx,
      marginLeft: 30/oPx,
      justifyContent: 'center',  
    },
    titleText: {
      color: '#333',
      fontSize: 32/oPx,
    },
    iconItemView: {
      height: 130/oPx,
      borderTopWidth: StyleConfig.borderWidth,
      borderColor: StyleConfig.borderColor,
      flexDirection: 'row',
    },
    itemView: {
      flex: 1,
      flexDirection:'row',
      //alignItems: 'center',
      borderLeftWidth: StyleConfig.borderWidth,
      borderColor: StyleConfig.borderColor,
      paddingLeft: 30/oPx,
      paddingTop: 30/oPx,
      backgroundColor: '#fff',
    },
    itemIcon: {
      height: 50/oPx,
      width: 50/oPx,
    },
    textView: {
      width: 250/oPx,
      marginLeft: 20/oPx,
    },
    itemTitle: {
      fontSize: 30/oPx, 
      color: '#333'
    },
    itemText: {
      fontSize: 20/oPx, 
      color: '#999', 
      marginTop: 10/oPx
    },

  });
