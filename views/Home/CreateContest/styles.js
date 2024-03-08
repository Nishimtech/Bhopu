import { Platform, StyleSheet } from "react-native";
import { Constant, Core, } from "../../../Helper";
import Fonts from "../../../Helper/Fonts";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    behindContainer:{
        position:'absolute',
        width:'100%',
        height:Constant.FULL_HEIGHT,
    },
    rightTop:responsive=>({
        position:'absolute',
        right:0,
        top:responsive.size(58),
        height:responsive.size(234),
        width:responsive.size(234),
    }),
    bottonLeft:responsive=>({
        position:'absolute',
        top:responsive.size(100),
        height:responsive.size(234),
        width:responsive.size(234),
    }),
    viewCreateContest: responsive => ({
        marginBottom: responsive.size(5),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '94%',
        marginTop: responsive.size(20),
        height: responsive.size(48),
        borderRadius: responsive.size(10),
        backgroundColor: Core.tuna_color
    }),
    
    btnCreate: (responsive, selectIdxPrize) => ({
        width: '50%',
        height: responsive.size(38),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: selectIdxPrize == 0 ? 1 : 0,
        backgroundColor: selectIdxPrize == 0 ? Core.input_view_bg : Core.tuna_color,
        borderColor: Core.primaryColor,
        borderRadius: responsive.size(10)
    }),
    btnJoin: (responsive, selectIdxPrize) => ({
        height: responsive.size(38),
        width: '50%',
        borderWidth: selectIdxPrize == 1 ? 1 : 0,
        backgroundColor: selectIdxPrize == 1 ? Core.input_view_bg : Core.tuna_color,
        borderColor: Core.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(10)
    }),
    txtCreate: (selectIdxPrize, responsive) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        color: selectIdxPrize == 0 ? Core.primaryColor : Core.silver,
        textAlign: 'center'
    }),
    txtJoin: (selectIdxPrize, responsive) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: selectIdxPrize == 1 ? Core.primaryColor : Core.silver
    }),
    listContainer: (responsive, item) => ({
        alignSelf: 'center',
        marginTop: responsive.size(15),
        marginBottom: responsive.size(15),
        borderRadius: responsive.size(12),
        width: '94%',
        overflow: 'hidden',
        backgroundColor: Core.bright_gray
    }),
    viewTxtInput: responsive => ({
        width: '90%',
        backgroundColor: Core.input_view_bg,
        borderRadius: responsive.size(10),
        marginTop: responsive.size(10),
        alignSelf: 'center',
        minHeight: responsive.size(50),
        paddingHorizontal: responsive.size(15),
        justifyContent: 'center'
    }),

    input: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        color: Core.white,
        lineHeight: responsive.size(18),
        textAlignVertical: 'center',
    }),
    viewList: responsive => ({
        width:'100%',
        overflow:'hidden'
    }),
    
    
    viewInputContainer: responsive => ({
        height: '100%',
        marginHorizontal: responsive.size(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    }),
    
    txtBottomValidation: responsive => ({
        marginTop: responsive.size(5),
        marginRight: responsive.size(20),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'right',
        color: Core.primaryColor
    }),
    
    txtInput: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.regular,

    }),
    viewInput: responsive => ({

        borderRadius: responsive.size(10),
        backgroundColor: Core.input_view_bg,
        width: Constant.FULL_WIDTH - responsive.size(60),
        height: responsive.size(52),
        // alignItems:'center',
        justifyContent: 'space-between',
        marginVertical: responsive.size(10),
        marginHorizontal: responsive.size(15)
    }),
    viewNum: responsive => ({
        marginRight: responsive.size(20),
        paddingHorizontal: responsive.size(10),
        height: responsive.size(26),
        borderRadius: responsive.size(60),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtNum: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.primaryColor,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    viewDone: responsive => ({
        marginRight: responsive.size(14),
        paddingHorizontal: responsive.size(5),
        width: responsive.size(50),
        height: responsive.size(26),
        borderRadius: responsive.size(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: Core.primaryColor
    }),
    txtDone: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.input_view_bg,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    viewOuter: (responsive, winners) => ({
        width: '94%',
        height: responsive.size((55 * winners) + 40),
        alignSelf: 'center',
        marginTop: responsive.size(20),
        backgroundColor: 'rgba(53, 57, 63, 1)',
        borderRadius: responsive.size(10),
        overflow: 'hidden'
    }),

    viewInnerItm: responsive => ({
        paddingHorizontal: responsive.size(20),
        width: '100%',
        height: responsive.size(45),
        borderBottomWidth: 1,
        borderBottomColor: Core.shuttle_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    txtSubHeader: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.silver,
        flex: 0.19
    }),
    viewInner: responsive => ({
        width: '100%',
        height: responsive.size(55),
        borderBottomWidth: 1,
        borderBottomColor: Core.shuttle_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    viewWinning: (responsive, isEdit) => ({
        borderWidth: isEdit ? 1 : 0,
        borderColor: Core.silver,
        backgroundColor: isEdit ? Core.input_view_bg : Core.transparent,
        borderRadius: responsive.size(10),
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: responsive.size(60),
        height: responsive.size(30),
        justifyContent: 'center'
    }),
    txtRankInput: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        color: '#FFF',
        paddingVertical: 0,
        paddingHorizontal: 0,
        textAlign: 'center',
        textAlignVertical: 'center'
    }),
    txtRank: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: responsive.size(20),
        flex: 0.3
    }),
    txtContestMode: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        color: Core.primaryColor,
        fontFamily: Fonts.medium,
        marginLeft: responsive.size(15),
        marginBottom: responsive.size(5),

    }),
    viewModal: responsive => ({
        marginTop: responsive.size(15),
        backgroundColor: Core.input_view_bg,
        height: responsive.size(700),
        borderRadius: responsive.size(15)
    }),
    viewModalHdr: responsive => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsive.size(20),
        marginLeft: responsive.size(15),
        marginRight: responsive.size(15)
    }),
    viewExpand: responsive => ({
        borderWidth: 1,
        borderColor: Core.tuna_color,
        width: "30%",
        alignItems: 'center',
        justifyContent: 'center',
        height: responsive.size(80),
        borderRadius: responsive.size(10),
        zIndex: 1,
        alignSelf: 'center',
        marginBottom: responsive.size(10)
    }),
    viewBtnPick: responsive => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }),
    btnPick: (responsive, selectBtnPick) => ({
        height: responsive.size(55),
        width: "27%",
        borderColor: Core.primaryColor,
        borderWidth: selectBtnPick ? 1 : 0,
        backgroundColor: selectBtnPick ? Core.input_view_bg : Core.bright_gray,
        borderRadius: responsive.size(10),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtPick: responsive => ({
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.medium,
        color: Core.white,
    }),

    viewLabel: responsive => ({
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: responsive.size(10),
        borderWidth: 1,
        borderColor: Core.white,
        borderRadius: responsive.size(10)
    }),
    viewEntry: responsive => ({
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: responsive.size(15),
        marginVertical: responsive.size(20),
    }),
    txtMax: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        lineHeight: responsive.size(Fonts.lg_lineheight),
        color: Core.white,
        textAlign: 'center',
    }),
    txtHdrEntry: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
    }),
    txtTeam: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.silver,
    }),
    viewBtn: responsive => ({
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: responsive.size(12)
    }),
    btnYes: (responsive, active) => ({
        alignItems: 'center',
        justifyContent: 'center',
        height: responsive.size(50),
        width: "45%",
        backgroundColor: active ? Core.primaryColor : Core.input_view_bg,
        borderRadius: responsive.size(14),
        borderColor: Core.primaryColor,
        borderWidth: active ? 0 : 1,
        overflow:'hidden'
    }),
    txtBtnYes: (responsive, active) => ({
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        color: active ? Core.black : Core.primaryColor
    }),
    txtHdrDesc: responsive => ({
        marginBottom: responsive.size(10),
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        marginLeft: responsive.size(15)
    }),
    viewDescOuter: responsive => ({
        marginBottom: responsive.size(20),
        minHeight: responsive.size(140),
        width: Constant.FULL_WIDTH - responsive.size(32),
        backgroundColor: Core.bright_gray,
        borderRadius: responsive.size(10),
        alignSelf: 'center',
        overflow: 'hidden',
        paddingVertical: responsive.size(15)
    }),
    viewInnrItm: responsive => ({
        flexDirection: 'row',
        paddingHorizontal: responsive.size(20)
    }),
    txtDesc: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.silver,
        marginLeft: responsive.size(8),
        bottom: responsive.size(2)
    }),
    imgLeftView: {
        position: 'absolute',
        left: 0,
        width: "50%",
        height: '50%',
    },
    imageBlurLeft: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    txtName: responsive => ({
        marginLeft: responsive.size(6),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        color: '#FFF',
        textALign: 'left'
    }),
    viewPopUp: responsive => ({
        width: '100%',
        minHeight: '35%',
        backgroundColor: Core.bright_gray,
        borderWidth: 1,
        borderColor: Core.bright_gray,
        borderTopLeftRadius: responsive.size(40),
        borderTopRightRadius: responsive.size(40),
        overflow:'hidden'
    }),
    txtWarning: responsive => ({
        marginTop: responsive.size(5),
        marginRight: responsive.size(25),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'right',
        color: Core.primaryColor

    }),
    txtCondition: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        marginBottom: responsive.size(25),
        lineHeight: responsive.size(21),
        width: responsive.size(375),
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Fonts.medium,
        color: Core.silver,
    }),
    viewDaily: responsive => ({
        alignItems: 'center',
        height: responsive.size(54),
        borderBottomWidth: 1,
        borderBottomColor: Core.pale_sky,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsive.size(20)
    }),
    viewContestWndw: responsive => ({
        paddingHorizontal: responsive.size(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: responsive.size(58),
        alignItems: 'center',
    }),
    touchSelect: (responsive, selected) => ({
        width: responsive.size(24),
        height: responsive.size(24),
        borderRadius: responsive.size(6),
        backgroundColor: selected ? Core.primaryColor : Core.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Core.primaryColor,
    }),
    txtContstWndow: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: Core.white
    }),
    btnDone: responsive => ({
        width: '15%',
        backgroundColor: Core.primaryColor,
        height: responsive.size(26),
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: responsive.size(8)
    }),
    btnTouchDone: responsive => ({
        marginTop: responsive.size(20),
        alignSelf: 'flex-end',
        marginRight: responsive.size(15),
        height: responsive.size(30),
        backgroundColor: Core.primaryColor,
        width: "15%",
        borderRadius: responsive.size(10),
        justifyContent: 'center',
        alignItems: 'center',
    }),
    btnTxt: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.input_view_bg
    }),
    txtDaily: responsive => ({
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.medium,
        color: Core.white
    }),
    btnShareTouch: (responsive,apiCalling,isValidate) => ({
        marginBottom: responsive.size(30),
        width: responsive.size(apiCalling?48:276),
        height: responsive.size(48),
        borderRadius: responsive.size(apiCalling?24:14),
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: isValidate()?Core.primaryColor:'#999'
    }),
    buttonText: (responsive) => ({
        color: Core.black,
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
    }),
    txtHeaderCode: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        marginBottom: responsive.size(10),
        marginLeft: responsive.size(20)
    }),
    viewContestCode: responsive => ({
        marginBottom: responsive.size(20),
        borderRadius: responsive.size(10),
        alignSelf: 'center',
        backgroundColor: Core.bright_gray,
        height: responsive.size(125),
        width: '92%'
    }),
    viewCode: responsive => ({
        marginLeft: responsive.size(20),
        flexDirection: 'row',
        marginTop: responsive.size(20)
    }),
    imgJoin: responsive => ({
        marginTop: responsive.size(2)
    }),
    txtContestCode: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.white,
        fontFamily: Fonts.regular,
        marginLeft: responsive.size(10)
    }),
    // viewInput: responsive => ({
    //     marginTop: responsive.size(8),
    //     height: responsive.size(49),
    //     width: '90%',
    //     backgroundColor: Core.input_view_bg,
    //     borderRadius: responsive.size(10),
    //     alignSelf: 'center'
    // }),
    txtInput: responsive => ({
        marginLeft: responsive.size(12),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.regular
    }),
    imgBlurLeft: {
        position: 'absolute',
        left: 0,
        height: '100%'
    },
    btnTouchJoin: (responsive,disble,apiCalling) => ({
        height: responsive.size(48),
        width: apiCalling?responsive.size(48):"70%",
        backgroundColor: disble?'#999':Core.primaryColor,
        borderRadius: responsive.size(apiCalling?24:14),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: responsive.size(20)
    }),
    txtBtnJoin: (responsive) => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        color: Core.black,
        textAlign: 'center'
    }),






})

export default styles;
