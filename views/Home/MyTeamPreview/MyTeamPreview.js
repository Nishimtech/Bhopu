import React, { Fragment, useEffect, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { GradientView, HomeBackground, useResponsiveSizes } from '..';
import styles from './styles';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { API, Config, Constant, Core, Fonts, Images, Utils } from '../../../Helper';
import { AnimatedHArrow } from '../../Components';

const TeamPreview = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [apiCalling, setApiCalling] = useState(false)
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [selected_sports] = useState(route?.params?.selected_sports || undefined)
  const [teamItem] = useState(route?.params?.teamItem || undefined)
  const [rosterData, setRosterData] = useState([])
  const [rosterDataChanges, setRosterDataChanges] = useState([])
  const [editRoster, setEditRoster] = useState([])
  const [selectedData, setSelectedData] = useState({ league: undefined, sports: undefined, lineupData: undefined })
  const [notificationCount] = useState(route?.params?.notificationCount || 0);
  const [userBalance] = useState(route?.params?.userBalance || undefined)

  const backAction = () => {
    navigation.goBack()
  }
  const moveToRoasterScreen = () => {
    navigation.goBack()
    navigation.navigate('RoasterScreen', { rosterData, rosterDataChanges, selectedData, editRoster, notificationCount, userBalance, contestItem, teamItem })
  }
  useEffect(() => {
    GET_LINEUP_MASTER_DATA()
  }, [])
  GET_LINEUP_MASTER_DATA = () => {
    setApiCalling(true)
    API.GET_LINEUP_MASTER_DATA({ 'sports_id': selected_sports?.sports_id || "" }).then(async (response) => {
      let result = response.data;
      setApiCalling(teamItem)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setSelectedData({ league: selectedData.league, sports: selectedData.sports, lineupData: result.data })
        Utils.enableAnimation(300, 1)
        if (teamItem) {
          GET_USER_LINEUP()
        }
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  GET_USER_LINEUP = () => {
    API.GET_USER_LINEUP({ 'user_contest_id': teamItem.user_contest_id, 'collection_id': contestItem?.collection_id || '', 'sports_id': selected_sports?.sports_id || "" }).then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setEditRoster(result.data.lineup);
        GET_ALL_ROSTER()
      }
    }).catch(error => {
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  const getPropsDeatils = (prop_id, item) => {
    return item.props.find((e) => e.prop_id == prop_id)
  }
  GET_ALL_ROSTER = () => {
    let params = { 'collection_id': contestItem?.collection_id || '', 'sports_id': selected_sports?.sports_id || "" }
    API.GET_ALL_ROSTER(params).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        let filterData = result.data.filter((e) => e.props.length > 0)
        setRosterData(filterData)
        let arrayData = [];

        filterData.map((item) => {
          if (teamItem && editRoster.find((e) => e.season_player_id == item.season_player_id)) {
            let editObject = editRoster.find((e) => e.season_player_id == item.season_player_id)
            let propDetails = getPropsDeatils(editObject.prop_id, item)
            const type = editObject.type;
            let data = {
              'max': propDetails.fantasy_points.max,
              'median': editObject.user_points,
              'min': propDetails.fantasy_points.min,
              'over':  editObject.fantasy_points.under,
              'under': editObject.fantasy_points.over,
              'ice_pick': editObject.ice_pick,
              'type': type == 2 ? 1 : 2,
            }
            let object = {
              season_player_id: item.season_player_id,
              prop_id: editObject.prop_id,
              [editObject.prop_id]: {
                'prop_name': getPropsName(editObject.prop_id),
                'prop_id': editObject.prop_id,
                'array_data': [],
                'selected_data': data,
                'change_data': {
                  'max': propDetails.fantasy_points.max,
                  'median': propDetails.fantasy_points.median,
                  'min': propDetails.fantasy_points.min,
                  'over': propDetails.fantasy_points.under,
                  'under': propDetails.fantasy_points.over
                },
                'default_data': {
                  'max': propDetails.fantasy_points.max,
                  'median': propDetails.fantasy_points.median,
                  'min': propDetails.fantasy_points.min,
                  'over': propDetails.fantasy_points.under,
                  'under': propDetails.fantasy_points.over
                }
              }
            }
            arrayData.push(object)
          } else {
            let object = {
              season_player_id: item.season_player_id,
              prop_id: item.props[0].prop_id,
              [item.props[0].prop_id]: {
                'prop_name': getPropsName(item.props[0].prop_id),
                'prop_id': item.props[0].prop_id,
                'array_data': [],
                'selected_data': undefined,
                'change_data': {
                  'max': item.props[0].fantasy_points.max,
                  'median': item.props[0].fantasy_points.median,
                  'min': item.props[0].fantasy_points.min,
                  'over': item.props[0].fantasy_points.under,
                  'under': item.props[0].fantasy_points.over
                },
                'default_data': {
                  'max': item.props[0].fantasy_points.max,
                  'median': item.props[0].fantasy_points.median,
                  'min': item.props[0].fantasy_points.min,
                  'over': item.props[0].fantasy_points.under,
                  'under': item.props[0].fantasy_points.over
                }
              }
            }

            arrayData.push(object)
          }
        })
        Utils.enableAnimation(300, 1)
        onChangeRoster(arrayData)
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  const onChangeRoster = (arrData) => {
    setRosterDataChanges([...arrData])
  };

  const getPropsName = (prop_id) => {
    let sports_props = selectedData.lineupData?.sports_props || [];
    return sports_props.find((e) => e.prop_id == prop_id).short_name
  }
  let selectedArray = (rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == 0))
  let selectedPicksArray = (rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == 1))
  const renderHeader = () => {
    let prize_data = Utils.getWinCalculation(contestItem.prize_distibution_detail);
    return (
      <View style={{ width: '100%' }}>
        <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ alignSelf: 'center', marginTop: responsive.size(20), marginBottom: responsive.size(apiCalling ? 10 : 30), width: '94%', height: responsive.size(38), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: responsive.fontSize(Fonts.xl), color: Core.white, fontFamily: Fonts.medium, textAlign: 'left' }}>{contestItem.contest_title} ({teamItem.team_short_name})</Text>
          <View style={{ height: responsive.size(26), paddingHorizontal: responsive.size(14), borderRadius: responsive.size(60), backgroundColor: '#6B727B', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Image style={{ width: responsive.size(16), height: responsive.size(16), marginRight: responsive.size(6) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} />
            {
              (prize_data.real > 0 || prize_data.bonus > 0 || prize_data.point > 0) ?
                <Fragment>
                  {
                    (prize_data.real > 0) ?
                      <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.regular, textAlign: 'right' }}>{`$${parseFloat(prize_data.real)}`}</Text>
                      :
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(2) }} source={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                        <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.regular, textAlign: 'right' }}>{`${parseFloat(prize_data.point > 0 ? prize_data.point : prize_data.bonus)}`}</Text>
                      </View>
                  }
                </Fragment>
                :
                <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.regular, textAlign: 'right' }}>{`FREEBIE`}</Text>
            }
          </View>
        </GradientView>
        {
          apiCalling ?
            <ActivityIndicator color={Core.primaryColor} />
            :
            <>
              {
                selectedArray.filter((e) => e[e.prop_id].selected_data.ice_pick == 0).map((itm, idx) => {
                  let item = rosterData.find((e) => e.season_player_id == itm.season_player_id)
                  return (
                    <View style={{ alignSelf: 'center', marginBottom: responsive.size(20), width: responsive.width(94), height: responsive.size(76), borderRadius: responsive.size(10) }}>
                      <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ width: '100%', height: '100%', borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), borderWidth: 1, borderColor: "#6A6F76", flexDirection: 'row' }}>
                        <View style={{ paddingTop: responsive.size(15), marginRight: responsive.size(5), width: responsive.width(42), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ flex: 1, maxWidth: responsive.size(90), overflow: 'hidden' }}>
                            {
                              item.jersey ?
                                <Image style={{ width: responsive.size(48), height: responsive.size(35), resizeMode: 'contain' }} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                :
                                <Image style={{ width: responsive.size(48), height: responsive.size(35), resizeMode: 'contain' }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                            }
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ flexShrink: 1, fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.semibold, textAlign: 'left' }}>{item.display_name}</Text>
                          </View>
                          <View style={{ width: 'auto', alignItems: 'center' }}>
                            <Text style={{ alignSelf: 'flex-end', fontSize: responsive.fontSize(Fonts.md), color: '#BEBEBE', fontFamily: Fonts.medium, textAlign: 'left' }}>{`${item.home} vs ${item.away}`}</Text>
                            <Text style={{ marginTop: responsive.size(-2), width: '100%', fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'left' }}>{Utils.getFormatedDateUTC(item.scheduled_date, 'hh:mm A')}</Text>
                          </View>
                        </View>
                        <View style={{ paddingTop: responsive.size(15), marginLeft: responsive.size(5), width: responsive.width(45), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ alignSelf: 'center', width: responsive.size(56), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                            <Text adjustsFontSizeToFit style={{ fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.type == 1 ? 'UNDER' : 'OVER'}</Text>
                            <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -6 : -8), fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.median}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedHArrow is_animated={false} is_down={itm[itm.prop_id].selected_data.type == 1} />
                          </View>
                          <View style={{ alignSelf: 'center', width: responsive.size(60), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                            <Text adjustsFontSizeToFit style={{ fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>FAN PTS</Text>
                            <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -6 : -8), fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.type == 1 ? itm[itm.prop_id].selected_data.under : itm[itm.prop_id].selected_data.over}</Text>
                          </View>
                        </View>
                      </GradientView>
                      <View style={{ position: 'absolute', top: responsive.size(-10), width: '94%', alignSelf: 'center', height: responsive.size(20), paddingHorizontal: responsive.size(1), borderRadius: responsive.size(6), backgroundColor: '#484B50', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={{ height: responsive.size(18), width: responsive.size(28), borderRadius: responsive.size(5), backgroundColor: '#3A3F45', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#6A6F76' }}>
                          <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -1 : -5), fontSize: responsive.fontSize(Fonts.md), color: '#FAD60C', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.position}</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                          <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? 0 : -3), marginRight: responsive.size(10), fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.medium, textAlign: 'right' }}>{getPropsName(itm.prop_id)}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </>
        }
      </View>
    )
  }
  const renderFooter = () => {
    return (
      <View style={{ width: '100%', alignItems: 'center',height:'auto' }}>
        {
          selectedPicksArray.length > 0 &&
          <Fragment>
            <Image style={{ alignSelf: 'center', marginBottom: responsive.size(25) }} source={Images.PNPHEADER} defaultSource={Images.PNPHEADER} />
            <View style={{ width: '94%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              {
                selectedPicksArray.map((itm, idx) => {
                  let item = rosterData.find((e) => e.season_player_id == itm.season_player_id)
                  return (
                    <GradientView key={idx} colors={['rgba(250, 214, 12, 0.01) -7.52%', 'rgba(58, 63, 77, 0.20) 136.72%']} styles={{ alignSelf: 'center', width: '48%',height:'auto',borderRadius: responsive.size(10), overflow: 'visible' }}>
                      <View style={{ borderWidth: 1, borderColor: '#6A6F76', borderRadius: responsive.size(10), flex: 1, paddingVertical: responsive.size(4), paddingLeft: responsive.size(10), paddingRight: responsive.size(5),marginVertical:responsive.size(1) }}>
                        <View style={{ width: '100%', height: responsive.size(60), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ flex: 1, justifyContent: 'center', paddingVertical: responsive.size(4) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                              {
                                item.jersey ?
                                  <Image style={{ width: responsive.size(36), height: responsive.size(26), marginRight: responsive.size(10) ,resizeMode:'contain'}} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                  :
                                  <Image style={{ width: responsive.size(36), height: responsive.size(26), marginRight: responsive.size(10), resizeMode: 'contain' }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                              }
                              <View style={{ justifyContent: 'center',alignItems:'flex-start',alignSelf:'center',marginLeft:responsive.size(15) }}>
                                <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? 5 : 12), fontSize: responsive.fontSize(Fonts.sd), color: '#BEBEBE', fontFamily: Fonts.medium, textAlign: 'left' }}>{`${item.home} vs ${item.away}`}</Text>
                                <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(-1), fontSize: responsive.fontSize(Fonts.ssd), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'left' }}>{Utils.getFormatedDateUTC(item.scheduled_date, 'hh:mm A')}</Text>
                              </View>
                            </View>
                            <Text adjustsFontSizeToFit style={{ flexShrink: 1, fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.semibold, textAlign: 'left'}}>{item.display_name}</Text>
                          </View>
                          {/* <View style={{ width: responsive.size(56), alignItems: 'center', justifyContent: 'flex-end' }} /> */}
                        </View>
                        <View style={{ width: '100%', height: responsive.size(30), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ alignSelf: 'center', width: responsive.size(56), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(30), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                            <Text adjustsFontSizeToFit style={{ fontSize: responsive.fontSize(Fonts.sd), color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.type == 1 ? 'UNDER' : 'OVER'}</Text>
                            <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -6 : -8), fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.median}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedHArrow small={true} is_animated={false} is_down={itm[itm.prop_id].selected_data.type == 1} />
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ position: 'absolute', bottom: responsive.size(4), maxWidth: responsive.size(Platform.OS == 'ios' ? 44 : 70), fontSize: responsive.fontSize(Fonts.ssd), color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{getPropsName(itm.prop_id)}</Text>
                          </View>
                          <View style={{ alignSelf: 'center', width: responsive.size(56), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(30), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                            <Text adjustsFontSizeToFit style={{ fontSize: responsive.fontSize(Fonts.sd), color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>FAN PTS</Text>
                            <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -6 : -8), fontSize: responsive.fontSize(Fonts.md), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{itm[itm.prop_id].selected_data.type == 1 ? itm[itm.prop_id].selected_data.under : itm[itm.prop_id].selected_data.over}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ zIndex: 99, position: 'absolute', left: responsive.size(-8), top: responsive.size(-10), width: responsive.size(20), height: responsive.size(20), borderRadius: responsive.size(10), alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAD60C' }}>
                        <Text adjustsFontSizeToFit style={{ fontSize: responsive.fontSize(Fonts.md), color: '#000', fontFamily: Fonts.semibold, textAlign: 'center' }}>{`P${idx + 1}`}</Text>
                      </View>
                      <View style={{ zIndex: 99, position: 'absolute', alignSelf: 'center', top: responsive.size(-7), paddingHorizontal: responsive.size(5), minWidth: responsive.size(22), height: responsive.size(14), borderRadius: responsive.size(20), alignItems: 'center', justifyContent: 'center', backgroundColor: '#3A3F45', borderWidth: 1, borderColor: '#6A6F76' }}>
                        <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -2 : -4), fontSize: responsive.fontSize(Fonts.sd), color: '#FAD60C', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.position}</Text>
                      </View>
                    </GradientView>
                  )
                })
              }
            </View>
          </Fragment>

        }
      </View>
    )
  }
  const returnAvgPts = () => {
    let selectPtsVal = 0;
    rosterDataChanges.filter((e) => e[e.prop_id].selected_data).map((item) => {
      let selectObj = item[item.prop_id].selected_data;
      selectPtsVal = selectPtsVal + parseFloat(selectObj.type == 1?selectObj.under:selectObj.over)
    })
    return selectPtsVal
  }
  return (
    <HomeBackground title={"My Team"} rightAction={() => backAction()} isCross={true} isRightIcon={true}>
      <View style={{ flex: 1 }}>
        <ListView
          key={"My Team Preview"}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          style={styles.wrapper}
          dataSource={ds.cloneWithRows([])}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
        {
          !apiCalling &&
          <View style={styles.viewBtmBtn(responsive)}>
            <View style={styles.btnPreview(responsive)}>
              <Image source={Images.VIEW_FPTS} defaultSource={Images.VIEW_FPTS} style={{ position: 'absolute', width: '100%', height: '100%' }} />
              <View style={{ position: 'absolute', left: 0, width: responsive.size(4), height: responsive.size(30), borderRadius: responsive.size(10), backgroundColor: Core.primaryColor }} />
              <View>
                <Text style={{ fontSize: responsive.size(14), fontFamily: 'Saira-Medium', color: "#FFF", textAlign: 'left' }}>AVG</Text>
                <Text style={{ marginTop: responsive.size(-7), fontSize: responsive.size(18), fontFamily: 'Saira-SemiBold', color: Core.primaryColor, textAlign: 'left' }}>{parseFloat(parseFloat(returnAvgPts() / ([...selectedArray, ...selectedPicksArray].length)).toFixed(2))}</Text>
              </View>
              <View>
                <Text style={{ fontSize: responsive.size(14), fontFamily: 'Saira-Medium', color: "#FFF", textAlign: 'left' }}>TOTAL</Text>
                <Text style={{ marginTop: responsive.size(-7), fontSize: responsive.size(18), fontFamily: 'Saira-SemiBold', color: Core.primaryColor, textAlign: 'left' }}>{parseFloat(parseFloat(returnAvgPts()).toFixed(2))}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewNext(responsive)} onPress={() => { moveToRoasterScreen() }} >
              <GradientView styles={styles.viewGradientNext(responsive)}>
                <Text style={styles.txtNextBtn(responsive)}>{'Team Edit'}</Text>
              </GradientView>
            </TouchableOpacity>
          </View>
        }
      </View>

    </HomeBackground>
  )

};
export default TeamPreview;
