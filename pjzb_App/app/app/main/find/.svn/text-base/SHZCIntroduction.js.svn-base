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
   ScrollView,
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;
 export default class GZCTIntroduction extends Component {
   constructor(props){
     super(props);
     this.state = {

     }
   }

   render(){
     return (
         <View style={styles.bodyView}>
             <View style={styles.bodyView}>
                 <ScrollView style={styles.scrollView}>
                     <View style={styles.textView}>
                         <Text style={styles.text}>        汇资产管理有限公司（简称：赣州盛汇）是由江西盛汇资产管理有限公司和赣州盛汇高管共同持股于2015年5月18日正式成立，主要从事融资担保、产业投资、资产收购、股权管理等主要业务。赣州盛汇因改革而生、凭创新而兴，依托本土银行良好的资源合作关系，以投资成长期、成熟期项目开局，逐步在服务全市经济社会发展大局中形成了民营资本联合国营资本共同参与投资运营的经营架构。凭借稳健的投资理念与丰富的资产管理经验，公司积极开拓基础设施建设、房地产等领域业务，成为整合社会闲置资金与优质资产投资的桥梁。赣州盛汇正坚定不移走市场化转型发展之路，努力加快打造成为集金融综合服务、资产综合管理为一体，以金融控股为主要特征的资产运营公司。</Text>
                     </View>
                     <View style={[styles.imageView,{marginBottom:80/oPx}]}>
                         <Image source={require('../../images/find/aboutUs/shzc.png')} style={{width: 690/oPx,height: 680/oPx}} />
                     </View>
                 </ScrollView>
             </View>
         </View>
     );
   }
 }
 const styles = StyleSheet.create({
     scrollView: {
         flex: 1,
         width: StyleConfig.screen_width,
     },
     bodyView: {
        flex: 1,
        backgroundColor: '#fff',
         marginTop: 16/oPx,
         alignItems: 'center',
     },
     textView: {
         alignSelf : 'center',
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
     },
     text: {
        fontSize: 28/oPx,
         color: '#333333',
         lineHeight: 24,
         backgroundColor:'transparent'
     },
     imageView: {
        marginTop: 50/oPx,
        marginBottom: 50/oPx,
        alignItems: 'center',
     },
 });
