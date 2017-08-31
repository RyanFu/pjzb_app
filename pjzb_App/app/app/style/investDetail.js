/**
 * Created by wsl on 2017/02/13.
 */
 import {
  StyleSheet
} from 'react-native';
import {StyleConfig} from './index';
const oPx = StyleConfig.oPx;
export default styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  top:{
    height:620/oPx,
  },
  topRateView:{
    alignItems:'center',
    backgroundColor:'transparent'
  },
  topTitle:{
    height:90/oPx,
    justifyContent:'center'
  },
  topTitleText:{
    color:'#333',
    fontSize:32/oPx,
    fontWeight:'200'
  },
  topRate:{
    height:68/oPx,
    flexDirection:'row'
  },
  topRateText:{
    color:'#eb3331',
    fontSize:60/oPx,
    alignSelf:'center',
    fontWeight:'200'
  },
  topRateSymbol:{
    color:'#eb3331',
    fontSize:38/oPx,
    alignSelf:'flex-end',
    fontWeight:'200'
  },
  topDetail:{
    width:StyleConfig.screen_width,
    height:125/oPx,
    marginTop:20/oPx,
    flexDirection:'row'
  },
  topDetailLine:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  topDetailText:{
    fontSize:22/oPx,
    color:'#333',
    fontWeight:'300',
  },
  bottomDetailText:{
    fontSize:22/oPx,
    color:'#999',
    marginTop:4
  },
  proupseView:{
    height:30/oPx,
    flexDirection:'row',
    paddingLeft:30/oPx,
    paddingRight:30/oPx,
    alignItems:'center'
  },
  proupseLine:{
    flex:1,
  },
  proupseText:{
    width:110/oPx,
    fontSize:24/oPx,
    color:'#777',
    textAlign:'right',
    fontWeight:'300'
  },
  line_default:{
    position:'absolute',
    left:0,
    top:-1,
    width:580/oPx,
    height:8/oPx,
    backgroundColor:'#fbdbdb',
    borderRadius:4/oPx,
  },
  line_pull:{
    width:92/oPx,
    backgroundColor:'#eb3331',
  },
  canInvestView:{
    height:60/oPx,
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:30/oPx
  },
  canInvestText:{
    fontSize:28/oPx,
    color:'#333',
  },
  canInvestTextColor:{
    fontSize:28/oPx,
    color:'#333',
    color:'#777'
  },
  scrollTopView:{
    paddingTop:100/oPx,
    alignItems:'center',
    paddingLeft:30/oPx,
    paddingRight:30/oPx
  },
  scrollTopIcon:{
    width:26/oPx,
    height:24/oPx
  },
  scrollTopTextView:{
    height:65/oPx,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  scrollTopTextLine:{
    flex:1,
    height:1/oPx,
    backgroundColor:'#ccc'
  },
  scrollTopText:{
    color:'#999',
    paddingLeft:30/oPx,
    paddingRight:30/oPx
  },
  investTip:{
    flexDirection:'row',
    margin:30/oPx,
    marginBottom:0,
    height:138/oPx,
    backgroundColor:'#ffebc9',
    paddingLeft:50/oPx,
    borderWidth:StyleConfig.borderWidth,
    borderColor:'#e3b181',
    borderRadius:3
  },
  investTextIcon:{
    width:30/oPx,
    height:30/oPx,
    marginRight:3,
  },
  investText:{
    paddingRight:30/oPx,
    marginTop:20/oPx,
    fontSize:22/oPx,
    color:'#333333',
    lineHeight:parseInt(46/oPx),
  },
  submitBtnView:{ 
    paddingLeft:30/oPx,
    paddingRight:30/oPx,
    height:166/oPx,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  submitBtn:{
    flex:1,
    height:76/oPx,
    backgroundColor:'#eb3331',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:76/oPx/2,
    shadowColor:'#eb3331',
    shadowOffset:{height:4,width:0},
    shadowOpacity:.2,
  },
  submitBtnDisabled:{
    backgroundColor:'#d0d3d9',
    shadowOpacity:0,
  },
  submitBtnText:{
    color:'#fff',
    fontSize:28/oPx,
  },
  submitBtnTextDisabled:{
    color:'#999'
  },
  submitView:{
    width:StyleConfig.screen_width,
    height:StyleConfig.screen_height,
    backgroundColor:'transparent',
    position:'absolute',
    flexDirection:'row',
    left:0,
    bottom:0,
    zIndex:100,
  },
  submitViewDialog:{
    width:StyleConfig.screen_width,
    height:StyleConfig.screen_height,
    backgroundColor:'rgba(0,0,0,.6)',
    position:'absolute',
    left:0,
    top:0,
    zIndex:10
  },
  submitContent:{
    width:StyleConfig.screen_width,
    height:340/oPx,
    backgroundColor:'#fff',
    position:'absolute',
    left:0,
    bottom:0,
    zIndex:100
  },
  listBtn:{
    width:18/oPx,
    height:34/oPx,
    marginRight:30/oPx,
  },
  submitItem:{
    height:80/oPx,
    backgroundColor:'#fff',
    justifyContent:'center',
    borderBottomWidth:StyleConfig.borderWidth,
    borderBottomColor:'#ccc',
    paddingLeft:30/oPx,

  },
  submitItemInput:{
    height:100/oPx,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  submitItemText:{
    fontSize:28/oPx,
    fontWeight:'300',
    color:'#333'
  },
  textInput:{
    flex:1,
    height:80/oPx,
    fontSize:28/oPx,
    alignSelf:'center',
  },
  textInputButton:{
    width:200/oPx,
    height:100/oPx,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#eb3331',
  },
  textInputButtonText:{
    fontSize:28/oPx,
    color:'#fff'
  },
  submitChose:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  detailView:{
    padding:30/oPx,
  },
  detailViewTab:{
    height:78/oPx,
    borderColor:'#eb3331',
    borderWidth:1,
    borderRadius:4,
    flexDirection:'row',
    overflow:'hidden'
  },
  detailViewTabBtn:{
    flex:1,
    height:78/oPx-2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'

  },
  active:{
    backgroundColor:'#eb3331'
  },
  detailViewTabBtnText:{
    color:'#333',
  },
  activeText:{
    color:'#fff'
  },
  borderRight:{
    borderTopRightRadius:3,
    borderBottomRightRadius:3
  },
  borderLeft:{
    //borderTopLeftRadius:3,
    //borderBottomLeftRadius:3
  },
  border:{
    borderRightColor:'#eb3331',
    borderRightWidth:1,
  },
  itemView:{
    height:60/oPx,
    alignItems:'center',
    flexDirection:'row',
  },
  detailViewOne:{
    padding:30/oPx,
  },
  detailViewTwo:{
    paddingTop:30/oPx,
    flex:1,
  },
  lineHeightText:{
    lineHeight:30,
    color:'#333',
    fontSize:28/oPx
  },
  tableTop:{
    height:80/oPx,
    backgroundColor:'#e9ecf3',
    flexDirection:'row',
    alignItems:'center'
  },
  tableTopList:{
    height:80/oPx,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center'
  },
  tableListItem:{
    borderBottomColor:StyleConfig.borderColor,
    borderBottomWidth:StyleConfig.borderWidth,
  },
  tableListItemText:{
    flex:1,
    color:'#333',
  },
  tableListItemImage:{
    width:36/oPx,
    height:36/oPx,
  },
  tableRow:{
    flex:1,
    paddingLeft:30/oPx,
    fontSize:22/oPx,
    color:'#999',
    fontWeight:'300'
  },
  moreBottom:{
    height:80/oPx,
    justifyContent:'center',
    alignItems:'center'
  },
  disabled:{
    backgroundColor:'#f2f2f2'
  },
  AgreementText:{
    color:'#319bff'
  }

})
