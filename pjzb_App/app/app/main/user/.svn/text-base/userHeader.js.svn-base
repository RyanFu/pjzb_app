import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

var ImagePicker = require('react-native-image-picker');//相机图片选择器

import NavigationBar from '../../components/NavigationBar';
import { goBack } from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
const oPx = StyleConfig.oPx;
import Button from '../../components/Button';

/**
 * 相机选择器的使用步骤：
 * 1.引入包文件 var ImagePicker = require('react-native-image-picker');
 * 2.
 *
 * */

var options = {
    // title: 'Select Avatar',

    title: '选择照片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource:require('../../images/user/invite_Qrcode.png'),
        };
    }

    componentDidMount(){
        // let filepath = '../../images/user/user_header_pic.png';
        var filepaths = require('../../images/user/user_header_pic.png');
        this.setState({
            avatarSource:filepaths,
        });
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    };

    //从相册选一张
    chooseFromLibrary = () =>{
        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        });

    }

    //拍一张照片
    takePhoto = () =>{
        // Launch Camera:
        ImagePicker.launchCamera(options, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        });

    }

    //图片上传
    uploadImage = () =>{
        let url = 'http://192.168.1.117:8090/shzc1.5/reactapp/querySysMails2.do';
        let formData = new FormData();
        let uri = require('../../images/user/user_header_pic.png');
        let file = {uri: uri, type: 'multipart/form-data', name: 'user_header_pic.jpg'};

        formData.append("images",file);

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response) => response.text() )
            .then((responseData)=>{
                alert('responseData:'+responseData);
                console.log('responseData',responseData);
            })
            .catch((error)=>{console.error('error',error)});

    }

    selectPhoto(){
        // 当你想展示相机还是相册这个选择器时：（变量options还有其它的设置，一些使用它的默认值就可以满足我们的要求，以下是我使用到的）
       /** var options = {
            title: '更换头像', // 选择器的标题，可以设置为空来不显示标题
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍一张照片', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
            chooseFromLibraryButtonTitle: '从相册选一张', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
            customButtons: {
                'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
            },
            mediaType: 'photo', // 'photo' or 'video'
            videoQuality: 'medium', // 'low', 'medium', or 'high'
            durationLimit: 10, // video recording max time in seconds
            maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
            maxHeight: 100, // photos only
            allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
        };*/

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled image picker');
                console.log('User cancelled image picker');
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else {
                alert(response.uri);
                // let source = '';
                //
                // if (Platform.OS === 'android') {
                //     source = {uri: response.uri, isStatic: true};
                // } else {
                //     source = {
                //         uri: response.uri.replace('file://', ''),
                //         isStatic: true
                //     };
                // }
                let source = { uri: response.uri, isStatic: true };
                this.setState({
                    avatarSource: source
                });
            }
        });
    };

    render() {
        return (
            <View style={styles.bodyView}>
                <NavigationBar
                    title={"设置个人头像"}
                    leftShowIcon={true}
                    leftBtnFunc={this._goBack.bind(this)}
                />
                <Image source={this.state.avatarSource} style={styles.userHeader} />

                <View style={[styles.container]}>
                    <View style={[styles.btnContainer]}>
                        <Button
                            text={'从相册选一张'}
                            textColor={'#333333'}
                            onPress={this.chooseFromLibrary.bind(this)}
                            imgSource={require('../../images/index/btn_white.png')}
                            height={88/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                    <View style={[styles.btnContainer,{marginTop:30/StyleConfig.oPx}]}>
                        <Button
                            text={'拍一张照片'}
                            textColor={'#333333'}
                            onPress={this.takePhoto.bind(this)}
                            imgSource={require('../../images/index/btn_white.png')}
                            height={88/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                    <View style={[styles.btnContainer,{marginTop:30/StyleConfig.oPx}]}>
                        <Button
                            text={'上传图片'}
                            textColor={'#333333'}
                            onPress={this.uploadImage.bind(this)}
                            imgSource={require('../../images/index/btn_white.png')}
                            height={88/StyleConfig.oPx}
                            width={716/StyleConfig.oPx}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    /**整体布局是上下结构*/
    bodyView: {
        flex: 1,
        backgroundColor:'#e9ecf3'
    },
    userHeader:{
        width:StyleConfig.screen_width,
        height:660/oPx,
    },
    /**布局内容*/
    container: {
        marginLeft:30/StyleConfig.oPx,
        marginRight:30/StyleConfig.oPx,
        height:448/StyleConfig.oPx,
        width:StyleConfig.screen_width,
    },
    btnContainer:{
        height:88/StyleConfig.oPx,
        width:StyleConfig.screen_width-60/StyleConfig.oPx,
        marginTop:100/StyleConfig.oPx,
    }
});

