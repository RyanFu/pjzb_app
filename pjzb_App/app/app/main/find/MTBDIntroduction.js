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
import Loading from '../../components/Loading';
import {toastShort} from '../../utils/Toast';
 const oPx = StyleConfig.oPx;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class MTBDIntroduction extends Component {
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
            onPress: null,
        }
    }

    componentDidMount(){
        this.setState({
            onPress: this.props.onPress,
        });
        this._getData(false, 1);
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    //获取数据
    _getData(flag, curPage){
        Request.post('getIndustryNews.do',{curPage:curPage},(data)=>{
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
                        titleColor="#999"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }
            />
        </View>
    }

    textWebView(html) {
        this.state.onPress(html, '媒体报道');
    }

    //文本格式化
    _textClip(str){
        str=str+'';
        return str.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
    }
    //图片格式化
    _imgClip(str){
        str=str+'';
        str = str.replace(/<img/g,'<img style="width:'+ (StyleConfig.screen_width-20) +'px;" ');
        return str.replace(/height/g,'width');
    }

    _renderRow(row) {
        let c = this._imgClip(row.content);
        let content = this._textClip(row.content);
        return  <View>
            <View style={styles.itemView}>
                <View style={styles.imageView}>
                    <Image source={{uri:row.imgPath}} style={styles.img} />
                </View>
                <View style={styles.textView}>
                    <View style={styles.titleView}>
                        <Text numberOfLines={1} onPress={(html) => this.textWebView(c)} style={styles.titleText}>{row.title}</Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text numberOfLines={2} style={styles.contentText}>{content}</Text>
                    </View>
                    <View style={styles.dateView}>
                        <Image source={require('../../images/find/aboutUs/date.png')} style={styles.dateImg}/>
                        <Text numberOfLines={1} style={styles.dateText}>{row.publishTime}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.hr}></View>
        </View>;
    }

    render(){
        return (
            <View style={styles.bodyView}>
                {
                    this.returnElm()
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: StyleConfig.screen_width,
        backgroundColor: 'white',
    },
    bodyView: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor:'transparent'
    },
    titleText: {
        fontSize: 36/oPx,
        color: '#333',
    },
    contentText: {
        fontSize: 28/oPx,
        color: '#999',
        lineHeight: 24,
    },
    dateText: {
        fontSize: 22/oPx,
        color: '#999',
        marginLeft: 10/oPx,
        marginTop: 5/oPx,
    },
    img: {
        width: 240/oPx,
        height: 180/oPx,
        marginLeft: 30/oPx,
    },
    dateImg: {
        width: 20/oPx,
        height: 20/oPx,
        marginTop: 10/oPx,
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
