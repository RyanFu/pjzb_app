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
    width:698/oPx,
    height:128/oPx,
    backgroundColor:'transparent',
    position:'absolute',
    left:26/oPx,
    flexDirection:'row'
  },
  img:{
    width:698/oPx,
    height:128/oPx,
    alignSelf:'center',
    justifyContent:'center'
  },
  leftView:{
    width:250/oPx,
    height:128/oPx,
    paddingLeft:30/oPx,
  },
  leftViewTopView:{
    height:56/oPx,
    justifyContent:'center',
    marginTop:20/oPx
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
    width:340/oPx,
    height:128/oPx,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft: 10/oPx,
  },
  centerViewText:{
    fontSize:20/oPx,
    color:'#999',
    lineHeight: 18,
  },
  rightView:{
    flex:1,
    height:128/oPx
  },
  rightViewBtn:{
    height:128/oPx,
    alignItems:'center',
    justifyContent:'center',
  },
  rightViewText:{
    fontSize:28/oPx,
    color:'#e24040',
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
