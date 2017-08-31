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
 export default class RYZJIntroduction extends Component {
   constructor(props){
     super(props);
     this.state = {
        bannerList:[
        // {bannerPath:require('../../images/find/aboutUs/ryzz_1.png')},
        {bannerPath:require('../../images/find/aboutUs/ryzz_2.png')},
        {bannerPath:require('../../images/find/aboutUs/ryzz_3.png')},
        // {bannerPath:require('../../images/find/aboutUs/ryzz_4.png')},
        {bannerPath:require('../../images/find/aboutUs/ryzz_5.png')}
        ]
     }
   }
   _swiper(row,index){
     return <View style={styles.imageView} key={index}>
       <Image style={styles.img} resizeMode="stretch"  source={row.bannerPath} />
     </View>
   }
   render(){
     return (
         <View style={styles.bodyView}>
            <Swiper height={StyleConfig.screen_height-260/oPx} autoplay={true} showsButtons={false} showsPagination={true} autoplayTimeout={5}>
                {
                  this.state.bannerList.map((row, index) =>{
                      return this._swiper(row,index);
                  })
                }
             </Swiper>
         </View>
     );
   }
 }
 const styles = StyleSheet.create({
     scrollView: {
         flex: 1,
         width: StyleConfig.screen_width-60/oPx,
     },
     bodyView: {
        flex: 1,
        backgroundColor: '#fff',
         marginTop: 16/oPx,
         alignItems: 'center',
     },
     imageView: {
        marginTop: 110/oPx,
        alignItems: 'center',
     },
     img: {
        width: StyleConfig.screen_width-60/oPx,
        height: StyleConfig.screen_width/oPx + 200/oPx,
     },
 });
