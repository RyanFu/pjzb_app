/**
 * Created by wsl on 2017/02/05.
 */
  'use strict';
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,ListView,
    ScrollView,
    TouchableWithoutFeedback,
    RefreshControl,
    TouchableOpacity,
      Alert,
    ActivityIndicator
  } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import Request from '../../utils/Request';
import {StyleConfig} from '../../style';
import UserCenter from './UserCenter';
import MessageDetails from './messageDetails';
import Loading from '../../components/Loading';
import {toastShort} from '../../utils/Toast';
const oPx = StyleConfig.oPx;


  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  export default class MessageCenter extends Component {
    constructor(props){
      super(props);
      this.state = {
          oData:[],
          curPage:1,
          totalPageNum:0,
          dataSource: ds.cloneWithRows([]),
          showDialog: false,
          isEmpty:false,
          isShowBottomRefresh:false,
      }
    }
      componentDidMount(){
        this._getData();
      };

      //获取数据
      _getData(flag){
          this.setState({showDialog:true});
          let params = {uid:'',app:'app',curPage:this.state.curPage};
          Request.post('querySysMails2.do',params,(data)=>{
              this.setState({totalPageNum:data.pageBean.totalPageNum});
              if(data.error =='0'){
                  if(flag){
                      let result = this.state.oData.concat(data.lists);
                      this.setState({
                          oData:result,
                          dataSource:ds.cloneWithRows(result),
                          showDialog: false,
                      });
                  }else{
                      if(data.lists!=null){
                          this.setState({
                              curPage:1,
                              oData:data.lists,
                              dataSource:ds.cloneWithRows(data.lists),
                              showDialog: false,
                          });
                      } else {
                          this.setState({
                              curPage:1,
                              isEmpty:true,
                              showDialog: false,
                              isShowBottomRefresh: false,
                          });
                      }
                  }
              }else{
                  Alert.alert("提示",data.msg);
              }
          },(error)=>{
              Alert.alert("提示",'您的网络不稳定，请稍后再试！');
          });
      }
      _renderFooter() {
          if(this.state.isEmpty){
              return (<View style={styles.moreBottoms}>
                  <Text style={{color:'#999'}}>您还没有系统消息！</Text>
              </View>)
          }
          if(this.state.isShowBottomRefresh){
              return (<View style={{marginVertical: 10}}>
                  <ActivityIndicator />
              </View>)
          }else{
              return null;
          }
      }
      _end(){
          if(this.state.isEmpty) return;
          if(this.state.totalPageNum == 1) return;
          let index = this.state.curPage;
          index++;
          if(index>this.state.totalPageNum){
              toastShort('没有更多了哦',-100);
          }else{
              this.setState({curPage:index},()=>this._getData(true));
          }
      }
      _onRefresh(){
          this.setState({curPage:1},()=>this._getData(true));
      }
      _onRefresh(){
          this.setState({curPage:1},()=>this._getData(true));
      }
      //功能列表生成
      _funList(row){
          // 判断消息是否已读
          let id = row.id;
          let uid = row.reciver;
          let mailTitle = row.mailTitle;
          let mailContent = row.mailContent;
          let sendTime = row.sendTime;
          let mailStatus = row.mailStatus;
          return (
                  <TouchableOpacity style={[styles.messageListItem]} onPress={() => this.onListPress(id,uid)}>
                      {mailStatus=='已读'?
                          <View style={styles.topContainerStyle}>
                              <Text style={[styles.topTextStyle,{marginLeft:60/oPx}]}>{mailTitle}</Text>
                          </View> :
                          <View style={styles.topContainerStyle}>
                              <View style={styles.topViewStyle}/>
                              <Text style={styles.topTextStyle}>{mailTitle}</Text>
                          </View>
                      }

                      <Text numberOfLines={1} style={styles.middleTextStyle}>{mailContent}</Text>
                      <Text style={styles.timeTextStyle}>{sendTime}</Text>
                  </TouchableOpacity>
          )
      }


      //消息详情
      onListPress(id,uid){
          this.props.navigator.push({component:MessageDetails,name:'MessageDetails',params:{
              id:id,uid:uid
          }});
      }
      //返回
      _goBack(){
          goBack(this.props.navigator);
      }

    render(){
      return (
          <View style={styles.bodyView}>
              <NavigationBar
                  title={"消息中心"}
                  leftShowIcon={true}
                  leftBtnFunc={this._goBack.bind(this)}
              />
              <ListView  style={styles.container}
                  dataSource={this.state.dataSource}
                  initialListSize = {4}
                  enableEmptySections = {true}
                  renderRow={this._funList.bind(this)}
                  onEndReached={this._end.bind(this)}
                  onEndReachedThreshold={30}
                  renderFooter={this._renderFooter.bind(this)}
              />

              <Loading show={this.state.showDialog} top={true}/>

          </View>
      );
    }
  }
  const styles = StyleSheet.create({
      /**整体布局是上下结构*/
      bodyView: {
          flex: 1,
      },
    container:{
      flex:1,
      backgroundColor:'#e9ecf3',
    },
    messageListItem:{
        marginTop:16/oPx,
        height:200/oPx,
        width:StyleConfig.screen_width,
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    topContainerStyle:{
        flexDirection:'row',
        alignItems:'center',
        height:92/oPx,
    },
    topViewStyle:{
        backgroundColor:'#eb3331',
        marginLeft:28/oPx,
        height:16/oPx,
        width:16/oPx,
        borderRadius:50,
    },
    topTextStyle:{
      fontSize:28/oPx,
      color:'#333',
      marginLeft:18 /oPx
    },
    middleTextStyle:{
        height:50/oPx,
        fontSize:28/oPx,
        color:'#bbbbbb',
        marginLeft:60/oPx,
        marginRight:60/oPx
    },
    timeTextStyle:{
        height:50/oPx,
        fontSize:22/oPx,
        color:'#bbbbbb',
        marginLeft:60/oPx
    },
    moreBottoms:{
      marginTop:60/oPx,
      height:80/oPx,
      justifyContent:'center',
      alignItems:'center'
    },
  });
