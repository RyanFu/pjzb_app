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
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import ChangeBindingMobile2 from './changeBindingMobile2';
import {toastShort} from '../../utils/Toast';

export default class ChangeBindingMobile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showPhone:'',
            cellPhone:'',
            message:'',
            timerCount:'',
            timerTitle:'获取验证码',
            onClick:this.getCode,
            isClick: false,
        }
    }
    componentWillMount () {
        //ajax
        this.setState({
            showPhone:this.props.showPhone,
            cellPhone:this.props.mobilePhone
        });
    }
    //隐藏
    hide=(val) =>{
        this.setState({
            show: false
        });
    }
    getCode =() =>{
        if (this.state.cellPhone=='') {
            toastShort('请输入手机号',-300);
            return;
        };

        var codeTime = 60;
        this.setState({
            onClick: null,
            timerCount:codeTime,
            timerTitle:'请留意短信',
            isGetCode: true,
            isClick: false,
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
                        codeTime = 60;
                    } else {
                        if (!this.state.isClick) {
                            this.setState({
                                timerCount:codeTime,
                                timerTitle:'请留意短信'
                            })
                        } else {
                            codeTime = 60;
                        }
                    }
                },1000);
            }else{
                this.setState({
                timerCount:'',
                timerTitle:'获取验证码',
                onClick: this.getCode,
                })
                toastShort(data.msg,-300);
            }
        },(error)=>{
            this.setState({
                timerCount:'',
                timerTitle:'获取验证码',
                onClick: this.getCode,
            })
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
                this.setState({
                    isClick: true,
                    timerCount:0,
                    timerTitle:'获取验证码',
                    onClick: this.getCode,
                })
                codeTime = 60;
                this.props.navigator.push({component:ChangeBindingMobile2,name:'ChangeBindingMobile2'});
            }else{
                toastShort(data.msg,-300);
            }
        },(error)=>{
            console.log(error);
        });
    }

    //返回
    _goBack(){
        this.setState({
            isClick: true,
        });
        goBack(this.props.navigator);
    }

    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <NavigationBar
                    title="更换绑定手机"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <View style={[styles.container]}>
                    <View style={[styles.phoneContainer]}>
                        <Text style={styles.phoneText}>原手机号</Text>
                        <Text style = {[styles.inputs,{paddingTop:100/StyleConfig.oPx}]}>{this.state.showPhone}</Text>
                    </View>

                    <View style={[styles.messageContainer]}>
                        <Text style={[styles.messageImg]}>验证码</Text>

                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx,width:300/StyleConfig.oPx,}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "输入短信验证码"
                                   value = {this.state.message}
                                   keyboardType="numeric"
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
    phoneText:{
        marginTop:100/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:158/StyleConfig.oPx
    },
    messageImg:{
        marginTop:60/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:158/StyleConfig.oPx
    },
    inputs: {
        paddingLeft:12/StyleConfig.oPx,
        width:430/StyleConfig.oPx,
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