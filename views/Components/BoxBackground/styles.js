import { StyleSheet } from "react-native";
import {Constant, Core} from "../../../Helper";
const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:Core.input_view_bg,
        overflow:'hidden'
    },
    safeAreaConatiner:{
        flex:1,
    },
    behindContainer:{
        position:'absolute',
        width:'100%',
        height:'100%',
        pointerEvents:'none'
    },
    rightTop:responsive=>({
        position:'absolute',
        right:0,
        height:responsive.size(234),
        width:responsive.size(234),
    }),
    leftTop:responsive=>({
        position:'absolute',
        top:0,
        pointerEvents:'none',
        width:'100%',
        height:Constant.FULL_HEIGHT-responsive.size(80),
    }),
    headerContainer:responsive=>({
        width:'100%',
        height:responsive.size(80),
        alignItems:'center',
    }),
    viewContainer:(responsive,marginTop)=>({ 
        flex: 1, 
        marginTop: responsive.size(marginTop || 80), 
        alignItems:'center' ,
        paddingVertical:responsive.size(5)
    })
})
export default styles
