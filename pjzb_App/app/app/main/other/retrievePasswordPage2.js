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
import RetrievePasswordPage from './retrievePasswordPage';
import RetrievePasswordPage3 from './retrievePasswordPage3';
import {toastShort} from '../../utils/Toast';

export default class ChangeBindingMobile1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            mobilePhone: '',
            pwdOne:'',
            pwdTwo:'',
            randomCode:'',
            timerCount:'',
            timerTitle:'获取验证码',
            onNextClick: this.onPressNext,
        }
    }
    //隐藏
    hide=(val) =>{
        this.setState({
            show: false
        });
    }

    componentWillMount () {
        //ajax
        this.setState({mobilePhone:this.props.mobilePhone});
    }

    onPressNext=() =>{
        if (this.state.pwdOne=='') {
            toastShort('新密码不能为空',-300);
            return;
        };
        if (this.state.pwdTwo=='') {
            toastShort('确认新密码不能为空',-300);
            return;
        };
        if (this.state.pwdTwo!=this.state.pwdOne) {
            toastShort('两次密码输入不一致',-300);
            return;
        };

        this.setState({
            onNextClick: null,
        });

        let params = {mobilePhone:this.state.mobilePhone,passwd:this.state.pwdOne,confirmpassword:this.state.pwdTwo};

        Request.post('findUserLoginPasswd.do',params,(data)=>{
            if(data.error =='0'){
                this.props.navigator.push({component:RetrievePasswordPage3,name:'RetrievePasswordPage3'});
            }else{
                Alert.alert('提示',data.msg);
            }

            this.setState({
                onNextClick: this.onPressNext,
            })
        },(error)=>{
            this.setState({
                onNextClick: this.onPressNext,
            })
            console.log(error);
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
        this.props.navigator.replace({component:RetrievePasswordPage,name:'RetrievePasswordPage'});//返回上一个页面后替换指定页面，等于重新刷新上一个页面。
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
						<TextInput style = {[styles.inputs,{paddingTop:100/StyleConfig.oPx}]}
								   underlineColorAndroid = "transparent"
								   placeholder= "输入新密码"
								   value = {this.state.pwdOne}
                                   selectTextOnFocus={true}
                                   secureTextEntry ={true}
								   onChangeText = {
                               (pwdOne) =>{this.setState({pwdOne})}
                           }/>
					</View>

					<View style={[styles.messageContainer]}>
						<TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
								   underlineColorAndroid = "transparent"
								   placeholder= "确认新密码"
								   value = {this.state.pwdTwo}
                                   selectTextOnFocus={true}
                                   secureTextEntry ={true}
								   onChangeText = {
                                   (pwdTwo) =>{this.setState({pwdTwo})}
                               }
						/>
					</View>

					<View style={[styles.btnContainer]}>
						<Button
							text={'确认'}
							textColor={'#fff'}
							onPress={this.state.onNextClick}
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
    inputs: {
        paddingLeft:12/StyleConfig.oPx,
        width:430/StyleConfig.oPx,
        fontSize:15,
    },
    btnContainer:{
        height:148/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:60/StyleConfig.oPx,
    },

});