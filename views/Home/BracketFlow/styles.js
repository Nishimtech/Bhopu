import { StyleSheet } from "react-native";
import { Constant, Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        
    },
    imgArrow: responsive=>({
        transform:[{rotate:"180 deg"}],
        width: responsive.size(16),
        height: responsive.size(16),
        tintColor:Core.primaryColor,
        marginTop:responsive.size(3)
    }),
    txtMyMatch: responsive=>({
       color:Core.primaryColor,
       fontSize:Fonts.xxl,
       fontFamily:Fonts.regular
    }),
    viewMyMatch: responsive=>({
       flexDirection:'row',
        alignItems: 'center',
      marginLeft:responsive.size(20)
    }),
    viewRoundParent: responsive=>({
       flexDirection:'row',
        alignItems: 'center',
    }),
    viewRound: (responsive,active,index,length)=>({
       flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsive.size(8),
        paddingHorizontal: responsive.size(14),
        marginHorizontal: responsive.size(10) ,
        marginLeft: index == 0 ? responsive.size(20) :  responsive.size(10),
        marginRight: length - 1 == index ? responsive.size(20) : responsive.size(10),
        borderWidth: responsive.size(1),
        borderColor: active ? Core.primaryColor :'rgba(58, 63, 77, 0.80)',
        borderRadius:responsive.size(10),
        marginTop: responsive.size(5)
    }),
    
    txtRound: responsive => ({
        color: Core.white,
        fontSize: Fonts.lg,
        fontFamily: Fonts.regular
    }),
    viewScoreContainer: (responsive) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsive.size(18),
        // paddingHorizontal: responsive.size(20),
        marginHorizontal: responsive.size(20),
        borderRadius: responsive.size(10),
        marginVertical: responsive.size(16),
    }),
    viewScore: (responsive,isBorder) => ({
        flex:0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: isBorder ? responsive.size(1) : 0,
        borderRightWidth: isBorder ? responsive.size(1) : 0,
        borderColor: '#646872',
       
    }),

    txtScore1: responsive => ({
        color: Core.primaryColor,
        fontSize: Fonts.xxl,
        fontFamily: Fonts.medium
    }),
    txtScore2: responsive => ({
        color: Core.white,
        fontSize: Fonts.md,
        fontFamily: Fonts.regular
    }),
    txtSouth: responsive => ({
        marginLeft: responsive.size(20),
        color: Core.primaryColor,
        fontSize: Fonts.xxl,
        fontFamily: Fonts.medium
    }),
    viewMatchContainer: responsive => ({
      width:responsive.size(250),
      height:responsive.size(120),
      overflow:'hidden',
        backgroundColor: '#3A3F4D',
        borderRadius: responsive.size(10),
        marginHorizontal:responsive.size(20),
        marginVertical: responsive.size(10),
    }),
    viewFirstUser: responsive => ({
        flex: 0.5,
        width: responsive.size(250),
        height: responsive.size(60),
        borderBottomWidth: responsive.size(1.5),
        borderColor: '#646872'
    }),
    imgContainer: responsive => ({
        width: responsive.size(250),
        height: responsive.size(60),
        alignItems:'center',
        justifyContent: 'space-around',
        flexDirection:'row'
    }),
    
    viewSecondUser: responsive => ({
        flex:0.5,
        width: responsive.size(250),
        height: responsive.size(60),
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
    }),
    imgUser: responsive => ({
      
        width: responsive.size(25),
        height: responsive.size(25),
       borderRadius:responsive.size(25),

    }),
    txtUserName: responsive => ({
        color: Core.white,
        fontSize: Fonts.lg,
        fontFamily: Fonts.semibold,
        flex:0.5,
        textAlign:'left',
    }),
    imgRight: responsive => ({
        width: responsive.size(15),
        height: responsive.size(13),
        resizeMode:'contain'
    }),
    viewRight: responsive => ({
        flex:0.3,
        height: responsive.size(60),
        justifyContent:'center',
        alignItems:'center',
       
    }),
    txtRank: responsive => ({
        color: Core.primaryColor,
        fontSize: Fonts.xl,
        fontFamily: Fonts.regular,
    }),
    txtPoints: responsive => ({
        color: Core.white,
        fontSize: Fonts.md,
        fontFamily: Fonts.regular,
        textAlign:'right',
        width:'100%',
        paddingRight: responsive.size(10)
    }),
    viewRank: responsive => ({ flexDirection: 'row',
     alignItems: 'center', 
    justifyContent: 'flex-end', width: '100%', 
    paddingRight: responsive.size(10) }),


   })
export default styles
