/**
 * Created by zlx on 2017/03/27.
 * 网站或平台信息
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
  export default class InformationDisclosure extends Component {
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
                <View style={styles.leftView}><Text style={styles.leftText}>网站或平台网址</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>http://www.pujinziben.com</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>平台名称</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>普金资本</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>平台上线运营时间</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>2016年9月9日</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>相应电信业务经营许可证</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>申请中</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>移动APP应用</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>已上线</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>公众号或服务号</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>普金资本运营</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={styles.leftView}><Text style={styles.leftText}>信息安全测评认证信息</Text></View>
                <View style={styles.rightView}><Text style={styles.rightText}>申请中</Text></View>
            </View>
            <View style={styles.rowTr}>
                <View style={[styles.leftView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.leftText}>ICP备案号</Text></View>
                <View style={[styles.rightView,{borderBottomWidth:StyleConfig.borderWidth}]}><Text style={styles.rightText}>赣ICP备16004010号</Text></View>
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
          color:'#999',
          fontSize: 24/oPx,
          paddingRight:15/oPx,
      },
      rightText: {
          color:'#464646',
          fontSize: 24/oPx,
          paddingLeft:15/oPx,
      },
  });
