
 /**
  * Created by cqm on 2017/02/24.
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
      Alert,
    Switch,
  } from 'react-native';

  import Radio from '../../components/Radio';
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import {StyleConfig} from '../../style/index';
  import {toastShort} from '../../utils/Toast';
  import Error from '../error/Error.js';
  
  const oPx = StyleConfig.oPx;
  export default class LoanRepaymentSet extends Component {
    constructor(props){
      super(props);
      this.state = {
        bidStatus:false,
        usableSum:0,
        animating:false,
        // 是否发生网络错误
        isError: false,
      }
    }
    _goBack(){
      goBack(this.props.navigator);
    }
    //获取数据
    _getData(flag){
      Request.post('autoRepaymentInit.do',{uid:''},(data)=>{
        this.setState({isError: false});
        if(data.error == 0){
          this.setState({ 
            bidStatus:data.bidStatus==1,
            usableSum:data.automaticBidMap.usableSum,
            animating:false,
          });
          return;
        }else{
            Alert.alert("提示",data.msg);
          this.setState({
            animating:false,
          });
        }
        
      },(error)=>{
        this.setState({isError: true,animating:false});
      });
    }
   componentDidMount(){
      this.setState({animating:true});
      this._getData();
    }
      _onChange(vv){
          var newstatus= vv ? 2 : 1 ;
          Request.post('autoRepayment.do',{uid:'',status:newstatus},(data)=>{
              console.log(JSON.stringify(data));
              if(data.error == 0){
                  this.setState({
                      animating:false,
                      bidStatus:vv,
                  });
                  toastShort('设置成功!',-300);
                  return;
              }else{
                  toastShort('设置失败：'+data.msg,-300);
                  this.setState({
                      animating:false,
                  });
              }

          },(error)=>{
              toastShort('设置失败!',-300);
              this.setState({
                  animating:false,
              });
              console.log(error);
          });
      }
    
    render(){

      return (
        <View style={styles.bodyView}>
          {
            this.state.isError
            ?
            <Error onPress={this._getData.bind(this)} />
            :
            <View>
            <View style={styles.containerMsg}>
                <View style={styles.msgView}>
                    <Text style={[styles.containerMsgText,{marginTop:20/oPx}]}>自动还款工具说明：</Text>
                </View>
                <View style={styles.msgView}>
                    <Text style={[styles.containerMsgText,{marginTop:20/oPx}]}>a）用户开启自动还款设置后，到达还款日的当天12点15</Text>
                    <Text style={[styles.containerMsgText,{marginLeft:60/oPx}]}>分，如果用户账户正常，即会自动进行还款。</Text>
                </View>
                <View style={styles.msgView}>
                    <Text style={[styles.containerMsgText,{marginTop:20/oPx}]}>b）保证用户账户可用余额足够支付还款金额，如果还款</Text>
                    <Text style={[styles.containerMsgText,{marginLeft:60/oPx,}]}>日当天超过12点15分用户账户可用余额不足而导致自</Text>
                    <Text style={[styles.containerMsgText,{marginLeft:60/oPx}]}>动还款失败，则用户需要进行手动还款，否则会造成</Text>
                    <Text style={[styles.containerMsgText,{marginLeft:60/oPx,marginBottom:20/oPx,}]}>还款逾期。</Text>
                </View>
              </View>
            <View style={styles.containerSet}>
              <View style={styles.containerSetLine1}>
                  <Text style={[styles.containerSetText,{marginBottom:24/oPx}]}>账户余额：</Text>
                  <Text style={[styles.containerSetMoney,{marginBottom:24/oPx}]}>{this.state.usableSum}元</Text>
              </View>
              <View style={styles.containerSetLine2}>
                  <Text style={[styles.containerSetText,{marginTop:12/oPx}]}>自动还款设置：</Text>
                  {/**<Text style={styles.containerSetText}>已{this.state.bidStatus?'开启':'关闭'}</Text>*/}
                  <Switch
                      onValueChange={(value) => this._onChange(value)}
                      value={this.state.bidStatus}
                      style={{marginTop:12/oPx}}
                  />
              </View>
            </View>
            <Loading show={this.state.animating} top={true}/>
            </View>
          }
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
      /**整体布局是上下结构*/
      bodyView: {
          flex: 1,
      },
      containerMsg:{
        marginTop:16/oPx,
        backgroundColor:'white',
      },
      msgView: {
          width: StyleConfig.screen_width,
      },
      containerMsgText:{
        fontSize:28/oPx,
        color:'#333',
        marginTop:10/oPx,
          marginLeft:20/oPx,
      },
      containerSet:{
        marginTop:16/oPx,
        padding:20/oPx,
        backgroundColor:'white'
      },
      containerSetLine1:{
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1/oPx,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      containerSetLine2:{
        padding:0/oPx,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      containerSetText:{
        fontSize:26/oPx,
        color:'#333',
      },
      containerSetMoney:{
        fontSize:26/oPx,
        color:'red',
      },
    
  });
