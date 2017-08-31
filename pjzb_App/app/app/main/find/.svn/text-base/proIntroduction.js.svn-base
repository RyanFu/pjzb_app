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
 import HengJinIntroduction from './HengJinIntroduction.js';
 import PuJinIntroduction from './PuJinIntroduction.js';
 import DuoJinIntroduction from './DuoJinIntroduction';
 import NavigationBar from '../../components/NavigationBar';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import InvestDetail from '../invest/InvestDetail';
 import { goBack } from '../../utils/NavigatorBack';
 export default class ProIntroduction extends Component {
   constructor(props){
     super(props);
   }
    //返回
    _leftbtn(){
     goBack(this.props.navigator);
    }
   //标的详情
   _toDetail(id,title){
     this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
   }
   render(){
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"产品介绍"}
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
            <HengJinIntroduction tabLabel="恒金保" navigator={this._toDetail.bind(this)}/>
            <DuoJinIntroduction tabLabel="多金宝" navigator={this._toDetail.bind(this)}/>
            <PuJinIntroduction tabLabel="普金保" navigator={this._toDetail.bind(this)}/>
          </ScrollableTabView>
       </View>
     );
   }
 }
