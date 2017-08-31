/**
 * Created by zlx on 2017/03/27.
 * 基本信息
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   Alert,
   Linking,
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 const oPx = StyleConfig.oPx;
 export default class BsicInformation extends Component {
   constructor(props){
     super(props);
     this.state = {

     }
   }

     toPhone1() {
         Alert.alert(
             '提示信息',
             '是否拨打 0797-2190888 企业电话',
             [
                 {text: '取消' },
                 {text: '拨打', onPress: () => {Linking.openURL('tel: 07972190888');}},
             ]
         );
     }

     onPress(url){
         Linking.canOpenURL(url).then(supported => {
             if (supported) {
                 return Linking.openURL(url);
             }
         }).catch(err => console.error('error', err));
     }

   render(){
     return (
         <View style={styles.bodyView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>全称及简称</Text>
                    <Text style={styles.text}>普金资本运营（赣州）有限公司</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>注册资本</Text>
                    <Text style={styles.text}>3000万元</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>注册地址</Text>
                    <Text style={styles.text}>江西省赣州市章贡区章江新区赣州中航城10B-18</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>成立时间</Text>
                    <Text style={styles.text}>2016年3月7日</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>法定代表人</Text>
                    <Text style={styles.text}>姜茗盛</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>经营范围</Text>
                    <Text style={styles.text}>资产管理：企业项目投资与管理；企业营销与策划；接收金融机构委托从事金融信息技术外包；接收金融机构委托从事金融业务流程外包；接收金融机构委托从事金融知识流程外包；</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.text,{color:'#999'}]}>联系方式</Text>
                    <Text style={[styles.text,{color:'#319bff'}]} onPress={this.toPhone1}>0797-2190888</Text>
                </View>
                <View style={[styles.textView,{marginBottom:30/oPx}]}>
                    <Text style={[styles.text,{color:'#999'}]}>邮箱</Text>
                    <Text style={[styles.text,{color:'#319bff'}]} onPress={() => this.onPress('mailto:ling.gu@pujinziben.com')} >ling.gu@pujinziben.com</Text>
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
         color: '#464646',
         lineHeight: 24,
         backgroundColor:'transparent'
     },
 });
