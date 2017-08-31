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
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import OwebView from '../../components/OwebView';
import Loading from '../../components/Loading';
import styles from '../../style/funddetail';

import {toastShort} from '../../utils/Toast';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class contractQuery extends Component {
   constructor(props){
     super(props);
     this.state = {
         oData:[],
         dataSource:ds.cloneWithRows([]),
         animating:true,
         isRefreshing:false,
         curPage:1,
         totalPageNum:0,
         isShowBottomRefresh:true,
         startDate:props.startDate,
         endDate:props.endDate,
         isEmpty:false,
         borrowId:'',
     }
   }

     componentWillReceiveProps(nextProps) {
        this.setState({startDate:nextProps.startDate,endDate:nextProps.endDate});
        if(this.state.startDate == nextProps.startDate) {
           return;
        }
        if(nextProps.tapIndex){
           this._getData(false, 1, nextProps.startDate, nextProps.endDate);
        }
     }

     componentDidMount(){
       this.setState({
           borrowId:this.props.borrowId
       });
         this._getData(false, 1, this.props.borrowId);
     }

     //获取数据
     _getData(flag, curPage, borrowId){
         let id = borrowId;
         if (borrowId == null || borrowId == '') {
             id = this.state.borrowId;
         }

         Request.post('queryPactList.do',{
             curPage:curPage,
             borrowId:id,
             uid:'',
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
                 <Text style={styles.tableRow}>借款标题</Text>
                 <Text style={styles.tableRow}>借款人</Text>
                 <Text style={styles.tableRow}>投资人</Text>
                 <Text style={styles.tableRow}>查看合同</Text>
             </View>;
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

     // 生成成功借出list
     _renderRow(row,index){
         return (
             <View style={styles.tableTopList} key={index}>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.borrowTitle}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.publishName}</Text>
                 <Text numberOfLines={1} style={styles.tableRow}>{row.investName}</Text>
                 <Text numberOfLines={1} style={[styles.tableRow,{color:'#74c3f5'}]}  onPress={() => this.viewpdf_url(row.viewpdf_url)}>查看</Text>
             </View>
         )
     }

     _renderFooter() {
         if(this.state.isEmpty){
             return (<View style={styles.moreBottom}>
                 <Text style={{color:'#999'}}>暂无购买记录</Text>
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
         if(index>this.state.totalPageNum ){
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
                 title={"查看合同"}
                 leftShowIcon={true}
                 leftBtnFunc={this._goBack.bind(this)}
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