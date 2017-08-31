/**
 * Created by zlx on 2017/01/27.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ListView
 } from 'react-native';
 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;
 export default class ProductList extends Component{
   constructor(props){
     super(props)
   }
   //按钮状态
   _btnStatus(data){
     let status = this.props.data.debtStatus;
     let oBtn = status == '2'?
     <TouchableOpacity style={styles.oButton}
       onPress={()=>this.props.onPressEvent(data.id,data.borrowTitle,data.paymentMode)}>
       <Text style={styles.oButtonText}>立即认购</Text>
     </TouchableOpacity>:
     <View style={[styles.oButton,styles.oButtonDisabled]}>
       <Text style={styles.oButtonTextDisabled}>{this._getStatus(status)}</Text></View>;
     return oBtn;
   }
   _getStatus(borrow){
       if(borrow == 1){
           return '申请中';
       }else if(borrow == 2){
           return '立即认购';
       }else if(borrow == 3){
           return '转让成功';
       }
    };
   //获取产品类型
   _getBorrowWay(way){
     if(way =='3')
      return '多金宝';
     if(way =='4')
      return '普金保';
     if(way =='6')
      return '恒金保';
   }
   //金额格式化
   _formatAmt(val){
     if(val%2==0 && (val*0.0001)>0)
      return (val/10000)+'万元';
     if(val<10000)
      return val+'元';
   }
   //进度条
   _progress(data){
     let oStyle = this.props.showList?styles.oProgress:null;
     return <View style={oStyle}>
       <View style={[styles.product_detail_line,styles.product_detail_t_t]}>
         <View style={styles.product_detail_b_t}>
           <Text style={styles.product_d_b_small}>待收本金/<Text style={{color:'#333'}}>{this._formatAmt(data.debtSum)}</Text></Text>
         </View>
       </View>

         <View style={styles.product_detail_b_t}>
         <Text style={styles.product_d_b_small}>转让价格/<Text style={{color:'#333'}}>{this._formatAmt(data.auctionBasePrice)}</Text></Text>
       </View>
     </View>
   }
   _renderElm(){
     let data = this.props.data;
     let isAlignCenter = this.props.showList?{justifyContent:'center'}:null;
     return (
       <View style={styles.product_box}>
         <View style={styles.product_title}>
           {
             !this.props.showList?<Text style={styles.product_title_text}>
             {data.borrowTitle}
           </Text>:<TouchableOpacity onPress={()=>{this.props.onPressEvent(data.id,data.borrowTitle,data.paymentMode)}}><Text style={styles.product_title_text}>{data.borrowTitle}</Text></TouchableOpacity>
           }
           {
            !this.props.showList?
            <View style={styles.product_title_way}><Text style={styles.product_title_way_text}>
             {this._getBorrowWay(data.borrowWay)}
           </Text></View>:null
           }
         </View>
         <View style={styles.product_detail}>
           <View style={styles.product_detail_left}>
             <View style={styles.product_detail_t_t}>
               <Text style={styles.product_d_t_big}>
               {data.annualRate}
             </Text><Text style={styles.product_d_t_small}>%</Text>
             </View>
             <View style={styles.product_detail_b_t}>
               <Text style={styles.product_d_b_small}>预期年化收益率</Text>
             </View>
           </View>
           <View style={styles.product_detail_center}>
             <View style={[styles.product_detail_t_t]}>
               <Text style={[styles.product_d_t_big,{color:'#333'}]}>
               {/*{data.debtLimit}/{data.deadline}*/}
               </Text>
               <Text style={[styles.product_d_t_small,{color:'#333'}]}>{data.debtLimit}/{data.deadline}</Text>
             </View>
             <View style={styles.product_detail_b_t}>
               <Text style={styles.product_d_b_small}>剩余期数</Text>
             </View>
           </View>
           <View style={[styles.product_detail_right,isAlignCenter]}>
             {!this.props.showList?this._progress(data):this._btnStatus(data)}

           </View>
         </View>
         {this.props.showList?this._progress(data):null}
       </View>
     )
   }
   render(){
     let data = this.props.data;
     let onPress = this.props.onPress;
     const elm = this._renderElm();
     return (
       !this.props.showList? <TouchableOpacity onPress={()=>onPress(data.id)}>{elm}</TouchableOpacity> :<View>{elm}</View>
      );
   }
 }
 const styles =StyleSheet.create({
   product_box:{
     height:200/oPx,
     paddingLeft:30/oPx,
     borderTopColor:StyleConfig.borderColor,
     borderTopWidth:StyleConfig.borderWidth,
     backgroundColor:'#fff',
     overflow:'hidden'
   },
   product_title:{
     height:90/oPx,
     marginTop:3,
     flexDirection:'row',
     alignItems:'center',
   },
   product_title_text:{
     fontSize:28/oPx,
     color:'#333',
     alignSelf:'center',
     fontWeight:'200'
   },
   product_title_way:{
     marginLeft:3,
     height:32/oPx,
     width:118/oPx,
     borderRadius:16/oPx,
     borderColor:'#fea401',
     borderWidth:1/oPx,
     alignItems:'center',
     justifyContent:'center'
   },
   product_title_way_text:{
     fontWeight:'200',
     fontSize:22/oPx,
     color:'#fea401',
   },
   product_detail:{
     flexDirection:'row',
   },
   product_detail_left:{
     width:250/oPx
   },
   product_detail_center:{
     width:190/oPx
   },
   product_detail_right:{
     flex:1
   },
   product_detail_t_t:{
     height:40/oPx,
     flexDirection:'row',

   },
   product_d_t_big:{
     fontSize:50/oPx,
     alignSelf:'center',
     fontWeight:'200',
     color:'#eb3331'
   },
   product_d_t_small:{
     fontSize:26/oPx,
     color:'#eb3331',
     alignSelf:'flex-end'
   },
   product_detail_b_t:{
     height:50/oPx,
     justifyContent:'center',
   },
   product_d_b_small:{
     fontSize:22/oPx,
     color:'#999',
     fontWeight:'200',
   },
   line_default:{
     position:'absolute',
     left:0,
     bottom:3,
     width:182/oPx,
     height:8/oPx,
     backgroundColor:'#fbdbdb',
     borderRadius:4/oPx,
   },
   line_pull:{
     width:92/oPx,
     backgroundColor:'#eb3331',
   },
   oButton:{
     borderRadius:28/oPx,
     height:56/oPx,
     width:246/oPx,
     borderWidth:2/oPx,
     borderColor:'#eb3331',
     justifyContent:'center',
     alignItems:'center'
   },
   oButtonText:{
     fontSize:28/oPx,
     color:'#eb3331'
   },
   oButtonTextDisabled:{
     fontSize:28/oPx,
     color:'#999'
   },
   oButtonDisabled:{
     borderColor:'#999',
   },
   oProgress:{
     position:'absolute',
     left:470/oPx,
     top:12/oPx,
   },
 })
