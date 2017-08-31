/* 充值页面 */
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
    WebView,
} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import LinearGradient from 'react-native-linear-gradient';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';

export default class Recharge extends Component {
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
        goBack(this.props.navigator);
    }

    render() {
        return (
            <ScrollView style={[{flex:1}, {backgroundColor: 'white'}]}>
                <LinearGradient colors={['#f3553e', '#eb3549']}>
                    <NavigationBar
                        title="充值"
                        leftShowIcon={true}
                        leftBtnFunc={this._goBack.bind(this)}
                        withOutLinearGradient={true}
                    />
                </LinearGradient>
                <WebView
                    source={{html: this.state.html}}
                    style={[{marginTop: 20}, {width: StyleConfig.screen_width}, {height: StyleConfig.screen_height+200/StyleConfig.oPx}]}
                />
            </ScrollView>
        );
    }
}
