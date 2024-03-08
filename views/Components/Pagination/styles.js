import { Platform, StyleSheet } from "react-native";
import { Constant, Core } from "../../Home";
import { Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    viewPaginationDot: (responsive, active) => ({
        width: active ? responsive.size(10) : responsive.size(7),
        height: active ? responsive.size(10) : responsive.size(7),
        backgroundColor: active ? Core.primaryColor : Core.silver,
        borderRadius: responsive.size(10),
        marginHorizontal: responsive.size(4),
        alignSelf:'center'
    }),
})
export default styles
