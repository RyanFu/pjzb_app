/**
 * Created by wsl on 2017/01/13.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   ListView,
   RefreshControl,
   ActivityIndicator
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 import {styles} from '../../style/main';
const oPx = StyleConfig.oPx;
 import ProductList from '../../components/Product';
 import Loading from '../../components/Loading';
 import Request from '../../utils/Request';
 import {toastShort} from '../../utils/Toast';
 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class Product extends Component {
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
       productType:'6'
     }
   }
   //获取数据
   _getData(flag){
     Request.post('investList.do',{curPage:this.state.curPage,tt:'',yy:'',xx:this.state.productType,rates:'',timeers:'',deadlines:'',flages:'',titles:''},(data)=>{
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
       //console.log(error);
     });
   }
   _leftbtn(){
     console.log(1);
   }
   //生成list
   _renderRow(data){
     return (
       <ProductList showList={true} data={data} onPressEvent={this._onPress.bind(this)}/>
     )
   }
   _onPress(id,title){
     this.props.navigator(id,title);
   }
   componentDidMount(){
     this._getData();
   }
   _renderFooter() {
     if(this.state.isShowBottomRefresh){
         return (<View style={{marginVertical: 10}}>
                 <ActivityIndicator />
         </View>)
     }else{
       return null;
     }
    }
   _end(){
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
   returnElm(){
     if(this.state.animating){
       return <Loading show={this.state.animating}/>
     }
     return <View style={{flex:1}}><ListView
       dataSource={this.state.dataSource}
       renderRow={this._renderRow.bind(this)}
       style={styles.listView}
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
        />}
     /></View>
   }
   render(){
     return (this.returnElm());
   }
 }
