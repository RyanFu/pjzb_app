/**
 * Created by wsl on 2017/03/28.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import { goBack } from '../../utils/NavigatorBack';
 import StyleConfig from '../index';
 import PlatformOperate from './PlatformOperate';
 import RealtimeInformation from './RealtimeInformation';
 export default class ProfessionalInstitutions extends Component {
   constructor(props){
     super(props);
   }
    //返回
    _leftbtn(){
     goBack(this.props.navigator);
    }

   render(){
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"平台运营信息"}
           leftShowIcon={true}
           leftBtnFunc={this._leftbtn.bind(this)}
         />
          <ScrollableTabView
            style={styles.scrollable}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarActiveTextColor={'#e5383e'}
            tabBarInactiveTextColor={'#333'}
            renderTabBar={() => <DefaultTabBar tabStyle={[styles.tabStyle]} style={styles.defaultBar}/>}
            >
            <RealtimeInformation tabLabel="实时数据"/>
            <PlatformOperate tabLabel="运营报告" navigator={this.props.navigator}/>
          </ScrollableTabView>
       </View>
     );
   }
 }
