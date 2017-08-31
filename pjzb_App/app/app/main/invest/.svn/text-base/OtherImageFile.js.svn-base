/**
 * Created by zlx on 2017/02/21.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   Alert,
   ScrollView,
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
import NavigationBar from '../../components/NavigationBar';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';

 const oPx = StyleConfig.oPx;
 export default class OtherImageFile extends Component {
   constructor(props){
     super(props);
     this.state = {
         oData:[]
     }
   }
     componentDidMount(){
         this._getOtherData();
     }
     //获取投资
     _getOtherData(){
       let params = {
         typeId:22,
         uid:'',
         userId:this.props.userId,
         groupId:this.props.groupId,};
         Request.post('otherData.do',params,(data)=>{
             if(data.error=='0'){
                 this.setState({oData:data.imgList});
             }else{
                 Alert.alert("提示",data.msg);
             }
         },(error)=>{
             Alert.alert("提示",'您的网络不稳定，请稍后再试！');
         });
     }

     // 其他资料list
     _renderRow(data,index){
         return <View style={styles.imageView} key={index}>
                 <Image source={{uri:data.imagePath}} resizeMode="stretch" style={styles.tableListItemImages} />
             </View>
     }
     //返回
     _goBack(){
         goBack(this.props.navigator);
     }

   render(){
     return (
         <View style={[styles.flex, styles.body]}>
             <NavigationBar
                 title={"其他资料"}
                 leftShowIcon={true}
                 leftBtnFunc={this._goBack.bind(this)}
             />
             <ScrollView style={styles.scrollView}>
                 {
                     this.state.oData.map((row, index) =>{
                         return this._renderRow(row,index);
                     })
                 }
             </ScrollView>
         </View>
     );
   }
 }
 const styles = StyleSheet.create({
     body:{
         width:StyleConfig.screen_width,
         height:StyleConfig.screen_height,
         backgroundColor:'#e9ecf3'
     },
     flex: {
         flex: 1  //平分填满父空间。
     },
     scrollView: {
         marginTop: 40/oPx,
         flex: 1,
         width: StyleConfig.screen_width,
     },
     imageView: {
        marginBottom: 40/oPx,
        alignItems: 'center',
     },
     tableListItemImages:{
         width:StyleConfig.screen_width-70/oPx,
         height:StyleConfig.screen_width-170/oPx,
     },
 });
