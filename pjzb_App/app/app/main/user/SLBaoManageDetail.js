/**
 * Created by yuluosheng on 2017/06/29.
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
import Utils from '../../utils/utils';

let oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class SLBaoManageDetail extends Component {
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
         statusFlag:'all',
         startDate:'',
         endDate:'',
         choseType:0,
         choseData:[{text:'全部'},{text:'转入'},{text:'转出'},{text:'收益'}],
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
         let statusFlag  = this.state.statusFlag;
         if (params.choseType == 0)
             statusFlag = 'all';
         else if (params.choseType == 1)
             statusFlag = 'into';
         else if (params.choseType == 2)
             statusFlag = 'rollout';
         else if (params.choseType == 3)
             statusFlag = 'earnings';

         this.setState({
             choseType: params.choseType,
             startDate: params.startDate,
             endDate: params.endDate,
             animating:true,
             statusFlag:statusFlag,
         },() => {
             this._getData(false, 1);
         });
     }

     //获取数据
     _getData(flag, curPage){
         Request.post('slbaoDetail.do',{
             curPage:curPage,
             uid:'',
             statusFlag:this.state.statusFlag,
             recordTimeStart:this.state.startDate,
             recordTimeEnd:this.state.endDate
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
         return  <View style={styles.tableTop}>
             <Text style={styles.tableRow}>类型</Text>
             <Text style={styles.tableRow}>时间</Text>
             <Text style={styles.tableRow}>金额(元)</Text>
             <Text style={styles.tableRow}>生利宝余额(元)</Text>
         </View>;
     }

     // 生成成功借出list
     _renderRow(row,index){
         let date = row.recordTime.toString();
         date = date.substr(0, date.indexOf(' '));
         return(
             <View style={styles.tableTopList} key={index}>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.remarks}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{date}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{Utils.formatCurrency(row.income)}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}> {row.usableSum}</Text>
             </View>
         )
     }

     componentDidMount(){
         this._getData(false, 1);
     }

     _renderFooter() {
         if(this.state.isEmpty){
             return (<View style={styles.moreBottom}>
                 <Text style={{color:'#999'}}>暂无记录</Text>
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
                 title={"明细"}
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
