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
   Alert,
 } from 'react-native';
 import CYGMIntroduction from './CYGMIntroduction';
 import DebtManagement from './debtManagement';
 import CGGMIntroduction from './CGGMIntroduction';
 import NavigationBar from '../../components/NavigationBar';
 import SearchModal from '../../components/SearchModal';
import SearchOfDept from './SearchOfDept';
 import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
 import styles from '../../style/invest';
 import { goBack } from '../../utils/NavigatorBack';
import OwebView from '../../components/OwebView';
import {toastShort} from '../../utils/Toast';
import InvestDetail from '../invest/InvestDetail';
import AddAssignmentDebt from './addAssignmentDebt';
import Request from '../../utils/Request';

 export default class debtHasBuy extends Component {
   constructor(props){
     super(props);
       this.state = {
           startDate:'',
           endDate:'',
           choseData:[{text:'可转让'},{text:'转让中'},{text:'已转让'},{text:'转让失败'}],
           tapIndex:0,
           isTabOne:true,
           // successLoan：成功借出，tendersingBorrow：招标中的借款，recycleBorrow：回款中的借款，空串：已回收的借款
           assignFlag:'canAssign',
           borrowerName:'',
           borrowTitle:'',
           choseType:0,
       }
   }
    //返回
    _leftbtn(){
     goBack(this.props.navigator);
    }

    //筛选
    _openSearch(){
        this.setState({dialog:!this.state.dialog});
    }

     _onSubmit(params){
         this.setState(params);
     }

     _onSubmit1(params){
         let assignFlag  = this.state.assignFlag;
         if (params.choseType == 0)
             assignFlag = 'canAssign';
         else if (params.choseType == 1)
             assignFlag = 'assigning';
         else if (params.choseType == 2)
             assignFlag = 'alreadyAssign';
         else if (params.choseType == 3)
             assignFlag = '';

         this.setState({
             choseType: params.choseType,
             borrowerName: params.borrowerName,
             borrowTitle: params.borrowTitle,
             assignFlag:assignFlag,
         });
     }

     toBorrow(id,title) {
         this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}});
     }

     viewpdf_url(url) {
         if (url == null || url == '') {
             toastShort('此合同为空',-100);
             return;
         }
         this.props.navigator.push({
             name: 'OwebView',
             component: OwebView,
             params:{
                 url:url,
                 title:'查看合同',
                 back:true,
             }
         })
     }

   render(){
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"债权管理"}
           leftShowIcon={true}
           leftBtnFunc={this._leftbtn.bind(this)}
           rightShowIcon={true}
           rightImageSource={require('../../images/user/icon_rl.png')}
           rightBtnFunc={this._openSearch.bind(this)}
         />

           <ScrollableTabView
               style={styles.scrollable}
               tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
               tabBarTextStyle={styles.tabBarTextStyle}
               tabBarActiveTextColor={'#e5383e'}
               tabBarInactiveTextColor={'#333'}
               locked={true}
               onChangeTab={(data)=>{this.setState({tapIndex:data.i})}}
               renderTabBar={() => <DefaultTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
           >
               <CYGMIntroduction tabLabel="参与购买的债权" tapIndex={this.state.tapIndex==0} startDate={this.state.startDate} endDate={this.state.endDate} toBorrow={this.toBorrow.bind(this)} />
               <CGGMIntroduction tabLabel="成功购买的债权" tapIndex={this.state.tapIndex==1} startDate={this.state.startDate} endDate={this.state.endDate} toBorrow={this.toBorrow.bind(this)} viewpdf_url={this.viewpdf_url.bind(this)} />
               <DebtManagement tabLabel="债权管理" tapIndex={this.state.tapIndex==2} choseType={this.state.choseType}
                               borrowerName={this.state.borrowerName} borrowTitle={this.state.borrowTitle}
                               assignFlag={this.state.assignFlag} toBorrow={this.toBorrow.bind(this)}
                               viewpdf_url={this.viewpdf_url.bind(this)}
                               navigator={this.props.navigator}
               />
           </ScrollableTabView>

           {
               this.state.tapIndex==2
               ?
               <SearchOfDept
                   dialog={this.state.dialog}
                   choseData={this.state.choseData}
                   modalEvent={this._openSearch.bind(this)}
                   onSubmit={this._onSubmit1.bind(this)}
                   status={true}
               />
               :
               <SearchModal
                   dialog={this.state.dialog}
                   choseData={[]}
                   modalEvent={this._openSearch.bind(this)}
                   onSubmit={this._onSubmit.bind(this)}
                   status={false}
               />
           }
       </View>
     );
   }
 }
