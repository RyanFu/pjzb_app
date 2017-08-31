/**
 * Created by zlx on 2017/02/16.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import ItemLeft from '../../components/ItemLeft';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class investmentPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          funList:[
              {leftText:'等额本息的还款方式有哪些优点？',style:{marginTop:16/oPx}},
              {leftText:'借款项目出现逾期或坏账怎么处理？',style:styles.lineTop},
              {leftText:'普金资本目前产品有哪几类？收益率为多少？',style:styles.lineTop},
              {leftText:'普金资本目前的还款方式有哪些？',style:styles.lineTop},
              {leftText:'投资成功后什么时候开始计息？',style:styles.lineTop},
              {leftText:'投资成功后是否可以撤销？',style:styles.lineTop},
              {leftText:'投资的起始金额为多少？',style:styles.lineTop},
              {leftText:'投资资金有限制吗？',style:styles.lineTop},
          ],
          choseIn:[1,1,1,1,1,1,1,1],
          content:[
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>等额本息是业内普遍采用的还款方式，具有如下优点：</Text>
                  <Text style={styles.contentText}>（1）有助于减轻借款人阶段性还款压力，降低借款人违约风险；</Text>
                  <Text style={styles.contentText}>（2）每月都有收益和本金回款，大幅提升出借人资金流动性；</Text>
                  <Text style={styles.contentText}>（3）借款人需按月持续还款，若其经济情况恶化，则会从当期逾期得到体现，还款风险立即暴露，我方可及时采取措施挽回损失。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>担保公司为本合同项下借款的本金以及利息提供不可撤销的连带保证。如借款期限届满之日借款企业不能偿还投资人本金及利息，担保公司将于债权届满七个工作日内按照本合同约定向投资人偿付借款的本金和利息。如在借款期限内借款企业不能按照约定向投资人支付利息，则担保公司将于借款企业违约后七个工作日内按照约定向借款人支付利息。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={[styles.contentText,styles.bold]}>恒金保（预期年化收益6%-10%）</Text>
                  <Text style={styles.contentText}>以保理公司持有的大型知名企业签发并承兑的商业承兑汇票为还款保障的金融产品，借款到期时，保理公司以承兑企业无条件支付的票面资金用于归还借款本息。该产品充分发挥了大型企业的信用价值，在为借款中小微企业解决融资问题的同时，还为投资人提供了风险可控的金融产品。</Text>
                  <Text style={[styles.contentText,styles.bold]}>普金保（预期年化收益8%-12%）</Text>
                  <Text style={styles.contentText}>基于供应链上下游的采购贸易，为采购方或项目方提供融资，融资方以应收账款质押、保证金担保等形式为借款提供担保。</Text>
                  <Text style={[styles.contentText,styles.bold]}>多金宝（预期年化收益9%-15%）</Text>
                  <Text style={styles.contentText}>企业由于生产经营周转或项目投资需要资金，提供足值的不动产或动产作为抵质押物申请借款。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>还款方式根据项目种类不同，现分为如下三种：</Text>
                  <Text style={styles.contentText}>1、等额本息还款：在还款期内，每月偿还同等数额的本金和利息。</Text>
                  <Text style={styles.contentText}>2、先息后本：每月还利息，到期后一次性还本金。</Text>
                  <Text style={styles.contentText}>3、一次还本付息：到期后一次性归还本金和利息。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>满标审核后开始计息。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>所有项目在购买成功后均不可以撤销。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本项目最低投资金额为100元。</Text>
                  <View style={styles.textBottom}></View>
              </View>,
              <View style={styles.textView}>
                  <View style={styles.textTop}></View>
                  <Text style={styles.contentText}>普金资本目前在售项目投资起点金额为100元，上限不超过项目借款总金额。</Text>
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
          title="投资理财"
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
          <ScrollView style={styles.userListTap}>
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
    img: {
        alignSelf: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
  });
