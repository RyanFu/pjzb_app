/**
 * Created by zlx on 2017/02/16.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemLeft from '../../components/ItemLeft';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import WebViewPage from './webViewPage';
  const oPx = StyleConfig.oPx;
  export default class WithdrawalPage extends Component {
    constructor(props){
      super(props);
      this.state = {

      }
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){
      return (
        <View style={styles.container}>
          <NavigationBar
          title="借款合同"
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
          <ScrollView style={styles.userListTap}>
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_1.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_2.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_3.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_4.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_5.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_6.jpg')} />
              <Image style={[styles.img,{width: 700/oPx,height: 991/oPx,}]} source={require('../../images/find/help/contract/jkxy_7.jpg')} />
          </ScrollView>
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
    userListTap:{

    },
    centerTextStyle:{
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        fontSize:28/oPx,
        color:'#333',
    },
    lineTop:{
      borderColor:'#e0e0e0',
      borderTopWidth:StyleConfig.borderWidth
    },
    userListItem:{
      flex:1,
      height:88/oPx,
      flexDirection:'row',
      backgroundColor:'#fff',
    },
    leftTextStyle:{
      flex:1,
      alignSelf:'center',
      fontSize:28/oPx,
      color:'#333',
      marginLeft:20/oPx
    },
    listIcon:{
      width:34/oPx,
      height:19/oPx,
      alignSelf:'center',
      marginRight:30/oPx,
    },
    textView: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    textTop: {
        marginTop:20/oPx,
    },
    textBottom: {
        marginBottom: 40/oPx,
    },
    contentText: {
        lineHeight: 30,
        marginLeft:20/oPx,
        marginRight:30/oPx,
        color: '#333',
    },
    colorText: {
        color: '#eb3331',
    },
    img: {
        alignSelf: 'center',
        marginTop: 50/oPx,
    },
  });
