/**
 * 
 */

 import React,{Component} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
 } from 'react-native';
 import {StyleConfig} from '../style/index';
 import Buttom from '../components/Button';
 const oPx = StyleConfig.oPx;

export default class VersionUpdate extends Component{
  	constructor(props) {
	    super(props);
	    this.state = {
	      
    	};
  	}

   renderElm(){
       return 	<View style={styles.topView}>
       				<View style={styles.loadingDialog}></View>
			    	<View style={styles.versionView}>
   						<Image style={styles.versionBg} source={require('../images/index/icon_version_bg.png')}>
   							<View style={{marginTop: 163/oPx, marginBottom: 27/oPx}}>
								<Buttom width={118/oPx} height={43/oPx} 
									imgSource={require('../images/index/icon_btnVersion.png')} 
									text='V1.4'
								/>
							</View>

							<ScrollView style={styles.scrollView}>
	   							<Text>
	   								是十分舒服是十分舒服是十分舒服是十分舒服
	   							</Text>
	   							<Text>
	   								是十分舒服是十分舒服是十分舒服是十分舒服
	   							</Text>
	   							<Text>
	   								是十分舒服是十分舒服是十分舒服是十分舒服
	   							</Text>
	   							<Text>
	   								是十分舒服是十分舒服是十分舒服是十分舒服
	   							</Text>
   							</ScrollView>

   							<View style={styles.btnView}>
   								<View style={styles.btnLeftView}>
   									<Image style={styles.versionBtnImg} source={require('../images/index/icon_versionBtn_2.png')}/>
								</View>
   								<View style={styles.btnRightView}>
   									<Image style={styles.versionBtnImg} source={require('../images/index/icon_versionBtn_1.png')}/>
								</View>
   							</View>

   						</Image>
   					</View>
			    </View>;
   }
  render(){
    return (
      this.renderElm()
    )
  }
}

const styles = StyleSheet.create({
	topView: {
		width:StyleConfig.screen_width,
		height: StyleConfig.screen_height,
		position:'absolute',
	    zIndex:99999,
	    left:0,
	    top:0,
	},
	loadingDialog:{
		width:StyleConfig.screen_width,
		height: StyleConfig.screen_height,
		backgroundColor:'#000',
		opacity:0.3,
		position:'absolute',
		top:0,
		left:0,
		zIndex:-2,
	},
	versionView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex:1,
		
	},
	versionBg: {
		height: 628/oPx,
		width: 658/oPx,
		zIndex:10,
	},
	scrollView: {
		paddingLeft: 89/oPx, 
		paddingRight: 89/oPx, 
		marginTop: 30/oPx,
		marginBottom: 30/oPx
	},
	btnView: {
		paddingLeft: 89/oPx, 
		paddingRight: 89/oPx, 
		flexDirection: 'row',
		marginBottom: 30/oPx,
	},
	versionBtnImg: {
		width: 212/oPx,
		height: 66/oPx,
	},
	btnLeftView: {
		flex: 1,

	},
	btnRightView: {
		flex: 1,
		alignItems: 'flex-end',
	},
})
