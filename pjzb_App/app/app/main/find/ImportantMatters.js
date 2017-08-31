/**
 * Created by zlx on 2017/03/27.
 * 重大事项信息
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
  export default class ImportantMatters extends Component {
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
        <View style={styles.container}>
            <View style={[styles.rowTr,{height:120/oPx},{marginTop:20/oPx}]}>
                <View style={styles.leftView}><Text style={styles.leftText}>公司减资、合并、分立、解散或申请破产</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>公司依法进入破产程序</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>公司被责令停业、整顿、关闭</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>公司主要或者全部业务陷入停顿</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={[styles.rowTr,{height:160/oPx}]}>
                <View style={styles.leftView}><Text style={styles.leftText}>存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={[styles.rowTr,{height:160/oPx}]}>
                <View style={styles.leftView}><Text style={styles.leftText}>公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={[styles.rowTr,{height:270/oPx}]}>
                <View style={[styles.leftView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.leftText}>公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施</Text></View>
                <View style={[styles.rightView,{justifyContent:'center',borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.rightText}>无</Text></View>
            </View>
        </View>
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
          flex:1,
          alignItems:'flex-end',
          borderColor:StyleConfig.borderColor,
          borderTopWidth:StyleConfig.borderWidth,
          borderLeftWidth:StyleConfig.borderWidth,
          justifyContent:'center',
      },
      rightView: {
          flex:1,
          alignItems:'flex-start',
          borderColor:StyleConfig.borderColor,
          borderTopWidth:StyleConfig.borderWidth,
          borderLeftWidth:StyleConfig.borderWidth,
          borderRightWidth:StyleConfig.borderWidth,
          justifyContent:'center',
      },
      leftText: {
          color:'#464646',
          fontSize: 24/oPx,
          paddingRight:15/oPx,
          lineHeight:18,
      },
      rightText: {
          color:'#999',
          fontSize: 24/oPx,
          paddingLeft:15/oPx,
          lineHeight:18,
      },
  });
