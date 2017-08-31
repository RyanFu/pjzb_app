/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import SuccessPage from './successPage';
import Utils from '../../utils/utils';
import {toastShort} from '../../utils/Toast';

export default class BindingEmail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userEmail:'',
            onClick: this.onAddEmail,
            isClick: false,
        }
    }

    onAddEmail =() =>{
        if (this.state.userEmail=='') {
            toastShort('邮箱不能为空',-300);
            return;
        };

        if(!Utils.isEmail(this.state.userEmail)){
            toastShort('请输入正确邮箱',-300);
            return;
        };

        this.setState({
            onClick: null,
            isClick: true,
        });

        //ajax
        let params = {'email':this.state.userEmail,'uid':''};
        Request.post('sendEmail.do',params,(data)=>{
            if(data.mailAddress=='0'){
                toastShort('邮箱不能为空',-300);
            }else if(data.mailAddress=='1'){
                toastShort('该邮箱不存在',-300);
            }else if (data.mailAddress=='4'){
                toastShort('该邮箱已被绑定,请重新输入',-300);
            }else{
                this.props.navigator.push({component:SuccessPage,name:'SuccessPage',params:{refresh:true,retNum:'1',successText:'邮件已经发送到你的邮箱,请登录到邮箱进行验证。'}});
            }

            this.setState({
                onClick:this.onAddEmail,
                isClick:false,
            });
        },(error)=>{
            console.log(error);
            this.setState({
                onClick:this.onAddEmail,
                isClick:false,
            });
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
        return (
            <View style={[styles.flex, styles.body]}>
                <NavigationBar
                    title="绑定邮箱"
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <View style={[styles.container]}>
                    <View style={[styles.phoneContainer]}>
                        <Text style={styles.phoneText}>添加邮箱</Text>
                        <TextInput style = {[styles.inputs,{paddingTop:90/StyleConfig.oPx}]}
                                   underlineColorAndroid = "transparent"
                                   placeholder= "请输入您的邮箱地址"
                                   value = {this.state.userEmail}
                                   onChangeText = {
				            (userEmail) =>{this.setState({userEmail})}}/>
                    </View>

                    <View style={[styles.btnContainer]}>
                        {
                            !this.state.isClick ?   <Button
                                    text={'添加邮箱'}
                                    textColor={'#fff'}
                                    onPress={this.state.onClick}
                                    imgSource={require('../../images/other/password_btn.png')}
                                    height={104/StyleConfig.oPx}
                                    width={716/StyleConfig.oPx}
                                /> : <Image style={{height:104/StyleConfig.oPx, width:716/StyleConfig.oPx, justifyContent:'center',alignSelf:'center'}} source={require('../../images/other/password_btn.png')}>
                                        <Text style={{backgroundColor:'transparent',textAlign:'center',color:'#fff'}}>
                                            添加邮箱
                                        </Text>
                                    </Image>
                        }
                    </View>
                </View>

            </View>

        );
    }
};

const styles = StyleSheet.create({
    body:{
        width:StyleConfig.screen_width,
        height:StyleConfig.screen_height,
        backgroundColor:'#FFFFFF'
    },
    flex: {
        flex: 1  //平分填满父空间。
    },
    /**布局内容*/
    container: {
        marginLeft:30/StyleConfig.oPx,
        marginRight:30/StyleConfig.oPx,
        height:448/StyleConfig.oPx,
        width:StyleConfig.screen_width
    },
    phoneContainer:{
        flexDirection: 'row',
        height:178/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderBottomWidth:1,
        borderColor:'#cccccc'
    },
    messageContainer:{
        flexDirection: 'row',
        height:120/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        borderBottomWidth:1,
        borderColor:'#cccccc'
    },
    phoneText:{
        marginTop:109/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:158/StyleConfig.oPx
    },
    messageImg:{
        marginTop:56/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:158/StyleConfig.oPx
    },
    inputs: {
        paddingLeft:12/StyleConfig.oPx,
        width:430/StyleConfig.oPx,
        fontSize:15,
    },
    verticalLine:{
        marginTop:60/StyleConfig.oPx,
        height:42/StyleConfig.oPx,
        width:3/StyleConfig.oPx,
        backgroundColor:'#cccccc'
    },
    textStyle:{
        marginTop:60/StyleConfig.oPx,
        color:'#5aafff',
        paddingLeft:26/StyleConfig.oPx,
    },
    btnContainer:{
        height:148/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:60/StyleConfig.oPx,
    },

});