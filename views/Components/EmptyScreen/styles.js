import { Platform, StyleSheet } from "react-native";
import { Constant, Core } from "../../Home";
import { Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    main_container:responsive=>({
        width:Constant.FULL_WIDTH,
        height:'40%',
        minHeight:responsive.size(340),
        alignItems:'center',
        justifyContent:'center',
    }),
    logoSize:responsive=>({
        width:responsive.size(160),
        height:responsive.size(Platform.OS=='ios'?47:48),
        marginBottom:responsive.size(40),
    }),
    actionBtn:(responsive,apiCalling)=>({
        width:responsive.size(apiCalling?48:190),
        height:responsive.size(48),
        borderRadius:responsive.size(apiCalling?24:14)
    }),
    viewBtn:(responsive,apiCalling)=>({
        width:responsive.size(apiCalling?48:276),
        height:responsive.size(48),
        borderRadius:responsive.size(apiCalling?24:14),
        alignItems:'center',
        justifyContent:'center'
    }),
    txtTitle:responsive=>({
        marginTop:responsive.size(-20),
        marginBottom:responsive.size(20),
        fontSize:responsive.size(Fonts.xxl),
        textAlign:'center',
        fontFamily:Fonts.semibold,
        color: Core.blue_gray
    }),
    txtBtn:responsive=>({
        fontSize:responsive.size(Fonts.xxl),
        textAlign:'center',
        fontFamily:Fonts.semibold,
        color:Core.black
    })
})
export default styles
