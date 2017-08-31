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
  export default class WithdrawalPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'充值时开户不成功应该如何解决？',style:{marginTop:16/oPx}},
              {leftText:'充值收费吗？',style:styles.lineTop},
              {leftText:'如何充值？普金资本支持信用卡充值吗？',style:styles.lineTop},
              {leftText:'提现失败是什么原因？',style:styles.lineTop},
              {leftText:'提现收费吗？提现的额度有限制吗？',style:styles.lineTop},
              {leftText:'提现需要多久到账？',style:styles.lineTop},
              {leftText:'提现需要注意哪些问题？',style:styles.lineTop},
              {leftText:'为什么我的账户资金不能投资也不能提现？',style:styles.lineTop},
              {leftText:'为什么银行已扣款，但平台账户余额没有增加？',style:styles.lineTop},
          ],
          choseIn:[1,1,1,1,1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>根据汇付天下方面的反馈，开户不成功，通常有三种情况：</Text>
                  <Text style={styles.contentText}>（1）根据页面提示的报错信息,对自己填写的姓名、身份证号码、银行卡号码、手机号（与银行卡预留手机号保持一致）进行校对,确认填写无误。</Text>
                  <Text style={styles.contentText}>（2）银行卡问题： 您输入的银行卡没有开通网上银行业务。</Text>
                  <Text style={styles.contentText}>（3）用户开户时填写的信息与银行已有用户的信息重复。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>暂不收取，普金资本将为客户垫付充值手续费，实现客户充值零费用。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本网是一个中立的交易平台，并不实际存放投资者和借款人的资金。您的资金被存放在汇付天下电子账户。</Text>
                  <Text style={styles.contentText}>（1）登录账户，进入“我的账户”页面，点击充值按钮。</Text>
                  <Text style={styles.contentText}>（2）输入充值金额。</Text>
                  <Text style={styles.contentText}>（3）充值后，显示成功付款，等待5秒钟，页面成功跳转到普金资本网页面，充值成功。</Text>
                  <Text style={styles.contentText}>（4）您可以通过“我的账户” -“资金记录”查看充值的金额及交易记录。普金资本暂不支持信用卡充值。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>（1）账户未绑定银行卡。</Text>
                  <Text style={styles.contentText}>（2）提现金额超过账户可用余额。</Text>
                  <Text style={styles.contentText}>（3）大额提现时输错开户行号。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本充值未投标的资金，15天内提现收取本金的0.5%提现服务费，15天后提现免费。</Text>
                  <Text style={styles.contentText}>另汇付天下支付平台会收取用户每笔2元的提现手续费。</Text>
                  <Text style={styles.contentText}>普金资本对于客户的充值没有金额和次数限制，但客户在充值时的单笔限额取决于充值银行。</Text>
                  <Text style={styles.contentText}>最低的提现金额必须要在100元或以上，最高的提现金额为个人账户内可用余额。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>实时提现，T+1个工作日到账。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>（1）进入我的账户-我的银行卡，绑定银行卡，提现金额将汇入此银行卡</Text>
                  <Text style={styles.contentText}>（2）确保绑定的银行卡的开户人姓名和身份证号与平台实名登记信息保持一致</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>如果您的账户资金不能投资和提现，可能存在以下三种情况：</Text>
                  <Text style={styles.contentText}>1、由于网络问题导致操作延时，请您刷新网页后重新操作；</Text>
                  <Text style={styles.contentText}>2、由于平台故障引起您暂时无法投资和提现，请及时联系在线客服或致电400-606-2079为您服务；</Text>
                  <Text style={styles.contentText}>3、由于您的账户存在异常，账户资金被“冻结”，届时请您配合客服的核查工作；排除异常后，您的资金将立即“解冻”，您可以自主选择投资或提现。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>（1）由于网络不稳定造成的显示不同步；</Text>
                  <Text style={styles.contentText}>（2）在无提示关闭或交易成功的情况下关闭页面，导致充值资金延迟到账或掉单；</Text>
                  <Text style={styles.contentText}>（3）同一时间使用同一个第三方充值端口的用户较多，第三方支付平台偶有延迟，造成网银显示与平台账户金额不同步。如出现充值未到账情况，请保留网银充值截图，稍后刷新网页；如还未到账，请致电客服：400-606-2079为您服务。</Text>
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
          title="充值提现"
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
