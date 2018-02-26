/**
 * 	列表模型组件 zlx 2018-2-12
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
   Alert,
 } from 'react-native';
 import Request from '../utils/Request';
 import {StyleConfig} from '../style/index';
 import Buttom from '../components/Button';
 const oPx = StyleConfig.oPx;

export default class ListMode extends Component{
  	constructor(props) {
	    super(props);
	    this.state = {

    	};

  	}

  	_getThView = () => {
  		if (this.props._payType == 1) {
  			return 	<View style={styles.view_content_thView}>
			    		<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>银行名称</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>单笔限额(元)</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>每日限额(元)</Text>
						</View>
			    	</View>
  		} else {
			return 	<View style={styles.view_content_thView}>
			    		<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>银行名称</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>单笔限额(元)</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>每日限额(元)</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_thText}>需要满足条件</Text>
						</View>
			    	</View>
  		}
  	}
  	
  	_getTdView = (row, index) => {
  		if (this.props._payType == 1) {
  			return 	<View style={styles.view_content_tdView} key={index}>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText}>{row.openBankName}</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText}>{row.singleTransQuota}</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText}>{row.cardDailyTransQuota}</Text>
						</View>
			    	</View>
  		} else {
			return 	<View style={styles.view_content_tdView} key={index}>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText} numberOfLines={1}>{row.openBankName}</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText} numberOfLines={1}>{row.singleTransQuota}</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText} numberOfLines={1}>{row.cardDailyTransQuota}</Text>
						</View>
						<View style={styles.view_content_thView_item}>
							<Text style={styles.view_content_tdText} numberOfLines={1}>{row.conditions}</Text>
						</View>
			    	</View>
  		}
  	}

   	renderElm(){
       	return 	<View style={styles.topView}>
       				<View style={styles.loadingDialog}></View>
			    	<View style={styles.view_content}>
						<View style={styles.view_content_titleView}>
							<View style={styles.view_content_imageView}>
								
							</View>
							<Text style={styles.view_content_titleText}>{this.props._payType == 1 ? '查看快捷限额' : '查看网银限额'}</Text>
							<View style={styles.view_content_imageView}>
								<TouchableOpacity onPress={this.props._cancel}>
									<Image style={styles.icon_cancel} source={require('../images/icon/icon_cancel.png')}></Image>
								</TouchableOpacity>
							</View>
				    	</View>
				    	{ this._getThView() }

						<ScrollView>
				    	 	{
				    	 		this.props._payDataList.map((row, index) => { 
	                      			return this._getTdView(row, index); 
	                  			})
	              			}
              			</ScrollView>
			    	</View>
			    </View>;
   	}

  	render(){
  		if (this.props.isShowList) {
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
	    alignItems: 'center',
	    justifyContent: 'center',
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
	view_content: {
		backgroundColor: '#fff',
		width: 690/oPx,
		height: 900/oPx,
	},
	view_content_titleView: {
		height: 88/oPx,
	    alignItems: 'center',
	    justifyContent: 'center',
	    flexDirection: 'row',
	},
	view_content_imageView: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 20/oPx,
	},
	view_content_titleText: {
		fontSize: 32/oPx,
		color: '#333',
	},
	view_content_thView: {
		height: 80/oPx,
	    alignItems: 'center',
	    justifyContent: 'center',
		backgroundColor:'#e4e4e4',
	    flexDirection: 'row',
	},
	view_content_thView_item: {
		flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	view_content_thText: {
		fontSize: 26/oPx,
		color: '#333',
	},
	icon_cancel: {
		height: 44/oPx,
		width: 44/oPx,
	},
	view_content_tdView: {
		height: 80/oPx,
	    alignItems: 'center',
	    justifyContent: 'center',
	    flexDirection: 'row',
	},
	view_content_tdText: {
		fontSize: 26/oPx,
		color: '#999',
	},
})
