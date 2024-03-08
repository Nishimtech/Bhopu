import { Platform, StyleSheet } from "react-native";
import {Constant, Core, Fonts} from "../../../Helper";
const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:Core.input_view_bg,
        overflow:'hidden'
    },
    safeAreaConatiner:{
        flex:1,
    },
    behindContainer:{
        position:'absolute',
        width:'100%',
        height:Constant.FULL_HEIGHT,
    },
    rightTop:responsive=>({
        position:'absolute',
        right:0,
        top:responsive.size(Platform.OS == 'ios'?100:80),
        height:responsive.size(234),
        width:responsive.size(234),
    }),
    bottonLeft:responsive=>({
        position:'absolute',
        left:0,
        bottom:0,
        height:responsive.size(234),
        width:responsive.size(234),
    }),
    viewSports:responsive=>({
        width:responsive.size(33),
        marginTop:responsive.size(10),
        height:responsive.size(22),
        borderRadius:responsive.size(6),
        alignItems:'center',
        justifyContent:'center'
    }),
    txtSport:responsive=>({
        textAlign:'center',
        fontSize:responsive.fontSize(Fonts.sd),
        fontFamily:Fonts.regular,
        color:'#fff'
    }),
    heightStatusBar:responsive=>({
        position:'absolute',
        top:0,
        borderRadius:responsive.size(25),
        width:Constant.FULL_WIDTH,
        height:responsive.size(90),
        backgroundColor:'rgba(53, 57, 63, 1)',
    }),
    headerContainer:(opacityAnim,responsive,isHeaderBorder)=>({
        width:'100%',
        height:responsive.size(isHeaderBorder?(Platform.OS=='ios'?70:80):(Platform.OS=='ios'?60:70)),
        alignItems:'center',
        opacity:opacityAnim,
        backgroundColor:`rgba(53, 57, 63, 1)`,
        borderBottomLeftRadius:responsive.size(isHeaderBorder?20:0),
        borderBottomRightRadius:responsive.size(isHeaderBorder?20:0),
    }),
    logoSize:responsive=>({
        width:responsive.size(160),
        height: responsive.size(Platform.OS == 'ios' ? 47 : 48),
        marginTop:responsive.size(Platform.OS == 'ios'?0:10)
    }),
    txtTitle:responsive=>({
        fontSize:responsive.fontSize(Fonts.xxl),
        textAlign:'center',
        fontFamily:Fonts.semibold,
        lineHeight:responsive.size(42),
        color:Core.primaryColor,
        marginTop:responsive.size(Platform.OS == 'ios'?10:20)
    }),
    txtsubTitle:responsive=>({
        fontSize:responsive.fontSize(Fonts.md),
        textAlign:'center',
        fontFamily:Fonts.medium,
        color:Core.silver,
        marginTop:responsive.size(-10)
    }),
    backContainer:(posAnim,responsive)=>({
        position:'absolute',
        left:responsive.size(16),
        top: responsive.size(Platform.OS=='android'?20:10),
        width:responsive.size(42),
        height:responsive.size(42),
        overflow:'hidden',
        marginTop:posAnim
    }),
    rightContainer:(posAnim,responsive)=>({
        position:'absolute',
        right:responsive.size(16),
        top: responsive.size(Platform.OS=='android'?20:10),
        width:responsive.size(42),
        height:responsive.size(42),
        overflow:'hidden',
        marginTop:posAnim
    }),
    rightInfo:(responsive)=>({
        position:'absolute',
        right:responsive.size(16),
        top: responsive.size(Platform.OS=='android'?20:10),
        width:responsive.size(18),
        height:responsive.size(18),
    }),
    backTouchAction:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    bgBack:{
        position:'absolute',
        top:0,
        width:'100%',
        height:'100%'
    },
    ic_back:responsive=>({
        width:responsive.size(24),
        height:responsive.size(24),
    }),
    activeColor:{
        tintColor:Core.primaryColor
    },
    homeContainer:{ 
        flex: 1, 
        overflow: 'hidden' 
    },
    viewCount:responsive=>({
        position:'absolute',
        top:responsive.size(-2),
        right:responsive.size(-2),
        width:responsive.size(4),
        height:responsive.size(4),
        borderRadius:responsive.size(2),
        backgroundColor:Core.primaryColor
    })
})
export default styles
