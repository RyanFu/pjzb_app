/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  PixelRatio,
  View,
  Image,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {StyleConfig} from '../../style/index';
import NavigationBar from '../../components/NavigationBar';
import HelpCenter from './helpCenter';
import AboutUs from './aboutUs';
import ProIntroduction from './proIntroduction';
import MTBDIntroduction2 from './MTBDIntroduction2';
import Recruitment from './recruitment';
import Announcement from './announcement';
import ContactUs from './contactUs';
import InvestFriendDetail from '../user/InvestFriendDetail';
import Login from '../other/login';

export default class FindPage extends Component {
	onPressIcon(icon){
		if(icon == 'company_dynamic'){
			// 关于我们
            this.props.navigator.push({component:AboutUs,name:'AboutUs'});
		}else if(icon == 'product_introduce'){
		    // 产品介绍
            this.props.navigator.push({component:ProIntroduction,name:'ProIntroduction'});
		}else if(icon == 'media_reports'){
		    // 媒体报道
            this.props.navigator.push({component:MTBDIntroduction2,name:'MTBDIntroduction2'});
		}else if(icon == 'latest_announcement'){
		    // 平台公告
            this.props.navigator.push({component:Announcement,name:'Announcement'});
		}else if(icon == 'help_center'){
		    // 帮助中心
            this.props.navigator.push({component:HelpCenter,name:'HelpCenter'});
		}else if(icon == 'recruiting'){
		    // 招贤纳士
            this.props.navigator.push({component:Recruitment,name:'Recruitment'});
		}else if(icon == 'contact_us'){
		    // 联系我们
            this.props.navigator.push({component:ContactUs,name:'ContactUs'});
		}else{
            let data = global.USER;
            if(data){
                this.props.navigator.push({component:InvestFriendDetail,name:'InvestFriendDetail'});
            }else{
                Alert.alert(
                    '提示信息',
                    '您还未登录，请先登录！',
                    [
                        {text: '取消' },
                        {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
                    ]
                )
            }
			/**
            Alert.alert(
                '提示信息',
                '是否拨打 400 606 2079 客服电话',
                [
                    {text: '取消' },
                    {text: '拨打', onPress: () => {Linking.openURL('tel: 4006062079');}},
                ]
			);*/
		}
	}


  render() {
    return (
		<View style={[styles.flex, styles.body]}>
		  <NavigationBar
			title={"发现"}
		  />
		  <ScrollView>
		  <View style={[styles.container]}>
			<View style={[styles.companyDynamicLeft,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'company_dynamic')}>
					<Image source={require('../../images/find/find_company_dynamic.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
                <Text style={styles.font}>关于我们</Text>
			</View>
			<View style={[styles.companyDynamicRight,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'product_introduce')}>
					<Image source={require('../../images/find/find_product_introduce.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
				<Text style={styles.font}>产品介绍</Text>
			</View>
		  </View>
		  <View style={[styles.lineHeight]}/>

		  <View style={[styles.container]}>
			<View style={[styles.companyDynamicLeft,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'media_reports')}>
					<Image source={require('../../images/find/find_media_reports.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
                <Text style={styles.font}>媒体报道</Text>
			</View>
			<View style={[styles.companyDynamicRight,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'latest_announcement')}>
					<Image source={require('../../images/find/find_latest_announcement.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
				<Text style={styles.font}>最新公告</Text>
			</View>
		  </View>
		  <View style={[styles.lineHeight]}/>

		  <View style={[styles.container]}>
			<View style={[styles.companyDynamicLeft,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'help_center')}>
					<Image source={require('../../images/find/find_help_center.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
                <Text style={styles.font}>帮助中心</Text>
			</View>
			<View style={[styles.companyDynamicRight,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'recruiting')}>
					<Image source={require('../../images/find/find_recruiting.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
				<Text style={styles.font}>招贤纳士</Text>
			</View>
		  </View>
		  <View style={[styles.lineHeight]}/>

		  <View style={[styles.container]}>
			<View style={[styles.companyDynamicLeft,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'contact_us')}>
					<Image source={require('../../images/find/find_contact_us.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
                <Text style={styles.font}>联系我们</Text>
			</View>
			<View style={[styles.companyDynamicRight,styles.center]}>
				<TouchableOpacity onPress={this.onPressIcon.bind(this,'contact_customer')}>
					<Image source={require('../../images/find/find_invitation_polite.png')}
						style={styles.img}>
					</Image>
				</TouchableOpacity>
				<Text style={styles.font}>邀请有礼</Text>
			</View>
		  </View>
		  </ScrollView>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
    body:{
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        backgroundColor:'#E9ECF3'
    },
    flex: {
        flex: 1  //平分填满父空间。
    },
  /**公司动态布局*/
  container: {
	height:276/StyleConfig.oPx,
    width:StyleConfig.screen_width,
	flexDirection: 'row'
  },
  lineHeight:{
	height:2/StyleConfig.oPx,
  },
  companyDynamicLeft: {
    marginRight:2/StyleConfig.oPx,
    height:276/StyleConfig.oPx,
    width:StyleConfig.screen_width/2-1,
    backgroundColor:'#FFFFFF'
  },
  companyDynamicRight: {
    height:276/StyleConfig.oPx,
    width:StyleConfig.screen_width/2-1,
    backgroundColor:'#FFFFFF'
  },
  center: {
	  justifyContent:'center',/**垂直居中，实际上是按照flexDirection的方向居中*/
	  alignItems:'center'    /**水平居中*/
  },
  font:{
      marginTop:8/StyleConfig.oPx,
	  color:'#333333',
	  fontSize:15,
	  fontWeight:'200'
  },
  img:{
      height:120/StyleConfig.oPx,
      width:120/StyleConfig.oPx
  }
});
