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
   TouchableWithoutFeedback,
   RefreshControl,
   ActivityIndicator
 } from 'react-native';
 import Utils from '../../utils/utils';
 import Request from '../../utils/Request';
 import {StyleConfig} from '../../style';
 import styles from '../../style/investDetail';
 import {toastShort} from '../../utils/Toast';
 const oPx = StyleConfig.oPx; 
export default class InvestRecord extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShowBottomRefresh:true,
      curPage:1,
      totalPageNum:1,
      oData:[],
      isEmpty:false,
      getMore:false
    }
  }
  componentDidMount(){
    this._getInvetData();
  }
  //投资记录list
  _renderRow(data,index){
      let type;
      if (data.pageType == 'PC') {
          type = 'PC端';
      } else if (data.pageType == 'phonepage') {
          type = '移动端';
      } else {
          type = 'APP';
      }
    return <View style={styles.tableTopList} key={data.id}>
        <Text style={styles.tableRow}>{data.username}</Text>
        <Text style={styles.tableRow}>{Utils.formatCurrency(data.investAmount)}</Text>
        <Text style={styles.tableRow}>{data.investTime}</Text>
        <Text style={styles.tableRow}>{type}</Text>
      </View>
  }
  //获取投资
  _getInvetData(flag){
    Request.post('investmentRecord.do',{
      curPage:this.state.curPage,
      borrowId:this.props.borrowId,
      uid:''
    },(data)=>{
      if(data.pageBean.page.length == 0){
        this.setState({
          isRefreshing:false,
          isEmpty:true
        });
        return;
      };
      setTimeout(()=>{
        this.setState({totalPageNum:data.pageBean.totalPageNum});
        if(data.pageBean.totalPageNum>1){
          this.setState({getMore:true})
        }else{
          this.setState({getMore:false,isShowBottomRefresh:false})
        }
      },300);
      if(flag){
        let result = this.state.oData.concat(data.pageBean.page);
        this.setState({
          oData:result,
          isRefreshing:false
        });
      }else{
        this.setState({
          animating:false,
          curPage:1,
          oData:data.pageBean.page,
          isRefreshing:false
        });
        setTimeout(()=>{this.setState({listViewFirst:true})},2000);
      }
    },(error)=>{
      //console.log(error);
    });
  }
  //底部加载更多
  _onEndReached(e){
    this.setState({isShowBottomRefresh:true,getMore:false});
    let index = this.state.curPage;
    index++;
    if(index>this.state.totalPageNum){
      toastShort('没有更多了哦',-100);
      this.setState({isShowBottomRefresh:false,getMore:false});
    }else{
      setTimeout(()=>{
        this.setState({curPage:index},()=>this._getInvetData(true));
      },500)
    }
  }
  _onScroll(){
    this.props.pagingEnabled();
  }
  //底部刷新
  _renderFooter(){
    if(this.state.isEmpty){
      return (<View style={styles.moreBottom}>
              <Text style={{color:'#999'}}>暂无投资记录</Text>
      </View>)
    }
    if(this.state.getMore){
      return (
        <View style={styles.moreBottom}><Text style={{color:'#999'}} onPress={(e)=>{this._onEndReached(e)}}>召唤更多</Text></View>)
    }
    if(this.state.isShowBottomRefresh){
        return (<View style={{marginVertical: 10}}>
                <ActivityIndicator />
        </View>)
    }
    return null;
   }
   render(){
    return(<View style={[styles.detailViewTwo,{overflow:'hidden'}]}>
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
   </View>
    )
   }
}
