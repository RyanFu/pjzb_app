'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    ScrollView,
  } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import {StyleConfig} from '../../style';
import MessageCenter from './messageCenter';
  const oPx = StyleConfig.oPx;
  export default class MessageDetails extends Component {
    constructor(props){
      super(props);
      this.state = {
          _sender:'',
          _mailTitle:'',
          _mailContent:'',
          _sendTime:'',
          showDialog: false,
      }
    }

      componentDidMount(){
          this.setState({showDialog:true});
          let id = this.props.id;
          let uid = this.props.uid;
          //ajax
          let params = {mailId:id,type:1,uid:uid};
          Request.post('queryMessageById.do',params,(data)=>{
              if(data.error =='0'){
                  let str = data.msgContent+'';
                  str.replace('<br/>','');
                  let msgTimes = '发件人: 普金资本  '+data.msgTime+'';
                  this.setState({
                      showDialog:false,
                      _mailTitle:data.msgTitle,
                      _mailContent:str,
                      _sendTime:msgTimes,
                  });
              }else{
                  Alert.alert("提示",data.msg);
              }
          },(error)=>{
              Alert.alert("提示",'您的网络不稳定，请稍后再试！');
          });
      }

      //返回
      _goBack(){
          goBack(this.props.navigator);
          this.props.navigator.replace({component:MessageCenter,name:'MessageCenter'});//返回上一个页面后替换指定页面，等于重新刷新上一个页面。
      }

    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <NavigationBar
                    title="消息详情"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}  />
                <View style={styles.title_View}>
                    <Text style={styles.title_Text}>
                        {this.state._mailTitle}
                    </Text>
                    <Text style={styles.title_Text_min}>
                        {this.state._sendTime}
                    </Text>
                    <View style={styles.hr}></View>
                </View>
                <View style={styles.bodyView}>
                    <Text style={styles.body_text}>
                        {this.state._mailContent}
                    </Text>
                </View>
                <Loading show={this.state.showDialog} top={true}/>

            </ScrollView>
        );
    }
  }
  const styles = StyleSheet.create({
      title_View: {
          flex:1,
          width: StyleConfig.screen_width-60,
          height:110/StyleConfig.oPx,
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 60/StyleConfig.oPx,
      },
      title_Text: {
          fontSize: 36/StyleConfig.oPx,
          color: '#020202',
      },
      title_Text_min: {
          fontSize: 22/StyleConfig.oPx,
          color: '#999999',
          marginTop: 25/StyleConfig.oPx,
      },
      hr: {
          width: StyleConfig.screen_width-60,
          height: 30/StyleConfig.oPx,
          borderBottomColor: StyleConfig.borderColor,
          borderBottomWidth: StyleConfig.borderWidth,
      },
      bodyView: {
          marginTop: 40/StyleConfig.oPx,
          width: StyleConfig.screen_width-120/StyleConfig.oPx,
          height:StyleConfig.screen_height-170/StyleConfig.oPx,
          alignSelf: 'center',
      },
      body_text: {
          color: '#999999',
          fontSize: 28/StyleConfig.oPx,
          marginBottom: 30/StyleConfig.oPx,
          width: StyleConfig.screen_width-60,
          lineHeight:29,
      },

  });
