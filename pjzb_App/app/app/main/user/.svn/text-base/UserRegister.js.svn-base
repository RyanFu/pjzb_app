/**
 * Created by zlx on 2017/02/16.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import RegIpayPersonalPage from './regIpayPersonal.js';
 import RegIpayEnterprise from './regIpayEnterprise.js';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import InvestDetail from '../invest/InvestDetail';
 import { goBack } from '../../utils/NavigatorBack';
 export default class UserRegister extends Component {
   constructor(props){
     super(props);
   }

 // <RegIpayEnterprise tabLabel="注册企业用户" navigator={this.props.navigator}/>

    //返回
    _leftbtn(){
       if (this.props.backUser) {
           let route = this.props.navigator.getCurrentRoutes();
           this.props.navigator.jumpTo(route[0]);
       } else {
           goBack(this.props.navigator);
       }
    }
   render(){
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"注册汇付天下"}
           leftShowIcon={true}
           leftBtnFunc={this._leftbtn.bind(this)}
         />
          <ScrollableTabView
            style={styles.scrollable}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarActiveTextColor={'#e5383e'}
            tabBarInactiveTextColor={'#333'}
            renderTabBar={() => <DefaultTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
            >
            <RegIpayPersonalPage tabLabel="注册个人用户" navigator={this.props.navigator}/>
          </ScrollableTabView>
       </View>
     );
   }
 }
