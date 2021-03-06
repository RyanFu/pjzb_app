
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import AppMain from '../main/appMain';
import Storage from '../utils/Storage';
import Login from '../main/other/login';
import Regist from '../main/other/register';
import Request from '../utils/Request';
const {height,width} = Dimensions.get('window');
export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.flag = false;
        this.state = {
            timerCount: 3,
        };
    }
    componentDidMount() {
        //获取数据]
        Request.post('getBannerAndBorrows.do',{},(data)=>{
            if(data.error == '0'){
                this.flag = true;
                let islogin = 0;
                let isExgo = 0;
                if(data.hasOwnProperty("isExgo")){
                   islogin = 1;
                   isExgo = data.isExgo;
                }
                global.indexData = {
                 dataSource:data.recommendBorrowList,
                 bannerList:data.bannerList,
                 experienceBorrow:data.experienceBorrow[0],
                 totalInvestNum:data.experienceBorrow[1].experienceBorrowCount,
                 gsdtList:data.pageBean.page,
                 islogin:islogin,
                 isExgo:isExgo,
                 // 新手标
                 xsBorrow: data.xsBorrow[0],
                 // 是否投资新手标
                 isxsBiao: data.isxsBiao,
                 // 新手标年化收益
                 xsAnnualRate: data.xsBorrow[0].annualRate,
                 // android 最新版本
                 androidMap: data.androidMap,
                 // iso 最新版本
                 iosMap: data.iosMap,
                 // 债权转让list
                 mapZQ: data.mapZQ,
               }
            }
        },(error)=>{
            global.indexData = {
                isError: true,
            }
        });

        // 倒计时3s
        this.interval=setInterval(() =>{
            codeTime = this.state.timerCount - 1;
            if(this.state.timerCount > 1){
                this.setState({
                    timerCount: codeTime,
                });
            } else {
                // 停止
                this.interval&&clearInterval(this.interval);
                this.jumpPage();
            }
        },1000);

    }
    jumpPage(){

        let isError = false;
        if(!this.flag) {
            global.indexData = null;
            isError = true;
        }
        this.props.navigator.resetTo({
            name: 'AppMain',
            component: AppMain,
            animated:'FadeIn',
            params: {
                isError: isError
            }
        })
        // 停止
        this.interval&&clearInterval(this.interval);
    }
    jumpLogin = () =>{

        this.props.navigator.push({
            name: 'Login',
            component: Login,
            animated:'FadeIn'
        })
        // 停止
        this.interval&&clearInterval(this.interval);
        this.setState({timerCount: ''});
    }
    jumpRegist = () =>{

        this.props.navigator.push({
            name: 'Regist',
            component: Regist,
            animated:'FadeIn'
        })
        // 停止
        this.interval&&clearInterval(this.interval);
        this.setState({timerCount: ''});
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Image
                    style={{width: width, height: height}}
                    source={require('../images/index/login.png')}
                    resizeMode="stretch"
                />
                <TouchableOpacity style={styles.topButton} onPress={this.jumpPage.bind(this)}>
                    <Text style={styles.topButtonText}>跳过 {this.state.timerCount}</Text>
                </TouchableOpacity>
                {!global.USER?<View style={styles.bottomView}>
                    <TouchableOpacity style={styles.bottomViewButton} onPress={this.jumpLogin}>
                        <Text style={styles.topButtonText}>登录</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.bottomViewButton} onPress={this.jumpRegist}>
                        <Text style={styles.topButtonText}>注册</Text>
                    </TouchableOpacity>
                </View>:null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topButton:{
        width:50,
        height:25,
        backgroundColor:'rgba(0,0,0,0.8)',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:10,
        top:10,
        borderRadius:22,
    },
    topButtonText:{
        color:'#fff',
        fontSize:14
    },
    bottomView:{
        width:width,
        height:50,
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:1,
        borderTopWidth:1,
        borderTopColor:'#f8b1b5'
    },
    line:{
        width:1,
        height:50,
        backgroundColor:'#f8b1b5'
    },
    bottomViewButton:{
        flex:1,
        height:50,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
    }
})