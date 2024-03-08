import { Platform, StatusBar, StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../../../Helper";
const styles = StyleSheet.create({
    main_container: opacityAnim => ({
        opacity: opacityAnim,
        width: Constant.FULL_WIDTH,
        height: '100%',
        overflow:'hidden'
    }),
    wrapper: {
        flex: 1
    },
    sapretor: responsive => ({
        width: '100%',
        height: responsive.size(20)
    }),
    footer: responsive => ({
        width: '100%',
        height: responsive.size(120)
    }),
    headerContainer: responsive => ({
        width: Constant.FULL_WIDTH - responsive.size(32),
        height: responsive.size(44),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    viewCreateContest: {
        width: '61%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewPrivateContest: responsive => ({
        width: '100%',
        height: '100%',
        borderRadius: responsive.size(14),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtCreateContest: responsive => ({
        fontFamily: Fonts.semibold,
        fontSize: responsive.fontSize(Fonts.xxl),
        textAlign: 'center',
        color: Core.input_view_bg
    }),
    viewGetCode: responsive => ({
        width: '35%',
        height: '100%',
        borderRadius: responsive.size(14),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Core.primaryColor
    }),
    txtgetCode: responsive => ({
        fontFamily: Fonts.semibold,
        fontSize: responsive.fontSize(Fonts.xxl),
        textAlign: 'center',
        color: Core.primaryColor
    }),
    sectionContainer: responsive => ({
        width: Constant.FULL_WIDTH - responsive.size(32),
        height: responsive.size(70),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    txtSelectedLeague: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        textAlign: 'left',
        color: Core.alabaster
    }),
    sectionRightView:rightAnim=>({
        flexDirection: 'row',
        alignItems: 'center',
        opacity:rightAnim
    }),
    btnHowToPlay: responsive => ({
        flexDirection: 'row',
        marginRight: responsive.size(19),
        alignItems: 'center'
    }),
    imgQuestion: responsive => ({
        width: responsive.size(16),
        height: responsive.size(16),
        marginRight: responsive.size(3)
    }),
    txtHTP: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.primaryColor
    }),
    listContainer: responsive => ({
        width: Constant.FULL_WIDTH - responsive.size(32),
        borderRadius: responsive.size(12),
        alignSelf: 'center',
        height:'auto',
        overflow: 'hidden'
    }),
    viewList: {
       flex:1
    },
    txtTotalEntryShmr: responsive => ({
        height: responsive.size(12),
        width: responsive.size(90),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    txtMinShmr: responsive => ({
        height: responsive.size(12),
        width: responsive.size(50),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    btnShimmerTurny: responsive => ({
        height: responsive.size(20),
        width: responsive.size(70),
        alignSelf: 'center',
        borderRadius: responsive.size(6),
        overflow: 'hidden',
    }),
    txtShimer: responsive => ({
        marginLeft: responsive.size(10),
        height: responsive.size(16),
        width: responsive.size(200),
        borderRadius: responsive.size(6),
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    viewHeaderBox: responsive => ({
        marginTop: responsive.size(10),
        height: responsive.size(40),
        width: '94%',
        borderRadius: responsive.size(8),
        backgroundColor: Core.input_view_bg,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsive.size(10)
    }),
    labelView: (responsive, group_name) => ({
        height: responsive.size(20),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: responsive.fontSize(6),
        borderRadius: responsive.size(6),
        backgroundColor: Core[group_name]
    }),

    txtName: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        lineHeight:responsive.fontSize(Fonts.md_lineheight),
        color: '#fff',
        textAlign: 'center',
        fontFamily: Fonts.semibold
    }),
    txtContestTitle: responsive => ({
        marginLeft: responsive.size(10),
        fontSize: responsive.fontSize(Fonts.xl),
        color: '#fff',
        textAlign: 'left',
        fontFamily: Fonts.bold
    }),
    viewPrizeDate: responsive => ({
        marginTop: responsive.size(8),
        marginBottom: responsive.size(10),
        width: '94%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    viewPrize: {
        alignItems: "flex-start"
    },
    txtTotal: responsive => ({
        fontSize: responsive.fontSize(Fonts.h6),
        color: Core.primaryColor,
        textAlign: 'left',
        fontFamily: Fonts.semibold
    }),
    txtPrize: responsive => ({
        marginTop: responsive.size(-6),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.silver,
        textAlign: 'left',
        fontFamily: Fonts.regular
    }),
    txtPrizeShimer: responsive => ({
        height: responsive.size(22),
        width: responsive.size(70),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    txtDateShimer: responsive => ({
        marginTop: responsive.size(4),
        height: responsive.size(12),
        width: responsive.size(50),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    txtTimer: responsive => ({
        marginTop: responsive.size(-4),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.silver,
        textAlign: 'right',
        fontFamily: Fonts.regular
    }),
    viewTimer: {
        alignItems: "flex-end"
    },
    lineContainer: responsive => ({
        width: '94%',
        height: responsive.size(6),
        borderRadius: responsive.size(60),
        backgroundColor: 'rgba(250, 214, 12, 0.20)',
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    lineContainer1: responsive => ({
        width: '94%',
        height: responsive.size(6),
        borderRadius: responsive.size(60),
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    viewEntryMin: responsive => ({
        marginTop: responsive.size(5),
        marginBottom: responsive.size(10),
        width: '94%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    txtTotalEntry: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: '#fff',
        textAlign: 'left',
        fontFamily: Fonts.regular
    }),
    txtMin: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.silver,
        textAlign: 'right',
        fontFamily: Fonts.regular
    }),
    viewBtmItm: responsive => ({
        height: responsive.size(48),
        width: '100%',
        paddingHorizontal: responsive.size(10),
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Core.nevada
    }),
    viewBtm: {
        width:'65%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        overflow:'hidden'
        
    },
    imgShmr: responsive => ({
        height: responsive.size(16),
        width: responsive.size(16),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    txtAmntShmr: (responsive) => ({
        marginLeft: responsive.size(6),
        height: responsive.size(12),
        width: responsive.size(40),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    viewCircleShmr:responsive=>({
        marginLeft: responsive.size(10), 
        height: responsive.fontSize(18), 
        width: responsive.fontSize(18), 
        borderRadius: responsive.fontSize(9), 
        overflow: 'hidden'
    }),
    txtCircleShmr:responsive=>({
        marginLeft: responsive.size(10), 
        height: responsive.fontSize(24), 
        width: responsive.fontSize(24), 
        borderRadius: responsive.fontSize(6), 
        overflow: 'hidden'
    }),
    viewM: responsive => ({
        marginLeft: responsive.size(Platform.OS=='ios'?6:8),
        marginTop:responsive.size(-7),
        width: responsive.size(18),
        height: responsive.size(18),
        borderRadius: responsive.size(9),
        backgroundColor: 'rgba(250, 250, 250, 0.15)',
        alignItems:'center',justifyContent:'center',
        borderWidth: 0.5,
        borderColor: Core.primaryColor
    }),
    txtM: responsive => ({
        fontSize: responsive.size(Fonts.md),
        lineHeight: responsive.size(Fonts.md_lineheight),
        color: Core.primaryColor,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    txtToolTip: responsive => ({
        fontSize: responsive.size(Fonts.xl),
        lineHeight: responsive.size(Fonts.xl_lineheight),
        color: Core.black,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    viewShmrPick: responsive => ({
        borderWidth: 1,
        borderColor: Core.silver,
        marginLeft: responsive.size(12),
        paddingHorizontal: responsive.size(10),
        height: responsive.size(24),
        borderRadius: responsive.size(8),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    imgTrophy: responsive => ({
        width: responsive.size(16),
        height: responsive.size(16)
    }),
    txtAmount: responsive => ({
        marginLeft: responsive.size(6),
        marginRight: responsive.size(Platform.OS=='ios'?8:10),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.primaryColor,
        textAlign: 'left',
        fontFamily: Fonts.medium
    }),
    viewPick: responsive => ({
        borderWidth: 1,
        borderColor: Core.silver,
        paddingHorizontal: responsive.size(8),
        height: responsive.size(24),
        borderRadius: responsive.size(8),
        alignItems: 'center',
        justifyContent: 'center'
    }),
   
    shimmer: responsive => ({
        height: responsive.size(12),
        width: responsive.size(40),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),

    txtPick: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        marginTop:responsive.size(Platform.OS=='ios'?0:-2),
        color: '#FFF',
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    imgShare: responsive => ({
        marginLeft: responsive.size(Platform.OS=='ios'?6:8),
        width: responsive.size(24),
        height: responsive.size(24)
    }),
   
    txtEntry: responsive => ({
        marginRight: responsive.size(10),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.silver,
        textAlign: 'right',
        fontFamily: Fonts.medium
    }),
    txtEntryShmr:responsive=>({
        marginRight: responsive.size(10), 
        height: responsive.size(12), 
        width: responsive.size(40), 
        borderRadius: responsive.size(9), 
        overflow: 'hidden'
    }),
    viewEntry: {
        width:'35%',
        height: '100%',
        alignItems: 'center',
        justifyContent:'flex-end',
        flexDirection: 'row',
    },
    txtFree: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        lineHeight: responsive.fontSize(Fonts.lg_lineheight),
        color: Core.input_view_bg,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    btnFreeShmr:responsive=>({
        height: responsive.size(24), 
        width: responsive.size(60), 
        borderRadius: responsive.size(10), 
        overflow: 'hidden'
    }),
    viewFree: responsive => ({
        paddingHorizontal: responsive.size(16),
        height: responsive.size(24),
        borderRadius: responsive.size(10),
        alignItems: 'center',
        justifyContent: 'center'
    }),
   

})
export default styles
