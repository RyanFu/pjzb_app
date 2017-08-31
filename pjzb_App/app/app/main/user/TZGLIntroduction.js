/**
 * Created by zlx on 2017/02/23.
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
     TextInput,
     ListView,
     RefreshControl,
     ActivityIndicator,
 } from 'react-native';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';
import Loading from '../../components/Loading';
import NavigationBar from '../../components/NavigationBar';
import SearchModal from '../../components/SearchModal';
import {toastShort} from '../../utils/Toast';
import styles from '../../style/funddetail';
import {StyleConfig} from '../../style';
import OwebView from '../../components/OwebView';
import InvestDetail from '../invest/InvestDetail';
import Utils from '../../utils/utils';

let oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class TZGLIntroduction extends Component {
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
         borrowFlag:'successLoan',
         startDate:'',
         endDate:'',
         choseType:0,
         choseData:[{text:'成功借出'},{text:'招标中的借款'},{text:'回款中的借款'},{text:'已回收的借款'}],
     }
   }

     //返回
     _leftbtn(){
         goBack(this.props.navigator);
     }

     //筛选
     _openSearch(){
         this.setState({dialog:!this.state.dialog});
     }

     _onSubmit(params){
         let borrowFlag  = this.state.borrowFlag;
         if (params.choseType == 0)
             borrowFlag = 'successLoan';
         else if (params.choseType == 1)
             borrowFlag = 'tendersingBorrow';
         else if (params.choseType == 2)
             borrowFlag = 'recycleBorrow';
         else if (params.choseType == 3)
             borrowFlag = '';

         this.setState({
            choseType: params.choseType,
             startDate: params.startDate,
             endDate: params.endDate,
             animating:true,
             borrowFlag:borrowFlag,
         },() => {
             this._getData(false, 1);
         });
     }

     viewpdf_url(url) {
         if (url == null || url == '') {
             toastShort('此合同为空',-100);
             return;
         }
         this.props.navigator.push({
             name: 'OwebView',
             component: OwebView,
             params:{
                 url:url,
                 title:'查看合同',
                 back:{true},
             }
         })
     }

     //获取数据
     _getData(flag, curPage){
         Request.post('investManage.do',{
             curPage:curPage,
             uid:'',
             borrowFlag:this.state.borrowFlag,
             publishTimeStart:this.state.startDate,
             publishTimeEnd:this.state.endDate,
             title:"",
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

     returnTitle () {
         if (this.state.choseType == 0) {// 成功借出
             return  <View style={styles.tableTop}>
                 <Text style={styles.tableRow}>标题</Text>
                 <Text style={styles.tableRow}>年利率</Text>
                 <Text style={styles.tableRow}>期限</Text>
                 <Text style={styles.tableRow}>投资金额</Text>
                 <Text style={styles.tableRow}>投资时间</Text>
             </View>;
         } else  if (this.state.choseType == 1) {// 招标中的借款
             return  <View style={styles.tableTop}>
                 <Text style={styles.tableRow}>标题</Text>
                 <Text style={styles.tableRow}>年利率</Text>
                 <Text style={styles.tableRow}>期限</Text>
                 <Text style={styles.tableRow}>发布时间</Text>
                 <Text style={styles.tableRow}>投资金额</Text>
             </View>;
         } else  if (this.state.choseType == 2) {// 回款中的借款
             return  <View style={styles.tableTop}>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>标题</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>年利率</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>期限</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>投资金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>已收金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>还款时间</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>操作</Text>
             </View>;
         } else  if (this.state.choseType == 3) {// 已回收的借款
             return  <View style={styles.tableTop}>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>标题</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>年利率</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>期限</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>投资金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>已收金额</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>发布时间</Text>
                 <Text style={[styles.tableRow,{paddingLeft:10/oPx}]}>操作</Text>
             </View>;
         }
     }

     toBorrow(id,title) {
         this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
     }

     // 生成成功借出list
     _renderRow(row,index){
         if (this.state.choseType == 0) {
             let date = row.investTime.toString();
             date = date.substr(0, date.indexOf(' '));
             return(
                 <View style={styles.tableTopList} key={index}>
                     <Text onPress={() => {this.toBorrow(row.borrowId, row.borrowTitle)}} numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]}>{row.borrowTitle}</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.annualRate}%</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{row.deadline}个月</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{Utils.formatCurrency(row.investAmount)}</Text>
                     <Text numberOfLines={1} style={styles.tableRow}>{date}</Text>
                 </View>
             )
         } else if (this.state.choseType == 1) {
             let date = row.publishTime.toString();
             date = date.substr(0, date.indexOf(' '));
             return <View style={styles.tableTopList} key={index}>
                 <Text onPress={() => {this.toBorrow(row.borrowId, row.borrowTitle)}} numberOfLines={1} style={[styles.tableRow,{color:'#75c0f6'}]}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.deadline}个月</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{date}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{Utils.formatCurrency(row.investAmount)}</Text>
             </View>;
         } else if (this.state.choseType == 2) {
             return <View style={styles.tableTopList} key={index}>
                 <Text onPress={() => {this.toBorrow(row.borrowId, row.borrowTitle)}} numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx,color:'#75c0f6'}]}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.deadline}个月</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{Utils.formatCurrency(row.realAmount)}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{Utils.formatCurrency(row.forTotalSum)}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.recentlyRepayDate}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx},{color:'#75c0f6'}]} onPress={() => this.viewpdf_url(row.viewpdf_url)}>查看合同</Text>
             </View>;
         } else if (this.state.choseType == 3) {
             let date = row.publishTime.toString();
             date = date.substr(0, date.indexOf(' '));
             return <View style={styles.tableTopList} key={index}>
                 <Text onPress={() => {this.toBorrow(row.borrowId, row.borrowTitle)}} numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx,color:'#75c0f6'}]}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.annualRate}%</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{row.deadline}个月</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{Utils.formatCurrency(row.realAmount)}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{Utils.formatCurrency(row.forTotalSum)}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx}]}>{date}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{paddingLeft:10/oPx},{color:'#75c0f6'}]} onPress={() => this.viewpdf_url(row.viewpdf_url)}>查看合同</Text>
             </View>;
         }
     }

     componentDidMount(){
         this._getData(false, 1);
     }

     _renderFooter() {
         if(this.state.isEmpty){
             return (<View style={styles.moreBottom}>
                 <Text style={{color:'#999'}}>暂无投资记录</Text>
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
             <NavigationBar
                 title={"投资管理"}
                 leftShowIcon={true}
                 leftBtnFunc={this._leftbtn.bind(this)}
                 rightTitle="筛选"
                 rightBtnFunc={this._openSearch.bind(this)}
             />
             {
                 this.returnTitle()
             }
             {
                 this.returnElm()
             }
             <SearchModal
                 dialog={this.state.dialog}
                 choseData={this.state.choseData}
                 modalEvent={this._openSearch.bind(this)}
                 onSubmit={this._onSubmit.bind(this)}
                 status={true}
             />
         </View>
     );
   }
 }
;
