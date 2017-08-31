/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Setting from './setting';

export default class SuccessPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            retNum: 1,
            successText:'',
        }
    }

    componentDidMount() {
        this.setState({
            cellPhone:this.props.cellPhone,
            retNum:this.props.retNum,
            refresh:this.props.refresh,
			successText:this.props.successText
        });
    }

    goBack(){
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[this.state.retNum]);
        if(this.state.refresh){
            this.props.navigator.replace({component:Setting,name:'Setting'});
		}
    }

	render(){
		return (
		<View style={[styles.flex, styles.body]}>
		  <View style={[styles.container]}>
			<View style={[styles.successImageContainer]}>
			  <Image style={[styles.successImage]} source={require('../../images/other/password_confirm_success.png')}/>
			</View>
			<View style={[styles.textContainer]}>
				<Text style = {[styles.textFont]} numberOfLines={2}>{this.state.successText}</Text>
			</View>
			<View style={[styles.btnContainer]}>
			    <Button
				  text={'完成'}
				  textColor={'#fff'}
				  onPress={this.goBack.bind(this)}
				  imgSource={require('../../images/other/password_btn.png')}
				  height={88/StyleConfig.oPx}
				  width={716/StyleConfig.oPx}
				/>
			</View>
		  </View>
	    </View>
		);
	}
};

const styles = StyleSheet.create({
  body:{
	width:StyleConfig.screen_width,
	height:StyleConfig.screen_height,
	backgroundColor:'#FFFFFF'
  },
  flex: {
	flex: 1  //平分填满父空间。
  },
  /**布局内容*/
  container: {
	marginLeft:30/StyleConfig.oPx,
	marginRight:30/StyleConfig.oPx,
	height:448/StyleConfig.oPx,
	width:StyleConfig.screen_width,
  },

    /**成功图标的外部布局*/
  successImageContainer:{
	  flexDirection: 'row',
	  height:210/StyleConfig.oPx,
      width:StyleConfig.screen_width-60/StyleConfig.oPx,
      justifyContent:'center',
  },
	/**成功图标的自身大小布局*/
  successImage:{
      marginTop:70/StyleConfig.oPx,
	  height:130/StyleConfig.oPx,
	  width:130/StyleConfig.oPx,
  },
    /**成功文字的外部布局*/
  textContainer:{
	flexDirection: 'row',
	height:106/StyleConfig.oPx,
	width:StyleConfig.screen_width-60/StyleConfig.oPx,
	justifyContent:'center',
    alignItems:'center',
  },
    /**文字字体*/
  textFont: {
     marginTop:10/StyleConfig.oPx,
	 fontSize:19,
  },
  btnContainer:{
	height:88/StyleConfig.oPx,
	width:StyleConfig.screen_width-60/StyleConfig.oPx,
	marginTop:66/StyleConfig.oPx,
  }
});
