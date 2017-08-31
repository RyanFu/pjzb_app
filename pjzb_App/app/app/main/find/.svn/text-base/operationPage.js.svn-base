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
  export default class OperationPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'充值流程',style:{marginTop:16/oPx}},
              {leftText:'提现操作',style:styles.lineTop},
              {leftText:'投资流程',style:styles.lineTop},
              {leftText:'银行卡绑定',style:styles.lineTop},
              {leftText:'账户安全设置',style:styles.lineTop},
              {leftText:'忘记登录密码怎么办？',style:styles.lineTop},
              {leftText:'注册流程',style:styles.lineTop},
              {leftText:'转让操作',style:styles.lineTop},
          ],
          choseIn:[1,1,1,1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>先登录账户，登录后在我的上方点击“充值”→快速进入充值界面；</Text>
                  {/*<Image style={[styles.img,{width: 599/oPx,height: 512/oPx,}]} source={require('../../images/find/help/flow_01.png')} />*/}
                  <Text style={styles.contentText}>进入充值界面，输入“充值金额”→点击“确认充值”，根据界面所示，选择相应的充值方式及银行卡,即可完成充值。</Text>
                  {/*<Image style={[styles.img,{width: 624/oPx,height: 292/oPx,}]} source={require('../../images/find/help/flow_02.png')} />*/}
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>1、登录个人账户，进入“我的”，点击“提现”；</Text>
                  {/*<Image style={[styles.img,{width: 650/oPx,height:460/oPx,}]} source={require('../../images/find/help/flow_03.png')} />*/}
                  <Text style={styles.contentText}>2、确认提现银行卡号、用户真实姓名、等信息；</Text>
                  <Text style={styles.contentText}>3、输入提现金额和交易密码；</Text>
                  <Text style={styles.contentText}>4、点击“获取验证码”按钮获取手机验证码，并在获取后输入手机验证码；</Text>
                  <Text style={styles.contentText}>5、确认所有信息无误后，点击“立即提现”，完成提现；</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>步骤一：进入投资页面，选择要购买的项目，点击【立即投标】</Text>
                  {/*<Image style={[styles.img,{width: 441/oPx,height:338/oPx,}]} source={require('../../images/find/help/flow_04.png')} />*/}
                  <Text style={styles.contentText}>步骤二：输入购买金额，确认购买信息，如信息无误，请点击【投资】完成购买</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>1、登录个人账户，进入“我的”，点击左上角“个人信息”→“银行卡”；进入界面，点击添加银行卡；</Text>
                  {/*<Image style={[styles.img,{width: 533/oPx,height:608/oPx,}]} source={require('../../images/find/help/flow_05.png')} />*/}
                  <Text style={styles.contentText}>2、确认用户真实姓名；</Text>
                  <Text style={styles.contentText}>3、选择所属银行及银行卡所属地；</Text>
                  <Text style={styles.contentText}>4、填写银行卡号汇付交易密码；</Text>
                  <Text style={styles.contentText}>5、确认所有信息无误后，点击“确定”，完成银行卡绑定；</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>1、登录个人账户，进入“我的”，点击右上角“设置”；进入设置界面</Text>
                  {/*<Image style={[styles.img,{width: 750/oPx,height:408/oPx,}]} source={require('../../images/find/help/flow_06.png')} />*/}
                  <Text style={styles.contentText}>2、根据提示完善邮箱绑定、身份认证、及交易密码设置。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>在登录页面选择“忘记密码”进行重置，通过用户已经绑定的手机号码进行找回。</Text>
                  {/*<Image style={[styles.img,{width: 442/oPx,height:389/oPx,}]} source={require('../../images/find/help/flow_07.png')} />*/}
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>进入首页，点击首页的【注册】，进入注册页面,根据提示输入用户名、登录密码→获取验证码→同意注册条款，然后点击【注册】</Text>
                  {/*<Image style={[styles.img,{width: 700/oPx,height:389/oPx,}]} source={require('../../images/find/help/flow_08.png')} />*/}
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>1、登录个人账户，进入“我的”→菜单栏选择“债权管理”→“可转让”；</Text>
                  {/*<Image style={[styles.img,{width: 750/oPx,height:314/oPx,}]} source={require('../../images/find/help/flow_09.png')} />*/}
                  <Text style={styles.contentText}>2、点击“债权转让”进入转让设置</Text>
                  {/*<Image style={[styles.img,{width: 585/oPx,height:469/oPx,}]} source={require('../../images/find/help/flow_10.png')} />*/}
                  <Text style={styles.contentText}>3、按要求选择转让期限、填写转让价格、交易密码及转让描述，点击“转让”。</Text>
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
          title="操作流程"
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
  });
