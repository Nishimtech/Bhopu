import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";

const styles = StyleSheet.create({
    container:{
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    },
    textDay:(fontSize,lineHeight)=>({
        fontSize:fontSize,
        lineHeight:lineHeight,
        fontFamily:Fonts.semibold,
        color:Core.silver
    }),
    textTimer:(colorTimer)=>({
        color:(colorTimer || Core.Bracket),
        fontFamily:Fonts.semibold
    }),
    textDate:{
        color:Core.white,
        fontFamily:Fonts.semibold
    },
    textTime:(lineHeight, fontSize, colorTimer)=>({
        fontSize:fontSize,
        lineHeight:lineHeight,
        color:(colorTimer?'rgba(255,255,255,0.4)':Core.silver),
        fontFamily:Fonts.semibold
    }),
    
})

export default styles;
