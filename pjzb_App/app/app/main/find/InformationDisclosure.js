/**
 * Created by zlx on 2017/03/27.
 * 信息披露
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
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  import ProfessionalInstitutions from './ProfessionalInstitutions';
  import PlatformInformation from './PlatformInformation';
  import LoanProject from './LoanProject';
  const oPx = StyleConfig.oPx;
  export default class InformationDisclosure extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'从业机构信息',rightText:'',listPress:()=>{this.props.navigator.push({component:ProfessionalInstitutions,name:'ProfessionalInstitutions'});},style:{marginTop:16/oPx}},
              {leftText:'平台运营信息',rightText:'',listPress:()=>{this.props.navigator.push({component:PlatformInformation,name:'PlatformInformation'});},style:styles.lineTop},
              {leftText:'借款项目信息',rightText:'',listPress:()=>{this.props.navigator.push({component:LoanProject,name:'LoanProject'});},style:styles.lineTop},
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
          title="信息披露"
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
