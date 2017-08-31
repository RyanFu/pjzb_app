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
            <View style={[styles.rowTr,{marginTop:20/oPx}]}>
                <View style={styles.leftView}><Text style={styles.leftText}>合并/分立/解散或者申请破产</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>从业机构受到刑事处罚</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>从业机构受到重大行政处罚</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>无</Text></View>
            </View>
            <View style={[styles.rowTr,{height:180/oPx}]}>
                <View style={styles.leftView}><Text style={[styles.leftText,{paddingLeft:18/oPx}]}>实际控制人与持 股 5%以上的股东、董事、监事、高级管理人员的变更信息</Text></View>
                <View style={[styles.rightView,{justifyContent:'center'}]}><Text style={styles.rightText}>2016年3月至2017年1月止，未发生任何变更</Text></View>
            </View>
            <View style={[styles.rowTr,{height:220/oPx}]}>
                <View style={[styles.leftView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={[styles.leftText,{paddingLeft:18/oPx}]}>实际控制人与持股 5%以上的股东、董事、监事、高级管理人员涉及的重大诉讼、仲裁事项或重大行政处罚</Text></View>
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
