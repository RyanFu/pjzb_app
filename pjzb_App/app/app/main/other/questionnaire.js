import React, { Component } from 'react';

import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    Picker,
    Platform
} from 'react-native';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import { StyleConfig } from '../../style';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import couponCard from '../user/couponCard';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {toastShort} from '../../utils/Toast';

export default class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            region: '北京市',
            profession: '政府事业单位员工',
            text: '',
            strMap: new Map(),
            isChecked: false,
            checkBoxValue1: new Map(),
            checkBoxValue2: new Map(),
            showDialog:false,
        });
        this.onSelect = this.onSelect.bind(this);
        this.state.strMap.set('age', '');
        this.state.strMap.set('sex', '');
        this.state.strMap.set('area', '北京市');
        this.state.strMap.set('professional', '政府事业单位员工');
        this.state.strMap.set('houseHoldIncome', '');
        this.state.strMap.set('financialTime', '');
        this.state.strMap.set('financialNum', '');
        this.state.strMap.set('financialLong', '');
        this.state.strMap.set('knowNetworkPlatform', '');
        this.state.strMap.set('financialMoney', '');
        this.state.strMap.set('financialMoneyRatio', '');
        this.state.strMap.set('financialMoneySource', '');
        this.state.strMap.set('financialReason', '');
        this.state.strMap.set('financialThinkValue', 'test');
        this.state.strMap.set('majorFocus', 'test');
        this.state.strMap.set('financialEarning', '');
        this.state.strMap.set('investWilling', '');
        this.state.strMap.set('financialConvenient', '');
        this.state.strMap.set('knowPujinziben', '');

        this.state.checkBoxValue1.set('financialThinkValue1', null);
        this.state.checkBoxValue2.set('majorFocus1', null);
    }

    onSelect(issue, index, value){
        this.state.strMap.set(issue, value);
        if (issue == 'area') {
            this.setState({region: value});
        } else if (issue == 'professional') {
            this.setState({profession: value});
        }
    }


    //返回
   _goBack(){
       goBack(this.props.navigator);
   }
    submit = () => {
        // 判断非空
        let num = 0;
        for(var [name, value] of this.state.strMap) {
            num++;
            if (value== null || value == '') {
                toastShort('第'+(num)+'项选项不能为空',-120);
                //Alert.alert('提示','第'+(num)+'项选项不能为空');
                return;
            }
        }

        // 把多选值拼接成字符串
        let val1 = '';
        for (var[name, value] of this.state.checkBoxValue1) {
            if (value != null) {
                val1 += value + '|';
            }
        }
        if (val1 != '') {
            this.state.strMap.set('financialThinkValue', val1.substr(0,val1.length-1));
        } else {
            toastShort('第14项选项不能为空',-120);
            //Alert.alert('提示','第14项选项不能为空');
            return;
        }

        let val2 = '';
        for (var[name, value] of this.state.checkBoxValue2) {
            if (value != null) {
                val2 += value + '|';
            }
        }
        if (val2 != '') {
            this.state.strMap.set('majorFocus', val2.substr(0,val2.length-1));
        } else {
            toastShort('第15项选项不能为空',-120);
            //Alert.alert('提示','第15项选项不能为空');
            return;
        }

        // 提交数据
        this.setState({showDialog:true});
        Request.post('addQuestionSurvey.do', {
            uid:'',
            age:this.state.strMap.get('age'),
            sex:this.state.strMap.get('sex'),
            area:this.state.strMap.get('area'),
            professional:this.state.strMap.get('professional'),
            houseHoldIncome:this.state.strMap.get('houseHoldIncome'),
            financialTime:this.state.strMap.get('financialTime'),
            financialNum:this.state.strMap.get('financialNum'),
            financialLong:this.state.strMap.get('financialLong'),
            knowNetworkPlatform:this.state.strMap.get('knowNetworkPlatform'),
            financialMoney:this.state.strMap.get('financialMoney'),
            financialMoneyRatio:this.state.strMap.get('financialMoneyRatio'),
            financialMoneySource:this.state.strMap.get('financialMoneySource'),
            financialReason:this.state.strMap.get('financialReason'),
            financialThinkValue:this.state.strMap.get('financialThinkValue'),
            majorFocus:this.state.strMap.get('majorFocus'),
            financialEarning:this.state.strMap.get('financialEarning'),
            investWilling:this.state.strMap.get('investWilling'),
            financialConvenient:this.state.strMap.get('financialConvenient'),
            knowPujinziben:this.state.strMap.get('knowPujinziben'),
        }, (data)=>{
            this.setState({showDialog:false});
            if(data.error == '0'){
                global.surveyCount = true;
                Alert.alert(
                   '提示信息',
                   data.msg,
                   [
                       {text: '取消' },
                       {text: '使用', onPress: () => this.props.navigator.replace({component:couponCard,name:'couponCard'})},
                   ]
               )
            }else{
                Alert.alert('提示',data.msg);
            }
        },(error)=>{
            this.setState({showDialog:false});
        });
    };

    onClick = (isCheck, value, index,i) => {
        if (isCheck) {
            if (index == 14)
                this.state.checkBoxValue1.set('financialThinkValue'+i, value);
            else
                this.state.checkBoxValue2.set('majorFocus'+i, value);
        } else {
            if (index == 14)
                this.state.checkBoxValue1.set('financialThinkValue'+i, null);
            else
                this.state.checkBoxValue2.set('majorFocus'+i, null);
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <NavigationBar
                 title={"问券调查"}
                 leftShowIcon={true}
                 leftBtnFunc={this._goBack.bind(this)}
                />
                <ScrollView >
                    <View style={styles.doubtView}>
                        {/* 1 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>1、您的年龄</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('age', index, value)} color="#ef4547">
                                <RadioButton value={'18-25'} ><Text>18-25</Text></RadioButton>
                                <RadioButton value={'25-35'} ><Text>25-35</Text></RadioButton>
                                <RadioButton value={'35-45'} ><Text>35-45</Text></RadioButton>
                                <RadioButton value={'45-60'} ><Text>45-60</Text></RadioButton>
                                <RadioButton value={'60以上'} ><Text>60以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 2 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>2、您的性别</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('sex', index, value)} color="#ef4547">
                                <RadioButton value={'男'} ><Text>男</Text></RadioButton>
                                <RadioButton value={'女'} ><Text>女</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 3 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>3、您所在地区</Text>
                            <Picker
                                style={Platform.OS === 'android'?styles.xiala:null}
                                mode='dropdown'
                                selectedValue={this.state.region}
                                onValueChange={(region) => this.onSelect('area', 0, region)}>
                                <Picker.Item label="北京市" value="北京市" />
                                <Picker.Item label="天津市" value="天津市" />
                                <Picker.Item label="上海市" value="上海市" />
                                <Picker.Item label="重庆市" value="重庆市" />
                                <Picker.Item label="河北省" value="河北省" />
                                <Picker.Item label="山西省" value="山西省" />
                                <Picker.Item label="辽宁省" value="辽宁省" />
                                <Picker.Item label="吉林省" value="吉林省" />
                                <Picker.Item label="黑龙江省" value="黑龙江省" />
                                <Picker.Item label="江苏省" value="江苏省" />
                                <Picker.Item label="浙江省" value="浙江省" />
                                <Picker.Item label="安徽省" value="安徽省" />
                                <Picker.Item label="福建省" value="福建省" />
                                <Picker.Item label="江西省" value="江西省" />
                                <Picker.Item label="山东省" value="山东省" />
                                <Picker.Item label="河南省" value="河南省" />
                                <Picker.Item label="湖北省" value="湖北省" />
                                <Picker.Item label="湖南省" value="湖南省" />
                                <Picker.Item label="广东省" value="广东省" />
                                <Picker.Item label="海南省" value="海南省" />
                                <Picker.Item label="四川省" value="四川省" />
                                <Picker.Item label="贵州省" value="贵州省" />
                                <Picker.Item label="云南省" value="云南省" />
                                <Picker.Item label="陕西省" value="陕西省" />
                                <Picker.Item label="甘肃省" value="甘肃省" />
                                <Picker.Item label="青海省" value="青海省" />
                                <Picker.Item label="台湾省" value="台湾省" />
                                <Picker.Item label="内蒙古自治区" value="内蒙古自治区" />
                                <Picker.Item label="广西壮族自治区" value="广西壮族自治区" />
                                <Picker.Item label="西藏自治区" value="西藏自治区" />
                                <Picker.Item label="宁夏回族自治区" value="宁夏回族自治区" />
                                <Picker.Item label="新疆维吾尔自治区" value="新疆维吾尔自治区" />
                                <Picker.Item label="香港特别行政区" value="香港特别行政区" />
                                <Picker.Item label="澳门特别行政区" value="澳门特别行政区" />
                            </Picker>
                        </View>
                        {/* 4*/}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>4、您目前的职业类别</Text>
                            <Picker
                                style={Platform.OS === 'android'?styles.xiala:null}
                                mode='dropdown'
                                selectedValue={this.state.profession}
                                onValueChange={(profession) => this.onSelect('professional', 0, profession)}>
                                <Picker.Item label="政府事业单位员工" value="政府事业单位员工" />
                                <Picker.Item label="自由投资人" value="自由投资人" />
                                <Picker.Item label="金融从业人员" value="金融从业人员" />
                                <Picker.Item label="民营企业员工" value="民营企业员工" />
                                <Picker.Item label="个体工商户" value="个体工商户" />
                                <Picker.Item label="学生" value="学生" />
                                <Picker.Item label="其他" value="其他" />
                            </Picker>
                        </View>
                        {/* 5 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>5、您的家庭的年收入</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('houseHoldIncome', index, value)} color="#ef4547">
                                <RadioButton value={'0-5万'} ><Text>0-5万</Text></RadioButton>
                                <RadioButton value={'5-10万'} ><Text>5-10万</Text></RadioButton>
                                <RadioButton value={'10-20万'} ><Text>10-20万</Text></RadioButton>
                                <RadioButton value={'20-50万'} ><Text>20-50万</Text></RadioButton>
                                <RadioButton value={'50万以上'} ><Text>50万以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 6 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>6、您通过p2p网络借贷理财有多久</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialTime', index, value)} color="#ef4547">
                                <RadioButton value={'半年以内'} ><Text>半年以内</Text></RadioButton>
                                <RadioButton value={'半年至一年'} ><Text>半年至一年</Text></RadioButton>
                                <RadioButton value={'1-2年'} ><Text>1-2年</Text></RadioButton>
                                <RadioButton value={'2-3年'} ><Text>2-3年</Text></RadioButton>
                                <RadioButton value={'3年以上'} ><Text>3年以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 7 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>7、您目前参与投入资金的p2p网络借贷平台数量有多少？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialNum', index, value)} color="#ef4547">
                                <RadioButton value={'1-2个'} ><Text>1-2个</Text></RadioButton>
                                <RadioButton value={'3-5个'} ><Text>3-5个</Text></RadioButton>
                                <RadioButton value={'6-8个'} ><Text>6-8个</Text></RadioButton>
                                <RadioButton value={'8个以上'} ><Text>8个以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 8 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>8、您目前投资的理财产品，期限是多长？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialLong', index, value)} color="#ef4547">
                                <RadioButton value={'1个月以内'} ><Text>1个月以内</Text></RadioButton>
                                <RadioButton value={'1-3个月'} ><Text>1-3个月</Text></RadioButton>
                                <RadioButton value={'3-6个月'} ><Text>3-6个月</Text></RadioButton>
                                <RadioButton value={'6-12个月'} ><Text>6-12个月</Text></RadioButton>
                                <RadioButton value={'12个月以上'} ><Text>12个月以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 9 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>9、您通过什么途径了解网贷这些平台？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('knowNetworkPlatform', index, value)} color="#ef4547">
                                <RadioButton value={'报刊广告'} ><Text>报刊广告</Text></RadioButton>
                                <RadioButton value={'网上查询'} ><Text>网上查询</Text></RadioButton>
                                <RadioButton value={'朋友推荐'} ><Text>朋友推荐</Text></RadioButton>
                                <RadioButton value={'其他'} ><Text>其他</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 10 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>10、您在P2P网络借贷市场的平均理财金额大概是？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialMoney', index, value)} color="#ef4547">
                                <RadioButton value={'2万以内'} ><Text>2万以内</Text></RadioButton>
                                <RadioButton value={'2-5万'} ><Text>2-5万</Text></RadioButton>
                                <RadioButton value={'5-10万'} ><Text>5-10万</Text></RadioButton>
                                <RadioButton value={'10-20万'} ><Text>10-20万</Text></RadioButton>
                                <RadioButton value={'30万以上'} ><Text>30万以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 11 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>11、您在P2P网络借贷市场的理财资金占您整个理财资金的比例大概是？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialMoneyRatio', index, value)} color="#ef4547">
                                <RadioButton value={'5%以内'} ><Text>5%以内</Text></RadioButton>
                                <RadioButton value={'5-10%'} ><Text>5-10%</Text></RadioButton>
                                <RadioButton value={'10-20%'} ><Text>10-20%</Text></RadioButton>
                                <RadioButton value={'20-30%'} ><Text>20-30%</Text></RadioButton>
                                <RadioButton value={'50%以上'} ><Text>50%以上</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 12 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>12、您目前在P2P网络借贷市场理财资金的主要来源是？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialMoneySource', index, value)} color="#ef4547">
                                <RadioButton value={'工资性收入'} ><Text>工资性收入</Text></RadioButton>
                                <RadioButton value={'代他人理财'} ><Text>代他人理财</Text></RadioButton>
                                <RadioButton value={'信用卡'} ><Text>信用卡</Text></RadioButton>
                                <RadioButton value={'其他'} ><Text>其他</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 13 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>13、是什么因素吸引您通过P2P网络借贷投资？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialReason', index, value)} color="#ef4547">
                                <RadioButton value={'收益高'} ><Text>收益高</Text></RadioButton>
                                <RadioButton value={'安全性高'} ><Text>安全性高</Text></RadioButton>
                                <RadioButton value={'风险小'} ><Text>风险小</Text></RadioButton>
                                <RadioButton value={'新奇想要尝试'} ><Text>新奇想要尝试</Text></RadioButton>
                                <RadioButton value={'便利性'} ><Text>便利性</Text></RadioButton>
                                <RadioButton value={'其他'} ><Text>其他</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 14 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>14、您所投P2P网络借贷平台您最看重哪方面？</Text>
                            <Text style={styles.items_text}>        (可多项选择）</Text>
                            <View style={styles.check}><CheckBox index="14" i="1" text="收益率  " textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="14" i="2" text="风险控制" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="14" i="3" text="理财产品品种" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="14" i="4" text="线下资源" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="14" i="5" text="商业模式" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="14" i="6" text="服务" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                        </View>
                        {/* 15 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>15、您所投P2P网络借贷平台您最看重哪方面？</Text>
                            <Text style={styles.items_text}>        (可多项选择）</Text>
                            <View style={styles.check}><CheckBox index="15" i="11" text="平台对借款人的评级" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="12" text="借款人通过的资料认证" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="13" text="借款人的抵押品" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="14" text="借款人的年收入" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="15" text="借款人的学历" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="16" text="借款人在平台的借款记录" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                            <View style={styles.check}><CheckBox index="15" i="17" text="其他" textStyle={{color: '#777777', marginLeft: 16/StyleConfig.oPx, fontSize: 28/StyleConfig.oPx}} textAtBehind={true} isCheck={false} onClick={this.onClick} /></View>
                        </View>
                        {/* 16 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>16、您投资网贷目前获利情况如何？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialEarning', index, value)} color="#ef4547">
                                <RadioButton value={'超出预算'} ><Text>超出预算</Text></RadioButton>
                                <RadioButton value={'与预期一样'} ><Text>不如预期</Text></RadioButton>
                                <RadioButton value={'不如预期'} ><Text>不如预期</Text></RadioButton>
                                <RadioButton value={'还不知道'} ><Text>还不知道</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 17 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>17、您会继续在p2p网贷平台上投资理财吗？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('investWilling', index, value)} color="#ef4547">
                                <RadioButton value={'会'} ><Text>会</Text></RadioButton>
                                <RadioButton value={'不会'} ><Text>不会</Text></RadioButton>
                                <RadioButton value={'不一定，看情况'} ><Text>不一定，看情况</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 18 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>18、您觉得p2p网贷平台是否给您的理财带来多大的便</Text>
                            <Text style={styles.items_text}>        利？满意度低到高</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('financialConvenient', index, value)} color="#ef4547">
                                <RadioButton value={'1'} ><Text>1</Text></RadioButton>
                                <RadioButton value={'2'} ><Text>2</Text></RadioButton>
                                <RadioButton value={'3'} ><Text>3</Text></RadioButton>
                                <RadioButton value={'4'} ><Text>4</Text></RadioButton>
                                <RadioButton value={'5'} ><Text>5</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        {/* 19 */}
                        <View style={styles.items}>
                            <Text style={styles.items_text}>19、您是通过什么途径知道普金资本？</Text>
                            <RadioGroup onSelect = {(index, value) => this.onSelect('knowPujinziben', index, value)} color="#ef4547">
                                <RadioButton value={'网上查询'} ><Text>网上查询</Text></RadioButton>
                                <RadioButton value={'朋友推荐'} ><Text>朋友推荐</Text></RadioButton>
                                <RadioButton value={'宣传广告'} ><Text>宣传广告</Text></RadioButton>
                                <RadioButton value={'其他'} ><Text>其他</Text></RadioButton>
                            </RadioGroup>
                        </View>
                        <View style={styles.btnView}>
                            <Button text="提交" textColor={'#fff'} onPress={this.submit}
                                    imgSource={require('../../images/other/icon_summit.png')}
                                    height={96/StyleConfig.oPx}
                                    width={690/StyleConfig.oPx}
                            ></Button>
                        </View>
                    </View>
                </ScrollView>
                <Loading show={this.state.showDialog} top={true}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    doubtView: {
        flex:1,
        width: 720/StyleConfig.oPx,
        marginLeft: 30/StyleConfig.oPx,
    },
    items: {
        marginTop: 50/StyleConfig.oPx,
    },
    items_text: {
        fontSize: 28/StyleConfig.oPx,
        color: '#333333',
    },
    check: {
        marginLeft: 43/StyleConfig.oPx,
        marginTop: 30/StyleConfig.oPx,
    },
    xiala: {
        marginLeft: 43/StyleConfig.oPx,
        marginTop: 20/StyleConfig.oPx,
        width: 350/StyleConfig.oPx,
        height: 65/StyleConfig.oPx,
        borderBottomWidth: 1/StyleConfig.borderWidth,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
    },
    btnView: {
        marginTop: 60/StyleConfig.oPx,
        marginBottom: 90/StyleConfig.oPx,
        width: 695/ StyleConfig.oPx,
        height: 96/StyleConfig.oPx,
    },
});