import { StyleSheet } from "react-native";
import { Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header_container: responsive => ({
        flex: 1,
        backgroundColor: Core.transparent,
        paddingTop: responsive.size(30),
        alignItems: 'center'
    }),
    txt_contest_window: (responsive) => ({
        textAlign: 'center',
        marginTop: 0,
        fontSize: responsive.fontSize(Fonts.xxxl),
        fontFamily: Fonts.semibold,
        color: Core.white
    }),
    container_view: (animatedHeight, responsive) => ({
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden',
        height: animatedHeight,
        marginBottom: responsive.size(40),
    }),
    imagePolygon: (responsive, selectTypeID, typeID) => ({
        tintColor: selectTypeID != typeID ? Core.black : Core.white,
        marginTop: responsive.size(8)
    }),
    view_container: (is_left, responsive) => ({
        position: 'absolute',
        height: '100%',
        width: '50%',
        alignItems: is_left ? 'flex-end' : 'flex-start',
        ...(is_left ? { left: responsive.size(0) } : { right: responsive.size(0) })
    }),
    view_polygon_container: (enable, top, responsive) => ({
        width: responsive.size(192),
        height: responsive.size(186),
        marginTop: top,
        opacity: enable ? 1 : 0.3,
        overflow: "hidden",
        alignItems: 'center'
    }),
    main_container: {
        width: '100%',
        height: '100%',
        overflow: "hidden",
        alignItems: 'center'
    },
    img_polygon: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    activeImg: {
        tintColor: Core.black
    },
    view_polygon: responsive => ({
        marginTop: responsive.size(21),
        width: responsive.size(70),
        height: responsive.size(67),
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center'
    }),

    btnNext: (responsive) => ({
        width: responsive.size(276),
        height: responsive.size(48),
        marginBottom: responsive.size(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsive.size(14),
        alignSelf: 'center'
    }),
    buttonText: (responsive) => ({
        color: Core.input_view_bg,
        textAlign: 'center',
        fontSize: responsive.fontSize(Fonts.xxl),
        lineHeight: responsive.fontSize(Fonts.xxl_lineheight),
        fontFamily: Fonts.semibold,
    }),
    btnView: (posAnim, isValid) => ({
        width: '100%',
        marginTop: posAnim,
        opacity: isValid ? 1 : 0.5
    }),
    txt_sports: (isActive, responsive) => ({
        marginTop: responsive.size(12),
        fontSize: responsive.fontSize(Fonts.xl),
        textAlign: 'center',
        color: isActive ? Core.input_view_bg : Core.primaryColor,
        fontFamily: Fonts.semibold,
    }),
    txt_sports_subtitle: (isActive, responsive) => ({
        fontSize: responsive.fontSize(Fonts.lg),
        textAlign: 'center',
        color: isActive ? Core.input_view_bg : Core.white,
        fontFamily: Fonts.regular,
    }),
    viewIndicator: responsive => ({
        flex: 1,
        alignItems: 'center',
        paddingTop: responsive.size(15)
    })
})
export default styles
