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
  CameraRoll,
  ImageEditor,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import InvestFriendDetail from './InvestFriendDetail';
import InviteFriendsList from './inviteFriendsList';
import Request from '../../utils/Request';
import {toastShort} from '../../utils/Toast';
import WeChat from '../../utils/WeChat';
let oPx = StyleConfig.oPx;

export default class InviteFriendsHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idCode:global.USER.ID,
            imgUri:'http://www.pujinziben.com/reactapp/qrCode.do?url=http://www.pujinziben.com/wap/app.html%23!/regist?useCode='+global.USER.ID,
            isPage: true,
        }
    }
	onPressInviteRight () {
		this.props.navigator.push({component:InvestFriendDetail,name:'InvestFriendDetail'});
	}
	onPressWeChat =() =>{
		alert("分享至微信");
	}
	onPressQQHeader =() =>{
		alert("分享至QQ");
	}
	onPressQQSpace =() =>{
		alert("分享至QQ空间");
	}
	onPressSina =() =>{
		alert("分享至新浪微博");
	}

    componentDidMount(){
        this.setState({
            imgUri:Request.URL+'qrCode.do?url=http://www.pujinziben.com/wap/app.html%23!/regist?useCode='+USER.ID,
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }
    //已邀请的好友
    _hasInviteList(){
        this.props.navigator.push({component:InviteFriendsList,name:'InviteFriendsList',params:{isEmployeeReferral:'2'}});
    }

    download(path) {
        Alert.alert(
           '提示',
           '将此图片进行',
           [
               {text:'保存', onPress: () => this.downloadImg(path)},
               {text:'分享朋友', onPress: () => this.shareFriends(path)},
               {text:'分享朋友圈', onPress: () => this.shareFriendsCircle(path)},
               {text:'取消', },
           ]
       );
    }

    // 保存图片
    downloadImg(path)  {
        if(Platform.OS === 'ios') {
           CameraRoll.saveToCameraRoll(path,'photo').done(function(data){
                                   toastShort('保存图片成功',0);
                               },function(err){
                                   toastShort('保存图片失败',0);
                           });
       } else {
           Image.getSize(path, (width, height) => {
               ImageEditor.cropImage(
                   path,
                   {offset:{x:0,y:0},size:{width:width, height:height}},
                   (croppedURI)=>{
                       CameraRoll.saveToCameraRoll(croppedURI,'photo').done(function(data){
                           toastShort('保存图片成功',0);
                       },function(err){
                           toastShort('保存图片失败',0);
                       });
                   },
                   (err)=>true
               );
           });
       }
    }

    // 分享到微信朋友
    shareFriends(path) {
      WeChat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            WeChat.shareToSession({
               type: 'imageUrl',
               title: '图片分享',
               imageUrl: path
            });
          } else {
            Alert.alert(
                '提示',
                '您的手机未安装微信，需安装微信才能分享！',
                [
                    {text: '确定', },
                ]
            );
          }
        });
    }

    // 分享到朋友圈
    shareFriendsCircle(path) {
      WeChat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            WeChat.shareToTimeline({
               type: 'imageUrl',
               title: '图片分享',
               imageUrl: path
            });
          } else {
            Alert.alert(
                '提示',
                '您的手机未安装微信，需安装微信才能分享！',
                [
                    {text: '确定', },
                ]
            );
          }
        });
    }

	render(){
		return (
			<View style={{flex:1}}>
				<NavigationBar
					title={"邀请好友"}
					leftShowIcon={true}
					leftBtnFunc={this._goBack.bind(this)}
					rightShowIcon={false}
					rightTitle={'已邀好友'}
					rightBtnFunc={this._hasInviteList.bind(this)}
				/>
                <View style={styles.titleView}>
                  <TouchableOpacity onPress={() => {this.setState({isPage:true})}}>
                    <View style={styles.leftView}>
                      <Text style={styles.titleText}>邀请好友</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.setState({isPage:false})}}>
                    <View style={styles.rightView}>
                      <Text style={styles.titleText}>扫描下载APP</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {
                  this.state.isPage?
                  <ScrollView style={styles.containerScroll}>
                    <View style={styles.container}>
                      <TouchableOpacity onPress={this.onPressInviteRight.bind(this)}
                                        style={styles.topView}>
                        <Image style={styles.manTop} source={require('../../images/user/invite_icon_header.png')}/>
                        <Text style={styles.manTopText}>邀请好友奖励规则</Text>
                        <Image
                            style={styles.imgRight}
                            source={require('../../images/user/invite_icon_right.png')}/>
                      </TouchableOpacity>
                      <View style={styles.mainView}>
                        <View style={styles.mainTopView}>
                          <View style={styles.mainTopViewContent}>
                            <View style={styles.mainTopViewContentTop}>
                              <Text style={styles.mainTopViewContentTopText}>您的邀请码</Text>
                            </View>
                            <View style={styles.mainTopViewContentBottom}>
                              <Image style={styles.iconImg} source={require('../../images/user/invite_icon.png')}>
                                <Text style={styles.iconImgText}>邀</Text>
                              </Image>
                              <Text style={styles.oCode}>{this.state.idCode}</Text>
                            </View>
                          </View>
                        </View>
                        <Image style={styles.mainCenterLine}
                               source={require('../../images/user/invest_friend_line.jpg')}/>
                        <View style={styles.mainBottomView}>
                          <TouchableWithoutFeedback delayLongPress={800} onLongPress={() => this.download(this.state.imgUri)} activeOpacity={1}>
                            <Image style={styles.erweima} source={{uri:this.state.imgUri}}/>
                          </TouchableWithoutFeedback>
                          <Text style={styles.erweimaText}>
                            请好友通过微信扫描二维码
                          </Text>
                        </View>
                      </View>
                      <View style={styles.thirdmodule}>
                          {/*<View style={styles.shareView}>
                           <View style={styles.row}></View>
                           <Text style={styles.shareText}>分享给好友</Text>
                           <View style={styles.row}></View>
                           </View>
                           <View style={styles.shareIconView}>
                           <TouchableOpacity style={styles.alignIcon} onPress={this.onPressWeChat}>
                           <View style={[styles.circularView,{borderColor:'#3DC13A'}]}>
                           <Image source={require('../../images/user/invite_icon_WeChat.png')}
                           style={styles.WeChatImg}>
                           </Image>
                           </View>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.alignIcon} onPress={this.onPressQQHeader}>
                           <View style={[styles.circularView,{borderColor:'#2DAEFF'}]}>
                           <Image source={require('../../images/user/invite_icon_QQ_header.png')}
                           style={styles.QQheaderImg}>
                           </Image>
                           </View>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.alignIcon} onPress={this.onPressQQSpace}>
                           <View style={[styles.circularView,{borderColor:'#FFC55E'}]}>
                           <Image source={require('../../images/user/invite_icon_QQ_space.png')}
                           style={styles.QQspaceImg}>
                           </Image>
                           </View>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.alignIcon} onPress={this.onPressSina}>
                           <View style={[styles.circularView,{borderColor:'#FF6666'}]}>
                           <Image source={require('../../images/user/invite_icon_sina.png')}
                           style={styles.sinaImg}>
                           </Image>
                           </View>
                           </TouchableOpacity>
                           </View>*/}
                      </View>
                    </View>
                  </ScrollView>
                  :
                  <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                        <TouchableWithoutFeedback delayLongPress={800} onLongPress={() => this.download('https://www.pujinziben.com/WEB-PC/src/images/app/qrCode_icon.png')} activeOpacity={1}>
                          <Image style={styles.qrCode} source={require('../../images/index/qrCode_icon.png')} />
                        </TouchableWithoutFeedback>
                        <Text style={styles.codeText}>二维码转发好友，扫描下载APP</Text>
                  </ScrollView>
                }
			</View>
		);
	}
};

const styles = StyleSheet.create({
  containerScroll:{
    flex:1,
    backgroundColor:'#e9ecf3'
  },
    titleView: {
        width: StyleConfig.screen_width,
        height: 80/oPx,
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderBottomWidth: StyleConfig.borderWidth,
        borderBottomColor: StyleConfig.borderColor,
    },
    leftView: {
        marginTop: 15/oPx,
        width: StyleConfig.screen_width/2,
        height: 50/oPx,
        borderRightWidth: StyleConfig.borderWidth,
        borderRightColor: StyleConfig.borderColor,
        alignItems: "center",
    },
    rightView: {
        marginTop: 15/oPx,
        width: StyleConfig.screen_width/2,
        height: 50/oPx,
        alignItems: "center",
    },
    titleText: {
      fontSize: 28/oPx,
        lineHeight: 22,
        backgroundColor: 'transparent',
    },
  container:{
    flex:1,
    paddingLeft:60/oPx,
    paddingRight:60/oPx,
  },
  topView:{
    height:160/oPx,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  manTop:{
    width:28/oPx,
    height:29/oPx,
    marginRight:10/oPx,
  },
  manTopText:{
    fontSize:28/oPx,
    color:'#333'
  },
  imgRight:{
    width:25/oPx,
    height:26/oPx,
    marginLeft:10/oPx,
  },
  mainView:{
    justifyContent:'center',
    alignItems:'center'
  },
  mainTopView:{
    width:630/oPx,
    height:160/oPx,
    backgroundColor:'#fff',
    borderTopLeftRadius:3,
    borderTopRightRadius:3,
    shadowColor:'#000',
    shadowOffset:{height:0,width:0},
    shadowOpacity:.1
  },
  mainCenterLine:{
    width:646/oPx,
    height:40/oPx,
  },
  mainBottomView:{
    width:630/oPx,
    height:500/oPx,
    backgroundColor:'#fff',
    borderBottomLeftRadius:3,
    borderBottomRightRadius:3,
    shadowColor:'#000',
    shadowOffset:{height:0,width:0},
    shadowOpacity:.1,
    zIndex:-1,
    justifyContent:'center',
    alignItems:'center',
  },
  mainTopViewContent:{
    alignItems:'center',
    justifyContent:'center'
  },
  mainTopViewContentTop:{
    height:68/oPx,
    marginTop:20/oPx,
    justifyContent:'center'

  },
  mainTopViewContentTopText:{
    fontSize:28/oPx,
    color:'#333'
  },
  mainTopViewContentBottom:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
  iconImg:{
    width:41/oPx,height:30/oPx,
    backgroundColor:'transparent',
    justifyContent:'center',
    marginRight:12/oPx
  },
  iconImgText:{
    color:'#fff',fontSize:22/oPx,
    marginLeft:4/oPx
  },
  oCode:{
    color:'#eb3331',
    fontSize:36/oPx
  },
  erweima:{
    width:320/oPx,
    height:320/oPx,
  },
  erweimaText:{
    marginTop:16/oPx,
    fontSize:28/oPx,
    color:'#333',
    lineHeight:25
  },
  thirdmodule:{
    marginTop:70/oPx
  },
  shareView:{
    height:40/oPx,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  row:{
    width:200/oPx,
    height:1/oPx,
    backgroundColor:'#d2d2d2',
  },
  shareText:{
    flex:1,
    fontSize:36/oPx,
    color:'#333',
    textAlign:'center'
  },
  shareIconView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:46/oPx,
    marginBottom:46/oPx
  },
  circularView:{
    width:118/oPx,
    height:118/oPx,
    borderRadius:59/oPx,
    borderWidth:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  WeChatImg:{
    width:60/oPx,
    height:50/oPx,
  },
  QQheaderImg:{
    width:42/oPx,
    height:52/oPx,
  },
  QQspaceImg:{
    width:58/oPx,
    height:54/oPx
  },
  sinaImg:{
    width:58/oPx,
    height:50/oPx
  },
  alignIcon:{
    flex:1,
    alignItems:'center'
  },
    qrCode: {
        width:280/oPx,
        height:280/oPx,
        alignSelf: 'center',
        marginTop: 230/oPx,
    },
    codeText: {
        marginTop: 20/oPx,
        fontSize: 22/oPx,
        alignSelf: 'center',
    },
})
