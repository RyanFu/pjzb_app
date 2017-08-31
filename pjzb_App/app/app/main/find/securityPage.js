/**
 * Created by zlx on 2017/02/16.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemLeft from '../../components/ItemLeft';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import OwebView from '../../components/OwebView';
  const oPx = StyleConfig.oPx;
  export default class HelpCenter extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'本金和收益是否可以得到保障？',style:{marginTop:16/oPx}},
              {leftText:'普金资本是合法的运营网站吗？',style:styles.lineTop},
              {leftText:'如何保障我资金安全？',style:styles.lineTop},
              {leftText:'网上交易保障中心是什么？',style:styles.lineTop},
              {leftText:'隐私和资料安全如何保障？',style:styles.lineTop},
              {leftText:'在普金资本投资是否受到法律保护？',style:styles.lineTop},
          ],
          choseIn:[1,1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本推荐的产品中包含的借款项目，以及多金宝项目均是通过多重审核机构审核，外加借款方连带担保责任，充分保障投资人本金及投资收益。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本是由国资委牵头参股搭建的互联网金融平台，属于合法运营的网站。</Text>
                  <Text style={[styles.contentText,styles.colorText]} onPress={(url) => this.textWebView('http://www.gzctgroup.cn/')}>赣州城投发展有限公司</Text>
                  {/*<Text style={[styles.contentText,styles.colorText]} onPress={(url) => this.textWebView('https://credit.szfw.org/CX20160720023638001698.html')}>诚信网站认证</Text>*/}
                  <Text style={[styles.contentText]}><Text style={styles.colorText}  onPress={(url) => this.textWebView('http://www.gsxt.gov.cn/index.html')}>工商企业信用信息查询：全国企业信用信息网</Text>。查询时请输入公司名称“普金资本运营（赣州）有限公司”</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>1、数据安全： 三层防火墙隔离系统的访问层、应用层和数据层集群；有效的入侵防范及容灾备份，确保交易数据安全无虞；</Text>
                  <Text style={styles.contentText}>2、隐私安全：普金资本在任何情况下都绝不会出售、出租或以任何其他形式泄漏您的信息。您的信息按照《普金资本投资咨询服务协议》中的规定被严格保护。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>投资成功之后，也是由第三方支付公司汇付天下把钱打给借款人，资金从保管账户转入借款人账户后会在网上交易保障中心生成一份电子回单。这份电子回单类似于银行转账汇款单一样，有”电子签名“和“时间戳”，保障并确认资金的最终流向，让投资人对自己的每笔资金都能清楚了解在什么时间，转给了谁。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>尊重用户个人隐私是本网站的一项基本原则，普金资本郑重承诺在任何情况下都绝不会出售、出租或以任何其他形式泄露您的信息。同时，普金资本在数据加密及操作流程上对用户的隐私信息进行严密的保护。普金资本是一个实名认证平台，用户在平台上交流的过程中，也需要时刻注意保护个人隐私，截图注意覆盖个人信息，不要随意透露真实姓名与住址等，以防信息被盗造成损失。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>投资人在普金资本的投资理财受到法律保护，普金资本提供的是居间服务，通俗的说，普金资本提供的是平台服务，法律根据有《合同法》和《关于人民法院审理借贷案件的若干意见》。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
          ],
      }
    }

    textWebView(url) {
        this.props.navigator.push({
            name: 'OwebView',
            component: OwebView,
            params:{
                url:url,
                title: '帮助中心',
                back: {true},
            }
        })
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
          title="安全保障"
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
          <ScrollView  style={styles.userListTap}>
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
  });
