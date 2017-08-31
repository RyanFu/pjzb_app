
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    PanResponder,
    Alert,
    styleSheet
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
//import PasswordGesture from '../gest/index';
const Radius = Width / 10;
const Line = 4;
var Password1 = '';
export default class AppDemo extends Component {
    constructor(props) {
        super(props);
        let circles = [];
        let lines = [];
        let Margin = Radius;
        for (let i=0; i < 9; i++) {
            let row = i % 3;
            let clu = parseInt(i / 3);
            circles.push({
                isActive: false,
                x: (row*3+1)*Radius,
                y: (clu*3+1)*Radius
            });
            lines.push({
                start: {
                    x: (row*3+2)*Radius-Line/2,
                    y: (clu*3+2)*Radius-Line/2
                },
                end: {
                    x: (row*3+2)*Radius,
                    y: (clu*3+2)*Radius
                },
                angle:'0rad',
                moveX:0,
                moveY:0,
                length:0
            })
        }
        this.state = {
            circles: circles,
            circlesInit:circles,
            lines: lines,
            linesInit:lines,
            viewWidth:0,
            password:[]
        }
    }
    componentDidMount() {
        setTimeout(this.measureWatermarkerImage.bind(this));
    };
    measureWatermarkerImage(){
        this.refs.watermarkerImage.measure((a, b, width, height, px, py) =>
            this.setState({viewWidth:width,viewHeight:height,viewPageX:px,viewPageY:py})
        );
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (event) => true,
            onStartShouldSetPanResponderCapture: (event) => true,
            onMoveShouldSetPanResponder: (event) => true,
            onMoveShouldSetPanResponderCapture: (event) => true,

            // 开始手势操作
            onPanResponderGrant: (event) => {
                this.onStart(event);
            },
            // 移动操作
            onPanResponderMove: (event) => {
                this.onMove(event);
            },
            // 释放手势
            onPanResponderRelease: (event) => {
                this.onEnd(event);
            }
        })
    }
    onStart(e){
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY;
        //console.log('locationX:'+e.nativeEvent.locationX+'pageX ：'+e.nativeEvent.pageX);
        // if(e.nativeEvent.locationX<Radius*2 && e.nativeEvent.pageX>Radius && e.nativeEvent.pageY>Radius){
        //     console.log('yes');
        // }else{
        //     console.log('no');
        // }
        let index = this.getTouchChar({x,y});
        if(index){
            this.setActive(index);
            this.linesChiner(index,{x,y});
        }
    }
    onMove(e){
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY;
        let index = this.getTouchChar({x,y});
        this.linesChiner(index,{x,y});
        if(index){
            this.setActive(index);
        }
    }
    onEnd(e){
        if(this.state.password.length==0){
            return;
        }
        if(this.state.password.length<3){
            Alert.alert('提示','密码太过简单啦，请重新设置哦！');
            this.onReset();
        }else{
            Alert.alert('提示',this.state.password.join(''));
            this.onReset();
            let endIndex = this.state.password[this.state.password.length-1];
            this.linesChiner(endIndex,this.state.lines[endIndex].start);
        }
    }
    linesChiner(index,op){
        let older = Number(index||this.state.password[this.state.password.length-1]);
        let transform = this.getTransform(this.state.lines[older].start,op);
        let length = transform.d;
        let angle = transform.a + 'rad';
        let moveX = transform.x;
        let moveY = transform.y;
        this.state.lines[older].length = length;
        this.state.lines[older].angle = angle;
        this.state.lines[older].moveX = moveX;
        this.state.lines[older].moveY = moveY;
        let lines = this.state.lines;
        this.setState({lines});
    }
    getDistance(pt1, pt2) {
        let a = Math.pow((pt1.x - pt2.x), 2);
        let b = Math.pow((pt1.y - pt2.y), 2);
        let d = Math.sqrt(a + b);

        return d;
    }
    getTransform(pt1, pt2) {
        //计算线条角度，wsl
        let d = this.getDistance(pt1, pt2);
        let c = (pt2.x - pt1.x) / d || 0;
        let a = Math.acos(c);
        if ( pt1.y > pt2.y ) a = 2 * Math.PI - a;
        let c1 = {
            x: pt1.x + d / 2,
            y: pt1.y
        };
        let c2 = {
            x: (pt2.x + pt1.x) / 2,
            y: (pt2.y + pt1.y) /2
        };
        let x = c2.x - c1.x;
        let y = c2.y - c1.y;
        return {d, a, x, y};
    }
    getTouchChar(touch) {
        let x = touch.x;
        let y = touch.y;
        for (let i=0; i < 9; i++){
            let minx = this.state.circles[i].x;
            let miny = this.state.circles[i].y;
            let maxx = minx + Radius*2;
            let maxy = miny + Radius*2;
            if(x>minx && y>miny && x<maxx && y<maxy){
                return String(i);
            }
        }
        return false;
    }
    setActive(index){
        if(index){
            if(this.state.circles[index].isActive) return;
            this.state.circles[index].isActive = true;
            let circles = this.state.circles;
            this.setState({circles});
            let password = this.state.password;
            password.push(index);
            if(password.length>1){
                this.linesChiner(password[password.length-2],this.state.lines[index].start);
            }
            this.setState({password:password});
        }
    }
    onReset(){
        for(let i =0;i<9;i++){
            this.state.circles[i].isActive = false;
            let circles = this.state.circles;
            this.setState({circles});
            this.state.lines[i].length = 0;
            let lines = this.state.lines;
            this.setState({lines});
        }
        this.setState({password:[]});
    }
    circlesDom(row,index){
        return <View style={[styles.childView,row.isActive?styles.active:null,{borderRadius:Radius,width:Radius*2,height:Radius*2,left:row.x,top:row.y}]} key={index}>
            <View style={[styles.circul,row.isActive?styles.circulActive:null]}></View>
        </View>
    }
    linesDom(row,index){
        return <Text style={[styles.lineView,
            {top: row.start.y, width: row.length,left:row.start.x,top:row.start.y},
            {transform: [{translateX: row.moveX}, {translateY: row.moveY}, {rotateZ: row.angle}]}
        ]} key={index}>{index}
        </Text>
    }
    render(){
        return (
            <View
                ref="watermarkerImage"
                style={styles.container} {...this._panResponder.panHandlers}>
                {this.state.circles.map((row,index)=>{return this.circlesDom(row,index)})}
                {this.state.lines.map((row,index)=>{return this.linesDom(row,index)})}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#666',
        width:Width,height:Height,
        flexWrap:'wrap',
        flexDirection:'row',
    },
    childView:{
        backgroundColor:'#666',
        borderWidth:2,borderColor:'#ccc',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    circul:{
        width:Radius/4,
        height:Radius/4,
        borderRadius:Radius/8,
        backgroundColor:'transparent'
    },
    circulActive:{
        backgroundColor:'#f00'
    },
    active:{
        borderColor:'#f00',
    },
    lineView:{
        width:Line,
        height:Line,
        position:'absolute',
        backgroundColor:'#ff0',
        zIndex:-1
    }

})