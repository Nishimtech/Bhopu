import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../../../Helper";
const styles = StyleSheet.create({
   
    container:{
        width:Constant.FULL_WIDTH,
        height:'100%',
        overflow:'hidden'
    },
    wrapper:{
        flex:1,
        width:Constant.FULL_WIDTH,
        overflow:'hidden'
    },
    footer: responsive => ({
        width: '100%',
        height: responsive.size(210)
    }),
    viewBtmItm: (responsive,is_border = true) => ({
        height: responsive.size(48),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: is_border?1:0,
        borderTopColor: Core.nevada,
    }),
    viewBtm: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imgShmr: responsive => ({
        height: responsive.size(16),
        width: responsive.size(16),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    txtAmntShmr: (responsive) => ({
        marginLeft: responsive.size(6),
        height: responsive.size(12),
        width: responsive.size(40),
        borderRadius: responsive.size(6),
        overflow: 'hidden'
    }),
    viewCircleShmr:responsive=>({
        marginLeft: responsive.size(10), 
        height: responsive.fontSize(18), 
        width: responsive.fontSize(18), 
        borderRadius: responsive.fontSize(9), 
        overflow: 'hidden'
    }),
    txtCircleShmr:responsive=>({
        marginLeft: responsive.size(10), 
        height: responsive.fontSize(24), 
        width: responsive.fontSize(24), 
        borderRadius: responsive.fontSize(6), 
        overflow: 'hidden'
    }),
    viewM: responsive => ({
        marginLeft: responsive.size(10),
        width: responsive.size(18),
        height: responsive.size(18),
        borderRadius: responsive.size(9),
        backgroundColor: 'rgba(250, 250, 250, 0.15)',
        alignItems:'center',justifyContent:'center',
        borderWidth: 0.5,
        borderColor: Core.primaryColor
    }),
    txtM: responsive => ({
        fontSize: responsive.size(Fonts.md),
        lineHeight: responsive.size(Fonts.md_lineheight),
        color: Core.primaryColor,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    viewShmrPick: responsive => ({
        borderWidth: 1,
        borderColor: Core.silver,
        marginLeft: responsive.size(12),
        paddingHorizontal: responsive.size(10),
        height: responsive.size(24),
        borderRadius: responsive.size(8),
        alignItems: 'center',
        justifyContent: 'center'
    }),
    imgTrophy: responsive => ({
        width: responsive.size(16),
        height: responsive.size(16)
    }),
    txtAmount: responsive => ({
        marginLeft: responsive.size(6),
        marginRight: responsive.size(12),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.primaryColor,
        textAlign: 'left',
        fontFamily: Fonts.medium
    }),
    viewPick: responsive => ({
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.10)',
        paddingHorizontal: responsive.size(10),
        height: responsive.size(24),
        borderRadius: responsive.size(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(250, 250, 250, 0.15)'
    }),
    txtPick: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        color: '#FFF',
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    imgShare: responsive => ({
        marginLeft: responsive.size(10),
        width: responsive.size(24),
        height: responsive.size(24)
    }),
   
    txtEntry: responsive => ({
        marginRight: responsive.size(10),
        fontSize: responsive.fontSize(Fonts.md),
        color: Core.silver,
        textAlign: 'right',
        fontFamily: Fonts.medium
    }),
    txtEntryShmr:responsive=>({
        marginRight: responsive.size(10), 
        height: responsive.size(12), 
        width: responsive.size(40), 
        borderRadius: responsive.size(9), 
        overflow: 'hidden'
    }),
    viewEntry: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtFree: responsive => ({
        fontSize: responsive.fontSize(Fonts.lg),
        lineHeight: responsive.fontSize(Fonts.lg_lineheight),
        color: Core.input_view_bg,
        textAlign: 'center',
        fontFamily: Fonts.medium
    }),
    btnFreeShmr:responsive=>({
        height: responsive.size(24), 
        width: responsive.size(60), 
        borderRadius: responsive.size(10), 
        overflow: 'hidden'
    }),
    viewFree: responsive => ({
        paddingHorizontal: responsive.size(16),
        height: responsive.size(24),
        borderRadius: responsive.size(10),
        alignItems: 'center',
        justifyContent: 'center'
    })
    
})
export default styles
