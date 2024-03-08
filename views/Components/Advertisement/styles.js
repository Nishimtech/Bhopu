import { StyleSheet } from "react-native";
import { Constant, Core } from "../../Home";
const styles = StyleSheet.create({
  viewPagerContainer: (responsive, noRecordFound, topAnim, opacity) => ({
    width: Constant.FULL_WIDTH,
    height: responsive.size(84),
    marginTop: topAnim,
    opacity: opacity,
    marginBottom: responsive.size(noRecordFound ? 20 : 30),
  }),
  viewPager: (responsive, arrOfAdvertisment) => ({
    marginTop: responsive.size(10),
    width: responsive.size(12) * arrOfAdvertisment.length,
    height: responsive.size(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    opacity: arrOfAdvertisment.length > 0 ? 1 : 0
  }),
  viewCrcl: (responsive, selectIdx, idx) => ({
    backgroundColor: selectIdx == idx ? Core.primaryColor : Core.mako,
    width: responsive.size(8),
    height: responsive.size(8),
    borderRadius: responsive.size(4)
  }),
  shimmerContainer: responsive => ({
    height: responsive.size(66),
    width: Constant.FULL_WIDTH - responsive.size(32),
    alignSelf: 'center',
    borderRadius: responsive.size(10),
    overflow: 'hidden'
  }),
  imgContainer: {
    height: '100%',
    width: '100%'
  },
})
export default styles
