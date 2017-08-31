/**
 * Created by zlx on 2017/02/16.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
      Linking,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import Items from '../../components/Items';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import WebViewPage from './webViewPage';
  const oPx = StyleConfig.oPx;
  export default class HelpCenter extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              // {title1:'自媒体营销专员',title2:'商务市场',title3:'2016-12-15',style:{marginTop:16/oPx}},
              // {title1:'客服专员',title2:'产品运营',title3:'2016-12-15',style:{marginTop:16/oPx}},
              // {title1:'财富经理',title2:'职能管理',title3:'2016-12-15',style:{marginTop:16/oPx}},

              {title1:'总裁高级助理1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'运营副总1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'项目总监1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'Java工程师1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'前端工程师1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'UI设计工程师1名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'客服专员2名',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
          ],
          choseIn:[1,1,1,1,1,1,1],
          content:[
              // <View style={styles.textView}>
              //     <Text style={styles.titleText}>岗位职责：</Text>
              //     <Text style={styles.contentText}>1、负责移动互联网自媒体平台（微信、微博）的日常运营及推广工作；</Text>
              //     <Text style={styles.contentText}>2、与粉丝互动，提升粉丝关注度、活跃</Text>
              //     <Text style={styles.contentText}>3、负责策划并执行自媒体营销日常活动及跟踪维护；</Text>
              //     <Text style={styles.contentText}>4、挖掘和分析网友使用习惯、情感及体验感受，及时掌握新闻热点，有效完成专题策划活动；</Text>
              //     <Text style={styles.contentText}>5、紧跟微信发展趋势，广泛关注标杆性公众号，积极探索微信运营模式；</Text>
              //     <Text style={styles.contentText}>6、充分了解用户需求，收集用</Text>
              //     <Text style={styles.titleText}>任职要求：</Text>
              //     <Text style={styles.contentText}>1、大专以上学历，市场营销、新闻传播、广告等专业；</Text>
              //     <Text style={styles.contentText}>2、一年以上网站或新媒体运营工作经验，有微信运营经验的优先；</Text>
              //     <Text style={styles.contentText}>3、热爱新媒体行业和自媒体运营，对微信、微博、互联网等平台较为熟悉，对移动互联网发展潮流高度关注，思维活跃、有创意；</Text>
              //     <Text style={styles.contentText}>4、具有良好的理解、沟通能力，较强的洞察力和社会交往能力；具有比较广泛的知识储备，文字表达能力强。</Text>
              //     <Text style={styles.contentText}>5、对工作极具热情，优秀的团队合作精神、积极主动，创造性强。</Text>
              //     <View style={styles.textBottom}></View>
              // </View>,
              // <View style={styles.textView}>
              //     <Text style={styles.titleText}>岗位职责：</Text>
              //     <Text style={styles.contentText}>1、通过QQ等聊天工具与客户进行沟通并推动金融产品销售；</Text>
              //     <Text style={styles.contentText}>2、回复电话咨询和线上咨询，能及时发现用户的意见及需求并记录整理及汇报；</Text>
              //     <Text style={styles.contentText}>3、回访和维护客户；</Text>
              //     <Text style={styles.contentText}>4、记录汇总咨询事件，及时分析并反馈给上级领导；</Text>
              //     <Text style={styles.contentText}>5、公司在线网络交易平台的在线客服工作。</Text>
              //     <Text style={styles.titleText}>任职要求：</Text>
              //     <Text style={styles.contentText}>1、中专及以上学历，具有P2P网贷、银行、理财、保险行业经验者优先，有呼叫中心客服经验优先；</Text>
              //     <Text style={styles.contentText}>2、普通话标准，音质佳，打字速度每分钟不低于60字，熟练使用计算机及办公软件；</Text>
              //     <Text style={styles.contentText}>3、个性开朗、反应敏捷，具有较强的上进心，具有团队合作精神，善于倾听和沟通；</Text>
              //     <Text style={styles.contentText}>4、较好的文字、语言表达能力及良好的逻辑思维能力；</Text>
              //     <Text style={styles.contentText}>5、熟悉了解会员满意度及忠诚度提升方式。</Text>
              //     <View style={styles.textBottom}></View>
              // </View>,
              // <View style={styles.textView}>
              //     <Text style={styles.titleText}>岗位职责：</Text>
              //     <Text style={styles.contentText}>1、负责公司理财产品的销售及推广；</Text>
              //     <Text style={styles.contentText}>2、根据市场营销计划，完成部门销售指标；</Text>
              //     <Text style={styles.contentText}>3、开拓新市场,发展新客户，管理维护客户关系；</Text>
              //     <Text style={styles.contentText}>4、完成团队制定的计划，配合市场部推广各项活动；</Text>
              //     <Text style={styles.contentText}>5、组织客户参加公司的理财活动，普及客户的理财意识和理财知识。</Text>
              //     <Text style={styles.titleText}>任职要求：</Text>
              //     <Text style={styles.contentText}>1、大专及以上学历，有2年工作经验，条件特别优秀者可放宽限制；</Text>
              //     <Text style={styles.contentText}>2、有理财、保险、私人银行、证券、基金、信托等从业经验者优先；</Text>
              //     <Text style={styles.contentText}>3、具有较强的逻辑表达能力，较强的沟通能力，有一定的人脉关系；</Text>
              //     <Text style={styles.contentText}>4、能承受业绩压力，为了高薪能积极努力工作。</Text>
              //     <View style={styles.textBottom}></View>
              // </View>,
              <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>5000~10000元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>性别不限，28-40岁，本科学历，5年以上相关工作经验</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>8000~15000元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>熟悉金融行业运营管理，具备优秀的团队管理能力</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>底薪+项目提成（无封顶）</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>5年以上项目管理经验，具备较强的团队管理能力</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>4500～7000元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>大专以上学历，熟悉SpringMVC的三大框架及java语言</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>4000～6500元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>大专以上学历，能够熟练使用HTML/Css/JavaScript等技术进行开发，精通JQuery、bootstrip等主流的JS框架</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>4000～6500元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>大专以上学历，能够熟练使用PS、AI、flash等设计软件，需带上设计作品面试</Text>
                  <View style={styles.textBottom}></View>
              </View>,
               <View style={styles.textView}>
                  <Text style={styles.titleText}>待遇：</Text>
                  <Text style={styles.contentText}>3000～4500元</Text>
                  <Text style={styles.titleText}>职位要求：</Text>
                  <Text style={styles.contentText}>大专以上学历，服务意识较强，具备1年以上金融服务经验</Text>
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
          <Items title1={row.title1} title2={row.title2} title3={row.title3} rightText={row.rightText} isTop={this.state.choseIn[index]==2?true:false} onPress={(index)=>{this.listPress(index)}} index={index} key={index} content={this.state.content[index]}/>
      )
  }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

      onPress(url){
          Linking.canOpenURL(url).then(supported => {
              if (supported) {
                  return Linking.openURL(url);
              }
          }).catch(err => console.error('error', err));
      }

    render(){
      return (
        <View style={styles.container}>
          <NavigationBar
              title="招贤纳士"
              leftShowIcon={true}
              leftBtnFunc={this._goBack.bind(this)}
          />
            <ScrollView>
                <View style={styles.th}>
                    <Text style={[styles.title,{marginLeft:30/oPx}]}>职位名称</Text>
                    <Text style={styles.title}></Text>
                    <Text style={styles.title}>发布时间</Text>
                </View>
                    {
                        this.state.funList.map((row, index) =>{
                            return this._funList(row,index);
                        })
                    }
                <View style={styles.topView}>
                    <Text style={styles.topText}>
                        简历发送至<Text style={styles.email} onPress={() => this.onPress('mailto:yiyun.zhu@pujinziben.com')} >yiyun.zhu@pujinziben.com</Text>，请在邮件标题中注明职位。
                    </Text>
                </View>
                <View style={{marginBottom: 150/oPx}}></View>
            </ScrollView>
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff'
    },
    textTop: {
        marginTop:20/oPx,
    },
    textBottom: {
        marginBottom: 40/oPx,
    },
    contentText: {
        lineHeight: 26,
        marginRight:30/oPx,
        color: '#333',
    },
    colorText: {
        color: '#eb3331',
    },
    topView: {
        marginTop: 30/oPx,
        marginLeft: 30/oPx,
        marginRight: 30/oPx,
    },
    topText: {
        fontSize: 28/oPx,
        lineHeight: 30,
        color: '#333',
    },
      email: {
          color: '#319bff',
      },
      th: {
          width: StyleConfig.screen_width,
          height: 80/oPx,
          backgroundColor: '#e9ecf3',
          flexDirection: 'row',
      },
      textView: {
        marginLeft: 30/oPx,
      },
      title: {
          flex: 1,
          fontSize: 28/oPx,
          color: '#999',
          height: 80/oPx,
          lineHeight: 34,
      },
      titleText: {
          fontSize: 28/oPx,
          color: '#999',
          marginTop: 30/oPx,
          marginBottom: 20/oPx,
      },
      bottomBorder:{
          borderColor:'#e0e0e0',
          borderBottomWidth:StyleConfig.borderWidth
      },
  });
