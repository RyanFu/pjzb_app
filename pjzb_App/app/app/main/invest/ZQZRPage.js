/**
 * Created by zlx on 2017/02/25.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import {StyleConfig} from '../../style/index';
import {styles} from '../../style/main';
import ZQZRProduct from '../../components/ZQZRProduct';
import Loading from '../../components/Loading';
import Request from '../../utils/Request';
import {toastShort} from '../../utils/Toast';

let oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class ZQZRPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            oData:[],
            dataSource:ds.cloneWithRows([]),
            isRefreshing:false,
            curPage:1,
            totalPageNum:0,
            isShowBottomRefresh:true,
            // canAssign：可转让，assigning：转让中，alreadyAssign：已转让
            assignFlag:'assigning',
        }
    }
    //获取数据
    _getData(flag){
        Request.post('debtsAssignmentList.do',{
            curPage:this.state.curPage,
            tt:''
            ,yy:'',
            xx:this.state.productType,
            rates:'',
            timeers:'',
            deadlines:'',
            flages:'',
            titles:'',
            uid:''
        },(data)=> {
            if (data.error == '0') {
                if (data.pageBean.page.length == 0) {
                    this.setState({
                        isEmpty: true
                    });
                    return;
                }
                this.setState({totalPageNum: data.pageBean.totalPageNum});
                if (flag) {
                    let result = this.state.oData.concat(data.pageBean.page);
                    this.setState({
                        oData: result,
                        dataSource: ds.cloneWithRows(result),
                        isRefreshing: false
                    });
                } else {
                    this.setState({
                        curPage: 1,
                        oData: data.pageBean.page,
                        dataSource: ds.cloneWithRows(data.pageBean.page),
                        isRefreshing: false
                    });
                }
            }
        },(error)=>{
            alert(error);
            //console.log(error);
        });
    }
    _leftbtn(){
        console.log(1);
    }
    //生成list
    _renderRow(data){
        return (
            <ZQZRProduct showList={true} data={data} onPressEvent={this._onPress.bind(this)}/>
        )
    }
    _onPress(id,title,paymentMode){
        this.props.navigator(id,title,paymentMode);
    }
    componentDidMount(){
        this._getData();
    }
    _renderFooter() {
        if(this.state.isEmpty){
            return (<View style={styles.moreBottom}>
                <Text style={{color:'#999'}}>暂无债权转让</Text>
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
            this.setState({curPage:index},()=>this._getData(true));

        }
    }
    _onRefresh(){
        this.setState({curPage:1},()=>this._getData(false));
    }
    render(){
        return (
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            style={styles.listView}
            onEndReached={this._end.bind(this)}
            onEndReachedThreshold={30}
            enableEmptySections = {true}
            pageSize={5}
            renderFooter={this._renderFooter.bind(this)}
            refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          tintColor="#ff0000"
          title="刷新中..."
          titleColor="#999"
        />}
        />
        );
    }
}
