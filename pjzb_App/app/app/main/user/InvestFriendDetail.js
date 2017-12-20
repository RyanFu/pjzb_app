/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  Dimensions,
  Clipboard
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import Request from '../../utils/Request';
import {toastShort} from '../../utils/Toast';
import Error from '../error/Error.js';

let oPx = StyleConfig.oPx;

export default class InvestFriendDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idCode:global.USER.ID,
            imgUri:Request.URL+'qrCode.do?url=http://www.pujinziben.com/wap/app.html#!/regist?useCode='+global.USER.ID,
            activityTime: '',
            activityObject: '',
            activityDescribe: '',
            exampleDescribe: '',
            awardDescribe: '',
            // 是否发生网络错误
            isError: false,
        }
    }

    componentDidMount(){
      // this._get();
    }

    _get() {
      Request.post('queryInviteActivity.do',{uid:''},(data)=>{
        this.setState({isError:false});
          if(data.error == 0){
              this.setState({
                activityTime: data.activityTime,
                activityObject: data.activityObject,
                activityDescribe: data.activityDescribe,
                exampleDescribe: data.exampleDescribe,
                awardDescribe: data.awardDescribe,
              });
          };
        }, (error) => {
          this.setState({isError:true});
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }
    //已邀请的好友
    _hasInviteList(){
        // this.props.navigator.push({component:Setting,name:'Setting'});
    }
    //复制
  async _setClipboardContent(){
    Clipboard.setString('http://www.pujinziben.com/wap/app.html#!/regist?useCode='+global.USER.ID);
    try {
      var content = await Clipboard.getString();
      this.setState({content});
      toastShort('复制成功！',-300);
    } catch (e) {
      this.setState({content:e.message});
    }
  }
	render(){
		return (
			<View style={{flex:1}}>
				<NavigationBar
					title={"邀请好友"}
					leftShowIcon={true}
					leftBtnFunc={this._goBack.bind(this)}
				/>
        {
          this.state.isError
          ?
          <Error onPress={this._get.bind(this)} />
          :
          <ScrollView style={styles.containerScroll}>
            <View style={styles.imgView}>
              <Image style={styles.img} source={require('../../images/user/invest_friend_detail.jpg')}/>
            </View>
            <View style={styles.contentView}>
              <View style={styles.viewTop}>
                <Text style={styles.viewTopText}>尊敬的用户,您的推荐号为：<Text style={styles.viewTopTextColor}>{this.state.idCode}</Text></Text>
              </View>
              <View style={styles.viewTopTextView}>

                <Text style={styles.viewTopTextCenter}>
                  <Text style={{color:'#333'}}>活动时间：</Text>
                  <Text style={styles.activityTimeText}>2017年12月15日—2018年1月15日；</Text>
                </Text>

                <Text style={styles.viewTopTextCenter}>
                  <Text style={{color:'#333'}}>活动对象：</Text>活动期间新注册用户的推荐人；
                </Text>

                <Text style={{color:'#333'}}>活动说明：
                  <Text style={styles.viewTopTextCenter}>
                    1.活动期间邀请好友注册并累计投资满10000元，得50元现金券奖励；
                  </Text>
                </Text>
                
                <Text style={styles.viewTopTextCenter}>
                  2.活动期间内成功邀请5位以上好友注册投资成功合计满100000，可额外获得500元现金券奖励，可在【我的账户-我的赠券】中查看。
                </Text>
                <Text style={styles.viewTopTextCenter}>
                  (满足活动条件的用户在活动结束后3个工作日内奖励将以现金券的形式发放至用户账户)
                </Text>
                
                <Text style={styles.viewTopTextCenter}>
                  <Text style={styles.activityTimeText}>注：</Text>
                  需将自己的邀请链接地址或推荐号发给您的好友，这样您才能成为他的邀请者。
                </Text>
              </View>
              <View style={[styles.viewTopTextView,{marginBottom:100/oPx,flexDirection:'row'}]}>
                <View style={styles.clipView}>
                  <Text style={styles.clipViewText} numberOfLines={1}>http://www.pujinziben.com/wap/app.html#!/regist?useCode=</Text>
                </View>
                <TouchableOpacity style={styles.clipViewBtn} onPress={()=>{this._setClipboardContent()}}>
                  <Text style={styles.clipViewBtnText}>复制链接</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        }
			</View>
		);
	}
};

const styles = StyleSheet.create({
  containerScroll:{
    flex:1,
    backgroundColor:'#fff'
  },
  imgView:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:30/oPx,
    marginBottom:30/oPx,
  },
  img:{
    width:690/oPx,
    height:320/oPx
  },
  contentView:{

  },
  viewTop:{
    height:60/oPx,
    justifyContent:'center',
    alignItems:'center'
  },
  viewTopText:{
    fontSize:36/oPx,

  },
  viewTopTextColor:{
    color:'#ffa13d'
  },
  viewTopTextView:{
    paddingLeft:30/oPx,
    paddingRight:30/oPx,
    marginBottom:40/oPx
  },
  viewTopTextCenter:{
    fontSize:28/oPx,
    color:'#999',
    lineHeight:25
  },
  activityTimeText:{
    fontSize:28/oPx,
    color:'#f84015',
    lineHeight:25
  },
  textCenterBlack:{
    fontSize:28/oPx,
    color:'#333',
    lineHeight:25
  },
  textCenterBlackRed:{
    color:'#eb3331'
  },
  clipView:{
    height:78/oPx,
    width:550/oPx,
    borderWidth:StyleConfig.borderWidth,
    borderColor:StyleConfig.borderColor,
    borderRightWidth:0,
    justifyContent:'center'
  },
  clipViewText:{
    color:'#777',
    paddingLeft:30/oPx
  },
  clipViewBtn:{
    flex:1,
    backgroundColor:'#319bff',
    justifyContent:'center',
    alignItems:'center',
  },
  clipViewBtnText:{
    color:'#fff',
    fontSize:28/oPx
  }

})