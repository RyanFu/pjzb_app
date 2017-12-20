/**
  create time : 2017-11-24 zlx

  热更新组件

*/  

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';

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

import Loading from './Loading';
import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

export default class ThermalRenewal extends Component {
  constructor(props){
     super(props);
     this.state = {
        animating: false,
     }
   }

  componentWillMount(){
    this.checkUpdate();

    if (isFirstTime) {
      // Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
      //   {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
      //   {text: '否', onPress: ()=>{markSuccess()}},
      // ]);
      markSuccess();
    } else if (isRolledBack) {
      // Alert.alert('提示', '刚刚更新失败了，版本已回滚');
    }
  }

  doUpdate = info => {
    downloadUpdate(info).then(hash => {
      // Alert.alert('提示', '下载完毕，是否重启立即应用？', [
      //   {text: '重启', onPress: ()=>{switchVersion(hash);}},
      //   {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      // ]);

      this.setState({animating: false});
      switchVersionLater(hash);
    }).catch(err => {
      // Alert.alert('提示', '更新失败');
    });
  }

  checkUpdate = () => {
    checkUpdate(appKey).then(info => {
      console.log(info);
      if (info.expired) {
        // Alert.alert('提示', '您的应用版本已更新，请前往应用商店下载新的版本', [
        //   {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        // ]);
      } else if (info.upToDate) {
        // Alert.alert('提示', '您的应用版本已是最新.');
      } else {
        // Alert.alert('提示', '检查到新的版本 V'+info.name+'，是否下载？\n'+ info.description, [
        //   {text: '是', onPress: ()=>{this.doUpdate(info)}},
        //   {text: '否',},
        // ]);
        this.doUpdate(info);
        this.setState({animating: true});
      }
    }).catch(err => {
      // Alert.alert('提示', '更新失败');
    });
  }

  render() {
    return (
      <Loading show={this.state.animating} top={true} loadingText="正在更新..."
        loadingTimeText="可能需要5秒左右"
      />
    );
  }
}

