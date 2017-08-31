/**
 * Created by wsl on 2017/02/17.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    WebView,
} from 'react-native';

import NavigationBar from './NavigationBar';
import Result from './Result';
import { goBack } from '../utils/NavigatorBack';
import AppMain from '../main/appMain';
import {StyleConfig} from '../style';
 export default class OwebView extends Component{
   constructor(props){
     super(props);
     this.state={
       html:props.html
     }
   }
   _goBack(){
     if(this.props.back){
       goBack(this.props.navigator);
     }else{
       this.props.navigator.resetTo({component:AppMain,name:'AppMain'});
     }
   }
   _onMessage(event){
     let callbackData = JSON.parse(event.nativeEvent.data);
     if(callbackData.app){
      this.props.navigator.resetTo({component:AppMain,name:'AppMain',params:callbackData})
     }else{
      this.props.navigator.push({component:Result,name:'Result',params:callbackData})
     }
     
   }
   render(){
     const jsCode = `window.reactNativePostmsg = window.postMessage;window.Native = true;`;
     const {url,html} = this.props;
     let source = html?{html:html}:{uri:url};
     return (
       <View style={{flex:1,backgroundColor:'#fff'}}>
         <NavigationBar
           title={this.props.title}
           leftShowIcon={true}
           leftBtnFunc={this._goBack.bind(this)}
         />
         <WebView
             onError={()=>alert('error')}
             source={source}
             injectedJavaScript={jsCode}
             messagingEnabled={false}
             onMessage={(event) => this._onMessage(event)}
             style={[{backgroundColor:'#fff'}]}
             startInLoadingState={true}
         />
       </View>
     )
   }
 }
