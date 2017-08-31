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
  const oPx = StyleConfig.oPx;
  export default class RegisterPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'为什么实名认证通不能通过？',style:{marginTop:16/oPx}},
              {leftText:'为什么要进行实名登记？',style:styles.lineTop},
              {leftText:'一个手机号可以注册几个账号？',style:styles.lineTop},
              {leftText:'注册成功后用户名可以修改吗？',style:styles.lineTop},
              {leftText:'注册时手机收不到验证码怎么办？',style:styles.lineTop},
          ],
          choseIn:[1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>以下三种情况可能会导致实名认证无法通过：</Text>
                  <Text style={styles.contentText}>（1）军人身份；</Text>
                  <Text style={styles.contentText}>（2）港澳台同胞以及国外户口；</Text>
                  <Text style={styles.contentText}>（3）户口办理过迁移没有落户成功或落户时信息未做变更，无法通过审核。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>为了提高账户安全等级，保障资金的安全性和合同的有效性，客户需在首次充值前完成实名登记，普金资本承诺会对所有客户资料严格保密。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>手机号、邮箱和客户的身份信息都具有唯一性，故一个手机号只能注册绑定一个账户。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本平台用户名注册成功后不可以修改，建议您注册时不要使用真实姓名作为用户名。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>（1）确认短信是否被手机软件拦截或过滤</Text>
                  <Text style={styles.contentText}>（2）确认手机是否能正常接收短信（信号问题、欠费、停机等）</Text>
                  <Text style={styles.contentText}>（3）短信收发过程中可能会有延时，请耐心等候</Text>
                  <Text style={styles.contentText}>（4）若仍然收不到验证码，请联系客服。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
          ],
      }
    }

    listPress(index) {
        if(this.state.choseIn[index]==1){
            let arr = this.state.choseIn;
            arr[index] = 2;
            this.setState({choseIn:arr})
        }else{
            let arr = this.state.choseIn;
            arr[index] = 1;
            this.setState({choseIn:arr})
        }
    }

    //功能列表生成
    _funList(row,index){
      return (
          <ItemLeft title={row.leftText} rightText={row.rightText} style={row.style} isTop={this.state.choseIn[index]==2?true:false} onPress={(index)=>{this.listPress(index)}} index={index} key={index} content={this.state.content[index]}/>
      )
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){

      return (
        <View style={styles.container}>
          <NavigationBar
          title="注册认证"
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
          <ScrollView style={styles.userListTap}>
            {
              this.state.funList.map((row, index) =>{
                  return this._funList(row,index);
              })
            }
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
    },
    bold: {
        fontWeight: 'bold',
    },
  });
