/**
 * Created by ljunb on 16/6/2.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;

export default class Update extends Component {
    constructor(props){
        super(props);
      }
    render() {
        return (
            this.props.update ? <View style={styles.loadingView}><View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}>更新中……</Text>
            </View></View>:null
        )
    }
}

const styles = StyleSheet.create({
    loadingView:{
        position: 'absolute',
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        top:0,
        left:0,
        backgroundColor:'rgba(255,255,255,0)'
    },
    loading: {
        backgroundColor: 'black',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (StyleConfig.screen_height-80)/2,
        left: (StyleConfig.screen_width-100)/2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})