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
   Platform
 } from 'react-native';

 import NavigationBar from '../../components/NavigationBar';
 import DatePicker from '../../components/DatePicker';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;
 import Loading from '../../components/Loading';
 import Request from '../../utils/Request';
 import Utils from '../../utils/utils';
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
       isShowBottomRefresh:true,
       productType:'3',
       startTime:'',
       endTime:'',
       momeyType:'0',
       beginX:0,beginY:0,beginTime:0,
       viewPosin:new Animated.Value(-520/oPx),
       viewOpct:new Animated.Value(0),
       hideLayout:false,
       choseType:0,
       date:new Date(),
       startDate:'',
       endDate:'',
       openDate:false,
       choseData:[{text:'全部'},{text:'投资'},{text:'充值'},{text:'提现'},{text:'还款'},{text:'奖励'},{text:'冻结'}]
     }
   }
   _goBack(){
     this._choseOpenDate();
     //goBack(this.props.navigator);
   }
   _choseOpenDate(){
     this.setState({openDate:!this.state.openDate});
   }
   _dateCallBack(date){
     this.setState({openDate:false});
     this.setState(date);
   }
   //获取数据
   _getData(flag){
     Request.post('findCapitalRecord.do',{uid:'',startTime:this.state.startTime,endTime:this.state.endTime,momeyType:this.state.momeyType,curPage:this.state.curPage},(data)=>{
       if(data.pageBean.page.length == 0){
         this.setState({
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
       }
     },(error)=>{
       console.log(error);
     });
   }
   //投资记录list
   _renderRow(data,index){
     return <View style={styles.tableTopList} key={data.id}>
         <Text style={styles.tableRow}>{data.recordTime.substring(0,10)}</Text>
         <Text style={styles.tableRow}>{data.fundMode}</Text>
         <Text style={styles.tableRow}>{Utils.formatCurrency(data.income)}</Text>
         <Text style={styles.tableRow}>{Utils.formatCurrency(data.usableSum)}</Text>
       </View>
   }
   componentDidMount(){
     this._getData();
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
   _onRefresh(){
     this.setState({curPage:1},()=>this._getData(true));
   }
   loginOrRegist(){
     this.setState({dialog:true});
     this._animLayout(0,200);
   }
   _onTouchStart(evt){
     this.setState({beginX:evt.nativeEvent.pageX,beginY:evt.nativeEvent.pageY,beginTime:evt.nativeEvent.timestamp});
   }
   _onTouchEnd(evt){
    let {beginX,beginY,beginTime} = this.state;
    const {pageX,pageY,timestamp} = evt.nativeEvent;
    if(pageX-beginX>200/oPx){
        this._animLayout(-520/oPx,300);
        this.setState({hideLayout:true})
    }else{
      this._animLayout(0,300);
    }
   }
   _onTouchMove(evt){
    let {beginX,beginY,beginTime} = this.state;
    const {pageX,pageY,timestamp} = evt.nativeEvent;
    if(beginX<pageX){
        this._animLayout(beginX-pageX,10);
    }
   }
   _animLayout(pos,time){
     Animated.parallel([
        Animated.timing(
           this.state.viewPosin,
           {
             toValue:pos,
             duration:time,
             easing: Easing.linear
           }
         ),
        Animated.timing(
           this.state.viewOpct,
           {
             toValue:0.6-(0.6*Math.abs(pos)/(520/oPx)),
             duration:time,
             easing: Easing.linear
           }
         ),
    ]).start(()=>{this.state.hideLayout?this.setState({dialog:false,hideLayout:false}):null});
   }
   _choseType(type){
     this.setState({choseType:type});
   }

   _renderChoseRow(row,index){
     return <TouchableOpacity key={index} onPress={this._choseType.bind(this,index)} style={[styles.typeViewTap,this.state.choseType==index?styles.typeViewTapActive:null]}>
       <Text style={[styles.choseText,this.state.choseType==index?styles.choseTextActive:null]}>
         {row.text}
       </Text>
       {this.state.choseType==index?<Image style={styles.choseIcon} source={require('../../images/other/icon_fund_chose.png')}/>:null}
     </TouchableOpacity>
   }
   render(){
     let rightIcon = require('../../images/icon/icon_date.png');
     return (
       <View style={{flex:1}}>
        <NavigationBar
          title={"投资记录"}
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          rightDisplay={false}
          rightTitle="筛选"
          rightBtnFunc={this.loginOrRegist.bind(this)}
        />
        <View style={styles.tableTop}>
          <Text style={styles.tableRow}>交易时间</Text>
          <Text style={styles.tableRow}>交易类型</Text>
          <Text style={styles.tableRow}>交易金额</Text>
          <Text style={styles.tableRow}>可用余额</Text>
        </View>
        {/*<ListView
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
         />}/>*/}
         {this.state.dialog?<View style={styles.dialogModal}>
           <Animated.View style={[styles.modal,{opacity:this.state.viewOpct}]}>
           </Animated.View>
           <Animated.View style={[styles.containerView,{right:this.state.viewPosin}]}
              rel="moveView"
              onStartShouldSetResponder={(evt)=>true}
              onTouchStart={(evt)=>this._onTouchStart(evt)}
              onTouchMove={(evt)=>this._onTouchMove(evt)}
              onTouchEnd={(evt)=>this._onTouchEnd(evt)}
              >
             <View style={styles.titleView}>
               <Text style={styles.typeViewText}>状态</Text>
             </View>
             <View style={styles.typeView}>
               {this.state.choseData.map((row,index)=>this._renderChoseRow(row,index))}
             </View>
             <View style={[styles.titleView,{marginTop:0}]}>
               <Text style={styles.typeViewText}>时间</Text>
             </View>
             <View style={[styles.typeView,{borderBottomWidth:0}]}>
               <TouchableOpacity style={styles.dateView}>
                 <Text style={styles.dateText}>
                   {this.state.startDate}
                 </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.dateView}>
                 <Text style={styles.dateText}>
                   {this.state.endDate}
                 </Text>
               </TouchableOpacity>
             </View>
           </Animated.View>
         </View>:null}
         <DatePicker openDate={this.state.openDate} start={'start'} choseOpenDate={this._choseOpenDate.bind(this)} dateCallBack={this._dateCallBack.bind(this)}/>
       </View>
     );
   }
 }
