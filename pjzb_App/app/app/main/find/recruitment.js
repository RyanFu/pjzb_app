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

              {title1:'行政前台',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'文案策划',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
              {title1:'人力资源主管',title2:'',title3:'2017-5-8',style:{marginTop:16/oPx}},
          ],
          choseIn:[1,1,1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <Text style={styles.titleText}>岗位职责：</Text>
                  <Text style={styles.contentText}>1、协助总裁处理各类信件，起草信函、演讲稿、报告、文件等各类综合性文件；</Text>
                  <Text style={styles.contentText}>2、做好各部门及各领导上报行文的保存、管理、督办的工作；</Text>
                  <Text style={styles.contentText}>3、合理安排、提醒总裁的日常工作时间和程序；</Text>
                  <Text style={styles.contentText}>4、整理公司重要会议记录及会议纪要；</Text>
                  <Text style={styles.contentText}>5、关注公司内各部门信息沟通情况，及时传达上级的各项指令；</Text>
                  <Text style={styles.contentText}>6、接待访问总裁的重要来宾；</Text>
                  <Text style={styles.contentText}>7、完成总裁交办的其他工作的督办、协调及落实任务；</Text>

                  <Text style={styles.titleText}>岗位要求：</Text>
                  <Text style={styles.contentText}>形象好，气质佳，会应酬，口才好，成熟稳重，有亲和力，诚实守信，沟通能力，性格开朗，品行端正，声音甜美，长相端正，工作负责；</Text>
                  <Text style={styles.contentText}>1、文秘、行政管理等相关专业大专以上学历；</Text>
                  <Text style={styles.contentText}>2、2年以上文秘工作，对于会议管理、记录等具有丰富的经验；</Text>
                  <Text style={styles.contentText}>3、工作认真细致，有条理性、逻辑性，良好的职业素养和职业操守，具有良好书面写作及表达能力；</Text>
                  <Text style={styles.contentText}>4、熟练使用Word、Excel等文字处理软件，较好英文听、说能力；</Text>
                  <Text style={styles.contentText}>5、身高163以上，形象气质好，年龄30岁以下。董事长助理；</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <Text style={styles.titleText}>岗位职责：</Text>
                  <Text style={styles.contentText}>1、公司文字编辑工作；</Text>
                  <Text style={styles.contentText}>2、以效果为导向甄选相应内容进行微信粉丝获取；</Text>
                  <Text style={styles.contentText}>3、通过微信公众号和微博扩大品牌影响力；</Text>
                  <Text style={styles.contentText}>4、策划和执行适合理财的线上宣传内容，保证粉丝的活跃度和粘性；</Text>
                  
                  <Text style={styles.titleText}>岗位要求：</Text>
                  <Text style={styles.contentText}>1、大专以上学历、1-2年以上编辑经验，中文专业优先考虑；</Text>
                  <Text style={styles.contentText}>2、熟悉微信软件、较好的文案功底、新闻敏感度高；</Text>
                  <Text style={styles.contentText}>3、懂摄影、会修图、审美观较好；</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>   
                  <Text style={styles.titleText}>岗位职责：</Text>
                  <Text style={styles.contentText}>1.负责公司人事制度建立及实施；</Text>
                  <Text style={styles.contentText}>2.负责公司人力岗位的编制及招聘、培训、考核工作；</Text>
                  <Text style={styles.contentText}>3.负责公司企业文化的建立及持续的改善；</Text>
                  <Text style={styles.contentText}>4.负责公司薪资制度的建立及完善；</Text>
                  <Text style={styles.contentText}>5.制定公司规章制度，制定员工奖励、激励、惩罚措施，并监督实施；</Text>
                  <Text style={styles.contentText}>6.组织协调好公司活动、会议及户外推广活动；</Text>
                  <Text style={styles.contentText}>7.负责行全体员工的日常管理工作；确保公司安全稳定正常运作；</Text>
                  <Text style={styles.contentText}>8.建立和完善后勤管理各项规章制度；并负责监督、执行与追踪；</Text>
                  
                  <Text style={styles.titleText}>岗位要求：</Text>
                  <Text style={styles.contentText}>1.在大型企业有过人力资源部主管工作经验，至少2年以上；</Text>
                  <Text style={styles.contentText}>2.具有较好的沟通协调能力，组织管理能力，较强的执行力，形象气质佳；</Text>
                  <Text style={styles.contentText}>3.在互联网金融领域担任过人事行政主管者且有这一领域丰富的人脉资源者；</Text>
                  <View style={styles.textBottom}></View>
              </View>,

              // <View style={styles.textView}>
              //     <Text style={styles.titleText}>待遇：</Text>
              //     <Text style={styles.contentText}>5000~10000元</Text>
              //     <Text style={styles.titleText}>职位要求：</Text>
              //     <Text style={styles.contentText}>性别不限，28-40岁，本科学历，5年以上相关工作经验</Text>
              //     <View style={styles.textBottom}></View>
              // </View>,
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
                        简历发送至<Text style={styles.email} onPress={() => this.onPress('mailto:xinyan.feng@pujinziben.com')} >xinyan.feng@pujinziben.com</Text>，请在邮件标题中注明职位。
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
