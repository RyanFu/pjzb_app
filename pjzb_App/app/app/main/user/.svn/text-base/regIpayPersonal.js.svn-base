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
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    LayoutAnimation,
    Alert,
    Keyboard,
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import OwebView from '../../components/OwebView';
import {toastShort} from '../../utils/Toast';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';

export default class RegIpayPersonalPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            _realName:'',
            _mobilephone:'',
            idCard:'',
            _email:'',
            recivePhone:'',
            randomCode:'',
            message:'',
            timerCount:'',
            timerTitle:'获取验证码',
            showDialog:false,
            iseditable:true,
            onClick:this.getCode,
            isClick: false,
            viewHeight: Platform==='ios'?20:25,
            height:StyleConfig.screen_height-StyleConfig.NAV_BAR_HEIGHT-(Platform==='ios'?20:25)-16/StyleConfig.oPx,
        }
    };

    componentWillMount () {
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus);
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlur);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.state.keyboardDidHideListener.remove();
    }

    //控件加载完成
    componentDidMount(){
        this._getData();
    };

    //获取数据
    _getData(flag){
        this.setState({showDialog:true});
        Request.post('regIpayPersonal.do',{uid:''},(data)=>{

            if(data.error == '0' && data.idNo!='' && data.idNo!='null'){
                this.setState({
                    idCard:data.idNo,
                    _realName:data.realName,
                    _mobilephone:data.mobilePhone,
                    showDialog:false,
                    iseditable:false,
                });
            } else if(data.error == '0'){
                this.setState({
                    _mobilephone:data.mobilePhone,
                });
            } else {
                Alert.alert('提示',data.msg);
            }
            this.setState({
                showDialog:false,
            });
        },(error)=>{
            this.setState({
                showDialog:false,
            });
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
            console.log(error);
        });
    };

    /** 获取短信验证码*/
    getCode =() =>{
        if (this.state._mobilephone=='') {
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
        let params = {'cellPhone':this.state._mobilephone,'smsType':'resetPwd'};
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
                this.state.recivePhone = data.recivePhone;
                this.state.randomCode = data.randomCode;
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

    /** 注册汇付个人账户*/
    onPressConfirm =() =>{
        if(this.state._realName==''){
            toastShort('请输入真实姓名',-300);
            return;
        };
        if(this.state.idCard==''){
            toastShort('请输入身份证号',-300);
            return;
        };
        if(this.state._mobilephone==''){
            toastShort('请输入手机号码',-300);
            return;
        };
        if(this.state._email==''){
            toastShort('请输入邮箱号',-300);
            return;
        };
        if(this.state.message==''){
            toastShort('请输入短信验证码',-300);
            return;
        };
        if(this.state.randomCode==''){
            toastShort('请获取短信验证码！',-300);
            return;
        };

        //调用汇付时，显示加载状态
        this.setState({showDialog:true});
        Request.post('createIpsAcctApp.do',{uid:'',pageType:'reactAPP',randomCode:this.state.randomCode,recivePhone:this.state.recivePhone,code:this.state.message,
                realName:this.state._realName,idNo:this.state.idCard,cellphone:this.state._mobilephone,email:this.state._email},
        (data)=>{
            if(data.error == '0'){
                this.setState({
                    isClick:true,
                })
                this.props.navigator.push({component:OwebView,name:'OwebView',params:{html:data.html,title:'注册汇付个人账户',back:{true}}});
            }else{
                toastShort(data.msg,-300);
            }
            this.setState({
                showDialog:false,
            });
        },(error)=>{
            this.setState({
                showDialog:false,
            });
                Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

    //返回
    _leftbtn(){
        this.setState({isClick: true,});
        if (this.props.backUser) {
            let route = this.props.navigator.getCurrentRoutes();
            this.props.navigator.jumpTo(route[0]);
        } else {
            goBack(this.props.navigator);
        }
    }

    onFocus = () => {
        this.setState({height:StyleConfig.screen_height+70});
    }

    onBlur = () => {
        this.setState({height:StyleConfig.screen_height-StyleConfig.NAV_BAR_HEIGHT-this.state.viewHeight-16/StyleConfig.oPx});
    }

    render(){
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={"注册汇付天下"}
                    leftShowIcon={true}
                    leftBtnFunc={this._leftbtn.bind(this)}
                />
               <ScrollView
                   onResponderRelease={()=>{ const dismissKeyboard = require('dismissKeyboard');dismissKeyboard();}}
                   keyboardShouldPersistTaps="handled"
               >
                   {/*<KeyboardAvoidingView*/}
                       {/*behavior="position"*/}
                       {/*keyboardVerticalOffset={550}*/}
                       {/*style={[styles.container,{height:StyleConfig.screen_height-StyleConfig.NAV_BAR_HEIGHT-this.state.viewHeight-16/StyleConfig.oPx}]}*/}
                       {/*contentContainerStyle={[styles.container,{height:StyleConfig.screen_height-StyleConfig.NAV_BAR_HEIGHT-this.state.viewHeight-16/StyleConfig.oPx}]}>*/}
                   <View style={[styles.container,{height:this.state.height}]}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.phoneText}>真实姓名</Text>
                        <TextInput style = {styles.inputs}
                                   underlineColorAndroid="transparent"
                                   placeholder= "请输入真实姓名"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   value = {this.state._realName}
                                   onChangeText = {
                                         (_realName) =>{this.setState({_realName})}
                               }/>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.phoneText}>身份证号码</Text>
                        <TextInput style = {styles.inputs}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入身份证号码"
                                   editable={this.state.iseditable}
                                   selectTextOnFocus={true}
                                   keyboardType="numeric"
                                   value = {this.state.idCard}
                                   onChangeText = {
                                         (idCard) =>{this.setState({idCard})}
                               }/>
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={styles.phoneText}>邮箱</Text>
                        <TextInput style = {styles.inputs}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入邮箱号"
                                   selectTextOnFocus={true}
                                   value = {this.state._email}
                                   onChangeText = {
                                         (_email) =>{this.setState({_email})}
                                }/>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.phoneText}>手机号码</Text>
                        <TextInput style = {styles.inputs}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入手机号码"
                                   selectTextOnFocus={true}
                                   editable={false}
                                   keyboardType="numeric"
                                   value = {this.state._mobilephone}
                                   onChangeText = {
                                         (_mobilephone) =>{this.setState({_mobilephone})}
                                }/>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.phoneText}>验证码</Text>

                        <TextInput style = {[styles.inputs,{width:300/StyleConfig.oPx,}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入短信验证码"
                                   value = {this.state.message}
                                   keyboardType="numeric"
                                   onChangeText = {
                                   (message) =>{this.setState({message})}
                               }
                        />
                        <View style={styles.verticalLine}/>
                        <TouchableOpacity onPress={this.state.onClick}>
                            <Text style={[styles.textStyle]}>{this.state.timerCount} {this.state.timerTitle}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.btnContainer}>
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
                   {/*</KeyboardAvoidingView>*/}
                <Loading show={this.state.showDialog} top={true}/>
               </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,  //平分填满父空间。
        backgroundColor:'#E9ECF3'
    },
    /**布局内容*/
    container: {
        marginTop:20/StyleConfig.oPx,
        paddingLeft:30/StyleConfig.oPx,
        paddingRight:30/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        backgroundColor:'#FFFFFF',
        alignItems:'center'
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
        paddingLeft:20/StyleConfig.oPx,
    },
    inputs: {
        paddingLeft:2/StyleConfig.oPx,
        width:470/StyleConfig.oPx,
        fontSize:15,
        height:120/StyleConfig.oPx,
        marginTop:15/StyleConfig.oPx
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
        zIndex:100,
    }
});
