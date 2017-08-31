
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Picker,
} from 'react-native';

class PickerG extends Component {

    constructor(porp) {
        super(porp);
        this.state= {
            selectedValue: ''
        }
    }


    render() {
        return (
            <Picker
                //Picker样式 dialog弹窗样式默认  dropdown显示在下边
                // mode = {'dropdown'}
                //显示选择内容
                selectedValue={this.state.selectedValue}
                //选择内容时调用此方法
                onValueChange={(value)=>this.setState({selectedValue: value})}
                //设置Title 当设置为dialog时有用
                prompt={'请选择'}
            >
                <Picker.Item label='Android' value='android'/>
                <Picker.Item label='IOS' value='ios'/>
                <Picker.Item label='ReactNative' value='reactnative'/>
            </Picker>
        )
    }
}

module.exports = PickerG;