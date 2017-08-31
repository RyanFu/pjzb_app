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
 export default class DuoJinIntroduction extends Component {
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
                  <Text style={styles.text}>企业由于生产经营周转或项目投资需要资金，提供足值的不动产或动产作为抵质押物申请借款。</Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/djb-1.png')} style={styles.image} />
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
        marginTop: 60/oPx,
        marginBottom: 50/oPx,
        alignItems: 'center',
     },
     image: {
        width:690/oPx,
        height:630/oPx,
     },
 });
