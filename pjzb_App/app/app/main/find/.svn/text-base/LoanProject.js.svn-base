/**
 * Created by zlx on 2017/03/27.
 * 借款项目信息
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import ProjectInformation from './ProjectInformation';
 import BorrowerAgencyInformation from './BorrowerAgencyInformation';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import { goBack } from '../../utils/NavigatorBack';
 export default class LoanProject extends Component {
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
           title={"借款项目信息"}
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
            <ProjectInformation tabLabel="项目信息" />
            <BorrowerAgencyInformation tabLabel="借款人/机构信息" />
          </ScrollableTabView>
       </View>
     );
   }
 }
