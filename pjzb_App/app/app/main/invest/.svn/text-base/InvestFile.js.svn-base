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
   ActivityIndicator,
   Alert,
   TouchableOpacity
 } from 'react-native';
 import Request from '../../utils/Request';
 import {StyleConfig} from '../../style';
import OtherImageFile from './OtherImageFile';
 const oPx = StyleConfig.oPx;
export default class InvestFile extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShowBottomRefresh:true,
      oData:[],
      groupId:'',
      userId:''
    }
  }
  componentDidMount(){
    this._getInvetData();
  }

  //查看其他图片资料
  _otherImagePress(){
      this.props.navigator.push({component:OtherImageFile,name:'OtherImageFile',params:{groupId:this.state.groupId,userId:this.state.userId}});
  }

  //投资记录list
  _renderRow(data,index){
      if(index==0){
          this.state.groupId = data.groupid;
          this.state.userId = data.userId;
      }
      let filename = data.name;
    return <View style={[style.tableList]} key={index}>
          <Text style={style.tableListItemText}>{data.name}</Text>
        {filename=== '其他资料' ?<TouchableOpacity onPress={()=>this._otherImagePress()}>
                <Image style={style.tableListItemImages} resizeMode="stretch" source={{uri:data.imgPath}}/>
            </TouchableOpacity>
             :
            <Image style={style.tableListItemImages} resizeMode="stretch" source={{uri:data.imgPath}}/>
        }
        </View>
  }
  //获取投资
  _getInvetData(flag){
    Request.post('relatedDocuments.do',{
      borrowId:this.props.borrowId,
      uid:''
    },(data)=>{
      if(data.error=='0'){
        this.setState({oData:data.auditList,isShowBottomRefresh:false});
      }else{
          Alert.alert('提示信息', data.msg)
      }
    },(error)=>{
        Alert.alert('提示信息', '你的网络不稳定，请稍后再试！')
    });
  }
  //底部刷新
  _renderFooter(){
    if(this.state.isShowBottomRefresh){
        return (<View style={{marginVertical: 10}}>
                <ActivityIndicator />
        </View>)
    }
   }
   render(){
    return(
       <ScrollView style={{padding:30/oPx,paddingTop:1/oPx}}
        scrollEventThrottle={300}
       >
         {
           this.state.oData.map((row, index) =>{
               return this._renderRow(row,index);
           })
         }
         {this._renderFooter()}
     </ScrollView>
    )
   }
}

const style = StyleSheet.create({
    tableList:{
        height:StyleConfig.screen_width-100/oPx,
        backgroundColor:'#fff',
        marginTop:36/oPx,
        justifyContent:'flex-start',
    },
    tableListItemImages:{
        width:StyleConfig.screen_width-70/oPx,
        height:StyleConfig.screen_width-170/oPx,
    },
    tableListItemText:{
        marginBottom:20/oPx,
        color:'#333',
    },
});