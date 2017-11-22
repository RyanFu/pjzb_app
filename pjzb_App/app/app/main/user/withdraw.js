/* 提现*/
import React, { Component } from 'react';
import {
    View,
    Text,
    Appregistry,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    TextInput,
    TouchableOpacity,
    Picker,
    WebView,
    Alert,
    Platform,
    KeyboardAvoidingView,
    LayoutAnimation,
    Keyboard,
} from 'react-native';

import Request from '../../utils/Request';
import styles from '../../style/rechargeWithdraw.js';
import NavigationBar from '../../components/NavigationBar';
import LinearGradient from 'react-native-linear-gradient';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import WithdrawList from './withdrawList';
import BankcardManage from './bankcardManage';
import OwebView from '../../components/OwebView';
import Loading from '../../components/Loading';
import MyPicker from './Picker';
import {toastShort} from '../../utils/Toast';
import Utils from '../../utils/utils';
import RegIpayPersonal from './regIpayPersonal';

var codeTime = 60;
export default class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 用户输入验证码
            code: null,
            // 手机验证码
            randomCode: null,
            recivePhone: null,
            // 是否获取过验证码
            isGetCode: false,
            // 获取验证码方法
            onClick: this.getCode,
            bindingPhone:'',
            timerCount: '',
            timerTitle:'获取验证码',
            showDialog:false,
            isClick: false,
            isDisabled: true,
            showBtmImg: require('../../images/user/icon_withdraw_btn.png'),
            // 金额
            money: 0,
            // 银行卡
            bank: '',
            // 交易密码
           // dealpwd: '',
            usableSum:0,
            bankList:[],
            bankName:'',
            bankId:'',
            isIos:(Platform.OS === 'ios'),
            isToPicker:false,
            bankValue:'点击选择银行卡',
            nickname:'',
            behavior:'padding',
            height:570,
            isCode:false,
            refreew:'0.00',
            refreewText:'元',
            isShow:true,
            textColor: '#999',
        };
    }

    componentWillMount () {
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{this.setState({isShow:false})});
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{this.setState({isShow:true})});
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.state.keyboardDidHideListener.remove();
    }



    componentDidMount(){
        this.setState({showDialog:true,nickname:this.props.nickname});
        let params = {uid:''};
        Request.post('queryWithdraw.do',params,(data)=>{
            this.setState({showDialog:false});
            if(data.error == '0'){
                this.setState({
                    usableSum:data.usableSum,
                    bankList:data.bankList,
                    bindingPhone:data.bindingPhone,
                });
                this.setState({
                    bankId:data.bankList[0].cardNo,
                });
            }else if(data.error == '4'){
                this._goBack();
                //无银行卡信息
                Alert.alert(
                    '提示信息',
                    '无银行卡信息，前往银行卡管理页面',
                    [
                        {text: '取消', },
                        {text: '确定', onPress: () =>
                            this.props.navigator.push({component:BankcardManage,name:'BankcardManage',params:{
                                backUser:{true}
                            }})},
                    ]
                )
            } else if(data.error == '-1'){
                this._goBack();
                Alert.alert(
                    '提示信息',
                    '请先注册汇付天下',
                    [
                        {text: '取消', },
                        {text: '确定', onPress: () =>
                            this.props.navigator.push({component:RegIpayPersonal,name:'RegIpayPersonal',params: {
                                backUser:{true}
                            }})},
                    ]
                )
            } else {
                Alert.alert(
                    '提示信息',
                    data.msg,
                    [
                        {text: '确定', onPress: () => this._goBack()},
                    ]
                )
            }
        },(error)=>{
            this.setState({showDialog:false});
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

    pickerItem(row, index) {
        let account1 = row.cardNo.substr(0, 4);
        let account2 = row.cardNo.substr(8, 4);
        return <Picker.Item label={row.bankName + '        ' + account1 + ' **** ' + account2 + ' ****'} value={row.cardNo} key={index} />;
    }

    pickerItem1(row, index) {
        let account1 = row.cardNo.substr(0, 4);
        let account2 = row.cardNo.substr(8, 4);
        return <Picker.Item label={row.bankName + '        ' + account1 + ' **** ' + account2 + ' ****'} value={row.bankName+'.'+row.cardNo} key={index} />;
    }

    //返回
    _goBack(){
        this.setState({
            isClick: true,
        });
        goBack(this.props.navigator);
    }

    changeMoney(money) {
        this.setState({
            money: money,
        });

        if (money != null && money != '' && money != 0 && money >= 100) {
            this.setState({
                showBtmImg: require('../../images/other/password_btn.png'),
                isDisabled: false,
                textColor: '#fff',
            });
        } else {
            this.setState({
                showBtmImg: require('../../images/user/icon_withdraw_btn.png'),
                isDisabled: true,
                textColor: '#999',
            });
        }
    }

    getBtn = () => {
        if (this.state.isDisabled) {
            return(
                <Image style={{width:690/StyleConfig.oPx, height:89/StyleConfig.oPx, justifyContent:'center',alignSelf:'center'}} source={this.state.showBtmImg}>
                    <Text style={{backgroundColor:'transparent',textAlign:'center',color:this.state.textColor}}>
                        确认提现
                    </Text>
                </Image>
            );
        } else {
            return(
                <TouchableOpacity onPress={this.submit.bind(this)}>
                    <Image style={{width:690/StyleConfig.oPx, height:89/StyleConfig.oPx, justifyContent:'center',alignSelf:'center'}} source={this.state.showBtmImg}>
                        <Text style={{backgroundColor:'transparent',textAlign:'center',color:this.state.textColor}}>
                            确认提现
                        </Text>
                    </Image>
                </TouchableOpacity>
            );
        }
    }

    getCode = () => {
        this.setState({
            onClick: null,
            timerCount:codeTime,
            timerTitle:'请留意短信',
            isGetCode: true,
            isClick: false,
        });
        //ajax
        Request.post('sendSMS.do',{
            cellPhone: this.state.bindingPhone,
            smsType: 'resetPwd',
        },(data)=>{
            if (data.error == 0) {
                this.setState({randomCode : data.randomCode,recivePhone: data.recivePhone});
                this.setState({
                    onClick: null,
                    timerCount:codeTime,
                    timerTitle:'请留意短信',
                    isGetCode: true,
                });
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
                toastShort(data.msg,-300)
            }
        },(error)=>{
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

    record() {
        this.props.navigator.push({component:WithdrawList,name:'WithdrawList',params:{nickname:this.state.nickname}});
    }

    bankValue = (value) => {
        if (value != null && value != '') {
            let account = value.substring(value.indexOf('.')+1,value.length);
            let account1 = account.substr(0, 4);
            let account2 = account.substr(8, 4);
            let bandValue = value.substring(0,value.indexOf('.')) + '        ' + account1 + ' **** ' + account2 + ' ****';
            this.setState({
                isToPicker: false,
                bankValue: bandValue,
                bankId: account,
            })
        }
        this.setState({
            isToPicker: false,
        })
    }

    submit () {
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        if(this.state.bankValue == '点击选择银行卡' && this.state.isIos) {
            toastShort('请先选择银行卡',-300);
            return;
        }
        if(this.state.randomCode == null || this.state.randomCode == '') {
            toastShort('请先获取验证码',-300);
            return;
        }
        // if(this.state.dealpwd == null || this.state.dealpwd == '') {
        //     toastShort('请输入交易密码',-300);
        //     return;
        // }
        if(this.state.code == null || this.state.code == '') {
            toastShort('请输入验证码',-300);
            return;
        }
        if(Number(this.state.usableSum) < Number(this.state.money)) {
            toastShort('输入金额大于可提现金额',-300);
            return;
        }
        this.setState({showDialog:true});
        let params = {
            'uid':'',
            'code':this.state.code,
            'randomCode':this.state.randomCode,
            'money':this.state.money,
            'bankId':this.state.bankId,
            'recivePhone':this.state.recivePhone,
        };
        Request.post('addWithdraw.do',params,(data)=>{
            if (data.error == 0) {
                this.setState({
                    isClick: true,
                    timerCount:'',
                    timerTitle:'获取验证码',
                    onClick: this.getCode,
                });
                this.props.navigator.push({
                    component: OwebView,
                    name: 'OwebView',
                    params: {
                        url: data.html,
                        title:'提现',
                        back:{true},
                    }
                });
            }else {
                toastShort(data.msg, -300);
            }
            this.setState({showDialog:false});
        },(error)=>{
            Alert.alert('提示','您的网络不稳定，请稍后再试！');
        });
    }

    tapEvent(e) {
        // LayoutAnimation.spring();
        // this.setState({
        //     height:570,
        // });
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }

    // 获取提现服务费
    getRefreew = () => {
        let params = {
            'uid':'',
            'dealMoney':this.state.money,
        };
        Request.post('withdrawFee.do',params,(data)=> {
            let refreewText = '';
            if (data.code == 2) {
                refreewText = '元';
            }
            this.setState({
                showDialog: false,
                refreew: data.msg,
                refreewText: refreewText,
            });
        });
    }

    getItem = () => {
        if (this.state.isShow) {
            return <View style={styles.itemsInput}>
                {
                    this.state.isIos
                        ? <View style={styles.itemsTextView}>
                            <Text style={styles.itemsText}>银行卡</Text>
                        </View>
                        :null
                }
                {
                    this.state.isIos
                        ?
                        <Text onPress={() => {this.setState({isToPicker:{true}});const dismissKeyboard = require('dismissKeyboard');dismissKeyboard();}} style={styles.pickerText}>{this.state.bankValue}</Text>
                        :
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.bankId}
                            onValueChange={(bankId) => this.setState({bankId: bankId})}>
                            {
                                this.state.bankList.map((row, index) => {
                                    return this.pickerItem(row, index);
                                })
                            }
                        </Picker>
                }
            </View>
        }
    }

    render() {
        return (
            <View style={styles.scrollView}>
                
                    <LinearGradient colors={['#f3553e', '#eb3549']} style={{height:this.state.isShow?360/StyleConfig.oPx:155/StyleConfig.oPx}}>
                        <NavigationBar
                            title="提现"
                            leftShowIcon={true}
                            leftBtnFunc={this._goBack.bind(this)}
                            rightTitle="提现记录"
                            rightBtnFunc={this.record.bind(this)}
                            withOutLinearGradient={true}
                        />
                        {
                            this.state.isShow
                                ?<View style={styles.topView}>
                                    <Text style={styles.money}>{Utils.formatCurrency(this.state.usableSum)}</Text>
                                    <Text style={styles.money_text}>可提现金额(元)</Text>
                                </View>
                                :null
                        }
                    </LinearGradient>
<ScrollView style={styles.scrollView} onResponderRelease={(e)=>this.tapEvent(e)} keyboardShouldPersistTaps="handled">
                    <Image 
                        style={{width:690/StyleConfig.oPx, height:268/StyleConfig.oPx, 
                            marginTop: 20/StyleConfig.oPx, marginBottom: 5/StyleConfig.oPx, marginLeft: 30/StyleConfig.oPx}} 
                        source={require('../../images/user/icon_promptImg.png')} />
                 
                    <View style={styles.interval15}></View>
                    {/*<KeyboardAvoidingView keyboardVerticalOffset={500} behavior="position" contentContainerStyle={styles.bodyView}>*/}
                    {/*<View style={styles.bodyView}>*/}
                        {this.getItem()}
                        {this.state.isShow?<View style={styles.interval40}></View>:null}
                        <View style={styles.itemsInput}>
                            <View style={styles.itemsTextView}>
                                <Text style={styles.itemsText}>金额(元)</Text>
                            </View>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       placeholder="请输入金额(不小于100)"
                                       placeholderTextColor="#999999"
                                       selectTextOnFocus={true}
                                       keyboardType="numeric"
                                       onBlur={this.getRefreew}
                                       onChangeText={(money) => this.changeMoney(money)}
                            />
                        </View>
                        <Text style={styles.chargeText}>提现手续费：<Text style={styles.redText}>2.00</Text>元</Text>
                        <Text style={[styles.chargeText,{marginTop:5/StyleConfig.oPx}]}>提现服务费：<Text style={styles.redText}>{this.state.refreew}</Text>{this.state.refreewText}</Text>
                        <View style={{marginTop:15/StyleConfig.oPx}}></View>

                        {/*<View style={styles.itemsInput}>*/}
                            {/*<View style={styles.itemsTextView}>*/}
                                {/*<Text style={styles.itemsText}>交易密码</Text>*/}
                            {/*</View>*/}
                            {/*<TextInput style={styles.input}*/}
                                       {/*underlineColorAndroid="transparent"*/}
                                       {/*placeholderTextColor="#999999"*/}
                                       {/*selectTextOnFocus={true}*/}
                                       {/*secureTextEntry ={true}*/}
                                       {/*onChangeText={(dealpwd) => this.setState({dealpwd})}*/}
                            {/*/>*/}
                        {/*</View>*/}

                        <View style={styles.hr}></View>
                        <View style={styles.itemsInput}>
                            <View style={styles.itemsTextView}>
                                <Text style={styles.itemsText}>验证码</Text>
                            </View>
                            <TextInput style={[styles.input,styles.coedInput]}
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor="#999999"
                                       selectTextOnFocus={true}
                                       keyboardType="numeric"
                                       ref="code"
                                       onChangeText={(code) => this.setState({code})}
                            />
                            <View style={styles.coedView}>
                                <Text style={styles.coedText} onPress={this.state.onClick}>{this.state.timerCount} {this.state.timerTitle}</Text>
                            </View>
                        </View>
                        <View style={styles.interval40}></View>
                    {/*</View>*/}
                    {/*</KeyboardAvoidingView>*/}
                    {this.getBtn()}
                    <View style={styles.interval40}></View>
                </ScrollView>
                <Loading show={this.state.showDialog} top={true}/>
                <MyPicker show={this.state.isToPicker} list={this.state.bankList} listMethod={this.pickerItem1.bind(this)}  valMethod={this.bankValue} isBank={true} />
            </View>
        );
    }
}
