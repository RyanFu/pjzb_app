
 /**
  * Created by cqm on 2017/02/23.
  */
  'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    DatePickerIOS,
    Platform
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import SearchModal from '../../components/SearchModal';
  import {StyleConfig} from '../../style/index';
  const oPx = StyleConfig.oPx;
  import styles from '../../style/invest';
  import { goBack } from '../../utils/NavigatorBack';
  import LoanList from './LoanList';
  import LoanRepayment from './LoanRepayment';
  import LoanRepaymentSet from './LoanRepaymentSet';
  import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class Loan extends Component {
    constructor(props){
      super(props);
      this.state = {
        oData:[],
        dataSource:ds.cloneWithRows([]),
        animating:true,
        isEmpty:false,
        isRefreshing:false,
        curPage:1,
        totalPageNum:0,
        isShowBottomRefresh:false,
        startDate:'',
        endDate:'',
        choseType:0,
        choseData:[{text:'成功',value:'success'},{text:'审核中',value:'auditing'},{text:'招标中',value:'inviting'}],
        tabIndex:0,
        navRightBtnShowFlag:false,	//是否显示右边的筛选按钮（tabIndex=0和1时显示）
      }
    }
    _goBack(){
      goBack(this.props.navigator); //1223566790
    }
    _getData(flag){
      /*
      var choseType=this.state.choseType;
      var borrowFlag=this.state.choseData[choseType].value ;
      console.log("choseType:"+choseType);
      console.log("borrowFlag:"+borrowFlag);
      */
      var tabIndex=this.state.tabIndex;
        console.log("tabIndex:"+tabIndex);
      //调用子组件刷新方法刷新数据
      if(tabIndex==0){
        this.refs.laonList._onRefresh(false);
      }else if(tabIndex==1){
        this.refs.roanRepayment._onRefresh(false);
      }else{

      }
      
    }

    componentDidMount(){
      
    }
    
    _openSearch(){
      this.setState({dialog:!this.state.dialog});
    }
    _onSubmit(params){
      //数据格式
      //params = {startDate:startDate,
     //    endDate:endDate,
     //    choseType:choseType
     //  };
     this.setState(params,()=>{this.setState({animating:true});this._getData()});
    }
    
    render(){
      return (
        <View style={{flex:1}}>

         <NavigationBar
           title={"借款管理"}
           leftShowIcon={true}
           leftBtnFunc={this._goBack.bind(this)}
           rightDisplay={this.state.navRightBtnShowFlag}
           rightTitle="筛选"
           rightBtnFunc={this._openSearch.bind(this)}
         />
         
         <ScrollableTabView
               ref="tabView"
               style={styles.scrollable}
               tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
               tabBarTextStyle={styles.tabBarTextStyle}
               tabBarActiveTextColor={'#e5383e'}
               tabBarInactiveTextColor={'#333'}
               locked={true}
               onChangeTab={(data)=>{
                   this.setState({
                       tabIndex:data.i,
                       navRightBtnShowFlag:data.i==2?true:false,
                       choseData: data.i==0 ?
                       [{text:'成功',value:'success'},{text:'审核中',value:'auditing'},{text:'招标中',value:'inviting'}]
                       : [{text:'还款中',value:'repaymenting'},{text:'已还款',value:'alreadyRepaid'}]
                       })
                   }}
               renderTabBar={() => <DefaultTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
           >
            
               <LoanList ref="laonList" tabLabel="借款管理"
                choseType={this.state.choseType}
                choseData={this.state.choseData}
                startDate={this.state.startDate} navigator={this.props.navigator}
                endDate={this.state.endDate} />
               <LoanRepayment ref="roanRepayment" tabLabel="借款明细"
                choseType={this.state.choseType} 
                choseData={this.state.choseData}
                startDate={this.state.startDate} navigator={this.props.navigator}
                endDate={this.state.endDate} 
                />
               <LoanRepaymentSet ref="roanRepaymentSet" tabLabel="自动还款设置" navigator={this.props.navigator}
                />
           </ScrollableTabView>


          <SearchModal
            dialog={this.state.dialog}
            choseData={this.state.choseData}
            modalEvent={this._openSearch.bind(this)}
            onSubmit={this._onSubmit.bind(this)}
            status={true}
          />
      </View>
      );
    }
  }