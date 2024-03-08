import { StatusBar, StyleSheet } from "react-native";
import {Constant, Core, Fonts} from "../../../Helper";
const styles = StyleSheet.create({
   mainContainer:(responsive,stylesBackground)=>({ 
        width: '100%', 
        height: responsive.fontSize(50), 
        backgroundColor: Core.tuna, 
        borderBottomLeftRadius: responsive.size(20), 
        borderBottomRightRadius: responsive.size(20),
        overflow:'hidden',
        ...(stylesBackground || {})
   }),
   scrollContainer:responsive=>({ 
        flex: 1, 
        paddingHorizontal: responsive.fontSize(15) 
   }),
   touchSports:(responsive,arrOfSports)=>({ 
        minWidth: responsive.fontSize(50), 
        width:(Constant.FULL_WIDTH-responsive.size(30))/arrOfSports.length,
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center' 
   }),
   txtSportsName:(responsive,isExistSportsID)=>({ 
        color: isExistSportsID ? Core.primaryColor : Core.silver, 
        textAlign: 'center', 
        fontSize: responsive.fontSize(Fonts.lg), 
        fontFamily: Fonts.regular 
   }),
   viewSports:(responsive,idx,isExistSportsID,arrOfSports)=>({ 
        position: 'absolute',
        bottom: 0, 
        minWidth: responsive.fontSize(50), 
        width:(Constant.FULL_WIDTH-responsive.size(30))/arrOfSports.length,
        height: responsive.size(4), 
        borderBottomLeftRadius: responsive.size((idx == 0 || isExistSportsID) ? 60 : 0), 
        borderTopLeftRadius: responsive.size((idx == 0 || isExistSportsID) ? 60 : 0), 
        borderTopRightRadius: responsive.size((idx == arrOfSports.length - 1 || isExistSportsID) ? 60 : 0), 
        borderBottomRightRadius: responsive.size((idx == arrOfSports.length - 1 || isExistSportsID) ? 60 : 0), 
        backgroundColor: isExistSportsID ? Core.primaryColor : Core.transparent_white 
   }),
})
export default styles
