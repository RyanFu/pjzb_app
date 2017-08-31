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
            <ScrollView style={styles.scrollView}>
                <View style={styles.textView}>
                  <Text style={styles.text}>        赣州城兴投资管理有限公司隶属于赣州城市开发投资集团有限责任公司（简称“赣州城投集团”）旗下全资子公司。赣州城投集团成立于2004年3月，2009年9月股权改制为市政府直属、市国资委监管的国有独资企业，注册资本金10亿元。</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>        2015年，集团主体信用级别达到AA+，成为江西省内非省会城市中首个主体信用等级达到AA+的城投类公司。成功发起设立300亿元赣南苏区振兴发展产业投资基金，这是国家级首支专项支持革命老区的大体量产业投资基金。集团综合实力在全国城投类企业中排名第43位，是我省唯一一家进入全国50强的城投公司。</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>        截至2016年9月底，预计集团总资产680亿元，净资产420亿元，负债率38.23%；筹措资金108.25亿元，完成投资24.10亿元；实现营业收入9.13亿元，利润总额1.49亿元。累计实现融资550.58亿元，完成工程项目88个，项目投资500亿元。</Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/gzct.png')} style={{width: 690/oPx,height: 680/oPx}} />
                </View>
                <View style={[styles.textView,{marginBottom: 80/oPx}]}>
                    <Text style={styles.text}>        赣州城投集团紧紧围绕赣南苏区振兴发展战略，立足做大做强做优，秉承“诚信为本、绩效为先、奉献为责、创新为魂”的企业精神，定位为“三大主体”（即城市建设融资主体、城市投资建设主体和城市国有资源运营主体），致力于打造集融资、投资、建设、运营、管理为一体的资产超千亿元的全国知名、省内一流的国有城市建设投资运营集团。</Text>
                </View>
            </ScrollView>
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
         marginTop: 15/oPx,
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
         alignSelf : 'center',
     },
     text: {
        fontSize: 28/oPx,
         color: '#333333',
         lineHeight: 24,
         backgroundColor:'transparent'
     },
     imageView: {
        marginTop: 50/oPx,
        alignItems: 'center',
     },
 });
