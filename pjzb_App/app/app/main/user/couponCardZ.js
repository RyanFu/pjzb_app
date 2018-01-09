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
      cardTap:'1',
      title:'代金券'
    }
  }
  _getText(row){
    if(this.props.title == '代金券'){
      return row.rbName;
    }
    if(this.props.title == '现金券'){
      return row.rbName;
    }
    if(this.props.title == '体验金'){
      return row.money;
    }
  }
  _getInvestAmount(investAmount) {
    if (investAmount && investAmount > 0) {
      return  '满' + investAmount + '元抵用';
    }
  }

   _getRowText1(deadline, investAmount) {
    if (deadline == 0) {
      return  '单笔投资满' + investAmount + '元使用';
    } else {
      return  '[新人红包]单笔投资满' + investAmount + '元使用';
    }
  }

  _getRowText2(deadline, borrowFlag) {
    if (borrowFlag == 1) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的所有标可用';
      }
    } else if (borrowFlag == 2) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的新手标可用';
      }
    } else if (borrowFlag == 3) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的仅老标可用';
      }
    }
  }

  _getRowText3(row) {
    if (row.moneyInfo) {
      return <View style={styles.leftView}>
              <View style={styles.leftViewTopView}>
                <Text style={styles.leftViewTopViewText}>￥{row.money}</Text>
              </View>
            </View>;
    } else if (row.redmoneytype == 3) {
      return <View style={styles.leftView}>
              <View style={styles.leftViewTopView}>
                <Text style={[styles.leftViewTopViewText, {fontSize: 48/oPx}]}>+{row.money}%</Text>
              </View>
              <View style={styles.leftViewBottomView}>
                <Text style={styles.leftViewBottomViewText}>额外加息</Text>
              </View>
            </View>;
    } else {
      if (this.props.title != '现金券') {
        return <View style={styles.leftView}>
              <View style={styles.leftViewTopView}>
                <Text style={styles.leftViewTopViewText}>￥{row.money}</Text>
              </View>
              <View style={styles.leftViewBottomView}>
                <Text style={styles.leftViewBottomViewText}>{ this._getInvestAmount(row.investAmount) }</Text>
                {/*<Text style={styles.leftViewBottomViewText}>{row.useendtime?'有效期至'+row.useendtime:null}</Text>*/}
              </View>
            </View>;
      } else {
        return <View style={styles.leftView}>
              <View style={styles.leftViewTopView}>
                <Text style={styles.leftViewTopViewText}>￥{row.money}</Text>
              </View>
            </View>;
      }
    }
  }

  _getTextDetail(row) {
    if (row.moneyInfo) {
      return  <View style={styles.centerView}>
                <Text style={[styles.centerViewText,{fontSize: 30/oPx}]}>{row.moneyInfo}</Text>
              </View>;
    }else {
      if (this.props.title != '现金券') {
        return  <View style={styles.centerView}>
                  <Text style={styles.centerViewText}>{ this._getRowText1(row.deadline, row.investAmount) }</Text>
                  <Text style={styles.centerViewText}>{ this._getRowText2(row.deadline, row.borrowFlag) }</Text>
                  <Text style={styles.centerViewText}>有效期至{ row.useendtime }</Text>
                </View>;
      } else {
        return  <View style={styles.centerView}>
                  <Text style={styles.centerViewText}>有效期至{ row.useendtime }</Text>
                </View>;
      }
    }
  }

  _showRow(row,index){
    if(row.usestatus != '3') return null;
    return <View style={styles.coupon_card} key={index}>
      <Image source={require('../../images/user/coupon_deuse.png')} style={styles.img}/>
      <View style={styles.cardView}>
        { this._getRowText3(row) }
        
        {
          this._getTextDetail(row)
        }

        <View style={styles.rightView}>
          <View style={styles.rightViewBtn}>
            <Text style={[styles.rightViewText, {color: '#999'}]}>
              已
            </Text>
            <Text style={[styles.rightViewText, {color: '#999'}]}>
              过
            </Text>
            <Text style={[styles.rightViewText, {color: '#999'}]}>
              期
            </Text>
          </View>
        </View>
      </View>
    </View>
  }

  _noData(){
    let show = true;
    for (let i=0;i<this.props.data.length;i++){
      if(this.props.data[i].usestatus == '3'){
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
