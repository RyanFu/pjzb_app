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
let oPx = StyleConfig.oPx;

export default class InvestFriendDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idCode:global.USER.ID,
            imgUri:Request.URL+'qrCode.do?url=http://www.pujinziben.com/wap/app.html#!/regist?useCode='+global.USER.ID,
        }
    }
    componentDidMount(){
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
                <Text style={styles.activityTimeText}>2017年8月5日 ~ 9月5日</Text>
              </Text>
              <Text style={styles.viewTopTextCenter}>
                <Text style={{color:'#333'}}>活动对象：</Text>所有平台用户
              </Text>
              <Text style={styles.viewTopTextCenter}>
                <Text style={{color:'#333'}}>奖励规则：</Text>
                邀请奖励=好友投资金额*返现比例（0.8%）/12*投资期限
              </Text>
              <Text style={styles.viewTopTextCenter}>
                <Text style={{color:'#333'}}>举个例子：</Text>
                A同学将自己的邀请链接发送给B同学，B同学通过邀请链接注册后并成功投资5万元3月标。则A同学的邀请奖励为：50000*0.8%/12*3=100元。
              </Text>
              <Text style={styles.viewTopTextCenter}>
                <Text style={{color:'#333'}}>邀请奖励</Text>
                将于好友所投标的满标复审后7个工作日内直接发放至您的资金账户，详情可在
                <Text style={styles.activityTimeText}>【我的账户-资金记录】</Text>
                中查看。  
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
