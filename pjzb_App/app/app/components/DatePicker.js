/**
 * Created by wsl on 2017/02/23.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   TouchableOpacity,
   Animated,
   Easing,
   DatePickerIOS,
   Platform,
   DatePickerAndroid
 } from 'react-native';

 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;
 export default class DatePicker extends Component{
   constructor(props){
     super(props);
     this.state={
       date:props.defaultDate||new Date(),
       openDate:false,
       dateOpacity:new Animated.Value(0),
       dateViewPosin:new Animated.Value(-420/oPx)
     }
   }
   formateDate(date){
      let year = date.getFullYear() ;
      let month = date.getMonth() +1 ;
      month = month<10?'0'+month:month;
      let day = date.getDate() ;
      day = day<10?'0'+day:day;
      let formatedStr = year + '-' + month +'-' + day ;
      return formatedStr ;
    }
   onDateChange(date){
     this.setState({date: date});
   }
   //选择
   _choseDatePicker(){
     this.props.closeOpenDate();
     if(this.props.dateType == 'start'){
       this.props.dateCallBack({startDate:this.formateDate(this.state.date)});
     }else{
       this.props.dateCallBack({endDate:this.formateDate(this.state.date)});
     }
   }
   //关闭
   _closeDatePicker(){
     this.props.closeOpenDate();
   }
   async showPicker(dateType) {

     try {
       const {action, year, month, day} = await DatePickerAndroid.open({
         date: this.state.date,
         mode:'spinner'
       });
       if(action!='dataSetAction'){
        //此状态为取消或不选择状态，当前版本.40，无处理方法，待修复
       }
       if (action !== DatePickerAndroid.dismissedAction) {
         if(dateType=='start'){
           //this.setState({startDate:new Date(year,month,day)});
           this.props.dateCallBack({startDate:this.formateDate(new Date(year,month,day))});
         }else{
           this.props.dateCallBack({endDate:this.formateDate(new Date(year,month,day))});
         }
       }
     } catch ({code, message}) {
       alert(message);
     }
  }
   _viewAmin(pos,opt,time){
     Animated.parallel([
        Animated.timing(
           this.state.dateViewPosin,
           {
             toValue:pos,
             duration:time,
             easing: Easing.linear
           }
         ),
        Animated.timing(
           this.state.dateOpacity,
           {
             toValue:opt,
             duration:time,
             easing: Easing.linear
           }
         ),
    ]).start();
   }
   shouldComponentUpdate(nextProps, nextState) {
      return this.props.openDate!=nextProps.openDate || this.state.openDate != nextProps.openDate || nextState.date;
   }
   componentWillReceiveProps(nextProps){
    if(!nextProps.openDate&&!this.state.openDate){
      return ;
    }
    if(nextProps.openDate){
      if(Platform.OS=='android'){
        this.setState({date:this.props.defaultDate},()=>{this.showPicker(this.props.dateType)})
      }else{
        this.setState({openDate:nextProps.openDate},()=>this._viewAmin(0,0.6,300));
      }
    }else if(this.state.openDate&&!nextProps.openDate){
      this._viewAmin(-420/oPx,0,200);
      setTimeout(()=>{this.setState({openDate:nextProps.openDate})},300);
    }
   }
   render(){
     return(
       this.state.openDate&&Platform.OS=='ios'?<View style={styles.datePickerContainer}>
         <Animated.View style={[styles.dateModal,{opacity:this.state.dateOpacity}]}>
         </Animated.View>
         <Animated.View style={[styles.datePicker,{bottom:this.state.dateViewPosin}]}>
           <View style={styles.datePickerTop}>
             <TouchableOpacity style={styles.pickerBtn} onPress={this._closeDatePicker.bind(this)}>
               <Text style={styles.pickerBtnText}>取消</Text>
             </TouchableOpacity>
             <View style={styles.pickerTitle}>
             </View>
             <TouchableOpacity style={styles.pickerBtn} onPress={this._choseDatePicker.bind(this)}>
               <Text style={[styles.pickerBtnText,{color:'#eb3331'}]}>确定</Text>
             </TouchableOpacity>
           </View>
           <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={(date)=>this.onDateChange(date)}
          />
        </Animated.View>
       </View>:null
    )
   }
 }
 const styles = StyleSheet.create({
   datePickerContainer:{
     width:StyleConfig.screen_width,
     height:StyleConfig.screen_height,
     position:'absolute',
     left:0,
     top:0,
     zIndex:100,
   },
   datePicker:{
     width:StyleConfig.screen_width,
     height:420/oPx,
     position:'absolute',
     left:0,
     bottom:0,
     zIndex:10,
     backgroundColor:'#fff'
   },
   dateModal:{
     width:StyleConfig.screen_width,
     height:StyleConfig.screen_height,
     backgroundColor:'#000',
     position:'absolute',
     top:0,
     left:0,
     zIndex:1
   },
   datePickerTop:{
     width:StyleConfig.screen_width,
     height:80/oPx,
     flexDirection:'row',
     borderBottomWidth:StyleConfig.borderWidth,
     borderBottomColor:'#e0e0e0'
   },
   pickerBtn:{
     width:110/oPx,
     height:80/oPx,
     justifyContent:'center',
     alignItems:'center',
   },
   pickerTitle:{
     flex:1,
   },
   pickerBtnText:{
     color:'#999',
     fontSize:28/oPx
   }
 })
