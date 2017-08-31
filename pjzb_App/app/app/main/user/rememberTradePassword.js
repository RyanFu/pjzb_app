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
import NavigationBar from '../../components/NavigationBar';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import { goBack } from '../../utils/NavigatorBack';
import TradePasswordNext3 from './successPage';
import {toastShort} from '../../utils/Toast';

export default class RememberLoginPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            oldpassword:'',
            newpassword:'',
            confirmPassword:'',
            showDialog:false,
        }
    }
    //隐藏
    hide=(val) =>{
        this.setState({
            show: false
        });
    }
    onPressConfirm=() =>{
        if(this.state.oldpassword == ''){
            toastShort('原始密码不能为空',-300);
            return;
        }
        if(this.state.newpassword == ''){
            toastShort('新密码不能为空',-300);
            return;
        }
        if(this.state.confirmPassword == ''){
            toastShort('确认密码不能为空',-300);
            return;
        }
        if(this.state.newpassword != this.state.confirmPassword){
            toastShort('新密码与确认密码输入不一致',-300);
            return;
        }
        if (this.state.newpassword.length < 6) {
            toastShort('密码长度必须为6-20个字符',-300);
            return;
        }
        let params = {
            'oldPassword':this.state.oldpassword,
            'newPassword':this.state.newpassword,
            'confirmPassword':this.state.confirmPassword,
            'type':'dealpwd',
            'uid': '',
        };
        this.setState({showDialog:true});
        Request.post('changeLoginPassword.do',params,(data)=>{
            this.setState({showDialog: false});
            if (data == 1) {
                toastShort('两次密码输入不一致',-300);
            } else if (data == 2) {
                toastShort('旧密码错误',-300);
            } else if (data == 3) {
                toastShort('新密码修改失败',-300);
            } else if (data == 4) {
                toastShort('密码长度输入错误,密码长度范围为6-20',-300);
            } else if (data == 5) {
                toastShort('*修改失败！你的账号出现异常，请速与管理员联系！',-300);
            } else if (data == 6) {
                toastShort('登录密码不能和交易密码一样',-300);
            } else if (data == 7) {
                toastShort('交易密码不能和登录密码一样',-300);
            } else if (data == 8) {
                toastShort('修改交易密码异常，请联系客服解决',-300);
            } else {
                this.props.navigator.push({component:TradePasswordNext3,name:'TradePasswordNext3',params:{
                    retNum:1,
                    successText:'修改交易密码成功',
                }});
            }
        },(error)=>{
            console.log(error);
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <NavigationBar title="重置交易密码" leftShowIcon={true} leftBtnFunc={this._goBack.bind(this)}  />
                <View style={[styles.container]}>
                    <View style={[styles.phoneContainer]}>
                        <TextInput style = {[styles.inputs,{marginTop:100/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "原始密码"
                                   selectTextOnFocus={true}
                                   value = {this.state.oldpassword}
                                   secureTextEntry ={true}
                                   onChangeText = {
                                        (oldpassword) =>{this.setState({oldpassword})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "新密码"
                                   selectTextOnFocus={true}
                                   value = {this.state.newpassword}
                                   secureTextEntry ={true}
                                   onChangeText = {
                                         (newpassword) =>{this.setState({newpassword})}
                               }/>
                    </View>

                    <View style={[styles.messageContainer]}>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "确认密码"
                                   selectTextOnFocus={true}
                                   value = {this.state.confirmPassword}
                                   secureTextEntry ={true}
                                   onChangeText = {
                                         (confirmPassword) =>{this.setState({confirmPassword})}
                                }/>
                    </View>
                    <View style={[styles.btnContainer]}>
                        <Button
                            text={'确认'}
                            textColor={'#fff'}
                            onPress={this.onPressConfirm}
                            imgSource={require('../../images/other/password_btn.png')}
                            height={104/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                </View>
                <Loading show={this.state.showDialog} top={true}/>
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
        height:180/StyleConfig.oPx,
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
        paddingLeft:2/StyleConfig.oPx,
        width:470/StyleConfig.oPx,
        fontSize:15,
    },
    btnContainer:{
        height:148/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:60/StyleConfig.oPx,
    }
});