/**
 * Created by zlx on 2017/02/16.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Alert,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemLeft from '../../components/ItemLeft';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import OwebView from '../../components/OwebView';
  import Button from '../../components/Button';
  import {toastShort} from '../../utils/Toast';
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import Login from '../other/login';
  import Storage from '../../utils/Storage';

  const oPx = StyleConfig.oPx;
  export default class Feedback extends Component {
    constructor(props){
      super(props);
      this.state = {
          content: '',
          showDialog: false,
      }
    }

    //返回
    _goBack(){
      goBack(this.props.navigator);
    }

    async submit() {
      let data = await Storage.getItem('USER')
      if(data){
        if (!this.state.content) {
          toastShort('请先输入反馈内容！', -500);
        } else {
          this.setState({showDialog: true});
          Request.post('addFeedback.do',{
              uid: '',
              content: this.state.content,
          },(data)=>{
              if (data.error == 0) {
                  this.setState({showDialog: false});
                  toastShort(data.msg, -500);
                  setTimeout(() => {
                    goBack(this.props.navigator);
                  }, 3000)
              }
          },(error)=>{
              this.setState({showDialog: false});
              toastShort(data.msg, -500);
          });
        }
      }else{
         Alert.alert(
             '提示信息',
             '您还未登录，请先登录！',
             [
                 {text: '取消' },
                 {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
             ]
         )
      }
      
    }

    render(){

      return (
        <View style={styles.container}>
          <NavigationBar
            title="问题反馈"
            leftShowIcon={true}
            leftBtnFunc={this._goBack.bind(this)}
          />
          <View style={styles.inputView}>
            <TextInput style={styles.textInput}
              multiline = {true}
              underlineColorAndroid="transparent"
              placeholder="欢迎反馈任何意见和问题，您的反馈也是我们平台产品进步的动力哦！"
              placeholderTextColor="#999"
              selectTextOnFocus={true}
              onChangeText={(content) => this.setState({content})}
            />
          </View>
          <Button
              text="提交" textColor="#fff"
              onPress={this.submit.bind(this)}
              height={100/oPx}
              width={690/oPx}
              textSize={36/oPx}
          />
          <Loading show={this.state.showDialog} top={true}/>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
    inputView: {
      height: 420/oPx,
      marginLeft: 30/oPx,
      marginRight: 30/oPx,
      marginTop: 16/oPx,
      marginBottom: 30/oPx,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
    },
    textInput: {
      flex: 1,
      marginLeft: 30/oPx,
      marginRight: 20/oPx,
      paddingBottom: 16/oPx,
      fontSize: 30/StyleConfig.oPx,
      color: "#333",

    },
  });
