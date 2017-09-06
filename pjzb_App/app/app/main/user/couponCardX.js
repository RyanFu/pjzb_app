/**
 * Created by wsl on 2017/02/16.
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import {StyleConfig} from '../../style';
import Loading from '../../components/Loading';
import styles from '../../style/coupon';
import Request from '../../utils/Request';
const oPx = StyleConfig.oPx;
import InvestDetail from '../invest/InvestDetail';
import {toastShort} from '../../utils/Toast';
import AppMain from '../appMain';
export default class CouponCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      showData:props.data,
      showLoading:props.loading,
      animating:false
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        showData: nextProps.data
    });
    if(nextProps.data.length>0){
      this.setState({
          showLoading: nextProps.nodata
      });
    }
    
  }
  _getText(){
    if(this.props.title == '代金券'){
      return '单笔投资满100元使用';
    }
    if(this.props.title == '现金券'){
      return '点击可直接领取'
    }
    if(this.props.title == '体验金'){
      return '体验标投标专享金'
    }
  }
  _useThisCard(id,index){
    if(this.props.changeCouponId){
      if(this.props.title != '代金券'){
        toastShort('当前投标只能使用代金券哦！',-300)
        return;
      }
      this.props.changeCouponId(id);
      this.props.navigator.pop();
    }else{
      if(this.props.title == '代金券'){
        this.props.navigator.resetTo({component:AppMain,name:'AppMain',params:{selectedTab:'index'}});
      }else if(this.props.title == '现金券'){
        this.setState({animating:true});
        Request.post('useXianJinQuan.do',{id:id,uid:''},(data)=>{
          if(data.error == '0'){
            //this.props.resetData();
            this.state.showData[index].usestatus = 2;
            let showData = this.state.showData;
            this.setState({showData});
            toastShort('现金券使用成功！',-300);
          } else {
            toastShort(data.msg,-300);
          }
          this.setState({animating:false});
        },(error)=>{})
      }else if(this.props.title == '体验金'){
        this.props.navigator.resetTo({component:AppMain,name:'AppMain',params:{selectedTab:'home'}});
      }
    }
  }

  _getInvestAmount(investAmount) {
    if (investAmount && investAmount > 0) {
      return  '满' + investAmount + '元抵用';
    }
  }

  _getRowText1(deadline, investAmount) {
    if (deadline == 0) {
      return  '单笔投资满' + investAmount + '元使用';
    } else {
      return  '[新人红包]单笔投资满' + investAmount + '元使用';
    }
  }

  _getRowText2(deadline, borrowFlag) {
    if (borrowFlag == 1) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的所有标可用';
      }
    } else if (borrowFlag == 2) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的新手标可用';
      }
    } else if (borrowFlag == 3) {
      if (deadline == 0) {
        return  '不可投新手标项目';
      } else {
        return  '仅限' + deadline + '个月以上的仅老标可用';
      }
    }
  }

  _showRow(row,index){
    if(row.usestatus != '1') return;
    return <View style={styles.coupon_card} key={index}>
      <Image source={require('../../images/user/coupon_canuse.png')} style={styles.img}/>
      <View style={styles.cardView}>
        <View style={styles.leftView}>
          <View style={styles.leftViewTopView}>
            <Text style={styles.leftViewTopViewText}>￥{row.money}</Text>
          </View>
          <View style={styles.leftViewBottomView}>
            <Text style={styles.leftViewBottomViewText}>{ this._getInvestAmount(row.investAmount) }</Text>
            {/*<Text style={styles.leftViewBottomViewText}>{row.useendtime?'有效期至'+row.useendtime:null}</Text>*/}
          </View>
        </View>

        <View style={styles.centerView}>
          <Text style={styles.centerViewText}>{ this._getRowText1(row.deadline, row.investAmount) }</Text>
          <Text style={styles.centerViewText}>{ this._getRowText2(row.deadline, row.borrowFlag) }</Text>
          <Text style={styles.centerViewText}>有效期至{ row.useendtime }</Text>
        </View>

        <View style={styles.rightView}>
          <TouchableOpacity style={styles.rightViewBtn} onPress={()=>this._useThisCard(row.id,index)}>
            <Text style={styles.rightViewText}>
              立即
            </Text>
            <Text style={styles.rightViewText}>
              使用
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  }
  _noData(){
    let show = true;
    for (let i=0;i<this.props.data.length;i++){
      if(this.props.data[i].usestatus == '1'){
        show = false;
        break;
      }
    }
    if(show){
      return <View style={styles.noData}><Text style={styles.noDataText}>没有符合条件的内容</Text></View>
    }
    return null;
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        {
          this.state.showData.map((row, index) =>{
              return this._showRow(row,index);
          })
        }
        {this._noData()}
        <View style={{marginTop: 30/oPx}}></View>
      </ScrollView>
    );
  }
}
