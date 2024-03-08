import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Text, TouchableOpacity, Image, View, RefreshControl, Platform } from 'react-native';
import { Core, EmptyScreen, GradientView, useResponsiveSizes } from '../../../index';
import styles from './styles';
import { API, Config, Constant, Fonts, Images, Utils } from '../../../../../Helper';
import ListView from "deprecated-react-native-listview";
import TimerCountDown from '../../../../Components/Timer/Timer';
import FastImage from 'react-native-fast-image';
import { ConfirmationJoin } from '../../../../Components';
import { EventRegister } from 'react-native-event-listeners';

const MyContest = ({ notificationCount,tabIdx,userProfile,leagueData, selected_sports,onChangeIndex, navigation,userBalance }) => {
  const responsive = useResponsiveSizes();
  const [sports_id, setSportsID] = useState(0)
  const [selectIdx, setSelectIdx] = useState(0)
  const [apiCalling, setApiCalling] = useState(false)
  const [isRefreshing, setRefreshing] = useState(false)
  const [arrayData, setArrData] = useState({ upcoming: [], live: [], completed: [] })
  const [expandUpcoming, setExpandUpcoming] = useState([]);
  const [expandLive, setExpandLive] = useState([]);
  const [expandCompleted, setExpandCompleted] = useState([]);
  const [leftAnim] = useState(new Animated.Value(0))
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [confirm, setConfirmData] = useState({ isVisible: false, contestItem: undefined })
  
  const moveToLobbyDetail = (item) => {
    navigation.navigate('LobbyDetail', { IsMyContest:true,notificationCount,userBalance,userProfile, contestItem: item })
  }
  const moveToLeaderBoard =(item,itmKey)=>{
    if(itmKey == 'Bracket'){
      navigation.navigate("BracketFlow",{contestItem:item,userProfile,selected_sports})
    }else{
      navigation.navigate(((itmKey != 'H2H' && item.size > 2)?'Leaderboard':'H2HLeaderboard'),{contestItem: item,userProfile,selected_sports}) 
    }
  }
  const moveToRoasterScreen = (contestItem = confirm.contestItem,teamItem=undefined,is_live_create=false) => {
    navigation.navigate('RoasterScreen', { notificationCount,userBalance, contestItem,teamItem,is_live_create })
    setConfirmData({ isVisible: false, contestItem: undefined })
  }
  const moveToMyTeamScreen = (contestItem,teamItem) => {
    navigation.navigate('MyTeam', {contestItem,teamItem,selected_sports,userProfile})
  }
  const moveToTeamPreview = (item,teamItem) => {
    navigation.navigate('MyTeamPreview', { notificationCount,userBalance,selected_sports,contestItem:item,teamItem })
  }
  
  useEffect(() => {
    let listener = EventRegister.addEventListener('joinContest', (item) => {
      setConfirmData({isVisible: false, contestItem: undefined})
      if(selectIdx == 0){
        setApiCalling(true)
        setRefreshing(false)
        setTimeout(() => {
          GET_USER_CONTEST_BY_STATUS()
        }, 300);
      }
    })
    let listener1 = EventRegister.addEventListener('moveLobby', () => {
      if(tabIdx != 1){
        onChangeIndex(1)
      }
    })
    let listener2 = EventRegister.addEventListener('moveLiveContest', () => {
      if(selectIdx == 1){
          setRefreshing(true);
          GET_USER_CONTEST_BY_STATUS()
      }
    })
    return (() => {
      EventRegister.removeEventListener(listener)
      EventRegister.removeEventListener(listener1)
      EventRegister.removeEventListener(listener2)
    })
  }, [])

  useEffect(() => {
    Animated.parallel([
      Animated.timing(leftAnim, { toValue: -Constant.FULL_WIDTH * (selectIdx), duration: 300, easing: Easing.linear }),
    ]).start();
  }, [selectIdx])

  useEffect(() => {
    if (tabIdx == 2) {
      if (sports_id != selected_sports?.sports_id || (selectIdx == 0 && arrayData.upcoming.length == 0) || (selectIdx == 1 && arrayData.live.length == 0) || (selectIdx == 2 && arrayData.completed.length == 0)) {
        if (sports_id != selected_sports?.sports_id) {
          setExpandUpcoming([])
          setExpandLive([])
          setExpandCompleted([])
          let objArray = { upcoming: [], live: [], completed: [] }
          setArrData({ ...objArray })
        }
        setSportsID(selected_sports?.sports_id)
        setApiCalling(true)
        setRefreshing(false)
        setTimeout(() => {
          GET_USER_CONTEST_BY_STATUS()
        }, 300);
      }
    }
  }, [selectIdx, tabIdx, selected_sports])
  GET_USER_CONTEST_BY_STATUS = () => {
    let params = { "sports_id": selected_sports?.sports_id, "status": selectIdx,'type_id': leagueData?.type_id || '' }
    API.GET_USER_CONTEST_BY_STATUS(params).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      setRefreshing(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        if (selectIdx == 0) {
          setArrData({ upcoming: result.data, live: arrayData.live, completed: arrayData.completed })
          let arrayOFkey = Object.keys(result.data || []).filter((e) => Array.isArray(result.data[e]))
          setExpandUpcoming([arrayOFkey[0]]);
        } else if (selectIdx == 1) {
          setArrData({ live: result.data, upcoming: arrayData.upcoming, completed: arrayData.completed })
          let arrayOFkey = Object.keys(result.data || []).filter((e) => Array.isArray(result.data[e]))
          setExpandLive([arrayOFkey[0]]);
        } else if (selectIdx == 2) {
          setArrData({ completed: result.data, upcoming: arrayData.upcoming, live: arrayData.live })
          let arrayOFkey = Object.keys(result.data || []).filter((e) => Array.isArray(result.data[e]))
          setExpandCompleted([arrayOFkey[0]]);
        }
      }
    }).catch(error => {
      setApiCalling(false)
      setRefreshing(false)
      Utils.handleCatchError(error, props.navigation)
      return error;
    });
  }
  const expandItemUpcoming = (value) => {
    Utils.enableAnimation(300, 1)
    if (expandUpcoming.includes(value)) {
      setExpandUpcoming([...expandUpcoming.filter((e) => e != value)]);
    } else {
      setExpandUpcoming([...expandUpcoming, ...[value]]);
    }
  }
  const expandItemLive = (value) => {
    Utils.enableAnimation(300, 1)
    if (expandLive.includes(value)) {
      setExpandLive([...expandLive.filter((e) => e != value)]);
    } else {
      setExpandLive([...expandLive, ...[value]]);
    }
  }

  const expandItemCompleted = (value) => {
    Utils.enableAnimation(300, 1)
    if (expandCompleted.includes(value)) {
      setExpandCompleted([...expandCompleted.filter((e) => e != value)]);
    } else {
      setExpandCompleted([...expandCompleted, ...[value]]);
    }
  }

  const renderHeaderUpComing = () => {
    let arrayOFkey = Object.keys(arrayData?.upcoming || []).filter((e) => Array.isArray(arrayData.upcoming[e]))
    return (
      <View style={{ width: Constant.FULL_WIDTH, height: '100%' }}>
        {
          (apiCalling && selectIdx == 0) ?
            <View style={styles.wrapper}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
            :
            <Fragment>
              {
                arrayOFkey.map(itmKey => {
                  return (
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ alignSelf: 'center', width: '94%', minHeight: responsive.size(40), marginBottom: responsive.size(20), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(5), overflow: 'hidden' }}>
                      <View onStartShouldSetResponder={() => true} onResponderRelease={() => expandItemUpcoming(itmKey)} key={itmKey} style={{ width: '100%', height: responsive.size(40), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsive.size(5) }}>
                        <View style={{ paddingHorizontal: responsive.size(6), height: responsive.size(20), borderRadius: responsive.size(6), backgroundColor: Core[itmKey], alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: responsive.fontSize(Fonts.sd), fontFamily: Fonts.medium, textAlign: 'center', color: '#FFF' }}>{itmKey}</Text>
                        </View>
                        <Image style={{ transform: [{ rotate: expandUpcoming.includes(itmKey) ? '0deg' : '180deg' }] }} source={Images.ARROW_CIRCLE_DOWN} defaultSource={Images.ARROW_CIRCLE_DOWN} />
                      </View>
                      {
                        arrayData.upcoming[itmKey].map((item, idx) => {
                          let prize_data = Utils.getWinCalculation(item.prize_distibution_detail);
                          let widthAnim = new Animated.Value(1)
                          return (
                            <View key={idx} style={{ marginTop: responsive.size((expandUpcoming.includes(itmKey) && idx != 0) ? 5 : 0), marginBottom: responsive.size(expandUpcoming.includes(itmKey) ? 5 : 0), width: '100%', height: expandUpcoming.includes(itmKey) ? 'auto' : 0, backgroundColor: '#292D32', borderRadius: responsive.size(10), overflow: 'hidden' }}>
                              <Image pointerEvents={'none'} style={{ position: 'absolute' }} source={Images.CONTEST_BOX_SHADOW} defaultSource={Images.CONTEST_BOX_SHADOW} />
                              <View style={{ paddingHorizontal: responsive.size(10), width: '100%', paddingTop:responsive.size(10) }}>
                                <View style={{ width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <View style={{ flex: 1 }}>
                                    <Text  onPress={()=>moveToLobbyDetail(item)} style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{item.contest_title}</Text>
                                    <View style={{marginTop:responsive.size(5),alignSelf: 'flex-start', paddingHorizontal: responsive.size(14), height: responsive.size(26), borderRadius: responsive.size(60), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(250, 250, 250, 0.15)' }}>
                                      <Image style={{ marginRight: responsive.size(4), width: responsive.size(18), height: responsive.size(18) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} />
                                      {
                                        (prize_data.real > 0 || prize_data.bonus > 0 || prize_data.point > 0) ?
                                          <Fragment>
                                            {
                                              (prize_data.real > 0) ?
                                                <Text style={{ fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAFAFA' }}>{`$${parseFloat(prize_data.real)}`}</Text>
                                                :
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                  <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(3) }} source={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAFAFA' }}>{`${parseFloat(prize_data.point > 0 ? prize_data.point : prize_data.bonus)}`}</Text>
                                                </View>
                                            }
                                          </Fragment>
                                          :
                                          <Text style={{ fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAFAFA' }}>{'FREEBIE'}</Text>
                                      }
                                    </View>
                                  </View>
                                  <View style={{ alignItems: 'flex-end' }}>
                                    <TimerCountDown scheduleDate={item.scheduled_date} fontSize={responsive.fontSize(Fonts.xl)} lineHeight={responsive.fontSize(Fonts.xl_lineheight)} />
                                    <Text style={{ fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE' }}>{Utils.getCompareDateUTC(item.scheduled_date, "ddd, HH:mm A")}</Text>
                                  </View>
                                </View>
                                <View style={{ marginTop: responsive.size(14), width: '100%', height: responsive.size(6), borderRadius: responsive.size(60), backgroundColor: 'rgba(250, 214, 12, 0.20)', alignSelf: 'center', overflow: 'hidden' }}>
                                  <Animated.View style={{ width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${parseInt(item.total_user_joined) / (parseInt(item.size) / 100)}%`], }), height: '100%', backgroundColor: Core.primaryColor }} />
                                </View>
                                <View style={{ marginTop: responsive.size(5), width: '100%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: '#fff', textAlign: 'left', fontFamily: Fonts.regular }}>{item.total_user_joined} / <Text style={{ color: Core.silver }}>{item.size} {Utils._i18n("Entries")}</Text></Text>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: Core.silver, textAlign: 'right', fontFamily: Fonts.regular }}>{Utils._i18n("min")} {item.minimum_size}</Text>
                                </View>
                                <View style={styles.viewBtmItm(responsive,false)}>
                                  <View style={styles.viewBtm}>
                                    <View style={styles.viewPick(responsive)}>
                                      <Text style={styles.txtPick(responsive)}>{item.contest_mode}</Text>
                                    </View>
                                    <View style={styles.viewM(responsive)}>
                                      <Text style={styles.txtM(responsive)}>{item.group_type == 1 ? "D" : item.group_type == 2 ? "W" : item.group_type == 3 ? "Y" : "L"}</Text>
                                    </View>
                                    {
                                      item.guaranteed_prize == 1 &&
                                      <View  style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>G</Text>
                                      </View>
                                    }
                                    {
                                      item.multiple_lineup > 1 &&
                                      <View style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>M</Text>
                                      </View>
                                    }
                                    {
                                      item.is_private_contest == 1 &&
                                      <View  style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>P</Text>
                                      </View>
                                    }
                                  </View>
                                  <View style={styles.viewEntry}>
                                    <Text style={styles.txtEntry(responsive)}>{Utils._i18n("Entry")}</Text>
                                    <TouchableOpacity disabled={(item.total_user_joined == item.size || item.multiple_lineup == 1)} onPress={() => { item.entry_fee == 0 ? moveToRoasterScreen(item) : setConfirmData({ isVisible: true, contestItem: item }) }}>
                                      <GradientView colors={(item.total_user_joined == item.size || item.multiple_lineup == 1)?['#999','#999']:['#FAD60C', '#D8BA13']} styles={styles.viewFree(responsive)}>
                                        {
                                          (item.currency_type == 1) ?
                                            <Text style={styles.txtFree(responsive)}>{`$${item.entry_fee}`}</Text>
                                            :
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                              <Image style={{ width: responsive.size(14), height: responsive.size(14), marginRight: responsive.size(3) }} source={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                              <Text style={styles.txtFree(responsive)}>{`${item.entry_fee}`}</Text>
                                            </View>
                                        }
                                      </GradientView>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                {
                                  item.teams.map((teamItem, teamIdx) => {
                                    return (
                                      <View key={teamIdx} style={{ borderTopWidth: 1, borderTopColor: '#40454A', paddingHorizontal: responsive.size(10), width: '100%', height: responsive.size(40), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                          <Image style={styles.imgTrophy(responsive)} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} />
                                          <Text style={{ marginLeft: responsive.size(4), fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{userProfile.user_name}: #{teamItem.team_short_name}</Text>
                                        </View>
                                        {
                                          itmKey == 'Bracket' &&
                                            <View style={{ flex: 1,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'center', color: '#BEBEBE' }}>Round {teamItem.round_id}</Text>
                                            </View>
                                        }
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                          <TouchableOpacity onPress={() => moveToRoasterScreen(item,teamItem)} style={{ marginRight: responsive.size(8) }} >
                                            <Image style={{ width: responsive.size(24), height: responsive.size(24) }} source={Images.EDITIC} defaultSource={Images.EDITIC} />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => moveToTeamPreview(item,teamItem)}>
                                            <Image style={{ width: responsive.size(24), height: responsive.size(24) }} source={Images.EYE_BG} defaultSource={Images.EYE_BG} />
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                              <Image style={{position:'absolute',right:'30%',bottom:responsive.size(15)}} pointerEvents={'none'} source={Images[selected_sports.sports_name]} defaultSource={Images[selected_sports.sports_name]}/>
                            </View>
                          )
                        })
                      }
                    </GradientView>
                  )
                })
              }
            </Fragment>
        }
      </View>
    )
  }
  const renderHeaderLive = () => {
    let arrayOFkey = Object.keys(arrayData?.live || []).filter((e) => Array.isArray(arrayData.live[e]))
    return (
      <View style={{ width: Constant.FULL_WIDTH, height: '100%' }}>
        {
          (apiCalling && selectIdx == 1) ?
            <View style={styles.wrapper}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
            :
            <Fragment>
              {
                arrayOFkey.map(itmKey => {
                  return (
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ alignSelf: 'center', width: '94%', minHeight: responsive.size(40), marginBottom: responsive.size(20), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(5), overflow: 'hidden' }}>
                      <View onStartShouldSetResponder={() => true} onResponderRelease={() => expandItemLive(itmKey)} key={itmKey} style={{ width: '100%', height: responsive.size(40), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsive.size(5) }}>
                        <View style={{ paddingHorizontal: responsive.size(6), height: responsive.size(20), borderRadius: responsive.size(6), backgroundColor: Core[itmKey], alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: responsive.fontSize(Fonts.sd), fontFamily: Fonts.medium, textAlign: 'center', color: '#FFF' }}>{itmKey}</Text>
                        </View>
                        <Image style={{ transform: [{ rotate: expandLive.includes(itmKey) ? '0deg' : '180deg' }] }} source={Images.ARROW_CIRCLE_DOWN} defaultSource={Images.ARROW_CIRCLE_DOWN} />
                      </View>
                      {
                        arrayData.live[itmKey].map((item, idx) => {
                          return (
                            <View key={idx} style={{ marginTop: responsive.size((expandLive.includes(itmKey) && idx != 0) ? 5 : 0), marginBottom: responsive.size(expandLive.includes(itmKey) ? 5 : 0), width: '100%', height: expandLive.includes(itmKey) ? 'auto' : 0, backgroundColor: '#292D32', borderRadius: responsive.size(10), overflow: 'hidden' }}>
                              <Image pointerEvents={'none'} style={{ position: 'absolute' }} source={Images.CONTEST_BOX_SHADOW} defaultSource={Images.CONTEST_BOX_SHADOW} />
                              <View style={{ paddingHorizontal: responsive.size(10), width: '100%' }}>
                                <View style={{ width: '100%', paddingTop: responsive.size(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{item.contest_title}</Text>
                                  <TouchableOpacity onPress={()=>moveToLeaderBoard(item,itmKey)} style={{ alignItems: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={Images.RANKING_ACTIVE} defaultSource={Images.RANKING_ACTIVE} />
                                    <Text style={{ marginLeft: responsive.size(6), fontSize: responsive.fontSize(Fonts.lg), lineHeight: responsive.fontSize(Fonts.lg_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE' }}>{'Leaderboard'}</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.viewBtmItm(responsive, false)}>
                                  <View style={styles.viewBtm}>
                                    <View style={styles.viewPick(responsive)}>
                                      <Text style={styles.txtPick(responsive)}>{item.contest_mode}</Text>
                                    </View>
                                    <View style={styles.viewM(responsive)}>
                                      <Text style={styles.txtM(responsive)}>{item.group_type == 1 ? "D" : item.group_type == 2 ? "W" : item.group_type == 3 ? "Y" : "L"}</Text>
                                    </View>
                                    {
                                      item.guaranteed_prize == 1 &&
                                      <View style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>G</Text>
                                      </View>
                                    }
                                    {
                                      item.multiple_lineup > 1 &&
                                      <View style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>M</Text>
                                      </View>
                                    }
                                    {
                                      item.is_private_contest == 1 &&
                                      <View  style={styles.viewM(responsive)}>
                                        <Text style={styles.txtM(responsive)}>P</Text>
                                      </View>
                                    }
                                  </View>
                                </View>
                                <View style={{ marginTop: responsive.size(5),marginBottom: responsive.size(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FFF' }}>{'Team'}</Text>
                                  {
                                      itmKey == 'Bracket'&&
                                        <Text style={{ marginLeft:'15%',fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FFF' }}>{'Round'}</Text>

                                  }
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FFF' }}>{itmKey == 'Bracket'?'Total Won':'Rank'}</Text>
                                </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                {
                                  item.teams.map((teamItem, teamIdx) => {
                                    return (
                                      <View key={teamIdx} style={{ borderTopWidth: 1, borderTopColor: '#40454A', paddingHorizontal: responsive.size(10), width: '100%', height: responsive.size(54), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TouchableOpacity  onPress={() => (itmKey == 'Bracket' && item.last_round_winner != 0  && item.current_round != item.last_round && Utils.getLiveStatus(item.next_round_date))?moveToRoasterScreen(item,teamItem,!(item.current_round==teamItem.round_id && Utils.getLiveStatus(item.next_round_date))):moveToMyTeamScreen(item,teamItem)} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                          <FastImage style={{ width: responsive.size(36), height: responsive.size(36), borderRadius: responsive.size(18), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly }} />
                                          {
                                              (itmKey == 'Bracket'  && Utils.getLiveStatus(item.next_round_date))?
                                              <View style={{marginLeft: responsive.size(4),flex:1}}>
                                                  {
                                                    item.last_round_winner == 0 ?
                                                    <>
                                                      <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{userProfile.user_name} ({teamItem.team_short_name})</Text>
                                                      <Text style={{ marginTop:responsive.size(-5),fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAD60C' }}>Eliminated</Text>
                                                    </>
                                                    :item.current_round == item.last_round?
                                                      <>
                                                        <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{userProfile.user_name} ({teamItem.team_short_name})</Text>
                                                        <Text style={{ marginTop:responsive.size(-5),fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAD60C' }}>My Team</Text>
                                                      </>
                                                    :
                                                    <Text style={{ fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAD60C' }}>{(item.current_round==teamItem.round_id && Utils.getLiveStatus(item.next_round_date))?"Edit Team":"Create Team"}</Text>
                                                  }
                                              </View>
                                              :
                                              <Text style={{ marginLeft: responsive.size(4),fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FAD60C' }}>{userProfile.user_name} ({teamItem.team_short_name})</Text>

                                          }
                                        </TouchableOpacity>
                                        {
                                            itmKey == 'Bracket'&&
                                              <View style={{width:'13%',alignItems:'flex-end'}}>
                                                  <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'center', color: '#FFF' }}>{item.current_round}/{item.total_round}</Text>
                                              </View>
                                        }
                                        <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                          <TouchableOpacity onPress={()=>moveToLeaderBoard(item,itmKey)}>
                                            <GradientView styles={{ alignSelf: 'flex-end', flexDirection: 'row', paddingHorizontal: responsive.size(11), alignItems: 'center', height: responsive.size(34), borderRadius: responsive.size(10) }}>
                                              {
                                                itmKey == 'Bracket'?
                                                <>
                                                   {
                                                      (teamItem.prize_data && teamItem.prize_data.length > 0 && teamItem.prize_data[0].prize_type == 1)?
                                                         <Text style={{ marginTop:Platform.OS=='ios'?0:responsive.size(-4),fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$${parseFloat(parseFloat(teamItem.prize_data[0].amount).toFixed(1))}`}</Text>
                                                      : (teamItem.prize_data && teamItem.prize_data.length > 0) ?
                                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Image style={{ width: responsive.size(20), height: responsive.size(20), marginRight: responsive.size(5) }} source={teamItem.prize_data[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                            <Text style={{ marginTop:Platform.OS=='ios'?0:responsive.size(-4),fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`${parseFloat(parseFloat(teamItem.prize_data[0].amount).toFixed(1))}`}</Text>
                                                      </View>
                                                      :
                                                      <Text style={{ marginTop:Platform.OS=='ios'?0:responsive.size(-4),fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$0`}</Text>
                                                    }
                                                </>
                                                :
                                                <>
                                                  <Image style={{ tintColor: '#222', width: responsive.size(18), height: responsive.size(18), marginRight: responsive.size(6) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} />
                                                  <Text style={{ marginTop:Platform.OS=='ios'?0:responsive.size(-4),fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{teamItem.game_rank}</Text>
                                                </>
                                              }
                                            </GradientView>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                              <Image style={{position:'absolute',right:'30%',bottom:responsive.size(15)}} pointerEvents={'none'} source={Images[selected_sports.sports_name]} defaultSource={Images[selected_sports.sports_name]}/>
                            </View>
                          )
                        })
                      }
                      {
                          (itmKey == 'Bracket' && arrayData.live[itmKey][arrayData.live[itmKey].length-1].last_round_winner != 0  && arrayData.live[itmKey][arrayData.live[itmKey].length-1].current_round != arrayData.live[itmKey][arrayData.live[itmKey].length-1].last_round)&&
                            <View style={{width:'100%',marginBottom:responsive.size(4),paddingLeft:responsive.size(4),height:responsive.size(20),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE' }}>{`Round ${arrayData.live[itmKey][0].current_round} Starts in`}</Text>
                                <TimerCountDown colorTimer={'#FAD60C'} scheduleDate={arrayData.live[itmKey][0].next_round_date} fontSize={responsive.fontSize(Fonts.md)} lineHeight={responsive.fontSize(Fonts.md_lineheight)} />
                            </View>
                      }
                    </GradientView>
                  )
                })
              }
            </Fragment>
        }
      </View>
    )
  }

  const renderHeaderCompleted = () => {
    let arrayOFkey = Object.keys(arrayData?.completed || []).filter((e) => Array.isArray(arrayData.completed[e]))
    return (
            <View style={{width: Constant.FULL_WIDTH,height:'100%'}}>
        {
          (apiCalling && selectIdx == 2) ?
            <View style={{flex:1,width:Constant.FULL_WIDTH}}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
            :
            <Fragment>
              {
                arrayOFkey.map(itmKey => {
                  return (
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ alignSelf: 'center', width: '94%', minHeight: responsive.size(40), height:'auto',marginBottom: responsive.size(20), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(5), overflow: 'hidden' }}>
                      <View onStartShouldSetResponder={() => true} onResponderRelease={() => expandItemCompleted(itmKey)} key={itmKey} style={{ width: '100%', height: responsive.size(40), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsive.size(5) }}>
                        <View style={{ paddingHorizontal: responsive.size(6), height: responsive.size(20), borderRadius: responsive.size(6), backgroundColor: Core[itmKey], alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: responsive.fontSize(Fonts.sd), fontFamily: Fonts.medium, textAlign: 'center', color: '#FFF' }}>{itmKey}</Text>
                        </View>
                        <Image style={{ transform: [{ rotate: expandCompleted.includes(itmKey) ? '0deg' : '180deg' }] }} source={Images.ARROW_CIRCLE_DOWN} defaultSource={Images.ARROW_CIRCLE_DOWN} />
                      </View>
                      {
                        arrayData.completed[itmKey].map((item, idx) => {
                          let prize_data = Utils.getWinTeamCalculation(item.teams);
                          return (
                            <View key={idx} style={{ marginTop: responsive.size((expandCompleted.includes(itmKey) && idx != 0) ? 5 : 0), marginBottom: responsive.size(expandCompleted.includes(itmKey) ? 5 : 0), width: '100%', height: expandCompleted.includes(itmKey) ? 'auto' : 0, backgroundColor: '#292D32', borderRadius: responsive.size(10), overflow: 'hidden' }}>
                              <Image pointerEvents={'none'} style={{ position: 'absolute' }} source={Images.CONTEST_BOX_SHADOW} defaultSource={Images.CONTEST_BOX_SHADOW} />
                              <View style={{ paddingHorizontal: responsive.size(10), width: '100%' }}>
                                <View style={{ width: '100%', paddingTop: responsive.size(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{item.contest_title}</Text>
                                    <View style={{ marginTop: responsive.size(7), alignItems: 'center', flexDirection: 'row' }}>
                                      <View style={styles.viewPick(responsive)}>
                                        <Text style={styles.txtPick(responsive)}>{item.contest_mode}</Text>
                                      </View>
                                      {
                                        itmKey != 'Bracket' &&
                                          <Text style={{ marginLeft: responsive.size(12), fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAD60C' }}>{item.teams.length > 1 ? `${item.teams.length} Teams` : `${item.teams.length} Team`}</Text>
                                      }
                                    </View>
                                    <Text style={{ marginTop: responsive.size(7), fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE' }}>{Utils.getCompareDateUTC(item.scheduled_date, "dd MMM, HH:mm A")}</Text>
                                  </View>
                                  <View style={{alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={()=>moveToLeaderBoard(item,itmKey)}>
                                      <GradientView styles={{ width: responsive.size(74), height: responsive.size(64), borderRadius: responsive.size(10), alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: responsive.fontSize(Fonts.ssd), lineHeight: responsive.fontSize(Fonts.ssd_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#222' }}>{'Total Won'}</Text>
                                        {
                                          (prize_data.real > 0 || prize_data.bonus > 0 || prize_data.point > 0) ?
                                            <Fragment>
                                              {
                                                (prize_data.real > 0) ?
                                                  <Text style={{ fontSize: responsive.fontSize(Fonts.xxxl), lineHeight: responsive.fontSize(Fonts.xxxl_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#222' }}>{`$${parseFloat(parseFloat(prize_data.real).toFixed(1))}`}</Text>
                                                  :
                                                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image style={{ width: responsive.size(20), height: responsive.size(20), marginRight: responsive.size(4) }} source={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                    <Text style={{ fontSize: responsive.fontSize(Fonts.xxxl), lineHeight: responsive.fontSize(Fonts.xxxl_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#222' }}>{`${parseFloat(parseFloat(prize_data.point > 0 ? prize_data.point : prize_data.bonus).toFixed(1))}`}</Text>
                                                  </View>
                                              }
                                            </Fragment>
                                            :
                                            <Text style={{ fontSize: responsive.fontSize(Fonts.lg), lineHeight: responsive.fontSize(Fonts.lg_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#222' }}>{'$0'}</Text>
                                        }
                                      </GradientView>
                                    </TouchableOpacity>
                                    {
                                      (item.currency_type == 1) ?
                                        <Text style={{marginTop: responsive.size(10), fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE'}}>{`$${item.entry_fee} Entry`}</Text>
                                        :
                                        <View style={{ marginTop: responsive.size(10),flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                          <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(5) }} source={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                          <Text style={{fontSize: responsive.fontSize(Fonts.md),lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE'}}>{`${item.entry_fee} Entry`}</Text>
                                        </View>
                                    }
                                  </View>
                                </View>
                                <View style={{ marginTop: responsive.size(10), marginBottom: responsive.size(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FFF' }}>{'Team'}</Text>
                                  <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FFF' }}>{itmKey == 'Bracket'?'Final Round':'Won'}</Text>
                                </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                {
                                  item.teams.map((teamItem, teamIdx) => {
                                    return (
                                      <View key={teamIdx} style={{ borderTopWidth: 1, borderTopColor: '#40454A', paddingHorizontal: responsive.size(10), width: '100%', height: responsive.size(54), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                          <FastImage style={{ width: responsive.size(36), height: responsive.size(36), borderRadius: responsive.size(18), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly }} />
                                          <Text style={{ marginLeft: responsive.size(4), fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FAD60C' }}>{userProfile.user_name} ({teamItem.team_short_name})</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                          {
                                            itmKey == 'Bracket'?
                                            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', paddingHorizontal: responsive.size(11), alignItems: 'center', height: responsive.size(34)}}>
                                                    <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#FAD60C' }}>{teamItem.round_id}/<Text style={{color:'#FFF'}}>{item.total_round}</Text></Text>
                                            </View>
                                            :
                                            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', paddingHorizontal: responsive.size(11), alignItems: 'center', height: responsive.size(34), borderRadius: responsive.size(10),backgroundColor:'#393E49',borderWidth:1,borderColor:'#FAD60C'}}>
                                              {
                                                teamItem.prize_data && teamItem.prize_data.length > 0 && teamItem.prize_data[0].prize_type == 1?
                                                  <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#FAD60C' }}>{`$${parseFloat(parseFloat(teamItem.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                                : teamItem.prize_data && teamItem.prize_data.length > 0 ?
                                                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                      <Image style={{ width: responsive.size(16), height: responsive.size(16), marginRight: responsive.size(5) }} source={teamItem.prize_data[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                      <Text style={{ fontSize: responsive.fontSize(Fonts.xl),lineHeight: responsive.fontSize(Fonts.xl_lineheight), fontFamily: Fonts.medium, textAlign: 'left', color: '#FAD60C'}}>{`${parseFloat(parseFloat(teamItem.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                                </View>
                                                :
                                                  <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#FAD60C' }}>{`$0`}</Text>
                                              }
                                            </View>
                                          }
                                        </View>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                              <Image style={{position:'absolute',right:'30%',bottom:responsive.size(15)}} pointerEvents={'none'} source={Images[selected_sports.sports_name]} defaultSource={Images[selected_sports.sports_name]}/>
                            </View>
                          )
                        })
                      }
                    </GradientView>
                  )
                })
              }
            </Fragment>
        }
      </View>
    )
  }
  const listViewUpcoming = useMemo(() => {
    let arrayOFkey = Object.keys(arrayData?.upcoming || []).filter((e) => Array.isArray(arrayData.upcoming[e]))
    return (
      <Fragment>
        {
          (apiCalling || arrayOFkey.length > 0) ?
            <ListView
              key={"MyContestUpcoming"}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={{ width: '100%', height: '100%' }}
              dataSource={ds.cloneWithRows([])}
              renderFooter={() => { return <View style={styles.footer(responsive)} /> }}
              renderHeader={renderHeaderUpComing}
              removeClippedSubviews={!(Platform.OS == "ios")}
              refreshControl={
                <RefreshControl
                  tintColor={Core.primaryColor}
                  refreshing={isRefreshing}
                  onRefresh={()=>{setRefreshing(true);GET_USER_CONTEST_BY_STATUS()}}
                />
              }
            />
            : (!apiCalling && arrayOFkey.length == 0) &&
            <View style={{ flex:1,width: '100%',marginBottom:responsive.size(212),alignItems:'center',justifyContent:'center' }}>
              <EmptyScreen title={"No Upcoming Contests."} btnAction={() => onChangeIndex(1)} btnTitle={"Join Now!"} />
            </View>
        }
      </Fragment>
    )
  }, [apiCalling, arrayData?.upcoming, expandUpcoming]);

  const listViewLive = useMemo(() => {
    let arrayOFkey = Object.keys(arrayData?.live || []).filter((e) => Array.isArray(arrayData.live[e]))
    return (
      <Fragment>
        {
          (apiCalling || arrayOFkey.length > 0) ?
            <ListView
              key={"MyContestLive"}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={{ width: '100%', height: '100%' }}
              dataSource={ds.cloneWithRows([])}
              renderFooter={() => { return <View style={styles.footer(responsive)} /> }}
              renderHeader={renderHeaderLive}
              removeClippedSubviews={!(Platform.OS == "ios")}
              refreshControl={
                <RefreshControl
                  tintColor={Core.primaryColor}
                  refreshing={isRefreshing}
                  onRefresh={()=>{setRefreshing(true);GET_USER_CONTEST_BY_STATUS()}}
                />
              }
            />
            : (!apiCalling && arrayOFkey.length == 0) &&
            <View style={{ flex:1,width: '100%',marginBottom:responsive.size(212),alignItems:'center',justifyContent:'center' }}>
              <EmptyScreen title={"No Live Contests."} btnAction={() => onChangeIndex(1)} btnTitle={"Contest Lobby"} />
            </View>
        }
      </Fragment>
    )
  }, [apiCalling, arrayData?.live, expandLive]);

  const listViewCompleted = useMemo(() => {
    let arrayOFkey = Object.keys(arrayData?.completed || []).filter((e) => Array.isArray(arrayData.completed[e]))
    return (
      <Fragment>
        {
          (apiCalling || arrayOFkey.length > 0) ?
            <ListView
              key={"MyContestCompleted"}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={{ width: '100%', height: '100%' }}
              dataSource={ds.cloneWithRows([])}
              renderFooter={() => { return <View style={styles.footer(responsive)} /> }}
              renderHeader={renderHeaderCompleted}
              removeClippedSubviews={!(Platform.OS == "ios")}
              refreshControl={
                <RefreshControl
                  tintColor={Core.primaryColor}
                  refreshing={isRefreshing}
                  onRefresh={()=>{setRefreshing(true);GET_USER_CONTEST_BY_STATUS()}}
                />
              }
            />
            : (!apiCalling && arrayOFkey.length == 0) &&
            <View style={{ flex:1,width: '100%',marginBottom:responsive.size(212),alignItems:'center',justifyContent:'center' }}>
              <EmptyScreen title={"No Completed Contests."} btnAction={() => onChangeIndex(1)} btnTitle={"Contest Lobby"} />
            </View>
        }
      </Fragment>
    )
  }, [apiCalling, arrayData?.completed, expandCompleted]);
  return (
    <View style={styles.container}>
      <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ marginBottom: responsive.size(16), paddingHorizontal: responsive.size(5), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', width: '94%', marginTop: responsive.size(20), height: responsive.size(48), borderRadius: responsive.size(10) }}>
        <TouchableOpacity onPress={() => setSelectIdx(0)} style={{ width: '33%', height: responsive.size(38), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: selectIdx == 0 ? 1 : 0, borderColor: Core.primaryColor, borderRadius: responsive.size(10) }}>
          <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.medium, color: selectIdx == 0 ? Core.primaryColor : '#BEBEBE', textAlign: 'center' }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectIdx(1)} style={{ width: '33%', height: responsive.size(38), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: selectIdx == 1 ? 1 : 0, borderColor: Core.primaryColor, borderRadius: responsive.size(10) }}>
          <View style={{ marginRight: responsive.size(6), width: responsive.size(6), height: responsive.size(6), borderRadius: responsive.size(3), backgroundColor: '#F42D2D' }} />
          <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.medium, color: selectIdx == 1 ? Core.primaryColor : '#BEBEBE', textAlign: 'center' }}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectIdx(2)} style={{ width: '33%', height: responsive.size(38), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: selectIdx == 2 ? 1 : 0, borderColor: Core.primaryColor, borderRadius: responsive.size(10) }}>
          <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.medium, color: selectIdx == 2 ? Core.primaryColor : '#BEBEBE', textAlign: 'center' }}>Completed</Text>
        </TouchableOpacity>
      </GradientView>
      <Animated.View style={{ width: Constant.FULL_WIDTH*3, marginLeft: leftAnim, flexDirection: 'row', height: '100%' }}>
        <View style={{flex:1,width: Constant.FULL_WIDTH, }}>
          {listViewUpcoming}
        </View>
        <View style={{flex:1,width: Constant.FULL_WIDTH, }}>
          {listViewLive}
        </View>
        <View style={{flex:1,width: Constant.FULL_WIDTH, }}>
          {listViewCompleted}
        </View>
      </Animated.View>
      <ConfirmationJoin userProfile={userProfile} userBalance={userBalance} contestItem={confirm.contestItem} openAlert={confirm.isVisible} actionBtn={() => moveToRoasterScreen()} onDismiss={() => setConfirmData({...{isVisible: false, contestItem: undefined}})} />
    </View>
  )

};
export default MyContest;
