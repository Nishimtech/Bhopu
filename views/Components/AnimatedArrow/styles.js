import { Platform, StyleSheet } from "react-native";
import { Core } from "../../Home";
const styles = StyleSheet.create({
    container:(responsive, is_down)=>({
        transform: [{ rotate: is_down?'180deg':'0deg'}],
        marginTop:Platform.OS=='ios'?0:responsive.size(4),
        height:responsive.size(12),
        overflow:'hidden'
    }),
    image: (is_animated, topAnim, is_down, responsive) => ({
        marginTop: !is_animated ? 0 : topAnim,
        tintColor: is_animated?'white':is_down ? Core.dodger_blue : Core.Bracket,
        height: responsive.size(4),
    })
})
export default styles
