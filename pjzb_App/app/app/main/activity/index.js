/**
 * Created by wsl on 2017/02/05.
 */
  'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    RefreshControl,
    Alert,
    ActivityIndicator
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import Loading from '../../components/Loading';
  import Request from '../../utils/Request';
  import {StyleConfig} from '../../style';
  import OwebView from '../../components/OwebView';
  import Questionnaire from '../other/questionnaire';
  import Login from '../other/login';
  import {toastShort} from '../../utils/Toast';
  import Error from '../error/Error.js';
  import NetUtil from '../../utils/NetUtil.js';

  const oPx = StyleConfig.oPx;
  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class About extends Component {
    constructor(props){
      super(props);
      this.state = {
        oData:[],
        dataSource:ds.cloneWithRows([]),
        activityList:[],
        isRefreshing:false,
        animating:true,
        curPage:1,
        isEmpty:false,
        isShowBottomRefresh:true,
        // 是否发生网络错误
        isError: this.props.isError,
      }
    }
    componentDidMount(){
      this._getRequest();
    }
    //获取数据
    _getRequest(flag){
      if (this.props.Activity_url) {
        this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:this.props.Activity_url,title:this.props.Activity_title}});
      } else {
        Request.post('getActivity.do',{curPage:this.state.curPage,uid:''},(data)=>{
          if(data.error == '0'){
            if(data.surveyCount && data.surveyCount>0){
              global.surveyCount = true;
            }else{
              global.surveyCount = false;
            }
            if(data.pageBean.page.length == 0){
              this.setState({
                isRefreshing:false,
                isEmpty:true,
                oData:[],
                dataSource:ds.cloneWithRows([]),
                animating:false
              });
              return;
            };
            if(data.pageBean.totalPageNum>1){
              this.setState({isShowBottomRefresh:true});
            }else{
              this.setState({isShowBottomRefresh:false});
            }
            this.setState({totalPageNum:data.pageBean.totalPageNum,isError: false});
            if(flag){
              let result = this.state.oData.concat(data.pageBean.page);
              this.setState({
                oData:result,
                dataSource:ds.cloneWithRows(result),
                isRefreshing:false,
                animating:false,
                isEmpty:false
              });
            }else{
              this.setState({
                animating:false,
                curPage:1,
                oData:data.pageBean.page,
                dataSource:ds.cloneWithRows(data.pageBean.page),
                isRefreshing:false,
                isEmpty:false
              });
            }
          }
          
        },(error)=>{
          if (this.state.oData == [] || this.state.oData == null || this.state.oData == '')
            this.setState({isError: true});
          this.setState({isRefreshing: false});
        });
      }
    }
    _onPress(link,title){
      if(link==''){
        if(!global.USER){
          Alert.alert(
               '提示信息',
               '您还未登录，请先登录！',
               [
                   {text: '取消' },
                   {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
               ]
           )
        }else{
          if(global.surveyCount){
            Alert.alert(
               '提示信息',
               '您已提交过问卷，谢谢！',
               [
                   {text: '确定' }
               ]
            );
            return;
          }
          this.props.navigator.push({component:Questionnaire,name:'Questionnaire'});
        }
        return;
      } else {
        if(!global.USER){
          Alert.alert(
               '提示信息',
               '您还未登录，请先登录！',
               [
                   {text: '取消' },
                   {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
               ]
           )
          return;
        }
      }
      console.log(link);
      this.props.navigator.push({component:OwebView,name:'OwebView',params:{url:link,title:title,back:true}});
      
    }
    _question(){
      if(!global.USER){
          Alert.alert(
               '提示信息',
               '您还未登录，请先登录！',
               [
                   {text: '取消' },
                   {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
               ]
           )
        }else{
          this.props.navigator.push({component:Questionnaire,name:'Questionnaire'});
        }
    }
    _renderRow(data){
      if(data.days<0){
        return (
          <View style={styles.list}>
            <View style={styles.list}>
              <View style={styles.topText}><Text style={{fontSize:36/oPx,fontWeight:'200',color:'#333'}}>{data.title}</Text></View>
              <View style={styles.image}>
                <Image style={styles.listDialog} source={require('../../images/other/activity_bg.png')}/>
                <Image style={styles.image} source={{uri:data.imgPath}}/>
              </View>
              <View style={styles.bottomText}><Text style={{color:'#777777',fontSize:22/oPx,fontWeight:'300'}}>{data.startTime+'到'+data.endTime}</Text></View>
            </View>
          </View>
        )
      }
      let timeText = data.endTime ? data.startTime+'到'+data.endTime : data.startTime+'开始';
      return (
        <TouchableOpacity style={styles.list} onPress={this._onPress.bind(this,data.linkAddress,data.title)}>
          <View style={styles.list}>
            <View style={styles.topText}><Text style={{fontSize:36/oPx,fontWeight:'200',color:'#333'}}>{data.title}</Text></View>
            <Image style={styles.image} source={{uri:data.imgPath}}/>
            <View style={styles.bottomText}><Text style={{color:'#777777',fontSize:22/oPx,fontWeight:'300'}}>{timeText}</Text></View>
          </View>
        </TouchableOpacity>
      )
    }
    renderHeader = () => {
      return <TouchableOpacity style={styles.list} onPress={this._question.bind(this)}>
          <View style={styles.list}>
            <View style={styles.topText}><Text style={{fontSize:36/oPx,fontWeight:'200',color:'#333'}}>参与问券，送代金券</Text></View>
            <Image style={styles.image} source={require('../../images/other/question.png')}/>
            <View style={styles.bottomText}><Text style={{color:'#777777',fontSize:22/oPx,fontWeight:'300'}}>长期有效</Text></View>
          </View>
        </TouchableOpacity>
      
    }
    _renderFooter = () => {
     if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
       </View>)
     }
     if(this.state.isShowBottomRefresh){
         return (<View style={{marginVertical: 10}}>
                 <ActivityIndicator />
         </View>)
     }
    }
   _end = () => {
     if(this.state.isEmpty) return;
     if(this.state.totalPageNum == 1) return;
     let index = this.state.curPage;
     index++;
     if(index>this.state.totalPageNum){
       toastShort('没有更多了哦',-100);
       this.setState({isShowBottomRefresh:false});
     }else{
       this.setState({curPage:index},()=>this._getRequest(true));

     }
    }
    _onRefresh =() =>{
     this.setState({curPage:1,isRefreshing:true},()=>{
      setTimeout(()=>{
        this._getRequest(false)
      },1000)
     });
    }
    returnElm(){
      if(this.state.animating){
        return <Loading show={this.state.animating}/>
      }
      return <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        style={styles.listView}
        onEndReached={this._end}
        onEndReachedThreshold={30}
        renderFooter={this._renderFooter.bind(this)}
        refreshControl={
         <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={this._onRefresh}
           tintColor="#ff0000"
           title="刷新中..."
           titleColor="#999"
         />}
      />
    }
    render(){
      let leftImageSource = require('../../images/icon/icon_left.png');
      return (
        <View style={styles.container}>
          <NavigationBar
            title={"活动"}
          />
          {
            !this.state.isError
            ? 
            this.returnElm() 
            :
            <Error onPress={this._getRequest.bind(this)} />
          }
          
          <NetUtil />
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },
    list: {
      flex: 1,
      height:400/oPx,
      backgroundColor:'#fff',
      marginTop:16/oPx,
      alignItems:'center',
      justifyContent:'center',
    },
    listDialog:{
      width:710/oPx,
      height:280/oPx,
      position:'absolute',
      top:0,
      left:0,
      zIndex:1
    },
    image:{
      width:710/oPx,
      height:280/oPx,
      backgroundColor:'#ccc'
    },
    topText:{
      height:70/oPx,
      width:710/oPx,
      justifyContent:'center',

    },
    bottomText:{
      height:50/oPx,
      width:710/oPx,
      justifyContent:'center',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
