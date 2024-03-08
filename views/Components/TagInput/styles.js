import { StatusBar, StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    viewTag: responsive => ({
        backgroundColor: Core.tuna_color,
        borderRadius: responsive.size(5),
        height: responsive.size(27),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row",
        margin: responsive.size(5),
        paddingHorizontal: responsive.size(5),
    }),
    txtTag: responsive => ({
        color: Core.white,
        fontFamily: Fonts.regular,
        fontSize: responsive.fontSize(Fonts.md),
        paddingHorizontal: responsive.size(5),
    }),
    imgCross: responsive => ({
        width: responsive.size(16),
        height: responsive.size(16),
    }),
    viewInput: responsive => ({
        flexDirection: "row",
        margin: responsive.size(10),
        borderRadius: responsive.size(5),
        borderWidth: responsive.size(1),
        borderColor: Core.white,
        overFlow: 'hidden'
    }),
    btnAdd: responsive => ({
        borderRadius: responsive.size(5),
        backgroundColor: Core.tuna_color,
        alignItems: 'center',
        justifyContent: 'center'
    }),
    txtAddBtn: responsive => ({
        paddingHorizontal: responsive.size(15),
        color: Core.primaryColor,
        fontFamily: Fonts.regular,
        fontSize: responsive.fontSize(Fonts.md),
    }),
    txtUsername: responsive => ({
            padding: 10, borderBottomWidth: 1,
             color: Core.white,
            fontFamily: Fonts.regular,
            fontSize: responsive.fontSize(Fonts.md),
        } ),
    txtInputBox: responsive => ({
        flex:1,
            padding: 10,
             borderBottomWidth: 1,
             color: Core.white,
            fontFamily: Fonts.regular,
            fontSize: responsive.fontSize(Fonts.md),
        } ),

})
export default styles
