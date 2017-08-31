/**
 * Created by wsl on 2017/03/28.
 * ##运营报告
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   RefreshControl,
   ActivityIndicator,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../../style';
 import Request from '../../utils/Request';
 import {toastShort} from '../../utils/Toast';
 import RunReportsPage from './RunReportsPage';
 let oPx = StyleConfig.oPx;
 export default class PlatformOperate extends Component {
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
    this._getData();
  }
  //投资记录list
  _renderRow(data,index){
    return <View style={styles.itemsView} key={index}>
			<TouchableOpacity style={styles.items} onPress={()=>this.getDetail(data.month)}>
				<Image source={{uri:data.imgPath}} style={styles.img} resizeMode="cover"/>
      		</TouchableOpacity>
	      </View>
  }
  getDetail = (id) =>{
  	this.props.navigator.push({component:RunReportsPage,name:'RunReportsPage',params:{month:id}});
  }
  //获取投资
  _getData(flag){
    Request.post('querytOperateReport.do',{
        curPage:this.state.curPage,
        uid:'',
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
        this.setState({curPage:index},()=>this._getData(true));
      },500)
    }
  }
  //底部刷新
  _renderFooter(){
    if(this.state.isEmpty){
      return (<View style={styles.moreBottom}>
              <Text style={{color:'#999'}}>暂无数据</Text>
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
    return(
    <View style={{flex:1,backgroundColor:'#fff',marginTop:15/oPx}}>	
       <ScrollView style={{flex:1,padding:15/oPx}}
        scrollEventThrottle={300}
       >
       <View style={styles.container}>
			{
	         this.state.oData.map((row, index) =>{
	             return this._renderRow(row,index);
	         })
	        }
       </View>
       {
         this._renderFooter()
       }
     </ScrollView>
   </View>
    )
   }
}
 const styles = StyleSheet.create({
 	itemsView:{
 		width:StyleConfig.screen_width/2 - 15/oPx,
 		height:400/oPx + 30/oPx,
 		alignItems:'center',
 		justifyContent:'center'
 	},
 	img:{
 		width:330/oPx,
 		height:400/oPx,
 	},
 	items:{
 		width:330/oPx,
 		height:400/oPx,
 		backgroundColor:'#ccc',
 	},
 	container:{
 		flex:1,
 		width:StyleConfig.screen_width,
 		flexDirection:'row',
 		flexWrap:'wrap'
 	},
 	moreBottom:{
 		marginVertical:10,
 		alignItems:'center'
 	}
 })
