/**
 * Created by zlx on 2017/03/27.
 * 项目信息
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
  export default class ProjectInformation extends Component {
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
                <View style={styles.leftView}><Text style={styles.leftText}>项目名称</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>平台命名的项目名称，须代表项目的唯一性</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>项目简介</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指单笔借款项目的基本情况介绍</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>项目金额</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指标的总金额</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>项目期限</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指借款人借款的时间</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>起投金额</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指出借人对本项目的最低出借额度</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>预期收益率</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>一般采用年化收益率表示</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>预计起息日</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指项目预计开始计算利息的日期</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>还款方式</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指借款人在合同中约定的还款方式</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>项目状态</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指项目实施的状态</Text></View>
            </View>
            <View style={[styles.rowTr,{height:120/oPx}]}>
                <View style={styles.leftView}><Text style={[styles.leftText]}>项目融资进度</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指项目融资的进展情况，一般采用已参与融资项目金额占比或剩余可出借占比的方式表示</Text></View>
            </View>
            <View style={[styles.rowTr,{height:120/oPx}]}>
                <View style={styles.leftView}><Text style={[styles.leftText]}>还款保障措施</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指为单笔融资项目提供的还款保障措施，如抵押、质押、保证、保险等措施</Text></View>
            </View>
            <View style={[styles.rowTr,{height:120/oPx}]}>
                <View style={styles.leftView}><Text style={[styles.leftText]}>项目风险提示</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指针对单笔借款项目的风险出借人的风险提示信息</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>资金用途</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指获贷资金流向信息、使用信息及计划</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>相关费用</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指投资人投资该项目可能被收取的费用</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>合同模板</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>指项目借款合同模板</Text></View>
            </View>
            <View style={[styles.rowTr,{height:120/oPx}]}>
                <View style={styles.leftView}><Text style={[styles.leftText]}>出借人或投资人适当性管理提示</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>包括但不限于出借人与投资人风险提示，最低出借或起投金额</Text></View>
            </View>
            <View style={[styles.rowTr,{marginBottom:40/oPx,height:400/oPx}]}>
                <View style={[styles.leftView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={[styles.leftText]}>限额管理</Text></View>
                <View style={[styles.rightView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.rightText}>指同一自然人在该平台的借款余额是否超过人民币20万元；同一法人或其他组织在该平台的借款余额是否超过人民币100万元；同一自然人在不同网络借贷信息中介机构平台借款总余额是否超过人民币100万元；同一法人或其他组织在不同网络借贷信息中介机构平台借款总余额是否超过人民币500万元。</Text></View>
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
      },
      rightText: {
          color:'#464646',
          fontSize: 24/oPx,
          paddingLeft:15/oPx,
          lineHeight:18,
      },
  });
