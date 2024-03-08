import React, { Fragment, useEffect, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { GradientView, HomeBackground, useResponsiveSizes } from '..';
import styles from './styles';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { API, Config, Constant, Core, Fonts, Images, Utils } from '../../../Helper';
import { AnimatedHArrow, ForgotAlert } from '../../Components';
import { EventRegister } from 'react-native-event-listeners';


const TeamPreview = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [rosterData] = useState(route?.params?.rosterData || [])
  const [rosterDataChanges, setRosterDataChanges] = useState(route?.params?.rosterDataChanges || [])
  const [selectedData] = useState(route?.params?.selectedData || undefined)
  const [isRoster] = useState(route?.params?.isRoster || false)
  const [is_live_create] = useState(route?.params?.is_live_create || false)
  const [notificationCount] = useState(route?.params?.notificationCount || 0);
  const [userBalance] = useState(route?.params?.userBalance || undefined)
  const [isVisible, setVisible] = useState(false)
  const [teamJoin, setTeamJoin] = useState(false)
  const [teamItem] = useState(route?.params?.teamItem || undefined)

  useEffect(() => {
    let listener = EventRegister.addEventListener('pnpSelectedData', (data) => {
      setRosterDataChanges(data)
    })
    return () => {
      EventRegister.removeEventListener(listener)
    }
  }, [])
  
  

  const backAction = (is_plug_n_play = false) => {

    if (isRoster && !is_plug_n_play) {
      navigation.navigate('RoasterScreen', { is_live_create, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData, teamItem })
    } else {
      navigation.navigate('PlugNPlay', { is_live_create, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData, teamItem })
    }
  }
  const navigateHomeScreen = (isContest = false) => {
    setVisible(false);
    setTimeout(() => {
      if (!teamItem) {
        EventRegister.emit('joinContest', contestItem)
        if (isContest) { EventRegister.emit('moveContest') } else { EventRegister.emit('moveLobby') }
      }
      navigation.navigate('HomeScreen')
    }, 100);
  }
  const actionEditPlayer = (item, itm) => {
    if (item && itm[itm.prop_id]?.selected_data?.ice_pick == 0) {
      EventRegister.emit('getPlayerInfoRoasterEdit', { arrData: rosterData, arrDataChange: rosterDataChanges, data: item });
      navigation.navigate('RoasterScreen', { teamItem,is_live_create, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData })
    } else if (item && itm[itm.prop_id]?.selected_data?.ice_pick == 1) {
      navigation.navigate('PlugNPlay', { teamItem,is_live_create, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData })
    }
    else{
      backAction(true)
    }
  }
  const returnPlayerParams = () => {
    let array = [];
    rosterDataChanges.filter((e) => e[e.prop_id].selected_data).map((item) => {
      let selectObj = item[item.prop_id].selected_data;
      array.push({
        pl_id: item.season_player_id,
        user_points: selectObj.median,
        type: selectObj.type == 1 ? 2 : 1,
        prediction_points: selectObj.type == 2 ? selectObj.over : selectObj.under,
        ice_pick: selectObj.ice_pick,
        prop_id: item.prop_id
      })
    })
    return array
  }
  const JOIN_GAME = () => {
    setTeamJoin(true)
    if (teamItem) {
      if (is_live_create) {
        let param = {
          user_contest_id: teamItem.user_contest_id,
          round_id: contestItem.current_round,
          players: returnPlayerParams()
        }
        API.CREATE_ROUND_TEAM(param).then(async (response) => {
          let result = response.data;
          if (result.response_code == Constant.SUCCESS_STATUS) {
            setTeamJoin(false)
            EventRegister.emit("moveLiveContest")
            setVisible(true)
          }
        }).catch(error => {
          setTeamJoin(false)
          Utils.handleCatchError(error, navigation)
          return error;
        });
      } else {
        let param = {
          user_contest_id: teamItem.user_contest_id,
          team_name: teamItem.team_short_name,
          contest_id: contestItem.contest_id,
          players: returnPlayerParams(),
          ...(contestItem.current_round && { round_id: contestItem.current_round })
        }
        API.UPDATE_TEAM_LINEUP(param).then(async (response) => {
          let result = response.data;
          if (result.response_code == Constant.SUCCESS_STATUS) {
            setTeamJoin(false)
            setVisible(true)
          }
        }).catch(error => {
          setTeamJoin(false)
          Utils.handleCatchError(error, navigation)
          return error;
        });
      }
    } else {
      let param = {
        contest_id: contestItem.contest_id,
        players: returnPlayerParams()
      }
      API.JOIN_GAME(param).then(async (response) => {
        let result = response.data;
        if (result.response_code == Constant.SUCCESS_STATUS) {
          setTeamJoin(false)
          setVisible(true)
        }
      }).catch(error => {
        setTeamJoin(false)
        Utils.handleCatchError(error, navigation)
        return error;
      });
    }
  }
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
        <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ alignSelf: 'center', marginTop: responsive.size(20), marginBottom: responsive.size(30), width: '94%', height: responsive.size(38), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: responsive.fontSize(Fonts.xl), color: Core.white, fontFamily: Fonts.medium, textAlign: 'left' }}>{contestItem.contest_title}</Text>
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
          selectedArray.filter((e) => e[e.prop_id].selected_data.ice_pick == 0).map((itm, idx) => {
            let item = rosterData.find((e) => e.season_player_id == itm.season_player_id)
            return (
              <View style={{ alignSelf: 'center', marginBottom: responsive.size(20), width: responsive.width(94), height: responsive.size(76), borderRadius: responsive.size(10) }}>
                <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ width: '100%', height: '100%', borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), borderWidth: 1, borderColor: "#6A6F76", flexDirection: 'row' }}>
                  <View style={{ paddingTop: responsive.size(15), marginRight: responsive.size(5), width: responsive.width(42), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, maxWidth: responsive.size(90), overflow: 'hidden' }}>
                      {
                        item.jersey ?
                          <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                          :
                          <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
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
                    <TouchableOpacity onPress={() => actionEditPlayer(item, itm)}>
                      <Image source={Images.EDITIC} defaultSource={Images.EDITIC} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })
        }
        {
          parseInt(contestItem?.player_limit || 0) > selectedArray.length &&
          <TouchableOpacity onPress={() => backAction()} style={{ alignSelf: 'center', marginBottom: responsive.size(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: responsive.size(14), color: Core.primaryColor, textAlign: 'center', fontFamily: 'Saira-SemiBold' }}>+ Add More Player</Text>
          </TouchableOpacity>
        }


      </View>
    )
  }
  const renderFooter = () => {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        {
          ((parseInt(contestItem?.player_limit || 0) == selectedArray.length) || selectedPicksArray.length > 0) &&
          <Fragment>
            <Image style={{ alignSelf: 'center', marginBottom: responsive.size(25) }} source={Images.PNPHEADER} defaultSource={Images.PNPHEADER} />
            <View style={{ width: '94%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              {
                selectedPicksArray.length > 0 && selectedPicksArray.map((itm, idx) => {
                  let item = rosterData.find((e) => e.season_player_id == itm.season_player_id)
                  return (
                    <GradientView key={idx} colors={['rgba(250, 214, 12, 0.01) -7.52%', 'rgba(58, 63, 77, 0.20) 136.72%']} styles={{ alignSelf: 'center', width: '48%', borderRadius: responsive.size(10), overflow: 'visible' }}>
                      <View style={{ borderWidth: 1, borderColor: '#6A6F76', borderRadius: responsive.size(10), flex: 1, paddingVertical: responsive.size(4), paddingLeft: responsive.size(10), paddingRight: responsive.size(5) }}>
                        <View style={{ width: '100%', height: responsive.size(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ flex: 1, justifyContent: 'center', paddingTop: responsive.size(4) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                              {
                                item.jersey ?
                                  <Image style={{ width: responsive.size(36), height: responsive.size(26), marginRight: responsive.size(10) }} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                  :
                                  <Image style={{ width: responsive.size(36), height: responsive.size(26), marginRight: responsive.size(10) }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                              }
                              <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ marginTop: responsive.size(2), width: '100%', fontSize: responsive.fontSize(Fonts.sd), color: '#BEBEBE', fontFamily: Fonts.medium, textAlign: 'left' }}>{`${item.home} vs ${item.away}`}</Text>
                                <Text adjustsFontSizeToFit style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -6 : -8), fontSize: responsive.fontSize(Fonts.ssd), color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'left' }}>{Utils.getFormatedDateUTC(item.scheduled_date, 'hh:mm A')}</Text>
                              </View>
                            </View>
                            <Text adjustsFontSizeToFit style={{ flexShrink: 1, fontSize: responsive.fontSize(Fonts.md), color: Core.white, fontFamily: Fonts.semibold, textAlign: 'left' }}>{item.display_name}</Text>
                          </View>
                          <View style={{ width: responsive.size(56), height: '100%', alignItems: 'flex-end' }} >
                            <TouchableOpacity style={{ width: responsive.size(20), height: responsive.size(20) }} onPress={() => actionEditPlayer(item, itm)}>
                              <Image style={{ width: responsive.size(20), height: responsive.size(20) }} source={Images.EDITIC} defaultSource={Images.EDITIC} />
                            </TouchableOpacity>
                          </View>
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
            {
              selectedPicksArray.length < 2 &&
              <TouchableOpacity onPress={() => backAction(true)} style={{ marginTop: responsive.size(selectedPicksArray.length > 0 ? 20 : 0), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: responsive.size(14), color: Core.primaryColor, textAlign: 'center', fontFamily: 'Saira-SemiBold' }}>+ Add Plug n Play Player</Text>
              </TouchableOpacity>
            }
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
    <HomeBackground title={"Team Preview"} rightAction={() => teamJoin ? {} : backAction()} isCross={true} isRightIcon={true}>
      <View style={{ flex: 1 }} pointerEvents={teamJoin ? "none" : "auto"}>
        <ListView
          key={"TeamPreview"}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          style={styles.wrapper}
          dataSource={ds.cloneWithRows([])}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
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
          <TouchableOpacity disabled={parseInt(contestItem?.player_limit || 0) > selectedArray.length} style={styles.viewNext(responsive)} onPress={() => { JOIN_GAME() }} pointerEvents={parseInt(contestItem?.player_limit || 0) > selectedArray.length ? 'none' : 'auto'}>
            <GradientView colors={parseInt(contestItem?.player_limit || 0) > selectedArray.length ? [Core.light_gray, Core.light_gray] : [Core.primaryColor, Core.gold_tips]} styles={styles.viewGradientNext(responsive)}>
              {
                teamJoin ?
                  <ActivityIndicator color={'#000'} />
                  :
                  <Text style={styles.txtNextBtn(responsive)}>{'Submit'}</Text>
              }
            </GradientView>
          </TouchableOpacity>
        </View>
      </View>
      {
        is_live_create ?
          <ForgotAlert
            openAlert={isVisible} dismissOnTouchOutside={false}
            imgName={Images.POPUPLOGO} autoAdjust={true}
            title={'Congratulations!'} desc={'Team created for next round successfully!'} btnTitle={'My Contest'}
            onDismiss={() => { navigateHomeScreen() }} btnTitle1={'Cancel'} onDismiss1={() => { setVisible(false) }}
          />
          :
          teamItem ?
            <ForgotAlert
              openAlert={isVisible} dismissOnTouchOutside={false}
              imgName={Images.POPUPLOGO} autoAdjust={true}
              title={'Congratulations!'} desc={'Team edited successfully!'} btnTitle={'My Contest'}
              onDismiss={() => { navigateHomeScreen() }} btnTitle1={'Cancel'} onDismiss1={() => { setVisible(false) }}
            />
            :
            <ForgotAlert
              openAlert={isVisible} dismissOnTouchOutside={false}
              imgName={Images.POPUPLOGO} autoAdjust={true}
              title={'Congratulations!'} desc={'Let the hostilities begin!'} btnTitle={'Join Another'}
              onDismiss={() => { navigateHomeScreen() }} btnTitle1={'My Contest'} onDismiss1={() => { navigateHomeScreen(true) }}
            />
      }
    </HomeBackground>
  )

};
export default TeamPreview;
