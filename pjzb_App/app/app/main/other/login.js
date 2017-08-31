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
    KeyboardAvoidingView,
    StatusBar,
    Animated,
    Keyboard,
    LayoutAnimation,
    Alert,
} from 'react-native';
import {StyleConfig} from '../../style';
import Loading from '../../components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Register from './register';
import Storage from '../../utils/Storage';
import RetrievePasswordPage from './retrievePasswordPage';
import AppMain from '../appMain';
import {toastShort} from '../../utils/Toast';
let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            name: null,
            showDialog:false,
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
            keyboardDidHideListener:null,
        };
    }

    componentWillMount () {
        // 不注释会出警告
        //Storage.clear();
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus);
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlur);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.state.keyboardDidHideListener.remove();
    }

    onClick(){
        // 进行跳转并传递参数
        this.props.navigator.push({
            title : 'Register',
            component:Register,
            params : {
                name : 'Register',
                noRight : this.props.noRight
            }
        })
    };

    tapEvent(e){
        LayoutAnimation.spring();
        this.setState({
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
        });
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }
    onForgetPassword(){
        // 进行跳转并传递参数
        this.props.navigator.push({
            component:RetrievePasswordPage,
            name:'RetrievePasswordPage',
        })
    };

    //回退
    _goBack(){
      // goBack(this.props.navigator);
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[0]);
    }

    login(){
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        if (this.state.userName == null || this.state.userName == '') {
            return (
                toastShort('请先输入手机号/用户名！',-300)
            );
        }
        if (this.state.password == null || this.state.password == '') {
            return (
                toastShort('请先输入密码！',-300)
            );
        }

        //ajax
        this.setState({showDialog:true});
        Request.post('login.do',{
            name: this.state.userName,
            pwd: this.state.password,
        },(data)=>{
            if (data.error == 0) {
                let param = {
                    UID:data.encryptId,
                    IPAYACCOUNT:data.ipayAccount,
                    USERNAME:data.realName,
                    MOBILE:data.user.mobilePhone,
                    ID:data.id
                };
                Storage.setItem('USER',param);
                global.USER = param;
                global.userHeadPic = data.imgHead == ''?null:data.imgHead;
                if(this.props.back){
                    if(this.props.loginCallBack){
                        this.props.loginCallBack()
                    }
                    this._goBack();
                    return;
                };
                this.setState({showDialog:false},()=>
                    this.props.navigator.resetTo({
                        component:AppMain,
                        name:'AppMain',
                        params:{selectedTab:'user'}
                    })
                );
            } else {
                this.setState({showDialog:false});
                toastShort(data.msg,-300)
            }

        },(error)=>{
            this.setState({showDialog:false});
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

    onFocus = () => {
        LayoutAnimation.spring();
        this.setState({
            logoW:160,
            logoH:217,
            logoTop:120,
            marginTop:120,
        });
    };

    onBlur = () => {
        LayoutAnimation.spring();
        this.setState({
            logoW:266,
            logoH:360,
            logoTop:160,
            marginTop:180,
        });
    };

    render() {
        //初始化状态栏
        let statusBar = <View style={{height:STATUS_BAR_HEIGHT}}></View>;
        return (
            <View style={{flex:1}}>
                {/*<StatusBar hidden={true}/>*/}
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
                                <View style={styles.bottomBorder}>
                                    <Text style={styles.statusName}>
                                        登录
                                    </Text>
                                </View>
                                <View style={[styles.bottomBorder, {borderBottomWidth: 0}, {marginLeft: 70/StyleConfig.oPx}]}>
                                    <TouchableOpacity onPress={this.onClick.bind(this)}>
                                        <Text style={styles.statusName}>
                                            注册
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Image source={require('../../images/user/icon_logo_2.png')}
                               style={{
                                   width:this.state.logoW/StyleConfig.oPx,
                                   height:this.state.logoH/StyleConfig.oPx,
                                   top:this.state.logoTop/StyleConfig.oPx,
                                   alignSelf:'center'
                               }}
                        />
                        <View style={[styles.bodyView,{marginTop:this.state.marginTop/StyleConfig.oPx}]}>
                            <View style={styles.inputView}>
                                <Image source={require('../../images/user/icon_username.png')} style={styles.input_icon}></Image>
                                <TextInput style={styles.textInput}
                                           underlineColorAndroid="transparent"
                                           placeholder="手机号/用户名"
                                           placeholderTextColor="#f9b7b3"
                                           selectTextOnFocus={true}
                                           ref="userName"
                                           onChangeText={(userName) => this.setState({userName})}
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
                                           secureTextEntry ={true}
                                           onChangeText={(password) => this.setState({password})}
                                />
                            </View>
                            <View style={[styles.inputView, styles.borderNone]}>
                                <TouchableOpacity style={styles.help} onPress={this.onForgetPassword.bind(this)}>
                                    <Image source={require('../../images/user/icon_doubt.png')} style={styles.input_icon_doubt}></Image>
                                    <Text style={styles.helpText}>忘记密码</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.paddingTop_btn}>
                            <Button imgSource={require('../../images/user/icon_btn.png')}
                                    text="登录" textColor="#eb3331"
                                    onPress={this.login.bind(this)}
                            />
                        </View>
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
        alignItems: 'center',
    },
    paddingTop_view: {
        paddingTop: 80/StyleConfig.oPx,
    },
    paddingTop_input_view: {
        paddingTop: 126/StyleConfig.oPx,
    },
    paddingTop_logo_view: {
        paddingTop: 40/StyleConfig.oPx,
    },
    pjzb: {
        width: 260/StyleConfig.oPx,
        height: 96/StyleConfig.oPx,
    },
    help: {
        marginTop: 30/StyleConfig.oPx,
        width: 165/StyleConfig.oPx,
        height: 35/StyleConfig.oPx,
        flexDirection: "row",
    },
    borderNone: {
        borderBottomWidth : 0,
        justifyContent: 'flex-end',
    },
    paddingTop_input: {
        paddingTop: 40/StyleConfig.oPx,
    },
    inputView: {
        width: 600/StyleConfig.oPx,
        flexDirection: "row",
        borderBottomWidth :StyleConfig.borderWidth,
        borderBottomColor: "#f6928e",
    },
    input_icon: {
        width: 40/StyleConfig.oPx,
        height: 42/StyleConfig.oPx,
        marginLeft: 1/StyleConfig.borderWidth,
        alignSelf: 'center',
    },
    input_icon_doubt: {
        width: 33/StyleConfig.oPx,
        height: 33/StyleConfig.oPx,
    },
    helpText: {
        marginLeft: 16/StyleConfig.oPx,
        color: 'white',
        width: 120/StyleConfig.oPx,
        height: 32/StyleConfig.oPx,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 28/StyleConfig.oPx,
    },
    textInput: {
        width: 530/StyleConfig.oPx,
        height: 80/StyleConfig.oPx,
        marginLeft: 30/StyleConfig.oPx,
        marginTop: 10/StyleConfig.oPx,
        fontSize: 28/StyleConfig.oPx,
        color: "white",
    },
    paddingTop_btn: {
        marginBottom: 80/StyleConfig.oPx,
        alignSelf:'center',
    },
    btnText: {
        color: "#eb3331",
        textAlign: "center",
    },
    copyright: {
        fontSize: 22/StyleConfig.oPx,
        textAlign: "center",
        color: "white",
        marginTop: 60/StyleConfig.oPx,
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
        width:47/StyleConfig.oPx,
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
