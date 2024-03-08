import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { Constant, HomeBackground, Utils, API, useResponsiveSizes, GradientView, Images, EmptyScreen, Core, PreferenceConstant, AppPreferences } from '..';
import styles from './styles';
import { Easing, Image, ScrollView, Text, View, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ForgotAlert, InputField, RosterItem } from '../../Components';
import { SvgUri } from 'react-native-svg';
import { Config } from '../../../Helper';
import AnimateNumber from 'react-native-animate-number'
import { EventRegister } from 'react-native-event-listeners';


const RoasterScreen = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

  const [notificationCount] = useState(route?.params?.notificationCount || 0);
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [teamItem] = useState(route?.params?.teamItem || undefined)
  const [is_live_create] = useState(route?.params?.is_live_create || false)
  const [selectedData, setSelectedData] = useState(route?.params?.selectedData || { league: undefined, sports: undefined, lineupData: undefined })
  const [heightAnim] = useState(new Animated.Value(0))
  const [dataGames, setGamesData] = useState(route?.params?.dataGames || [])
  const [rosterData, setRosterData] = useState(route?.params?.rosterData || [])
  const [rosterDataChanges, setRosterDataChanges] = useState(route?.params?.rosterDataChanges || [])
  const [editRoster, setEditRoster] = useState(route?.params?.editRoster || [])
  const [selectPosition, setPosition] = useState('All')
  const [fixtureData, setFixturData] = useState(undefined)
  const [apiCalling, setApiCalling] = useState(false)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const [teamJoin, setTeamJoin] = useState(false)
  const [openAlert, setOpenAlert] = useState({ isvisible: false, imgName: '', title: '', desc: '', btnTitle: '', btnTitle1: '', onDismiss: null, onDismiss1: null })
  const [isVisible, setVisible] = useState(false)
  const [headerheight, setHeaderHeight] = useState(0)
  const [value, setValue] = useState('');
  const [selectPlayerSeasonID, setPlayerSeasonID] = useState('')
  const [userBalance] = useState(route?.params?.userBalance || 0)
  const scrollViewRef = useRef();

  const handleChange = (text) => {
    setValue(text);
  };
  const changeValue = useCallback((pl_id) => {
    setPlayerSeasonID(pl_id);
  }, []);
  const actionFixtureData = useCallback((item) => {
    if (item.season_id != (fixtureData?.season_id || '')) {
      setFixturData(item)
    } else {
      setFixturData(undefined)
    }
  }, [fixtureData]);

  useEffect(() => {
    if (rosterData.length > 0 && !apiCalling && selectPosition == 'All') {
      setApiCalling(true)
      setTimeout(() => {
        setApiCalling(false)
      });
    }
  }, [selectPosition, rosterData, fixtureData])
  useEffect(()=>{
      if(!scrollEnabled){
        let data = [...rosterData].filter((e)=> !(!filterItem(e) || (returnPropsItem(e) && returnPropsItem(e)[returnPropsItem(e).prop_id].selected_data && returnPropsItem(e)[returnPropsItem(e).prop_id].selected_data.ice_pick != '0')))
        let findIndex = rosterData.findIndex((e) => e.season_player_id == selectPlayerSeasonID);
        let OriginalIndex = data.findIndex((e) => e.season_player_id == selectPlayerSeasonID);
        let viewHeight = ((OriginalIndex + 1) / 2) > 1 ? ((OriginalIndex + 1) / 2) * ((Constant.FULL_WIDTH / 2.14) * 1.0977) : 0;
        if(rosterData[findIndex] && rosterData[findIndex].props){
          setTimeout(() => {
            scrollViewRef?.current.scrollTo({ y: ((viewHeight+(rosterData[findIndex].props.length*20)) + headerheight), animated: true }, 0);
          }, 100);
        }
      }
  },[scrollEnabled])
  const filterCount = () => {
    let count = 0;
    [...rosterData].map((item) => {
      if ((selectPosition == 'All' || selectPosition == item.position) && (value == '' || String(item.display_name).toLowerCase().includes(value.toLowerCase())) && (!fixtureData || (fixtureData && (item.team_abbreviation == fixtureData.home || item.team_abbreviation == fixtureData.away)))) {
        count = count + 1
      }
    })
    return count
  }
  const filterItem = useCallback((e) => {
    let isExistItem = [...rosterData].find((item) => (e.season_player_id == item.season_player_id && (selectPosition == 'All' || selectPosition == item.position) && (value == '' || String(item.display_name).toLowerCase().includes(value.toLowerCase())) && (!fixtureData || (fixtureData && (item.team_abbreviation == fixtureData.home || item.team_abbreviation == fixtureData.away)))))
    return isExistItem
  }, [rosterData, selectPosition, value, fixtureData])

  const remainingArray = (arrData, arrDataChange) => {
    let array = [];
    arrData.map(item => {
      let PnPitem = arrDataChange.find((e) => item.season_player_id == e.season_player_id && e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '1')
      if (!PnPitem) {
        array.push(item)
      }
    })
    return array;
  }
  const actionNext = () => {
    let array = rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '1')
    if (array.length > 0) {
      moveToPlugnPlay()
    } else {
      setOpenAlert({ isvisible: true, imgName: '', headertitle: 'Plug n Play', title: '', desc: "No need to panic if one or two of your selections does not play because of injury or rest. Your Plug n Play selection will automatically replace your non playing selection(s).", btnTitle: 'Skip', btnTitle1: 'Ok', onDismiss: JOIN_GAME, onDismiss1: moveToPlugnPlay })
    }
  }
  useEffect(() => {
    Promise.all([
      AppPreferences.getItem(PreferenceConstant.SPORTS_HUB),
      AppPreferences.getItem(PreferenceConstant.SELECTED_SPORTS),
    ]).then(async (dictObj) => {
      if (dictObj.length == 2) {
        await setSelectedData({ league: JSON.parse(dictObj[0]), sports: JSON.parse(dictObj[1]), lineupData: selectedData.lineupData })
        Promise.all([
          ...(dataGames.length == 0 ? GET_FIXTURE_DETAILS() : GET_LINEUP_MASTER_DATA()),
        ])
      }
    })
    let listener = EventRegister.addEventListener('getPlayerInfoRoasterEdit', ({ arrData, arrDataChange, data }) => {
      let findIndex = remainingArray(arrData, arrDataChange).findIndex((e) => e.season_player_id === data.season_player_id);
      let viewHeight = ((findIndex + 1) / 2) > 1 ? ((findIndex + 1) / 2) * ((Constant.FULL_WIDTH / 2.14) * 1.0977) : 0;
      setPlayerSeasonID(data.season_player_id)
      setTimeout(() => {
        scrollViewRef?.current.scrollTo({ y: (viewHeight + headerheight), animated: true }, 0);
      }, 100);
    })
    return (() => {
      EventRegister.removeEventListener(listener)
    })
  }, [])
  GET_USER_LINEUP = () => {
    API.GET_USER_LINEUP({ 'user_contest_id': teamItem.user_contest_id, 'collection_id': contestItem?.collection_id || '', 'sports_id': selectedData?.sports?.sports_id || "", ...(contestItem.current_round && {round_id: contestItem.current_round})}).then(async (response) => {
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
  GET_FIXTURE_DETAILS = () => {
    setApiCalling(true)
    API.GET_FIXTURE_DETAILS({ 'collection_id': contestItem?.collection_id || '', 'sports_id': selectedData?.sports?.sports_id || "" }).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        if(is_live_create || contestItem.group_id == 3){
          setGamesData(result.data.filter((e)=>(e.round_id == contestItem.current_round || e.round_id == contestItem.round_id)))
        }else{
          setGamesData(result.data)
        }
        Utils.enableAnimation(300, 1)
        if(rosterDataChanges.length == 0){
          GET_LINEUP_MASTER_DATA()
        }else{
          Animated.parallel([
            Animated.timing(heightAnim, { toValue: responsive.size(50), duration: 800, easing: Easing.linear }),
          ]).start()
        }
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  GET_LINEUP_MASTER_DATA = () => {
    setApiCalling(true)
    API.GET_LINEUP_MASTER_DATA({ 'sports_id': selectedData?.sports?.sports_id || "" }).then(async (response) => {
      let result = response.data;
      setApiCalling(teamItem && !is_live_create)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setSelectedData({ league: selectedData.league, sports: selectedData.sports, lineupData: result.data })
        Utils.enableAnimation(300, 1)
        if (teamItem && !is_live_create) {
          GET_USER_LINEUP()
        }
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  const getPropsName = (prop_id) => {
    let sports_props = selectedData.lineupData?.sports_props || [];
    return sports_props.find((e) => e.prop_id == prop_id).short_name
  }
  const getPropsDeatils = (prop_id, item) => {
    return item.props.find((e) => e.prop_id == prop_id)
  }
  GET_ALL_ROSTER = () => {
    setApiCalling(true)
    let params = { 'collection_id': contestItem?.collection_id || '', 'sports_id': selectedData?.sports?.sports_id || "" }
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
        Animated.parallel([
          Animated.timing(heightAnim, { toValue: responsive.size(50), duration: 800, easing: Easing.linear }),
        ]).start()
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }

  const returnPlayerParams = () => {
    let array = [];
    rosterDataChanges.filter((e) => e[e.prop_id].selected_data).map((item) => {
      let selectObj = item[item.prop_id].selected_data;
      array.push({
        pl_id: item.season_player_id,
        user_points: selectObj.median,
        type: selectObj.type == 1?2:1,
        prediction_points: selectObj.type == 2 ? selectObj.over : selectObj.under,
        ice_pick: selectObj.ice_pick,
        prop_id: item.prop_id
      })
    })
    return array
  }
  const JOIN_GAME = () => {
    setTeamJoin(true)
    resetAlert()
    if (teamItem) {
      if(is_live_create){
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
      }else{
        let param = {
          user_contest_id: teamItem.user_contest_id,
          team_name: teamItem.team_short_name,
          contest_id: contestItem.contest_id,
          players: returnPlayerParams(),
          ...(contestItem.current_round && {round_id: contestItem.current_round})
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
  const resetAlert = () => {
    setOpenAlert({ isvisible: false, imgName: '', title: '', desc: '', btnTitle: '', btnTitle1: '', onDismiss: null, onDismiss1: null })
  }
  const backAction = () => {
    resetAlert()
    setTimeout(() => {
      navigation.goBack()
    }, 100);
  }
  const returnPropsItem = (item) => {
    let objItem = rosterDataChanges.find((e) => e.season_player_id == item.season_player_id);
    return objItem
  }
  const returnSelectedCount = () => {
    let count = rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '0').length;
    return count
  }
  const onChangeRoster = (arrData) => {
    setRosterDataChanges([...arrData])
  };
  const moveToTeamPreview = () => {
    navigation.navigate('TeamPreview', { is_live_create,isRoster: true, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData,teamItem })
  }
  const moveToPlugnPlay = () => {
    resetAlert()
    navigation.navigate('PlugNPlay', { is_live_create,userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData,teamItem })
  }
  const navigateHomeScreen = (isContest = false) => {
    setVisible(false);
    setTimeout(() => {
      if(!teamItem){
        EventRegister.emit('joinContest', contestItem)
        if (isContest) { EventRegister.emit('moveContest') } else { EventRegister.emit('moveLobby') }
      }
      navigation.navigate('HomeScreen')
    }, 100);
  }
  const onChangePosition = (position) => {
    if (selectPosition != position) {
      setPosition(position)
      setPlayerSeasonID('')
    }
  }
  const returnAvgPts = () => {
    let selectPtsVal = 0;
    rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '0').map((item) => {
      let selectObj = item[item.prop_id].selected_data;
      selectPtsVal = selectPtsVal + parseFloat(selectObj.type == 1?selectObj.under:selectObj.over)
    })
    return selectPtsVal / returnSelectedCount()
  }
  const rosterMapView = useMemo(() => {
    return (
      <Fragment>
        {
          rosterData.map((item, idx) => {
            return <RosterItem
              navigation={navigation}
              setScrollEnabled={setScrollEnabled}
              onChangeRoster={onChangeRoster}
              setPlayerSeasonID={changeValue}
              ice_pick={0}
              selectPlayerSeasonID={selectPlayerSeasonID}
              item={item} idx={idx}
              getPropsName={getPropsName}
              propsItem={returnPropsItem(item)}
              filterItem={filterItem}
              is_disble_player={parseInt(contestItem.player_limit) == returnSelectedCount()}
              rosterDataChanges={rosterDataChanges} responsive={responsive} styles={styles} />
          })
        }
      </Fragment>
    )

  }, [selectPlayerSeasonID, rosterData, rosterDataChanges, selectPosition, fixtureData, value]);

  const gamesView = useMemo(() => {
    return (
      <Fragment>
        {
          dataGames.length > 0 &&
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollStyle(responsive)}>
            {
              dataGames.map((item, idx) => {
                return (
                  <TouchableOpacity onPress={() => actionFixtureData(item)}>
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={styles.viewOuter(responsive, idx, item.season_id == (fixtureData?.season_id || ''))}>
                      <View style={styles.viewInnerTeam(responsive)}>
                        <View style={styles.viewTeam}>
                          <GradientView colors={['#555B64', 'rgba(85, 91, 100, 0.33)']} styles={styles.viewImg(responsive)}>
                            {
                              item.home_flag && item.home_flag.includes('svg')?
                                <SvgUri width={responsive.size(22)} height={responsive.size(22)} uri={Config.s3URL + "upload/flag/" + item.home_flag} />
                              :
                                <Image style={{width:responsive.size(22),height:responsive.size(22)}}  source={{uri:Config.s3URL + "upload/flag/" + item.home_flag}} />
                            }
                          </GradientView>
                          <Text style={styles.txtTeam(responsive)}>{item.home}</Text>
                        </View>
                        <Image source={Images.VS} defaultSource={Images.VS} />
                        <View style={styles.viewTeam}>
                          <GradientView colors={['#555B64', 'rgba(85, 91, 100, 0.33)']} styles={styles.viewImg(responsive)}>
                            {
                              item.away_flag && item.away_flag.includes('svg')?
                                <SvgUri width={responsive.size(22)} height={responsive.size(22)} uri={Config.s3URL + "upload/flag/" + item.away_flag} />
                              :
                                <Image style={{width:responsive.size(22),height:responsive.size(22)}}  source={{uri:Config.s3URL + "upload/flag/" + item.away_flag}} />
                            }
                          </GradientView>
                          <Text style={styles.txtTeam(responsive)}>{item.away}</Text>
                        </View>
                      </View>
                      <View style={styles.viewDate(responsive)}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtDateTime(responsive)}>{Utils.getFormatedDateUTC(item.scheduled_date, 'MMM DD | HH:mm A')}</Text>
                      </View>
                    </GradientView>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        }
      </Fragment>
    )
  }, [dataGames, fixtureData]);

  const playerStrip = useMemo(() => {
    return (
      <View style={styles.viewNum(responsive)}>
        {
          [...Array(parseInt(contestItem?.player_limit || 0)).keys()].map((item, idx) => {
            let count = returnSelectedCount();
            return (
              <GradientView styles={styles.viewNumList(responsive,[...Array(parseInt(contestItem?.player_limit || 0)).keys()].length)} colors={count > idx ? ['#FAD60C', 'rgba(165, 142, 7, 0.70)'] : ['#3A3E44', '#3A3F4D']}>
                <Text style={styles.txtNum(responsive, count > idx)}>{item + 1}</Text>
              </GradientView>
            )
          })
        }
      </View>
    )
  }, [contestItem, rosterDataChanges])

  const renderHeader = () => {
    const topAnim = heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] });
    return (
      <View style={{ width: '100%' }}>
        <View style={styles.mainContainer(responsive)}>
          <View style={styles.headerContainer(responsive)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtHeader(responsive)}>{contestItem?.contest_title || ''}</Text>
              <Text style={styles.txtTime(responsive)}>{is_live_create?Utils.getFormatedDateUTC(contestItem?.next_round_date, 'MMM DD | HH:mm A'):Utils.getFormatedDateUTC(contestItem?.scheduled_date, 'MMM DD | HH:mm A')}</Text>
            </View>
            <GradientView styles={styles.viewSports(responsive)} colors={['#555B64', 'rgba(85, 91, 100, 0.33)']}>
              <Text style={styles.txtSports(responsive)}>{selectedData?.sports?.sports_name || ''}</Text>
            </GradientView>
          </View>
          {
            apiCalling && dataGames.length == 0 ?
              <ActivityIndicator color={Core.primaryColor} />
              :
              <Fragment>
                {gamesView}
                {playerStrip}
                {
                  apiCalling && (selectedData.lineupData?.all_position || []).length == 0 ?
                    <ActivityIndicator color={Core.primaryColor} />
                    :
                    <Fragment>
                      {
                        ((selectedData.lineupData?.all_position || []).length > 0) &&
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollTab(responsive)}>
                          {
                            ([...[{ position: 'All' }], ...selectedData.lineupData?.all_position]).map((item, idx) => {
                              return (
                                <TouchableOpacity onPress={() => { onChangePosition(item.position) }} style={{ width: Constant.FULL_WIDTH / 6, height: '100%', alignItems: 'center' }}>
                                  <Text style={styles.txtPosition(responsive, selectPosition, item)}>{item.position}</Text>
                                  <View style={styles.viewPosition(responsive, selectPosition, item)} />
                                </TouchableOpacity>
                              )
                            })
                          }
                        </ScrollView>
                      }
                    </Fragment>
                }
              </Fragment>
          }
        </View>
        {
          (!apiCalling && dataGames.length > 0 && (selectedData.lineupData?.all_position || []).length > 0) ?
            <View style={styles.behindContainer(responsive)}>
              <Animated.View style={styles.viewSearch(responsive, heightAnim)}>
                <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                <InputField
                  onChangeText={handleChange}
                  isTransparent={true}
                  type={'search'}
                  value={value}
                  label_name={'Search Player'}
                />
              </Animated.View>
              <Animated.View style={styles.viewPlayer(responsive, topAnim)}>
                <Animated.Text style={styles.txtPlyr(responsive)}>{`${returnSelectedCount()} Players Selected`}</Animated.Text>
                {
                  returnSelectedCount() > 0 &&
                  <AnimateNumber style={styles.txtPlyr(responsive)} value={returnAvgPts()} countBy={returnAvgPts() / 5} timing="linear" formatter={(val) => { return 'Avg. Fan Pts/Pick: ' + parseFloat(val).toFixed(2) }} />
                }
              </Animated.View>

              {
                (rosterData.length == 0) ?
                  <EmptyScreen apiCalling={apiCalling} btnAction={() => GET_ALL_ROSTER()} btnTitle={(teamItem && !is_live_create) ? "Edit Your Team" : "Create Your Team"} />
                  : (rosterDataChanges.length > 0) &&
                  <View onLayout={(event) => { setHeaderHeight(event.nativeEvent.layout.y) }} style={styles.viewBtn(responsive)}>
                    {
                      filterCount() == 0 ?
                        <EmptyScreen title={'There is no player record found'} />
                        :
                        rosterMapView
                    }
                  </View>

              }
            </View>
            : (apiCalling && dataGames.length > 0 && (selectedData.lineupData?.all_position || []).length > 0) &&
            <View style={styles.behindContainer(responsive)}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
        }
      </View>
    )
  }
  const bottomAnim = heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.1] });
  return (
    <HomeBackground
      notificationCount={notificationCount}
      real_amount={parseFloat((parseFloat((parseFloat(userBalance?.user_balance?.real_amount) || 0)+(parseFloat(userBalance?.user_balance?.winning_amount) || 0)).toFixed(2)))}
      backAction={() => teamJoin ? {} : returnSelectedCount() == 0 ? backAction() : setOpenAlert({ isvisible: true, imgName: Images.VECTOR, headertitle: '', title: 'Alert', desc: 'This action will reset all your selections', btnTitle: 'Ok', btnTitle1: 'Cancel', onDismiss: backAction, onDismiss1: resetAlert })}
      isLeftIcon={true} isBack={true} isRightIcon={true} isRightIcon1={true} isNotification={true}>
      <View pointerEvents={teamJoin ? 'none' : 'auto'} style={{ flex: 1 }}>
        <ListView
          ref={scrollViewRef}
          key={"RoasterScreen"}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          // scrollEnabled={scrollEnabled}
          style={styles.wrapper}
          dataSource={ds.cloneWithRows([])}
          renderHeader={renderHeader}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
        {
          ((!apiCalling && dataGames.length > 0 && (selectedData.lineupData?.all_position || []).length > 0)) &&
          <Animated.View style={styles.viewBtmBtn(bottomAnim, heightAnim)}>
            <TouchableOpacity onPress={() => moveToTeamPreview()} disabled={returnSelectedCount() == 0} style={styles.btnPreview(responsive, returnSelectedCount() == 0)}>
              <Text style={styles.txtPreviewBtn(responsive, returnSelectedCount() == 0)}>{'Preview'}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={parseInt(contestItem.player_limit) > returnSelectedCount()} style={styles.viewNext(responsive)} onPress={() => { actionNext() }} pointerEvents={parseInt(contestItem.player_limit) > returnSelectedCount() ? 'none' : 'auto'}>
              <GradientView colors={parseInt(contestItem.player_limit) > returnSelectedCount() ? [Core.light_gray, Core.light_gray] : [Core.primaryColor, Core.gold_tips]} styles={styles.viewGradientNext(responsive)}>
                {
                  teamJoin ?
                    <ActivityIndicator color={'#000'} />
                    :
                    <Text style={styles.txtNextBtn(responsive)}>{'Next'}</Text>
                }
              </GradientView>
            </TouchableOpacity>
          </Animated.View>
        }
        <ForgotAlert
          openAlert={openAlert.isvisible} dismissOnTouchOutside={false}
          imgName={openAlert.imgName} autoAdjust={true}
          headertitle={openAlert.headertitle} title={openAlert.title} desc={openAlert.desc} btnTitle={openAlert.btnTitle}
          onDismiss={openAlert.onDismiss} btnTitle1={openAlert.btnTitle1} onDismiss1={openAlert.onDismiss1}
        />
        {
          is_live_create?
           <ForgotAlert
              openAlert={isVisible} dismissOnTouchOutside={false}
              imgName={Images.POPUPLOGO} autoAdjust={true}
              title={'Congratulations!'} desc={'Team created for next round successfully!'} btnTitle={'My Contest'}
              onDismiss={() => { navigateHomeScreen() }} btnTitle1={'Cancel'} onDismiss1={() => { setVisible(false) }}
            />
          :teamItem ?
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

      </View>


    </HomeBackground>
  )

};
export default RoasterScreen;
