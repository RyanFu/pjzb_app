/**
 * Created by wsl on 2017/02/08.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   RefreshControl,
   ActivityIndicator,
   TextInput,
   Alert,
 } from 'react-native';

 import NavigationBar from '../../components/NavigationBar';
 import Calculator from '../other/earningsCalculator';
 import UserRegister from '../user/UserRegister';
 import { goBack } from '../../utils/NavigatorBack';
 import LinearGradient from 'react-native-linear-gradient';
 import Request from '../../utils/Request';
 import Loading from '../../components/Loading';
 import Result from '../../components/Result';
 import OwebView from '../../components/OwebView';
 import {StyleConfig} from '../../style';
 import styles from '../../style/investDetail';
 import RegIpayPersonalPage from '../user/regIpayPersonal';
 const oPx = StyleConfig.oPx;
 export default class InvestDetailTY extends Component {
   constructor(props){
     super(props);
     this.state = {
       tap:'1',
       animating:true,
       isRefreshing:false,
       oData:[],
       usableSum:'0.00',//可用
       canUseSum:'',
       bottomPs:0,
       hasPwd:'',
       Amount:'',
       juanId:'',
       isInvested:true,
       juanName:'使用优惠券',
       productDetail:{
         borrowTitle:'产品详情',
         annualRate:'0.00',
         deadline:'0',
         isDayThe:'1',
         minTenderedSum:'0.00',
         paymentMode:'0',
         schedules:'0',
         residue:'0.00',
         borrowAmount:'0.00',
         investAmount:'0.00'
       }
     }
   }
   _getData(){
     Request.post('experienceBorrow.do',{
       uid:''
     },(data)=>{
       if(data.error=='0') {
           console.log(data);
           this.setState({productDetail: data, animating: false, isRefreshing: false});
           if (data.userMap) {
               this.setState({usableSum: data.userMap.accountSum});
           }

           if (data.userMap.accountSum == '0') {
               this.setState({isInvested: false});
           }
       }else if(data.error=='1'){
           this.setState({animating:false});
           //未注册汇付
           Alert.alert(
               '提示信息',
               '*亲，您还不是汇付的会员，请先注册汇付会员哦！',
               [
                   {text: '取消',  onPress: () => this._goBack()},
                   {text: '确定', onPress: () => this.props.navigator.push({component:RegIpayPersonalPage,name:'RegIpayPersonalPage'})},
               ]
           )
       }else{
           Alert.alert('提示信息', data.msg)
         this.setState({animating:false});
       }
     },(error)=>{

     })
   }
   componentDidMount() {
     this._getData();
   }
   //收益计算器
   _Calculator(){
     this.props.navigator.push({component:Calculator,name:'Calculator'});
   }
   //返回
   _goBack(){
     goBack(this.props.navigator);
   }
   //刷新
   _onRefresh(){
     this.setState({isRefreshing:true});
     this._getData();
   }
   //文本格式化
   _textClip(str){
     let ostr=str+'';
     return ostr.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
   }
   //提交
   _onSubmit(){
     this.setState({animating:true});
     Request.post('exGoInvest.do',{
       uid:'',
       amount:this.state.usableSum,
       id:this.props.id,
       borrowTime:this.state.productDetail.deadline
     },(data)=>{
       if(data.error=='0'){
         this.setState({animating:false});
         this.props.navigator.push({component:Result,name:'Result',params:{error:'0',msg:'体验标投标成功',result:'体验标投标成功'}});
       }else{
          this.setState({animating:false});
        Alert.alert('提示信息', data.msg)
       }
     },(error)=>{})
   }
   _Agreement(id){
     this.setState({animating:true});
     let title = id == '31'?'普金资本服务协议':'风险提示书';
     Request.post('querytipsApp.do',{TypeId:id},(data)=>{
       if(data.error=='0'){
         this.props.navigator.push({component:OwebView,name:'OwebView',params:{html:'<html><body>'+data.content+'</body></html>',title:title}});
       }else{
           Alert.alert('提示信息', data.msg)
       }
       this.setState({animating:false});
     },(error)=>{})
   }
   render(){
     let rightImageSource = require('../../images/icon/icon_calculator.png');
     return (
       <View style={styles.container}>
         <NavigationBar
           title={"项目详情"}
           leftShowIcon={true}
           leftBtnFunc={this._goBack.bind(this)}
           rightShowIcon={true}
           rightImageSource={rightImageSource}
           rightBtnFunc={this._Calculator.bind(this)}
         />
         <ScrollView
           ref={(scrollView) => { this.ScrollViewParent = scrollView; }}
           pagingEnabled={true}
           showsVerticalScrollIndicator={false}
           scrollEnabled={this.state.scrollEnabled}
           refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="刷新中..."
            />}>

             <View style={styles.topRateView}>
                 <View style={styles.topTitle}>
                     <Text style={styles.topTitleText}>体验标</Text>
                 </View>
                 <View style={styles.topRate}>
                     <Text style={styles.topRateText}>{this.state.productDetail.annualRate}</Text>
                     <Text style={styles.topRateSymbol}>%</Text>
                 </View>
                 <View style={{marginTop:10}}><Text style={{color:'#777',fontSize:22/oPx}}>预期年化收益</Text></View>
             </View>
             <View style={styles.topDetail}>
                 <View style={[styles.topDetailLine,{flex:1.2}]}>
                     {/*<Text style={styles.topDetailText}>{this.state.usableSum}元</Text>*/}
                     {/*<Text style={styles.bottomDetailText}>最小投标金额</Text>*/}
                     <Text style={styles.topDetailText}>{this.state.productDetail.investAmount}元</Text>
                     <Text style={styles.bottomDetailText}>剩余可投</Text>
                 </View>
                 <View style={styles.topDetailLine}>
                     <Text style={styles.topDetailText}>{this.state.productDetail.deadline}{this.state.productDetail.isDayThe == '1'?'个月':'天'}</Text>
                     <Text style={styles.bottomDetailText}>项目期限</Text>
                 </View>
                 <View style={[styles.topDetailLine,{flex:1.2}]}>
                     <Text numberOfLines={1} style={styles.topDetailText}>一次性还款</Text>
                     <Text style={styles.bottomDetailText}>还款方式</Text>
                 </View>
             </View>

             {/*<View style={styles.canInvestView}><Text style={[styles.canInvestText,{color:'#777'}]}>剩余可投：</Text><Text style={styles.canInvestText}>{this.state.productDetail.investAmount}元</Text></View>*/}

             <View style={styles.investTip}>
               <Text style={styles.investText}><Text style={{color:'#ffa44b'}}>提示：</Text>点击按钮，即表示您已经阅读并认可<Text style={styles.AgreementText} onPress={()=>this._Agreement('31')}>《普金资本服务协议》</Text>和<Text style={styles.AgreementText} onPress={()=>this._Agreement('12')}>《风险提示书》</Text>，投资有风险，理财需谨慎。
               </Text>
             </View>

             <View style={[styles.submitBtnView,{marginTop:100/oPx}]}>
                 <TouchableOpacity onPress={this._onSubmit.bind(this)}
                                   style={[styles.submitBtn,!this.state.isInvested?styles.submitBtnDisabled:null]}
                                   disabled={!this.state.isInvested}
                                   activeOpacity={1}>
                     <Text style={[styles.submitBtnText,!this.state.isInvested?styles.submitBtnTextDisabled:null]}>{this.state.isInvested?'立即投资':'已过期'}</Text>
                 </TouchableOpacity>
             </View>
            </ScrollView>
          <Loading show={this.state.animating} top={true}/>
       </View>
     )
   }
 }
