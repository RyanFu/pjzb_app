/**
 * 	app版本更新提示组件 zlx 2017-9-12
 */

 import React,{Component} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   Linking,
   TouchableOpacity,
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
   	let versionName = 'V' + this.props.vMap.versionName;
       return 	<View style={styles.topView}>
       				<View style={styles.loadingDialog}></View>
			    	<View style={styles.versionView}>
   						<Image style={styles.versionBg} source={require('../images/index/icon_version_bg.png')}>
   							<View style={{marginTop: 163/oPx, marginBottom: 27/oPx}}>
								<Buttom width={119/oPx} height={43/oPx} 
									imgSource={require('../images/index/icon_btnVersion.png')} 
									text={versionName}
								/>
							</View>

							<ScrollView style={styles.scrollView}>
	   							<Text style={{fontSize: 24/oPx, color: '#999'}}>
	   								{this.props.vMap.descript}
	   							</Text>
   							</ScrollView>
							{ // 是否必须更新，如果是则把拒绝按钮去掉
								this.props.vMap.isUpdate === 1
								?
								<View style={styles.btnView}>
									<View style={[styles.btnRightView, {alignItems: 'center'}]}>
	   									<TouchableOpacity onPress={() => {Linking.openURL(this.props.vMap.downloadPath);}}>
	   										<Image style={styles.versionBtnImg} source={require('../images/index/icon_versionBtn_1.png')}/>
	   									</TouchableOpacity>
									</View>
								</View>
								:
								<View style={styles.btnView}>
									<View style={styles.btnLeftView}>
										<TouchableOpacity onPress={this.props.onPress}>
	   										<Image style={styles.versionBtnImg} source={require('../images/index/icon_versionBtn_2.png')}/>
	   									</TouchableOpacity>
									</View>
	   								<View style={styles.btnRightView}>
	   									<TouchableOpacity onPress={() => {Linking.openURL(this.props.vMap.downloadPath);}}>
	   										<Image style={styles.versionBtnImg} source={require('../images/index/icon_versionBtn_1.png')}/>
	   									</TouchableOpacity>
									</View>
								</View>
							}
   						</Image>
   					</View>
			    </View>;
   }
  render(){
  	if (this.props.isShowVersion) {
		return (
			this.renderElm()
	    )
  	} else {
  		return null;
  	}
    
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
		marginLeft: 75/oPx, 
		marginRight: 75/oPx, 
		marginTop: 30/oPx,
		marginBottom: 30/oPx,
		paddingLeft: 15/oPx,
		paddingRight: 15/oPx,
	},
	btnView: {
		paddingLeft: 89/oPx, 
		paddingRight: 89/oPx, 
		flexDirection: 'row',
		marginBottom: 30/oPx,
	},
	versionBtnImg: {
		width: 214/oPx,
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
