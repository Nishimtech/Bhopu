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
    headerCartView: responsive => ({
        width: '100%',
        minHeight: responsive.size(230),
        overflow: 'hidden',
        alignSelf: 'center'
    }),
    headerBackImage: (responsive) => ({
        zIndex: 0,
        overflow: 'hidden',
        width: responsive.width(94),
        height: responsive.size(230),
        borderRadius: responsive.size(10),
        alignSelf: 'center'
    }),
    headerSparkImage: responsive => ({
        zIndex: 0,
        paddingTop: responsive.size(10),
        overflow: 'hidden',
        position: 'absolute',
        left: responsive.size(21),
        bottom: responsive.size(103),
    }),
    headerContentView: (responsive) => ({
        borderRadius: responsive.size(10),
        position: 'absolute',
        width: '100%',
        minHeight: responsive.size(230),
        zIndex: 1,
        justifyContent: 'center'
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
        height: '100%',
        zIndex: 1,
        paddingVertical: responsive.size(6),
    }),
    viewHeaderCart: responsive => ({
        backgroundColor: '#292D32',
        paddingHorizontal: responsive.size(12),
        paddingVertical: responsive.size(7),
        borderRadius: responsive.size(10),
        marginHorizontal: responsive.size(5),
        opacity: 1,
        marginVertical: responsive.size(5),
    }),
    txtHeaderCart: responsive => ({
        color: Core.white,
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.semibold,
    }),
    viewCartContainer: responsive => ({
        flexDirection: 'row',
        paddingHorizontal: responsive.size(10),
        marginTop: responsive.size(8),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    viewCart1: (responsive, isRight) => ({
        flexDirection: 'row',
        paddingLeft: isRight ? responsive.size(10) : responsive.size(1),
        paddingRight: isRight ? responsive.size(1) : responsive.size(10),
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
    txtCartScore: responsive => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.h6),
        fontFamily: Fonts.bold,
        textAlign: 'right'
    }),
    txtWinner: (responsive, isRight) => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        textAlignVertical: 'top',
        alignSelf: 'flex-start',
        marginTop: responsive.size(5)
    }),
    txtCartScore2: responsive => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.h6),
        fontFamily: Fonts.bold,
        textAlign: 'left'
    }),
    txtCartPoints: responsive => ({
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.sd),
        fontFamily: Fonts.regular,
        textAlign: 'right'
    }),
    txtCartPoints2: responsive => ({
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.sd),
        fontFamily: Fonts.regular,
        textAlign: 'left'
    }),
    txtCartPersonName1: responsive => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.semibold,
    }),
    txtCartPersonName2: responsive => ({
        color: Core.white,
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.semibold,
        textAlign: 'right'
    }),
    txtCartPrice1: responsive => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular
    }),
    txtCartPrice2: responsive => ({
        color: Core.primaryColor,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        textAlign: 'right'
    }),
    progressBar: (progress, widthAnim) => ({ width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${progress}%`], }), height: '100%', backgroundColor: Core.primaryColor }),
    viewFooterCart: responsive => ({
        flexDirection: 'row',
        paddingHorizontal: responsive.size(15),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsive.size(8),
    }),
    txtCartStatus1: responsive => ({
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular
    }),
    txtCartResult1: responsive => ({
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.regular,
        right: responsive.size(5),
    }),
    viewCartCenterLine: responsive => ({
        backgroundColor: Core.black,
        width: responsive.size(1),
        height: responsive.size(140)
    }),
    viewPriceCart: (responsive, isRight = false) => ({
        backgroundColor: Core.primaryColor,
        borderRadius: responsive.size(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsive.size(5),
        width: responsive.width(30),
        alignSelf: isRight ? 'flex-end' : 'flex-start'
    }),
    txtPriceCart: responsive => ({
        color: Core.black,
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.semibold,
    }),
    viewCartVS: responsive => ({
        backgroundColor: Core.primaryColor,
        borderRadius: responsive.size(30),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        width: responsive.size(30),
        height: responsive.size(30),
        alignSelf: 'center',
        marginVertical: responsive.size(75),
    }),
    txtCartVS: responsive => ({
        color: Core.black,
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.bold,
    }),
    txtMatchup: responsive => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.white,
        marginLeft: responsive.size(15)
    }),
    viewListContainer: responsive => ({
        width: '100%',
        height: responsive.height(22),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsive.size(5),
        marginVertical: responsive.size(5),

    }),
    imgListContainer: responsive => ({
        width: responsive.width(46),
        height: '100%',
        resizeMode: 'stretch',

    }),
    imgProfileList: responsive => ({
        width: responsive.size(60),
        height: responsive.size(45),
        resizeMode: 'stretch'
    }),
    imgProfileList2: responsive => ({
        width: responsive.size(50),
        height: responsive.size(40),
        resizeMode: 'stretch'
    }),
    viewListMain: responsive => ({
        padding: responsive.size(4),
        position: 'absolute',
        zIndex: 1,
        top: responsive.size(-4),
        left: responsive.size(2),
        backgroundColor: '#3A3F49',
        borderColor: '#6A6F76',
        borderWidth: responsive.size(1),
        borderRadius: responsive.size(30),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    imgLock: responsive => ({
        width: responsive.size(12),
        height: responsive.size(12),
        resizeMode: 'contain',
    }),
    viewPG2: (responsive, rowId) => ({
        backgroundColor: '#3A3F49',
        borderColor: '#6A6F76',
        borderWidth: responsive.size(1),
        borderRadius: responsive.size(30),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: responsive.size(30),
        height: responsive.size(20),
        right: responsive.size(50)
    }),
    viewPG: (responsive, rowId) => ({
        backgroundColor: '#3A3F49',
        borderColor: '#6A6F76',
        borderWidth: responsive.size(1), borderRadius: responsive.size(30),
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
        width: responsive.size(30),
        height: responsive.size(20),
        left: responsive.size(50)
    }),
    txtPG: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        textAlign: 'center'
    }),
    txtItemName: (responsive, rowId) => ({
        paddingTop: responsive.size(3),
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
        textAlign: rowId % 2 == 0 ? 'left' : 'right'
    }),
    txtItemTopScore: (responsive,isTrue) => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.bold,
        color: isTrue ? Core.primaryColor : '#898989',
        textAlign: 'right'
    }),
    txtItemPoints: (responsive, rowId) => ({
        fontSize: responsive.size(Fonts.sd),
        fontFamily: Fonts.regular,
        color: Core.silver,
        textAlign: rowId % 2 != 0 ? 'right' : 'left'
    }),
    viewListCenter: (responsive, rowId) => ({
        position: 'absolute',
        bottom: responsive.height(4.2),
        flexDirection: rowId % 2 != 0 ? 'row-reverse' : 'row',
        paddingLeft: responsive.size(rowId % 2 != 0 ? 0 : 1),
        paddingRight: responsive.size(rowId % 2 != 0 ? 1 : 0),
        justifyContent: 'space-between',
        alignSelf: 'center',
    }),
    viewListCenter2: (responsive, rowId) => ({
        flexDirection: rowId % 2 != 0 ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: responsive.size(6),
        paddingBottom:responsive.size(4),
    }),
    view1List: (responsive) => ({
        borderRadius: responsive.size(9.5),
        borderWidth: responsive.size(1),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: '#6A6F76',
        flex: 0.32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsive.size(6),
    }),
    txtBoxTop: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.white,
        lineHeight: responsive.size(16),
    }),
    txtBoxBottom: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.regular,
        color: Core.white,
        lineHeight: responsive.size(14),
    }),
    viewLiveParant: {
        flex: 0.32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLive: (responsive, isLiveExist) => ({
        backgroundColor: isLiveExist ? '#FA0C45' : '#919DB1',
        borderRadius: responsive.size(20),
        width: responsive.size(48),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    txtStar: (responsive) => ({
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
        bottom: responsive.size(3),
    }),
    txtLive: (responsive) => ({
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
    }),
    txtBottomScore1: (responsive) => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.bold,
        color: Core.white,
    }),
    viewBox2: (responsive) => ({
        borderRadius: responsive.size(9.5),
        borderWidth: responsive.size(1),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: '#6A6F76',
        flex: 0.32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsive.size(6),
    }),
    viewItemBottom: (responsive) => ({
        position: 'absolute',
        bottom: responsive.height(.6),
        alignSelf: 'center',
        width: responsive.size(130),
    }),
    txtItemBottom: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.regular,
        color: Core.primaryColor,
        textAlign: 'center'
    }),
    viewBottomListContainer: (responsive, isLiveExist) => ({
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: responsive.size(1),
        borderColor: isLiveExist ? "rgba(250, 214, 12, 0.50)" : '#6A6F76',
        borderRadius: responsive.size(10),
        alignSelf: 'center',
        marginVertical: responsive.size(10),
        opacity: 0.7
    }),
    viewBottomPG: (responsive) => ({
        backgroundColor: '#3A3F49',
        borderColor: '#6A6F76',
        borderWidth: responsive.size(1),
        borderRadius: responsive.size(30),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: responsive.size(30),
        height: responsive.size(20),
        alignSelf: 'center',
        top: responsive.size(-10),
    }),
    txtBottomPG: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        textAlign: 'center'
    }),
    viewBottomP1: (responsive) => ({
        width: responsive.size(30),
        height: responsive.size(30),
        position: 'absolute',
        zIndex: 1,
        top: responsive.size(-10),
        left: responsive.size(-10),
        backgroundColor: Core.primaryColor,
        borderColor: '#6A6F76',
        borderWidth: responsive.size(1),
        borderRadius: responsive.size(30),
        alignItems: 'center',
        justifyContent: 'center',
    }),
    txtBottomP1: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.medium,
        color: Core.black,
    }),
    txtBottomScore: (responsive, isTrue) => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.bold,
        color: isTrue ? Core.primaryColor : '#898989',
        textAlign: 'right',
        textAlignVertical: 'bottom',
    }),
    txtBottomName: (responsive) => ({
        paddingTop: responsive.size(1),
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
        textAlign: 'left'
    }),
    txtBottomPoints: (responsive) => ({
        fontSize: responsive.size(Fonts.sd),
        fontFamily: Fonts.regular,
        color: Core.silver,
        textAlign: 'left'
    }),
    viewLiveBottom: (responsive, isLiveExist) => ({
        backgroundColor: isLiveExist ? '#FA0C45' : '#919DB1',
        borderRadius: responsive.size(20),
        width: responsive.size(48),
        height: responsive.size(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginVertical: 2
    }),
    txtBottomStar: (responsive) => ({
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
        bottom: responsive.size(5),
    }),
    txtBottomLive: (responsive) => ({
        fontSize: responsive.size(Fonts.ssd),
        fontFamily: Fonts.semibold,
        color: Core.white,
        lineHeight: responsive.size(16.5),
    }),
    viewBottomFooter: (responsive) => ({
        flex: 0.33,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    txtBottomFooter: (responsive) => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.bold,
        color: Core.white,
        textAlign: 'center',
    }),
    txtREB: (responsive) => ({
        fontSize: responsive.size(Fonts.md),
        fontFamily: Fonts.regular,
        color: Core.primaryColor,
        textAlign: 'center',
        width: '90%',
    }),
    viewRenderFooter: (responsive) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: responsive.width(65),
        height: responsive.size(40),
        backgroundColor: 'rgba(250,214,12,0.3)',
        borderRadius: responsive.size(20),
        alignSelf: 'center',
        marginVertical: responsive.size(25),
    }),
    imgArro1: (responsive) => ({
        width: responsive.size(50),
        height: responsive.size(18),
        resizeMode: 'cover'
    }),
    imgArro2: (responsive) => ({
        transform: [{ rotate: '180 deg' }],
        width: responsive.size(50),
        height: responsive.size(18),
        resizeMode: 'cover'
    }),
    txtRenderFooter: (responsive) => ({
        fontSize: responsive.size(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.white,
    })
})
export default styles
