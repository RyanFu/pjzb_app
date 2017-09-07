/**
 * Created by zlx on 2017/02/21.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    RefreshControl,
    ActivityIndicator,
    WebView,
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Request from '../../utils/Request';
import GgxqPage from './ggxqPage';
import Loading from '../../components/Loading';
import ItemList from '../../components/ItemList_2';
import {toastShort} from '../../utils/Toast';
import { goBack } from '../../utils/NavigatorBack';
import NavigationBar from '../../components/NavigationBar';
const oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let i = 0;
export default class Announcement extends Component {
    constructor(props){
        super(props);
        this.state = {
            oData:[],
            dataSource:ds.cloneWithRows([]),
            animating:true,
            isRefreshing:false,
            curPage:1,
            totalPageNum:0,
            isShowBottomRefresh:true,
        }
    }

    componentDidMount(){
        this._getData(false, 1);
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    //获取数据
    _getData(flag, curPage){
        Request.post('queryNewsList.do',{curPage:curPage},(data)=>{
            if (data.error == 0) {
                this.setState({totalPageNum:data.pageBean.totalPageNum});
                if(data.pageBean.totalPageNum==1){
                    this.setState({isShowBottomRefresh:false});
                }
                if(flag){
                    let result = this.state.oData.concat(data.pageBean.page);
                    this.setState({
                        oData:result,
                        dataSource:ds.cloneWithRows(result),
                        isRefreshing:false
                    });
                }else{
                    this.setState({
                        animating:false,
                        curPage:1,
                        oData:data.pageBean.page,
                        dataSource:ds.cloneWithRows(data.pageBean.page),
                        isRefreshing:false
                    });
                }
            }
        },(error)=>{
            console.log(error);
        });
    }

    _renderFooter() {
        if(this.state.isShowBottomRefresh){
            return (<View style={{marginVertical: 10}}>
                <ActivityIndicator />
            </View>)
        }else{
            return null;
        }
    }
    _end(){
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                onEndReached={this._end.bind(this)}
                onEndReachedThreshold={30}
                enableEmptySections={true}
                renderFooter={this._renderFooter.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="刷新中..."
                    />
                }
            />
        </View>
    }

    //文本格式化
    _textClip(str){
        str=str+'';
        return str.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
    }

    _dateFormat(date) {
        return date.substr(0,date.indexOf(' '));
    }

    _renderRow(row, index) {
        i++;
        return  <ItemList title={row.title}
                          rightText={this._dateFormat(row.publishTime)}
                          style={i == 1 ? null : {borderTopWidth:StyleConfig.borderWidth,borderTopColor:StyleConfig.borderColor}}
                          onPress={() => this.onPress(row.title, row.userName, row.publishTime,row.content,row.id, true)}
                          key={index}/>;
    }

    onPress(titleText, userName, time, content, id, back) {
        let html = '<div style="font-size:'+22/oPx+'px;!important;padding:0 30px;">'+content.replace(/font-size:+.{4};/g,'');+'</div>';
        this.props.navigator.push({
            name: 'GgxqPage',
            component: GgxqPage,
            params:{
                titleText:titleText,
                userName:userName,
                time:time,
                content:html,
                title:'平台公告',
                url:Request.wapWeChatPath+"?id="+id+"&flag=1",
                weChat:true,
                back: back
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="平台公告"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <View style={styles.bodyView}>
                {
                    this.returnElm()
                }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e9ecf3'
    },
    bodyView: {
        flex: 1,
        backgroundColor: '#e9ecf3',
        marginTop: 16/oPx,
    },
    hr: {
        width: StyleConfig.screen_width,
        marginTop: 25/oPx,
        borderBottomWidth: StyleConfig.borderWidth,
        borderBottomColor: StyleConfig.borderColor,
    },
    itemView: {
        width: StyleConfig.screen_width,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: 25/oPx,
    },
    textView: {
        height: 180/oPx,
        paddingRight: 30/oPx,
        flex:1,
        marginLeft: 30/oPx,
    },
    titleText: {
        fontSize: 36/oPx,
        color: '#333',
    },
    contentText: {
        fontSize: 28/oPx,
        color: '#999',
        lineHeight: 28,
    },
    dateText: {
        fontSize: 22/oPx,
        color: '#999',
        marginLeft: 10/oPx,
    },
    img: {
        width: 240/oPx,
        height: 180/oPx,
        marginLeft: 30/oPx,
    },
    dateImg: {
        width: 20/oPx,
        height: 20/oPx,
        marginTop: 5/oPx,
    },
    titleView: {
        height: 50/oPx,
    },
    contentView: {
        height: 100/oPx,
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 30/oPx,
        alignSelf : 'flex-start',
    },
});