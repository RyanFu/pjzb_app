/**
 * 	领取红包组件 zlx 2018-2-8
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
   Animated,
   Easing,
 } from 'react-native';
 import {StyleConfig} from '../style/index';
 import Buttom from '../components/Button';
 const oPx = StyleConfig.oPx;

export default class RedEnvelope extends Component{
  	constructor(props) {
	    super(props);
	    this.state = {
	      viewMarginTop: null,
	      bgImg: require('../images/redEnvelope/icon-bg-1.png'),
	      // 是否是领取
	      isReceive: false,
	      spin: null,
	      isShowAnimated: false,
    	};

    	this.spinValue = new Animated.Value(0);
  	}

  	spin = () => {
  		// 设置图片从0到1输入过程，角度偏移
  		const spin = this.spinValue.interpolate({
			inputRange: [
				0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 
				0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1
			],
			outputRange: [
				'0deg', '2deg', '-2deg', '3deg', '-3deg', '5deg', '-5deg', '6deg', '-6deg', '6deg',
				'-3deg', '3deg', '-3deg', '2deg', '-2deg', '1deg', '-1deg', '0deg', '0deg', '0deg'
			],
		});
		this.setState({spin:spin});

  		this.spinValue.setValue(0);
  		Animated.timing(
  			this.spinValue,
  			{
  				toValue: 1,
  				duration: 1500,
  				easing: Easing.linear,
  			},
		).start(() => {
			// 动画执行完后执行方法
			this.setState({
				viewMarginTop: {marginTop: -44/oPx},
				bgImg: require('../images/redEnvelope/icon-bg-2.png'),
				isReceive: true,
			});
		});
  	}

  	_onPress = () => {
  		this.setState({isShowAnimated: true});
  		this.spin();
  	}

  	_goPage = () => {
  		this.props._goCouponCard();
  		this._cancel();
  	}

  	_cancel = () => {
  		this.props.onPress();
  	}

  	_getImage = () => {
  		if (this.state.isShowAnimated) {
  			return 	<Animated.Image style={[styles.versionBg, {transform: [{rotate: this.state.spin}]}]} source={this.state.bgImg}>
						<View style={styles.view_content_top}>
							<Text style={styles.text_content_top}>恭喜您获得普金资本</Text>
							<Text style={[styles.text_content_top, {marginTop: 16/oPx}]}>送出的开工大吉红包</Text>
						</View>
						<View style={styles.view_content_bottom}>
			    			<Image style={styles.icon_ok} source={require('../images/redEnvelope/icon-okBtn.png')}>
			    				<Text style={styles.text_content_bottom}>点击</Text>
			    				<Text style={styles.text_content_bottom}>领取</Text>
			    			</Image>
						</View>
					</Animated.Image>
  		} else {
  			return 	<Image style={styles.versionBg} source={this.state.bgImg}>
						<View style={styles.view_content_top}>
							<Text style={styles.text_content_top}>恭喜您获得普金资本</Text>
							<Text style={[styles.text_content_top, {marginTop: 16/oPx}]}>送出的开工大吉红包</Text>
						</View>
						<View style={styles.view_content_bottom}>
							<TouchableOpacity onPress={this._onPress}>
				    			<Image style={styles.icon_ok} source={require('../images/redEnvelope/icon-okBtn.png')}>
				    				<Text style={styles.text_content_bottom}>点击</Text>
				    				<Text style={styles.text_content_bottom}>领取</Text>
				    			</Image>
				    		</TouchableOpacity>
						</View>
					</Image>
  		}
  	}

   renderElm(){
		var redEnvelopeMap = this.props.redEnvelopeMap;

       	return 	<View style={styles.topView}>
       				<View style={styles.loadingDialog}></View>
			    	<View style={[styles.versionView, this.state.viewMarginTop]}>
			    		{
			    			!this.state.viewMarginTop ? null :
			    			<TouchableOpacity style={styles.icon_cancel_view} onPress={this._cancel}>
				    			<Image style={styles.icon_cancel} source={require('../images/redEnvelope/icon-cancel.png')}></Image>
				    		</TouchableOpacity>
			    		}
			    		{
			    			!this.state.isReceive ? this._getImage() :
	   						<Image style={styles.versionBg} source={this.state.bgImg}>
	   							<View style={styles.view_content_top}>
									<Text style={styles.text_content_top}>恭喜您获得普金资本</Text>
									<Text style={[styles.text_content_top, {marginTop: 16/oPx}]}>开工大吉红包{redEnvelopeMap}元</Text>
	   							</View>
	   							<View style={styles.view_content_bottom}>
	   								<TouchableOpacity onPress={this._goPage}>
						    			<Image style={styles.icon_ok} source={require('../images/redEnvelope/icon-okBtn.png')}>
						    				<Text style={styles.text_content_bottom}>立即</Text>
						    				<Text style={styles.text_content_bottom}>使用</Text>
						    			</Image>
						    		</TouchableOpacity>
	   							</View>
	   						</Image>
			    		}
   						
   					</View>
			    </View>;
   }
  render(){
  	if (this.props.isShowRedEnvelope) {
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
		zIndex: -2,
	},
	versionView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
	versionBg: {
		height: 608/oPx,
		width: 613/oPx,
		alignItems: 'center',
		zIndex: 10,
	},
	icon_cancel_view: {
		zIndex: 10,
		alignSelf: 'flex-end',
		marginRight: 90/oPx,
	},
	icon_cancel: {
		height: 44/oPx,
		width: 44/oPx,
	},
	view_content_top: {
		marginTop: 177/oPx,
		width: 308/oPx,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
		paddingLeft: 6/oPx,
		paddingRight: 6/oPx,
	},
	text_content_top: {
		color: '#fff',
		fontSize: 30/oPx,
	},
	view_content_bottom: {
		marginTop: 80/oPx,
		width: 308/oPx,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	icon_ok: {
		height: 178/oPx,
		width: 178/oPx,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	text_content_bottom: {
		color: '#e5051a',
		fontSize: 40/oPx,
	},
	
})
