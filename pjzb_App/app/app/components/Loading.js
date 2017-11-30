/**
 * Created by wsl on 2017/01/12.
 */

 import React,{Component} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   ActivityIndicator,
   Image,
   Animated,
   Easing
 } from 'react-native';
 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;
export default class Loading extends Component{
  constructor(props) {
    super(props);
    this.state = {
       rotateAnim: new Animated.Value(0),
    };
  }
  loop() {
    this.state.rotateAnim.setValue(0)
    Animated.timing(
      this.state.rotateAnim,
      {
        toValue: 100,
        duration:1000,
        easing: Easing.linear
      }
    ).start(() => this.loop())
  }
  componentDidMount() {
     this.loop();
   }
   renderElm(){
    let viewStyle = this.props.loadingText ? styles.loadingShaDowBig : styles.loadingShaDow;
    if(this.props.show)
     {
       const rotate = this.state.rotateAnim.interpolate({
                inputRange: [0,100],
                outputRange: ['0deg','360deg']
              });
       return <View style={[!this.props.top?styles.loading:styles.loadingTop,{height:this.props.height||StyleConfig.screen_height}]}>
       <View style={[styles.loadingDialog,{height:this.props.height||StyleConfig.screen_height}]}></View>
       <View style={viewStyle}>
         <Animated.Image source={require('../images/icon/icon_loading.png')} style={[styles.loadingImg,{transform:[{rotate:rotate}]}]}></Animated.Image>
         {
          this.props.loadingText ? <Text style={{fontSize: 26/oPx, color: '#999', marginTop: 10/oPx}}>{this.props.loadingText}</Text> : null
         }
         {
          this.props.loadingTimeText ? <Text style={{fontSize: 24/oPx, color: '#999', marginTop: 5/oPx}}>{this.props.loadingTimeText}</Text> : null
         }
       </View>
     </View>}
     return null;
   }
  render(){
    return (
      /*<ActivityIndicator
        style={styles.loading}
        animating={this.props.animating}
        size="small"
        >
      </ActivityIndicator>*/
      this.renderElm()
    )
  }
}

const styles = StyleSheet.create({
  loading:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  loadingTop:{
    justifyContent:'center',
    alignItems:'center',
    width:StyleConfig.screen_width,
    position:'absolute',
    zIndex:99999,
    left:0,
    top:0,
  },
  loadingDialog:{
    width:StyleConfig.screen_width,
    backgroundColor:'#000',
    opacity:.3,
    position:'absolute',
    top:0,
    left:0,
    zIndex:1,
  },
  loadingShaDow:{
    width:160/oPx,
    height:160/oPx,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    zIndex:10
  },
  loadingShaDowBig:{
    width:240/oPx,
    height:240/oPx,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    zIndex:10
  },
  loadingImg:{
    width:80/oPx,
    height:80/oPx,
    marginBottom: 20/oPx,
    marginTop: 20/oPx,

  }
})
