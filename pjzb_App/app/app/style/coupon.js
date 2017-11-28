/**
 * Created by wsl on 2017/02/16.
 */
import {
  StyleSheet
} from 'react-native';
import {StyleConfig} from './index';
const oPx = StyleConfig.oPx;
export default styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:34/oPx,
  },
  coupon_card:{
    height:128/oPx,
    marginBottom:15/oPx
  },
  cardView:{
    width:690/oPx,
    height:138/oPx,
    backgroundColor:'transparent',
    position:'absolute',
    left:26/oPx,
    flexDirection:'row'
  },
  img:{
    width:690/oPx,
    height:138/oPx,
    alignSelf:'center',
    justifyContent:'center'
  },
  leftView:{
    width:220/oPx,
    height:138/oPx,
    alignItems: 'center',
    justifyContent:'center'
  },
  leftViewTopView:{
    height:56/oPx,
    justifyContent:'center',
  },
  leftViewTopViewText:{
    fontSize:42/oPx,
    color:'#fff'
  },
  leftViewBottomViewText:{
    fontSize:22/oPx,
    color:'#fff',
  },
  leftViewBottomView:{
    height:28/oPx,
    justifyContent:'center'
  },
  centerView:{
    width: 370/oPx,
    height:138/oPx,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft: 15/oPx,
  },
  centerViewText:{
    fontSize:22/oPx,
    color:'#999',
    lineHeight: 18,
  },
  rightView:{
    flex:1,
    height:128/oPx,
    width: 90/oPx,
    marginLeft: 10/oPx,
  },
  rightViewBtn:{
    height:128/oPx,
    width: 90/oPx,
    alignItems:'center',
    justifyContent:'center',
  },
  rightViewText:{
    fontSize:28/oPx,
    color:'#e24040',
    lineHeight: 15,
  },
  noData:{
    height:60/oPx,
    justifyContent:'center',
    alignItems:'center',
  },
  noDataText:{
    fontSize:24/oPx,
    color:'#999'
  }
})
