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
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import OwebView from '../../components/OwebView';
import { goBack } from '../../utils/NavigatorBack';
import {toastShort} from '../../utils/Toast';

export default class RegIpayEnterprise extends Component {
    constructor(props){
        super(props);
        this.state = {
            registName:'',
            registPhone:'',
            regist_idCard:'',
            registEmail:'',
            idCard_fr:'',
            registName_fr:'',
            companyTel:'',
            license_Num:'',
            registName_qy:'',
            registMoney:'',

            recivePhone:'',
            randomCode:'',
            message:'',
            timerCount:'',
            timerTitle:'获取验证码',
            showDialog:false,
            iseditable:true,
            onClick:this.getCode,
        }
    };

    //控件加载完成
    componentDidMount(){
        this.checkUserinfo();
    };

    //检查企业信息是否填写完整
    checkUserinfo(){
        Request.post('regIpayEnterprisesApp.do',{uid:''},(data)=>{
            if(data.error == '0'){
                this._getData();
            } else {
                Alert.alert(
                    '提示',
                    data.msg,
                    [{text: '确认', onPress: () => goBack(this.props.navigator)},]
                );
            }

        },(error)=>{
            console.log(error);
        });
    }

    //获取数据
    _getData(){
        this.setState({showDialog:true});
        Request.post('regIpayEnterpriseAppInit.do',{uid:''},(data)=>{

            if(data.error == '0' && data.idNo!=''){
                this.setState({
                    regist_idCard:data.idNo,
                    registName:data.realName,
                    registEmail:data.email,
                    registPhone:data.mobilePhone,
                    idCard_fr:data.legalIdNo,
                    registName_fr:data.legalName,
                    companyTel:data.companyPhone,
                    license_Num:data.busiCode,
                    registName_qy:data.companyName,
                    registMoney:data.registeredCap,

                    showDialog:false,
                    iseditable:false,
                });
            } else if(data.error == '0'){
                this.setState({
                    regist_idCard:data.idNo,
                    registName:data.realName,
                    registEmail:data.email,
                    registPhone:data.mobilePhone,
                    idCard_fr:data.legalIdNo,
                    registName_fr:data.legalName,
                    companyTel:data.companyPhone,
                    license_Num:data.busiCode,
                    registName_qy:data.companyName,
                    registMoney:data.registeredCap,

                    showDialog:false,
                });
            } else {
                Alert.alert('提示',data.msg);
            }

        },(error)=>{
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    };

    /** 获取短信验证码*/
    getCode =() =>{
        if (this.state.registPhone=='') {
            toastShort('请输入手机号',-300);
            return;
        };

        var codeTime = 60;
        this.setState({
            onClick: null,
        });

        //ajax
        let params = {'cellPhone':this.state.registPhone,'smsType':'resetPwd'};
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
            console.log(error);
        });
    }

    /** 注册汇付企业账户*/
    onPressConfirm =() =>{
        if(this.state.registEmail==''){
            toastShort('请输入邮箱',-300);
            return;
        };
        if(this.state.registPhone==''){
            toastShort('请输入电话',-300);
            return;
        };
        if(this.state.message==''){
            toastShort('请输入短信验证码',-300);
            return;
        };
        if(this.state.regist_idCard==''){
            toastShort('请输入注册人身份证',-300);
            return;
        };
        if(this.state.registName==''){
            toastShort('请输入注册人姓名',-300);
            return;
        };
        if(this.state.idCard_fr==''){
            toastShort('请输入法人身份证',-300);
            return;
        };
        if(this.state.registName_fr==''){
            toastShort('请输入法人姓名',-300);
            return;
        };
        if(this.state.registName_qy==''){
            toastShort('请输入企业名称',-300);
            return;
        };
        if(this.state.license_Num==''){
            toastShort('请输入营业执照号',-300);
            return;
        };
        if(this.state.companyTel==''){
            toastShort('请输入公司电话',-300);
            return;
        };
        if(this.state.registMoney==''){
            toastShort('请输入注册资金',-300);
            return;
        };
        if(this.state.randomCode==''){
            toastShort('请获取短信验证码',-300);
            return;
        };
        //调用汇付时，显示加载状态
        let params = {uid:'',pageType:'reactAPP',
            email:this.state.registEmail,
            phone:this.state.registPhone,
            msgCode:this.state.message,
            idCard:this.state.regist_idCard,
            name:this.state.registName,
            idCard_fr:this.state.idCard_fr,
            name_fr:this.state.registName_fr,
            name_qy:this.state.registName_qy,
            license_Num:this.state.license_Num,
            registMoney:this.state.registMoney,
            companyTel:this.state.companyTel,
            randomCode:this.state.randomCode,
            recivePhone:this.state.recivePhone};

        this.setState({showDialog:true});
        Request.post('corpRegisterApp.do',params,(data)=>{

                if(data.error == '0'){
                    this.props.navigator.push({
                        component: OwebView,
                        name: 'OwebView',
                        params: {
                            url: data.html,
                            title:'注册汇付企业账户',
                            back:{true},
                        }
                    });
                    // this.props.navigator.push({component:OwebView,name:'OwebView',params:{uri:data.html,title:'注册汇付企业账户'}});
                }else{
                    alert(data.msg);
                }
                this.setState({showDialog:false});
            },(error)=>{
                this.setState({showDialog:false});
                console.log(error);
            });
    }
    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <ScrollView style={[styles.container]}>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>邮箱</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入邮箱号"
                                   selectTextOnFocus={true}
                                   value = {this.state.registEmail}
                                   onChangeText = {
                                         (registEmail) =>{this.setState({registEmail})}
                                }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>手机号码</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入手机号码"
                                   selectTextOnFocus={true}
                                   editable={false}
                                   value = {this.state.registPhone}
                                   onChangeText = {
                                         (registPhone) =>{this.setState({registPhone})}
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

                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>注册人姓名</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入注册人姓名"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state.registName}
                                   onChangeText = {
                                         (registName) =>{this.setState({registName})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>注册人身份证</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入注册人身份证"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state.regist_idCard}
                                   onChangeText = {
                                         (regist_idCard) =>{this.setState({regist_idCard})}
                               }/>
                    </View>

                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>法人姓名</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入法人姓名"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state.registName_fr}
                                   onChangeText = {
                                         (registName_fr) =>{this.setState({registName_fr})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>法人身份证</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入法人身份证"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state.idCard_fr}
                                   onChangeText = {
                                         (idCard_fr) =>{this.setState({idCard_fr})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>企业名称</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入企业名称"
                                   editable={false}
                                   selectTextOnFocus={true}
                                   value = {this.state.registName_qy}
                                   onChangeText = {
                                         (registName_qy) =>{this.setState({registName_qy})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>注册资金</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入注册资金"
                                   editable={false}
                                   selectTextOnFocus={true}
                                   value = {this.state.registMoney}
                                   onChangeText = {
                                         (registMoney) =>{this.setState({registMoney})}
                               }/>
                    </View>

                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>营业执照号</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入营业执照号"
                                   editable={false}
                                   selectTextOnFocus={true}
                                   value = {this.state.license_Num}
                                   onChangeText = {
                                         (license_Num) =>{this.setState({license_Num})}
                               }/>
                    </View>
                    <View style={[styles.messageContainer]}>
                        <Text style={styles.phoneText}>公司电话</Text>
                        <TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入公司电话"
                                   editable={false}
                                   selectTextOnFocus={true}
                                   value = {this.state.companyTel}
                                   onChangeText = {
                                         (companyTel) =>{this.setState({companyTel})}
                               }/>
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
                </ScrollView>
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
        width:180/StyleConfig.oPx
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
    verticalLine:{
        marginTop:60/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:3/StyleConfig.oPx,
        backgroundColor:'#cccccc'
    },
    btnContainer:{
        height:148/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:60/StyleConfig.oPx,
    }
});
