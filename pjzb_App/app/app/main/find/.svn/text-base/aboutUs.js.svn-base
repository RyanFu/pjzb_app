/**
 * Created by zlx on 2017/02/21.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemList from '../../components/ItemList';
  import ShareholdersBackground from './shareholdersBackground';
  import CompanyProfile from './companyProfile.js';
  import Qualification from './qualification.js';
  import ManagementTeam from './managementTeam.js';
  import ConsultantTeam from './consultantTeam.js';
  import InformationDisclosure from './InformationDisclosure';
  // 公司动态、平台公告
  import CompanyDynamic from './companyDynamic.js';
  // 公司动态
import GSDTIntroduction2 from '../find/GSDTIntroduction2';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class AboutUs extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'信息披露',rightText:'',listPress:()=>{this.props.navigator.push({component:InformationDisclosure,name:'InformationDisclosure'});},style:{marginTop:16/oPx}},
              {leftText:'股东背景',rightText:'',listPress:()=>{this.props.navigator.push({component:ShareholdersBackground,name:'ShareholdersBackground'});},style:styles.lineTop},
              {leftText:'公司简介',rightText:'',listPress:()=>{this.props.navigator.push({component:CompanyProfile,name:'CompanyProfile'});},style:styles.lineTop},
              {leftText:'平台资质',rightText:'',listPress:()=>{this.props.navigator.push({component:Qualification,name:'Qualification'});},style:styles.lineTop},
              // {leftText:'管理团队',rightText:'',listPress:()=>{this.props.navigator.push({component:ManagementTeam,name:'ManagementTeam'});},style:styles.lineTop},
              {leftText:'顾问团队',rightText:'',listPress:()=>{this.props.navigator.push({component:ConsultantTeam,name:'ConsultantTeam'});},style:styles.lineTop},
              {leftText:'公司动态',rightText:'',listPress:()=>{this.props.navigator.push({component:GSDTIntroduction2,name:'GSDTIntroduction2',params:{title:'公司动态'}});},style:styles.lineTop},
          ],
      }
    }
    componentWillMount () {

    }

    //功能列表生成
    _funList(row,index){
      return (
          <ItemList title={row.leftText} rightText={row.rightText} style={row.style} onPress={row.listPress} key={index}/>
      )
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    render(){

      return (
        <ScrollView style={styles.container}>
          <NavigationBar
          title="关于我们"
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
          <View style={styles.userListTap}>
            {
              this.state.funList.map((row, index) =>{
                  return this._funList(row,index);
              })
            }
          </View>
         </ScrollView>
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
    }

  });
