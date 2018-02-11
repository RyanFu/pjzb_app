/**
 * Created by wsl on 2017/3/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import LoginWap from '../components/Login';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tapIndex:0,
            bannerList : [
                {imgPath:require('../images/index/welcome_01.png')},
                {imgPath:require('../images/index/welcome_02.png')},
                {imgPath:require('../images/index/welcome_03.png')}
            ],
            activityBannerList : [
                {imgPath:require('../images/index/welcome_04.png')},
                {imgPath:require('../images/index/welcome_05.png')},
                {imgPath:require('../images/index/welcome_06.png')}
            ],
        }
    }

    componentWillMount() {
        let {navigator} = this.props;
        
    }
    _swiper(row,index){
        return <Image key={index}
            style={{width: width, height:height }}
            source={row.imgPath}
            resizeMode="stretch"/>
    }
    onMomentumScrollEnd (e, state, context) {
        this.setState({tapIndex:state.index})
    }
    jumpPage(){
        this.props.navigator.resetTo({
            name: 'LoginWap',
            component: LoginWap,
            animated:'FadeIn'
        })
    }
    render() {
        let dateStart = new Date(Date.parse("2018/02/11")).getTime();
        let dateEnd = new Date(Date.parse("2018/03/10")).getTime(); 
        let date = new Date().getTime();
        let imgList = this.state.bannerList;
        if (date >= dateStart && date <= dateEnd) {
            imgList = this.state.activityBannerList;
        }
        return (
            <View style={{flex: 1}} >
                <StatusBar hidden={true}/>
                <Swiper height={height} autoplay={false} loop={false} showsButtons={false} showsPagination={false}
                        onMomentumScrollEnd={(e, state, context)=>this.onMomentumScrollEnd(e, state, context)}>
                    {
                        imgList.map((row, index) =>{
                            return this._swiper(row,index);
                        })
                    }
                </Swiper>
                {/*<TouchableOpacity style={styles.topButton} onPress={this.jumpPage.bind(this)}>
                    <Text style={styles.topButtonText}>跳过</Text>
                </TouchableOpacity>*/}
                {this.state.tapIndex==2?<View style={styles.lastButtonView}><TouchableOpacity style={styles.lastButton} onPress={this.jumpPage.bind(this)}>
                    <Text style={styles.lastButtonText}>点击进入</Text>
                </TouchableOpacity></View>:null}
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
        fontSize:12
    },
    lastButtonView:{
        width:width,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:25,
        left:0
    },
    lastButton:{
        width:150,
        height:30,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#eb3331',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    lastButtonText:{
        color:'#eb3331'
    }
})