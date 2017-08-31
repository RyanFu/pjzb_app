/**
 * Created by zlx on 2017/03/27.
 * 借款人/机构信息
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Linking,
  } from 'react-native';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class BorrowerAgencyInformation extends Component {
    constructor(props){
      super(props);
    }
    componentWillMount () {

    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
      return (
        <ScrollView style={styles.container}>
            <View style={[styles.rowTr,{marginTop:20/oPx,backgroundColor:'#E9ECF3'}]}>
                <View style={styles.leftView}><Text style={styles.leftText}>信息内容</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>信息说明</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>借款人姓名（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>借款人证件号码（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>借款用途</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0,height:120/oPx,paddingTop:42/oPx,}]}><Text style={styles.leftText}>借款人为自然人</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>在本平台逾期次数</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>在本平台逾期总金额</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>资产信息</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>其它借款信息</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0,borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>信用信息</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>全称及简称（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>注册资本</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>注册地址（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>成立时间</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0,height:160/oPx,paddingTop:60/oPx}]}><Text style={styles.leftText}>借款人为法人或其它组织</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>法定代表人（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>借款用途</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>股东信息</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>法定代表人信用信息（脱敏处理）</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>实缴资本</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderTopWidth:0}]}><Text style={styles.leftText}></Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>办公地点（脱敏处理）</Text></View>
            </View>
            <View style={[styles.rowTr,{marginBottom:40/oPx}]}>
                <View style={[styles.leftView,{borderBottomWidth:StyleConfig.borderWidth,borderTopWidth: 0}]}><Text style={[styles.leftText,{lineHeight:120}]}></Text></View>
                <View style={[styles.rightView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.rightText}>经营区域</Text></View>
            </View>
        </ScrollView>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
        flex:1,
      backgroundColor:'#fff',
        marginTop:16/oPx,
    },
      rowTr: {
        height:80/oPx,
        width:StyleConfig.screen_width-40/oPx,
        marginLeft:20/oPx,
        flexDirection: 'row',
      },
      leftView: {
          flex:3,
          alignItems:'flex-start',
          borderColor:StyleConfig.borderColor,
          borderTopWidth:StyleConfig.borderWidth,
          borderLeftWidth:StyleConfig.borderWidth,
          justifyContent:'center',
      },
      rightView: {
          flex:7,
          alignItems:'flex-start',
          borderColor:StyleConfig.borderColor,
          borderTopWidth:StyleConfig.borderWidth,
          borderLeftWidth:StyleConfig.borderWidth,
          borderRightWidth:StyleConfig.borderWidth,
          justifyContent:'center',
      },
      leftText: {
          color:'#999',
          fontSize: 24/oPx,
          paddingLeft:15/oPx,
          lineHeight:24,
      },
      rightText: {
          color:'#464646',
          fontSize: 24/oPx,
          paddingLeft:15/oPx,
          lineHeight:24,
      },
  });
