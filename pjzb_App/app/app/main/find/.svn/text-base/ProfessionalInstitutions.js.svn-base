/**
 * Created by zlx on 2017/03/27.
 * 从业机构信息
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import BsicInformation from './BsicInformation';
 import ManagementInformation from './ManagementInformation';
 import WebsitePlatform from './WebsitePlatform';
 import Partners from './Partners';
 import ImportantMatters from './ImportantMatters';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import { goBack } from '../../utils/NavigatorBack';
 import StyleConfig from '../index';
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
           title={"从业机构信息"}
           leftShowIcon={true}
           leftBtnFunc={this._leftbtn.bind(this)}
         />
          <ScrollableTabView
            style={styles.scrollable}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarActiveTextColor={'#e5383e'}
            tabBarInactiveTextColor={'#333'}
            renderTabBar={() => <ScrollableTabBar tabStyle={[styles.tabStyle,{width:240/StyleConfig.oPx}]} style={styles.defaultBar}/>}
            >
            <BsicInformation tabLabel="基本信息" />
            <ManagementInformation tabLabel="治理信息" />
            <WebsitePlatform tabLabel="网站或平台信息" />
            <Partners tabLabel="合作伙伴" />
            <ImportantMatters tabLabel="重大事项信息" />
          </ScrollableTabView>
       </View>
     );
   }
 }
