import React, { Component } from 'react';
import {
    View,
    Text,
    Appregistry,
    StyleSheet,
    Image,
    ScrollView,
    WebView,
    Alert,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import Request from '../../utils/Request';
import OwebView from '../../components/OwebView';
import RegIpayPersonal from './regIpayPersonal';

export default class BankcardManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            isEmpty:false,
        };
    }

    componentDidMount(){
        //ajax
        let params = {uid:''};
        Request.post('queryBankList.do',params,(data)=>{
            if(data.error =='0'){
                this.setState({
                    details:data.bankList,
                    isEmpty:false,
                });
            }else if(data.error =='4'){
                //无银行卡信息
                this.setState({
                    isEmpty:true,
                });
            }else{
                Alert.alert('提示', data.msg);
            }
        },(error)=>{
            Alert.alert('提示', '您的网络不稳定，请稍后再试！');
        });
    }

    //返回
    _goBack(){
        if (this.props.backUser) {
            let route = this.props.navigator.getCurrentRoutes();
            this.props.navigator.jumpTo(route[0]);
        } else {
            goBack(this.props.navigator);
        }
    }
    _addBank(){
        let params = {uid:'',pageType:'reactAPP'};
        //alert(this.state.repayWay);

        Request.post('addBankInfo.do',params,(data)=>{
            if(data.error == '0'){
                this.props.navigator.push({component:OwebView,name:'OwebView',params:{html:data.html,title:'添加银行卡',back:{true}}});
            }else if(data.error =='1'){
                //未注册汇付
                Alert.alert(
                    '提示信息',
                    '请先注册汇付天下',
                    [
                        {text: '取消'},
                        {text: '确定', onPress: () => this.props.navigator.push({component:RegIpayPersonal,name:'RegIpayPersonal'})},
                    ]
                )
            }else{
                Alert.alert('提示', data.msg);
            }
        },(error)=>{
            Alert.alert('提示', '您的网络不稳定，请稍后再试！');
        });
    }

    renderExpenseItem=(item, i) =>{
        // 银行卡项
        let imageNo =i%2==0 ?require( '../../images/user/bankCard01.png') : require('../../images/user/bankCard02.png');

        // 卡号
        var cardNo1 = item.cardNo.substr(0,4);
        var cardNo2 = item.cardNo.substr(item.cardNo.length - 4,item.cardNo.length - 1);
        let bankcard = cardNo1 +' **** **** '+ cardNo2;
        return (
            <Image key={i} source={imageNo} style={styles.bankStyle}>
                <Text  style={[styles.bankNameStyle]}>{item.bankName}</Text>
                <Text  style={[styles.cardNoStyle]}>{bankcard}</Text>
            </Image>);
    };

    render() {
        let rightImageSource = require('../../images/user/bank_icon_add.png');
        return (
            <View style={styles.bodyView}>
                <NavigationBar
                    title={"银行卡"}
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                    rightShowIcon={true}
                    rightImageSource={rightImageSource}
                    rightBtnFunc={this._addBank.bind(this)}
                />
                <ScrollView>
                    {   !this.state.isEmpty?
                        this.state.details.map((item, i) => this.renderExpenseItem(item, i))
                        :
                        <View style={styles.moreBottom}>
                                <Text style={{color:'#999'}}>无银行卡信息,请先添加银行卡</Text>
                        </View>
                    }
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyView: {
        flex: 1,
        backgroundColor:'#fff',
    },
    textStyle: {
        marginTop:50/StyleConfig.oPx,
        fontSize:28/StyleConfig.oPx,
        color: '#333333',
    },

    bankStyle: {
        marginTop:40/StyleConfig.oPx,
        height:310/StyleConfig.oPx,
        width:StyleConfig.screen_width-120/StyleConfig.oPx,
        marginLeft:60/StyleConfig.oPx,
        marginRight:60/StyleConfig.oPx,
        flex: 1,
        backgroundColor:'transparent'
    },
    bankNameStyle: {
        marginTop:50/StyleConfig.oPx,
        marginLeft:70/StyleConfig.oPx,
        fontSize:28/StyleConfig.oPx,
        color: '#ffffff',
        zIndex:1000,
    },
    cardNoStyle: {
        marginTop:120/StyleConfig.oPx,
        marginLeft:40/StyleConfig.oPx,
        fontSize:28/StyleConfig.oPx,
        color: '#ffffff',
        zIndex:1000,
    },
    moreBottom:{
        marginTop:60/StyleConfig.oPx,
        height:80/StyleConfig.oPx,
        justifyContent:'center',
        alignItems:'center'
    },
});

