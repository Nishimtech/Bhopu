import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Easing, View, Animated, Text, Platform, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { API, Advertisement, Constant, Core, EmptyScreen, GradientView, Images, Utils, useResponsiveSizes } from '../../../index';
import ListView from "deprecated-react-native-listview";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import TimerCountDown from '../../../../Components/Timer/Timer';
import styles from './styles';
import { EventRegister } from 'react-native-event-listeners'
import { ConfirmationJoin } from '../../../../Components';
import * as Animatable from 'react-native-animatable';
import Tooltip from 'rn-tooltip';


const Lobby = ({ notificationCount, tabIdx, userProfile, selected_sports, leagueData, onChangeIndex, navigation, userBalance }) => {
  const scrollViewRef = useRef()
  const responsive = useResponsiveSizes();
  const [lobbyData, setLobbyData] = useState([{ isEmpty: true }])
  const [mainData, setMainData] = useState([])
  const [filterData, setFilterData] = useState(undefined)
  const [rightAnim] = useState(new Animated.Value(0))
  const [applyFilter, setApplyFilter] = useState(undefined)
  const [opacityAnim] = useState(new Animated.Value(0))
  const [apiCalling, setApiCalling] = useState(true)
  const [isRefreshing, setRefreshing] = useState(false)
  const [confirm, setConfirmData] = useState({ isVisible: false, contestItem: undefined })
  const [sports_id, setSportsID] = useState(0)
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

  useEffect(() => {
    updateFilterData()
  }, [applyFilter])
  useEffect(() => {
    let listener = EventRegister.addEventListener('filterData', (obj) => {
      setApplyFilter(obj)
    })
    let listener1 = EventRegister.addEventListener('joinContest', (item) => {
      setConfirmData({ isVisible: false, contestItem: undefined })
      GET_LOBBY_FIXTURE(true)
    })
    let listener2 = EventRegister.addEventListener('moveContest', () => {
      if (tabIdx != 2) {
        onChangeIndex(2)
      }
    })
    return (() => {
      EventRegister.removeEventListener(listener)
      EventRegister.removeEventListener(listener1)
      EventRegister.removeEventListener(listener2)
    })
  }, [])
  const loadAPIRemains = async () => {
    await Promise.all([
      GET_LOBBY_FIXTURE(),
      GET_LOBBY_FILTER()
    ])
  }
  const onRefresh = () => {
    setRefreshing(true)
    GET_LOBBY_FIXTURE(true)
  }
  useEffect(() => {
    if (tabIdx > 0) {
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: tabIdx != 1 ? 0 : 1, duration: 100, easing: Easing.linear }),
      ]).start();
      if (tabIdx == 1) {
        if (lobbyData.length > 0) {
          scrollViewRef?.current.scrollTo({ y: 0, animated: true }, 0);
        }
        if (selected_sports && sports_id != selected_sports.sports_id) {
          setSportsID(selected_sports?.sports_id || 0)
          setApiCalling(true)
          setLobbyData([{ isEmpty: true }])
        }
      }
    }
  }, [tabIdx, selected_sports])

  GET_LOBBY_FIXTURE = (is_force_load = false) => {
    API.GET_LOBBY_FIXTURE({ 'sports_id': selected_sports?.sports_id || '', 'type_id': leagueData?.type_id || '' }).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      setRefreshing(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        Utils.enableAnimation(100, 2)
        setMainData(result?.data?.fixture_list || [])
        if (is_force_load) {
          updateFilterData(result?.data?.fixture_list || [])
        }
      }
    }).catch(error => {
      setApiCalling(false)
      setRefreshing(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  GET_LOBBY_FILTER = () => {
    API.GET_LOBBY_FILTER({ 'sports_id': selected_sports?.sports_id || '', 'type_id': leagueData?.type_id || '' }).then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        if (result?.data) {
          setTimeout(() => {
            setApplyFilter({
              contest_mode_ids: [],
              group_ids: [],
              min_entry: 0,
              min_prize: 0,
              min_user: 0,
              max_entry: result?.data?.contest_filter.max_entry_fee,
              // max_prize: parseFloat(result?.data?.contest_filter.max_prize_pool),
              max_prize: parseFloat(5200),
              max_user: result?.data?.contest_filter.max_participation,
            })
            setFilterData(result?.data || undefined)
          }, 100);

        }
        Animated.parallel([
          Animated.timing(rightAnim, { toValue: 1, duration: 1200, easing: Easing.linear }),
        ]).start();

      } else {
        setFilterData(undefined)
      }
    }).catch(error => {
      setFilterData(undefined)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  const moveToHowToPlay = () => {
    navigation.navigate('HowToPlay')
  }
  const moveToFilter = () => {
    navigation.navigate('LobbyFilter', { filterData, applyFilter })
  }
  const moveToLobbyDetail = (item) => {
    navigation.navigate('LobbyDetail', { notificationCount, userBalance, userProfile, contestItem: item })
  }
  const moveToRoasterScreen = (contestItem = confirm.contestItem) => {
    navigation.navigate('RoasterScreen', { notificationCount, userBalance, contestItem: contestItem })
    setConfirmData({ isVisible: false, contestItem: undefined })
  }

  const moveToContest = () => {
    navigation.navigate('CreateContest', { leagueData,selected_sports,filterData,notificationCount,userBalance,userProfile })
  }

  const ViewAdvertisement = useMemo(() => { return (<Advertisement loadAPIRemains={loadAPIRemains} tabIdx={tabIdx} selected_sports={selected_sports} />); }, [selected_sports, tabIdx]);

  const renderHeader = () => {
    return (
      <Fragment>
        {ViewAdvertisement}
        <View style={styles.headerContainer(responsive)}>
          <TouchableOpacity onPress={moveToContest} style={styles.viewCreateContest}>
                  <GradientView styles={styles.viewPrivateContest(responsive)}>
                      <Text style={styles.txtCreateContest(responsive)}>{Utils._i18n("Create Private Contest")}</Text>
                  </GradientView>
          </TouchableOpacity>
          <View style={styles.viewGetCode(responsive)}>
            <Text style={styles.txtgetCode(responsive)}>{Utils._i18n("Got Code")}</Text>
          </View>
        </View>
        {renderSectionHeader()}
        {
          !apiCalling && lobbyData.length == 0 &&
          <EmptyScreen btnAction={() => onChangeIndex(2)} btnTitle={Utils._i18n("My Contests")} />
        }
      </Fragment>
    )
  }
  const renderSectionHeader = () => {
    return (
      <View style={styles.sectionContainer(responsive)}>
        <Text style={styles.txtSelectedLeague(responsive)}>{leagueData?.name.charAt(0).toUpperCase() + leagueData?.name.slice(1).toLowerCase()} Contests</Text>
        <Animated.View style={styles.sectionRightView(rightAnim)}>
          <TouchableOpacity disabled={apiCalling} onPress={() => moveToHowToPlay()} style={styles.btnHowToPlay(responsive)}>
            <Image style={styles.imgQuestion(responsive)} source={Images.QUESTION} defaultSource={Images.QUESTION} />
            <Text style={styles.txtHTP(responsive)}>{Utils._i18n("How to Play")}</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={apiCalling} onPress={() => moveToFilter()}>
            <Image source={Images.IC_FILTER} defaultSource={Images.IC_FILTER} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
  const renderShimmerItem = () => {
    let colors = ['rgba(255,255,255,0.1)', 'rgba(153,153,153,0.1)'];
    return (
      <View style={styles.listContainer(responsive)}>
        <GradientView colors={[Core.tuna_color, Core.bright_gray]} styles={styles.viewList}>
          <View style={styles.viewHeaderBox(responsive)}>
            <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.btnShimmerTurny(responsive)} autoRun />
            <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtShimer(responsive)} autoRun />
          </View>
          <>
            <View style={styles.viewPrizeDate(responsive)}>
              <View style={styles.viewPrize}>
                <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtPrizeShimer(responsive)} autoRun />
                <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtDateShimer(responsive)} autoRun />
              </View>
              <View style={styles.viewTimer}>
                <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtPrizeShimer(responsive)} autoRun />
                <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtDateShimer(responsive)} autoRun />
              </View>
            </View>
            <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.lineContainer1(responsive)} autoRun />
            <View style={styles.viewEntryMin(responsive)}>
              <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtTotalEntryShmr(responsive)} autoRun />
              <ShimmerPlaceholder location={[0, 1]} shimmerColors={colors} style={styles.txtMinShmr(responsive)} autoRun />
            </View>
          </>
        </GradientView>
      </View>
    )
  }

  const renderItem = (item, index) => {
    if (item.isEmpty) {
      return renderShimmerItem()
    }
    let widthAnim = new Animated.Value(0)
    Animated.timing(widthAnim, { toValue: 1, duration: 2000 }).start()
    let prize_data = Utils.getWinCalculation(item.prize_distibution_detail);
    return (
      <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => moveToLobbyDetail(item)} style={styles.listContainer(responsive)}>
        <GradientView colors={[Core.tuna_color, Core.bright_gray]} styles={styles.viewList}>
          <View style={styles.viewHeaderBox(responsive)}>
            <View style={styles.labelView(responsive, item.group_name)}>
              <Text style={styles.txtName(responsive)}>{item.group_name}</Text>
            </View>
            <Text style={styles.txtContestTitle(responsive)}>{item.contest_title}</Text>
          </View>
          <Fragment>
            <View style={styles.viewPrizeDate(responsive)}>
              <View style={styles.viewPrize}>
                {
                  (prize_data.real > 0 || prize_data.bonus > 0 || prize_data.point > 0) ?
                    <Fragment>
                      {
                        (prize_data.real > 0) ?
                          <Text style={styles.txtTotal(responsive)}>{`$${parseFloat(prize_data.real)}`}</Text>
                          :
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: responsive.size(22), height: responsive.size(22), marginRight: responsive.size(5) }} source={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={prize_data.point > 0 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                            <Text style={styles.txtTotal(responsive)}>{`${parseFloat(prize_data.point > 0 ? prize_data.point : prize_data.bonus)}`}</Text>
                          </View>
                      }
                    </Fragment>
                    :
                    <Text style={styles.txtTotal(responsive)}>{`FREEBIE`}</Text>
                }
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.txtPrize(responsive)}>{Utils._i18n("Prize Pool")}</Text>
                  <Tooltip backgroundColor={'#BEBEBE'} overlayColor={'rgba(0,0,0,0.2)'} popover={<Text style={styles.txtToolTip(responsive)}>{item.group_type == 1 ? "DAILY" : item.group_type == 2 ? "WEEKLY" : item.group_type == 3 ? "YEARLY" : "Live IN Play"}</Text>}>
                    <View style={styles.viewM(responsive)}>
                      <Text style={styles.txtM(responsive)}>{item.group_type == 1 ? "D" : item.group_type == 2 ? "W" : item.group_type == 3 ? "Y" : "L"}</Text>
                    </View>
                  </Tooltip>
                  {
                    item.guaranteed_prize == 1 &&
                    <Tooltip backgroundColor={'#BEBEBE'} overlayColor={'rgba(0,0,0,0.2)'} popover={<Text style={styles.txtToolTip(responsive)}>{"GUARANTEE"}</Text>}>
                        <View style={styles.viewM(responsive)}>
                          <Text style={styles.txtM(responsive)}>G</Text>
                        </View>
                    </Tooltip>
                  }
                  {
                    item.multiple_lineup > 1 &&
                    <Tooltip backgroundColor={'#BEBEBE'} overlayColor={'rgba(0,0,0,0.2)'} popover={<Text style={styles.txtToolTip(responsive)}>{"Multy Entry"}</Text>}>
                        <View style={styles.viewM(responsive)}>
                          <Text style={styles.txtM(responsive)}>M</Text>
                        </View>
                    </Tooltip>
                  }
                </View>
              </View>
              <View style={styles.viewTimer}>
                <TimerCountDown scheduleDate={item.scheduled_date} fontSize={responsive.fontSize(14)} lineHeight={responsive.fontSize(18)} />
                <Text style={styles.txtTimer(responsive)}>{Utils.getCompareDateUTC(item.scheduled_date, "ddd, HH:mm A")}</Text>
              </View>
            </View>
            <View style={styles.lineContainer(responsive)}>
              <Animated.View style={{ width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${parseInt(item.total_user_joined) / (parseInt(item.size) / 100)}%`], }), height: '100%', backgroundColor: Core.primaryColor }} />
            </View>
            <View style={styles.viewEntryMin(responsive)}>
              <Text style={styles.txtTotalEntry(responsive)}>{item.total_user_joined} / <Text style={{ color: Core.silver }}>{item.size} {Utils._i18n("Entries")}</Text></Text>
              <Text style={styles.txtMin(responsive)}>{Utils._i18n("min")} {item.minimum_size}</Text>
            </View>
          </Fragment>
          <View style={styles.viewBtmItm(responsive)}>
            <View style={styles.viewBtm}>
              {
                item.prize_distibution_detail[0].max_value > 0 &&
                <Fragment>
                  <Animatable.Image animation="fadeInLeftBig" easing={'ease-out-sine'} duration={400} style={styles.imgTrophy(responsive)} source={Images.IC_TROPHY} defaultSource={Images.IC_TROPHY} />
                  {
                    (item.prize_distibution_detail[0].prize_type == 1) ?
                      <Animatable.Text animation="fadeInLeftBig" easing={'ease-out-sine'} duration={600} style={styles.txtAmount(responsive)}>{`$${parseFloat(item.prize_distibution_detail[0].max_value)}`}</Animatable.Text>
                      :
                      <Animatable.View animation="fadeInLeftBig" easing={'ease-out-sine'} duration={600} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: responsive.size(12), height: responsive.size(12), marginLeft: responsive.size(4), marginRight: responsive.size(-2) }} source={item.prize_distibution_detail[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                        <Text style={styles.txtAmount(responsive)}>{`${parseFloat(item.prize_distibution_detail[0].max_value)}`}</Text>
                      </Animatable.View>
                  }
                </Fragment>
              }
              <Animatable.View animation="fadeInLeftBig" easing={'ease-out-sine'} duration={item.prize_distibution_detail[0].max_value > 0 ? 800 : 400}>
                <GradientView colors={[Core.trout, 'rgba(85, 91, 100, 0.33)']} styles={styles.viewPick(responsive)}>
                  <Text style={styles.txtPick(responsive)}>{item.contest_mode}</Text>
                </GradientView>
              </Animatable.View>
              <Animatable.Image animation="fadeInLeftBig" easing={'ease-out-sine'} duration={item.prize_distibution_detail[0].max_value > 0 ? 1000 : 800} style={styles.imgShare(responsive)} source={Images.IC_SHARE} defaultSource={Images.IC_SHARE} />
            </View>
            <Animatable.View animation="fadeInRightBig" easing={'ease-out-sine'} duration={item.prize_distibution_detail[0].max_value > 0 ? 1000 : 800} style={styles.viewEntry}>
              <Text style={styles.txtEntry(responsive)}>{Utils._i18n("Entry")}</Text>
              <TouchableOpacity onPress={() => { item.entry_fee == 0 ? moveToRoasterScreen(item) : setConfirmData({ isVisible: true, contestItem: item }) }}>
                <GradientView styles={styles.viewFree(responsive)}>
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
            </Animatable.View>
          </View>
        </GradientView>
      </TouchableOpacity>
    )
  }
  const updateFilterData = (arrData = [...mainData]) => {
    let array = arrData;
    if (applyFilter && array.filter((e) => e.isEmpty == true).length == 0) {
      array = array.filter((e) => parseInt(e.entry_fee) >= parseInt(applyFilter.min_entry) && parseInt(e.entry_fee) <= parseInt(applyFilter.max_entry));
      array = array.filter((e) => parseInt(e.size) >= parseInt(applyFilter.min_user) && parseInt(e.size) <= parseInt(applyFilter.max_user));
      array = array.filter((e) => {
        let prize_data = Utils.getWinCalculation(e.prize_distibution_detail);
        return parseFloat(prize_data.real > 0 ? prize_data.real : prize_data.point > 0 ? prize_data.point : prize_data.bonus) >= parseFloat(applyFilter.min_prize) && parseFloat(prize_data.real > 0 ? prize_data.real : prize_data.point > 0 ? prize_data.point : prize_data.bonus) <= parseFloat(applyFilter.max_prize)
      });

      if (applyFilter.contest_mode_ids.length > 0) {
        array = array.filter((e) => applyFilter.contest_mode_ids.includes(e.contest_mode_id));
      }
      if (applyFilter.group_ids.length > 0) {
        array = array.filter((e) => applyFilter.group_ids.includes(e.group_id));
      }

      setLobbyData(array)
    }
  }
  const memoizedValue = useMemo(() => renderItem, [lobbyData]);
  const listView = useMemo(() => {
    return (
      <ListView
        key={"Lobby"}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        style={styles.wrapper}
        dataSource={ds.cloneWithRows(lobbyData)}
        renderSeparator={() => { return <View style={styles.sapretor(responsive)} /> }}
        renderFooter={() => { return <View style={styles.footer(responsive)} /> }}
        renderHeader={renderHeader}
        renderRow={memoizedValue}
        removeClippedSubviews={!(Platform.OS == "ios")}
        refreshControl={
          <RefreshControl
            tintColor={Core.primaryColor}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    )
  }, [lobbyData]);

  return (
    <Animated.View pointerEvents={tabIdx == 1 ? 'auto' : 'none'} style={styles.main_container(opacityAnim)}>
      {listView}
      <ConfirmationJoin userProfile={userProfile} userBalance={userBalance} contestItem={confirm.contestItem} openAlert={confirm.isVisible} actionBtn={() => moveToRoasterScreen()} onDismiss={() => setConfirmData({ ...{ isVisible: false, contestItem: undefined } })} />
    </Animated.View>
  )

};
export default Lobby;
