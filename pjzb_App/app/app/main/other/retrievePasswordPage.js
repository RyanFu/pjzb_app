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
  Alert,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import RetrievePasswordPage2 from './retrievePasswordPage2';
import {toastShort} from '../../utils/Toast';

export default class RetrievePasswordPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cellPhone:'',
            recivePhone:'',
            message:'',
            randomCode:'',
            timerCount:'',
            timerTitle:'获取验证码',
            // 获取验证码方法
            onClick: this.getCode,
        }
    }
    getCode =() =>{
        if (this.state.cellPhone=='') {
            toastShort('请输入手机号',-300);
			return;
		};

        var codeTime = 60;
        this.setState({
            onClick: null,
        });

        //ajax
        let params = {'cellPhone':this.state.cellPhone,'smsType':'resetPwd'};
        Request.post('sendSMS.do',params,(data)=>{
            if(data.error =='0'){
                this.setState({
                    timerCount:codeTime,
                    timerTitle:'请留意短信',
                });
                this.interval=setInterval(() =>{
                    codeTime = this.state.timerCount - 1;
                    if(this.state.timerCount===0){
                        this.interval&&clearInterval(this.interval);
                        this.setState({
                            timerCount:'',
                            timerTitle:'获取验证码',
                            onClick: this.getCode,
                        })
                    } else {
                        this.setState({
                            timerCount:codeTime,
                            timerTitle:'请留意短信'
                        })
                    }
                },1000);
                this.state.recivePhone = data.recivePhone;
                this.state.randomCode = data.randomCode;
            }else{
                this.setState({
                    timerCount:'',
                    timerTitle:'获取验证码',
                    onClick: this.getCode,
                })
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            this.setState({
                timerCount:'',
                timerTitle:'获取验证码',
                onClick: this.getCode,
            })
            alert(error);
            console.log(error);
        });
	}

	onPressNext=() =>{
        if (this.state.cellPhone=='') {
            toastShort('请输入手机号',-300);
            return;
        };
        if (this.state.message=='') {
            toastShort('请输入短信验证码',-300);
            return;
        };
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        let params = {'code':this.state.message,'type':'resetPwd'};
        Request.post('checkMobilePhoneCode.do',params,(data)=>{
            if(data.error =='0'){
                const { navigator } = this.props;
                if(navigator) {
                    this.props.navigator.push({component:RetrievePasswordPage2,name:'RetrievePasswordPage2',params:{mobilePhone:this.state.cellPhone}});
                }

            }else{
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            console.log(error);
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
	}

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

	render(){
		return (
		<View style={[styles.flex, styles.body]}>
            <NavigationBar
                title="找回密码"
                leftShowIcon={true}
                leftBtnFunc={this._goBack.bind(this)}
            />
		  <View style={[styles.container]}>
			<View style={[styles.phoneContainer]}>
				<Image source={require('../../images/other/password_phone.png')}
					style={styles.phoneImg}>
				</Image>
				<TextInput style = {[styles.inputs,{paddingTop:100/StyleConfig.oPx}]}
				   underlineColorAndroid = "transparent"
				   placeholder= "输入注册时使用的手机号码"
				   value = {this.state.cellPhone}
                   onChangeText = {
				       (cellPhone) =>{this.setState({cellPhone})}
				   }/>
			</View>

			<View style={[styles.messageContainer]}>
				<Image source={require('../../images/other/password_message.png')}
					style={styles.messageImg}>
				</Image>

				<TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                   underlineColorAndroid = "transparent"
				   placeholder= "输入短信验证码"
				   value = {this.state.message}
				   onChangeText = {
				       (message) =>{this.setState({message})}
				   }
				  />
				<View style={[styles.verticalLine]}/>
				<TouchableOpacity onPress={this.state.onClick}>
					<Text style={[styles.textStyle]}>{this.state.timerCount} {this.state.timerTitle}</Text>
				</TouchableOpacity>

			</View>

			<View style={[styles.btnContainer]}>
				<Button
				  text={'下一步'}
				  textColor={'#fff'}
				  onPress={this.onPressNext}
				  imgSource={require('../../images/other/password_btn.png')}
				  height={104/StyleConfig.oPx}
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
	width:StyleConfig.screen_width
  },
  phoneContainer:{
	flexDirection: 'row',
	height:178/StyleConfig.oPx,
	width:StyleConfig.screen_width-60/StyleConfig.oPx,
	borderBottomWidth:1,
	borderColor:'#cccccc'
  },
  messageContainer:{
	flexDirection: 'row',
	height:120/StyleConfig.oPx,
	width:StyleConfig.screen_width-60/StyleConfig.oPx,
	borderBottomWidth:1,
	borderColor:'#cccccc'
  },
  phoneImg:{
	marginLeft:10/StyleConfig.oPx,
	marginTop:106/StyleConfig.oPx,
    height:42/StyleConfig.oPx,
    width:28/StyleConfig.oPx
  },
  messageImg:{
	marginTop:60/StyleConfig.oPx,
    height:32/StyleConfig.oPx,
    width:40/StyleConfig.oPx
  },
  inputs: {
	paddingLeft:32/StyleConfig.oPx,
	width:450/StyleConfig.oPx,
	fontSize:15,
  },
  verticalLine:{
	marginTop:60/StyleConfig.oPx,
	height:42/StyleConfig.oPx,
	width:3/StyleConfig.oPx,
	backgroundColor:'#cccccc'
  },
  textStyle:{
	marginTop:60/StyleConfig.oPx,
	color:'#5aafff',
	paddingLeft:26/StyleConfig.oPx,
  },
  btnContainer:{
	height:148/StyleConfig.oPx,
	width:StyleConfig.screen_width-60/StyleConfig.oPx,
  marginTop:60/StyleConfig.oPx,
  },

});

// 输出，这里千万别忘记
module.exports = RetrievePasswordPage;
