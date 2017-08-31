/**
 * Created by wsl on 2017/02/20.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   LayoutAnimation,
   Animated,Easing,
   InteractionManager
 } from 'react-native';
 import NavigationBar from '../../components/NavigationBar';
 import { goBack } from '../../utils/NavigatorBack';
 import {StyleConfig} from '../../style';
 import styles from '../../style/safetyPage';
 import LinearGradient from 'react-native-linear-gradient';
 import Request from '../../utils/Request';
 const oPx = StyleConfig.oPx;
 let timing = Animated.timing;
 export default class RunReportsPage extends Component{
   constructor(props){
     super(props);
     this.state={
       animate:[0,0,0,0,0],
       translateY:new Animated.Value(0),
       //step one
       stepOneLogo:new Animated.Value(0),
       stepOneUpOpcA:new Animated.Value(0),
       stepOneUpA:new Animated.Value(100),
       //step two
       beginX:0,
       beginY:0,
       beginTime:0,
       scrollY:0,
       activeIndex:0,
       loadmore:false
     }
   }
   componentWillMount(){
     LayoutAnimation.spring();
   }
   componentDidMount(){
      this.getData();
       setTimeout(()=>{
        this.stepOneAnm();
       },1000);
   }
   _transform(fadeIn,time){
    this.state[fadeIn].setValue(0);
     return timing(
       this.state[fadeIn],
       {
         toValue:1,
         duration:time||400,
         easing: Easing.linear
       }
     );
   }
   _translate(opacity,transfromY){
     return Animated.parallel([ // One after the other
        timing(
           this.state[opacity],
           {
             toValue:1,
             duration:400,
             easing: Easing.linear
           }
         ),
        timing(
           this.state[transfromY],
           {
             toValue:0,
             duration:400,
             easing: Easing.linear
           }
         ),
    ])
   }
   stepOneAnm(){
    let delay = 10;
    Animated.sequence([
        this._transform('stepOneLogo'),
        this._translate('stepOneUpOpcA','stepOneUpA'),
    ]).start(()=>{this.setState({loadmore:true},()=>this.loop())});
   }
   loop(){
     this.state.translateY.setValue(0);
     Animated.timing(
       this.state.translateY,
       {
         toValue:-15,
         duration:1200,
         easing: Easing.linear
       }
     ).start(()=>this.loop())
   }
   //获取数据
   getData(){
    Request.post('querytOperateReportPage.do',{month:this.props.month,uid:''},(data)=>{
      if(data.error=='0'){
        let arr = data.operateReportPage;
        this.setState({
          stepTwo:{uri:arr[0].imgPath},
          stepThree:{uri:arr[1].imgPath},
          stepFour:{uri:arr[2].imgPath},
          stepFive:{uri:arr[3].imgPath},
          stepSix:{uri:arr[4].imgPath},
        })
      }else{
        alert(data.msg);
      }
    })
   }
   //返回
   _goBack(){
       goBack(this.props.navigator);
   }
   onTouchStart(evt){
     this.setState({beginX:evt.nativeEvent.pageX,beginY:evt.nativeEvent.pageY,beginTime:evt.nativeEvent.timestamp});
   }
   onTouchEnd(evt){
     let oHeight = StyleConfig.content_height;
     let {beginX,beginY,beginTime,activeIndex} = this.state;
     const {pageX,pageY,timestamp} = evt.nativeEvent;

     if(beginY>pageY && (timestamp-beginTime)>100){
       if(activeIndex<5){
         if(!this.state.loadmore) return;
         this.setState({activeIndex:activeIndex+1});
         this.ScrollViewParent.scrollTo({x: 0, y:oHeight*(activeIndex+1), animated: true});
       }
     }
     if(beginY<pageY && (timestamp-beginTime)>100){
       if(activeIndex>0){
        this.setState({activeIndex:activeIndex-1},()=>this.ScrollViewParent.scrollTo({x:0,y:oHeight*(activeIndex-1),animated: true}));
       }
     }
   }
   render(){
     return (
       <View style={styles.container}>
         <NavigationBar
             title={"运营报告"}
             leftShowIcon={true}
             leftBtnFunc={this._goBack.bind(this)}
         />
         <ScrollView
           ref={(scrollView) => { this.ScrollViewParent = scrollView; }}
           scrollEnabled={false}
           onLayout={(e)=>{this.setState({scrollViewHeight:e.nativeEvent.layout.height})}}
           >
           {/*<LinearGradient colors={['#3d3978', '#354c9a']} style={styles.scrollViewContent}>
             <ScrollView style={{flex:1}}
              onScrollEndDrag={(e)=>{
                let height = e.nativeEvent.contentSize.height - this.state.scrollViewHeight;
                let tag = e.nativeEvent.contentOffset.y;
                if(this.state.scrollViewTwoEnd && height<tag){
                  this.onMove(2);
                }
                if(e.nativeEvent.contentOffset.y<0){
                  this.onMove(0)
                }
              }}
              onMomentumScrollEnd={(e)=>{
                let size = e.nativeEvent.contentSize.height;
                let tag = e.nativeEvent.contentOffset.y;
                if( size == tag+this.state.scrollViewHeight){
                  this.setState({scrollViewTwoEnd:true});
                }
              }}>
                <View style={{height:1999}}></View>
             </ScrollView>
           </LinearGradient>*/}
           <ScrollView
               style={styles.scrollViewContent}
               showsVerticalScrollIndicator={false}>
               <Image source={require('../../images/find/yybg_background-1.png')} resizeMode="cover" style={styles.imgView}/>
               <View style={style.ViewContent}>
                 <View style={style.stepView}>
                   <Animated.Image style={[style.company_logo,{opacity:this.state.stepOneLogo}]} source={require('../../images/find/aboutUs/reports_logo.png')}/>
                   <Animated.View style={[style.stepViewItem3,{opacity:this.state.stepOneUpOpcA,transform:[{translateY:this.state.stepOneUpA}]}]}>
                       <Text style={style.textSecondBig}>运营报告</Text>
                       <Text style={style.textSmall}>日期：{this.props.month.substring(0,4)+'年'+this.props.month.substring(4,6)+'月'}</Text>
                   </Animated.View>
                 </View>
               </View>
             </ScrollView>

             <Image style={styles.scrollViewContent} resizeMode="cover" source={this.state.stepTwo}/>

             <Image style={styles.scrollViewContent} resizeMode="cover" source={this.state.stepThree}/>

             <Image style={styles.scrollViewContent} resizeMode="cover" source={this.state.stepFour}/>

             <Image style={styles.scrollViewContent} resizeMode="cover" source={this.state.stepFive}/>

             <Image style={styles.scrollViewContent} resizeMode="cover" source={this.state.stepSix}/>
          </ScrollView>
         <View style={styles.toutchView} onStartShouldSetResponder={(evt)=>true}
         onTouchStart={(evt)=>this.onTouchStart(evt)}
         onTouchEnd={(evt)=>this.onTouchEnd(evt)}>
           {this.state.activeIndex<5&&this.state.loadmore ?<Animated.Image style={[styles.scrollIcon,{transform:[{translateY:this.state.translateY}]}]} source={require('../../images/icon/icon_top.png')}/>:null}
         </View>
       </View>
     )
   }
 }

const style = StyleSheet.create({
    ViewContent:{
        width:StyleConfig.screen_width,
        height:StyleConfig.content_height,
        position:'absolute',
        left:0,
        top:0,
        zIndex:10,
    },
    stepView:{
        paddingTop:200/oPx,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'transparent',
    },
    company_logo:{
      width:220/oPx,
      height:290/oPx,
    },
    stepViewItem3:{
        marginTop:80/oPx,
        height:120/oPx,
        alignItems:'center',
        backgroundColor:'transparent'
    },
    textFirstBig:{
        fontSize:60/oPx,
        fontWeight:'bold',
        color:'#fff',
    },
    textFirstmall:{
        fontSize:30/oPx,
        lineHeight:10,
        color:'#fff',
    },
    textSecondBig:{
        fontSize:40/oPx,
        color:'#eb3331',
    },
    textSmall:{
        fontSize:26/oPx,
        color:'#eb3331',
        lineHeight:22,
    },

});
