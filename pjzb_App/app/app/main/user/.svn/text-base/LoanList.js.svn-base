
 /**
  * Created by cqm on 2017/02/23.
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

  import NavigationBar from '../../components/NavigationBar';
  import {StyleConfig} from '../../style/index';
  const oPx = StyleConfig.oPx;
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import Utils from '../../utils/utils';
  import styles from '../../style/loan';
  import {toastShort} from '../../utils/Toast';
  import { goBack } from '../../utils/NavigatorBack';
  import LoanRepayment from './LoanRepayment';
  import InvestDetail from '../invest/InvestDetail';
 import ContractQuery from '../invest/contractQuery';

  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class LoanList extends Component {
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
        isPage:false,
      }
    }

    //获取数据
    _getData(flag){
      var choseType=this.state.choseType;
      var borrowFlag=this.state.choseData[choseType].value ;
      //console.log("choseType2(props):"+this.props.choseType+" ,choseData:"+this.props.choseData.length);
      //console.log("choseType2:"+choseType+" ,borrowFlag2:"+borrowFlag);
      Request.post('loanManagement.do',{uid:'',publishTimeStart:this.state.startDate,publishTimeEnd:this.state.endDate,borrowFlag:borrowFlag,title:'',curPage:this.state.curPage},(data)=>{
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
        if (data.pageBean.totalPageNum < 2) {
            this.setState({isPage:true});
        }else {
            this.setState({isPage:false});
        }
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
    _getStatus(borrow){
    	if(borrow == 1){
    		return '初审中';
    	}else if(borrow == 2){
    		return '招标中';//立即投资
    	}else if(borrow == 3){
    		return '复审中';
    	}else if(borrow == 4){
    		return '还款中';
    	}else if(borrow == 5){
    		return '已还完';
    	}else{
    		return '流标';
    	}
    };

      //金额格式化
      _formatAmt(val){
          if(val%2==0 && (val*0.0001)>0)
              return (val/10000)+'万元';
          if(val<10000)
              return val+'元';
      }

      toBorrow(borrowId) {
          this.props.navigator.push({
              name: 'ContractQuery',
              component: ContractQuery,
              params:{
                  borrowId:borrowId,
              }
          })
      }

    //借款记录list
    _renderRow(data,index){
      return <View style={styles.tableTopList} key={data.id}>
          <Text style={[styles.tableRow,{color:'#75c0f6'}]} numberOfLines={1}
                onPress={() => {this._toDetail(data.id,data.borrowTitle)}} >
              {data.borrowTitle}</Text>
          {
              this.state.choseType == 0 ?
                  <Text  style={[styles.tableRow,{color: '#75c0f6'}]} onPress={() => this.toBorrow(data.borrowId)} >查看合同</Text>
                  : null
          }
          <Text numberOfLines={1} style={styles.tableRow}>{Utils.formatCurrency(data.borrowAmount)}</Text>
          <Text style={styles.tableRow}>{data.annualRate}%</Text>
          <Text style={styles.tableRow}>{data.deadline}个月</Text>
          <Text style={styles.tableRow}>{this._getStatus(data.borrowStatus)}</Text>
        </View>
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
      if(this.state.isPage) return;
      if(this.state.isShowBottomRefresh){
          return (<View style={{marginVertical: 10}}>
                  <ActivityIndicator />
          </View>)
      }
     }
    _end(){
      if(this.state.isEmpty) return;
      if(this.state.isPage) return;
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
      this.setState(params,()=>{this.setState({animating:true});this._getData()});
    }
    //还款明细
    _toLoanRepayment(){
      this.props.navigator.push({component:LoanRepayment,name:'LoanRepayment'});
    }

      //标的详情
      _toDetail(id,title){
          this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
      }

    render(){
      let rightIcon = require('../../images/icon/icon_date.png');
      return (
        <View style={{flex:1}}>

         <View style={{flex:1,backgroundColor:'#fff'}}>
             <View style={styles.tableTop}>
               <Text style={styles.tableRow}>标题</Text>
                 {
                     this.state.choseType == 0 ? <Text style={styles.tableRow}>操作</Text> : null
                 }
               <Text style={styles.tableRow}>金额(元)</Text>
               <Text style={styles.tableRow}>年利率</Text>
               <Text style={styles.tableRow}>期限</Text>
               <Text style={styles.tableRow}>状态</Text>
             </View>
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
