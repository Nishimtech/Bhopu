import { StatusBar, StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    bottomContainer: (responsive, bottomAnim) => ({
        position: 'absolute',
        bottom: bottomAnim,
        width: Constant.FULL_WIDTH,
        height: responsive.size(70),
        borderTopLeftRadius: responsive.size(20),
        borderTopRightRadius: responsive.size(20)
    }),
    mainContainer: responsive => ({
        width: Constant.FULL_WIDTH,
        height: '100%',
        borderTopLeftRadius: responsive.size(20),
        borderTopRightRadius: responsive.size(20),
        paddingTop: responsive.size(1)
    }),
    innerContainer: responsive => ({
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: responsive.size(20),
        borderTopRightRadius: responsive.size(20)
    }),
    viewTabContainer: responsive => ({
        width: (Constant.FULL_WIDTH / 2) - responsive.size(32),
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }),
    touchView: {
        width: 'auto',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabImg: (responsive, val, tabIdx, enableColor, disableColor) => ({
        width: responsive.size(16),
        height: responsive.size(16),
        tintColor: val == tabIdx ? enableColor : disableColor
    }),
    txtTabTitle: (responsive, val, tabIdx, enableColor, disableColor) => ({
        marginTop: responsive.size(4),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: val == tabIdx ? enableColor : disableColor
    }),
    animatedTabView: responsive => ({
        position: 'absolute',
        width: responsive.size(72),
        height: '100%',
        alignItems: 'center'
    }),
    viewLine: (responsive, val, tabIdx, enableSwitch, disableSwitch) => ({
        position: 'absolute',
        top: 0,
        width: responsive.size(11),
        height: val == tabIdx ? enableSwitch : disableSwitch,
        borderRadius: responsive.size(60),
        backgroundColor: Core.primaryColor
    }),
    imgCrcl: (responsive, val, tabIdx, enableBulb, disableBulb) => ({
        width: responsive.size(72),
        height: val == tabIdx ? enableBulb : disableBulb
    }),
    mainCenterView: (responsive, centerAnim) => ({
        position: 'absolute',
        top: centerAnim,
        left: (Constant.FULL_WIDTH / 2) - responsive.size(41),
        width: responsive.size(82),
        height: '100%',
        alignItems: 'center'
    }),
    touchCenterView: responsive => ({
        width: responsive.size(62),
        height: responsive.size(62),
        borderRadius: responsive.size(18),
        shadowColor: Core.yellow_ochre,
        shadowOffset: { width: 0, height: responsive.size(8) },
        shadowOpacity: 0.8,
        elevation: 4,
        shadowRadius: responsive.size(8),
    }),
    gradientCenterView: responsive => ({
        width: responsive.size(62),
        height: responsive.size(62),
        borderRadius: responsive.size(18),
        shadowColor: Core.cod_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: responsive.size(14),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    imgHome: responsive => ({
        width: responsive.size(32),
        height: responsive.size(32),
        tintColor: Core.black
    })
})
export default styles
