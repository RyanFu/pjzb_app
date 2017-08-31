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
 export default class FVGWIntroduction extends Component {
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
                    <Text style={styles.nameText}>赖华明  <Text style={styles.positionText}>首席法律顾问</Text></Text>
                    <Text style={[styles.text,{marginTop:14/oPx}]}>        就读于江西财经大学EMBA，2005始进入南芳律师事务所做专职律师，2014年5月至今在北</Text>
                    <Text style={[styles.text,{marginTop:14/oPx}]}>        先后担任赣州市规划建设局、赣州市交通局、瑞金市人民政府、龙南县人民政府、赣州外商协会、赣江源商会、赣州市盐业局、赣州市公路局大余分局、青峰药业、谱赛科（江西）生物技术有限公司、江西百福房地产、赣州长发置业有限公司、赣州华大置业有限公司、赣州新起点工贸有限公司、南康鑫南投资有限公司、赣州金地实业有限公司、江西贵竹房地产开发有限公司、赣州君嘉酒店集团、江西兴万家现代农业有限公司、赣州名忠汽车有限公司、赣州锦城建设开发有限公司、《赣南社会科学》杂志、《城市经纬》杂志、《赣州民营企业》杂志等四十余家行政、企事业单位的常年法律顾问。</Text>
                </View>
                <View style={styles.hr}></View>
                <View style={styles.textView}>
                    <Text style={styles.nameText}>李勇华  <Text style={styles.positionText}>项目主办人 / 律师</Text></Text>
                    <Text style={[styles.text]}>1999/09--2003/06 武汉大学法学</Text>
                    <Text style={[styles.text]}>2006/09--2009/06 重庆大学经济法</Text>
                    <Text style={styles.text}>2009/08--2013/08就职于北京国枫凯文（深圳）律师事务所</Text>
                    <Text style={styles.text}>2013/09--至今就职于北京市中银（赣州）律师事务所。主要业务领域：合同法、公司法、知识产权法、劳动合同法等方面的法律问题。</Text>
                    <Text style={styles.text}>执业期间代理众多物业服务合同纠纷、借款合同纠纷、劳动争议纠纷、建设工程合同纠纷等，并在公司并购、公司境内外上市及融资方面有丰富的经验积累，具备较强的法律专业知识和法律技能。</Text>
                </View>
                <View style={styles.hr}></View>
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
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
         alignSelf : 'center',
     },
     text: {
         fontSize: 28/oPx,
         color: '#999',
         lineHeight: 24,
     },
     imageView: {
        marginTop: 50/oPx,
        alignItems: 'center',
     },
     nameText: {
         fontSize: 36/oPx,
         color: '#333',
         marginTop: 40/oPx,
     },
     positionText: {
         fontSize: 28/oPx,
         color: '#333',
     },
     hr: {
         width: StyleConfig.screen_width-30/oPx,
         marginTop: 40/oPx,
         marginLeft: 30/oPx,
         borderBottomWidth: StyleConfig.borderWidth,
         borderBottomColor: StyleConfig.borderColor,
     },
 });
