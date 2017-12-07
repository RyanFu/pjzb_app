/**
 * Created by zlx on 2017/02/25.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    TextInput,
    Animated,
    Alert,
    Easing,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import { goBack } from '../../utils/NavigatorBack';
import LinearGradient from 'react-native-linear-gradient';
import Request from '../../utils/Request';
import OwebView from '../../components/OwebView';
import Loading from '../../components/Loading';
import styles1 from '../../style/funddetail';
import {StyleConfig} from '../../style';
import styles from '../../style/investDetail';
import InvestDetail from './InvestDetail';
import Utils from '../../utils/utils'; 
import Error from '../error/Error.js';

const oPx = StyleConfig.oPx;
export default class InvestDetailTY extends Component {
    constructor(props){
        super(props);
        this.state = {
            toTopAnim:new Animated.Value(0),
            debtId:'',
            debtTitle:'',
            // 转让总额
            auctionBasePrice: 0,
            // 剩余认购时间
            publishTime: '',
            // 时间状态
            debtStatus: '',
            date: '已认购',
            // 注册时间
            createTime:'',
            debtsDetail: [],
            borrowDetailMap: [],
            debtUserMap:[],
            borrowId:'',
            animating:true,
            isRefreshing:false,
            isDate:true,
            // 是否发生网络错误
            isError: false,
        }
    }

    componentDidMount() {
        this.setState({
            debtId:this.props.debtId,
            debtTitle:this.props.debtTitle,
        });
        this._getData();
    }

    _getData(){
        this.setState({animating:true,});
        Request.post('findDebtsById.do',{
            debtId:this.props.debtId,
            uid:'',
        },(data)=>{
            if(data.error=='0'){
                this.setState({
                   borrowId:data.borrowDetailMap.id,
                    animating:false,
                    isRefreshing:false,
                    borrowDetailMap:data.borrowDetailMap,
                    debtUserMap:data.debtUserMap == null ? '' : data.debtUserMap,
                    debtStatus:data.debtsDetail.debtStatus,
                    createTime:data.userInfo.createTime,
                    debtsDetail:data.debtsDetail,
                    isError: false
                });
                this.getPublishTime();
            }else{
                Alert.alert('提示',data.msg);
                this.setState({animating:false});
            }
        },(error)=>{
            this.setState({isError: true, animating:false});
        })
    }

    //返回
    _goBack(){
        this.setState({
            isDate: false
        });
        goBack(this.props.navigator);
    }
    //刷新
    _onRefresh(){
        this.setState({isRefreshing:true});
        this._getData();
    }
    //文本格式化
    _textClip(str){
        let ostr=str+'';
        return ostr.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
    }

    toBorrow() {
        this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:this.state.borrowId}});
    }

    //提交
    _onSubmit(){
        this.setState({isDate:false});
        Utils.isLogin(this.props.navigator,this._onSubmitOK.bind(this),this._getData);
    }

    _onSubmitOK(){
        this.setState({animating:true});
        Request.post('buyAuctingDebt.do',{
            uid:'',
            debtId:this.props.debtId,
            auctionPrice:this.state.debtsDetail.auctionBasePrice,
            pwd:'',
        },(data)=>{
            if(data.error=='0'){
                this.setState({animating:false});
                this.props.navigator.push({component:OwebView,name:'OwebView',params:{type:'url',url:data.html,title:'债权转让',back:true}});
            }else{
                Alert.alert('提示',data.msg);
                this.setState({animating:false});
            }
        },(error)=>{})
    }

    format (val) {
        if(val=='4') return '一次性还款';
        if(val=='1') return '等额本息';
        if(val=='0') return '无';
        return '按月付息，到期还本';
    }

    getPublishTime () {
        if(this.state.debtStatus!='2')
            this.setState({
                date: '--'
            });
        else {
            let t = this.state.debtsDetail.remainDays - this.state.debtsDetail.curTime;
            if(t<0){
                this.setState({
                    debtStatus:100
                });
            }
            this.interval=setInterval(() =>{
                t = t-1000;
                let d=0;
                let h=0;
                let m=0;
                let s=0;
                if(t>0){
                    d=(t/1000/60/60/24)+'';
                    h=(t/1000/60/60%24)+'';
                    m=(t/1000/60%60)+'';
                    s=(t/1000%60)+'';
                    d = d.substr(0,d.indexOf('.'));
                    h = h.substr(0,h.indexOf('.'));
                    m = m.substr(0,m.indexOf('.'));
                    s = s.substr(0,s.indexOf('.'));
                    let str = d+'天'+h+'时'+m+'分'+s+'秒';
                    if(this.state.isDate) {
                        this.setState({
                            date: str
                        });
                    }
                }else{
                    if(this.state.isDate) {
                        this.setState({
                            date: str,
                            debtStatus: 2,
                        });
                    }
                }
            },1000);
        }
    }

    btnState() {
        let status = this.state.debtsDetail.debtStatus;
        if(status == '3' ){
          return '转让成功';
        }else if(this.state.debtsDetail.remainDays=="过期"){
            return '已结束';
        }else if(status == '2'){
            return '立即认购';
        }else if(status == '1'){
            return '审核中';
        }else if(status == '4'){
            return '转让失败';
        }else if(status == '5'){
            return '已撤销';
        }
    }

    getTitle() {
        return <View style={styles1.tableTop}>
            <Text style={styles1.tableRow}>认购人</Text>
            <Text style={styles1.tableRow}>认购总额</Text>
            <Text style={styles1.tableRow}>认购时年化利率</Text>
            <Text style={styles1.tableRow}>认购时间</Text>
        </View>;
    }

    getList() {
        let date = this.state.debtsDetail.auctionEndTime+'';
        return <View style={styles1.tableTopList}>
            <Text numberOfLines={1} style={styles1.tableRow}>{this.state.debtUserMap.username}</Text>
            <Text numberOfLines={1} style={styles1.tableRow}>{this.state.debtsDetail.auctionHighPrice}元</Text>
            <Text numberOfLines={1} style={styles1.tableRow}>{this.state.borrowDetailMap.annualRate}%</Text>
            <Text numberOfLines={1} style={styles1.tableRow}>{date.substr(0,date.indexOf(' '))}</Text>
        </View>;
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="项目详情"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                /> 
                {
                    this.state.isError
                    ?
                    <Error onPress={this._getData.bind(this)} />
                    :
                    <ScrollView
                        ref={(scrollView) => { this.ScrollViewParent = scrollView; }}
                        pagingEnabled={true}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={this.state.scrollEnabled}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this._onRefresh.bind(this)}
                              tintColor="#ff0000"
                              title="刷新中..."
                            />}
                    >
                    <View style={styles.topRateView}>
                        <View style={styles.topTitle}>
                            <Text style={styles.topTitleText}>{this.props.debtTitle}</Text>
                        </View>
                        <View style={styles.topRate}>
                            <Text style={styles.topRateText}>{this.state.borrowDetailMap.showRate}</Text>
                            <Text style={styles.topRateSymbol}>%</Text>
                        </View>
                        <View style={{marginTop:10}}><Text style={{color:'#777',fontSize:22/oPx}}>预期年化收益</Text></View>
                    </View>
                    <View style={styles.topDetail}>
                        <View style={[styles.topDetailLine]}>
                            <Text style={styles.topDetailText}>{this.state.debtsDetail.debtSum}元</Text>
                            <Text style={styles.bottomDetailText}>债权价值</Text>
                        </View>
                        <View style={styles.topDetailLine}>
                            <Text numberOfLines={1} style={styles.topDetailText}>{this.state.date}</Text>
                            <Text style={styles.bottomDetailText}>剩余认购时间</Text>
                        </View>
                        <View style={[styles.topDetailLine]}>
                            <Text numberOfLines={1} style={styles.topDetailText}>{this.format(this.props.paymentMode)}</Text>
                            <Text style={styles.bottomDetailText}>还款方式</Text>
                        </View>
                    </View>

                    <View style={style.bodyView}>
                        <View style={style.tableView}>
                            <View style={style.itemView}>
                                <View style={style.tdView}><Text style={style.text}>转让价格</Text></View>
                                <View style={[style.tdView,style.color]}><Text style={[style.text,{color: '#333'}]}>{Number(this.state.debtsDetail.auctionBasePrice)>=10000?Number(this.state.debtsDetail.auctionBasePrice)/10000+'万元':this.state.debtsDetail.auctionBasePrice}</Text></View>
                                <View style={style.tdView}><Text style={style.text}>待收利息</Text></View>
                                {/*<View style={[style.tdView,style.tdView2,style.color,{backgroundColor: '#fff'}]}><Text style={[style.text,{color: '#333'}]}>{Number(this.state.borrowDetailMap.borrowSum)>=10000?Number(this.state.borrowDetailMap.borrowSum)/10000+'万元':this.state.borrowDetailMap.borrowSum}</Text></View>*/}
                                <View style={[style.tdView,style.color]}><Text style={[style.text,{color: '#333'}]}>{Number(this.state.debtsDetail.recivedInterest)>=10000?Number(this.state.debtsDetail.recivedInterest)/10000+'万元':this.state.debtsDetail.recivedInterest}</Text></View>
                            </View>
                          {/*  <View style={style.itemView}>
                                <View style={[style.tdView]}><Text style={style.text}></Text></View>
                                <View style={[style.tdView,style.color]}><Text numberOfLines={1} style={[style.text,{color: '#333'}]}>{this.state.debtsDetail.debtLimit}个月</Text></View>
                                <View style={style.tdView}><Text style={style.text}>年化利率</Text></View>
                                <View style={[style.tdView,style.color,style.tdView2,{backgroundColor: '#fff'}]}><Text style={[style.text,{color: '#333'}]}>{this.state.borrowDetailMap.showRate}%</Text></View>
                            </View>*/}
                            <View style={style.itemView}>
                                <View style={[style.tdView,style.tdView3]}><Text style={style.text}>期限</Text></View>
                                <View style={[style.tdView,style.tdView3,style.color]}><Text style={[style.text,{color: '#333'}]}>{this.state.borrowDetailMap.deadline}个月</Text></View>
                                <View style={[style.tdView,style.tdView3]}><Text style={style.text}>剩余期限</Text></View>
                                <View style={[style.tdView,style.color,style.tdView2,style.tdView3,{backgroundColor: '#fff'}]}><Text numberOfLines={1} style={[style.text,{color: '#333'}]}>{this.state.debtsDetail.debtLimit}个月</Text></View>
                            </View>
                        </View>
                    </View>
                    {/*<Button onPress={this.toBorrow.bind(this)} imgSource={require('../../images/icon/icon_btn.png')} width={344/oPx} height={70/oPx} text="查看项目原始详情"/>*/}
                    <Text onPress={this.toBorrow.bind(this)} style={style.borrowText}>查看项目原始详情</Text>
                    <View style={styles.submitBtnView}>
                        <TouchableOpacity onPress={this._onSubmit.bind(this)}
                                          style={[styles.submitBtn,this.state.debtsDetail.debtStatus != 2 ? styles.submitBtnDisabled : null]}
                                          disabled={this.state.debtsDetail.debtStatus != 2 ? true : false}
                                          activeOpacity={1}>
                            <Text style={[styles.submitBtnText,this.state.debtsDetail.debtStatus != 2 ? styles.submitBtnTextDisabled : null]}>{this.btnState()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:16/oPx,backgroundColor:'#e9ecf3'}}></View>
                    <View style={style.msgView}>
                        <View>
                            <Text style={style.msgTitle}>基本信息</Text>
                            <Text style={style.msg}>用户名：<Text style={[style.msg,{color:'#333'}]}>{this.state.debtsDetail.username}</Text></Text>
                            <Text style={style.msg}>手机号：<Text style={[style.msg,{color:'#333'}]}>{this.state.debtsDetail.mobilePhone}</Text></Text>
                            <Text style={style.msg}>注册时间：<Text style={[style.msg,{color:'#333'}]}>{this.state.createTime}</Text></Text>
                            <Text style={style.msg}>原标满标时间：<Text style={[style.msg,{color:'#333'}]}>{this.state.borrowDetailMap.auditTime}</Text></Text>
                        </View>
                        <Text style={[style.msgTitle,{marginTop: 30/oPx}]}>审核信息</Text>
                        <View style={style.iconView}>
                            <View style={style.itemImg}>
                                <Image style={style.imgIcon} source={require('../../images/icon/icon_sjrz.png')} />
                                <Text style={style.textIcon}> 手机认证</Text>
                            </View>
                            <View style={style.itemImg}>
                                <Image style={style.imgIcon} source={require('../../images/icon/icon_sfrz.png')} />
                                <Text style={style.textIcon}> 身份认证</Text>
                            </View>
                            <View style={style.itemImg}>
                                <Image style={style.imgIcon} source={require('../../images/icon/icon_smrz.png')} />
                                <Text style={style.textIcon}> 实名认证</Text>
                            </View>
                        </View>
                    </View>

                    {
                        this.getTitle()
                    }
                    {
                        this.state.debtUserMap != ''? this.getList() : <Text style={[style.msgTitle,{marginTop:20/oPx,alignSelf:'center',color:'#999'}]}>暂未被认购</Text>
                    }

                    <View style={{marginBottom:200/oPx}}></View>
                    </ScrollView>
                }

                {/*<TouchableOpacity onPress={this._onSubmit.bind(this)} style={[styles.submitBtn,this.state.debtsDetail.debtStatus != 2 ? styles.submitBtnDisabled : null]} disabled={this.state.debtsDetail.debtStatus != 2} activeOpacity={1}>*/}
                    {/*<Text style={styles.submitBtnText}>{this.btnState()}</Text>*/}
                {/*</TouchableOpacity>*/}

                <Loading show={this.state.animating} top={true}/>
            </View>
        )
    }
}
const style = StyleSheet.create({
    bodyView: {
        flex: 1,
        marginTop: 10/oPx,
    },
    tableView: {
        width: StyleConfig.screen_width-60/oPx,
        marginLeft: 30/oPx,
        marginBottom: 40/oPx,
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
    },
    tdView: {
        flex: 2,
        height: 80/oPx,
        borderLeftWidth: StyleConfig.borderWidth,
        borderLeftColor: StyleConfig.borderColor,
        borderTopWidth: StyleConfig.borderWidth,
        borderTopColor: StyleConfig.borderColor,
        backgroundColor: '#e9ecf3',
        alignItems: 'center',
        paddingRight: 10/oPx,
    },
    text: {
        fontSize: 28/oPx,
        color: '#999',
        lineHeight: 32,
    },
    tdView2: {
        borderRightWidth: StyleConfig.borderWidth,
        borderRightColor: StyleConfig.borderColor,
    },
    tdView3: {
        borderBottomWidth: StyleConfig.borderWidth,
        borderBottomColor: StyleConfig.borderColor,
    },
    color: {
        flex:1.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingLeft: 10/oPx,
    },
    msgView: {
        flex:1,
        alignItems: 'flex-start',
        marginLeft: 30/oPx,
        marginTop: 30/oPx,
    },
    msgTitle: {
       color: '#333',
        fontSize: 36/oPx,
        marginBottom: 10/oPx,
    },
    msg: {
       color: '#999',
        fontSize: 28/oPx,
        lineHeight: 30,
    },
    imgIcon: {
        width: 36/oPx,
        height: 37/oPx,
        marginRight: 10/oPx,
    },
    iconView: {
        flex:1,
        flexDirection: 'row',
        marginBottom: 60/oPx,
    },
    itemImg: {
        flex:1,
        flexDirection: 'row',
    },
    textIcon : {
        color: '#333',
        fontSize: 28/oPx,
    },
    borrowText : {
        color: '#319bff',
        fontSize: 28/oPx,
        alignSelf: 'center',
    },

});