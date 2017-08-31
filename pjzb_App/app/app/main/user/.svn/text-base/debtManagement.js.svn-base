/**
 * Created by yls on 2017/03/01.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
     View,
     Text,
     Appregistry,
     StyleSheet,
     Image,
     ScrollView,
     Modal,
     Alert,
     TextInput,
     ListView,
     RefreshControl,
     ActivityIndicator,
 } from 'react-native';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';
import Loading from '../../components/Loading';
import {toastShort} from '../../utils/Toast';
import styles from '../../style/funddetail';
import {StyleConfig} from '../../style';
import AddAssignmentDebt from './addAssignmentDebt';

let oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class DebtManagement extends Component {
   constructor(props){
     super(props);
     this.state = {
         oData:[],
         dataSource:ds.cloneWithRows([]),
         animating:true,
         isRefreshing:false,
         isEmpty:false,
         curPage:1,
         totalPageNum:0,
         isShowBottomRefresh:true,
         // successLoan：成功借出，tendersingBorrow：招标中的借款，recycleBorrow：回款中的借款，空串：已回收的借款
         assignFlag:'canAssign',
         borrowerName:'',
         borrowTitle:'',
         choseType:0,
         choseData:[{text:'可转让'},{text:'转让中'},{text:'已转让'},{text:'转让失败'}],
     }
   }
     componentDidMount(){
         this._getData(false, 1);
     }

     //返回
     _leftbtn(){
         goBack(this.props.navigator);
     }

     //筛选
     _openSearch(){
         this.setState({dialog:!this.state.dialog});
     }

     componentWillReceiveProps(nextProps) {
         this.setState({
             borrowerName:nextProps.borrowerName,
             borrowTitle:nextProps.borrowTitle,
             choseType:nextProps.choseType,
             assignFlag:nextProps.assignFlag,
         });
         if(this.state.assignFlag == nextProps.assignFlag && this.state.borrowerName == nextProps.borrowerName
             && this.state.borrowTitle == nextProps.borrowTitle && this.state.choseType == nextProps.choseType) {
             return;
         }
         if(nextProps.tapIndex){
             this._getData(false, 1, nextProps.assignFlag,nextProps.borrowerName,nextProps.borrowTitle);
         }
     }

     //获取数据
     _getData(flag, curPage, assignFlag,borrowerName,borrowTitle){
         if (assignFlag == '')
             assignFlag = '1';
         Request.post('debtsManage.do',{
             curPage:curPage,
             uid:'',
             assignFlag:assignFlag?assignFlag:this.state.assignFlag,
             borrowerName:borrowerName,
             borrowTitle:borrowTitle,
         },(data)=>{
             if (data.error == 0) {
                 if(data.pageBean.page.length == 0){
                     this.setState({
                         isRefreshing:false,
                         isEmpty:true,
                         oData:[],
                         dataSource:ds.cloneWithRows([]),
                         animating:false
                     });
                     return;
                 };
                 this.setState({totalPageNum:data.pageBean.totalPageNum});
                 if(data.pageBean.totalPageNum==1){
                     this.setState({isShowBottomRefresh:false});
                 }
                 if(flag){
                     let result = this.state.oData.concat(data.pageBean.page);
                     this.setState({
                         oData:result,
                         dataSource:ds.cloneWithRows(result),
                         isRefreshing:false,
                         animating:false,
                         isEmpty:false
                     });
                 }else{
                     this.setState({
                         animating:false,
                         curPage:1,
                         oData:data.pageBean.page,
                         dataSource:ds.cloneWithRows(data.pageBean.page),
                         isRefreshing:false,
                         isEmpty:false
                     });
                 }
             }
         },(error)=>{
             console.log(error);
         });
     }

     addAssignmentDebt(list) {
         this.props.navigator.push({component:AddAssignmentDebt,name:'AddAssignmentDebt',params:{
             list:list,callback:this._getData.bind(this)
         }});
     }

     //标的详情
     _toDetail(id,title){
         this.props.toBorrow(id, title);
     }

     viewpdf_url(url) {
         this.props.viewpdf_url(url);
     }

     cancelApplyDebt(id) {
         var params = {
             uid:'',
             debtId:id
         };

         Alert.alert(
             '提示',
             '您确定要撤回吗？',
             [
                 {text: '取消', onPress: ()=> console.log('点击取消')},
                 {text: '确定', onPress: () =>
                     Request.post('recallDebtsAssignment.do',params,(data)=>{

                         if(data.error =='0'){
                             Alert.alert(
                                 '提示',
                                 data.msg,
                                 [{text: '确定', onPress: () => this._getData(false, 1)},]
                             );
                             //刷新本页面
                         }else{
                             Alert.alert('提示', data.msg);
                         }
                     },(error)=>{
                         Alert.alert('提示', '您的网络不稳定，请稍后再试！');
                     })
                 },]
         );
        // this.props.cancelApplyDebt(id);
     }

     returnTitle () {
         if (this.state.choseType == 0) {// 可转让
             return  <View style={styles.tableTop}>
                 <Text style={styles.tableRow}>标题</Text>
                 <Text style={styles.tableRow}>剩余期限</Text>
                 <Text style={styles.tableRow}>年利率</Text>
                 <Text style={styles.tableRow}>投资金额</Text>
                 <Text style={styles.tableRow}>待收金额</Text>
                 <Text style={styles.tableRow}>操作</Text>
             </View>;
         } else  if (this.state.choseType == 1) {// 转让中
             return  <View style={styles.tableTop}>
                 <Text style={styles.tableRow}>标题</Text>
                 <Text style={styles.tableRow}>剩余期限</Text>
                 <Text style={styles.tableRow}>年利率</Text>
                 <Text style={styles.tableRow}>投资金额</Text>
                 <Text style={styles.tableRow}>转让价格</Text>
                 <Text style={styles.tableRow}>剩余时间</Text>
             </View>;
         } else  if (this.state.choseType == 2) {// 已转让
             return  <View style={styles.tableTop}>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>标题</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>剩余期限</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>年利率</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>投资金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>转让金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>转让价格</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>协议</Text>
             </View>;
         } else  if (this.state.choseType == 3) {// 转让失败
             return  <View style={styles.tableTop}>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>标题</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>剩余期限</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>年利率</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>投资金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>转让金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>转让价格</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>状态</Text>
             </View>;
         }
     }

     // 生成债权转让的list
     _renderRow(row,index){
         if (this.state.choseType == 0) {
             let debtStatus = row.debtStatus>3||row.debtStatus==null?'债权转让':'撤回';
             return(
                 <View style={styles.tableTopList} key={index}>
                     <Text numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]} onPress={() => {this._toDetail(row.borrowId,row.borrowTitle)}}>{row.borrowTitle}</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.remainBorrowLimit}</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.annualRate}%</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.recivedPrincipal}元</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.recievedPI}元</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]} onPress={() => {debtStatus=='债权转让'?this.addAssignmentDebt(row):this.cancelApplyDebt(row.debtId)}}>{debtStatus}</Text>
                 </View>
             )
         } else if (this.state.choseType == 1) {
             return <View style={styles.tableTopList} key={index}>
                 <Text numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]} onPress={() => {this._toDetail(row.borrowId,row.borrowTitle)}}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.debtLimit}/{row.deadline}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.realAmount}元</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.auctionBasePrice}元</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.remainAuctionTime}</Text>
             </View>;
         } else if (this.state.choseType == 2) {
             return <View style={styles.tableTopList} key={index}>
                 <Text numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]} onPress={() => {this._toDetail(row.borrowId,row.borrowTitle)}}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.debtLimit}/{row.deadline}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.realAmount}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.debtSum}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.auctionBasePrice}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx},{color:'#75c0f6'}]} onPress={() => this.viewpdf_url(row.viewpdf_url)}>查看合同</Text>
             </View>;
         } else if (this.state.choseType == 3) {
             let debtStatus = '竞拍失败';
             if(row.debtStatus=='4'){
                 debtStatus = '竞拍失败';
             } else if(row.debtStatus=='5'){
                 debtStatus = '撤销';
             } else if(row.debtStatus=='6'){
                 debtStatus = '审核失败';
             } else if(row.debtStatus=='7'){
                 debtStatus = '提前还款';
             }

             return <View style={styles.tableTopList} key={index}>
                 <Text numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]} onPress={() => {this._toDetail(row.borrowId,row.borrowTitle)}}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.debtLimit}/{row.deadline}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.realAmount}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.debtSum}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.auctionBasePrice}元</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{debtStatus}</Text>
             </View>;
         }
     }


     _renderFooter() {
         if(this.state.isEmpty){
             return (<View style={styles.moreBottom}>
                 <Text style={{color:'#999'}}>暂无可转让债权</Text>
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
     _end(){
         if(this.state.isEmpty) return;
         if(this.state.totalPageNum == 1) return;
         let index = this.state.curPage;
         index++;
         if(index>this.state.totalPageNum){
             toastShort('没有更多了哦',-100);
             this.setState({isShowBottomRefresh:false});
         }else{
             this.setState({curPage:index});
             this._getData(true, index);
         }
     }
     _onRefresh(){
         this.setState({curPage:1});
         this._getData(false, 1);
     }

     returnElm () {
         if(this.state.animating){
             return <View style={{flex:1}}><Loading show={this.state.animating}/></View>
         }
         return <View style={{flex:1}}>
             <ListView
                 dataSource={this.state.dataSource}
                 renderRow={this._renderRow.bind(this)}
                 onEndReached={this._end.bind(this)}
                 onEndReachedThreshold={30}
                 enableEmptySections = {true}
                 renderFooter={this._renderFooter.bind(this)}
                 refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="刷新中..."
                        titleColor="#999"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }
             />
         </View>
     }

     //返回
     _goBack(){
         goBack(this.props.navigator);
     }

   render(){
     return (
         <View style={{flex:1,backgroundColor:'#fff'}}>
             {
                 this.returnTitle()
             }
             {
                 this.returnElm()
             }
         </View>
     );
   }
 }
;
