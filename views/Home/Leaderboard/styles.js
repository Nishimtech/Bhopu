import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    inactiveImage: {
        position: 'absolute',
        opacity: 1,
        width: '100%',
        height: '100%'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
       
    },
    imgProfile:responsive=>(
        {
            marginTop: '10%',
            width: '80%',
            height: '80%',
            borderRadius:responsive.size(150)
        }
    ) ,
    headerCartView: responsive => ({
        width: responsive.width(90),
        height: responsive.size(55),
        overflow: 'hidden',
        backgroundColor: Core.input_view_bg,
        borderRadius: responsive.size(10),
        borderLeftWidth: responsive.size(1.5),
        borderColor:Core.primaryColor,
        marginHorizontal: responsive.width(5),
        paddingHorizontal: responsive.size(20),
        marginBottom:responsive.size(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    headerBackImage: responsive => ({
        zIndex: 0,
        paddingTop: responsive.size(10),
        overflow: 'hidden',
        width: responsive.width(94),
        minHeight: responsive.size(216),
        borderRadius: responsive.size(10),
    }),
    headerSparkImage: responsive => ({
        zIndex: 0,
        paddingTop: responsive.size(10),
        overflow: 'hidden',
        position: 'absolute',
        left: responsive.size(21),
        bottom: responsive.size(103),
    }),
    headerContentView: responsive => ({
        borderRadius: responsive.size(10),
        position: 'absolute',
        width: responsive.width(100),
        minHeight: responsive.size(216),
        zIndex: 1
    }),
    lineContainer: responsive => ({
        width: '86%',
        height: responsive.size(6),
        borderRadius: responsive.size(60),
        backgroundColor: 'rgba(250, 214, 12, 0.20)',
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    listContentView: responsive => ({
        position: 'absolute',
        width: responsive.width(45),
        height: responsive.width(43),
        zIndex: 1,
        paddingVertical: responsive.size(6),
    }),
txtHeader:responsive=>({
        fontSize: responsive.size(Fonts.xl),
        fontFamily: Fonts.semibold,
        color: Core.white,
    }),
viewLive:responsive=>({
    backgroundColor: '#FA0C45',
    borderRadius: responsive.size(20),
    width: responsive.size(58),
    height: responsive.size(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    }),
    txtStar:responsive=>({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.semibold,
        color: Core.white,
        bottom: responsive.size(5),
    }),
    txtLive: responsive => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.semibold,
        color: Core.white,
        lineHeight: responsive.size(19.5),
    }),
    viewHeaderBig: responsive => ({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}),
   
    viewTopRank: responsive => ({
        position: 'absolute',
        width: responsive.size(30),
        height: responsive.size(30),
        backgroundColor: Core.primaryColor,
        borderRadius: responsive.size(30),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        top: responsive.size(-15),
    }),
    txtRank: responsive => ({
        fontSize: responsive.size(Fonts.xl),
        fontFamily: Fonts.semibold,
        color: Core.black,
    }),
    imgUserPoly: responsive => ({
        width: responsive.size(130),
        height: responsive.size(127),
        zIndex: 1,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    }),
    txtUserName: responsive => ({
        fontSize: responsive.size(Fonts.lg),
        fontFamily: Fonts.semibold,
        color: Core.white,
        marginTop:responsive.size(4)
    }),
    txtUserPoints: responsive => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.semibold,
        color: Core.silver,
    }),
    txtPrice: responsive => ({
        fontSize: responsive.size(Fonts.xl),
        fontFamily: Fonts.bold,
        color: Core.primaryColor,
    }),
    imgCup1: responsive => ({
        transform: [{ rotate: '345 deg' }],
        margin: responsive.width(10),
    }),
    imgCup2: responsive => ({
        transform: [{ rotate: '35 deg' }],
        margin: responsive.width(10),
        width: responsive.size(60),
        height: responsive.size(60)
    }),
    viewListHeader: responsive => ({
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center',
         marginTop: responsive.size(20),
        marginHorizontal: responsive.size(15),
    }),
    txtRankListHeader: responsive => ({
        flex: .21,
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        textAlign: 'center'
    }),
    txtUserListHeader: responsive => ({
        flex: .58,
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        paddingLeft: responsive.size(75),
    }),
    txtPriceListHeader: responsive => ({
        flex: .21,
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        paddingLeft: responsive.size(10),
    }),
    viewList: responsive => ({
        alignItems: 'center',
        marginVertical: responsive.size(5),
        borderRadius: responsive.size(15),
    }),
    imgListBack: (responsive, rowId) => ([{
        width: responsive.width(94),
        height: responsive.size(70),
        borderRadius: responsive.size(15),
        zIndex: 0,
    }, !rowId  && { tintColor: Core.bright_gray, backgroundColor: Core.bright_gray }]),
    viewListItem: (responsive) => ({
        width: responsive.width(94),
        height: responsive.size(70),
        borderRadius: responsive.size(15),
        position: 'absolute',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    }),
    viewRankItem: (responsive) => ({
        width: responsive.size(40),
        height: responsive.size(40),
        borderRadius: responsive.size(40),
        backgroundColor: 'rgba(250,214,12,0.32)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }),
    txtRankItem: (responsive) => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.regular,
    }),
    viewUserItem: (responsive) => ({
        flex: 0.55,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsive.size(20),
    }),
    txtUserNameListItem: (responsive) => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.medium,
    }),
    txtPointsListItem: (responsive) => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
    }),
    viewPriceList: (responsive) => ({
        flex: 0.2,
        marginRight: responsive.size(-30),
        backgroundColor: Core.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsive.size(10),
        paddingVertical: responsive.size(4),
    }),
    txtPriceList: (responsive) => ({
        color: Core.black,
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.bold,
    }),
})
export default styles
