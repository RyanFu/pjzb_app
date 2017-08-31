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
   TouchableOpacity,
   RefreshControl
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import NavigationBar from '../../components/NavigationBar';
 import ItemList from '../../components/ItemList';
 import {StyleConfig} from '../../style';
 import { goBack } from '../../utils/NavigatorBack';
 import Request from '../../utils/Request';
import MessageCenter from './messageCenter';
import InviteFriendsHome from './inviteFriendsHome';
 import BankcardManage from './bankcardManage';
 import  ImagePicker from 'react-native-image-picker';
 const oPx = StyleConfig.oPx;
 var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    maxWidth:150,
    maxHeight:150,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
export default class UserCenter extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRefreshing:false,
      nickname:'',
      headImg:'',
      avatarSource:global.userHeadPic ? { uri: global.userHeadPic } : require('../../images/user/user_header_pic.png'),
    }
  }

    componentDidMount(){
        this._getState();
    }

    _getState(){
        this.setState({
            nickname:this.props.nickname,
            headImg:this.props.headImg
        });
    }

  //刷新
  _onRefresh(){
      this._getState();
  }
  //返回
  _goBack(){
    goBack(this.props.navigator);
  }

  //头像更换
  cameraAction = () =>{
       ImagePicker.showImagePicker(photoOptions,(response) =>{
        console.log(response);
            // if (response.didCancel) {
            //   //console.log('User cancelled image picker');
            // }
            // else if (response.error) {
            //   //console.log('ImagePicker Error: ', response.error);
            // }
            // else if (response.customButton) {
            //   //console.log('User tapped custom button: ', response.customButton);
            // }
            if(response.uri){
              let source = { uri: response.uri };
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({avatarSource:source});
              this.uploadImage(response.data,response.fileName);
            }
       })
    }
    uploadImage(uri,name){
      //let formData = new FormData();
      //let file = {uri: uri, type: 'multipart/form-data', name: name};
      //formData.append("files",file);
      Request.post('appUploadHead.do',{uri:uri,uid:'',fileName:name},(data)=>{
        if(data.error == '0'){
          global.userHeadPic = data.imgPath;
        }else{
          alert(data.msg);
        }
      },(error)=>{
        
      });
      
    }
    //消息中心
    _onMessageCenter(){
        this.props.navigator.push({component:MessageCenter,name:'MessageCenter'});
    }
    //邀请好友
    _onInviteFriends(){
        this.props.navigator.push({component:InviteFriendsHome,name:'InviteFriendsHome'});
    }

    //银行卡管理
    _onBankcardManage(){
        this.props.navigator.push({component:BankcardManage,name:'BankcardManage'});
    }
  render(){
    return (
      <ScrollView style={styles.container}
        refreshControl={
         <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={this._onRefresh.bind(this)}
           tintColor="#ff0000"
           title="刷新中..."
           titleColor="#999"
           colors={['#ff0000', '#00ff00', '#0000ff']}
           progressBackgroundColor="#ffff00"
         />}>
          <LinearGradient colors={['#f3553e', '#ec3948']} style={styles.top}>
            <NavigationBar
              title={"个人信息"}
              withOutLinearGradient={true}
              leftShowIcon={true}
              leftBtnFunc={this._goBack.bind(this)}
            />
          <View style={styles.userCenterView}>
              <TouchableOpacity  style={styles.userHeader} onPress={this.cameraAction}>
                <Image style={styles.userHeaderImg} source={this.state.avatarSource}/>
              </TouchableOpacity>
              <Text style={styles.uesrName}>{this.state.nickname}</Text>
          </View>
          </LinearGradient>
          <Image source={require('../../images/user/user_center_bg.jpg')} style={{width:750/oPx,height:90/oPx}}/>
          <ItemList title={"消息中心"} style={[styles.lineTop,{marginTop:40/oPx}]} onPress={this._onMessageCenter.bind(this)}/>
          <ItemList title={"邀请好友"} style={styles.lineTop} onPress={this._onInviteFriends.bind(this)}/>
          <ItemList title={"银行卡"}  style={{marginTop:40/oPx}} onPress={this._onBankcardManage.bind(this)}/>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#e9ecf3'
  },
  top:{
    flex:1,
    height:420/oPx,
  },
  userCenterView:{
    marginTop:74/oPx,
    alignItems:'center',
  },
  userHeader:{
    width:142/oPx+2,
    height:142/oPx+2,
  },
  userHeaderImg:{
    width:142/oPx,
    height:142/oPx,
    borderRadius:142/oPx/2,
    borderColor:'#fff',
    borderWidth:2
  },
  uesrName:{
    color:'#fff',
    fontSize:28/oPx,
    backgroundColor:'transparent',
    marginTop:10/oPx
  },
  lineTop:{
    borderColor:'#e0e0e0',
    borderTopWidth:StyleConfig.borderWidth
  }
})
