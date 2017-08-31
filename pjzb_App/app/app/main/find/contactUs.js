/**
 * Created by zlx on 2017/02/22.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
      Image,
      Alert,
      Linking,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;

  export default class HelpCenter extends Component {
    constructor(props){
      super(props);
      this.state = {
          mapHtml: null,
      }
    }

      componentWillMount () {

      }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    toPhone() {
      Alert.alert(
          '提示信息',
          '是否拨打 0797-2190888 公司电话',
          [
              {text: '取消' },
              {text: '拨打', onPress: () => {Linking.openURL('tel: 07972190888');}},
          ]
      );
    }

    toPhone1() {
        Alert.alert(
            '提示信息',
            '是否拨打 400-606-2079 客服电话',
            [
                {text: '取消' },
                {text: '拨打', onPress: () => {Linking.openURL('tel: 4006062079');}},
            ]
        );
    }

    render(){
      return (
        <View style={styles.container}>
          <NavigationBar
              title="联系我们"
              leftShowIcon={true}
              leftBtnFunc={this._goBack.bind(this)}
          />
            <ScrollView>
                <View style={styles.mapView}>
                   <Image source={require('../../images/find/aboutUs/map.png')} style={{height: 360/oPx,width: StyleConfig.screen_width-40/oPx}} />
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.titleText}>联系方式</Text>
                    <Text style={styles.titleLeft}>公司地址：<Text style={styles.titleRight}> 赣州市长征大道1号中航城国际大厦10F</Text></Text>
                    <Text style={styles.titleLeft}>公司电话：<Text style={[styles.titleRight,{color:'#319bff'}]} onPress={this.toPhone}> 0797-2190888</Text></Text>
                    <Text style={styles.titleLeft}>邮政编码：<Text style={styles.titleRight}> 341000</Text></Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.titleText}>客服服务</Text>
                    <Text style={styles.titleLeft}>客服电话：<Text style={[styles.titleRight,{color:'#319bff'}]} onPress={this.toPhone1}> 400-606-2079</Text></Text>
                    <Text style={styles.titleLeft}>客服邮件：<Text style={styles.titleRight}> fuying.zhang@pujinziben.com</Text></Text>
                    <Text style={styles.titleLeft}>服务时间：<Text style={styles.titleRight}> 周一至周六08:30-17:30</Text></Text>
                </View>
                <View style={[styles.itemView,{height: 205/oPx}]}>
                    <Text style={styles.titleText}>商务合作</Text>
                    <Text style={styles.titleLeft}>E-mail：<Text style={styles.titleRight}> ling.gu@pujinziben.com</Text></Text>
                    <Text style={styles.titleLeft}>联系人：<Text style={styles.titleRight}> 古先生</Text></Text>
                </View>
                <View style={[styles.itemView,{height: 300/oPx}]}>
                    <Text style={styles.titleText}>关注我们</Text>
                    {/*<Image source={require('../../images/find/aboutUs/ewm.png')} style={styles.img} />*/}
                    <View style={styles.wxwoView}>
                        <Text style={styles.itemText}><Text style={styles.titleLeft}>微信公众号：</Text> pujinziben</Text>
                        <Text style={styles.itemText}><Text style={styles.titleLeft}>微博公众号：</Text> http://weibo.com/pujinziben</Text>
                    </View>
                </View>
            </ScrollView>
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
      mapView: {
        marginTop: 20/oPx,
        marginLeft: 20/oPx,
        marginRight: 20/oPx,
        marginBottom: 20/oPx,
        height: 360/oPx,
        width: StyleConfig.screen_width-40/oPx,
      },
      itemView: {
        marginBottom: 20/oPx,
        height: 260/oPx,
        width: StyleConfig.screen_width,
        backgroundColor: '#fff',
      },
      titleText: {
        marginTop: 20/oPx,
        marginLeft: 30/oPx,
        width: StyleConfig.screen_width,
        color: '#333',
        fontSize: 36/oPx,
      },
      wxwoView: {
        flex:1,
      },
      itemText: {
        fontSize:28/oPx,
        marginTop:20/oPx,
        marginLeft: 30/oPx,
        color: '#333',
      },
      titleLeft: {
        marginTop: 20/oPx,
        marginLeft: 30/oPx,
        color: '#999',
        fontSize: 28/oPx,
      },
      titleRight: {
        marginTop: 20/oPx,
        color: '#333',
        fontSize: 28/oPx,
      },
      img: {
        width: 213/oPx,
        height: 99/oPx,
        marginTop: 30/oPx,
        marginLeft: 30/oPx,
      },

  });
