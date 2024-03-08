import { StyleSheet } from "react-native";
import { Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header_container: {
        flex: 1,
        backgroundColor: Core.transparent,
    },
    textHeading: (leftPos, responsive) => ({
        fontSize: responsive.fontSize(Fonts.xxxl),
        textAlign: 'left',
        width: responsive.size(330),
        paddingLeft: responsive.size(20),
        color: Core.white,
        fontFamily: Fonts.bold,
        marginLeft: leftPos,
    }),
    textSubHeading: (leftSubPos, responsive) => ({
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'left',
        width: responsive.size(330),
        paddingRight: responsive.size(24),
        marginTop: responsive.size(10),
        marginBottom: responsive.size(21),
        paddingLeft: responsive.size(20),
        color: Core.white,
        marginLeft: leftSubPos
    }),
    form_container: responsive => ({
        flex: 1,
        paddingTop: responsive.size(5)
    }),
    btnLoginTouch: (apiCalling, responsive) => ({
        marginTop: responsive.size(40),
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
        fontFamily: Fonts.semibold
    }),

    bottomView: (responsive) => ({
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
    textPrivacy: responsive => ({
        width: responsive.size(330),
        alignSelf: 'center',
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'center',
        fontFamily: Fonts.medium,
        color: Core.white
    }),
    activePrivacy: {
        color: Core.primaryColor
    },
    viewField: posAnim => ({
        width: '100%',
        marginLeft: posAnim
    }),
    btnView: (posAnim, isValid) => ({
        width: '100%',
        marginTop: posAnim,
        opacity: isValid ? 1 : 0.5
    })



})
export default styles
