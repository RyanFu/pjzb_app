/**
 * Created by wsl on 2017/01/13.
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   BackAndroid,
   Navigator,
   StatusBar,
   Platform,
   Alert,
   Linking,
   NativeAppEventEmitter,
   DeviceEventEmitter
 } from 'react-native';


// 热更新
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import _updateConfig from '../update.json';
const { appKey } = _updateConfig[Platform.OS];
import {StyleConfig} from './style';
import {toastShort} from './utils/Toast';
import AppMain from './main/appMain';
import Storage from './utils/Storage';
import Welcome from './components/Welcome';
import Update from './components/Update';
import {goBack} from './utils/NavigatorBack';
import JPushModule from 'jpush-react-native';
import TimerMixin from 'react-timer-mixin';
import InvestDetail from './main/invest/InvestDetail';
import SetGesture from './main/other/setGesture';
let _navigator;
if (!__DEV__) {
 global.console.log=() => {}
};

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      navigator: null,
      update:false,
      isFirstTime:false
      //currentAppState: AppState.currentState,
    }
  }
  _goBack() {
    return goBack(_navigator);
  }
  componentDidMount() {
    global.packageVersion = packageVersion;
    JPushModule.addReceiveCustomMsgListener((map) => {
      var message = JSON.parse(map.extras);
       //alert('addReceiveNotificationListener'+message.borrowId);
          //这是默认的通知消息
        //  this.setState({pushMsg:message});
    });
    JPushModule.addReceiveNotificationListener((map) => {
      var message = JSON.parse(map.extras);
      if(message.borrowId){
        _navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:message.borrowId}});
      }else{
        _navigator.push({component:AppMain,name:'AppMain'});
      }
       //alert('addReceiveNotificationListener'+message.borrowId);
    })
     //点击通知进入应用的主页，相当于跳转到制定的页面
    JPushModule.addReceiveOpenNotificationListener((map) => {
      var message = JSON.parse(map.extras);
      if(message.borrowId){
        _navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:message.borrowId}});
      }else{
        _navigator.push({component:AppMain,name:'AppMain'});
      }

    })

    NativeAppEventEmitter.addListener('ReceiveNotification',(message) => {
      if(message.borrowId){
        _navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:message.borrowId}});
      }else{
        _navigator.push({component:AppMain,name:'AppMain'});
      }
    })
  }
  componentWillMount() {
    // 热更新
    // if (Platform.OS === 'android') {
    //   checkUpdate(appKey)
    //       .then(info => {
    //           if (info.expired) {
    //               Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
    //                 {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
    //               ]);
    //           } else if (info.update) {
    //             Alert.alert('提示', '检查到新的版本,是否下载?', [
    //               {text: '是', onPress: ()=>{this._doUpdate(info)}},
    //               {text: '否',},
    //             ]);
    //           }
    //       });
    //   //每隔一段时候获取更新    
    //   this.timer = TimerMixin.setInterval(()=>{
    //     checkUpdate(appKey)
    //       .then(info => {
    //           if (info.expired) {
    //               Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
    //                 {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
    //               ]);
    //           } else if (info.update) {
    //             Alert.alert('提示', '检查到新的版本,是否下载?', [
    //               {text: '是', onPress: ()=>{this._doUpdate(info)}},
    //               {text: '否',},
    //             ]);
    //           }
    //       });
    //   },3600000);
    //   if (isFirstTime) {
    //       markSuccess();
    //   }
    // }  
    //AppState.addEventListener('change', this._handleAppStateChange);
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._goBack);
    }
    this.setGlobal();
  }
  async setGlobal(){
    let data = await Storage.getItem('USER');
    if(data)
     global.USER = data;
  }
  _doUpdate = (info) => {
        this.setState({update:true});
        downloadUpdate(info).then(hash => {
          Alert.alert('提示', '下载完毕,是否重启应用?', [
            {text: '是', onPress: ()=>{switchVersion(hash);}},
            {text: '否',},
            {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
          ]);
        }).catch(err => {
          this.setState({update:false});
          alert('更新失败,请稍后重试！');
        })
  };
  componentWillUnmount() {
    this.timer && TimerMixin.clearInterval(this.timer);
    //AppState.removeEventListener('change', this._handleAppStateChange);
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._goBack);
    }
    //极光push
    JPushModule.removeReceiveCustomMsgListener();

    JPushModule.removeReceiveNotificationListener();

    // NativeAppEventEmitter.removeAllListeners();
    if (Platform.OS === 'ios') {
      DeviceEventEmitter.removeAllListeners();//此方法导致安卓异常推出
    }
    //极光end
  }
  _handleAppStateChange(nextAppState){
    //this.setStata({currentAppState:nextAppState});
  }
  //过场动画
  configureScene(route, routeStack){
    switch(route.animated){
      case 'PushRight':
        return Navigator.SceneConfigs.PushFromRight;break;
      case 'PushLeft':
        return Navigator.SceneConfigs.PushFromLeft;break;  
      case 'FloatRight':
        return Navigator.SceneConfigs.FloatFromRight;break;
      case 'FloatLeft':
        return Navigator.SceneConfigs.FloatFromLeft;break;
      case 'UpSwiper':
        return Navigator.SceneConfigs.VerticalUpSwipeJump;break;
      case 'FadeIn':
        return Navigator.SceneConfigs.FadeAndroid;break;  
      default:
        return Navigator.SceneConfigs.PushFromRight;break;
    }
      
    
  }
  renderScene(route, navigator){
      let Component = route.component;
      _navigator = navigator;
      return (
         <Component {...route.params} navigator={navigator} route={route} />
      );
  }
  _navigationBar(){
    return <View style={{backgroundColor:"#f00",height:100,width:1000}}></View>
  }
  render() {
      return (
          <View style={{flex: 1}}>
              <StatusBar
                  animated={true}
                  hidden={false}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  translucent={true}
                  barStyle={'light-content'}
                  showHideTransition={'fade'}
              />
              <Navigator
                  ref='navigator'
                  style={styles.navigator}
                  configureScene={this.configureScene}
                  renderScene={this.renderScene}
                  initialRoute={{
                    component: Welcome,
                    name: 'Welcome',
                    params:{isFirstTime:isFirstTime}
                  }}
              />
              <Update update={this.state.update}/>
          </View>
      );
  }
}
let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});
export default App;
