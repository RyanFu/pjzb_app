import React, { Component } from 'react';
import {
    View,
    Text,
    Appregistry,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    TouchableOpacity,
    Navigator,
    Alert,
    KeyboardAvoidingView,
    LayoutAnimation,
    Keyboard,
} from 'react-native';

import {StyleConfig} from '../../style';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import Login from './login';
import AppMain from '../appMain';
import {toastShort} from '../../utils/Toast';
let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
// 渐变组件
import LinearGradient from 'react-native-linear-gradient';

var codeTime = 60;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            // 用户输入验证码
            code: '',
            // 返回加密的手机验证码
            randomCode: '',
            // 返回加密的手机号
            recivePhone: '',
            // 是否获取过验证码
            isGetCode: false,
            // 获取验证码方法
            onClick: this.getCode,
            // 是否有推荐人
            isRecommend: false,
            // 推荐码
            refferee: '',
            //
            timerCount:'',
            timerTitle:'获取验证码',
            // 注册时动画 loading
            showDialog:false,
            isClick: false,
            isMarginTop: 180,
        };
    }

    componentWillMount () {
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus);
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlur);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.state.keyboardDidHideListener.remove();
    }

    // 点击获取验证码
    getCode = () => {
        if (this.state.phone == null || this.state.phone == '') {
            return (
                toastShort('请先输入手机号！',-300)
            );
        }
        if (this.state.phone.toString().length < 11 || this.state.phone.toString().length > 11) {
            return (
                toastShort('手机号码格式不正确！',-300)
            );
        }

        this.setState({
            onClick: null,
            timerCount:codeTime,
            timerTitle:'请留意短信',
            isGetCode: true,
        });

        //ajax
        Request.post('sendSMS.do',{
            cellPhone: this.state.phone,
            smsType: 'regist',
            uid:'',
        },(data)=>{
            if (data.error == 0) {
                this.setState({randomCode : data.randomCode,recivePhone : data.recivePhone});
                this.interval=setInterval(() =>{
                    codeTime = this.state.timerCount - 1;
                    if(this.state.timerCount===0){
                        this.interval&&clearInterval(this.interval);
                        this.setState({
                            timerCount:'',
                            timerTitle:'获取验证码',
                            onClick: this.getCode,
                        });
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
            } else {
                this.setState({
                    onClick: this.getCode,
                    timerCount:'',
                    timerTitle:'获取验证码',
                    isGetCode: false,
                });
                toastShort(data.msg,-300);
            }
        },(error)=>{
            console.log(error);
            Alert.alert(
                '提示信息',
                '您的网络不稳定，请稍后再试！',
                [
                    {text: '确定', },
                ]
            )
        });

    };

    // 点击填写推荐人
    clickRecommend = () => {
        this.setState({isRecommend: !this.state.isRecommend});
    };

    onClick (){
        this.setState({
           isClick: true,
        });
        this.props.navigator.push({component:Login,name:'Login',params:{noRight : this.props.noRight}})
    };
    //回退
    _goBack(){
        this.setState({
            isClick: true,
        });
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[0]);
    }
    register = () => {
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        if (this.state.phone == null || this.state.phone == '') {
            return (
                toastShort('请先输入手机号！',-300)
            );
        }
        if (this.state.phone.toString().length < 11 || this.state.phone.toString().length > 11) {
            return (
                toastShort('手机号码格式不正确！',-300)
            );
        }
        if (this.state.isGetCode == false) {
            return (
                toastShort('请先获取验证码！',-300)
            );
        }
        if (this.state.password == null || this.state.password == '') {
            return (
                toastShort('请先输入密码！',-300)
            );
        }
        if (this.state.code == null || this.state.code == '') {
            return (
                toastShort('请输入验证码！',-300)
            );
        }
        //ajax
        this.setState({showDialog:true});
        Request.post('register.do',{
            name: this.state.phone,
            pwd: this.state.password,
            cellPhone: this.state.phone,
            randomCode: this.state.randomCode,
            recivePhone: this.state.recivePhone,
            code: this.state.code,
            refferee: this.state.refferee,
            uid:'',
        },(data)=>{
            this.setState({
                isClick: true,
            });
            if (data.error == 0) {
                this.setState({showDialog:false});
                this.props.navigator.push({component:AppMain,name:'AppMain'});
                // 跳转
                Alert.alert(
                    '提示信息',
                    '注册成功，立即登录吧！',
                    [
                        {text: '取消', },
                        {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
                    ]
                )
            } else {
                toastShort(data.msg,-300);
                this.setState({showDialog:false});
            }
        },(error)=>{
            this.setState({showDialog:false});
            console.log(error);
            Alert.alert( '提示信息','您的网络不稳定，请稍后再试！')
        });
    };

    tapEvent(e){
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }

    onFocus = () => {
        this.setState({
           isMarginTop:80,
        });
    }

    onBlur = () => {
        this.setState({
            isMarginTop:180,
        });
    }

    render() {
        //初始化状态栏
        let statusBar =  <View style={{height:STATUS_BAR_HEIGHT}}></View>;
        return (
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}} onStartShouldSetResponder={(evt)=>true} onResponderRelease={(e)=>this.tapEvent(e)} keyboardShouldPersistTaps="handled">
                <LinearGradient colors={['#f3553e', '#eb3549']} style={{flex:1,minHeight:StyleConfig.screen_height}}>
                    {statusBar}
                    <View style={styles.topView}>
                        {this.props.noRight?<View style={styles.fanhui}></View>:<TouchableOpacity
                                style={styles.fanhui}
                                onPress={this._goBack.bind(this)}>
                                <Image  style={styles.statusImage} source={require('../../images/icon/icon_left.png')}/>
                            </TouchableOpacity>}
                        <View style={styles.centerView}>
                            <View style={[styles.bottomBorder, {borderBottomWidth: 0}]}>
                                <TouchableOpacity onPress={this.onClick.bind(this)}>
                                    <Text style={styles.statusName}>
                                        登录
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.bottomBorder, {marginLeft: 70/StyleConfig.oPx}]}>
                                <Text style={styles.statusName}>
                                    注册
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyView}>
                        {/*<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={500} contentContainerStyle={{alignItems:'center'}} >*/}
                            <View style={[styles.inputView,{marginTop:this.state.isMarginTop/StyleConfig.oPx}]}>
                                <Image source={require('../../images/user/icon_username.png')} style={styles.input_icon}></Image>
                                <TextInput style={styles.textInput}
                                           underlineColorAndroid="transparent"
                                            placeholder="手机号"
                                           placeholderTextColor="#f9b7b3"
                                           selectTextOnFocus={true}
                                           onFocus={this.onFocus}
                                           onSubmitEditing={this.onBlur}
                                           ref="phone"
                                           onChangeText={(phone) => this.setState({phone})}
                                />
                            </View>
                            <View style={styles.paddingTop_input} />
                            <View style={styles.inputView}>
                                <Image source={require('../../images/user/icon_password.png')} style={styles.input_icon}></Image>
                                <TextInput style={styles.textInput}
                                           underlineColorAndroid="transparent"
                                           placeholder="登录密码"
                                           placeholderTextColor="#f9b7b3"
                                           selectTextOnFocus={true}
                                           onFocus={this.onFocus}
                                           onSubmitEditing={this.onBlur}
                                           secureTextEntry ={true}
                                           onChangeText={(password) => this.setState({password})}
                                />
                            </View>
                            <View style={styles.paddingTop_input} />
                            <View style={styles.inputView}>
                                <Image source={require('../../images/user/icon_note.png')} style={[styles.input_icon, styles.input_icon_note]}></Image>
                                <TextInput style={[styles.textInput, styles.textInput_note]}
                                           underlineColorAndroid="transparent"
                                           placeholder="短信验证码"
                                           placeholderTextColor="#f9b7b3"
                                           selectTextOnFocus={true}
                                           onFocus={this.onFocus}
                                           onSubmitEditing={this.onBlur}
                                           keyboardType="numeric"
                                           onChangeText={(code) => this.setState({code})}
                                />
                                <View style={styles.codeView}>
                                    <Text style={styles.coloText} onPress={this.state.onClick}>{this.state.timerCount} {this.state.timerTitle}</Text>
                                </View>
                            </View>
                            <View style={styles.paddingTop_input} />
                            <View style={[styles.inputView, styles.recommendView]}>
                                <Text style={styles.recommendText} onPress={this.clickRecommend}>推荐码(选填)</Text>
                                <TouchableOpacity onPress={this.clickRecommend}>
                                    {
                                        this.state.isRecommend == true ? (
                                                <Image source={require('../../images/user/icon_triangle1.png')} style={[styles.input_icon, styles.input_triangle]}></Image>
                                            ) : (
                                                <Image source={require('../../images/user/icon_triangle.png')} style={[styles.input_icon, styles.input_triangle]}></Image>

                                            )
                                    }
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.isRecommend == true ? (
                                    <View style={styles.inputView}>
                                        <Image source={require('../../images/user/icon_username.png')} style={styles.input_icon}></Image>
                                        <TextInput style={styles.textInput}
                                                   underlineColorAndroid="transparent"
                                                   placeholder="推荐码"
                                                   placeholderTextColor="#f9b7b3"
                                                   selectTextOnFocus={true}
                                                   onFocus={this.onFocus}
                                                   onSubmitEditing={this.onBlur}
                                                   onChangeText={(refferee) => this.setState({refferee})}
                                        />
                                    </View>
                                    ): (null)
                            }
                        {/*</KeyboardAvoidingView>*/}
                        </View>

                        <View>
                            <Button imgSource={require('../../images/user/icon_btn.png')}
                                    text="注册" textColor="#eb3331"
                                    onPress={this.register}
                            />
                        </View>
                        <View style={styles.paddingTop_btn} />
                        <Text style={styles.copyright}>版权所有 © 普金资本运营（赣州）有限公司</Text>

                    </LinearGradient>
                    <Loading show={this.state.showDialog} top={true}/>
                    </ScrollView>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyView: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    paddingTop_view: {
        paddingTop: 180/StyleConfig.oPx,
    },
    paddingTop_input: {
        paddingTop: 35/StyleConfig.oPx,
    },
    inputView: {
        width: 600/StyleConfig.oPx,
        flexDirection: "row",
        borderBottomWidth : StyleConfig.borderWidth,
        borderBottomColor: "#f6928e",
    },
    input_icon: {
        width: 40/StyleConfig.oPx,
        height: 42/StyleConfig.oPx,
        marginLeft:StyleConfig.borderWidth,
        alignSelf: 'center',
    },
    input_icon_note: {
        height: 32/StyleConfig.oPx,
        marginTop: 10/StyleConfig.oPx,
    },
    input_triangle: {
        width: 34/StyleConfig.oPx,
        height: 18/StyleConfig.oPx,
        marginTop: 10/StyleConfig.oPx,
        marginLeft: 10/StyleConfig.oPx,
    },
    textInput: {
        width: 530/StyleConfig.oPx,
        height: 80/StyleConfig.oPx,
        marginLeft: 30/StyleConfig.oPx,
        marginTop: 10/StyleConfig.oPx,
        fontSize: 28/StyleConfig.oPx,
        color: "white",
    },
    textInput_note: {
        width: 330/StyleConfig.oPx,
    },
    codeView: {
        marginTop: 10/StyleConfig.oPx,
        width: 190/StyleConfig.oPx,
        height: 35/StyleConfig.oPx,
        borderLeftWidth: StyleConfig.borderWidth,
        borderLeftColor: "#f6928e",
        alignSelf: 'center',
    },
    coloText: {
        fontSize: 28/StyleConfig.oPx,
        color: "white",
        width: 187/StyleConfig.oPx,
        height: 35/StyleConfig.oPx,
        textAlign: "right",
    },
    recommendView: {
        borderBottomWidth : 0,
    },
    recommendText: {
        color: "white",
        fontSize: 28/StyleConfig.oPx,
    },
    paddingTop_btn: {
        marginTop: 66/StyleConfig.oPx,
    },
    btnText: {
        color: "#eb3331",
        textAlign: "center",
    },
    copyright: {
        fontSize: 22/StyleConfig.oPx,
        textAlign: "center",
        color: "white",
        marginTop: 80/StyleConfig.oPx,
        marginBottom: 30/StyleConfig.oPx,
        backgroundColor: 'transparent',
    },
    topView: {
        height: 100/StyleConfig.oPx,
        width: 750/StyleConfig.oPx,
        backgroundColor: "transparent",
        flexDirection:'row',
        position:'absolute',
        top:STATUS_BAR_HEIGHT,
        zIndex:100,
    },
    statusImage: {
        height:47/StyleConfig.oPx,
        width:47/StyleConfig.oPx,
    },
    bottomBorder: {
        width:  120/StyleConfig.oPx,
        height:  65/StyleConfig.oPx,
        borderBottomWidth: 3/StyleConfig.oPx,
        borderBottomColor: 'white',
        marginTop: 10/StyleConfig.oPx,
    },
    statusName:{
        fontSize:42/StyleConfig.oPx,
        color:'#fff',
        textAlign: 'center',
    },
    fanhui: {
        marginLeft: 30/StyleConfig.oPx,
        alignSelf : 'center',
    },
    centerView: {
        width:  595/StyleConfig.oPx,
        height:  100/StyleConfig.oPx,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
