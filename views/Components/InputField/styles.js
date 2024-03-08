import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    labelViewContainer: responsive => ({
        marginTop: responsive.size(15),
        width: responsive.size(330),
        marginLeft: responsive.size(20),
        flexDirection: 'row',
        height: responsive.size(32),
        alignItems: 'center'
    }),
    imgContainer: responsive => ({
        marginRight: responsive.size(8),
        width: responsive.size(16),
        height: responsive.size(16)
    }),
    txtLabel: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        textAlign: 'left',
        color: Core.white,
        fontFamily: Fonts.regular
    }),
    inputContainer: (createContest,responsive,isTransparent) => ({
        marginLeft: responsive.size((isTransparent || createContest)?0:20),
        borderWidth: isTransparent?0:1,
        borderColor: Core.input_view_border,
        borderRadius: responsive.size(10),
        backgroundColor: isTransparent?'transparent':Core.input_view_bg,
        width: createContest?'92%':Constant.FULL_WIDTH - responsive.size(40),
        height: responsive.size(52),
        textAlignVertical: "auto",
        overflow:'hidden',
        ...(createContest && {alignSelf:'center'})
    }),
    viewInput: responsive => ({
        marginLeft: responsive.size(15),
        marginRight: responsive.size(15),
        borderBottomWidth: 0
    }),
    labelInput: {
        fontFamily: Fonts.regular,
        color: Core.white,
        flex: 1,
    },
    viewRight: (responsive) => ({
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: responsive.size(20),
        top: responsive.size(13),
        width: responsive.size(24),
        height: responsive.size(24)
    }),
    imgRight: (responsive, secureTextEntry) => ({
        width: responsive.size(24),
        height: responsive.size(24),
        tintColor: secureTextEntry ? Core.silver : Core.primaryColor
    }),
    imgRightContest: (responsive) => ({
        width: responsive.size(16),
        height: responsive.size(16),
        tintColor: Core.primaryColor
    }),
    txtBottomValidation: responsive => ({
        marginTop: responsive.size(5),
        marginLeft: responsive.size(24),
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        textAlign: 'left',
        color: Core.primaryColor
    })
})
export default styles
