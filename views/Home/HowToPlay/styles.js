import { StyleSheet } from "react-native";
import { Constant, Core } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
    },
    header_container:{
        flex: 1,
        backgroundColor: Core.transparent,
    },
   
    form_container: responsive=>({
        flex: 1,
        paddingTop: responsive.size(5)
    }),
    bottomView:responsive=>({
        position:'absolute',
        bottom:0,
        width:'100%',
        height:responsive.size(167),
        alignItems:'center',
        paddingBottom:responsive.size(40),
        justifyContent:'flex-end'
    }),
    left_pos:responsive=>({
        position:'absolute',
        height:responsive.size(140),
        width:responsive.size(60),
        left:0,
        bottom:0
    }),
    right_pos:responsive=>({
        position:'absolute',
        height:responsive.size(140),
        width:responsive.size(55),
        right:0,
        bottom:0
    }),
    itemContainer:{ 
        flex: 1,
        width: Constant.FULL_WIDTH, 
        alignItems: 'center' 
    },
    viewPagerContainer:responsive=>({ 
        alignSelf: 'center', 
        width: responsive.size(68), 
        height: responsive.size(12), 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    }),
    viewPage:(responsive,selectIdx,value)=>({ 
        backgroundColor: selectIdx == value ? Core.primaryColor : Core.silver, 
        width: responsive.size(12), 
        height: responsive.size(12), 
        borderRadius: responsive.size(6) 
    }),
})
export default styles
