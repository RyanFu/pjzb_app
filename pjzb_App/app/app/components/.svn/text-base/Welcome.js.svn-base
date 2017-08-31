
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar
} from 'react-native';

import Dimensions from 'Dimensions';
import AppMain from '../main/appMain';
import Banner from './Banner';
import LoginWap from './Login';
import Storage from '../utils/Storage';
export default class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.superData();
    }
    async superData(){
        let {navigator} = this.props;
        let data = await Storage.getItem('isFirst');
        if (navigator) {
                setTimeout(() => {
                    if(this.props.isFirstTime || !data){
                        navigator.resetTo({component:Banner,name:'Banner',animated:'FadeIn'})
                    }else{
                        navigator.resetTo({
                            name: 'LoginWap',
                            component: LoginWap,
                            animated:'FadeIn'
                        })
                    }
                    Storage.setItem('isFirst', true);
                }, 1000);
            }
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Image
                    style={{width: width, height: height}}
                    source={require('../images/index/welcome.png')}
                    resizeMode="stretch"
                />
            </View>
        )
    }
}