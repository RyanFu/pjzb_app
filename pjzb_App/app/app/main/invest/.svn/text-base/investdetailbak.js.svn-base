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
   Easing,
   TouchableOpacity,
   RefreshControl,
   ListView,
   ActivityIndicator
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
 const oPx = StyleConfig.oPx;
 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 let _scrollView;
 export default class InvestDetail extends Component {
   constructor(props){
     super(props);
     this.state = {
       toTopAnim:new Animated.Value(0),
       tap:'1',
       animating:true,
       isRefreshing:false,
       dataSource:ds.cloneWithRows([]),
       isShowBottomRefresh:true,
       listViewFirst:false,
       curPage:1,
       totalPageNum:1,
       oData:[],
       isEmpty:false,
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
   loop() {
     this.state.toTopAnim.setValue(0)
     Animated.timing(
       this.state.toTopAnim,
       {
         toValue: 100,
         duration:1000,
         easing: Easing.linear
       }
     ).start(() => this.loop())
   }
   _getData(){
     Request.post('findBorrowDetail.do',{
       borrowId:this.props.borrowId,
       uid:'1223566774'
     },(data)=>{
       this.setState({productDetail:data,animating:false,isRefreshing:false});
     },(error)=>{

     })
   }
   componentDidMount() {
     this.loop();
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
   //收益计算器
   _Calculator(){
     this.props.navigator.push({component:Calculator,name:'Calculator'});
   }
   //tap切换
   _tapPress(tag){
     this.setState({tap:tag});
     switch (tag) {
       case '3':this._getInvetData();
         break;

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

   //投资记录list
   _renderRow(data,index){
     return (
       <View style={styles.tableTopList} key={index}>
         <Text style={styles.tableRow}>{data.username}</Text>
         <Text style={styles.tableRow}>{Utils.formatCurrency(data.investAmount)}</Text>
         <Text style={styles.tableRow}>{data.investTime.substring(0,10)}</Text>
         <Text style={styles.tableRow}>{data.pageType}</Text>
       </View>
     )
   }
   //获取投资
   _getInvetData(flag){
     Request.post('investmentRecord.do',{
       curPage:this.state.curPage,
       borrowId:this.props.borrowId,
       uid:'1223566774'
     },(data)=>{
       if(data.pageBean.page.length == 0){
         this.setState({
           dataSource:ds.cloneWithRows([]),
           isRefreshing:false,
           isEmpty:true
         });
         return;
       };
       this.setState({totalPageNum:data.pageBean.totalPageNum});
       if(flag){
         let result = this.state.oData.concat(data.pageBean.page);
         this.setState({
           oData:result,
           dataSource:ds.cloneWithRows(result),
           isRefreshing:false
         });
       }else{
         this.setState({
           animating:false,
           curPage:1,
           oData:data.pageBean.page,
           dataSource:ds.cloneWithRows(data.pageBean.page),
           isRefreshing:false
         });
         setTimeout(()=>{this.setState({listViewFirst:true})},2000);
       }
     },(error)=>{
       //console.log(error);
     });
   }
   //底部加载更多
   _onEndReached(){
     let index = this.state.curPage;
     index++;
     if(index>this.state.totalPageNum){
       toastShort('没有更多了哦',-100);
       this.setState({isShowBottomRefresh:false});
     }else{
       this.setState({curPage:index},()=>this._getInvetData(true));
     }
   }
   _onScroll(){
     console.log(1);
   }
   //底部刷新
   _renderFooter(){
     if(this.state.isEmpty){
       return (<View style={{marginVertical: 10,justifyContent:'center',alignItems:'center'}}>
               <Text>暂无投资记录</Text>
       </View>)
     }
     if(this.state.isShowBottomRefresh){
         return (<View style={{marginVertical: 10}}>
                 <ActivityIndicator />
         </View>)
     }else{
       return null;
     }
    }
   render(){
     let rightImageSource = require('../../images/icon/icon_calculator.png');
     const translateY = this.state.toTopAnim.interpolate({
              inputRange: [0,100],
              outputRange: [0,-15]
            });
     return (
       <View style={styles.container}>
         <NavigationBar
           title={this.state.productDetail.borrowTitle}
           leftShowIcon={true}
           leftBtnFunc={this._goBack.bind(this)}
           rightShowIcon={true}
           beginColor={'#f3553e'}
           endColor={'#f2513f'}
           rightImageSource={rightImageSource}
           rightBtnFunc={this._Calculator.bind(this)}
         />
         <ScrollView
           pagingEnabled={true}
           showsVerticalScrollIndicator={false}
           refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="刷新中..."
              titleColor="#999"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />}>
           <ScrollView style={{height:StyleConfig.content_height-98/oPx,flex:1}}>
             <LinearGradient colors={['#f25140', '#eb3549']} style={styles.top}>
               <View style={styles.topRateView}>
                 <View style={styles.topRate}>
                   <Text style={styles.topRateText}>{this.state.productDetail.annualRate}</Text>
                   <Text style={styles.topRateSymbol}>%</Text>
                 </View>
                 <View style={{marginTop:10}}><Text style={{color:'#fff',fontSize:28/oPx}}>预期年化收益</Text></View>
               </View>
               <View style={styles.topDetail}>
                 <View style={styles.topDetailLine}><Text style={styles.topDetailText}>项目期限：{this.state.productDetail.deadline}{this.state.productDetail.isDayThe == '1'?'个月':'天'}</Text></View>
                 <View style={styles.topDetailLine}><Text style={styles.topDetailText}>还款方式：{this._paymentMode(this.state.productDetail.paymentMode)}</Text></View>
                 <View style={styles.topDetailLine}><Text style={styles.topDetailText}>最小投标金额：{this.state.productDetail.minTenderedSum}元</Text></View>
               </View>
             </LinearGradient>
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
             <View style={styles.scrollTopView}>
               <Animated.Image style={[styles.scrollTopIcon,{transform:[{translateY:translateY}]}]} source={require('../../images/icon/icon_scroll_top.png')}/>
               <View style={styles.scrollTopTextView}>
                 <View style={styles.scrollTopTextLine}>
                 </View>
                 <Text style={styles.scrollTopText}>向上滑动，查看详情</Text>
                 <View style={styles.scrollTopTextLine}>
                 </View>
               </View>
             </View>
             <View style={styles.investTip}>
               <Image style={styles.investTextIcon} source={require('../../images/icon/icon_invest_danger.png')}/>
               <Text style={styles.investText}>提示：点击按钮，即表示您已经阅读并认可《普金资本服务协议》和《风险提示书》，投资有风险，理财需谨慎。
               </Text>
             </View>
            </ScrollView>

            <ScrollView  style={{paddingBottom:98/oPx,minHeight:StyleConfig.content_height,flex:1}} onScroll={this._onScroll.bind(this)}>
              <View style={styles.detailView}>
                <View style={styles.detailViewTab}>
                  <TouchableOpacity onPress={()=>{this._tapPress('1')}} style={[styles.detailViewTabBtn,styles.borderLeft,styles.border,this.state.tap==='1'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='1'?styles.activeText:null]}>项目详情</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this._tapPress('2')}} style={[styles.detailViewTabBtn,styles.border,this.state.tap==='2'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='2'?styles.activeText:null]}>相关文件</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this._tapPress('3')}} style={[styles.detailViewTabBtn,styles.border,this.state.tap==='3'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='3'?styles.activeText:null]}>投资记录</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this._tapPress('4')}} style={[styles.detailViewTabBtn,styles.borderRight,this.state.tap==='4'?styles.active:null]}>
                    <Text style={[styles.detailViewTabBtnText,this.state.tap==='4'?styles.activeText:null]}>风险提示</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.tap==='1'?<View style={styles.detailViewOne}>
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
                  <Text style={[styles.canInvestTextColor,{marginTop:15}]}>项目介绍：</Text>
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
                this.state.tap==='2'?<View style={[styles.detailViewTwo,{minHeight:StyleConfig.content_height}]}>
                  <View style={styles.tableTop}>
                    <Text style={styles.tableRow}>投资人</Text>
                    <Text style={styles.tableRow}>金额</Text>
                    <Text style={styles.tableRow}>投资时间</Text>
                    <Text style={styles.tableRow}>投资方式</Text>
                  </View>

              </View>:null
              }
              {this.state.tap==='3'?<View style={[styles.detailViewTwo,{minHeight:StyleConfig.content_height}]}>
                <View style={styles.tableTop}>
                  <Text style={styles.tableRow}>投资人</Text>
                  <Text style={styles.tableRow}>金额</Text>
                  <Text style={styles.tableRow}>投资时间</Text>
                  <Text style={styles.tableRow}>投资方式</Text>
                </View>
                {
                  this.state.oData.map((row, index) =>{
                      return this._renderRow(row,index);
                  })
                }
                {
                  this._renderFooter()
                }
                {/* <ListView
                  dataSource={this.state.dataSource}
                  scrollEventThrottle={300}
                  renderRow={this._renderRow.bind(this)}
                  style={styles.listView}
                  onEndReached={this._onEndReached.bind(this)}
                  onEndReachedThreshold={30}
                  enableEmptySections = {true}
                  renderFooter={this._renderFooter.bind(this)}
                /> */}
              </View>:null}
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
         </ScrollView>
         <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}><Text style={styles.submitBtnText}>立即投资</Text></TouchableOpacity>
         <Loading show={this.state.animating} top={true}/>
       </View>
     )
   }
 }
