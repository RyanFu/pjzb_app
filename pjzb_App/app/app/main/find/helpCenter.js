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
  import ItemList from '../../components/ItemList';
  import ProIntroduction from './proIntroduction';
  import Problems from './problems';
  import Contract from './contract';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class HelpCenter extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'产品介绍',rightText:'',listPress:()=>{this.props.navigator.push({component:ProIntroduction,name:'ProIntroduction'});},style:{marginTop:16/oPx}},
              {leftText:'常见问题',rightText:'',listPress:()=>{this.props.navigator.push({component:Problems,name:'Problems'});},style:styles.lineTop},
              {leftText:'合同资料',rightText:'',listPress:()=>{this.props.navigator.push({component:Contract,name:'Contract'});},style:styles.lineTop},
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
          title="帮助中心"
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
