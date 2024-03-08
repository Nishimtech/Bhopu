import { Constant } from '..'
const Fonts = {
  //Font Family
  regular: 'Saira-Regular',
  medium: 'Saira-Medium',
  semibold: 'Saira-SemiBold',
  bold: 'Saira-Bold',
  extra_bold: 'Saira-ExtraBold',
  italic_regular: 'Saira-Italic',
  italic_bold: 'Saira-BoldItalic',


    //Font Size
    xs: Constant.BASE_SIZE * 0.57, //8
    sd: Constant.BASE_SIZE * 0.71, //10
    ssd: Constant.BASE_SIZE * 0.78, //11
    md: Constant.BASE_SIZE * 0.86, //12
    lg: Constant.BASE_SIZE,      //14
    xl: Constant.BASE_SIZE * 1.14, //16
    xxl: Constant.BASE_SIZE * 1.29, //18
    xxxl: Constant.BASE_SIZE * 1.43, //20
    h6: Constant.BASE_SIZE * 1.57, //22
    h5: Constant.BASE_SIZE * 1.71, //24
    h2: Constant.BASE_SIZE * 2.14, //30
    h1: Constant.BASE_SIZE * 2.29, //32
    h3: Constant.BASE_SIZE * 2.43, //34
    h7: Constant.BASE_SIZE * 2.85, //40
  
    //Line Height
  
    xs_lineheight: (Constant.BASE_SIZE * 0.57 + ((Constant.BASE_SIZE * 0.57) / 2)), //8
    ssd_lineheight: (Constant.BASE_SIZE * 0.71 + ((Constant.BASE_SIZE * 0.71) / 2)), //10
    sd_lineheight: (Constant.BASE_SIZE * 0.78 + ((Constant.BASE_SIZE * 0.78) / 2)), //10
    md_lineheight: (Constant.BASE_SIZE * 0.86 + ((Constant.BASE_SIZE * 0.86) / 2)), //12
    lg_lineheight: (Constant.BASE_SIZE + ((Constant.BASE_SIZE) / 2)),//14
    xl_lineheight: (Constant.BASE_SIZE * 1.14 + ((Constant.BASE_SIZE * 1.14) / 2)), //16
    xxl_lineheight: (Constant.BASE_SIZE * 1.29 + ((Constant.BASE_SIZE * 1.29) / 2)), //18
    xxxl_lineheight: (Constant.BASE_SIZE * 1.43 + ((Constant.BASE_SIZE * 1.43) / 2)), //20
    h5_lineheight: (Constant.BASE_SIZE * 1.71 + ((Constant.BASE_SIZE * 1.71) / 2)), //24
    h2_lineheight: (Constant.BASE_SIZE * 2.14 + ((Constant.BASE_SIZE * 2.14) / 2)), //30
    h1_lineheight: (Constant.BASE_SIZE * 2.29 + ((Constant.BASE_SIZE * 2.29) / 2)), //32
    h3_lineheight: (Constant.BASE_SIZE * 2.43 + ((Constant.BASE_SIZE * 2.43) / 2)), //34
  }
  export default Fonts
  
