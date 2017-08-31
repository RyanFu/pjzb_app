/**
 * Created by zlx on 2017/03/27.
 * 合作伙伴
 */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    ScrollView,
  } from 'react-native';
  import { goBack } from '../../utils/NavigatorBack';
  import Request from '../../utils/Request';
  import {StyleConfig} from '../../style';
  const oPx = StyleConfig.oPx;
  export default class Partners extends Component {
    constructor(props){
      super(props);
      this.state = {
          data:[],
      };
    }

    componentWillMount () {
        Request.post('queryLinksPage.do',{uid:''},(data)=>{
            let result = data.LinksPages;
            if (data.error == 0) {
                this.setState({
                    data: data.LinksPages,
                });
            }
        },(error)=>{
            Alert.alert('提示信息','您的网络不稳定，请稍后再试！'+error)
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    getItems = (row,index) => {
        // let host = Request.HOST;
        // host = host==='http://120.76.203.19:8090'?'http://120.76.203.19:8090/shzc_test/':host+'/';
        if (this.state.data.length > 0) {
            return  <View style={styles.imgView} key={index}>
                    <Image
                           source={{uri:row.companyImg}}
                           style={styles.img}/>
                    </View>
        }
        return <View style={[styles.rowTr,{marginTop:40/oPx}]} key={index}>
                    <Text style={{color:'#999',fontSize:28/oPx}}>暂无内容</Text>
                </View>;
    };

    render(){
      return (
        <View style={styles.container}>
            <View style={styles.rowTr}>
                {
                    this.state.data.map((row,index) => {
                        return this.getItems(row,index);
                    })
                }
            </View>

        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:16/oPx,
    },
      rowTr: {
        height:73/oPx,
        width:StyleConfig.screen_width,
        flexDirection: 'row',
        flexWrap:'wrap',
        marginTop:40/oPx,
      },
      img: {
          width:349/oPx,
          height:80/oPx,
          borderWidth:StyleConfig.borderWidth,
          borderColor:'#D0D0D0',
      },
      imgView: {
        width:(StyleConfig.screen_width)/2,
        height:100/oPx,
        alignItems:'center',
        marginBottom:25/oPx,
      },
  });
