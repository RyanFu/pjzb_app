/**
 * Created by wsl on 2017/01/13.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ListView,
   RefreshControl,
   InteractionManager,
   CameraRoll,
   ImageEditor,
   Alert,
   Platform,
   TouchableWithoutFeedback,
   Linking,
   NetInfo,
 } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import Swiper from 'react-native-swiper';
  import Product from '../../components/Product';
  import ZQProduct from '../../components/ZQProduct';
  import InvestDetail from '../invest/InvestDetail';
  import InvestDetailTY from '../invest/InvestDetailTY';
  import Request from '../../utils/Request';
  import WeChat from '../../utils/WeChat';
  import Login from '../other/login';
  import SafetyPage from '../other/safetyPage';
  import {StyleConfig} from '../../style';
  import {styles} from '../../style/main';
  import Storage from '../../utils/Storage';
  import {toastShort} from '../../utils/Toast';
  import AppDownLoad from './appDownLoadPage';
  import GgxqPage from '../find/ggxqPage';
  import Announcement from '../find/announcement';
  import Activity from '../activity/index';
  import GSDTIntroduction2 from '../find/GSDTIntroduction2';
  import MTBDIntroduction2 from '../find/MTBDIntroduction2';
  import ShareholdersBackground from '../find/shareholdersBackground';
  import InviteFriendsHome from '../user/inviteFriendsHome';
  import RegIpayPersonal from '../user/regIpayPersonal';
  import SLBaoPage from '../user/SLBaoPage';
  import Button from '../../components/Button';
  import Error from '../error/Error.js';
  import NetUtil from '../../utils/NetUtil.js';
  import ZQZRInvestmentDetails from '../invest/ZQZRInvestmentDetails';
  import OwebView from '../../components/OwebView';
  import CouponCard from '../../main/user/couponCard';

const oPx = StyleConfig.oPx;
 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 import  ImagePicker from 'react-native-image-picker';
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
 export default class Index extends Component {
   constructor(props){
     super(props);
     this.bannerCount = 0;
     this.state = {
       defaultBanner:require('../../images/index/default.png'),
       sweiperIndex:1,
       bannerLoad:true,
       dataSource:ds.cloneWithRows(global.indexData?global.indexData.dataSource:[]),
       bannerList:global.indexData?global.indexData.bannerList:[],
       isRefreshing:false,
       showLogin:true,
       totalInvestNum:global.indexData?global.indexData.totalInvestNum:0,
       experienceBorrow:global.indexData?global.indexData.experienceBorrow:{annualRate:'0',deadline:0,investNum:0},
       gsdtList:global.indexData?global.indexData.gsdtList:[],
       islogin:global.indexData?global.indexData.islogin:0,
       isExgo:global.indexData?global.indexData.isExgo:0,
       isxsBiao:global.indexData?global.indexData.isxsBiao:0,
       xsBorrow:global.indexData?global.indexData.xsBorrow:{},
       mapZQ:ds.cloneWithRows(global.indexData?(global.indexData.mapZQ?global.indexData.mapZQ:[]):[]),
       listZQ: null,
       xsAnnualRate: 0,
       // android 最新版本
       androidMap: global.indexData?global.indexData.androidMap:[],
       // iso 最新版本
       iosMap: global.indexData?global.indexData.iosMap:[],
       // 是否发生网络错误
       isError: this.props.isError,
       // 风险评估次数
       riskCount: 1,

     }
   }
   componentWillMount(){
     setTimeout(()=>{if(!global.USER){
       this.setState({showLogin:false});
     }},200);
   }
   componentDidMount(){
       //获取标的信息和banner的数据
       if (!this.state.isError)
          this._getData();

       this._refresh();

   }

   //获取数据
   _getData(){
      Request.post('getBannerAndBorrows.do',{uid:''},(data)=>{
       this.setState({
         dataSource:ds.cloneWithRows(data.recommendBorrowList),
         mapZQ:data.mapZQ?ds.cloneWithRows(data.mapZQ):null,
         listZQ: data.mapZQ,
         bannerList:data.bannerList,
         experienceBorrow:data.experienceBorrow[0],
         totalInvestNum:data.experienceBorrow[1].experienceBorrowCount,
         gsdtList:data.pageBean.page,
         // 新手标
         xsBorrow: data.xsBorrow?data.xsBorrow[0]:{},
         // 是否投资新手标
         isxsBiao: data.isxsBiao,
         // 新手标年化收益
         xsAnnualRate: data.xsBorrow?data.xsBorrow[0].showRate:0,
         // android 最新版本
         androidMap: data.androidMap,
         // iso 最新版本
         iosMap: data.iosMap,
         // 网络正常
         isError: false,
         riskCount: data.riskCount,
       });
      // 是否有红包 data.money
      if (data.money) {
        this.props._showRedEnvelope(true, data.money, this._goCouponCard);
      }

       if(data.hasOwnProperty("isExgo")){
           this.setState({
               islogin:1,
               isExgo:data.isExgo,
           });
       }
      // 跳转到首页后检查更新信息
      this._isVersionUpdate();

     },(error)=>{
      if (this.state.bannerList == [] || this.state.bannerList == null || this.state.bannerList == '')
        this.setState({isError: true});
     });

   }

   _refresh() {
      this.interval=setInterval(() =>{
          Request.post('getRecommendBorrow.do',{uid:''},(data)=>{
            this.setState({
               dataSource:ds.cloneWithRows(data.recommendBorrowList),
            });
          });
      },1000*60);
   }

   async _isVersionUpdate() {
    // 获得当前年月日
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    date = year+'/'+month+'/'+day;
    date = new Date(Date.parse(date)).getTime();

    /* 
      如果全局变量中没有存储过时间，说明从没有提示过。
      如果当前时间大于全局变量中存储的提醒时间，那么说明今天还未提示过，如果相等就不在提示。
    */
    // Storage.clear();

    let warnDate = await Storage.getItem('WARN_DATE');
    if (!warnDate || warnDate.date < date) {
      Storage.setItem('WARN_DATE', {date: date});
      this._getVersionUpdate();
    }
   }

   _getVersionUpdate() {
    if (this.state.iosMap && this.state.androidMap) {
        if (Platform.OS === 'ios' && this.state.iosMap.version > global.packageVersion) {
          this.props._showVersionUpdate(true, this.state.iosMap);
        } else if (Platform.OS === 'android' && this.state.androidMap.version > global.packageVersion) {
          this.props._showVersionUpdate(true, this.state.androidMap);
        }
      }
   }

    // 跳转我的赠券
     _goCouponCard = () => {
        this.props.navigator.push({component:CouponCard,name:'CouponCard'});
     }

   //生成list
   _renderRow = (data) => {
     return (
        <Product data={data} onPress={this._pressRow.bind(this)}/>
      );
   }
   _onRefresh = () => {
     this._getData();
   }

   _gsdt = () => {
    this.setState({sweiperIndex:0})
       this.props.navigator.push({component:GSDTIntroduction2,name:'GSDTIntroduction2',params:{title:'公司动态'}});
   }
   _ptgg = () => {
    this.setState({sweiperIndex:0})
       this.props.navigator.push({component:Announcement,name:'Announcement'});
   }

   //产品点击事件
   _pressRow(id,title){
    this.setState({sweiperIndex:0})
    InteractionManager.runAfterInteractions(
      this.props.navigator.push({component:InvestDetail,name:'InvestDetail',params:{borrowId:id,borrowTitle:title}})
    );
   }

    //债权点击事件
   _pressRowZQ(id,title){
    this.setState({sweiperIndex:0})
    InteractionManager.runAfterInteractions(
      this.props.navigator.push({component:ZQZRInvestmentDetails,name:'ZQZRInvestmentDetails',params:{debtId:id,debtTitle:title}})
    );
   }

   // 跳转体验标
   async _onPress(id){
    let data = await Storage.getItem('USER')
     if(data){
        this.setState({sweiperIndex:0})
         this.props.navigator.push({component:InvestDetailTY,name:'InvestDetailTY',params:{id:this.state.experienceBorrow.id}})
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
    // 跳转新手标
   async _onPressXS(){
    let data = await Storage.getItem('USER')
     if(data){
        this.setState({sweiperIndex:0})
        this._pressRow(this.state.xsBorrow.id, '新手标');
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

   _imgLoad = () =>{
    this.bannerCount = this.bannerCount+1;
    if(this.bannerCount == this.state.bannerList.length){
      this.setState({bannerLoad:false})
    }
   }

   _swiper(row,index){
       // if (Platform.OS === 'ios') {
           return <TouchableWithoutFeedback
               key={index}
               delayLongPress={1000}
               onPress={() => this.bannerOnPress(row.link)}
               onLongPress={() => this.download(row.bannerPath)}
               activeOpacity={1}>
               <View style={styles.slide} >
                   <Image style={styles.img} source={{uri:row.bannerPath}} onLoadEnd={this._imgLoad}/>
               </View>
           </TouchableWithoutFeedback>
       // }
       // return <View style={styles.slide} key={index}>
       //         <Image style={styles.img} source={{uri:row.bannerPath}} onLoadEnd={this._imgLoad}/>
       //     </View>
   }

 // ======================点击banner图跳转到公告，动态，媒体报道，活动，邀请好友页面等===========begin===========
   toDynamicAndMedia(id, newstype) {
      Request.post('queryAppToMediaReport.do',{id: id, newstype: newstype},(data)=>{
        if(data.error == '0'){
          this.bannerToPage(data.item.title, data.item.publishTime, this._imgClip(data.item.content), data.item.id, false, newstype);
        }
      },(error)=>{
          // Alert.alert("提示",'您的网络不稳定，请稍后再试！');
      }); 
   }

   bannerToPage(title, publishTime, html, id, back, newstype) {
        this.props.navigator.push({
            name: 'GgxqPage',
            component: GgxqPage,
            params:{
                titleText:title,
                time:publishTime,
                content:html,
                title: newstype == 1 ? '公司动态' : '媒体报道',
                url:Request.wapWeChatPath+"?id="+id,
                weChat:true,
                back: back
            }
        })
    }

    toAnnouncement(id) {
      Request.post('queryAppToAnnouncement.do',{id: id},(data)=>{
        if(data.error == '0'){
          this.bannerToPage_1(data.item.title, data.item.userName, data.item.publishTime,data.item.content,data.item.id, false);
        }
      },(error)=>{
          // Alert.alert("提示",'您的网络不稳定，请稍后再试！');
      }); 
    }

    bannerToPage_1(titleText, userName, time, content, id, back) {
        let html = '<div style="font-size:'+22/oPx+'px;!important;padding:0 30px;">'+content.replace(/font-size:+.{4};/g,'');+'</div>';
        this.props.navigator.push({
            name: 'GgxqPage',
            component: GgxqPage,
            params:{
                titleText:titleText,
                userName:userName,
                time:time,
                content:html,
                title:'平台公告',
                url:Request.wapWeChatPath+"?id="+id+"&flag=1",
                weChat:true,
                back: back
            }
        })
    }

    //图片格式化
    _imgClip(str){
        str=str+'';
        str = str.replace(/<img/g,'<img style="width:'+ (StyleConfig.screen_width-20) +'px;" ');
        return str.replace(/height/g,'width');
    }

    bannerOnPress(link) {
      if (!link) {
        return;
      } else if (link == 'appDownLoad') {
        // app下载页
        this.props.navigator.push({component:AppDownLoad,name:'AppDownLoad'})
      } else if (link.indexOf('Announcement') != -1) {
        // banner链接到公告
        let id = link.substring(link.indexOf('_') + 1, link.length);
        this.toAnnouncement(id);

        // this.props.navigator.push({component:Announcement,name:'Announcement',params: {toId:id}});

      } else if (link.indexOf('Dynamic') != -1) {
        // banner链接到公司动态
        let id = link.substring(link.indexOf('_') + 1, link.length);
        this.toDynamicAndMedia(id, 1);

      } else if (link.indexOf('Media') != -1) {
        // banner链接到媒体报道
        let id = link.substring(link.indexOf('_') + 1, link.length);
        this.toDynamicAndMedia(id, 2);

      } else if (link == 'Activity2') {
        // banner点击进入邀请好友页面
        this._goToYQYL();

      } else if (link.indexOf('Activity') != -1) {
        // banner点击进入活动页面
        let url = link.substring(link.indexOf('_') + 1, link.lastIndexOf('_'));
        let title = link.substring(link.lastIndexOf('_') + 1, link.length);
        this.props.navigator.push({component:Activity,name:'Activity',params: {Activity_url:url,Activity_title:title}});

      } else if (link == 'SLBao') {
        let data = global.USER;
        if(data){
          Request.post('findIpayAccountByUserId.do',{uid: ''},(data)=>{
            if(data.error == '0'){
                if (data.user != null && data.user.ipayAccount != null && data.user.ipayAccount != '') {
                   this.props.navigator.push({component:SLBaoPage,name:'SLBaoPage'});
                } else {
                  Alert.alert(
                      '提示信息',
                      '请先注册汇付天下',
                      [
                          {text: '取消', },
                          {text: '确定', onPress: () =>
                              this.props.navigator.push({component:RegIpayPersonal,name:'RegIpayPersonal',params: {
                                  backUser:{true}
                              }})},
                      ]
                  )
                }
              } else {
                  Alert.alert('提示',data.msg);
              }
              this.setState({showDialog:false});
          },(error)=>{
              Alert.alert("提示",'您的网络不稳定，请稍后再试！');
          }); 
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
   }
   // ======================点击banner图跳转到公告，动态，媒体报道，活动，邀请好友页面等===========end===========

    download(path) {
        Alert.alert(
           '提示',
           '将此图片进行',
           [
               {text:'保存', onPress: () => this.downloadImg(path)},
               {text:'分享朋友', onPress: () => this.shareFriends(path)},
               {text:'分享朋友圈', onPress: () => this.shareFriendsCircle(path)},
               {text:'取消', },
           ]
       );
    }

    // 保存图片
    downloadImg(path) {
        if(Platform.OS === 'ios') {
            CameraRoll.saveToCameraRoll(path,'photo').done(function(data){
                toastShort('保存图片成功',0);
            },function(err){
                toastShort('保存图片失败',0);
            });
        } else {
            Image.getSize(path, (width, height) => {
                ImageEditor.cropImage(
                    path,
                    {offset:{x:0,y:0},size:{width:width, height:height}},
                    (croppedURI)=>{
                        CameraRoll.saveToCameraRoll(croppedURI,'photo').done(function(data){
                            toastShort('保存图片成功',0);
                        },function(err){
                            toastShort('保存图片失败',0);
                        });
                    },
                    (err)=>true
                );
            });
        }
    }

    // 分享到微信朋友
    shareFriends(path) {
      WeChat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            WeChat.shareToSession({
               type: 'imageUrl',
               title: '图片分享',
               imageUrl: path
            });
          } else {
            Alert.alert(
                '提示',
                '您的手机未安装微信，需安装微信才能分享！',
                [
                    {text: '确定', },
                ]
            );
          }
        });
    }

    // 分享到朋友圈
    shareFriendsCircle(path) {
      WeChat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            WeChat.shareToTimeline({
               type: 'imageUrl',
               title: '图片分享',
               imageUrl: path
            });
          } else {
            Alert.alert(
                '提示',
                '您的手机未安装微信，需安装微信才能分享！',
                [
                    {text: '确定', },
                ]
            );
          }
        });
    }

   //登陆注册页面
   loginOrRegist = () => {
    this.setState({sweiperIndex:0})
      this.props.navigator.push({
       component: Login,
       name: 'Login'
      });
     
   }
   //安全保障
    _goToSafty = () => {
      this.setState({sweiperIndex:0})
      this.props.navigator.push({
        component: SafetyPage,
        name: 'SafetyPage'
      });
    }

    // 国资背景
    _goToGZBJ = () => {
      this.setState({sweiperIndex:0})
        this.props.navigator.push({
            component: ShareholdersBackground,
            name: 'ShareholdersBackground'
        });
    }

    // 邀请有礼
    _goToYQYL = () => {
      let data = global.USER;
      if(data){
        this.setState({sweiperIndex:0})
          this.props.navigator.push({component:InviteFriendsHome,name:'InviteFriendsHome',params:{id:this.state.experienceBorrow.id}})
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

    // 风险评估
    _goToFXPG = () => {
      let data = global.USER;
      if(data){
        // if (this.state.riskCount == 0) {
          let url = Request.HOST + "/riskquestion.html";
          this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:url,title:'风险承受能力测评',back:{true}}});
        // } else {
        //    Alert.alert(
        //       '提示信息',
        //       '您已经提交过测评，谢谢！',
        //       [
        //           {text: '确定'},
        //       ]
        //   )
        // }
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

     //文本格式化
     _textClip(str){
         str=str+'';
         return str.replace(/<[^>]+>|\n|\s|&nbsp;/g,'');
     }

     //图片格式化
     _imgClip(str){
         str=str+'';
         str = str.replace(/<img/g,'<img style="width:'+ (StyleConfig.screen_width-20) +'px;" ');
         return str.replace(/height/g,'width');
     }

     _swiper_gsdt(row,index){
         let c = this._imgClip(row.content);
         let content = this._textClip(row.content);
         return <View style={styles.index_footer_box} key={index}>
             <View style={styles.imageView}>
                 <TouchableOpacity onPress={(html) => this.gsdt_detail(row.title,row.publishTime,c,row.id)} activeOpacity={1}>
                    <Image source={{uri:row.imgPath}} style={style.imgs} />
                 </TouchableOpacity>
             </View>
             <View style={style.textView}>
                 <View style={style.titleView}>
                     <Text numberOfLines={1} onPress={(html) => this.gsdt_detail(row.title,row.publishTime,c,row.id)} style={style.titleText}>{row.title}</Text>
                 </View>
                 <View style={style.contentView}>
                     <Text numberOfLines={3} onPress={(html) => this.gsdt_detail(row.title,row.publishTime,c,row.id)} style={style.contentText}>{content}</Text>
                 </View>
             </View>
         </View>
     }

    //公司动态详情
    gsdt_detail(title,publishTime,html,id) {
      NetInfo.isConnected.fetch().done(function(isConnected){
        if (!isConnected) { // 当前无网络
          toastShort('已断开网络连接，请检查您的网络设置',350);
          return;
        }
      });

      this.setState({sweiperIndex:0});
        this.props.navigator.push({
           name: 'GgxqPage',
           component: GgxqPage,
           params:{
               titleText:title,
               time:publishTime,
               content:html,
               title:'公司动态',
               url:Request.wapWeChatPath+"?id="+id,
               weChat:true,
           }
        })
     }

    _getXSBiao() {
      let component;
      if (this.state.xsBorrow && this.state.xsBorrow.isShow === 1) {
        component = <View style={styles.xsBaoView}>
                  <View style={styles.xsView}>
                    <View style={styles.xsTitleView}>
                      <View style={{flexDirection: 'row'}}>
                        <Image style={styles.xsBaoImg} source={require('../../images/index/icon_index_xsBao2.png')} />
                        <Text style={{color: '#333', fontSize: 28/oPx, marginLeft: 5/oPx, marginTop: 3/oPx}}>新手专享标</Text>
                      </View>
                      <Text style={{color: '#eb3331', fontSize: 50/oPx, flex: 2.5, fontWeight:'200'}}>{this.state.xsAnnualRate}
                        <Text style={{fontSize:26/oPx, color:'#eb3331', alignSelf:'flex-end', fontWeight:'500'}}>%</Text>
                      </Text>
                      <Text style={{color: '#999', fontSize: 22/oPx, flex: 1}}>预期年化收益率</Text>
                    </View>
                    <View style={styles.xsMothView}>
                      <Text style={{fontSize: 50/oPx, color: '#333', marginTop: 40/oPx,fontWeight:'200',}}>{this.state.xsBorrow.deadline}
                        <Text style={{fontSize: 28/oPx, color: '#333'}}>个月</Text>
                      </Text>
                      <Text style={{fontSize: 22/oPx, color: '#999'}}>项目期限</Text>
                    </View>
                    <View style={styles.xsBtnView}>
                      {
                        this.state.islogin === 1 && this.state.isxsBiao > 0
                        ?
                        <Image style={{width: 160/oPx, height: 46/oPx, justifyContent:'center',marginTop: 20/oPx}} source={require('../../images/index/icon_index_xsBtn_1.png')}>
                          <Text style={{backgroundColor: 'transparent', color: '#fff', alignSelf:'center'}}>新手可投</Text>
                        </Image>
                        :
                        <Button imgSource={require('../../images/index/icon_index_xsBtn.png')}
                            text="立即投资" textColor="#fff"
                            onPress={()=>this._onPressXS()}
                            width={160/oPx}
                            height={46/oPx}
                            style={{marginTop: 20/oPx}}
                        />
                      }
                      <View style={{marginTop: 20/oPx}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{
                              height:8/oPx,
                              backgroundColor:'#fbdbdb',
                              borderRadius:4/oPx,
                              width:100/100*152/oPx
                            }}>
                            <View style={{
                                  height:8/oPx,
                                  backgroundColor:'#eb3331',
                                  borderRadius:4/oPx,
                                  width:this.state.xsBorrow.schedules/100*152/oPx
                              }} />
                          </View>
                          <Text style={{fontSize:22/oPx, color:'#999', fontWeight:'200',marginLeft: 10/oPx}}>{this.state.xsBorrow.schedules}%</Text>
                        </View>
                        <View style={{height:50/oPx, justifyContent:'center',}}>
                          <Text style={{fontSize:22/oPx, color:'#999', fontWeight:'200',}}>募集总额/{this.state.xsBorrow.borrowAmount}万元</Text>
                        </View>
                      </View>
                    </View>
                </View>
              </View>;
      }
      if (this.state.islogin === 1 && this.state.isxsBiao > 0) {
        return  component;
      } else {
        return  <TouchableOpacity activeOpacity={0.5} onPress={() => this._onPressXS()}>{component}</TouchableOpacity> 
      }
    }


    // 生成list
    _renderRowZQ = (data) => {
      return (
        <ZQProduct data={data} onPress={this._pressRowZQ.bind(this)}/>
      );
    }

    _getZQZR() {
      if (this.state.listZQ != '[]' && this.state.listZQ != null && this.state.listZQ != '') {
        return <View style={styles.product}>
                 <View style={[styles.exp_title,styles.noborder]}>
                   <Text style={styles.exp_title_text}>债权转让</Text>
                 </View>
                 <ListView
                    dataSource={this.state.mapZQ}
                    renderRow={this._renderRowZQ}
                    enableEmptySections={true}
                  />
               </View>;
      }
    }

   render(){
    return (
      <View style={{flex:1}}>
         <NavigationBar
           title={"普金资本"}
           rightDisplay={this.state.showLogin}
           rightTitle={"登录/注册"}
           rightBtnFunc={this.loginOrRegist}
         />
          {
            this.state.isError
            ?
            <Error onPress={this._getData.bind(this)} />
            :
            <ScrollView contentContainerStyle={styles.contentContainer}
               refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  tintColor="#ff0000"
                  title="刷新中..."
                  titleColor="#999"
                />}
               >
              
              <View style={styles.swiper}>
                {this.state.bannerLoad?<View style={styles.slide}>
                  <Image style={styles.img} source={this.state.defaultBanner}/>
                 </View>:null}
               <Swiper height={400/oPx} autoplay={true} index={this.state.sweiperIndex} showsButtons={false} showsPagination={false}>
                  {
                    this.state.bannerList.map((row, index) =>{
                        return this._swiper(row,index);
                    })
                  }
               </Swiper>
             </View>
             <View style={styles.index_about}>
               <TouchableOpacity activeOpacity={0.8} style={styles.about} onPress={this._goToGZBJ}>
                 <Image style={styles.about_img} source={require('../../images/index/icon_index_gz.png')}/>
                 <Text style={styles.about_text}>国资背景</Text>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.8} style={styles.about} onPress={this._goToSafty}>
                 <Image style={styles.about_img} source={require('../../images/index/icon_index_safe.png')}/>
                 <Text style={styles.about_text}>安全保障</Text>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.8} style={styles.about} onPress={this._goToYQYL}>
                 <Image style={styles.about_img} source={require('../../images/index/icon_index_invit.png')}/>
                 <Text style={styles.about_text}>邀请有礼</Text>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.8} style={styles.about} onPress={this._goToFXPG}>
                 <Image style={styles.about_img} source={require('../../images/index/icon_index_fxpg.png')}/>
                 <Text style={styles.about_text}>风险测评</Text>
               </TouchableOpacity>
             </View>

            {/* 体验标 */}
            {/* <Image style={styles.experiences} source={require('../../images/index/finance_experience_background.png')}>*/}
            {/*    <View style={styles.lefts_exp_rate}>*/}
            {/*       <View style={styles.exp_rate}>*/}
            {/*           <Text style={[styles.exp_rate_big,{backgroundColor: "transparent",}]}>{this.state.experienceBorrow.annualRate}.00</Text><Text style={[styles.exp_rate_small,{backgroundColor: "transparent",}]}>%</Text><Text style={[styles.exp_title_texts,{backgroundColor: "transparent",}]}>理财体验标</Text>*/}
            {/*       </View>*/}
            {/*        {this.state.islogin === 1 && this.state.isExgo>0?<Image style={styles.exp_image_btn} source={require('../../images/index/index_miss_button.png')}>*/}
            {/*                <Text style={{backgroundColor:'transparent',textAlign:'center',color:'#fff', fontSize:24/oPx,}}>*/}
            {/*                    您已投资*/}
            {/*                </Text>*/}
            {/*            </Image>:*/}
            {/*       <TouchableOpacity onPress={()=>this._onPress()} >*/}
            {/*         <Image style={styles.exp_image_btn} source={require('../../images/index/index_buy_button.png')}>*/}
            {/*             <Text style={{backgroundColor:'transparent',textAlign:'center',color:'#fff', fontSize:24/oPx,}}>*/}
            {/*                 立即投资*/}
            {/*             </Text>*/}
            {/*         </Image>*/}
            {/*       </TouchableOpacity>}*/}
            {/*    </View>*/}
            {/* </Image>*/}

            {/* 新手标 */}
            { this._getXSBiao() }

             <View style={styles.product}>
               <View style={[styles.exp_title,styles.noborder]}>
                 <Text style={styles.exp_title_text}>投资推荐</Text>
               </View>
               <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}
                  enableEmptySections={true}
                />
             </View>

            {/* 推荐债权转让 */}
            { this._getZQZR() }

             <View style={styles.index_footer}>
               <View style={[styles.index_footer_title]}>
                   <View>
                      <View style={styles.line_style}></View>
                      <Text style={styles.footer_title_text}>公司动态</Text>
                   </View>
                   <TouchableOpacity onPress={this._gsdt}>
                      <Text style={styles.footer_more_text}>更多》</Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.slide}>
                   <Swiper height={200/oPx} autoplay={true} showsButtons={false} showsPagination={false} autoplayTimeout={5}>
                       {
                           this.state.gsdtList.map((row, index) =>{
                               return this._swiper_gsdt(row,index);
                           })
                       }
                   </Swiper>
               </View>
             </View>
           </ScrollView>
          }
          <NetUtil />
       </View>
    );
   }
 }

const style = StyleSheet.create({
    textView: {
        height: 180/oPx,
        paddingRight: 30/oPx,
        flex:1,
        marginLeft: 30/oPx,
        backgroundColor:'transparent'
    },
    titleText: {
        fontSize: 36/oPx,
        color: '#333',
    },
    contentText: {
        fontSize: 26/oPx,
        color: '#999',
        lineHeight: 22,
    },
    imgs: {
        width: 316/oPx,
        height: 170/oPx,
        marginLeft: 30/oPx,
    },
    titleView: {
        height: 50/oPx,
    },
    contentView: {
        height: 100/oPx,
    },
});
