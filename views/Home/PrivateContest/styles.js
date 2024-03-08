import { StyleSheet } from "react-native";
import { Constant, Core } from "../../../Helper";
import Fonts from "../../../Helper/Fonts";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    txtWlcme: (responsive, txtAnim) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        marginBottom: responsive.size(10),
        lineHeight: responsive.size(21),
        width: responsive.size(306),
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Fonts.regular,
        color: Core.white,
        marginTop:txtAnim

    }),
    txtHeader: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxxl),
        fontFamily: Fonts.semibold,
        color: Core.white,
        textAlign: 'center'
    }),
    viewWin: responsive => ({
        width: '50%',
        height: responsive.size(67),
        borderRadius: responsive.size(10),
        backgroundColor: "rgba(250, 214, 12, 0.16)",
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: responsive.size(12)
    }),
    txtWin:responsive=>({
        textAlign: 'center',
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.h6),
        fontFamily: Fonts.semibold
    }),
    txtSubHdr: responsive => ({
        marginTop: responsive.size(25),
        fontSize:responsive.fontSize(Fonts.lg),
        marginBottom: responsive.size(20),
        width: responsive.size(226),
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Fonts.regular,
        color: Core.white,
    }),
    bottomView: responsive => ({
        position:'absolute',
        bottom:0,
        width:Constant.FULL_WIDTH,
        height: responsive.size(170),
        padding:0,
        margin:0
    }),
    left_pos: responsive => ({
        position: 'absolute',
        height: '100%',
        width: responsive.size(78),
        left: -5,
        bottom: 0,
        resizeMode:'contain'
    }),
    right_pos: responsive => ({
        position: 'absolute',
        height: '100%',
        width: responsive.size(78),
        right: 0,
        bottom: -5,
        marginRight:responsive.size(-4),
        resizeMode: 'contain',
        transform: [
            { scaleX: -1 }
        ]
    }),
    imgSocial: responsive => ({
        alignSelf: 'center',
        marginBottom: responsive.size(15),
        opacity:0.2
    }),
    viewUser: responsive => ({
        flexDirection: 'row',
        marginLeft: responsive.size(45)
    }),
    txtUserName: responsive => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        marginLeft: responsive.size(10),
        
    }),
    viewName: responsive => ({
        flexWrap:'wrap',
        flexDirection:'row',
        alignSelf: 'center',
        marginTop: responsive.size(8),
        width: '80%',
        minHeight: responsive.size(40),
        backgroundColor: Core.input_view_bg,
        borderRadius: responsive.size(10),
        paddingHorizontal:responsive.size(10),
        paddingBottom:responsive.size(10),
        zIndex:5,
        overflow:'hidden'
    }),
    viewTouchName: responsive => ({
        height: responsive.size(30),
        width: '30%',
        marginTop:responsive.size(10),
        borderRadius: responsive.size(5),
        backgroundColor: Core.bright_gray,
        alignSelf: 'flex-start',
        marginLeft: responsive.size(10),
        // bottom: responsive.size(20)
    }),
    txtName: responsive => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        textAlign:'center',
        
      
    }),  
    
    imgCross: responsive => ({
        height: responsive.size(18),
        width: responsive.size(18),
        
      
        
        
    }),
    viewUserName:responsive=>({
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: responsive.size(2), 
        marginRight:responsive.size(5), 
        marginLeft:responsive.size(5)
    }),
    txtValidation: responsive => ({
        marginRight: responsive.size(48),
        alignSelf: 'flex-end',
        marginTop: responsive.size(5),
        color: Core.silver,
        fontFamily: Fonts.regular,
        fontSize: responsive.fontSize(Fonts.md)
    }),
    btnInvite:(responsive,isdisable)=>({
        marginBottom: responsive.size(30), 
        borderWidth: 1, 
        borderColor: isdisable?'#999':Core.primaryColor, 
        marginTop: responsive.size(20), 
        height: responsive.size(48), 
        width: '50%', 
        borderRadius: responsive.size(14), 
        backgroundColor: Core.bright_gray, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center',
    }),
    txtBtnInvite:(responsive,isdisable)=>({
        color: isdisable?'#999':Core.primaryColor, 
        textAlign: 'center', 
        fontSize: responsive.fontSize(Fonts.xxl), 
        fontFamily: Fonts.medium,
    }),
    txtShareCode:responsive=>({
        alignSelf: 'center', 
        marginBottom: responsive.size(12), 
        fontSize: responsive.fontSize(Fonts.md), 
        fontFamily: Fonts.regular, 
        color: Core.white 
    }),
    btnJoin:responsive=>({
        marginBottom: responsive.size(50), 
        height: responsive.size(48), 
        backgroundColor: Core.primaryColor, 
        width: '65%', 
        borderRadius: responsive.size(10), 
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf:'center',

    }),
    txtBtnJoin:responsive=>({
        fontFamily: Fonts.bold, 
        fontSize:responsive.fontSize(Fonts.xxl), 
        color: Core.black, 
        textAlign: 'center'
    }),
    touchCode:responsive=>({
        height: responsive.size(75), 
        backgroundColor: "rgba(250, 214, 12, 0.16)", 
        width: '80%', 
        borderRadius: responsive.size(10),
        marginBottom:responsive.size(35),
        flexDirection: 'row',
        alignSelf:'center',
        alignItems: 'center',
        justifyContent:'center'
    }),
   
    txtCode:responsive=>({
        fontFamily: Fonts.regular, 
        fontSize: responsive.fontSize(Fonts.h6), 
        color: Core.white, 
    }),

})
export default styles
