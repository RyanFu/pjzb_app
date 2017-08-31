
/**
 * Created by wsl on 2017/02/23.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    DatePickerIOS,
    Platform
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import SearchModal from '../../components/SearchModal';
import {StyleConfig} from '../../style/index';
const oPx = StyleConfig.oPx;
import Loading from '../../components/Loading';
import Request from '../../utils/Request';
import styles from '../../style/funddetail';
import {toastShort} from '../../utils/Toast';
import { goBack } from '../../utils/NavigatorBack';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class FriendsInvestList extends Component {
    constructor(props){
        super(props);
        this.state = {
            oData:[],
            dataSource:ds.cloneWithRows([]),
            animating:true,
            isEmpty:false,
            isRefreshing:false,
            curPage:1,
            totalPageNum:0,
            isShowBottomRefresh:false,
            startDate:'',
            endDate:'',
            choseType:0,
            choseData:[],
            total:false,
        }
    }
    _goBack(){
        goBack(this.props.navigator);
    }
    //获取数据
    _getData(flag){
        Request.post('investRecordDetail.do',{uid:'',username:this.props.username,userId:this.props.userId,publishTimeStart:this.state.startDate,publishTimeEnd:this.state.endDate,title:'',curPage:this.state.curPage,pageSize:'15'},(data)=>{
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
            if(data.pageBean.totalPageNum < 2){
                this.setState({total:true})
            }
            this.setState({totalPageNum:data.pageBean.totalPageNum});
            if(data.pageBean.totalPageNum>1){
                this.setState({isShowBottomRefresh:true});
            }
            if(flag){
                let result = this.state.oData.concat(data.pageBean.page);
                this.setState({
                    oData:result,
                    dataSource:ds.cloneWithRows(result),
                    isRefreshing:false,
                    animating:false,
                    isEmpty:false
                });
            }else{
                this.setState({
                    animating:false,
                    curPage:1,
                    oData:data.pageBean.page,
                    dataSource:ds.cloneWithRows(data.pageBean.page),
                    isRefreshing:false,
                    isEmpty:false
                });
            }
        },(error)=>{
            console.log(error);
        });
    }

    onPressEvent(username,userId) {
        // this.props.navigator.push({component:InvestFriendDetail,name:'InvestFriendDetail'});
        // alert('username:'+username + '  userId:'+userId);
    }

    //邀请好友list
    _renderRow(data,index){
        return <View style={styles.tableTopList} key={data.id}>
            <Text numberOfLines={1} style={[styles.tableRow,styles.black]}>{data.borrowTitle}</Text>
            <Text style={[styles.tableRow,styles.black]}>{data.annualRate}%</Text>
            <Text style={[styles.tableRow,styles.black]}>{data.deadline}</Text>
            <Text numberOfLines={1} style={[styles.tableRow,styles.black]}>{data.investAmount}</Text>
            <Text style={[styles.tableRow,styles.black]}>{data.investTime.substring(0,10)}</Text>
        </View>
    }
    componentDidMount(){
        this.setState({animating:true});
        this._getData();
    }
    _renderFooter() {
        if(this.state.isEmpty){
            return (<View style={styles.moreBottom}>
                <Text style={{color:'#999'}}>好友无投资记录</Text>
            </View>)
        }
        if(this.state.isShowBottomRefresh){
            return (<View style={{marginVertical: 10}}>
                <ActivityIndicator />
            </View>)
        }
    }
    _end(){
        if(this.state.isEmpty) return;
        if(this.state.total) return;
        let index = this.state.curPage;
        index++;
        if(index>this.state.totalPageNum){
            toastShort('没有更多了哦',-100);
            this.setState({isShowBottomRefresh:false});
        }else{
            this.setState({curPage:index},()=>this._getData(true));
        }
    }
    _onRefresh(){
        this.setState({curPage:1},()=>this._getData(true));
    }
    _openSearch(){
        this.setState({dialog:!this.state.dialog});
    }
    _onSubmit(params){
        //数据格式
        //params = {startDate:startDate,
        //    endDate:endDate,
        //    choseType:choseType
        //  };
        this.setState(params,()=>{this.setState({animating:true});this._getData()});
    }
    render(){
        let rightIcon = require('../../images/icon/icon_date.png');
        return (
            <View style={{flex:1}}>

                <NavigationBar
                    title={"好友投资记录"}
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                    rightDisplay={false}
                    rightTitle="筛选"
                    rightBtnFunc={this._openSearch.bind(this)}
                />
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <View style={styles.tableTop}>
                        <Text style={styles.tableRow}>标题</Text>
                        <Text style={styles.tableRow}>年利率</Text>
                        <Text style={styles.tableRow}>期限</Text>
                        <Text style={styles.tableRow}>投资金额</Text>
                        <Text style={styles.tableRow}>投资时间</Text>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        style={styles.listView}
                        onEndReached={this._end.bind(this)}
                        onEndReachedThreshold={30}
                        enableEmptySections = {true}
                        pageSize={15}
                        renderFooter={this._renderFooter.bind(this)}
                        refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff0000"
                title="刷新中..."
                titleColor="#999"
                progressBackgroundColor="#ffff00"
              />}/>
                    {/*
                     dialog :显示true与隐藏false
                     choseData:所有待选项
                     modalEvent:视图相应事件
                     onSubmit：搜索窗口关闭后的回调事件，返回参数见_onSubmit
                     */}
                    <Loading show={this.state.animating} top={true}/>
                </View>
                <SearchModal
                    dialog={this.state.dialog}
                    choseData={this.state.choseData}
                    modalEvent={this._openSearch.bind(this)}
                    onSubmit={this._onSubmit.bind(this)}
                />
            </View>
        );
    }
}
