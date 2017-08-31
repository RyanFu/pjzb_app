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
    Alert,
    Navigator,
} from 'react-native';
import {StyleConfig} from '../../style';
let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
import Loading from '../../components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import { goBack } from '../../utils/NavigatorBack';
import NavigationBar from '../../components/NavigationBar';
let oPx = StyleConfig.oPx;

let imgCodeUrl= Request.HOST+'/shzc/shzc/imageCode.do?pageId=invest';
let imgCodeUrl_date=imgCodeUrl;
export default class repaymentPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog:false,
            payId:this.props.payId,
            forPI: '',
            id: '',
            lateFI: '',
            needSum: '',
            repayDate: '',
            totalSum: '',
            usableSum: '',

            pwd:'',
            code:'',
            imgCodeUrl:imgCodeUrl,
        };
    }

    //获取数据
    _getData(){
        let payId=this.state.payId;
        Request.post('findMyPayData.do',{uid:'',payId:payId},(data)=>{
            //console.log(JSON.stringify(data));
            console.log('data:'+data);
            console.log('msg:'+data.msg);
            if(data.error == 0){
                this.setState({
                    forPI:data.payMap.forPI,
                    lateFI: data.payMap.lateFI,
                    needSum: data.payMap.needSum,
                    repayDate: data.payMap.repayDate,
                    totalSum: data.payMap.totalSum,
                    usableSum: data.payMap.usableSum,
                    showDialog:false,
                });
                return;
            }else{
                Alert.alert("提示",data.msg);
                this.setState({
                    showDialog:false,
                });
            }

        },(error)=>{
            this.setState({
                showDialog:false,
            });
            Alert.alert("提示",'您的网络不稳定，请稍后再试！');
        });
    }
    componentDidMount(){
        this.setState({imgCodeUrl:imgCodeUrl});
        this.setState({showDialog:true});
        this._getData();
    }

    //回退
    _leftbtn(){
      goBack(this.props.navigator);
    }

    //刷新验证码
    _refleshImgCode(){
        imgCodeUrl_date=imgCodeUrl+'&d='+Date.now();
        this.setState({imgCodeUrl:imgCodeUrl_date});
    }

    //提交还款
    submit () {
        this.setState({showDialog:true});
        let payId=this.state.payId;
        let pwd=this.state.pwd;
        let code=this.state.code;
        let needSum=this.state.needSum;
        Request.post('submitRepay.do',{uid:'',code:code,id:payId,pwd:pwd,needSum:needSum},(data)=>{
            //console.log(JSON.stringify(data));
            console.log('data:'+data);
            console.log('msg:'+data.msg);
            if(data.error == 0){
                this.setState({
                });
                Alert.alert('提示',"还款成功！");
                goBack(this.props.navigator);
                return;
            }else{
                Alert.alert("提示",data.msg);
            }

        },(error)=>{
            Alert.alert('提示',"还款失败！");
            console.log(error);
        });

        this.setState({showDialog:false});
    }

    render() {
        //初始化状态栏
        let statusBar = <View style={{height:STATUS_BAR_HEIGHT}}></View>;
        return (
            <View style={{flex:1}}>
                <LinearGradient colors={['#f3553e', '#eb3549']} beginColor="transparent" style={styles.bodyView}>
                {statusBar}
                <NavigationBar
                    title="还款计划"
                    leftShowIcon={true}
                    leftBtnFunc={this._leftbtn.bind(this)}
                    withOutLinearGradient={true}
                />
                <View style={styles.topView}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>可用余额（元 ）</Text>
                        <Text numberOfLines={1} style={styles.leftText2}>{this.state.usableSum}</Text>
                    </View>
                    <View style={styles.rightView}>
                        <Text style={styles.rightText}>还款日期：{this.state.repayDate}</Text>
                        <Text style={styles.rightText}>待还本息：{this.state.forPI}元</Text>
                        <Text style={styles.rightText}>逾期本息：{this.state.lateFI}元   </Text>
                        <Text style={styles.rightText}>需还金额：{this.state.needSum}元</Text>
                    </View>
                </View>
                </LinearGradient>
                <View style={styles.marginTopColo}></View>
                <View style={styles.contentView}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.textInput}
                                   underlineColorAndroid="transparent"
                                   placeholder="交易密码"
                                   placeholderTextColor="#333"
                                   selectTextOnFocus={true}
                                   ref="pwd"
                                   secureTextEntry={true}
                                   onChangeText={(pwd) => this.setState({pwd})}
                        />
                    </View>

                    <View style={[styles.inputView,{marginBottom:60/oPx}]}>
                        <TextInput style={styles.textInput}
                                   underlineColorAndroid="transparent"
                                   placeholder="验证码"
                                   placeholderTextColor="#333"
                                   selectTextOnFocus={true}
                                   keyboardType="numeric"
                                   onChangeText={(code) => this.setState({code})}
                        />
                        <TouchableOpacity onPress={this._refleshImgCode.bind(this)} style={styles.imgCodeContainer}>
                            <Image ref="imgRef" style={styles.imgCode} source={{uri: this.state.imgCodeUrl }} />
                        </TouchableOpacity>

                    </View>

                    <Button text="还款" onPress={this.submit.bind(this)} width={StyleConfig.screen_width-60/oPx} />
                </View>
                <Loading show={this.state.showDialog} top={true}  />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    topView: {
        height: 291/oPx,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    leftView: {
        flex: 1,
        height: 291/oPx,
    },
    leftText1: {
        fontSize: 28/oPx,
        color: '#fff',
        marginTop: 80/oPx,
        marginLeft: 50/oPx,
    },
    leftText2: {
        fontSize: 60/oPx,
        color: '#fff',
        marginLeft: 50/oPx,
    },
    rightView: {
        flex: 1,
        height: 291/oPx,
        marginTop: 40/oPx,
        marginLeft: 85/oPx,
    },
    rightText: {
        fontSize: 24/oPx,
        color: '#fff',
        alignSelf : 'flex-start',
        lineHeight: 28,
    },
    contentView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    marginTopColo: {
        height: 16/oPx,
        width: StyleConfig.screen_width,
        backgroundColor: '#e9ecf3',
    },
    inputView: {
        width: StyleConfig.screen_width-40/oPx,
        height: 120/StyleConfig.oPx,
        marginLeft: 20/oPx,
        borderBottomColor: StyleConfig.borderColor,
        borderBottomWidth: StyleConfig.borderWidth,
        flexDirection:'row',
    },
    textInput: {
        flex: 1,
        height: 80/StyleConfig.oPx,
        marginLeft: 0/StyleConfig.oPx,
        marginTop: 50/StyleConfig.oPx,
        fontSize: 28/StyleConfig.oPx,
        color: "#333",
    },
    textInputCode: {
        flex: 2,
        height: 80/StyleConfig.oPx,
        marginLeft: 0/StyleConfig.oPx,
        marginTop: 50/StyleConfig.oPx,
        fontSize: 28/StyleConfig.oPx,
        color: "#333",
    },
    imgCodeContainer:{
        flex:1,
        paddingLeft:100/StyleConfig.oPx,
        paddingTop:30/StyleConfig.oPx,
    },
    imgCode:{
        flex:1,
        marginLeft: 10/StyleConfig.oPx,
        resizeMode:'cover',
    },
});
