import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../../../Helper";
const styles = StyleSheet.create({
   
    container:{
        width:Constant.FULL_WIDTH,
        height:'100%',
        overflow:'hidden',
    },
    behindContainer:{
        position:'absolute',
        width:'100%',
        height:Constant.FULL_HEIGHT,
    },
    rightTop:responsive=>({
        position:'absolute',
        left:0,
        top:0,
        height:responsive.size(234),
        width:responsive.size(234),
    }),
})
export default styles
