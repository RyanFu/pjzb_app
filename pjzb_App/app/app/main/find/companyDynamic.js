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
 import GSDTIntroduction from './GSDTIntroduction.js';
 import MTBDIntroduction from './MTBDIntroduction.js';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
import OwebView from '../../components/OwebView';
 import { goBack } from '../../utils/NavigatorBack';
 export default class ConsultantTeam extends Component {
   constructor(props){
     super(props);
   }

    //返回
    _leftbtn(){
     goBack(this.props.navigator);
    }

     onPress(html, title) {
         this.props.navigator.push({
             name: 'OwebView',
             component: OwebView,
             params:{
                 html:html,
                 title:title,
                 back:true,
             }
         })
     }

   render(){
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"公司动态"}
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
            <GSDTIntroduction tabLabel="公司动态" onPress={this.onPress.bind(this)}/>
            <MTBDIntroduction tabLabel="媒体报道" onPress={this.onPress.bind(this)} isHead={false}/>
          </ScrollableTabView>
       </View>
     );
   }
 }
