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
        marginLeft: leftPos
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

    btnLogin: (apiCalling, responsive) => ({
        marginTop: responsive.size(40),
        width: responsive.size(apiCalling ? 48 : 276),
        height: responsive.size(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(apiCalling ? 24 : 14),
        alignSelf: 'center'
    }),
    buttonText: responsive => ({
        color: Core.input_view_bg,
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xxl),
        lineHeight: responsive.fontSize(Fonts.xxl_lineheight),
        fontFamily: Fonts.semibold,
    }),

    viewEdit: responsive => ({
        alignSelf: 'center',
        width: responsive.size(330),
        marginBottom: responsive.size(40),
        overflow: 'hidden'
    }),
    txtOTPsent: responsive => ({
        textAlign: 'center',
        color: Core.silver,
        fontSize: responsive.fontSize(Fonts.md),
        marginBottom: responsive.size(5),
        fontFamily: Fonts.regular,
    }),
    viewEmailContainer: responsive => ({
        alignSelf: 'center',
        width: responsive.size(330),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtEmail: responsive => ({
        textAlign: 'center',
        color: '#FFF',
        fontSize: responsive.fontSize(Fonts.xl),
        fontFamily: Fonts.semibold,
        marginRight: responsive.size(5)
    }),
    imgEdit: responsive => ({
        width: responsive.size(20),
        height: responsive.size(20),
    }),
    bottomView: (posAnim, responsive) => ({
        position: 'absolute',
        bottom: posAnim,
        width: '100%',
        height: responsive.size(167),
        alignItems: 'center',
        paddingBottom: responsive.size(40),
        justifyContent: 'flex-end'
    }),
    left_pos: responsive => ({
        position: 'absolute',
        height: responsive.size(140),
        width: responsive.size(60),
        left: 0,
        bottom: 0
    }),
    bottomFlex:(responsive,bottomAnim)=>({
        position:'absolute',
        bottom: bottomAnim,
        width: '100%',
        height: responsive.size(167),
        alignItems: 'center',
        paddingBottom: responsive.size(40),
        justifyContent: 'flex-end',
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
        color: Core.white,
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
    }),
    viewTimer: (leftPos, responsive) => ({
        marginLeft: leftPos,
        width: responsive.size(330),
        paddingLeft: responsive.size(20),
        marginTop: responsive.size(5),
        marginBottom: responsive.size(40),
        flexDirection: 'row',
        alignItems: 'flex-start'
    }),
    imgTimer: responsive => ({
        width: responsive.size(24),
        height: responsive.size(24),
    }),
    txtTimer: responsive => ({
        textAlign: 'left',
        marginLeft: responsive.size(4),
        marginBottom: responsive.size(4),
        fontSize: responsive.fontSize(Fonts.md),
        lineHeight: responsive.fontSize(Fonts.md_lineheight),
        fontFamily: Fonts.semibold,
        color: Core.white,
        width: '100%'
    }),
    txtActiveTimer: {
        color: Core.cinnabar_color,
    },
    otpContainer: responsive => ({
        height: responsive.size(50),
        width: responsive.size(306),
        alignSelf: 'center'
    }),
    otpTextInput: responsive => ({
        width: responsive.size(50),
        height: responsive.size(50),
        color: Core.white,
        backgroundColor: Core.input_view_bg,
        borderRadius: responsive.size(10),
        borderBottomWidth: 0,
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.regular,
        textAlign: 'center'
    })


})
export default styles
