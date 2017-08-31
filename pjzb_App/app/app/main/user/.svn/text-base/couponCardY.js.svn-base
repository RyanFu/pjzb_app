/**
 * Created by wsl on 2017/02/16.
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {StyleConfig} from '../../style';
import styles from '../../style/coupon';
const oPx = StyleConfig.oPx;
export default class CouponCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      showData:props.data,
      showLoading:props.loading
    }
  }
  _getText(){
    if(this.props.title == '代金券'){
      return '单笔投资满100元使用';
    }
    if(this.props.title == '现金券'){
      return '点击可直接领取'
    }
    if(this.props.title == '体验金'){
      return '体验标投标专享金'
    }
  }
  _showRow(row,index){
    if(row.usestatus != '2') return null;
    return <View style={styles.coupon_card} key={index}>
      <Image source={require('../../images/user/coupon_isuse.png')} style={styles.img}/>
      <View style={styles.cardView}>
        <View style={styles.leftView}>
          <View style={styles.leftViewTopView}></View>
          <View style={styles.leftViewBottomView}></View>
        </View>
        <View style={styles.centerView}>
          <Text style={styles.centerViewText}>{this._getText()}</Text>
        </View>
        <View style={styles.rightView}>
        </View>
      </View>
    </View>
  }
  _noData(){
    let show = true;
    for (let i=0;i<this.props.data.length;i++){
      if(this.props.data[i].usestatus == '2'){
        show = false;
        break;
      }
    }
    if(show){
      return <View style={styles.noData}><Text style={styles.noDataText}>没有符合条件的内容</Text></View>
    }
    return null;
  }
  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
        {
          this.props.data.map((row, index) =>{
              return this._showRow(row,index);
          })
        }
        {this._noData()}
      </ScrollView>
    </View>
    )
  }
}
