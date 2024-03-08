import { StyleSheet } from "react-native";
import { Core } from "../../Home";
const styles = StyleSheet.create({

    container:responsive=>({
        width:'100%',
        height:responsive.size(56),
        marginLeft:responsive.size(4),
        overflow:'hidden',
        transform: [{ rotate: '90deg'}],
        alignItems:'center',
       
    }),
    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image: (is_animated, topAnim, is_down, responsive,small) => ({
        marginTop: !is_animated ? 0 : topAnim,
        tintColor: is_down ? Core.dodger_blue : Core.Bracket,
        width: responsive.size(small?15.4:21),
        height: responsive.size(small?8.4:14),
        marginLeft:(small?responsive.size(-6):0)
    })
})
export default styles
