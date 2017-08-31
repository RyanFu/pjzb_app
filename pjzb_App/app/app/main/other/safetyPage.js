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
 const oPx = StyleConfig.oPx;
 let timing = Animated.timing;
 export default class SafetyPage extends Component{
   constructor(props){
     super(props);
     this.state={
       animate:[0,0,0,0,0],
       //step one
       translateY:new Animated.Value(0),
       fadeIn:new Animated.Value(0),
       stepOnelineX:new Animated.Value(0),
       stepOneDownOpc:new Animated.Value(0),
       stepOneDown:new Animated.Value(300),
       stepOneUpOpcA:new Animated.Value(0),
       stepOneUpA:new Animated.Value(100),
       stepOneUpOpcB:new Animated.Value(0),
       stepOneUpB:new Animated.Value(100),
       stepOneUpOpcC:new Animated.Value(0),
       stepOneUpC:new Animated.Value(100),
       stepOneUpOpcD:new Animated.Value(0),
       stepOneUpD:new Animated.Value(100),
       stepOneUpOpcE:new Animated.Value(0),
       stepOneUpE:new Animated.Value(100),
       stepOneUpOpcF:new Animated.Value(0),
       stepOneUpF:new Animated.Value(100),
       stepOnelineY:new Animated.Value(0),
       //step two
       stepTwoScaleA:new Animated.Value(0),
       //step three
       stepThreeA:new Animated.Value(0),
       stepThreeBop:new Animated.Value(0),
       stepThreeB:new Animated.Value(-100),
       stepThreeC:new Animated.Value(0),
       stepThreeD:new Animated.Value(0),
       stepThreeE:new Animated.Value(0),
       stepThreeF:new Animated.Value(0),
       stepThreeG:new Animated.Value(0),
       stepThreeH:new Animated.Value(0),
       stepThreeI:new Animated.Value(0),
       stepThreeJ:new Animated.Value(0),
       stepThreeK:new Animated.Value(0),
       stepThreeL:new Animated.Value(0),
       stepThreeM:new Animated.Value(0),
       stepThreeN:new Animated.Value(0),
       stepThreeOop:new Animated.Value(0),
       stepThreeO:new Animated.Value(-100),
       stepThreeP:new Animated.Value(0),
       stepThreeQ:new Animated.Value(0),
       stepThreeR:new Animated.Value(0),
       stepThreeS:new Animated.Value(0),
       stepThreeT:new Animated.Value(0),
       stepThreeU:new Animated.Value(-100),
       stepThreeUop:new Animated.Value(0),
       stepThreeV:new Animated.Value(0),
       stepThreeW:new Animated.Value(0),
       stepThreeX:new Animated.Value(0),
       stepThreeY:new Animated.Value(0),
       stepThreeZ:new Animated.Value(0),
       stepThreeAA:new Animated.Value(0),
       stepThreeAB:new Animated.Value(0),
       stepThreeACop:new Animated.Value(0),
       stepThreeAC:new Animated.Value(-100),
       stepThreeAD:new Animated.Value(0),
       stepThreeAE:new Animated.Value(0),
       stepThreeAF:new Animated.Value(0),
       stepThreeAG:new Animated.Value(0),
       stepThreeAH:new Animated.Value(0),
       //step StepFour
       stepFourScaleA:new Animated.Value(0),
       stepFiveScaleA:new Animated.Value(0),
       stepSixScaleA:new Animated.Value(0),
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
        this._transform('fadeIn'),
        this._translate('stepOneDownOpc','stepOneDown'),
        this._transform('stepOnelineX'),
        this._translate('stepOneUpOpcA','stepOneUpA'),
        this._translate('stepOneUpOpcB','stepOneUpB'),
        this._translate('stepOneUpOpcC','stepOneUpC'),
        this._translate('stepOneUpOpcD','stepOneUpD'),
        this._translate('stepOneUpOpcE','stepOneUpE'),
        this._translate('stepOneUpOpcF','stepOneUpF'),
        this._transform('stepOnelineY'),
    ]).start(()=>{this.setState({loadmore:true},()=>this.loop())});
   }
   stepTwoAnm(){
    Animated.sequence([
      Animated.delay(300),
      this._transform('stepTwoScaleA'),
    ]).start();
   }
   stepThreeAnm(){
     let time = 200;
     this.setState({animate:[0,1,1,0,0,0]});
     Animated.sequence([
       Animated.delay(300),
       this._transform('stepThreeA',time),
       this._translate('stepThreeBop','stepThreeB'),
       this._transform('stepThreeC',time),
       this._transform('stepThreeD',time),
       this._transform('stepThreeE',time),
       this._transform('stepThreeF',time),
       this._transform('stepThreeG',time),
       this._transform('stepThreeH',time),
       this._transform('stepThreeI',time),
       this._transform('stepThreeJ',time),
       this._transform('stepThreeK',time),
       this._transform('stepThreeL',time),
       this._transform('stepThreeM',time),
       this._transform('stepThreeN',time),
       this._translate('stepThreeOop','stepThreeO'),
       this._transform('stepThreeP',time),
       this._transform('stepThreeQ',time),
       this._transform('stepThreeR',time),
       this._transform('stepThreeS',time),
       this._transform('stepThreeT',time),
       this._translate('stepThreeUop','stepThreeU'),
       this._transform('stepThreeV',time),
       this._transform('stepThreeW',time),
       this._transform('stepThreeX',time),
       this._transform('stepThreeY',time),
       this._transform('stepThreeZ',time),
       this._transform('stepThreeAA',time),
       this._transform('stepThreeAB',time),
       this._translate('stepThreeACop','stepThreeAC'),
       this._transform('stepThreeAD',time),
       this._transform('stepThreeAE',time),
       this._transform('stepThreeAF',time),
       this._transform('stepThreeAG',time),
       this._transform('stepThreeAH',time)
     ]).start();
   }
   stepFourAnm(){
    Animated.sequence([
      Animated.delay(300),
      this._transform('stepFourScaleA'),
    ]).start();
   }
   stepFiveAnm(){
    Animated.sequence([
      Animated.delay(300),
      this._transform('stepFiveScaleA'),
    ]).start();
   }
   stepSixAnm(){
    Animated.sequence([
      Animated.delay(300),
      this._transform('stepSixScaleA'),
    ]).start();
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
         switch (activeIndex+1) {
           case 1:
            this.stepTwoAnm();
             break;
           case 2:
            this.state.animate[2]=='0'?this.stepThreeAnm():null;
             break;
           case 3:
            this.state.animate[3]=='0'?this.stepFourAnm():null;
             break;
           case 4:
            this.state.animate[4]=='0'?this.stepFiveAnm():null;
             break;
           case 5:
            this.state.animate[5]=='0'?this.stepSixAnm():null;
             break;
           default:null

         }
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
             title={"安全保障"}
             leftShowIcon={true}
             leftBtnFunc={this._goBack.bind(this)}
         />
         <ScrollView
           ref={(scrollView) => { this.ScrollViewParent = scrollView; }}
           pagingEnabled={true}
           >
           <ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_01.png')} resizeMode="cover" style={styles.imgView}/>
             <View style={styles.ViewContent}>
               <View style={styles.topView}>
                 <Animated.View style={[styles.centerHeight,{height:50/oPx,opacity:this.state.fadeIn}]}><Text style={styles.textBig}>项目保障</Text></Animated.View>
                 <Animated.View style={[styles.centerHeight,{opacity:this.state.stepOneDownOpc,transform:[{translateX:this.state.stepOneDown}]}]}><Text style={styles.textSmall}>所有普金资本上线项目，必须经过五级过滤！</Text></Animated.View>
                 <Animated.View style={[styles.lineView,{opacity:this.state.stepOnelineX}]}></Animated.View>
               </View>
               <View style={styles.stepView}>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcA,transform:[{translateY:this.state.stepOneUpA}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>筛选过滤淘汰40%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcB,transform:[{translateY:this.state.stepOneUpB}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>介入过滤淘汰30%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcC,transform:[{translateY:this.state.stepOneUpC}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>实地调查淘汰10%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcD,transform:[{translateY:this.state.stepOneUpD}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>初审过滤淘汰10%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcE,transform:[{translateY:this.state.stepOneUpE}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>风控终审淘汰5%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.stepViewItem,{opacity:this.state.stepOneUpOpcF,transform:[{translateY:this.state.stepOneUpF}]}]}>
                   <Image style={styles.pointer} source={require('../../images/icon/icon_pointer.png')}/>
                   <Text style={styles.textSmall}>最终实际上线项目只占推荐项目的5%</Text>
                 </Animated.View>
                 <Animated.View style={[styles.lineColumn,{opacity:this.state.stepOnelineY}]}>
                 </Animated.View>
               </View>
             </View>
           </ScrollView>
           {this.state.loadmore ? <View><ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_02.png')} resizeMode="cover" style={styles.imgView}/>
             <Animated.View style={[styles.ViewContent,{transform:[{scale: this.state.stepTwoScaleA}]}]}>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={styles.textBig}>项目保障</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   供应链金融：基于城投集团供应链上下游的采购贸易，为采购方或项目方提供融资，融资方以应收账款质押、保证金担保、第三方机构担保等形式为借款提供担保。</Text></View>
                 <View style={styles.lineView}></View>
               </View>
               <View style={[styles.topView,]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>国资</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   作为一家国资参股互联网金融平台，依托城投集团在本土的优势地位及多年的行业沉淀，通过业务及第三方的市场信息交互对接，对借款项目方的信息流、资金流、现金流拥有更全面的掌握，能够建立包含多个关键指标的风险预警机制，从而具备提高风控效果的实质价值。</Text></View>
               </View>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>金融</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   借助赣州盛汇资产管理公司产业投资、资产收处风控体系，以严谨专业的风控模型，通过严密的审核流程和严格的审核标准，对借款项目进行层层把关。</Text></View>
               </View>
             </Animated.View>
           </ScrollView>
           <ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_03.png')} resizeMode="cover" style={styles.imgView}/>
             <View style={[styles.ViewContent,styles.ViewContentFk]}>
               <Animated.View style={[styles.topView,{opacity:this.state.stepThreeA}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={styles.textBig}>风控流程</Text></View>
                 <View style={styles.lineView}></View>
               </Animated.View>
               <View style={styles.viewFengKong}>
                 <View style={styles.viewColumn}>
                   <Animated.Text style={[styles.fkLeftText,{opacity:this.state.stepThreeBop,transform:[{translateX: this.state.stepThreeB}]}]}>贷前流程</Animated.Text>
                   <Animated.Image style={[styles.pointer,styles.pointerFk,{opacity:this.state.stepThreeC}]} source={require('../../images/icon/icon_pointer.png')}/>
                   <Animated.Image source={require('../../images/other/safety_fk_step_01.png')} style={[styles.fkStepOne,{opacity:this.state.stepThreeD}]}>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeE}]}>贷前接洽</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeF}]}>风控初选</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeG}]}>尽职调查</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeH}]}>项目评审会</Animated.Text>
                  </Animated.Image>
                 </View>
                 <View style={[styles.fkDownView]}>
                   <Animated.Image source={require('../../images/other/safety_fk_step_01_line.png')} style={[styles.fkStepOneLine,{opacity:this.state.stepThreeI}]} />
                   <View style={styles.fkDownStepView}>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeJ}]}>
                       <Text style={styles.fkDownBgText}>初步调查</Text>
                     </Animated.View>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeK}]}>
                       <Text style={styles.fkDownBgText}>外围调查</Text>
                     </Animated.View>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeL}]}>
                       <Text style={styles.fkDownBgText}>现场调查</Text>
                     </Animated.View>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeM}]}>
                       <Text style={styles.fkDownBgText}>财务调查</Text>
                     </Animated.View>
                     <Animated.View style={[styles.fkDownBg,styles.fkDownBgLast,{opacity:this.state.stepThreeN}]}>
                       <Text style={styles.fkDownBgText}>尽调报告</Text>
                     </Animated.View>
                   </View>
                 </View>
                 <View style={[styles.viewColumn,{marginTop:80/oPx}]}>
                   <Animated.Text style={[styles.fkLeftText,{opacity:this.state.stepThreeOop,transform:[{translateX: this.state.stepThreeO}]}]}>贷中流程</Animated.Text>
                   <Animated.Image style={[styles.pointer,styles.pointerFk,{opacity:this.state.stepThreeP}]} source={require('../../images/icon/icon_pointer.png')}/>
                   <Animated.Image source={require('../../images/other/safety_fk_step_02.png')} style={[styles.fkStepTwo,{opacity:this.state.stepThreeQ}]}>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeR}]}>贷时审查</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{marginLeft:15/oPx,opacity:this.state.stepThreeS}]}>合同签署</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{marginLeft:15/oPx,opacity:this.state.stepThreeT}]}>项目上线</Animated.Text>
                  </Animated.Image>
                 </View>
                 <View style={[styles.viewColumn,{marginTop:80/oPx}]}>
                   <Animated.Text style={[styles.fkLeftText,{opacity:this.state.stepThreeUop,transform:[{translateX: this.state.stepThreeU}]}]}>贷后流程</Animated.Text>
                   <Animated.Image style={[styles.pointer,styles.pointerFk,{opacity:this.state.stepThreeV}]} source={require('../../images/icon/icon_pointer.png')}/>
                   <Animated.Image source={require('../../images/other/safety_fk_step_03.png')} style={[styles.fkStepThree,{opacity:this.state.stepThreeW}]}>
                    <Animated.Text style={[styles.stepViewText,{opacity:this.state.stepThreeX}]}>贷后检查</Animated.Text>
                    <Animated.Text style={[styles.stepViewText,{marginLeft:15/oPx,opacity:this.state.stepThreeY}]}>贷款回收</Animated.Text>
                  </Animated.Image>
                 </View>
                 <View style={styles.fkDownView}>
                   <Animated.Image source={require('../../images/other/safety_fk_step_02_line.png')} style={[styles.fkStepTwoLine,{opacity:this.state.stepThreeZ}]} />
                   <Animated.View style={[styles.fkDownStepView,styles.fkDownThreeView]}>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeAA}]}>
                       <Text style={styles.fkDownBgText}>预警监测</Text>
                     </Animated.View>
                     <Animated.View style={[styles.fkDownBg,{opacity:this.state.stepThreeAB}]}>
                       <Text style={styles.fkDownBgText}>实地检查</Text>
                     </Animated.View>
                   </Animated.View>
                 </View>
                 <View style={[styles.viewColumn,{marginTop:80/oPx,height:65/oPx}]}>
                   <Animated.View style={[styles.fkLeftTextView,{opacity:this.state.stepThreeACop,transform:[{translateX: this.state.stepThreeAC}]}]}>
                     <Text style={styles.fkLeftText}>项目完结</Text>
                     <Text style={styles.fkLeftText}>评价流程</Text>
                   </Animated.View>
                   <Animated.Image style={[styles.pointer,styles.pointerFk,{opacity:this.state.stepThreeAD}]} source={require('../../images/icon/icon_pointer.png')}/>
                   <Animated.Image source={require('../../images/other/safety_fk_step_04.png')} style={[styles.fkStepFour,{opacity:this.state.stepThreeAE}]}>
                    <Animated.Text style={[styles.stepViewTextNo,{width:225/oPx},{opacity:this.state.stepThreeAF}]}>尽职评价调查总结</Animated.Text>
                    <Animated.Text style={[styles.stepViewTextNo,{width:180/oPx},{opacity:this.state.stepThreeAG}]}>交易资料存档</Animated.Text>
                  </Animated.Image>
                 </View>
                 <Animated.View style={[styles.fkLineView,{opacity:this.state.stepThreeAH}]}></Animated.View>
               </View>
             </View>
           </ScrollView>
           <ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_04.png')} resizeMode="cover" style={styles.imgView}/>
             <Animated.View style={[styles.ViewContent,{transform:[{scale: this.state.stepFourScaleA}]}]}>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={styles.textBig}>资金保障</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   普金资本作为金融信息服务平台，绝不触碰投资人的资金！</Text></View>
                 <View style={styles.lineView}></View>
               </View>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>汇付天下（第三方支付托管）</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   普金资本作为纯中介性质的互联网金融平台，绝不触碰投资人的资金。为了保证投资资金与平台完全隔离，普金资本与汇付天下合作，实现合规化资金托管，确保您的资金来去清晰、来去自由。</Text></View>
               </View>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>身份认证体系</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   普金资本建立手机认证、实名认证、银行卡认证等全方位认证体系，资金只能转出到本人实名认证及绑定的银行账户。</Text></View>
               </View>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>资金账户查询</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   投资人可实时查看资金账户的详情。</Text></View>
               </View>
             </Animated.View>
           </ScrollView>
           <ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_05.png')} resizeMode="cover" style={styles.imgView}/>
             <Animated.View style={[styles.ViewContent,{transform:[{scale: this.state.stepFiveScaleA}]}]}>
               <View style={[styles.topView,{marginTop:40/oPx}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig]}>技术保障</Text></View>
                 <View style={styles.lineView}></View>
               </View>
               <View style={[styles.topView,{marginTop:40/oPx}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>网络安全</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   投资人可实时查看资金账户的详情。</Text></View>
               </View>
               <View style={[styles.topView,{marginTop:40/oPx}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>数据安全</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   使用阿里云服务，实时同步系统在云端的容灾备份点，每份数据具有多个副本，对于SQL注入攻击采用了严格的防范措施，确保用户信息的安全性和完整性。</Text></View>
               </View>
               <View style={[styles.topView,{marginTop:40/oPx}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>加密验证</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   数据库采用多重备份及恢复机制，提供专业的数据优化。防止数据被恶意修改，系统自动验证备份数据的可用性、完整性，确保系统历史数据的永久保存和绝对安全。</Text></View>
               </View>
               <View style={[styles.topView,{marginTop:40/oPx}]}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>内控管理</Text></View>
                 <View style={[styles.centerHeight]}><Text style={styles.textSmall}>
                   已有完善的内部管理机制和加密系统，从而确保工作人员不能在任何场合和任何时间下擅自披露、修改、删除系统的相关数据。严格遵守国家相关的法律法规，对用户的隐私信息进行保护。未经用户的同意，我们不会向任何第三方公司、组织和个人披露用户的个人信息、账户信息以及交易信息（法律法规另有规定除外）。</Text></View>
               </View>
             </Animated.View>
           </ScrollView>
           <ScrollView
             style={styles.scrollViewContent}
             showsVerticalScrollIndicator={false}>
             <Image source={require('../../images/other/img_safety_bg_06.png')} resizeMode="cover" style={styles.imgView}/>
             <Animated.View style={[styles.ViewContent,{transform:[{scale: this.state.stepSixScaleA}]}]}>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig]}>法律保障</Text></View>
                 <View style={styles.centerHeight}><Text style={styles.textSmall}>
                   普金资本是依法设立的网络借贷中介平台，为借贷双方提供信息撮合服务，属民间借贷范畴，受合同法、民法通则等法律法规及最高人民法院相关司法解释规范。</Text></View>
                 <View style={styles.lineView}></View>
               </View>
               <View style={styles.topView}>
                 <View style={[styles.centerHeight,{height:50/oPx}]}><Text style={[styles.textBig,{color:'#eb3331'}]}>相关法律法规</Text></View>
                 <View style={styles.centerHeight}>
                   <Text style={styles.textSmall}>· 关于网络借贷合法性</Text>
                   <Text style={styles.textSmall}>· 关于投资人及借款人双方民间借贷的合法性</Text>
                   <Text style={styles.textSmall}>· 关于普金资本提供撮合服务的合法性</Text>
                   <Text style={styles.textSmall}>· 关于电子合同的有效性</Text>
                   <Text style={styles.textSmall}>· 普金资本法律顾问</Text>
                 </View>
               </View>
             </Animated.View>
           </ScrollView></View>:null }
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
