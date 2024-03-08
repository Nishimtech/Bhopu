import { Platform } from 'react-native';
import { Constant, Core, Fonts } from '../../../Helper';

const styles = {
  main_container: {
    width: Constant.FULL_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Core.transparent,
  },
  inside_main_container: responsive => ({
    width: '92%',
    height: responsive.size(566),
    backgroundColor: Core.input_view_bg,
    borderRadius: responsive.size(40),
    overflow: 'hidden'
  }),
  txt_title: responsive => ({
    fontFamily: Fonts.semibold,
    marginTop: responsive.size(-75),
    fontSize: responsive.fontSize(Fonts.h6),
    color: Core.primaryColor,
    textAlign: 'center'
  }),
  subView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  txtSubView: responsive => ({
    marginTop: responsive.size(-5),
    fontFamily: Fonts.semibold,
    fontSize: responsive.fontSize(Fonts.xxl),
    color: Core.white,
    textAlign: 'center'
  }),
  viewCoinHeader: responsive => ({
    marginTop: responsive.size(-5),
    marginLeft: responsive.size(4),
    flexDirection: 'row',
    alignItems: 'center'
  }),
  imgCoinHeader: responsive => ({
    width: responsive.size(16),
    height: responsive.size(16)
  }),
  txtCoinValue: responsive => ({
    marginLeft: responsive.size(4),
    fontFamily: Fonts.semibold,
    fontSize: responsive.fontSize(Fonts.xxl),
    color: Core.white,
    textAlign: 'left'
  }),
  carasoulView: responsive => ({
    marginTop: responsive.size(70)
  }),
  actionCarasoulView: (responsive, is_claim_api) => ({
    marginTop: responsive.size(-120),
    width: responsive.size(is_claim_api ? 58 : 225),
    height: responsive.size(58),
    borderRadius: responsive.size(is_claim_api ? 29 : 14),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  gradientView: (responsive, is_claim_api) => ({
    borderRadius: responsive.size(is_claim_api ? 29 : 14),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }),
  txtBtnView: (responsive) => ({
    fontSize: responsive.fontSize(Fonts.xxxl),
    lineHeight: responsive.fontSize(Fonts.xxxl_lineheight),
    fontFamily:Fonts.semibold,
    textAlign: 'center',
    color: '#222'
  }),
  txtDescriptionView: (responsive) => ({
    marginTop: responsive.size(20),
    alignSelf: 'center',
    width: responsive.size(200),
    fontFamily: Fonts.medium,
    fontSize: responsive.fontSize(Fonts.md),
    lineHeight: responsive.fontSize(Fonts.md_lineheight),
    color: Core.white,
    textAlign: 'center'
  }),
  actionItemView: (responsive, activeSlide, index) => ({
    width: responsive.size(179),
    height: responsive.size(242),
    shadowColor: activeSlide != index ? Core.transparent : Core.primaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: responsive.size(10),
    elevation: activeSlide != index ? 0 : 2
  }),
  itemView: (responsive, activeSlide, index) => ({
    borderRadius: responsive.size(16),
    width: responsive.size(179),
    height: '100%',
    borderWidth: 1,
    borderColor: activeSlide != index ? Core.input_view_border : Core.primaryColor
  }),
  itemGradientView: (responsive) => ({
    borderRadius: responsive.size(16),
    alignItems: 'center',
    paddingTop: responsive.size(10),
    width: '100%',
    height: '100%'
  }),
  txtDay: (responsive, isPrimary) => ({
    fontFamily: Fonts.medium,
    fontSize: responsive.fontSize(Fonts.xxl),
    color: isPrimary ? Core.black : Core.white,
    textAlign: 'center'
  }),
  viewItemCoin: (responsive) => ({
    marginTop: responsive.size(12),
    overflow: 'hidden'
  }),
  imgItemCoin: (responsive) => ({
    width: responsive.size(78),
    height: responsive.size(78)
  }),
  txtAmtCoin: (responsive) => ({
    marginTop: responsive.size(-3),
    fontFamily: Fonts.bold,
    fontSize: responsive.fontSize(Fonts.h7),
    color: Core.white,
    textAlign: 'center',
    shadowOffset: { width: 2, height: 4 },
    shadowColor: 'rgba(0,0,0,0.44)',
    shadowOpacity: 0.44,
    shadowRadius: responsive.size(1),
    height: responsive.size(70)
  }),
  txtItemCoin: (responsive, isPrimary) => ({
    fontFamily: Fonts.semibold,
    fontSize: responsive.fontSize(Fonts.xxl),
    color: isPrimary ? Core.black : Core.white,
    textAlign: 'center',
  }),
  imgItemCorrect: (responsive) => ({
    position: 'absolute',
    top: responsive.size(10),
    right: responsive.size(10),
    width: responsive.size(16),
    height: responsive.size(16),
    tintColor: Core.primaryColor
  })

}

export default styles
