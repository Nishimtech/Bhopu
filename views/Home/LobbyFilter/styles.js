import { StyleSheet } from "react-native";
import { Core, Fonts } from "../../../Helper";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    imgLeftView: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
    headerContainer: (responsive, backPos) => ({
        width: '90%',
        alignSelf: 'center',
        marginTop: backPos,
        paddingTop: responsive.size(20),
        paddingBottom:responsive.size(110),
        flex: 1
    }),
    txtContest: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        textALign: 'left'
    }),
    viewContestMode: responsive => ({
        width: '100%',
        height: responsive.size(58),
        borderRadius: responsive.size(10),
        marginTop: responsive.size(5),
        backgroundColor: Core.tuna_color,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsive.size(21)
    }),
    touchText: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%'
    },
    viewModePick: (responsive, contest_mode_ids, itm_contest_mode_id) => ({
        width: responsive.size(26),
        height: responsive.size(26),
        borderRadius: responsive.size(8),
        backgroundColor: contest_mode_ids.includes(itm_contest_mode_id) ? Core.primaryColor : Core.input_view_bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: contest_mode_ids.includes(itm_contest_mode_id) ? Core.primaryColor : Core.silver
    }),
    typeView: (responsive, itm_group_id, group_ids) => ({
        width: responsive.size(26),
        height: responsive.size(26),
        borderRadius: responsive.size(8),
        backgroundColor: group_ids.includes(itm_group_id) ? Core.primaryColor : Core.input_view_bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: group_ids.includes(itm_group_id) ? Core.primaryColor : Core.silver
    }),
    imgCorrect: responsive => ({
        tintColor: '#222',
        width: responsive.size(14)
    }),
    txtName: responsive => ({
        marginLeft: responsive.size(6),
        fontSize: responsive.fontSize(Fonts.lg),
        fontFamily: Fonts.medium,
        color: '#FFF',
        textALign: 'left'
    }),
    viewContestType: responsive => ({
        width: '100%',
        marginTop: responsive.size(30)
    }),
    txtApplyFilter: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.semibold,
        color: Core.input_view_bg,
        textALign: 'center'
    }),
    txtEntry: responsive => ({
        fontSize: responsive.fontSize(Fonts.xxl),
        fontFamily: Fonts.medium,
        color: Core.primaryColor,
        textALign: 'left'
    }),
    viewEntryFee: responsive => ({
        width: '100%',
        height: responsive.size(80),
        borderRadius: responsive.size(10),
        marginTop: responsive.size(5),
        backgroundColor: Core.tuna_color,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: responsive.size(14)
    }),
    trackStyle: responsive => ({
        height: responsive.size(6),
        backgroundColor: Core.input_view_bg
    }),
    selectedStyle: {
        backgroundColor: Core.primaryColor
    },
    viewSlider: responsive => ({
        marginTop: responsive.size(5),
        width: responsive.size(16),
        height: responsive.size(16),
        backgroundColor: Core.primaryColor,
        borderRadius: responsive.size(8)
    }),
    viewMinMax: responsive => ({
        marginTop: responsive.size(-12),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    textMin: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        color: '#FFF',
        textALign: 'left'
    }),
    textMax: responsive => ({
        fontSize: responsive.fontSize(Fonts.md),
        fontFamily: Fonts.medium,
        color: '#FFF',
        textALign: 'right'
    }),
    btnFilter: responsive => ({
        width: responsive.size(276),
        height: responsive.size(48),
        borderRadius: responsive.size(14),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    })
})
export default styles
