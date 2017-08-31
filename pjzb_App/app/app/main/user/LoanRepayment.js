
 /**
  * Created by cqm on 2017/02/24.
  */
  'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    DatePickerIOS,
    Platform
  } from 'react-native';

  import {StyleConfig} from '../../style/index';
  const oPx = StyleConfig.oPx;
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import Utils from '../../utils/utils';
  import styles from '../../style/loan';
  import {toastShort} from '../../utils/Toast';
  import { goBack } from '../../utils/NavigatorBack';
  import InvestDetail from '../invest/InvestDetail';
  import LoanRepaymentDetail from './LoanRepaymentDetail';

  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class LoanRepayment extends Component {
    constructor(props){
      super(props);
      this.state = {
        oData:[],
        dataSource:ds.cloneWithRows([]),
        animating:true,
        isEmpty:false,
        isRefreshing:false,
        curPage:1,
        totalPageNum:0,
        isShowBottomRefresh:false,
        startDate:this.props.startDate,
        endDate:this.props.endDate,
        choseType:this.props.choseType,
        choseData:this.props.choseData,
      }
    }
    _goBack(){
      goBack(this.props.navigator);
    }
    //获取数据
    _getData(flag){
      var choseType=this.state.choseType;
      if (choseType == 2) {
          choseType = 1;
          this.setState({choseType:1});
      }
      var borrowFlag=this.state.choseData[choseType].value;
      if (borrowFlag != 'repaymenting' && borrowFlag != 'alreadyRepaid') {
          borrowFlag = 'repaymenting';
          this.setState({choseType:0});
      }
      Request.post('repaymentDetail.do',{uid:'',publishTimeStart:this.state.startDate,publishTimeEnd:this.state.endDate,borrowFlag:borrowFlag,title:'',curPage:this.state.curPage},(data)=>{
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
        if(data.pageBean.totalPageNum>1){
          this.setState({isShowBottomRefresh:true});
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
      },(error)=>{
        console.log(error);
      });
    }

      _getRepayStatus(repayStatus){
          if(repayStatus == 1){
              return '未还款';
          }else if(repayStatus == 2){
              return '已还款';
          }else{
              return '-';
          }
      };

      _toBorrowDetail(borrowId) {
          this.props.navigator.push({
              name: 'LoanRepaymentDetail',
              component: LoanRepaymentDetail,
              params:{
                  borrowId:borrowId,
              }
          })
      }

    //记录list
    _renderRow(data,index) {
        return(
        this.state.choseType == 0 ?
            <View style={styles.tableTopList} key={data.id}>
                <Text style={[styles.tableRow,{color:'#75c0f6',flex:1.5}]} numberOfLines={1}
                      onPress={this._toDetail.bind(this,data.id,data.borrowTitle)}>
                    {data.borrowTitle}</Text>
                <Text numberOfLines={1} style={[styles.tableRow,{flex:2}]}>{Utils.formatCurrency(data.borrowAmount)}</Text>
                <Text numberOfLines={1} style={[styles.tableRow,{flex:1.5}]}>{data.annualRate}%</Text>
                <Text style={[styles.tableRow,{flex:2}]}>{data.deadline}个月</Text>
                <Text style={[styles.tableRow,{flex:2.2}]}>{data.publishTime}</Text>
                <Text style={[styles.tableRow,{flex:1.8}]}>{Utils.formatCurrency(data.hasSum)}</Text>
            </View>
            :
            <View style={styles.tableTopList} key={data.id}>
                <Text style={[styles.tableRow,{color:'#75c0f6',flex:1.5}]} numberOfLines={1}
                      onPress={this._toDetail.bind(this,data.id,data.borrowTitle)}>
                    {data.borrowTitle}</Text>
                <Text numberOfLines={1} style={[styles.tableRow,{flex:2}]}>{Utils.formatCurrency(data.borrowAmount)}</Text>
                <Text style={[styles.tableRow,{flex:2,textAlign :'center'}]}>{data.deadline}个月</Text>
                <Text numberOfLines={1} style={[styles.tableRow,{flex:2}]}>{data.auditTime}</Text>
                <Text style={[styles.tableRow,{flex:2}]}>{Utils.formatCurrency(data.stillTotalSum)}</Text>
                <Text style={[styles.tableRow,{color:'#75c0f6',flex:1.5}]}
                      onPress={this._toBorrowDetail.bind(this,data.id)}>明细</Text>
            </View>
        );
    }
    componentDidMount(){
      this.setState({animating:true});
      this._getData();
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
        this.setState({curPage:index},()=>this._getData(true));
      }
    }
    _onRefresh(flag){
      this.setState({curPage:1,
        startDate:this.props.startDate,
        endDate:this.props.endDate,
        choseType:this.props.choseType,
        choseData:this.props.choseData,
    },()=>this._getData(flag));
    }
    _openSearch(){
      this.setState({dialog:!this.state.dialog});
    }
    _onSubmit(params){
      //数据格式
      //params = {startDate:startDate,
     //    endDate:endDate,
     //    choseType:choseType
     //  };
      this.setState(params,()=>{this.setState({animating:true});this._getData(true)});
    }

      //标的详情
      _toDetail(id,title){
          this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
      }
    
    render(){
      return (
        <View style={{flex:1}}>
         <View style={{flex:1,backgroundColor:'#fff'}}>
             {this.state.choseType == 0 ?
                 <View style={styles.tableTop}>
                     <Text style={[styles.tableRow,{flex:1.5}]}>标题</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>借款金额</Text>
                     <Text style={[styles.tableRow,{flex:1.5}]}>年利率</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>还款期限</Text>
                     <Text style={[styles.tableRow,{flex:2.2}]}>借款时间</Text>
                     <Text style={[styles.tableRow,{flex:1.8}]}>应还本息</Text>
                 </View>
                 :
                 <View style={styles.tableTop}>
                     <Text style={[styles.tableRow,{flex:1.5}]}>标题</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>借款金额</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>借款期限</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>审核日期</Text>
                     <Text style={[styles.tableRow,{flex:2}]}>已还本息</Text>
                     <Text style={[styles.tableRow,{flex:1.5}]}>操作</Text>
                 </View>
             }

             <ListView
             dataSource={this.state.dataSource}
             renderRow={this._renderRow.bind(this)}
             style={styles.listView}
             onEndReached={this._end.bind(this)}
             onEndReachedThreshold={30}
             enableEmptySections = {true}
             pageSize={20}
             renderFooter={this._renderFooter.bind(this)}
             refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff0000"
                title="刷新中..."
                titleColor="#999"
                progressBackgroundColor="#ffff00"
              />}/>
              {/*
                dialog :显示true与隐藏false
                choseData:所有待选项
                modalEvent:视图相应事件
                onSubmit：搜索窗口关闭后的回调事件，返回参数见_onSubmit
                */}
              <Loading show={this.state.animating} top={true}/>
          </View>
          </View>
      );
    }
  }
