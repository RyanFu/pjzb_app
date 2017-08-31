/**
 * Created by zlx on 2017/03/2.
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
import styles from '../../style/funddetail';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class HKJHPage extends Component {
   constructor(props){
     super(props);
     this.state = {
         oData:[],
         dataSource:ds.cloneWithRows([]),
         animating:true,
         isRefreshing:false,
         isEmpty:false,
         isShowBottomRefresh:false,
         borrowId:'',
     }
   }

     componentDidMount(){
         this._getData(false);
     }

     //返回
     _leftbtn(){
         goBack(this.props.navigator);
     }

     //获取数据
     _getData(flag){
         Request.post('repaymentPlan.do',{
             borrowId:this.props.borrowId,
             // borrowId:572,
         },(data)=>{
             if (data.error == 0) {
                 if(data.repayList.length == 0){
                     this.setState({
                         isRefreshing:false,
                         isEmpty:true,
                         oData:[],
                         dataSource:ds.cloneWithRows([]),
                         animating:false
                     });
                     return;
                 };
                 if(flag){
                     let result = this.state.oData.concat(data.repayList);
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
                         oData:data.repayList,
                         dataSource:ds.cloneWithRows(data.repayList),
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
                 <Text style={[styles.tableRow,{flex:0.75}]}>序号</Text>
                 <Text style={[styles.tableRow,{flex:2.2}]}>计划还款日期</Text>
                 <Text style={[styles.tableRow,{flex:2.2}]}>实际还款日期</Text>
                 <Text style={[styles.tableRow,{flex:1.5}]}>已还本息</Text>
                 <Text style={[styles.tableRow,{flex:1.5}]}>待还本息</Text>
                 <Text style={[styles.tableRow,{flex:1}]}>状态</Text>
             </View>;
     }

     // 生成成功借出list
     _renderRow(row,index){
             return(
                 <View style={styles.tableTopList} key={index} >
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:0.75}]}>{row.repayPeriod}</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:2.2}]}>{row.repayDate}</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:2.2}]}>{row.realRepayDate?row.realRepayDate:'无'}</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:1.5}]}>{row.hasPI}</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:1.5}]}>{row.stillPI}</Text>
                     <Text numberOfLines={1} style={[styles.tableRow,{flex:1}]}>{row.repayStatus==1?'未偿还':'已偿还'}</Text>
                 </View>
             )
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

     _onRefresh(){
         this._getData(false);
     }

     returnElm () {
         if(this.state.animating){
             return <View style={{flex:1}}><Loading show={this.state.animating}/></View>
         }
         return <View style={{flex:1}}>
             <ListView
                 dataSource={this.state.dataSource}
                 renderRow={this._renderRow.bind(this)}
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
                 title={"还款计划"}
                 leftShowIcon={true}
                 leftBtnFunc={this._leftbtn.bind(this)}
             />
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
