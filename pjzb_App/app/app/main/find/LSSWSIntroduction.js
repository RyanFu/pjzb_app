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
                    <Text style={[styles.text,{marginTop:14/oPx}]}>        中银律师事务所成立于1993年1月，是经司法部门批准的我国最早的合伙制律师事务所之一，也是我国最早从事证券法律业务的律师事务所，目前可在金融证券和公司法律风险管理、建筑与房地产、知识产权、国际业务领域提供全面的法律服务，在律师界和金融证券界已经牢固树立了“中银律师”的品牌。迄今，中银律师已为中国300余家企业的IPO及上市公司的配股、增发、并购与资产重组提供了优质法律服务。</Text>
                    <Text style={[styles.text,{marginTop:14/oPx}]}>        中银律师总部设在北京，目前已在上海、天津、深圳等27个城市设有分支机构，现有律师和工作人员一千余人，绝大部分律师获得国内及国外著名学府的硕士和博士学位，且多数律师具有在政府、企业、知名律师事务所工作或执业的经历，在法律和商业领域具备了丰富的实务经验。中银律师事务所规模位列全国第三位。</Text>
                    <Text style={[styles.text,{marginTop:14/oPx}]}>        中银赣州团队近30人，秉承总所办所宗旨，长期致力于金融资本法律业务与企业法律风险管理实务，先后为40余家市重点企业提供常年法律顾问服务，与政府经济职能部门、当地司法资源保持着良好、健康的合作关系；赢得了业内外的良好口碑及品牌影响力。本所实施专业分工、团队合作运作模式，即每位律师专攻1-2个专业领域，以达到“因为专注、所以专业”，再由全所集中统筹，形成团队合力，组成有机团队为委托方提供全方位的法律服务。本所现设：金融法律事务部、法律风险管理事务部、人力资源法律事务部、知识产权法律事务部、房地产建设工程法律事务部及民商事争议解决中心等专业部门。</Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/lssws.png')} style={{width: 690/oPx,height: 433/oPx}}/>
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
         width: StyleConfig.screen_width-60/oPx,
         backgroundColor: 'transparent',
         alignSelf : 'center',
     },
     text: {
         fontSize: 28/oPx,
         color: '#333',
         lineHeight: 24,
     },
     imageView: {
        marginTop: 50/oPx,
        alignItems: 'center',
         marginBottom: 80/oPx,
     },
     hr: {
         width: StyleConfig.screen_width-30/oPx,
         marginTop: 40/oPx,
         marginLeft: 30/oPx,
         borderBottomWidth: StyleConfig.borderWidth,
         borderBottomColor: StyleConfig.borderColor,
     },
 });
