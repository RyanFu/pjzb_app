/**
 * Created by zlx on 2017/02/18.
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    WebView,
  } from 'react-native';
  import NavigationBar from '../../components/NavigationBar';
  import { goBack } from '../../utils/NavigatorBack';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class WebViewPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          url:null,
          html:null,
          type:null,
          title:null,
      }
    }

    componentWillMount () {
        this.setState({
            url:this.props.url,
            html:this.props.html,
            type:this.props.type,
            title:this.props.title,
        });
    }

    //返回
    _goBack(){
      goBack(this.props.navigator);
    }

    render(){
        return (
        <View style={styles.container}>
          <NavigationBar
          title={this.state.title}
          leftShowIcon={true}
          leftBtnFunc={this._goBack.bind(this)}
          />
            <WebView
                source={this.state.type === 'url'? {uri: this.state.url} : {html: this.state.html}}
                scalesPageToFit={true}
            />
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#e9ecf3'
    },

  });
