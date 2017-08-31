/**
 * Created by zlx on 2017/05/19.
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
   ListView,
   RefreshControl,
   InteractionManager,
    CameraRoll,
     ImageEditor,
    Alert,
    Platform,
    Linking,
    TouchableWithoutFeedback,
 } from 'react-native';
 import NavigationBar from '../../components/NavigationBar';
 import {StyleConfig} from '../../style';
import { goBack } from '../../utils/NavigatorBack';
import Button from '../../components/Button';
import OwebView from '../../components/OwebView';
 const oPx = StyleConfig.oPx;
 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 export default class Index extends Component {
   constructor(props){
     super(props);
     this.bannerCount = 0;
     this.state = {

     }
   }

    //返回
    _leftbtn(){
        goBack(this.props.navigator);
    }

     _onPressIOS() {
         if (Platform.OS === 'ios') {
            let url = 'https://itunes.apple.com/cn/app/%E6%99%AE%E9%87%91%E8%B5%84%E6%9C%AC/id1213605344?mt=8';
            Linking.openURL(url);
         } else {
             this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:'https://itunes.apple.com/cn/app/%E6%99%AE%E9%87%91%E8%B5%84%E6%9C%AC/id1213605344?mt=8',title:'ios下载',back:{true}}});
         }
    }

     _onPressAndroid() {
        this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:'http://a.app.qq.com/o/simple.jsp?pkgname=com.pjzbapp',title:'安卓下载',back:{true}}});
     }

   render(){
     return (
        <ScrollView style={{flex:1}} keyboardShouldPersistTaps="handled">
           <NavigationBar
               title={"APP下载"}
               leftShowIcon={true}
               leftBtnFunc={this._leftbtn.bind(this)}
           />
            <Image source={require('../../images/index/appDownload/download_1.png')}
               style={{
                   width:750/oPx,
                   height:456/oPx,
                   alignItems:'flex-start',
               }}
            >
              <View style={{marginTop:270/oPx,marginLeft:50/oPx}}>
                  <Button imgSource={require('../../images/index/appDownload/download_iosBtn.png')}
                          height={60/oPx}
                          width={220/oPx}
                          text="    ios下载" textColor="#fff"
                          onPress={this._onPressIOS.bind(this)}
                  />
              </View>
              <View style={{marginTop:10/oPx,marginLeft:50/oPx}}>
                  <Button imgSource={require('../../images/index/appDownload/download_androidBtn.png')}
                          height={60/oPx}
                          width={220/oPx}
                          text="     安卓下载" textColor="#fff"
                          onPress={this._onPressAndroid.bind(this)}
                  />
              </View>
            </Image>
            <Image source={require('../../images/index/appDownload/download_2.png')}
               style={{
                   width:750/oPx,
                   height:385/oPx,
               }}
            />
            <Image source={require('../../images/index/appDownload/download_3.png')}
               style={{
                   width:750/oPx,
                   height:385/oPx,
               }}
            />
            <Image source={require('../../images/index/appDownload/download_4.png')}
               style={{
                   width:750/oPx,
                   height:474/oPx,
               }}
            />
       </ScrollView>
     );
   }
 }
const style = StyleSheet.create({

});
