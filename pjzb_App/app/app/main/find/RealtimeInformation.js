/**
 * Created by wsl on 2017/03/28.
 * ##实时数据
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   Dimensions,
   ScrollView
 } from 'react-native';
 import {StyleConfig} from '../../style';
 import LinearGradient from 'react-native-linear-gradient';
 import Request from '../../utils/Request';
 import Utils from '../../utils/utils';
 let oPx = StyleConfig.oPx;
 const screenWidth = Dimensions.get('window').width;
class DashLine extends Component{
    render(){
        var len = Math.ceil(screenWidth/4 - 60/oPx);
        var arr = [];
        for(let i=0; i<len; i++){
            arr.push(i);
        }

        return <View style={styles.dashLine}>
            {
                arr.map((item, index)=>{
                    return <Text style={styles.dashItem} key={'dash'+index}> </Text>
                })
            }
        </View>
    }
}
 export default class RealtimeInformation extends Component {
   constructor(props){
     super(props);
     this.state = {
     	investAmount:0.0,
     	dealNumber:0,
     	repayAmount:0,
     	unRepayAmount:0,
     	hasInterest:0,
     	userTotal:0,
     	investorCount:0,
     	avgUserInvest:0,
     	avgInvest:0,

      // 借贷余额笔数（待还笔数）
      borrowingRemainingCount: 0,
      // 累计借款人数量
      borrowingPersonCount: 0,
      // 当期出借人数量
      currentInvestPersonCount: 0,
      // 当期借款人数量
      currentBorrowingPersonCount: 0,
      // 前十大借款人待还金额占比
      borrowingPersonTop10: 0,
      // 最大单一借款人待还金额占比
      borrowingPersonTop1: 0,
      // 关联关系借款余额
      correlationBorrowingAmount: 0,
      // 关联关系借款笔数
      correlationBorrowingCount: 0,
      // 逾期金额
      overdueAmount: 0,
      // 逾期笔数
      overdueCount: 0,
      // 逾期90天（不含）以上金额 ---
      overdueAmount90Day: 0,
      // 逾期90天（不含）以上笔数
      overdueCount90Day: 0,
      // 累计代偿金额
      accumulationAlternativeAmount: 0,
      // 累计代偿笔数
      accumulationAlternativeCount: 0,

     }
   }
   componentDidMount(){
   	this.getData();
   }
   getData(){
   	Request.post('informationRevealed.do',{uid:''},(data)=>{
   	  if(data.error == '0'){
   	  	console.log(data)
   	  	this.setState(data)
   	  }else{
   	  	alert(data.msg);
   	  }
   	})
   }
   render(){
     return (
       <View style={styles.container}>
         <ScrollView >
         	<LinearGradient 
         	start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
         	colors={['#2f74d1', '#b872fe']} style={styles.top}>
         	<Image style={styles.icon_top} source={require('../../images/find/icon_realtime_top.png')}/>
         	<View style={styles.top_container}>
         		<Text style={styles.topText}>撮合交易总额（元）</Text>
         		<Text style={styles.operateText}>{Utils.formatCurrency(this.state.investAmount)}</Text>
         	</View>
	        </LinearGradient>

          <View style={styles.topViewTitle}>
            <Text style={styles.topViewText}>平台数据总览</Text>
          </View>
          <View style={styles.levelLine}></View>

          <View style={styles.viewItem}>
  	        <View style={styles.viewItems}>
  	        	<View style={styles.itemLeft}>
  	        		<Text style={styles.itemText}>交易笔数（笔）</Text>
  	        		<Text style={styles.itemText1}>{this.state.dealNumber}</Text>
  	        	</View>
  	        	<View style={styles.itemLine}></View>
  	        	<View style={styles.itemRight}>
  	        		<Text style={styles.itemText}>已还本金（元）</Text>
  	        		<Text style={styles.itemText1}>{Utils.formatCurrency(this.state.repayAmount)}</Text>
  	        	</View>
  	        </View>
  	        <DashLine/>

  	        <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>待还笔数（笔）</Text>
                <Text style={styles.itemText1}>{this.state.borrowingRemainingCount}</Text>
              </View>
  	        	<View style={styles.itemLine}></View>
  	        	<View style={styles.itemRight}>
                <Text style={styles.itemText}>待还本金（元）</Text>
                <Text style={styles.itemText1}>{Utils.formatCurrency(this.state.unRepayAmount)}</Text>
              </View>
  	        </View>
  	        <DashLine/>

  	        <View style={styles.viewItems}>
  	        	<View style={styles.itemLeft}>
                <Text style={styles.itemText}>为用户创造的收益（元）</Text>
                <Text style={styles.itemText1}>{Utils.formatCurrency(this.state.hasInterest)}</Text>
              </View>
  	        	<View style={styles.itemLine}></View>
  	        	<View style={styles.itemRight}>
  	        		<Text style={styles.itemText}>累积代偿金额（元）</Text>
  	        		<Text style={styles.itemText1}>{Utils.formatCurrency(this.state.accumulationAlternativeAmount)}</Text>
  	        	</View>
  	        </View>
  	        <DashLine/>

  	        <View style={styles.viewItems}>
  	        	<View style={styles.itemLeft}>
                <Text style={styles.itemText}>累积代偿笔数（笔）</Text>
                <Text style={styles.itemText1}>{this.state.accumulationAlternativeCount}</Text>
              </View>
  	        	<View style={styles.itemLine}></View>
  	        	<View style={styles.itemRight}>
  	        		<Text style={styles.itemText}>逾期金额（元）</Text>
  	        		<Text style={styles.itemText1}>{Utils.formatCurrency(this.state.overdueAmount)}</Text>
  	        	</View>
  	        </View>
            <DashLine/>

            <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>逾期笔数（笔）</Text>
                <Text style={styles.itemText1}>{this.state.overdueCount}</Text>
              </View>
              <View style={styles.itemLine}></View>
              <View style={styles.itemRight}>
                <Text style={styles.itemText}>90天逾期金额（元）</Text>
                <Text style={styles.itemText1}>{Utils.formatCurrency(this.state.overdueAmount90Day)}</Text>
              </View>
            </View>
            <DashLine/>

            <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>90天逾期笔数（笔）</Text>
                <Text style={styles.itemText1}>{this.state.overdueCount90Day}</Text>
              </View>
              <View style={styles.itemLine}></View>
              <View style={styles.itemRight}>
              </View>
            </View>
            <DashLine/>
          </View>

          <View style={styles.topViewTitle}>
            <Text style={styles.topViewText}>平台用户数据</Text>
          </View>
          <View style={styles.levelLine}></View>

          <View style={styles.viewItem}>
            <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>注册用户数（人）</Text>
                <Text style={styles.itemText2}>{this.state.userTotal}</Text>
              </View>
              <View style={styles.itemLine}></View>
              <View style={styles.itemRight}>
                <Text style={styles.itemText}>累计出借人数量（人）</Text>
                <Text style={styles.itemText2}>{this.state.investorCount}</Text>
              </View>
            </View>
            <DashLine/>

            <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>人均累计投资金额（元）</Text>
                <Text style={styles.itemText2}>{Utils.formatCurrency(this.state.avgUserInvest)}</Text>
              </View>
              <View style={styles.itemLine}></View>
              <View style={styles.itemRight}>
                <Text style={styles.itemText}>累计借款人数量（人）</Text>
                <Text style={styles.itemText2}>{this.state.borrowingPersonCount}</Text>
              </View>
              </View>
              <DashLine/>

              <View style={styles.viewItems}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemText}>笔均投资额（元）</Text>
                  <Text style={styles.itemText2}>{Utils.formatCurrency(this.state.avgInvest)}</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemText}>当期出借人数量（人）</Text>
                  <Text style={styles.itemText2}>{this.state.currentInvestPersonCount}</Text>
                </View>
              </View>
              <DashLine/>

              <View style={styles.viewItems}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemText}>当期借款人数量（人）</Text>
                  <Text style={styles.itemText2}>{this.state.currentBorrowingPersonCount}</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemText}>关联关系借款笔数（笔）</Text>
                  <Text style={styles.itemText2}>{this.state.correlationBorrowingCount}</Text>
                </View>
              </View>
              <DashLine/>

              <View style={styles.viewItems}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemText}>关联关系借款余额（元）</Text>
                  <Text style={styles.itemText2}>{Utils.formatCurrency(this.state.correlationBorrowingAmount)}</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemText}>前十大借款待还占比（%）</Text>
                  <Text style={styles.itemText2}>{this.state.borrowingPersonTop10}</Text>
                </View>
              </View>
              <DashLine/>

            <View style={styles.viewItems}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>最大借款待还占比（%）</Text>
                <Text style={styles.itemText2}>{this.state.borrowingPersonTop1}</Text>
              </View>
              <View style={styles.itemLine}></View>
              <View style={styles.itemRight}>
                  
              </View>
            </View>
            <DashLine/>
          </View>
          <View style={{marginBottom: 50/oPx}}></View>
         </ScrollView>
       </View>
     );
   }
 }
 const styles = StyleSheet.create({
 	dashLine: {
    flexDirection: 'row',
  },
  dashItem: {
    height:StyleConfig.borderWidth,
    width:4,
    marginRight:2,
    flex:1,
    backgroundColor: '#ccc',
  },
 	container:{
 		flex:1,
 		marginTop:16/oPx,
 		backgroundColor:'#fff',
 	},
  viewItem: {
    flex:1,
    paddingLeft: 30/oPx,
    paddingRight: 30/oPx,
  },
 	top:{
 		marginTop:40/oPx,
 		flex:1,
 		height:160/oPx,
 		borderRadius:80/oPx,
 		flexDirection:'row',
 		alignItems:'center',
 		marginBottom:10/oPx,
    marginLeft: 30/oPx,
    marginRight: 30/oPx,
 	},
 	icon_top:{
 		width:136/oPx,
 		height:136/oPx,
 		marginLeft:12/oPx
 	},
 	top_container:{
 		flex:1,
 		height:136/oPx,
 		backgroundColor:'transparent',
 		marginLeft:24/oPx,
 	},
 	topText:{
 		fontSize:28/oPx,
 		color:'#fff',
 		marginTop:18/oPx

 	},
 	operateText:{
 		fontSize:60/oPx,
 		color:'#fff',
 	},
 	viewItems:{
 		height:190/oPx,
 		flexDirection:'row',
 		alignItems:'center',

 	},
 	itemLeft:{
 		flex:1,
 		height:100/oPx,
 		justifyContent:'center'
 	},
 	itemRight:{
 		flex:1,
 		height:100/oPx,
 		justifyContent:'center'
 	},
 	itemLine:{
 		width:1/oPx,
 		height:100/oPx,
 		backgroundColor:'#ccc'
 	},
 	itemText:{
 		fontSize:28/oPx,
 		color:'#777',
 		marginTop:10/oPx,
 		textAlign:'center',
 	},
  itemText1:{
    fontSize:28/oPx,
    marginTop:10/oPx,
    textAlign:'center',
    color: '#e62538',
  },
  itemText2:{
    fontSize:28/oPx,
    marginTop:10/oPx,
    textAlign:'center',
    color: '#319bff',
  },
  topViewTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30/oPx,
  },
  topViewText: {
    color: '#333',
    fontSize: 36/oPx,
  },
  levelLine: {
    height: 1/oPx,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 30/oPx,
  },
 })