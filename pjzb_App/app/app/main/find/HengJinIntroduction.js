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
   ScrollView,
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;
 export default class HengJinIntroduction extends Component {
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
                  <Text style={styles.text}>以保理公司持有的大型知名企业签发并承兑的商业承兑汇票为还款保障的金融产品，借款到期时，保理公司以承兑企业无条件支付的票面资金用于归还借款本息。</Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/hjb-1.png')} style={styles.image} />
                </View>
            </ScrollView>
         </View>
     );
   }
 }
 const styles = StyleSheet.create({
     bodyView: {
        flex: 1,
        backgroundColor: '#fff',
         marginTop: 16/oPx,
         alignItems: 'center',
     },
     scrollView: {
         flex:1,
         width: StyleConfig.screen_width,
     },
     textView: {
         marginTop: 30/oPx,
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
         alignSelf: 'center',
         borderWidth:StyleConfig.borderWidth,
         borderColor:'#ed714b'
     },
     text: {
         fontSize: 28/oPx,
         color: '#333333',
         lineHeight: 22,
         padding: 30/oPx,
     },
     imageView: {
        marginTop: 30/oPx,
        marginBottom: 50/oPx,
        alignItems: 'center',
     },
     image: {
        width:690/oPx,
        height:830/oPx,
     },
 });
