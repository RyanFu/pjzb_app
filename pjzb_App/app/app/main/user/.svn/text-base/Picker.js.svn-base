'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Platform,
    Picker,
} from 'react-native';

import {StyleConfig} from '../../style';
const oPx = StyleConfig.oPx;
export default class MyPicker extends Component{
    constructor(props){
        super(props);
        this.state={
            dateOpacity:new Animated.Value(0),
            dateViewPosin:new Animated.Value(-420/oPx),
            defaultVal: '',
            valMethod:null,
        }
    }

    componentDidMount() {
        this.setState({
            valMethod: this.props.valMethod,
        });
    }

    cancel = () => {
        this.state.valMethod();
    }

    determine = () => {
        if (this.state.defaultVal == '' && this.props.isBank) {
            let item = this.props.list[0];
            this.state.valMethod(item.bankName+'.'+item.cardNo);
            return;
        }
        this.state.valMethod(this.state.defaultVal);
    }

    _viewAmin(pos,opt,time){
        Animated.parallel([
            Animated.timing(
                this.state.dateViewPosin,
                {
                    toValue:pos,
                    duration:time,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.dateOpacity,
                {
                    toValue:opt,
                    duration:time,
                    easing: Easing.linear
                }
            ),
        ]).start();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.show){
            this._viewAmin(0,0.6,300);
        }

    }
    render(){
        if (this.props.show) {
            return (
                <View style={styles.datePickerContainer}>
                    <Animated.View style={[styles.dateModal,{opacity:this.state.dateOpacity}]}>
                    </Animated.View>
                    <Animated.View style={[styles.datePicker,{bottom:this.state.dateViewPosin}]}>
                        <View style={styles.datePickerTop}>
                            <TouchableOpacity style={styles.pickerBtn} onPress={this.cancel}>
                                <Text style={styles.pickerBtnText}>取消</Text>
                            </TouchableOpacity>
                            <View style={styles.pickerTitle}>
                            </View>
                            <TouchableOpacity style={styles.pickerBtn} onPress={this.determine}>
                                <Text style={[styles.pickerBtnText,{color:'#eb3331'}]}>确定</Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.defaultVal}
                            onValueChange={(lang) => this.setState({defaultVal: lang})}>
                            {
                                this.props.list.map((row, index) => {
                                    return this.props.listMethod(row, index);
                                })
                            }
                        </Picker>
                    </Animated.View>
                </View>
            )
        } else {
            return null;
        }
    }
}
const styles = StyleSheet.create({
    datePickerContainer:{
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        position:'absolute',
        left:0,
        top:0,
        zIndex:100,
    },
    datePicker:{
        width:StyleConfig.screen_width,
        height:420/oPx,
        position:'absolute',
        left:0,
        bottom:0,
        zIndex:10,
        backgroundColor:'#fff'
    },
    dateModal:{
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        backgroundColor:'#000',
        position:'absolute',
        top:0,
        left:0,
        zIndex:1
    },
    datePickerTop:{
        width:StyleConfig.screen_width,
        height:80/oPx,
        flexDirection:'row',
        borderBottomWidth:StyleConfig.borderWidth,
        borderBottomColor:'#e0e0e0'
    },
    pickerBtn:{
        width:110/oPx,
        height:80/oPx,
        justifyContent:'center',
        alignItems:'center',
    },
    pickerTitle:{
        flex:1,
    },
    pickerBtnText:{
        color:'#999',
        fontSize:28/oPx
    },
    picker: {
        zIndex: 10,
        width:StyleConfig.screen_width,
        flex:1,
    },
})
