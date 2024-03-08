import { Constant, Core, Fonts } from '../../../Helper';

const styles = {
  main_container: {
    width: Constant.FULL_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Core.transparent,
  },
  inside_main_container:responsive=>({ 
    width: responsive.size(358), 
    height: responsive.size(364), 
    backgroundColor: Core.input_view_bg, 
    borderRadius: responsive.size(40), 
    overflow: 'hidden' 
  }),
  viewCircle:responsive=>({
    width:responsive.size(64),
    height:responsive.size(64),
    borderRadius:responsive.size(32),
    marginTop:-responsive.size(32),
    backgroundColor:Core.light_yellow,
    alignItems:'center',
    justifyContent:'center'
  }),
  imgIcon:responsive=>({
    width:responsive.size(48),
    height:responsive.size(48),
  }),
  imgIcon1:responsive=>({
    width:responsive.size(42),
    height:responsive.size(38),
  }),
  txtHeaderTitle:responsive=>({
    position:'absolute',
    top:responsive.size(-50),
    width:responsive.size(264),
    fontSize: responsive.size(Fonts.h6),
    fontFamily: Fonts.semibold,
    textAlign:'center',
    color:'#FFF'
  }),
  txtTitle:responsive=>({
    marginTop:responsive.size(35),
    width:responsive.size(264),
    fontSize: responsive.size(Fonts.h6),
    fontFamily: Fonts.semibold,
    textAlign:'center',
    color:'#FFF'
  }),
  btnLogin:(responsive)=>({
    marginTop:responsive.size(41),
    width:responsive.size(213),
    height:responsive.size(48),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:responsive.size(14),
    alignSelf:'center'
}),
buttonText:responsive=>({
    color:Core.input_view_bg,
    textAlign:'center',
    fontSize:responsive.size(Fonts.xxl),
    lineHeight:responsive.size(27),
    fontFamily:Fonts.semibold,
}),
  
}

export default styles
