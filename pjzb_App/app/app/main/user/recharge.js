/* 充值*/
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
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import Request from '../../utils/Request';
import styles from '../../style/rechargeWithdraw.js';
import NavigationBar from '../../components/NavigationBar';
import LinearGradient from 'react-native-linear-gradient';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import RechargeList from './rechargeList';
import RegIpayPersonal from './regIpayPersonal';
import OwebView from '../../components/OwebView';
import Loading from '../../components/Loading';
import ListMode from '../../components/ListMode';
import Utils from '../../utils/utils';

export default class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            ipayAccount: '',
            isDisabled: true,
            showBtmImg: require('../../images/user/icon_withdraw_btn.png'),
            textColor: '#999',
            showDialog:false,
            usableSum:0,
            nickname:'',
            isShowList: false,
            payDataList: [],
            payType: 1,
        };
    }

    componentDidMount(){
        this.setState({usableSum:this.props.usableSum,showDialog:true,nickname:this.props.nickname});
        let params = {uid:''};
        Request.post('findIpayAccountByUserId.do',params,(data)=>{
            if(data.error == '0'){
                if (data.user !=null && data.user.ipayAccount != null && data.user.ipayAccount != '') {
                    let account = data.user.ipayAccount;
                    let account1 = account.substr(0, 4);
                    let account2 = account.substr(8, 4);
                    this.setState({ipayAccount: account1 + ' **** ' + account2 + ' ****'});
                } else {
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
                }
            } else {
                Alert.alert('提示',data.msg);
            }
            this.setState({showDialog:false});
        },(error)=>{
            this.setState({showDialog:false});
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    record() {
        this.props.navigator.push({component:RechargeList,name:'RechargeList',params:{nickname:this.state.nickname}});
    }

    changeText(money) {
        this.setState({
            money: money,
        });

        if (money != null && money != '' && money != 0) {
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

    getBtn() {
        if (this.state.isDisabled) {
            return(
                <Image style={{width:690/StyleConfig.oPx, height:89/StyleConfig.oPx, justifyContent:'center',alignSelf:'center'}} source={this.state.showBtmImg}>
                    <Text style={{backgroundColor:'transparent',textAlign:'center',color:this.state.textColor}}>
                        确认充值
                    </Text>
                </Image>
            );
        } else {
            return(
                <TouchableOpacity onPress={this.submit.bind(this)}>
                    <Image style={{width:690/StyleConfig.oPx, height:89/StyleConfig.oPx, justifyContent:'center',alignSelf:'center'}} source={this.state.showBtmImg}>
                        <Text style={{backgroundColor:'transparent',textAlign:'center',color:this.state.textColor}}>
                            确认充值
                        </Text>
                    </Image>
                </TouchableOpacity>
            );
        }
    }

    submit () {
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
        let params = {
            uid: '',
            money: this.state.money.replace(/[^\0-9\.]/g,''),
            pageType: 'reactAPP',
        };
        this.setState({showDialog:true});
        Request.post('ipayPayment.do',params,(data)=>{
            this.setState({showDialog:false});
            if(data.error == '0'){
                this.props.navigator.push({
                    component:OwebView,
                    name:'OwebView',
                    params: {
                        html: data.html,
                        title:'充值',
                        back:{true},
                    }
                });
            } else {
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            this.setState({showDialog:false});
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    }

    tapEvent(e) {
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    }

    _goChinapnr = () => {
        this.props.navigator.push({
            component:OwebView,
            name:'OwebView',
            params: {
                url: "https://c.chinapnr.com/p2puser/",
                title:'汇付天下',
                back:{true},
            }
        });
    }

    _showListMode1 = () => {
        this.setState({
            isShowList: true,
            payType: 1,
        });
        let params = {uid:'', payType: 1};
        Request.post('getQuotaList.do',params,(data)=>{
            if(data.error == '0'){
                console.log(data)
                this.setState({
                    payDataList: data.data,
                });
            } else {
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    }
    _showListMode2 = () => {
        this.setState({
            isShowList: true,
            payType: 2,
        });
        let params = {uid:'', payType: 2};
        Request.post('getQuotaList.do',params,(data)=>{
            if(data.error == '0'){
                console.log(data)
                this.setState({
                    payDataList: data.data,
                });
            } else {
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    }

    render() {
        return (
            <ScrollView onResponderRelease={(e)=>this.tapEvent(e)} keyboardShouldPersistTaps="handled">
                <View style={styles.scrollView}>
                    <LinearGradient colors={['#f3553e', '#eb3549']} style={{height:360/StyleConfig.oPx}}>
                        <NavigationBar
                            title="充值"
                            leftShowIcon={true}
                            leftBtnFunc={this._goBack.bind(this)}
                            rightTitle="充值记录"
                            rightBtnFunc={this.record.bind(this)}
                            withOutLinearGradient={true}
                        />
                        <View style={styles.topView}>
                            <Text style={styles.money}>{Utils.formatCurrency(this.state.usableSum)}</Text>
                            <Text style={styles.money_text}>账户余额(元)</Text>
                        </View>
                    </LinearGradient>
                    <TouchableOpacity activeOpacity={1} onPress={this._goChinapnr}>
                        <Image 
                            style={{width:690/StyleConfig.oPx, height:187/StyleConfig.oPx, 
                                marginTop: 20/StyleConfig.oPx, marginBottom: 5/StyleConfig.oPx, marginLeft: 30/StyleConfig.oPx}} 
                            source={require('../../images/user/icon_promptImg_1.png')} />
                    </TouchableOpacity>
                    <View style={styles.modeView}>
                        <View style={styles.modeView_item}>
                            <Text style={styles.modeText} onPress={this._showListMode1}>查看快捷限额</Text>
                        </View>
                        <View style={[styles.modeView_item, {alignItems: 'flex-end'}]}>
                            <Text style={styles.modeText} onPress={this._showListMode2}>查看网银限额</Text>
                        </View>
                    </View>

                    <View style={styles.interval15}></View>
                    <View style={styles.bodyView}>
                        {/*<View style={styles.itemsInput}>*/}
                            {/*<View style={styles.itemsTextView}>*/}
                                {/*<Text style={styles.itemsText}>建设银行</Text>*/}
                            {/*</View>*/}
                            {/*<TextInput style={styles.input}*/}
                                   {/*underlineColorAndroid="transparent"*/}
                                   {/*placeholder={this.state.ipayAccount}*/}
                                   {/*placeholderTextColor="#999999"*/}
                                   {/*selectTextOnFocus={true}*/}
                                   {/*editable={false}*/}
                                   {/*onChangeText={(userName) => this.setState({userName})}*/}
                            {/*/>*/}
                        {/*</View>*/}
                        <View style={styles.itemsInput}>
                            <View style={styles.itemsTextView}>
                                <Text style={styles.itemsText}>金额(元)</Text>
                            </View>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       placeholder="请输入充值金额"
                                       placeholderTextColor="#999999"
                                       selectTextOnFocus={true}
                                       keyboardType="numeric"
                                       onChangeText={(money) => this.changeText(money)}
                            />
                        </View>

                        <View style={styles.interval40}></View>
                        {
                            this.getBtn()
                        }
                    </View>
                    <Loading show={this.state.showDialog} top={true}/>
                </View>
                {/* 列表模型组件 */}
                <ListMode isShowList={this.state.isShowList} _cancel={()=> {this.setState({isShowList: false})}} _payDataList={this.state.payDataList} _payType={this.state.payType} />
            </ScrollView>
        );
    }
}
