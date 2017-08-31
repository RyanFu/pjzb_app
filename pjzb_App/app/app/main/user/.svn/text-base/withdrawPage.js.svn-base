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
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';

export default class WithdrawPage extends Component {
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
            <View style={[{flex:1}, {backgroundColor: 'white'}]}>
                <NavigationBar
                    title="提现"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <ScrollView>
                    <WebView
                        source={{uri: this.state.html}}
                        style={[{marginTop: 20}, {width: StyleConfig.screen_width}, {height: StyleConfig.screen_height+300/StyleConfig.oPx}]}
                    />
                </ScrollView>
            </View>
        );
    }
}
