/**
 * Created by zlx on 2017/02/21.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import FVGWIntroduction from './FVGWIntroduction.js';
 import LSSWSIntroduction from './LSSWSIntroduction.js';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import { goBack } from '../../utils/NavigatorBack';
 export default class ConsultantTeam extends Component {
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
           title={"顾问团队"}
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
            <FVGWIntroduction tabLabel="法律顾问" />
            <LSSWSIntroduction tabLabel="律师事务所" />
          </ScrollableTabView>
       </View>
     );
   }
 }
