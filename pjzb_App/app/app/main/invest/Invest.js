
/**
 * Created by wsl on 2017/01/13.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import InvestList from './InvestList';
 import ZQZRInvestmentDetails from './ZQZRInvestmentDetails';
 import NavigationBar from '../../components/NavigationBar';
 import Calculator from '../other/earningsCalculator';
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import InvestDetail from './InvestDetail';
 import ZQZRPage from './ZQZRPage';
 import {StyleConfig} from '../../style/index';
  import Request from '../../utils/Request';
 const oPx = StyleConfig.oPx;
 export default class About extends Component {
   constructor(props){
     super(props);
     this.state = {
      Infinity:0,
      investList: [],
      isShow: true,
     }
   }
   _leftbtn(){
     console.log(1);
   }

    componentDidMount(){
      this._getState();
    }

    _getState = () => {
      Request.post('getBorrowSubType.do',{uid:''},(data)=>{
          this.setState({
            investList: data.data,
            isShow: false,
          });
        },(error)=>{}
      );
    }

    _getInvestList = (row, index) => {
      return  <InvestList key={index} tabLabel={row.name} navigator={this._toDetail.bind(this)} productType={row.id}/>;
    }

   //收益计算器
   _Calculator(){
     this.props.navigator.push({component:Calculator,name:'Calculator'});
   }
   //标的详情
   _toDetail(id,title){
     this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
   }
   //债权转让
   _toZZZR(id,title){
     this.props.navigator.push({component:ZQZRInvestmentDetails,name:'ZQZRInvestmentDetails',params:{debtId:id,debtTitle:title}});
   }

   render(){
     let leftImageSource = require('../../images/icon/icon_search.png');
     let rightImageSource = require('../../images/icon/icon_calculator.png');
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"投资"}
           leftShowIcon={false}
           leftImageSource={leftImageSource}
           leftBtnFunc={this._leftbtn.bind(this)}
           rightShowIcon={true}
           rightImageSource={rightImageSource}
           rightBtnFunc={this._Calculator.bind(this)}
         />
          <ScrollableTabView
            style={styles.scrollable}
            locked={true}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarActiveTextColor={'#e5383e'}
            tabBarInactiveTextColor={'#333'}
            renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
            >
            {
              this.state.investList.map((row, index) => {
                return this._getInvestList(row, index);
              })
            }

            { this.state.isShow ? <InvestList tabLabel="恒金保" navigator={this._toDetail.bind(this)} productType="6"/> : null }
            { this.state.isShow ? <InvestList tabLabel="普金保" navigator={this._toDetail.bind(this)} productType="4"/> : null }
            { this.state.isShow ? <InvestList tabLabel="多金宝" navigator={this._toDetail.bind(this)} productType="3"/> : null }
            { this.state.isShow ? <InvestList tabLabel="新手标" navigator={this._toDetail.bind(this)} productType="5"/> : null }
            

            <ZQZRPage tabLabel="债权转让" navigator={this._toZZZR.bind(this)} productType="3"/>
          </ScrollableTabView>
       </View>
     );
   }
 }



