/**
 * Created by wsl on 2017/01/13.
 */
 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
 } from 'react-native';
 import NavigationBar from '../../components/NavigationBar';

 export default class About extends Component {
   constructor(props){
     super(props);
   }
   _leftbtn(){
     console.log(1);
   }
   render(){
     let leftImageSource = require('../../images/icon/icon_left.png');
     return (
       <View style={{flex:1}}>
         <NavigationBar
           title={"about"}
           leftShowIcon={true}
           leftImageSource={leftImageSource}
           leftBtnFunc={this._leftbtn.bind(this)}
           rightTitle={'设置'}
         />
         <View style={styles.container}>
           <Text style={styles.welcome}>
             Welcome to React Native!
           </Text>
           <Text style={styles.instructions}>
             To get started, edit index.android.js
           </Text>
           <Text style={styles.instructions}>
             Double tap R on your keyboard to reload,{'\n'}
             Shake or press menu button for dev menu
           </Text>
         </View>
       </View>
     );
   }
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
 });
