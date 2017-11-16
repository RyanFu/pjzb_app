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
    Platform,
    Alert,
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import NavigationBar from '../../components/NavigationBar';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';
import MyPicker from './Picker';
import {toastShort} from '../../utils/Toast';

export default class EarningsCalculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            money: '',
            annualRate: '',
            time: '',
            repayWay: '1',
            repayWay1: '1',
            monAmt: '0.00',
            monRate: '0.00',
            allPay: '0.00',
            details: [],
            isIos:(Platform.OS === 'ios'),
            isToPicker:false,
            isToPicker1:false,
            defaultValue:'点击选择',
            defaultValue1:'点击选择',
            list:[
                {key:'等额本息还款',value:'1'},
                {key:'一次性还本付息',value:'2'},
                {key:'先息后本',value:'3'},
            ],
            list1:[
                {key:'月标',value:'1'},
                {key:'天标',value:'2'},
            ],
        }
    }
    //返回
    _goBack(){
      goBack(this.props.navigator);
    }
    //隐藏
    hide=(val) =>{
        this.setState({
            show: false,
            value: val
        });
    }
    onPressCalculate=()=>{
        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();        
        //判断输入框是否为空,输入的是否为数字
        if(this.state.money == ''){
            toastShort('投资金额不能为空',-300);
            return;
        }
        if(this.state.annualRate == ''){
            toastShort('年收益率不能为空',-300);
            return;
        }
        if(this.state.defaultValue1 == '点击选择' && this.state.isIos){
            toastShort('请选择投资类型',-300);
            return;
        }
        if(this.state.time == ''){
            toastShort('还款期限不能为空',-300);
            return;
        }
        if (this.state.repayWay1 == 1) {
            if(this.state.defaultValue == '点击选择' && this.state.isIos){
                toastShort('请选择计算方式',-300);
                return;
            }
        }

        //ajax
        let params = {
            repayWay: this.state.repayWay1 == 2 ? 2 : this.state.repayWay, 
            borrowSum:this.state.money, 
            yearRate:this.state.annualRate, 
            borrowTime:this.state.time,
            isDayThe:this.state.repayWay1,
        };
        //alert(this.state.repayWay);

        Request.post('toolsCalculate.do',params,(data)=>{
            if(data.error =='0'){
                this.setState({
                    monAmt: data.lists[0].monForRateA,
                    monRate: data.lists[0].monRate,
                    allPay: data.lists[0].allPay,
                    details:data.lists,
                });
            }else{
                toastShort(data.msg,-300);
            }
        },(error)=>{
            Alert.alert('提示',alert(error));
        });
    }

    renderExpenseItem=(item, i) =>{
        return (
        <View key={i} style={[styles.itemHeader,{backgroundColor:'#ffffff'}]}>
            <Text  style={[styles.headerText,{ paddingLeft:30/StyleConfig.oPx}]}>{item.mon}</Text>
            <Text  style={[styles.headerText]}>{item.monForRateA}</Text>
            <Text  style={[styles.headerText]}>{item.monForA}</Text>
            <Text  style={[styles.headerText]}>{item.monForRate}</Text>
            <Text  style={[styles.headerText]}>{item.rateARemain}</Text>
        </View>);
    }

    pickerItem(row, index) {
        return <Picker.Item label={row.key} value={row.key+'.'+row.value} key={index} />;
    }

    setValue (key,val) {
        if (key == null) {
            let value = val+'';
            let key = value.substring(0,value.indexOf('.'));
            let v = value.substring(value.indexOf('.')+1,value.length);
            this.setState({
                isToPicker: false,
                defaultValue: key,
                repayWay: v,
            })
        } else {
            if (val != null && val != '') {
                this.setState({
                    isToPicker: false,
                    defaultValue: key,
                    repayWay: val,
                })
            }
        }
        this.setState({
            isToPicker: false,
        })
    }

    setValue1 (key,val) {
        if (key == null) {
            let value = val+'';
            let key = value.substring(0,value.indexOf('.'));
            let v = value.substring(value.indexOf('.')+1,value.length);
            this.setState({
                isToPicker1: false,
                defaultValue1: key,
                repayWay1: v,
            })
        } else {
            if (val != null && val != '') {
                this.setState({
                    isToPicker1: false,
                    defaultValue1: key,
                    repayWay1: val,
                })
            }
        }
        this.setState({
            isToPicker1: false,
        })
    }

    getHKFSView() {
        if (this.state.isIos) {
            if (this.state.repayWay1 == 2) {
                return  <Text style={[styles.pickerText, {color: '#333'}]}>一次性还本付息</Text>;
            } else {
                return <Text onPress={() => {
                    this.setState({isToPicker:true});
                    const dismissKeyboard = require('dismissKeyboard');
                    dismissKeyboard();
                }} style={styles.pickerText}>{this.state.defaultValue}</Text>;
            }
        } else {
            if (this.state.repayWay1 == 2) {
                return  <Picker style = {[styles.pickerStyle]}
                             selectedValue={2}
                             onValueChange={(lang) => this.setState({repayWay: lang})}
                             mode='dropdown'
                        >
                            <Picker.Item label="一次性还本付息" value="2" />
                            <Picker.Item label="" value="2" />
                        </Picker>;
            } else {
                return  <Picker style = {[styles.pickerStyle]}
                             selectedValue={this.state.repayWay}
                             onValueChange={(lang) => this.setState({repayWay: lang})}
                             mode='dropdown'
                        >
                            <Picker.Item label="等额本息还款" value="1" />
                            <Picker.Item label="一次性还本付息" value="2" />
                            <Picker.Item label="先息后本" value="3" />
                        </Picker>;
            }
        }
    }

    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <NavigationBar
                  title={"收益计算器"}
                  leftShowIcon={true}
                  leftBtnFunc={this._goBack.bind(this)}
                />
                <ScrollView style={{flex: 1}}>
                <View style={[styles.topContainer]}>
                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>投资金额(元)</Text>
                        <TextInput style = {[styles.inputs]}
                                   underlineColorAndroid = "transparent"
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   placeholder= ""
                                   value = {this.state.money}
                                   onChangeText = {
                                       (money) =>{this.setState({money})}
                                   }/>
                    </View>

                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>年收益率(%)  </Text>
                        <TextInput style = {[styles.inputs]}
                                   underlineColorAndroid = "transparent"
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   placeholder= ""
                                   value = {this.state.annualRate}
                                   onChangeText = {
                                       (annualRate) =>{this.setState({annualRate})}
                                   }/>
                    </View>
                    
                    <View style={[styles.item]}>
                        <Text  style={[styles.text,{width:180/StyleConfig.oPx,}]}>投资类型</Text>
                        {
                            this.state.isIos
                                ?<Text onPress={() => {
                                    this.setState({isToPicker1:true});
                                    const dismissKeyboard = require('dismissKeyboard');
                                    dismissKeyboard();
                                }} style={styles.pickerText}>{this.state.defaultValue1}</Text>
                                :<Picker style = {[styles.pickerStyle]}
                                     selectedValue={this.state.repayWay1}
                                     onValueChange={(lang) => this.setState({repayWay1: lang})}
                                     mode='dropdown'
                                >
                                    <Picker.Item label="月标" value="1" />
                                    <Picker.Item label="天标" value="2" />
                                </Picker>
                        }
                    </View>

                    <View style={[styles.item]}>
                        <Text  style={[styles.text]}>还款期限        </Text>
                        <TextInput style = {[styles.inputs]}
                                   underlineColorAndroid = "transparent"
                                   clearButtonMode="while-editing"
                                   keyboardType="numeric"
                                   placeholder= ""
                                   value = {this.state.time}
                                   onChangeText = {
                                       (time) =>{this.setState({time})}
                                   }/>
                    </View>
                    <View style={[styles.item]}>
                        <Text  style={[styles.text,{width:180/StyleConfig.oPx,}]}>还款方式</Text>
                        { this.getHKFSView() }
                    </View>
                    <View style={[styles.btnContainer]}>
                        <Button
                            text={'开始计算'}
                            textColor={'#fff'}
                            onPress={this.onPressCalculate}
                            imgSource={require('../../images/other/password_btn.png')}
                            height={92/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                </View>
                <View style={[styles.bottomContainer]}>
                    <View style={[styles.bottomItem1]}>
                        <Text  style={[styles.bottomText]}>计算结果</Text>
                    </View>
                    <View style={[styles.bottomItem2]}>
                        <View style={[styles.itemList]}>
                            <Text  style={[styles.textFirst]}>
                            {
                                this.state.repayWay1 == 1 ? '每个月' : ''
                            }
                            将偿还/收到</Text>
                            <Text  style={[styles.textSecond,{color:'#eb3331'}]}>{this.state.monAmt}元</Text>
                        </View>
                        <View style={[styles.itemList]}>
                            <Text  style={[styles.textFirst]}>月利率</Text>
                            <Text  style={[styles.textSecond,{color:'#319bff'}]}>{this.state.monRate}%</Text>

                        </View>
                        <View style={[styles.itemList]}>
                            <Text  style={[styles.textFirst]}>还款/收到本息总额</Text>
                            <Text  style={[styles.textSecond,{color:'#eb3331'}]}>{this.state.allPay}元</Text>
                        </View>
                    </View>
                    <View style={[styles.bottomItem3]}>
                        <View style={[styles.itemHeader]}>
                            <Text  style={[styles.headerText,{ paddingLeft:30/StyleConfig.oPx}]}>期数</Text>
                            <Text  style={[styles.headerText]}>{this.state.repayWay1 == 1 ? '月' : '应'}还本息</Text>
                            <Text  style={[styles.headerText]}>{this.state.repayWay1 == 1 ? '月' : '应'}还本金</Text>
                            <Text  style={[styles.headerText]}>{this.state.repayWay1 == 1 ? '月' : '应'}还利息</Text>
                            <Text  style={[styles.headerText]}>本息余额</Text>
                        </View>
                        <View sytle={{flex:1}}>
                            {
                                this.state.details.map((item,i)=>this.renderExpenseItem(item,i))
                            }
                        </View>
                    </View>
                </View>
                </ScrollView>
                <MyPicker show={this.state.isToPicker} list={this.state.list} listMethod={this.pickerItem.bind(this)}  valMethod={this.setValue.bind(this)} />
                <MyPicker show={this.state.isToPicker1} list={this.state.list1} listMethod={this.pickerItem.bind(this)}  valMethod={this.setValue1.bind(this)} />
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
        paddingLeft:30/StyleConfig.oPx,
        paddingRight:30/StyleConfig.oPx,
        paddingBottom:20/StyleConfig.oPx,
        width:StyleConfig.screen_width,
        backgroundColor:'#ffffff'
    },
    item:{
        flexDirection: 'row',
        height:88/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderBottomWidth:1,
        borderColor:'#cccccc',
        alignItems: 'flex-start',
    },
    text:{
        marginTop: 25/StyleConfig.oPx,
        backgroundColor:'transparent',
        color:'#333333',
        fontSize:28/StyleConfig.oPx,
    },
    inputs: {
        marginLeft:100/StyleConfig.oPx,
        width:400/StyleConfig.oPx,
        fontSize:28/StyleConfig.oPx,
        color:'#333333'
    },
    /**上半部分选择器样式*/
    pickerStyle:{
        marginLeft:80/StyleConfig.oPx,
        marginTop:12/StyleConfig.oPx,
        height:60/StyleConfig.oPx,
        width:StyleConfig.screen_width-280/StyleConfig.oPx,
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
        marginTop:32/StyleConfig.oPx,
    },
    /**下半部分布局内容*/
    bottomContainer: {
        flex:1,
        marginTop:16/StyleConfig.oPx,
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
    pickerText: {
        fontSize: 28/StyleConfig.oPx,
        color: '#319bff',
        backgroundColor: 'transparent',
        marginTop: 28/StyleConfig.oPx,
        marginLeft: 100/StyleConfig.oPx,
    },
});

// 输出，这里千万别忘记
module.exports = EarningsCalculator;
