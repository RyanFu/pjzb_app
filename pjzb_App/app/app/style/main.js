import {
  StyleSheet
} from 'react-native';
import {StyleConfig} from './index';
const oPx = StyleConfig.oPx;
export const styles = StyleSheet.create({
  contentContainer:{
    paddingBottom:16/oPx,
    backgroundColor:'#e9ecf3'
  },
  swiper:{
    backgroundColor:'#ccc',
    height:400/oPx
  },
  slide:{
    flex:1,
  },
  img:{
    width:750/oPx,
    height:400/oPx
  },
  index_about:{
    flex: 1,
    height:216/oPx,
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  about:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  about_img:{
    width:118/oPx,
    height:118/oPx
  },
  about_text:{
    fontSize:28/oPx,
    color:'#333',
    paddingTop:12/oPx,
    fontWeight:'100'
  },
  //体验标new
  experiences:{
      height:160/oPx,
      width:StyleConfig.screen_width,
      marginTop:8,
  },
  //体验标
  experience:{
    height:416/oPx,
    marginTop:8,
    backgroundColor:'#fff'
  },
  index_footer_title:{
    height:68/oPx,
    borderColor:'#e0e0e0',
    borderBottomWidth:1/oPx,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  footer_title_text:{
      fontSize:36/oPx,
      color:'#333333',
      alignSelf:'center',
      marginLeft:52/oPx,
  },
  line_style:{
      position:'absolute',
      left:0,
      bottom:3,
      width:6/oPx,
      height:34/oPx,
      backgroundColor:'#eb3331',
      marginLeft:32/oPx,
  },
  footer_more_text:{
      fontSize:24/oPx,
      color:'#a7a7a7',
      alignSelf:'center',
      marginRight:32/oPx,
  },
  exp_title:{
    height:68/oPx,
    borderColor:'#e0e0e0',
    borderBottomWidth:1/oPx,
    justifyContent:'center',
    alignItems:'center',
  },
  noborder:{
    borderBottomWidth:0
  },
  exp_title_texts:{
    fontSize:28/oPx,
    color:'#ffffff',
    fontWeight:'200',
    alignSelf:'flex-end',
    paddingBottom:6/oPx,
  },
  exp_title_text:{
      fontSize:36/oPx,
      color:'#333333',
      alignSelf:'center',
      paddingBottom:6/oPx,
  },
  exp_title_font:{
    color:'#777',
    fontSize:22/oPx,
    fontWeight:'100'
  },
  left_exp_rate:{
      marginLeft:33/oPx,
      justifyContent:'flex-start',
      alignItems:'flex-end',
      flexDirection:'row',
      height:46/oPx,
      marginTop:36/oPx
  },
  lefts_exp_rate:{
      height:108/oPx,
      width:StyleConfig.screen_width,
      marginTop:8,
  },
  exp_rate:{
    marginLeft:32/oPx,
    justifyContent:'flex-start',
    flexDirection:'row',
    height:40/oPx,
    marginTop:36/oPx,
  },
  exp_rate_big:{
    color:'#ffffff',
    fontSize:56/oPx,
    alignSelf:'flex-end',
    fontWeight:'400'
  },
  exp_rate_small:{
    color:'#ffffff',
    fontSize:28/oPx,
    alignSelf:'flex-end',
    fontWeight:'200',
    paddingBottom:6/oPx,
  },
  exp_image_btn:{
      height:46/oPx,
      width:160/oPx,
      justifyContent:'center',
      alignSelf:'flex-start',
      marginTop:6/oPx,
      marginLeft:108/oPx,
  },
  exp_detail:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    paddingRight:95/oPx,
    paddingLeft:95/oPx,
    height:120/oPx
  },
  exp_detail_text:{
    flex:1,
    alignItems:'center',
  },
  boder:{
    borderColor:StyleConfig.borderColor,
    borderRightWidth:1/oPx,
  },
  //投资推荐
  product:{
    backgroundColor:'#fff',
    marginTop:8,
  },

  exp_btn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  //公司动态内容
  index_footer:{
    height:280/oPx,
    marginTop:8,
    backgroundColor:'#fff',
  },
  index_footer_box:{
    flex:1,
    flexDirection:'row',
    paddingTop:20/oPx,
    paddingBottom:20/oPx
  },
  index_footer_left:{
    flex:1,
    justifyContent:'center',
    borderRightWidth:1/oPx,
    borderColor:StyleConfig.borderColor,
    flexDirection:'row'
  },
  index_footer_right:{
    flex:1,
    justifyContent:'center',
    flexDirection:'row'
  },
  index_footer_img:{
    width:126/oPx,
    height:105/oPx,
    alignSelf:'center',
    justifyContent:'center'
  },
  index_footer_text:{
    alignSelf:'center',
    justifyContent:'center',
    color:'#333',
    fontSize:36/oPx,
    fontWeight:'200',
    paddingLeft:16/oPx
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView:{
    backgroundColor:'#e9ecf3',
    marginTop:16/oPx
  },
  moreBottom:{
    height:80/oPx,
    justifyContent:'center',
    alignItems:'center'
  },

  // 新手标
  xsBaoView: {
    flex: 1,
    height: 160/oPx,
    backgroundColor: '#fff',
    marginTop: 16/oPx,
  },
  xsView: {
    flexDirection: 'row',
    marginLeft: 30/oPx,
    marginRight: 30/oPx,
  },
  xsBaoImg: {
    width: 42/oPx,
    height: 43/oPx,
  },
  xsTitleView: {
    marginTop: 10/oPx,
    marginBottom: 10/oPx,
    marginLeft: 10/oPx,
  },
  xsMothView: {
    marginLeft: 55/oPx,
  },
  xsBtnView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 95/oPx,
  },
});
