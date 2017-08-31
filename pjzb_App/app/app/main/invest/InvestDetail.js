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
   Animated,
   Platform,
   Easing,
   TouchableOpacity,
   RefreshControl,
   Keyboard,
   ActivityIndicator,
   TextInput,
   LayoutAnimation,
   KeyboardAvoidingView,
   Alert,
   TouchableWithoutFeedback
 } from 'react-native';
 import NavigationBar from '../../components/NavigationBar';
 import Utils from '../../utils/utils'; 
 import Calculator from '../other/earningsCalculator';
 import { goBack } from '../../utils/NavigatorBack';
 import LinearGradient from 'react-native-linear-gradient';
 import Request from '../../utils/Request';
 import Loading from '../../components/Loading';
 import {StyleConfig} from '../../style';
 import styles from '../../style/investDetail';
 import {toastShort} from '../../utils/Toast';
 import CouponCard from '../user/couponCard';
 import InvestRecord from './InvestRecord';
 import InvestFile from './InvestFile';
 import OwebView from '../../components/OwebView';
 import TimerMixin from 'react-timer-mixin';
 import HKJHPage from '../user/HKJHPage.js';
 const oPx = StyleConfig.oPx;
 export default class InvestDetail extends Component {
   constructor(props){
     super(props);
     this.state = {
       dialogHeight:StyleConfig.screen_height,
       behavior:Platform.OS === 'android'?'padding':'position',
       toTopAnim:new Animated.Value(0),
       tap:'1',
       animating:true,
       isRefreshing:false,
       isShowBottomRefresh:true,
       listViewFirst:false,
       curPage:1,
       totalPageNum:1,
       oData:[],
       isEmpty:false,
       pagingEnabled:true,
       scrollEnabled:true,
       minvoucherAmt:100,//代金券使用最低金额
       usableSum:'',//可用
       reckon:'0.00',//预期收益
       voucherAmt:0,//优惠券金额
       submitBtnDisabled:false,
       bottomPs:0,
       hasPwd:'',
       Amount:'',
       juanId:'',
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
         borrowAmount:'0.00'
       }
     }
   }
   componentWillMount() {
     // 创建动画
     LayoutAnimation.spring();
   }
   loop() {
     this.state.toTopAnim.setValue(0);
     Animated.timing(
       this.state.toTopAnim,
       {
         toValue:-15,
         duration:1000,
         easing: Easing.linear
       }
     ).start(()=>this.loop())
   }
   _submitAnim(){
     setTimeout(()=>{
       LayoutAnimation.spring();
       this.setState({bottomPs:340/oPx})
     },100);
   }
   _submitHideAnim(){
     LayoutAnimation.spring();
     this.setState({bottomPs:0/oPx});
     setTimeout(()=>{
       this.setState({showInput:false});
     },200);
   }
   async _getData(){
     await Request.post('findBorrowDetail.do',{
       borrowId:this.props.borrowId,
       uid:''
     },(data)=>{
       this.setState({productDetail:data,animating:false,isRefreshing:false});
       if(data.userMap){
         this.setState({usableSum:data.userMap.usableSum,mapListCd:data.mapListCd});
       };
       this._setBtnStatus(data.borrowStatus);
       if(data.borrowStatus == '2'){
         this._initFundTime();
       }
     },(error)=>{
        //alert(error);
     })
   }
   componentDidMount() {
    setTimeout(()=>{
      this._getData();
    },500)
   }
   componentWillUnmount() {
    this.timer && TimerMixin.clearInterval(this.timer);
  }
   //收益计算器
   _Calculator(){
     this.props.navigator.push({component:Calculator,name:'Calculator'});
   }
   //返回
   _goBack(){
     goBack(this.props.navigator);
   }
   //tap切换
   _tapPress(tag){
     if(tag=='2'||tag=='3'){
      Utils.isLogin(this.props.navigator,()=>this.setState({tap:tag}),()=>{this._getData()});
     }else{
      this.setState({tap:tag});
     }
   }
   //还款方式
   _paymentMode(val){
     if(val=='4') return '一次性还款';
     if(val=='1') return '等额本息';
     if(val=='0') return '无';
     return '按月付息，到期还本';
   }
   //文本格式化
   _textClip(str){
     let ostr=str+'';
     return ostr.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
   }
   //刷新
   _onRefresh(){
     this.setState({isRefreshing:true});
     this._getData();
   }
   //提交
   _submit(){
       Utils.isLogin(this.props.navigator,(data)=>{
          this.setState({showInput:true},()=>this._submitAnim());
       },()=>{this._getData()});
   }
   //点击变化
   _inputLayout(e){
     console.log(e);
   }
   //提交
   _onSubmit(){
     if(Utils.isMoney(this.state.Amount)){
       toastShort('请输入正确投标金额',100);
       return;
     }
     if(this.state.Amount==''){
       toastShort('请输入投标金额',100);
       return;
     }
     if(this.state.Amount=='0'){
       toastShort('投标金额不能为0',100);
       return;
     }
     if(parseFloat(this.state.usableSum) < parseFloat(this.state.Amount)){
         toastShort('投资金额不能大于可用金额',100);
       return;
     }
     //当前金额
      let inputMoney = parseFloat(this.state.Amount);
      let productDetail = this.state.productDetail;
      //剩余可投金额
      let residue = parseFloat(productDetail.residue.replace(/,/g,''));
      //最小投资金额
      let minTendSum = parseFloat(productDetail.minTenderedSum.replace(/,/g,''));
      //最大投资金额
      let maxTenderedSum = productDetail.maxTenderedSum>0?parseFloat(productDetail.maxTenderedSum.replace(/,/g,'')):9999999999;
      //投资总额 = 当前金额 +优惠券金额
      let investAmt = parseFloat(inputMoney) + parseFloat(this.state.voucherAmt);
      //剩余可投金额小于
      if(investAmt > residue){
        toastShort('投资金额不能大于剩余可投金额',100);
        return;
      };
      //剩余可投50>最小投资100
      if(residue>minTendSum){
        //当前输入金额60
        if(inputMoney < minTendSum){
          toastShort('投资金额不能小于最小投资金额',100);
          return;
        }
      };
      if(investAmt>maxTenderedSum){
        toastShort('投资金额不能大于最大投资金额',100);
        return;
      };
      this.setState({animating:true});
     Request.post('financeInvest.do',{
       uid:'',
       borrowId:this.props.borrowId,
       amount:this.state.Amount,
       money:this.state.voucherAmt,
       juanId:this.state.juanId,
       hasPwd:this.state.productDetail.hasPwd,
       borrowTitle:this.state.productDetail.borrowTitle,
       ipayAccount:this.state.productDetail.ipayAccount
     },(data)=>{
       if(data.error=='0'){
         //this.props.navigator.push({component:CouponCard,name:'CouponCard'});
         this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:data.html,back:true,title:'投标'}});
         this.setState({animating:false});
       }else{
         this.setState({animating:false});
         Alert.alert('提示信息', data.msg)
       }
     },(error)=>{})
     Keyboard.dismiss();
     this._submitHideAnim();
   }
   //使用优惠券
   _useCoupon(){
     Keyboard.dismiss();
     this.props.navigator.push({component:CouponCard,name:'CouponCard',params:{changeCouponId:this._changeCouponId.bind(this)}});
   }
   //获取优惠券
   _changeCouponId(id){
     let arr = this.state.mapListCd;
     for(let i=0;i<arr.length;i++){
       if(arr[i].id == id){
         this.setState({juanId:id,voucherAmt:arr[i].money,juanName:arr[i].rbName},()=>{this._reckon(this.state.Amount)});
         break;
       };
     }
   }
   //获取按钮状态
   _setBtnStatus(borrow){
      if(borrow == 1){
        this.setState({investBtn:'初审中',submitBtnDisabled:true});
      }else if(borrow == 2){
        this.setState({investBtn:'立即投标',submitBtnDisabled:false});
      }else if(borrow == 3){
        this.setState({investBtn:'复审中',submitBtnDisabled:true});
      }else if(borrow == 4){
        this.setState({investBtn:'还款中',submitBtnDisabled:true});
      }else if(borrow == 5){
        this.setState({investBtn:'已还完',submitBtnDisabled:true});
      }else{
        this.setState({investBtn:'立即投标',submitBtnDisabled:false});
      }
   };
   _initFundTime(){
      let didTime = this.state.productDetail.bidTime.replace(/-/g,'/');
      let everTime = this.state.productDetail.nowDate.replace(/-/g,'/');
      let EndTime= new Date(didTime);
      let NowTime = new Date(everTime);
      let t =EndTime.getTime() - NowTime.getTime();
      if(t>0){
        this.setState({submitBtnDisabled:true});
      }else{
        return;
      }
      this.timer = TimerMixin.setInterval(()=>{
        t = t-1000;
          let d=0;
          let h=0;
          let m=0;
          let s=0;
          if(t>0){
            d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
            this.setState({investBtn:d+'天'+h+'时'+m+'分'+s+'秒'});
          }else{
            this.setState({investBtn:'立即投标',submitBtnDisabled:false});
            TimerMixin.clearInterval(this.timer);
          }
      },1000);
     };
   //计算收益
   _reckon(value){
      let money = 0;
      if(value == '') value = 0;
      if(value && value>=this.state.minvoucherAmt){
        this.setState({cantVoucher:true});
      }else{
        this.setState({cantVoucher:false});
      };
      let voucherAmt = 0;
      if(value<this.state.minvoucherAmt){
        this.setState({juanId:'',voucherAmt:0,juanName:'使用优惠券'});
      }else{
        voucherAmt = this.state.voucherAmt;
      }
      if(!isNaN(value)){
          if(this.state.voucherAmt>0){
            money = (this.state.productDetail.annualRate/1200) * this.state.productDetail.deadline * (parseFloat(value)+parseFloat(voucherAmt));
          }else{
            money = (this.state.productDetail.annualRate/1200) * this.state.productDetail.deadline * value;
          }
        this.setState({reckon:money.toFixed(2)});
      }

    }
    _HKJHPage(){
      Utils.isLogin(this.props.navigator,(data)=>{
          this.props.navigator.push({component:HKJHPage,name:'HKJHPage',params:{borrowId:this.props.borrowId}});
      },()=>{this._getData()})
    }
    //查看协议
    _Agreement(id){
      this.setState({animating:true});
      let title = id == '31'?'普金资本服务协议':'风险提示书';
      Request.post('querytipsApp.do',{TypeId:id},(data)=>{
        if(data.error=='0'){
          this.props.navigator.push({component:OwebView,name:'OwebView',params:{html:'<html><body>'+data.content.replace(/<br \/>/g,'')+'</body></html>',title:title,back:true}});
        }else{
            Alert.alert('提示信息', data.msg)
        }
        this.setState({animating:false});
      },(error)=>{});
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
           showsVerticalScrollIndicator={false}
           refreshControl={
            <RefreshControl
              ref="RefreshControl"
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="刷新中..."
              titleColor="#999"
            />}>
             
               <View style={styles.topRateView}>
                 <View style={styles.topTitle}>
                   <Text style={styles.topTitleText}>{this.state.productDetail.borrowTitle}</Text>
                 </View>
                 <View style={styles.topRate}>
                   <Text style={styles.topRateText}>{this.state.productDetail.annualRate}</Text>
                   <Text style={styles.topRateSymbol}>%</Text>
                 </View>
                 <View style={{marginTop:10}}><Text style={{color:'#777',fontSize:22/oPx}}>预期年化收益</Text></View>
               </View>
               <View style={styles.topDetail}>
                 <View style={[styles.topDetailLine,{flex:1.2}]}>
                  <Text style={styles.topDetailText}>{this.state.productDetail.deadline}{this.state.productDetail.isDayThe == '1'?'个月':'天'}</Text>
                  <Text style={styles.bottomDetailText}>项目期限</Text>
                  </View>
                 <View style={styles.topDetailLine}>
                   <Text style={styles.topDetailText}>{this.state.productDetail.minTenderedSum}元</Text>
                   <Text style={styles.bottomDetailText}>最小投标金额</Text>
                 </View>
                 <View style={[styles.topDetailLine,{flex:1.2}]}>
                   <Text style={styles.topDetailText}>{this._paymentMode(this.state.productDetail.paymentMode)}</Text>
                   <Text numberOfLines={1} style={styles.bottomDetailText}>还款方式</Text>
                 </View>
               </View>
             
             <View style={styles.proupseView}>
               <View style={styles.proupseLine}>
                 <View style={styles.line_default}>
                 </View>
                 <View style={[styles.line_default,styles.line_pull,{width:this.state.productDetail.schedules/100*580/oPx}]}>
                 </View>
               </View>
               <Text style={styles.proupseText}>{this.state.productDetail.schedules}%</Text>
             </View>
             <View style={styles.canInvestView}><Text style={[styles.canInvestText,{color:'#777'}]}>剩余可投：</Text><Text style={styles.canInvestText}>{this.state.productDetail.residue}元</Text></View>
             <View style={styles.investTip}>
               <Text style={styles.investText}>
                <Text style={{color:'#ffa44b'}}>提示：</Text>
                点击按钮，即表示您已经阅读并认可
                <Text style={styles.AgreementText} onPress={()=>this._Agreement('31')}>《普金资本服务协议》</Text>
                和<Text style={styles.AgreementText} onPress={()=>this._Agreement('12')}>《风险提示书》</Text>，投资有风险，理财需谨慎。
               </Text>
             </View>
             <View style={styles.submitBtnView}><TouchableOpacity onPress={this._submit.bind(this)} style={[styles.submitBtn,this.state.submitBtnDisabled?styles.submitBtnDisabled:null]} disabled={this.state.submitBtnDisabled} activeOpacity={1}><Text style={[styles.submitBtnText,this.state.submitBtnDisabled?styles.submitBtnTextDisabled:null]}>{this.state.investBtn}</Text></TouchableOpacity></View>
              <View style={{height:16/oPx,backgroundColor:'#e9ecf3'}}></View>
              <View style={styles.detailView}>
                <View style={styles.detailViewTab}>
                  <TouchableOpacity onPress={()=>this._tapPress('1')} style={[styles.detailViewTabBtn,styles.borderLeft,styles.border,this.state.tap==='1'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='1'?styles.activeText:null]}>项目详情</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this._tapPress('2')} style={[styles.detailViewTabBtn,styles.border,this.state.tap==='2'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='2'?styles.activeText:null]}>相关文件</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this._tapPress('3')} style={[styles.detailViewTabBtn,styles.border,this.state.tap==='3'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='3'?styles.activeText:null]}>投资记录</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this._tapPress('4')} style={[styles.detailViewTabBtn,styles.borderRight,this.state.tap==='4'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='4'?styles.activeText:null]}>风险提示</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.tap==='1'?<View style={styles.detailViewOne}>
                {this.state.productDetail.borrowStatus=='4'||this.state.productDetail.borrowStatus=='5'?<TouchableOpacity onPress={this._HKJHPage.bind(this)} style={{marginBottom:10}}><Text style={[styles.canInvestTextColor,{color:'#75c0f6'}]}>还款计划</Text></TouchableOpacity>:null}
                <View style={styles.itemView}><Text style={styles.canInvestTextColor}>产品名称：</Text><Text style={styles.canInvestText}>{this.state.productDetail.borrowTitle}</Text></View>
                <View style={styles.itemView}><Text style={styles.canInvestTextColor}>募集资金：</Text><Text style={styles.canInvestText}>{this.state.productDetail.borrowAmount}元</Text></View>
                <View style={styles.itemView}><Text style={styles.canInvestTextColor}>年化收益：</Text><Text style={styles.canInvestText}>{this.state.productDetail.annualRate}%</Text></View>
                <View style={styles.itemView}><Text style={styles.canInvestTextColor}>起息日期：</Text><Text style={styles.canInvestText}>满标计息</Text></View>
                <View style={styles.itemView}><Text style={styles.canInvestTextColor}>收益方式：</Text><Text style={styles.canInvestText}>{this._paymentMode(this.state.productDetail.paymentMode)}</Text></View>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>资金用途：</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  {this._textClip(this.state.productDetail.purpose)}
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>还款来源：</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  {this._textClip(this.state.productDetail.retsource)}
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>借款人介绍：</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  {this._textClip(this.state.productDetail.projectIntro)}
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>项目描述：</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  {this._textClip(this.state.productDetail.detail)}
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>保障措施：</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  {this._textClip(this.state.productDetail.safeMeasures)}
                </Text>
              </View>:null}
              {
                this.state.tap==='2'?<InvestFile navigator={this.props.navigator} borrowId={this.props.borrowId} />:null
              }
              {this.state.tap==='3'?<InvestRecord borrowId={this.props.borrowId}/>:null}
              {this.state.tap==='4'?<View style={styles.detailViewOne}>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>一、政策风险</Text>
                </View>
                <Text style={styles.lineHeightText}>
                  因国家宏观政策和相关法律法规发生变化，可能引起价格方面的异常波动，用户可能因此遭受损失。
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>二、信用风险</Text>
                </View>
                <Text style={styles.lineHeightText}>普金资本不对本金和收益提供任何保证或承诺。若平台项目发生逾期还款，由平台合作机构保理公司或担保公司在 30 个工作日内进行债权回购。合作机构在发生最
                  不利情况下（可能但并不一定发生），项目进入司法程序，可能不利于用户实现项目的预期收益甚至本金遭受损失。
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>三、信息传递风险</Text>
                </View>
                <Text style={styles.lineHeightText}>普金资本将按协议约定进行信息披露，用户应充分关注并及时主动查询交易信息，如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得无
                  法及时了解交易信息，由此产生责任和风险应由用户承担。
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>四、不可抗力及意外事件风险</Text>
                </View>
                <Text style={styles.lineHeightText}>包括但不限于自然灾害、金融市场危机、战争、黑客攻击、病毒感染等不能预见、不能避免、不能克服的不可抗力事件，对于由于不可抗力及意外事件风险导致的任
                  何损失，客户须自行承担。
                </Text>
                <View style={styles.itemView}>
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>五、流动性风险</Text>
                </View>
                <Text style={styles.lineHeightText}>用户提以债权转让方式通过普金资本平台进行转让的，普金资本不对债权转让完成的时间以及债权转让能否全部成功实现做出任何承诺，债权未成功转让的，用户面临资金不能变现、丧失其他投资机会的风险。
                </Text>
              </View>:null}
         </ScrollView>
         {this.state.showInput
           ?<KeyboardAvoidingView
               style={styles.submitView}
               ref="keyboardView"
               behavior={this.state.behavior}>
               <View  style={styles.submitViewDialog} onStartShouldSetResponder={(evt)=>true} onResponderRelease={()=>this._submitHideAnim()}>
                 <View style={[styles.submitContent,{height:this.state.bottomPs}]}>
                   <View style={styles.submitItem}><Text style={styles.submitItemText}>账户余额：{this.state.usableSum}元</Text></View>
                   <View style={[styles.submitItem,styles.submitItemInput]}>
                     <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => {
                        this.setState({Amount:text});
                        this._reckon(text);
                      }}
                      placeholder={'剩余可投：'+this.state.productDetail.residue+'元'}
                      value={this.state.Amount}
                      placeholderTextColor="#999"
                      clearButtonMode="while-editing"
                      keyboardAppearance="light"
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"/>
                      <TouchableOpacity style={styles.textInputButton} onPress={this._onSubmit.bind(this)}><Text style={styles.textInputButtonText}>投资</Text></TouchableOpacity>
                  </View>
                  <View style={[styles.submitItem,{backgroundColor:'#fff5db'}]}><Text style={[styles.submitItemText,{color:'#ff9a38'}]}>预期收益：{this.state.reckon}</Text></View>
                  <TouchableOpacity style={[styles.submitItem,styles.submitChose,!this.state.cantVoucher?styles.disabled:null]}
                    disabled={this.state.minvoucherAmt>this.state.Amount&&this.state.mapListCd.length>0}
                    onPress={this._useCoupon.bind(this)}>
                    <Text style={[styles.submitItemText,{flex:1}]}>{this.state.juanName}</Text>
                    <Image style={styles.listBtn} source={require('../../images/icon/icon_user_right.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAvoidingView>:null}
          <Loading show={this.state.animating} top={true}/>
       </View>
     )
   }
 }
