import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    viewBtmBtn: (responsive) => ({
        width: '100%',
        height: responsive.size(50),
        marginBottom: responsive.size(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'hidden'
    }),
    btnPreview: (responsive) => ({
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: responsive.size(14),
        width: '46%', height: responsive.size(48),
        borderWidth: 0.5,
        borderColor: Core.primaryColor,
        overflow: 'hidden',
        flexDirection:'row'
    }),
    txtPreviewBtn: (responsive,is_disable) => ({
        fontSize: responsive.size(Fonts.xl),
        textAlign: 'center',
        color: Core.primaryColor,
        fontFamily: Fonts.semibold
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
        fontSize: responsive.size(Fonts.xl),
        textAlign: 'center',
        color: Core.input_view_bg,
        fontFamily: Fonts.semibold
    })
})
export default styles
