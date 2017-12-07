/* 充值记录 */
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
    ListView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

import Request from '../../utils/Request';
import NavigationBar from '../../components/NavigationBar';
import LinearGradient from 'react-native-linear-gradient';
import { goBack } from '../../utils/NavigatorBack';
import styles from '../../style/rechargeWithdraw.js';
import {StyleConfig} from '../../style';
import Loading from '../../components/Loading';
import Utils from '../../utils/utils';
import {toastShort} from '../../utils/Toast';
import Error from '../error/Error.js';

const oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class RechargeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oData:[],
            dataSource:ds.cloneWithRows([]),
            animating:true,
            isRefreshing:false,
            curPage:1,
            totalPageNum:0,
            isShowBottomRefresh:true,
            isEmpty:false,
            // 是否发生网络错误
            isError: false,
        };
    }

    //获取数据
    _getData(flag, curPage){
        curPage = curPage?curPage:1;
        Request.post('rechargeRecord.do',{curPage:curPage,uid:''},(data)=>{
            this.setState({isError: false});
            if (data.error == 0) {
                if(data.pageBean.page.length == 0){
                    this.setState({
                        isRefreshing:false,
                        isEmpty:true,
                        oData:[],
                        dataSource:ds.cloneWithRows([]),
                        animating:false
                    });
                    return;
                };
                this.setState({totalPageNum:data.pageBean.totalPageNum});
                if(data.pageBean.totalPageNum==1){
                    this.setState({isShowBottomRefresh:false});
                }
                if(flag){
                    let result = this.state.oData.concat(data.pageBean.page);
                    this.setState({
                        oData:result,
                        dataSource:ds.cloneWithRows(result),
                        isRefreshing:false,
                        isEmpty:false,
                    });
                }else{
                    this.setState({
                        animating:false,
                        curPage:1,
                        oData:data.pageBean.page,
                        dataSource:ds.cloneWithRows(data.pageBean.page),
                        isRefreshing:false,
                        isEmpty:false,
                    });
                }
            }
        },(error)=>{
            this.setState({isError:true, animating:false});
        });
    }

    //生成list
    _renderRow(row){
        let color = {color: '#333333'};
        let state =  '成功';
        if (row.result == 0) {
            color = null;
            state = '失败';
        } else {
            state =  '成功';
        }
        return(
            <View style={styles.itemsList} key={row.id}>
                <View style={styles.titleView}>
                    <View style={styles.titleCenterView2}><Text numberOfLines={1} style={[styles.listTitle, {marginLeft: 30/StyleConfig.oPx}]}>{this.props.nickname}</Text></View>
                    <View style={styles.titleCenterView2}><Text style={[styles.listTitle, {marginLeft: 80/StyleConfig.oPx}, {width: 130/StyleConfig.oPx}, {color: '#333333'}]}>{Utils.formatCurrency(row.rechargeMoney)}</Text></View>
                    <View style={styles.titleCenterView2}><Text style={[styles.listTitle, {marginLeft: 80/StyleConfig.oPx}, {width: 210/StyleConfig.oPx}]}>{row.rechargeTime}</Text></View>
                    <View style={styles.titleCenterView2}><Text style={[styles.listTitle, {marginLeft: 30/StyleConfig.oPx}, color]}>{state}</Text></View>
                </View>
            </View>
        )
    }

    componentDidMount(){
        this._getData(false, 1);
    }

    _renderFooter() {
        if(this.state.isEmpty){
            return (<View style={styles.moreBottom}>
                <Text style={{color:'#999'}}>暂无记录</Text>
            </View>)
        }
        if(this.state.isShowBottomRefresh){
            return (<View style={{marginVertical: 10}}>
                <ActivityIndicator />
            </View>)
        }else{
            return null;
        }
    }
    _end(){
        if(this.state.isEmpty) return;
        let index = this.state.curPage;
        index++;
        if(index>this.state.totalPageNum){
            toastShort('没有更多了哦',-100);
            this.setState({isShowBottomRefresh:false});
        }else{
            this.setState({curPage:index});
            this._getData(true, index);
        }
    }
    _onRefresh(){
        this.setState({curPage:1});
        this._getData(false, 1);
    }
    returnElm(){
        if(this.state.animating){
            return <Loading show={this.state.animating}/>
        }
        return <View style={{flex:1}}>
            {
                this.state.isError
                ?
                <Error onPress={this._getData.bind(this)} />
                :
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._end.bind(this)}
                    onEndReachedThreshold={30}
                    enableEmptySections = {true}
                    renderFooter={this._renderFooter.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="刷新中..."
                            titleColor="#999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
            }
        </View>
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render() {
        return (
            <View style={[{flex: 1}, {backgroundColor:'white'}]}>
                <LinearGradient colors={['#f3553e', '#eb3549']}>
                    <NavigationBar
                        title="充值记录"
                        leftShowIcon={true}
                        leftBtnFunc={this._goBack.bind(this)}
                        withOutLinearGradient={true}
                    />
                </LinearGradient>
                {
                    this.state.isError
                    ?
                    null
                    :
                    <View style={styles.topList}>
                        <View style={styles.titleView}>
                            <View style={styles.titleCenterView}><Text style={[styles.title, {marginLeft: 30/StyleConfig.oPx}]}>账户名</Text></View>
                            <View style={styles.titleCenterView}><Text style={[styles.title, {marginLeft: 80/StyleConfig.oPx}, {width: 130/StyleConfig.oPx}]}>充值金额</Text></View>
                            <View style={styles.titleCenterView}><Text style={[styles.title, {marginLeft: 80/StyleConfig.oPx}, {width: 160/StyleConfig.oPx}]}>充值时间</Text></View>
                            <View style={styles.titleCenterView}><Text style={[styles.title, {marginLeft: 80/StyleConfig.oPx}]}>充值状态</Text></View>
                        </View>
                    </View>
                }
                {
                    this.returnElm()
                }

            </View>
        );
    }
}