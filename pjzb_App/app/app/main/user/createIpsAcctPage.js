/**
 * Created by zlx on 2017/02/16.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
export default class CreateIpsAcctPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            _realName:'',
            idCard:'',
            _email:'',
            _mobilephone:'',
            onClick:null,
            timerCount:'',
            timerTitle:'',
            showDialog:false,
            iseditable:true,
        }
    }

    componentDidMount(){
        this._getData();
    }

    //获取数据
    _getData(flag){
        Request.post('regIpayPersonal.do',{uid:''},(data)=>{

            if(data.error == '0' && data.idNo!=''){
                this.setState({
                    idCard:data.idNo,
                    _realName:data.realName,
                    _email:data.email,
                    _mobilephone:data.mobilePhone,
                    showDialog:false,
                    iseditable:false,
                });
            }

        },(error)=>{
            console.log(error);
        });
    }

    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <View style={[styles.container]}>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>真实姓名</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入身份证号码"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state._realName}
                                   onChangeText = {
                                         (_realName) =>{this.setState({_realName})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>身份证号码</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入身份证号码"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state.idCard}
                                   onChangeText = {
                                         (idCard) =>{this.setState({idCard})}
                               }/>
                    </View>

                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>邮箱</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入邮箱号"
                                   selectTextOnFocus={true}
                                   value = {this.state._email}
                                   onChangeText = {
                                         (_email) =>{this.setState({_email})}
                                }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>手机号码</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入手机号码"
                                   selectTextOnFocus={true}
                                   editable={false}
                                   value = {this.state._mobilephone}
                                   onChangeText = {
                                         (_mobilephone) =>{this.setState({_mobilephone})}
                                }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={[styles.phoneText]}>验证码</Text>

                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx,width:300/StyleConfig.oPx,}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入短信验证码"
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
                            text={'注册'}
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
    /**布局内容*/
    container: {
        marginTop:20/StyleConfig.oPx,
        paddingLeft:30/StyleConfig.oPx,
        paddingRight:30/StyleConfig.oPx,
        height:StyleConfig.screen_height,
        width:StyleConfig.screen_width,
        backgroundColor:'#FFFFFF'
    },
    messageContainer:{
        flexDirection: 'row',
        height:120/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderBottomWidth:1,
        borderColor:'#cccccc'
    },
    phoneText:{
        marginTop:56/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:158/StyleConfig.oPx
    },
    textStyle:{
        marginTop:60/StyleConfig.oPx,
        color:'#5aafff',
        paddingLeft:36/StyleConfig.oPx,
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
