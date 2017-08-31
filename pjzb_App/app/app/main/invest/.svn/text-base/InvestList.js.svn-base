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
   ActivityIndicator,
   Alert,
   InteractionManager
 } from 'react-native';
 import {styles} from '../../style/main';
 import ProductList from '../../components/Product';
 import Request from '../../utils/Request';
 import {toastShort} from '../../utils/Toast';
 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class Product extends Component {
   constructor(props){
     super(props);
     this.state = {
       oData:[],
       dataSource:ds.cloneWithRows([]),
       isRefreshing:false,
       curPage:1,
       totalPageNum:0,
       isShowBottomRefresh:true,
       productType:this.props.productType
     }
   }
   //获取数据
   _getData(flag){
     Request.post('investList.do',{curPage:this.state.curPage,tt:'',yy:'',xx:this.state.productType,rates:'',timeers:'',deadlines:'',flages:'',titles:''},(data)=>{
       if(data.error=='0'){
         if(data.pageBean.page.length == 0){
           this.setState({
             isEmpty:true
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
             isRefreshing:false
           });
         }else{
           this.setState({
             curPage:1,
             oData:data.pageBean.page,
             dataSource:ds.cloneWithRows(data.pageBean.page),
             isRefreshing:false
           });
         }
       }else{
         Alert.alert('提示',data.msg);
       }
     },(error)=>{
       //console.log(error);
     });
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
    InteractionManager.runAfterInteractions(this._getData());
   }
   _renderFooter() {
     if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
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
     this.setState({curPage:1,isRefreshing:true},()=>this._getData(false));
   }
   
   render(){
     return (<ListView
       dataSource={this.state.dataSource}
       renderRow={this._renderRow.bind(this)}
       style={styles.listView}
       onEndReached={this._end.bind(this)}
       onEndReachedThreshold={30}
       pageSize={5}
       enableEmptySections = {true}
       renderFooter={this._renderFooter.bind(this)}
       refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          tintColor="#ff0000"
          title="刷新中..."
          titleColor="#999"
        />}
     />);
   }
 }
