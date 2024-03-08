import { StyleSheet } from "react-native";
import { Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: responsive => ({
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        borderBottomLeftRadius: responsive.size(20),
        borderBottomRightRadius: responsive.size(20),
        backgroundColor: Core.tuna,
        overflow: 'hidden'
    }),
    mainContainer: responsive => ({
        flex: 1,
        paddingHorizontal: responsive.size(16),
        paddingTop: responsive.size(20)
    }),
    freeBtnTxt: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: '#000'
    }),
    viewHeader:responsive=>({
        marginTop: responsive.size(20), 
        width: '100%', 
        height: responsive.size(37), 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: responsive.size(15)
    }),
    viewBox:responsive=>({
        width:responsive.size(36),
        height:responsive.size(36),
        borderRadius:responsive.size(18),
        backgroundColor:Core.primaryColor
    }),
    itemContainer:(responsive,rowID,arrUsers)=>({
        width:'96%',
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:responsive.size(20),
        borderTopRightRadius:responsive.size(rowID==0?10:0),
        borderTopLeftRadius:responsive.size(rowID==0?10:0),
        borderBottomRightRadius:responsive.size(rowID==arrUsers.length-1?10:0),
        borderBottomLeftRadius:responsive.size(rowID==arrUsers.length-1?10:0),
        height:responsive.size(56),
        borderBottomWidth:1,
        borderBottomColor:'#646872',
        backgroundColor:'rgba(53, 57, 63, 1)'
    }),
    viewItm:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    txtTeam:responsive=>({
        fontSize:responsive.fontSize(Fonts.md),
        fontFamily:Fonts.medium,
        color: Core.primaryColor,
        textAlign:'right'
    }),
    txtUserName:responsive=>({
        marginLeft:responsive.size(7),
        fontSize:responsive.fontSize(Fonts.lg),
        fontFamily:Fonts.semibold,
        color:'#FFF',
        textAlign:'left'
    }),
    touchText: {
        width: '25%',
        height: '100%'
    },
    txtHeaderInfo: (responsive, selectIdx) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: selectIdx == 0 ? Core.primaryColor : Core.alabaster,
        textTransform: 'uppercase'
    }),
    txtHeaderGames: (responsive, selectIdx) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: selectIdx == 1 ? Core.primaryColor : Core.alabaster,
        textTransform: 'uppercase'
    }),
    txtHeaderPrize: (responsive, selectIdx) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: selectIdx == 2 ? Core.primaryColor : Core.alabaster,
        textTransform: 'uppercase'
    }),
    txtHeaderEntry: (responsive, selectIdx) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: selectIdx == 3 ? Core.primaryColor : Core.alabaster,
        textTransform: 'uppercase'
    }),
    viewHeaderEntry: (responsive, selectIdx) => ({
        position: 'absolute',
        bottom: 0, 
        height: responsive.size(4),
        width: '100%',
        borderBottomRightRadius: responsive.size(60),
        borderTopRightRadius: responsive.size(60),
        backgroundColor: selectIdx == 3 ? Core.primaryColor : Core.transparent_white
    }),
    viewHeaderInfo: (responsive, selectIdx) => ({
        position: 'absolute',
        bottom: 0,
        height: responsive.size(4),
        width: '100%',
        borderBottomLeftRadius: responsive.size(60),
        borderTopLeftRadius: responsive.size(60),
        backgroundColor: selectIdx == 0 ? Core.primaryColor : Core.transparent_white
    }),
    viewHeaderGames: (responsive, selectIdx) => ({
        position: 'absolute',
        bottom: 0,
        height: responsive.size(4),
        width: '100%',
        backgroundColor: selectIdx == 1 ? Core.primaryColor : Core.transparent_white
    }),
    viewHeaderPrize: (responsive, selectIdx) => ({
        position: 'absolute',
        bottom: 0,
        height: responsive.size(4),
        width: '100%',
        backgroundColor: selectIdx == 2 ? Core.primaryColor : Core.transparent_white
    }),
    topBtnContainer: responsive => ({
        marginTop: responsive.size(20),
        width: responsive.size(276),
        height: responsive.size(48),
        borderRadius: responsive.size(14),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    viewInfo: responsive => ({
        width: '100%',
        marginBottom: responsive.size(30)
    }),
    txtJoin: responsive => ({
        paddingHorizontal: responsive.size(20),
        marginBottom: responsive.size(10),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.silver
    }),
    viewContestWindow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewDetails: responsive => ({
        width: "30%",
        height: responsive.size(62),
        borderRadius: responsive.size(10),
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden'
    }),
    imgRectangle:{
        position:'absolute',
        width:'100%',
        height:'100%'
    },
    txtWindow: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.primaryColor
    }),
    txtContestWindow: responsive => ({
        marginTop: responsive.size(-4),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: '#FFF'
    }),
    txtContest: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        textALign: 'left',
        marginBottom: responsive.size(4)
    }),
    scrollWindow: responsive => ({
        flex: 1,
        paddingHorizontal: responsive.size(20)
    }),
    viewContestDetails: responsive => ({
        width: '100%',
        height: responsive.size(82),
        borderRadius: responsive.size(10),
        backgroundColor: Core.pale_sky,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsive.size(20)
    }),
    viewWindow: responsive => ({
        width: '100%',
        height: responsive.size(130),
        borderRadius: responsive.size(10),
        backgroundColor: Core.pale_sky,
        overflow: 'hidden',
        justifyContent: 'center',

    }),
    viewWindowContest:(responsive, idx, dataSportsHub)=>({
        marginRight: responsive.size(idx == dataSportsHub.length - 1 ? 40 : 15), 
        paddingHorizontal: responsive.size(15), 
        height: responsive.size(62), 
        borderRadius: responsive.size(10), 
        backgroundColor: Core.tuna_color, 
        alignItems: 'center', 
        justifyContent: 'center'
    }),
    txtName: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.primaryColor
    }),
    txtDesc: responsive => ({
        marginTop: responsive.size(-4),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: '#FFF'
    }),
    viewContestType: responsive => ({
        width: '100%',
        marginBottom: responsive.size(30),
        overflow: 'hidden'
    }),
    viewInner: responsive => ({
        width: '100%',
        marginBottom: responsive.size(20)
    }),
    txtTypeHeader: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: '#FFF'
    }),
    viewTypeHeader: ({
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    viewContest: responsive => ({
        width: '100%',
        borderRadius: responsive.size(10),
        backgroundColor: Core.pale_sky,
        overflow: 'hidden',
        justifyContent: 'center',
        padding: responsive.size(20)
    }),
    txtFormat: responsive => ({
        marginBottom: responsive.size(15),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.silver
    }),
    viewTourney: responsive => ({
        height: responsive.size(20),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: responsive.size(6),
        borderRadius: responsive.size(6),
        backgroundColor: Core.Tourney
    }),
    viewHead: responsive => ({
        height: responsive.size(20),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: responsive.size(6),
        borderRadius: responsive.size(6),
        backgroundColor: Core.H2H
    }),
    viewBrckt: responsive => ({
        height: responsive.size(20),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: responsive.size(6),
        borderRadius: responsive.size(6),
        backgroundColor: Core.Bracket
    }),
    txtBtn: responsive => ({
        fontSize: responsive.fontSize(Fonts.sd),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: '#FFF'
    }),
    txtTypeDesc: responsive => ({
        marginTop: responsive.size(4),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.silver
    }),
    leagueBox: responsive => ({
        height: responsive.size(20),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: responsive.size(6),
        borderRadius: responsive.size(6)
    }),
    txtMode: responsive => ({
        marginBottom: responsive.size(15),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.silver
    }),
    viewContestMode: responsive => ({
        width: '30%',
        height: responsive.size(62),
        borderRadius: responsive.size(10),
        backgroundColor: Core.transparent,
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtSlcton: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.primaryColor
    }),
    txtPick: responsive => ({
        marginTop: responsive.size(-4),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: '#FFF'
    }),
    header_container: responsive => ({
        flex: 1,
        paddingHorizontal: responsive.size(16),
        paddingTop: responsive.size(20)
    }),
    viewGame: responsive => ({
        flex: 1,
        marginBottom: responsive.size(20)
    }),
    txtRound: responsive => ({
        marginBottom: responsive.size(15),
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        textAlign: 'left',
        color: Core.primaryColor
    }),
    viewRound: responsive => ({
        marginBottom: responsive.size(10),
        width: '100%',
        height: responsive.size(76),
        borderRadius: responsive.size(9),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }),
    txtHome: responsive => ({
        fontSize: responsive.fontSize(Fonts.ssd),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: '#fff'
    }),
    txtDateTime: responsive => ({
        fontSize: responsive.fontSize(Fonts.ssd),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.alabaster
    }),
    viewTimeDate: responsive => ({
        width: responsive.size(131),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    viewDateDay: responsive => ({
        marginTop: responsive.size(9),
        width: responsive.size(131),
        height: responsive.size(25),
        borderRadius: responsive.size(53),
        backgroundColor: 'rgba(250, 250, 250, 0.15)',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    viewHome: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    viewEntry: responsive => ({
        flex: 1,
        paddingHorizontal: responsive.size(16),
        paddingTop: responsive.size(20)
    }),
    lineContainer: responsive => ({
        width: '94%',
        height: responsive.size(6),
        borderRadius: responsive.size(60),
        backgroundColor: 'rgba(250, 214, 12, 0.20)',
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    viewPrizeItm: responsive => ({
        width: '94%',
        alignSelf: 'center',
        marginTop: responsive.size(20),
        backgroundColor: 'rgba(53, 57, 63, 1)',
        borderRadius: responsive.size(10),
        overflow: 'hidden'
    }),
    imageBlurLeft: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    viewPrize: responsive => ({
        paddingHorizontal: responsive.size(20),
        width: '100%',
        height: responsive.size(44),
        borderBottomWidth: 1,
        borderBottomColor: Core.shuttle_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    txtPrize: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Core.silver
    }),
    viewPrizeType: responsive => ({
        paddingHorizontal: responsive.size(20),
        width: '100%',
        height: responsive.size(52),
        borderBottomWidth: 1,
        borderBottomColor: Core.shuttle_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtRank: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: '#FFF',
        width:'45%'
    }),
    viewMinMax: responsive => ({
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
    textMin: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: '#919DB1',
        textAlign: 'right',
        fontFamily: Fonts.regular,
        textTransform: 'uppercase'
    }),

})
export default styles
