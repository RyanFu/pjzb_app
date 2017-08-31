
 /**
  * Created by wsl on 2017/02/23.
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
    Platform,
    AsyncStorage
  } from 'react-native';

  import NavigationBar from '../../components/NavigationBar';
  import SearchModal from '../../components/SearchModal';
  import {StyleConfig} from '../../style/index';
  const oPx = StyleConfig.oPx;
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import Utils from '../../utils/utils';
  import Storage from '../../utils/Storage';
  import styles from '../../style/funddetail';
  import {toastShort} from '../../utils/Toast';
  import { goBack } from '../../utils/NavigatorBack';
  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class Product extends Component {
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
        startDate:'',
        endDate:'',
        choseType:0,
        choseData:[{text:'全部'},{text:'投资'},{text:'充值'},{text:'提现'},{text:'还款'},{text:'奖励'},{text:'冻结'}]
      }
    }
    _goBack(){
      goBack(this.props.navigator);
    }
    //获取数据
    _getData(flag){
      Request.post('findCapitalRecord.do',{uid:'',startTime:this.state.startDate,endTime:this.state.endDate,momeyType:this.state.choseType,curPage:this.state.curPage},(data)=>{
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
        }else{
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
      },(error)=>{
        console.log(error);
      });
    }
    //投资记录list
    _renderRow(data,index){
      return <View style={styles.tableTopList} key={data.id}>
          <Text style={[styles.tableRow,styles.black]}>{data.recordTime.substring(0,10)}</Text>
          <Text style={[styles.tableRow,styles.black]}>{data.fundMode}</Text>
          <Text style={[styles.tableRow,styles.black]}>{Utils.formatCurrency(data.handleSum)}</Text>
          <Text style={[styles.tableRow,styles.black]}>{Utils.formatCurrency(data.usableSum)}</Text>
        </View>
    }
    componentDidMount(){
      setTimeout(()=>{
        this.setState({animating:true});
        this._getData();
      },500);
    }
    _renderFooter() {
      if(this.state.isEmpty){
        return (<View style={styles.moreBottom}>
                <Text style={{color:'#999'}}>暂无资金记录</Text>
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
      if(this.state.totalPageNum == 1) return;
      let index = this.state.curPage;
      index++;
      if(index>this.state.totalPageNum){
        toastShort('没有更多了哦',-100);
        this.setState({isShowBottomRefresh:false});
      }else{
        this.setState({curPage:index},()=>this._getData(true));
      }
    }
    _onRefresh(){
      this.setState({curPage:1},()=>this._getData());
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
    render(){
      let rightIcon = require('../../images/icon/icon_date.png');
      return (
        <View style={{flex:1}}>

         <NavigationBar
           title={"资金记录"}
           leftShowIcon={true}
           leftBtnFunc={this._goBack.bind(this)}
           rightDisplay={false}
           rightTitle="筛选"
           rightBtnFunc={this._openSearch.bind(this)}
         />
         <View style={{flex:1,backgroundColor:'#fff'}}>
             <View style={styles.tableTop}>
               <Text style={styles.tableRow}>交易时间</Text>
               <Text style={styles.tableRow}>交易类型</Text>
               <Text style={styles.tableRow}>交易金额</Text>
               <Text style={styles.tableRow}>可用余额</Text>
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
