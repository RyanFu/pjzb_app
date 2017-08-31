/* 充值页面 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    WebView,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import {StyleConfig} from '../../style';
import Setting from './setting';

export default class IpayEnterpriseView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: null,
        };
    }

    componentDidMount(){
        this.setState({
            html:this.props.html,
        });
    }

    //返回
    _goBack(){
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[1]);
        this.props.navigator.replace({component:Setting,name:'Setting'});
    }

    render() {
        return (
            <View style={[{flex:1}, {backgroundColor: 'white'}]}>
                <NavigationBar
                    title="注册汇付企业账户"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <ScrollView
                    horizontal={true}>
                    <WebView
                        source={{uri: this.state.html}}
                        style={[{marginTop: 20}, {width: StyleConfig.screen_width+1400/StyleConfig.oPx}, {height: StyleConfig.screen_height+3700/StyleConfig.oPx}]}
                    />
                </ScrollView>
            </View>
        );
    }
}
