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
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StyleConfig} from '../../style/index';
import Button from '../../components/Button';
import Request from '../../utils/Request';
import Loading from '../../components/Loading';
import SuccessPage from './successPage';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import ForgetTradePassword from './forgetTradePassword';
import {toastShort} from '../../utils/Toast';

export default class TradePasswordNext2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cellPhone:'',
			password:'',
            confirmPassword:'',
            showDialog:false,
        }
    }

    componentDidMount() {
        this.setState({
            cellPhone:this.props.cellPhone,
        });
    }
    //返回
    _goBack(){
        goBack(this.props.navigator);
        this.props.navigator.replace({component:ForgetTradePassword,name:'ForgetTradePassword'});//返回上一个页面后替换指定页面，等于重新刷新上一个页面。
    }

	onPressConfirm=() =>{
        if(this.state.password == ''){
            toastShort('新密码不能为空！',-300)
            return;
        }
        if(this.state.confirmPassword == ''){
            toastShort('确认密码不能为空！',-300)
            return;
        }
    	if(this.state.password != this.state.confirmPassword){
            toastShort('两次密码输入不一致！',-300)
    		return;
		}
        if(this.state.password.length < 6){
            toastShort('密码长度必须为6-20个字符！',-300)
            return;
        }

        let params = {
            'mobilePhone':this.state.cellPhone,
            'passwd':this.state.password,
            'confirmpassword':this.state.confirmPassword,
            'uid': '',
        };
        this.setState({showDialog:true});
        Request.post('updateUserdealpwd.do',params,(data)=>{
            if(data.error =='0'){
                this.setState({showDialog:false});
                this.props.navigator.push({component:SuccessPage,name:'SuccessPage',params:{refresh:false,retNum:'1',successText:'修改交易密码成功!'}});
            }else{
                this.setState({showDialog:false});
                Alert.alert(
                    '提示信息',
                    data.msg,
                    [
                        {text: '确定', },
                    ]
                )
			}
        },(error)=>{
            console.log(error);
            Alert.alert(
                '提示信息',
                '您的网络不稳定，请稍后再试！',
                [
                    {text: '确定', },
                ]
            )
        });
	}
	
	render(){
		return (
		<View style={[styles.flex, styles.body]}>
            <NavigationBar title="手机找回交易密码" leftShowIcon={true} leftBtnFunc={this._goBack.bind(this)}  />
		  <View style={[styles.container]}>
			<View style={[styles.phoneContainer]}>
				<TextInput style = {[styles.inputs,{paddingTop:100/StyleConfig.oPx}]}
				   underlineColorAndroid = "transparent"
				   placeholder= "输入新密码"
				   value = {this.state.password}
				   selectTextOnFocus={true}
				   secureTextEntry ={true}
				   onChangeText = {
				       (password) =>{this.setState({password})}
				   }/>
			</View>

			<View style={[styles.messageContainer]}>
				<TextInput style = {[styles.inputs,{marginTop:40/StyleConfig.oPx}]}
				   underlineColorAndroid = "transparent"
				   placeholder= "确认新密码"
				   value = {this.state.confirmPassword}
				   selectTextOnFocus={true}
				   secureTextEntry ={true}
				   onChangeText = {
                    (confirmPassword) =>{this.setState({confirmPassword})}
                }/>
			</View>
			<View style={[styles.btnContainer]}>
			    <Button
				  text={'确认'}
				  textColor={'#fff'}
				  onPress={this.onPressConfirm}
				  imgSource={require('../../images/other/password_btn.png')}
				  height={104/StyleConfig.oPx}
				  width={716/StyleConfig.oPx}
				/>
			</View>
		  </View>
			<Loading show={this.state.showDialog} top={true}/>
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
  phoneImg:{
	marginLeft:10/StyleConfig.oPx,
	marginTop:106/StyleConfig.oPx,
    height:42/StyleConfig.oPx,
    width:28/StyleConfig.oPx	  
  },
  messageImg:{
	marginTop:60/StyleConfig.oPx,
    height:32/StyleConfig.oPx,
    width:40/StyleConfig.oPx	  
  },
  inputs: {   
	paddingLeft:2/StyleConfig.oPx,
	width:470/StyleConfig.oPx,
	fontSize:15, 
  }, 
  btnContainer:{ 	    
	height:148/StyleConfig.oPx,  
	width:StyleConfig.screen_width-60/StyleConfig.oPx, 
	marginTop:60/StyleConfig.oPx,
  }
});