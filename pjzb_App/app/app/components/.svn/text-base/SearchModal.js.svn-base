/**
 * Created by wsl on 2017/02/23.
 适用于右侧滑动搜索菜单
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
   TextInput
 } from 'react-native';
 import DatePicker from './DatePicker';
 import {StyleConfig} from '../style/index';
 import {toastShort} from '../utils/Toast';
 const oPx = StyleConfig.oPx;
 import styles from '../style/funddetail';
export default class SearchModal extends Component{
    constructor(props){
      super(props);
      this.state={
        dialog:false,
        beginX:0,beginY:0,beginTime:0,
        viewPosin:new Animated.Value(-520/oPx),
        viewOpct:new Animated.Value(0),
        choseType:0,
        hideLayout:false,
        openDate:false,
        startDate:'',
        endDate:'',
        defaultDate:'',
      }
    }
    componentWillReceiveProps(nextProps){
     if(nextProps.dialog){
       this.setState({dialog:nextProps.dialog},()=>this._animLayout(0,200));
     }else if(this.state.dialog&&!nextProps.dialog){
       this._animLayout(-520/oPx,300);
       setTimeout(()=>{this.setState({dialog:nextProps.dialog})},300);
     }
    }
    _onTouchStart(evt){
      this.setState({beginX:evt.nativeEvent.pageX,beginY:evt.nativeEvent.pageY,beginTime:evt.nativeEvent.timestamp});
    }
    _onTouchEnd(evt){
     let {beginX,beginY,beginTime} = this.state;
     const {pageX,pageY,timestamp} = evt.nativeEvent;
     if(pageX-beginX>200/oPx){
         this._animLayout(-520/oPx,300);
         this.setState({hideLayout:true});
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
     ]).start(()=>{this.state.hideLayout?this.setState({hideLayout:false},()=>this.props.modalEvent()):null});
    }
    _choseType(type){
      this.setState({choseType:type});
    }
    //选择日期
    _choseOpenDate(dateType){
      if(dateType=='start'){
        let dafault = this.state.startDate==''? new Date():new Date(this.state.startDate);
        this.setState({dateType:dateType,defaultDate:dafault},()=>{this.setState({openDate:!this.state.openDate})});
      }else{
        let dafault = this.state.endDate==''? new Date():new Date(this.state.endDate);
        this.setState({dateType:dateType,defaultDate:dafault},()=>{this.setState({openDate:!this.state.openDate})});
      }
    }
    //关闭日期
    _closeOpenDate(){
      this.setState({openDate:false});
    }
    _dateCallBack(date){
      this.setState({openDate:false});
      this.setState(date);
    }
    //确定按钮
    _onSubmit(){
        if (this.state.startDate!='' || this.state.endDate!=''){
            if(this.state.startDate==''){
                toastShort('开始时间不能为空');
                return;
            }
            if(this.state.endDate==''){
                toastShort('结束时间不能为空');
                return;
            }
            let start = this.state.startDate.replace(/-/g,'');
            let end = this.state.endDate.replace(/-/g,'');
            if(start>end){
                toastShort('开始时间不能大于结束时间');
                return;
            }
        }

        let params = {
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            choseType:this.state.choseType
        };
        this.props.modalEvent();
        this.props.onSubmit(params);
    }
    _renderChoseRow(row,index){
      return <TouchableOpacity key={index} onPress={this._choseType.bind(this,index)} style={[styles.typeViewTap,this.state.choseType==index?styles.typeViewTapActive:null]}>
        <Text style={[styles.choseText,this.state.choseType==index?styles.choseTextActive:null]}>
          {row.text}
        </Text>
        {this.state.choseType==index?<Image style={styles.choseIcon} source={require('../images/other/icon_fund_chose.png')}/>:null}
      </TouchableOpacity>
    }

    onPress = () => {
        this.setState({hideLayout:true,});
        this._animLayout(-520/oPx,300);
        // 延时是为了让动画执行完之后再改变状态值
        setTimeout(()=>{this.setState({dialog:false})},300);
    }

    render(){
      return (
          this.state.dialog?<View style={styles.dialogModal}>
            <Animated.View style={[styles.modal,{opacity:this.state.viewOpct}]}>
                <TouchableOpacity onPress={this.onPress} style={{flex:1}}></TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.containerView,{right:this.state.viewPosin}]}
               rel="moveView"
               onStartShouldSetResponder={(evt)=>true}
               onTouchStart={(evt)=>this._onTouchStart(evt)}
               onTouchMove={(evt)=>this._onTouchMove(evt)}
               onTouchEnd={(evt)=>this._onTouchEnd(evt)}
               >
              {this.props.status?<View style={styles.titleView}>
                <Text style={styles.typeViewText}>状态</Text>
              </View>:null}
              <View style={styles.typeView}>
                {this.props.choseData.map((row,index)=>this._renderChoseRow(row,index))}
              </View>
              <View style={[styles.titleView,{marginTop:15}]}>
                <Text style={styles.typeViewText}>时间</Text>
              </View>
              <View style={[styles.typeView,{borderBottomWidth:0}]}>
                <TouchableOpacity style={styles.dateView} onPress={this._choseOpenDate.bind(this,'start')}>
                  <TextInput
                      style={styles.dateViewInput}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.startDate}
                      editable={false}
                      underlineColorAndroid="transparent"
                      placeholder="开始时间"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateView} onPress={this._choseOpenDate.bind(this,'end')}>
                  <TextInput
                      style={styles.dateViewInput}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.endDate}
                      editable={false}
                      underlineColorAndroid="transparent"
                      placeholder="结束时间"
                    />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this._onSubmit.bind(this)} style={styles.searchBtn}><Text style={styles.searchBtnText}>确定</Text></TouchableOpacity>
            </Animated.View>
            <DatePicker
              openDate={this.state.openDate}
              dateType={this.state.dateType}
              closeOpenDate={this._closeOpenDate.bind(this)}
              dateCallBack={this._dateCallBack.bind(this)}
              defaultDate={this.state.defaultDate}
            />
          </View>
          :null
      )
    }

}
