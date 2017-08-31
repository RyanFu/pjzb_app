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
 import Swiper from 'react-native-swiper';
 const oPx = StyleConfig.oPx;
 export default class GSZJIntroduction extends Component {
   constructor(props){
     super(props);
     this.state = {

     }
   }

   render(){
     return (
         <View style={styles.bodyView}>
            <Swiper height={StyleConfig.screen_height-260/oPx}  autoplay={true} showsButtons={false} showsPagination={true} autoplayTimeout={5}>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/ptzz_1.png')} style={{width: 612/oPx,height: 842/oPx}} />
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/ptzz_2.png')} style={{width: 691/oPx,height: 481/oPx}} />
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/ptzz_3.png')} style={{width: 690/oPx,height: 492/oPx}} />
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../images/find/aboutUs/ptzz_4.png')} style={{width: 690/oPx,height: 482/oPx}} />
                </View>
             </Swiper>
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
     imageView: {
        marginBottom: 40/oPx,
        alignItems: 'center',
        justifyContent:'center',
        height: 842/oPx
     },
 });
