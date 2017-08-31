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
    TouchableOpacity,
    ScrollView,
    Picker,
    Alert,
    LayoutAnimation,
    Platform,
    Keyboard,
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import NavigationBar from '../../components/NavigationBar';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';
import Utils from '../../utils/utils';
import {toastShort} from '../../utils/Toast';
import MyPicker from './Picker';
import styles1 from '../../style/rechargeWithdraw.js';

export default class AddAssignmentDebt extends Component{
    constructor(props) {
        super(props);
        this.state = {
            canDebtsAmt: '',
            auctionDays: '',
            claimmPrice: '',
            //claimmPwd: '',
            tips: '',
            details: [],
            list: [],
            isIos:(Platform.OS === 'ios'),
            isShow:true,
            isToPicker:false,
            valueList:[
                {text:'请选择'},
                {text:'1'},
                {text:'2'},
                {text:'3'},
                {text:'4'},
                {text:'5'},
                {text:'6'},
                {text:'7'},
                {text:'8'}
            ],
            defaultValue: '请选择',
        }
    }
    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    //刷新上一个页面
    _refreshPreviousPage(){
        this.props.callback(false,1);
        goBack(this.props.navigator);
    }

    componentDidMount(){
        this._getData();
        LayoutAnimation.spring();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{this.setState({isShow:false})});
        this.state.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{this.setState({isShow:true})});
    }
    //获取数据
    _getData(){
        this.setState({
            list: this.props.list,
            canDebtsAmt:(parseFloat(this.props.list.recivedPrincipal)-parseFloat(this.props.list.hasPrincipal)).toFixed(2),
        });
    }

    //进行转让
    onPressDept=()=>{
        let canDebtsAmt = this.state.canDebtsAmt;
        //转让期限
        let auctionDays = this.state.auctionDays;
        //转让price
        let claimmPrice = this.state.claimmPrice;
        //交易密码
        //let claimmPwd = this.state.claimmPwd;
        //转让描述
        let tips = this.state.tips;

        if(auctionDays == ''){
            toastShort('请输入转让期限',100);
            return;
        }
        if(claimmPrice == ''){
            toastShort('请输入转让价格',100);
            return;
        }

        if(Utils.isMoney(claimmPrice)){
            toastShort('请输入正确金额',100);
            return;
        }

        // if(claimmPwd == ''){
        //     toastShort('请输入交易密码',100);
        //     return;
        // }

        var maxClaimm = canDebtsAmt*1.1;
        var minClaimm = canDebtsAmt*0.5;
        if((claimmPrice>maxClaimm) || (claimmPrice<minClaimm)){
            toastShort('转让价格范围为'+minClaimm.toFixed(2)+'到'+maxClaimm.toFixed(2)+'元之间,请重新输入',100);
            return;
        }

        //ajax
        let params = {
            uid:'',
            debtLimit:this.state.list.remainBorrowLimit,
            auctionDays:auctionDays,
            auctionBasePrice:claimmPrice,
            // dealpwd:claimmPwd,
            borrowId:this.state.list.borrowId,
            investId:this.state.list.investId,
            debtSum:canDebtsAmt,
            details:tips};

        Request.post('debtsAssignment.do',params,(data)=>{
            if(data.error =='0'){
                Alert.alert(
                    '提示',
                    data.msg,
                    [{text: '确定', onPress: () => this._refreshPreviousPage()},]
                );
                //刷新上一个页面
            }else{
                Alert.alert('提示', data.msg);
            }
        },(error)=>{
            Alert.alert('提示', '您的网络不稳定，请稍后再试！');
        });
    }

     getItem = () => {
        if (this.state.isIos) {
            return <Text onPress={() => {this.setState({isToPicker:{true}});const dismissKeyboard = require('dismissKeyboard');dismissKeyboard();}} style={styles.pickerText}>{this.state.defaultValue}</Text>
        }
        else {
            return <Picker style = {[styles.pickerStyle]}
                        selectedValue={this.state.auctionDays}
                        onValueChange={(lang) => this.setState({auctionDays: lang})}
                        mode='dropdown'
                    >
                        <Picker.Item label="请选择" value="" />
                        <Picker.Item label="1天" value="1" />
                        <Picker.Item label="2天" value="2" />
                        <Picker.Item label="3天" value="3" />
                        <Picker.Item label="5天" value="5" />    
                        <Picker.Item label="7天" value="7" />
                        <Picker.Item label="8天" value="8" />
                    </Picker>
        }
    }

    pickerItem1(row, index) {
        return <Picker.Item label={row.text!='请选择'?row.text+"天":row.text} value={row.text} key={index} />;
    }

    defaultValue = (value) => {
        if (value) {
            this.setState({
                isToPicker: false,
                defaultValue: value=='请选择'?'请选择':value+"天",
                auctionDays: value=='请选择'?'':value,
            })
        }
        this.setState({
            isToPicker: false,
        })
    }

    render(){
        return (

            <View style={[styles.flex, styles.body]}>
                <NavigationBar
                  title={"债权转让"}
                  leftShowIcon={true}
                  leftBtnFunc={this._goBack.bind(this)}
                />
                <View style={[styles.topContainer]}>
                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>转让期限</Text>
                        
                        {this.getItem()}        

                    </View>
                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>债权金额(元)</Text>
                        <TextInput style = {[styles.inputs]}
                                   underlineColorAndroid = "transparent"
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   placeholder= ""
                                   editable={false}
                                   value = {this.state.canDebtsAmt}/>
                    </View>
                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>转让价格(元)</Text>
                        <TextInput style = {[styles.inputs]}
                                   underlineColorAndroid = "transparent"
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   placeholder= "请输入转让价格"
                                   value = {this.state.claimmPrice}
                                   onChangeText = {
                                       (claimmPrice) =>{this.setState({claimmPrice})}
                                   }/>
                    </View>

                    {/*<View style={[styles.item]}>*/}
                        {/*<Text  style={[styles.text]}>交易密码</Text>*/}
                        {/*<TextInput style = {[styles.inputs]}*/}
                                   {/*clearButtonMode="while-editing"*/}
                                   {/*placeholder= "请输入交易密码"*/}
                                   {/*secureTextEntry={true}*/}
                                   {/*value = {this.state.claimmPwd}*/}
                                   {/*onChangeText = {*/}
                                      {/*(claimmPwd) =>{this.setState({claimmPwd})}*/}
                                   {/*}/>*/}
                    {/*</View>*/}
                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>转让描述</Text>
                        <TextInput style = {[styles.inputs]}
                                   clearButtonMode="while-editing"
                                   placeholder= "请输入转让描述"
                                   value = {this.state.tips}
                                   onChangeText = {
                                       (tips) =>{this.setState({tips})}
                                   }/>
                    </View>
                    <View style={[styles.btnContainer]}>
                        <Button
                            text={'转让'}
                            textColor={'#fff'}
                            onPress={this.onPressDept}
                            imgSource={require('../../images/other/password_btn.png')}
                            height={92/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                    <View style={[styles.itemBeizhu]}>
                        <Text  style={[styles.textBeizhu]}><Text  style={{color:'#333333'}}>备注：</Text>转让价格不能低于原债权金额的50%，不能高于债权原金额的110%</Text>
                    </View>
                </View>
                <MyPicker show={this.state.isToPicker} list={this.state.valueList} listMethod={this.pickerItem1.bind(this)}  valMethod={this.defaultValue} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    body:{
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        backgroundColor:'#e9ecf3'
    },
    flex: {
        flex: 1  //平分填满父空间。
    },
    /**上半部分布局内容*/
    topContainer: {
        marginTop:16/StyleConfig.oPx,
        paddingLeft:30/StyleConfig.oPx,
        paddingRight:30/StyleConfig.oPx,
        height:StyleConfig.screen_height,
        width:StyleConfig.screen_width,
        backgroundColor:'#ffffff'
    },
    item:{
        flexDirection: 'row',
        height:120/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderBottomWidth:1,
        borderColor:'#cccccc'
    },
    itemBeizhu:{
        marginTop:50/StyleConfig.oPx,
        paddingLeft:15/StyleConfig.oPx,
        paddingRight:15/StyleConfig.oPx,
        flexDirection: 'row',
        height:120/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderWidth:1,
        justifyContent:"center",
        alignItems: 'center',
        backgroundColor:'#FFF5DB',
        borderColor:'#F5C77F'
    },
    textBeizhu:{
        backgroundColor:'transparent',
        color:'#999F9F',
        fontSize:28/StyleConfig.oPx,
    },
    text:{
        paddingTop:56/StyleConfig.oPx,
        backgroundColor:'transparent',
        color:'#333333',
        fontSize:28/StyleConfig.oPx,
    },
    inputs: {
        marginTop:36/StyleConfig.oPx,
        paddingLeft:36/StyleConfig.oPx,
        width:470/StyleConfig.oPx,
        fontSize:28/StyleConfig.oPx,
        color:'#333333'
    },
    /**上半部分选择器样式*/
    pickerStyle:{
        marginLeft:80/StyleConfig.oPx,
        marginTop:44/StyleConfig.oPx,
        height:70/StyleConfig.oPx,
        width:StyleConfig.screen_width-290/StyleConfig.oPx,
    },
    /**选择器下拉图片样式*/
    dropDownImg:{
        height:18/StyleConfig.oPx,
        width:34/StyleConfig.oPx,
        marginTop:34/StyleConfig.oPx,
    },
    btnContainer:{
        height:92/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:60/StyleConfig.oPx,
    },
    /**下半部分布局内容*/
    bottomContainer: {
        marginTop:16/StyleConfig.oPx,
        height:StyleConfig.screen_height,
        width:StyleConfig.screen_width,
        backgroundColor:'#ffffff'
    },

    /**计算结果*/
    bottomItem1:{
        flexDirection: 'row',
        height:68/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#e0e0e0'
    },
    bottomText:{
        backgroundColor:'transparent',
        color:'#333333',
        fontSize:36/StyleConfig.oPx,
    },
    /**计算结果明细*/
    bottomItem2:{
        height:246/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        paddingTop:16/StyleConfig.oPx,
        paddingBottom:16/StyleConfig.oPx,
    },
    itemList:{
        height:72/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        flexDirection: 'row',
        alignItems:'center',
    },
    textFirst:{
        width:StyleConfig.screen_width/1.5,
        backgroundColor:'transparent',
        color:'#5c5c5c',
        fontSize:28/StyleConfig.oPx,
        paddingLeft:30/StyleConfig.oPx,
    },
    textSecond:{
        backgroundColor:'transparent',
        fontSize:28/StyleConfig.oPx,
    },
    bottomItem3:{
        flex: 1,
        backgroundColor:'#ffffff'
    },
    itemHeader:{
        height:80/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        backgroundColor:'#e9ecf3',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    headerTextMin:{
        fontSize:22/StyleConfig.oPx,
        width:(StyleConfig.screen_width-20/StyleConfig.oPx)/9,
    },
    headerText:{
        fontSize:22/StyleConfig.oPx,
        //width:(StyleConfig.screen_width-20/StyleConfig.oPx)*8/9/4,
        width:(StyleConfig.screen_width-30/StyleConfig.oPx)/5,
    },
    pickerText:{
        fontSize: 28/StyleConfig.oPx,
        color: '#319bff',
        backgroundColor: 'transparent',
        marginTop: 55/StyleConfig.oPx,
        marginLeft: 90/StyleConfig.oPx,
    }

});

// 输出，这里千万别忘记
module.exports = AddAssignmentDebt;
