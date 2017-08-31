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
 import { goBack } from '../../utils/NavigatorBack';
import NavigationBar from '../../components/NavigationBar';
 const oPx = StyleConfig.oPx;
 export default class CompanyProfile extends Component {
   constructor(props){
     super(props);
     this.state = {

     }
   }

    //返回
    _goBack(){
     goBack(this.props.navigator);
    }

   render(){
     return (
         <View style={{flex:1}}>
             <NavigationBar
                 title="公司简介"
                 leftShowIcon={true}
                 leftBtnFunc={this._goBack.bind(this)}
             />
             <View style={styles.bodyView}>
                 <ScrollView style={styles.scrollView}>
                     <View style={styles.textView}>
                         <Text style={styles.text}>        普金资本运营（赣州）有限公司（简称：普金资本）由赣州城兴投资管理有限公司联合赣州盛汇资产管理有限公司共同出资设立的互联网金融平台，2016年3月注册成立于原中央苏区振兴发展示范区--赣州。普金资本系获赣州市国资委备案的互联网金融平台，将专注围绕赣州国有企业、大型集团上下游供应链投融资服务。</Text>
                     </View>
                     <View style={styles.imageView}>
                         <Image source={require('../../images/find/aboutUs/gsjj_1.png')} style={{width: 690/oPx,height: 300/oPx}} />
                     </View>
                     <View style={[styles.textView]}>
                         <Text style={styles.text}>        普金资本团队汇聚金融行业、城建行业、供应链管理行业一批专业人才，拥有丰富的从业经验，具备成熟的产品开发设计能力、严格的风险管理能力、优秀的企业管理能力。致力于打造“专业、稳健、诚信、高效”的互联网金融平台，成为赣南苏区振兴发展投融资服务的示范性平台。</Text>
                     </View>
                     <View style={[styles.imageView,{marginBottom: 80/oPx}]}>
                         <Image source={require('../../images/find/aboutUs/gsjj_2.png')} style={{width: 690/oPx,height: 300/oPx}} />
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
         alignItems: 'center',
     },
     textView: {
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
         alignSelf : 'center',
     },
     text: {
        fontSize: 28/oPx,
         color: '#333333',
         lineHeight: 24,
     },
     imageView: {
        marginTop: 30/oPx,
         marginBottom: 20/oPx,
        alignItems: 'center',
     },
     titleText: {
        marginTop: 40/oPx,
        marginBottom: 20/oPx,
        alignSelf : 'center',
        fontSize: 42/oPx,
         backgroundColor:'transparent'
     },
 });
