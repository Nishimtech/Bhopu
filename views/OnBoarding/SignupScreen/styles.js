import { StyleSheet, Dimensions } from "react-native";
import Core from '../../../Helper/Core'
import { Fonts } from "../../../Helper";
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header_container: {
        flex: 1,
        backgroundColor: Core.transparent
    },
    textHeading: (leftPos, responsive) => ({
        fontSize: responsive.fontSize(Fonts.xxxl),
        textAlign: 'left',
        width: responsive.size(330),
        paddingLeft: responsive.size(20),
        color: Core.white,
        fontFamily: Fonts.bold,
        marginLeft: leftPos
    }),
    form_container: responsive => ({
        flex: 1,
        paddingTop: responsive.size(5)
    }),
    textHaveReffral: (posAnim, responsive) => ({
        marginTop: responsive.size(20),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        color: Core.white,
        width: '100%',
        marginLeft: posAnim
    }),
    btnLoginTouch: (apiCalling, responsive) => ({
        marginTop: responsive.size(25),
        width: responsive.size(apiCalling ? 48 : 276),
        height: responsive.size(48),
        borderRadius: responsive.size(apiCalling ? 24 : 14),
        alignSelf: 'center',
        overflow: 'hidden'
    }),
    btnLogin: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: responsive => ({
        color: Core.input_view_bg,
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xxl),
        lineHeight: responsive.fontSize(Fonts.xxl_lineheight),
        fontFamily: Fonts.semibold,
    }),

    bottomView: responsive => ({
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: responsive.size(167),
    }),
    bottomFlex:(responsive,bottomAnim)=>({
        marginBottom:bottomAnim,
        flex:1,
        alignItems: 'center',
        paddingBottom: responsive.size(40),
        justifyContent: 'flex-end',
    }),
    left_pos: responsive => ({
        position: 'absolute',
        height: responsive.size(140),
        width: responsive.size(60),
        left: 0,
        bottom: 0
    }),
    right_pos: responsive => ({
        position: 'absolute',
        height: responsive.size(140),
        width: responsive.size(55),
        right: 0,
        bottom: 0
    }),
    textPrivacy: (posAnim, responsive) => ({
        marginBottom: responsive.size(30),
        width: responsive.size(290),
        alignSelf: 'center',
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        fontFamily: Fonts.medium,
        color: Core.white,
        marginTop: posAnim
    }),
    activePrivacy: {
        color: Core.primaryColor
    },
    viewField: posAnim => ({
        width: '100%',
        marginLeft: posAnim
    }),
    btnView: (posAnim, responsive, isValid) => ({
        width: '100%',
        marginTop: posAnim,
        marginBottom: responsive.size(30),
        opacity: isValid ? 1 : 0.5
    })



})
export default styles
