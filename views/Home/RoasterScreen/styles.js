import { Platform, StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    inactiveImage: {
        position: 'absolute',
        opacity: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: responsive => ({
        zIndex: 1,
        paddingTop: responsive.size(10),
        flex: 1
    }),
    headerContainer: responsive => ({
        paddingHorizontal: responsive.size(16),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    txtHeader: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        textAlign: 'left',
        color: Core.white,
        fontFamily: Fonts.medium
    }),
    txtTime: responsive => ({
        marginTop: responsive.fontSize(-2),
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'left',
        color: Core.white,
        fontFamily: Fonts.regular
    }),
    viewSports: responsive => ({
        paddingHorizontal: responsive.size(12),
        height: responsive.size(20),
        borderRadius: responsive.size(40),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtSports: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        lineHeight: responsive.fontSize(Fonts.md_lineheight),
        textAlign: 'center',
        color: Core.primaryColor,
        fontFamily: Fonts.regular
    }),
    viewTeam: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollStyle: responsive => ({
        marginTop: responsive.size(12),
        paddingHorizontal: responsive.size(16),
        width: '100%',
        height: responsive.size(94)
    }),
    viewOuter: (responsive, idx,is_active) => ({
        marginRight: responsive.size(idx == 3 ? 32 : 10),
        width: responsive.fontSize(116),
        height: '100%',
        borderRadius: responsive.size(10),
        overflow: 'hidden',
        borderWidth:1,
        borderColor:is_active? Core.primaryColor:Core.transparent,
    }),
    txtFanPts: responsive => ({
        fontSize: responsive.fontSize(Fonts.sd),
        textAlign: 'center',
        color: '#FFF',
        fontFamily: Fonts.medium
    }),
    scrollTab: responsive => ({
        width: '100%',
        height: responsive.fontSize(30)
    }),
    touchItm: {
        width: Constant.FULL_WIDTH / 6,
        height: '100%',
        alignItems: 'center'
    },
    txtPosition: (responsive, selectPosition, item) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        lineHeight: responsive.fontSize(Fonts.lg_lineheight),
        textAlign: 'center',
        color: selectPosition == item.position ? '#FAD60C' : '#FFF',
        fontFamily: Fonts.medium
    }),
    viewPosition: (responsive, selectPosition, item) => ({
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        height: responsive.size(4), 
        backgroundColor: selectPosition == item.position ? '#FAD60C' : 'rgba(255, 255, 255, 0.08)'
    }),
    behindContainer: responsive => ({
        flex: 1,
        paddingVertical: responsive.size(20),
        overflow:'hidden'
    }),
    imgLeftView: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    },
    viewSearch: (responsive, heightAnim) => ({
        alignSelf: 'center',
        width: Constant.FULL_WIDTH - responsive.size(32),
        height: heightAnim,
        borderRadius: responsive.size(10),
        backgroundColor: Core.tuna_color,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    }),
    viewPlayer: (responsive, topAnim)=>({
        overflow: 'hidden', 
        marginTop: topAnim, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginBottom: responsive.size(10), 
        paddingHorizontal: responsive.size(16)
    }),
    txtPlyr: (responsive) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        textAlign: 'left',
        color: Core.primaryColor,
        fontFamily: Fonts.medium
    }),
    viewBtn: (responsive) => ({
        zIndex: -10,
        flexWrap: 'wrap',
        marginTop: responsive.size(16),
        paddingLeft: '2.1%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        paddingBottom:responsive.size(300),
    }),
    numBox: (responsive,player_selected,type) => ({
        marginTop: responsive.size(3),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(10),
        paddingHorizontal: responsive.size(4),
        minWidth: responsive.size(37),
        height: responsive.size(27),
        borderWidth: 1,
        borderColor: (player_selected && player_selected.type == type)?'#FAD60C':'rgba(255, 255, 255, 0.10)',
        backgroundColor: 'rgba(250, 250, 250, 0.15)'
    }),
    viewTeamOuter: {
        marginTop: '2%',
        width: '100%',
        height: '82%',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    viewTeamInner: {
        marginLeft: '2%',
        marginRight: '2%',
        width: '34%',
        height: '99%',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex:100,
    },
    viewInnerTeam: responsive => ({
        width: '100%',
        height: responsive.size(58),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsive.size(6),
        alignItems: 'center'
    }),
    viewImg: responsive => ({
        width: responsive.size(26),
        height: responsive.size(26),
        borderRadius: responsive.size(13),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtTeam: responsive => ({
        letterSpacing: 0.2,
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'left',
        color: '#FFF',
        fontFamily: Fonts.regular
    }),
    viewDate: responsive => ({
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '94%',
        height: responsive.size(28),
        backgroundColor: '#6B727B',
        borderRadius: responsive.size(54)
    }),
    txtDateTime: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        marginHorizontal:responsive.size(3),
        color: '#FFF',
        fontFamily: Fonts.medium
    }),
    viewNum: responsive => ({
        marginVertical: responsive.fontSize(20),
        width: '100%',
        height: responsive.size(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }),
    viewNumList: (responsive,length) => ({
        width: Constant.FULL_WIDTH/length-responsive.size(10),
        height: '100%',
        borderRadius: responsive.size(12),
        alignItems: 'center',
        justifyContent: 'center',
    }),
    txtNum: (responsive, is_selected) => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        lineHeight: responsive.fontSize(Fonts.xxl_lineheight),
        textAlign: 'center',
        color: is_selected ? '#292D32' : '#FFF',
        fontFamily: Fonts.medium
    }),
    viewTeamData: responsive => ({
        flex: 1,
        paddingTop: responsive.size(6)
    }),
    txtPts: (responsive,player_selected,type) => ({
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: (player_selected && player_selected.type == type)?'#F4D50D':'#FFF',
        fontFamily: Fonts.medium
    }),
    txtOver: (responsive,player_selected,type) => ({
        marginTop: responsive.size(2),
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: (player_selected && player_selected.type == type)?'#F4D50D':'rgba(255, 255, 255, 0.90)',
        fontFamily: Fonts.medium
    }),
    txtLabelView: (responsive) => ({
        marginBottom: responsive.size(2),
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.90)',
        fontFamily: Fonts.medium
    }),
    viewMax: (responsive,selected=false) => ({
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(10),
        paddingHorizontal: responsive.size(4),
        width: responsive.size(60),
        height: responsive.size(35),
        borderWidth: selected?0:1,
        borderColor: 'rgba(255, 255, 255, 0.10)',
        backgroundColor:'rgba(250, 250, 250, 0.15)'
    }),
    txtMax: responsive => ({
        fontSize: responsive.fontSize(Fonts.sd),
        textAlign: 'center',
        color: '#FFF',
        fontFamily: Fonts.medium
    }),
    insideContainer: responsive => ({
        flex: 1,
        paddingTop: responsive.size(18),
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex:10,
    }),
    txtName: responsive => ({
        fontSize: responsive.fontSize(Fonts.xl),
        textAlign: 'center',
        color: '#FFF',
        fontFamily: Fonts.semibold,
        width:Constant.FULL_WIDTH / 2.3,
    }),
    txtTeam: responsive => ({
        marginTop: responsive.size(-2),
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.60)',
        fontFamily: Fonts.medium
    }),
    txtPoint: (responsive,player_selected) => ({
        fontSize: responsive.fontSize(Fonts.xxxl),
        textAlign: 'center',
        color: player_selected?'#F4D50D':'#FFF',
        fontFamily: Fonts.semibold
    }),
    image: responsive => ({
        width: responsive.size(75),
        height: responsive.size(53),
        alignSelf:'center'
    }),
    viewBtm: {
        width: '100%',
        height: '14%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewBtmBtn: (bottomAnim, heightAnim) => ({
        width: '100%',
        height: heightAnim,
        marginBottom: bottomAnim,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'hidden'
    }),
    itmContainer: {
        width: '55%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    itemTxt: (responsive,player_selected,selected) => ({
        marginRight: responsive.size(2),
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: player_selected?'#F4D50D':selected?'white':'rgba(255, 255, 255, 0.60)',
        fontFamily: Fonts.medium
    }),
    viewTopSports: responsive => ({
        position: 'absolute',
        top: responsive.size(-10),
        alignSelf: 'center',
        width: responsive.size(38),
        height: responsive.fontSize(20),
        borderRadius: responsive.size(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A3F45',
        borderWidth: 1,
        borderColor: '#6A6F76'
    }),
    imgClose:responsive=>({
        width: responsive.fontSize(16), 
        height: responsive.fontSize(16), 
        borderRadius: responsive.fontSize(6)
    }),
    touch_player_selected:responsive=>({
        position: 'absolute', 
        top: responsive.fontSize(-11), 
        right: responsive.fontSize(-6), 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: responsive.fontSize(22), 
        height: responsive.fontSize(22), 
        borderRadius: responsive.fontSize(11), 
        backgroundColor: '#3A3F49', 
        borderWidth: 1, 
        borderColor: '#6B727B'
    }),
    viewExpand:responsive=>({
        position: 'absolute', 
        paddingHorizontal: responsive.size(13), 
        paddingVertical: responsive.size(10), 
        borderRadius: responsive.size(10), 
        borderWidth: 1, 
        borderColor: 'rgba(250, 214, 12, 0.50)', 
        top: '100%', 
        width: '100%', 
        overflow:'hidden',
    }),
    txtExpand:(responsive, childItem,propsItem) =>({
        fontSize: responsive.fontSize(12), 
        textAlign: 'left', 
        fontFamily: 'Saira-Medium', 
        color: childItem.prop_id == propsItem.prop_id ? '#FAD60C' : '#FFF'
    }),
    txtExpandPts:(responsive, childItem,propsItem) =>({
        fontSize: responsive.fontSize(12), 
        textAlign: 'right', 
        fontFamily: 'Saira-Bold', 
        color: childItem.prop_id == propsItem.prop_id ? '#FAD60C' : '#FFF'
    }),
    txtTopSports: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        color: Core.primaryColor,
        fontFamily: Fonts.semibold
    }),
    btnPreview: (responsive,is_disable) => ({
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(14),
        width: '46%', height: responsive.size(48),
        borderWidth: 1,
        borderColor: is_disable?Core.light_gray:Core.primaryColor,
        overflow: 'hidden'
    }),
    txtPreviewBtn: (responsive,is_disable) => ({
        fontSize: responsive.fontSize(Fonts.xl),
        textAlign: 'center',
        color: is_disable?Core.light_gray:Core.primaryColor,
        fontFamily: Fonts.semibold,
    }),
    viewNext: responsive => ({
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(14),
        width: '46%',
        height: responsive.size(48),
        overflow: 'hidden'
    }),
    viewGradientNext: responsive => ({
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(14),
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }),
    txtNextBtn: (responsive,is_disable) => ({
        fontSize: responsive.fontSize(Fonts.xl),
        textAlign: 'center',
        color: Core.input_view_bg,
        fontFamily: Fonts.semibold
    })

})
export default styles
