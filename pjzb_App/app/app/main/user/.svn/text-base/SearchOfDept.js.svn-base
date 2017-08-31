/**
 * Created by yls on 2017/03/02.
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
 import DatePicker from '../../components/DatePicker';
 import {StyleConfig} from '../../style/index';
 import {toastShort} from '../../utils/Toast';
 const oPx = StyleConfig.oPx;
 import styles from '../../style/funddetail';
export default class SearchOfDept extends Component{
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
        borrowerName:'',
        borrowTitle:'',
        defaultDate:''
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

    //确定按钮
    _onSubmit(){
      let params = {
        borrowerName:this.state.borrowerName,
        borrowTitle:this.state.borrowTitle,
        choseType:this.state.choseType
      };
      this.props.modalEvent()
      this.props.onSubmit(params);
    }
    _renderChoseRow(row,index){
      return <TouchableOpacity key={index} onPress={this._choseType.bind(this,index)} style={[styles.typeViewTap,this.state.choseType==index?styles.typeViewTapActive:null]}>
        <Text style={[styles.choseText,this.state.choseType==index?styles.choseTextActive:null]}>
          {row.text}
        </Text>
        {this.state.choseType==index?<Image style={styles.choseIcon} source={require('../../images/other/icon_fund_chose.png')}/>:null}
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
              <View style={[styles.titleView,{marginTop:0}]}>
                <Text style={styles.typeViewText}>搜索条件</Text>
              </View>
              <View style={[styles.typeView,{borderBottomWidth:0}]}>
                  <Text  style={[styless.text]}>借款人:</Text>
                  <TextInput
                      style={styless.viewInput}
                      clearButtonMode="while-editing"
                      onChangeText={(borrowerName) => {this.setState({borrowerName})}}
                      value={this.state.borrowerName}
                      underlineColorAndroid="transparent"
                      placeholder="请输入借款人"
                    />
              </View>

                <View style={[styles.typeView,{borderBottomWidth:0}]}>
                    <Text  style={[styless.text]}>标题:</Text>
                    <TextInput
                        style={styless.viewInput}
                        clearButtonMode="while-editing"
                        onChangeText={(borrowTitle) => {this.setState({borrowTitle})}}
                        value={this.state.borrowTitle}
                        underlineColorAndroid="transparent"
                        placeholder="请输入标题"
                    />
                </View>
              <TouchableOpacity onPress={this._onSubmit.bind(this)} style={styles.searchBtn}><Text style={styles.searchBtnText}>确定</Text></TouchableOpacity>
            </Animated.View>
          </View>
          :null
      )
    }

}

const styless = StyleSheet.create({
    viewInput:{
        width:230/oPx,
        height:80/oPx,
        color:'#333',
        fontSize:28/oPx,
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'left',
        fontWeight:'200',
    },
    text:{
        paddingTop:20/StyleConfig.oPx,
        paddingLeft:20/StyleConfig.oPx,
        width:120/StyleConfig.oPx,
        backgroundColor:'transparent',
        color:'#333333',
        fontSize:28/StyleConfig.oPx,
    }

});
