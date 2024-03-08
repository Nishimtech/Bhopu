import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { Constant, HomeBackground, useResponsiveSizes, GradientView, Images, EmptyScreen, Core, PreferenceConstant, AppPreferences, API, Utils } from '..';
import styles from './styles';
import { Image, Text, View, Animated, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { ForgotAlert, InputField, RosterItem } from '../../Components';
import AnimateNumber from 'react-native-animate-number'
import { EventRegister } from 'react-native-event-listeners';


const PlugNPlay = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [notificationCount] = useState(route?.params?.notificationCount || 0);
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [selectedData] = useState(route?.params?.selectedData)
  const [rosterData, setRosterData] = useState([])
  const [rosterDataChanges, setRosterDataChanges] = useState([])
  const [userBalance] = useState(route?.params?.userBalance || undefined)
  const [is_live_create] = useState(route?.params?.is_live_create || false)
  const [selectPosition, setPosition] = useState('All')
  const [apiCalling, setApiCalling] = useState(true)
  const [value, setValue] = useState('');
  const [selectPlayerSeasonID, setPlayerSeasonID] = useState('')
  const [isVisible, setVisible] = useState(false)
  const [teamJoin, setTeamJoin] = useState(false)
  const [teamItem] = useState(route?.params?.teamItem || undefined)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const [headerheight, setHeaderHeight] = useState(0)
  const scrollViewRef = useRef();

  const handleChange = (text) => {
    setValue(text);
  };
  const changeValue = useCallback((pl_id) => {
    setPlayerSeasonID(pl_id);
  }, []);
  useEffect(() => {
    if (rosterData.length > 0 && !apiCalling) {
      setApiCalling(true)
      setTimeout(() => {
        setApiCalling(false)
      });
    }
  }, [selectPosition, rosterData])
  useEffect(()=>{
    if(!scrollEnabled){
      let data = [...rosterData].filter((e)=> !(!filterItem(e) || (returnPropsItem(e) && returnPropsItem(e)[returnPropsItem(e).prop_id].selected_data && returnPropsItem(e)[returnPropsItem(e).prop_id].selected_data.ice_pick != '1')))
      let findIndex = rosterData.findIndex((e) => e.season_player_id == selectPlayerSeasonID);
      let OriginalIndex = data.findIndex((e) => e.season_player_id == selectPlayerSeasonID);
      let viewHeight = ((OriginalIndex + 1) / 2) > 1 ? ((OriginalIndex + 1) / 2) * ((Constant.FULL_WIDTH / 2.14) * 1.0977) : 0;
      if(rosterData[findIndex] && rosterData[findIndex].props){
        setTimeout(() => {
          scrollViewRef?.current.scrollTo({ y: ((viewHeight+(rosterData[findIndex].props.length*36)+20) + headerheight), animated: true }, 0);
        }, 100);
      }
    }
},[scrollEnabled])
  const filterCount = () => {
    let count = 0;
    [...rosterData].map((item) => {
      if ((selectPosition == 'All' || selectPosition == item.position) && (value == '' || String(item.display_name).toLowerCase().includes(value.toLowerCase()))) {
        count = count + 1
      }
    })
    return count
  }
  const filterItem = useCallback((e) => {
    let isExistItem = [...rosterData].find((item) => (e.season_player_id == item.season_player_id && (selectPosition == 'All' || selectPosition == item.position) && (value == '' || String(item.display_name).toLowerCase().includes(value.toLowerCase()))))
    return isExistItem
  }, [rosterData, selectPosition, value])

  useEffect(() => {
    setTimeout(() => {
      setRosterData(route?.params?.rosterData || [])
      setRosterDataChanges(route?.params?.rosterDataChanges || [])
      setApiCalling(false)
    }, 100);
  }, [])

  const getPropsName = (prop_id) => {
    let sports_props = selectedData.lineupData?.sports_props || [];
    return sports_props.find((e) => e.prop_id == prop_id).short_name
  }
  const backAction = () => {
    EventRegister.emit('pnpSelectedData', rosterDataChanges)
    navigation.goBack()
  }
  const returnPropsItem = (item) => {
    let objItem = rosterDataChanges.find((e) => e.season_player_id == item.season_player_id);
    return objItem
  }
  const returnSelectedCount = () => {
    let count = rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '1').length;
    return count
  }
  const onChangeRoster = (arrData) => {
    setRosterDataChanges([...arrData])
  };
  const moveToTeamPreview = () => {
    navigation.navigate('TeamPreview', { is_live_create,teamItem,isRoster: false, userBalance, notificationCount, contestItem, rosterData, rosterDataChanges, selectedData })
  }
  const navigateHomeScreen=(isContest=false)=>{
    setVisible(false);
    setTimeout(() => {
      if(!teamItem){
        EventRegister.emit('joinContest',contestItem)
        if (isContest) { EventRegister.emit('moveContest') } else { EventRegister.emit('moveLobby') }
      }
       navigation.navigate('HomeScreen')
    }, 100);
  }
  const returnPlayerParams=()=>{
    let array = [];
    rosterDataChanges.filter((e)=>e[e.prop_id].selected_data).map((item)=>{
      let selectObj = item[item.prop_id].selected_data;
      array.push({
        pl_id:item.season_player_id,
        user_points:selectObj.median,
        type: selectObj.type == 1 ? 2 : 1,
        prediction_points:selectObj.type == 2?selectObj.over:selectObj.under,
        ice_pick:selectObj.ice_pick,
        prop_id:item.prop_id
      })
    })
    return array
  }
  const JOIN_GAME=()=>{
    setTeamJoin(true)
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
    }else{
      let param = {
        contest_id:contestItem.contest_id,
        players:returnPlayerParams()
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
  const onChangePosition = (position) => {
    if (selectPosition != position) {
      setPosition(position)
      setPlayerSeasonID('')
    }
  }
  
  const rosterMapView = useMemo(() => {
    return (
      <Fragment>
        {
          rosterData.map((item, idx) => {
            return <RosterItem
              navigation={navigation}
              ice_pick={1}
              is_cross_icon={false}
              setScrollEnabled={setScrollEnabled}
              onChangeRoster={onChangeRoster}
              setPlayerSeasonID={changeValue}
              selectPlayerSeasonID={selectPlayerSeasonID}
              item={item} idx={idx}
              getPropsName={getPropsName}
              propsItem={returnPropsItem(item)}
              filterItem={filterItem}
              is_disble_player={returnSelectedCount() == 2}
              rosterDataChanges={rosterDataChanges} responsive={responsive} styles={styles} />
          })
        }
      </Fragment>
    )

  }, [selectPlayerSeasonID, rosterData, rosterDataChanges, selectPosition, value]);

  const renderHeader = () => {
    return (
      <View style={{ width: '100%' }}>
        <View style={styles.mainContainer(responsive)}>
          <View style={styles.headerContainer(responsive)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txtHeader(responsive)}>{'PLUG N PLAY BACKUP'}</Text>
              <Text style={styles.txtTime(responsive)}>{'This will immediately replace up to two non-playing players based on the selected priority.'}</Text>
            </View>
            <Image style={styles.imgQuestion(responsive)} source={Images.QUESTION} defaultSource={Images.QUESTION} />
          </View>
          <View style={{ paddingHorizontal: '2.1%', width: '100%', marginTop: responsive.size(30), marginBottom: responsive.size(20), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: ((Constant.FULL_WIDTH) / 2.14) * 1.0977 }}>
            {
              [...Array(2).keys()].map((itm, idx) => {
                if (returnSelectedCount() - 1 >= idx) {
                  let array = rosterDataChanges.filter((e) => e[e.prop_id].selected_data && e[e.prop_id].selected_data.ice_pick == '1')
                  let item = rosterData.find((e) => e.season_player_id == array[idx].season_player_id)
                  return <RosterItem
                    navigation={navigation}
                    ice_pick={1}
                    onChangeRoster={onChangeRoster}
                    setPlayerSeasonID={changeValue}
                    selectPlayerSeasonID={selectPlayerSeasonID}
                    item={item} idx={idx}
                    getPropsName={getPropsName}
                    propsItem={returnPropsItem(item)}
                    is_disble_action={true}
                    rosterDataChanges={rosterDataChanges} responsive={responsive} styles={styles} />
                }
                let PnPitem = (route?.params?.rosterDataChanges || []).find((e)=> e[e.prop_id].selected_data  && e[e.prop_id].selected_data.ice_pick == '1')
                return (
                  <View key={itm} style={{ width: Constant.FULL_WIDTH / 2.14, height: ((Constant.FULL_WIDTH) / 2.14) * 1.0977, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ position: 'absolute', opacity: 1, width: '100%', height: '100%' }} source={Images.INACTIVEBG} defaultSource={Images.INACTIVEBG} />
                    {
                      (apiCalling && PnPitem)?
                      <ActivityIndicator color={Core.primaryColor}/>
                      :
                      <Image source={Images.ADDEMPTY} defaultSource={Images.ADDEMPTY} />
                    }
                  </View>
                )
              })
            }
          </View>
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
        </View>
        {
          (!apiCalling && (selectedData.lineupData?.all_position || []).length > 0) ?
            <View style={styles.behindContainer(responsive)}>
              <Animated.View style={styles.viewSearch(responsive)}>
                <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                <InputField
                  onChangeText={handleChange}
                  isTransparent={true}
                  type={'search'}
                  value={value}
                  label_name={'Search Player'}
                />
              </Animated.View>
              <View style={styles.viewPlayer(responsive)}>
                <Text style={styles.txtPlyr(responsive)}>{`${returnSelectedCount()} Players Selected`}</Text>
              </View>
              <View onLayout={(event) => { setHeaderHeight(event.nativeEvent.layout.y) }} style={styles.viewBtn(responsive)}>
                {
                  filterCount() == 0 ?
                    <EmptyScreen title={'There is no player record found'} />
                    :
                    rosterMapView
                }
              </View>
            </View>
            : (apiCalling && (selectedData.lineupData?.all_position || []).length > 0) &&
            <View style={styles.behindContainer(responsive)}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
        }
      </View>
    )
  }
  return (
    <HomeBackground
      notificationCount={notificationCount}
      real_amount={parseFloat((parseFloat((parseFloat(userBalance?.user_balance?.real_amount) || 0)+(parseFloat(userBalance?.user_balance?.winning_amount) || 0)).toFixed(2)))}
      backAction={() => teamJoin?{}:backAction()}
      isLeftIcon={true} isBack={true} isRightIcon={true} isRightIcon1={true} isNotification={true}>
      <View pointerEvents={teamJoin?"none":"auto"} style={{flex:1}}>
        <ListView
          key={"PlugNPlay"}
          ref={scrollViewRef}
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
          (!apiCalling && (selectedData.lineupData?.all_position || []).length > 0) &&
          <Animated.View style={styles.viewBtmBtn(responsive)}>
            <TouchableOpacity onPress={() => moveToTeamPreview()} disabled={returnSelectedCount() == 0} style={styles.btnPreview(responsive, returnSelectedCount() == 0)}>
              <Text style={styles.txtPreviewBtn(responsive, returnSelectedCount() == 0)}>{'Preview'}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={returnSelectedCount() == 0} style={styles.viewNext(responsive)} onPress={() => { JOIN_GAME() }} pointerEvents={returnSelectedCount() < 2 ? 'none' : 'auto'}>
              <GradientView colors={returnSelectedCount() == 0 ? [Core.light_gray, Core.light_gray] : [Core.primaryColor, Core.gold_tips]} styles={styles.viewGradientNext(responsive)}>
                  {
                    teamJoin ?
                      <ActivityIndicator color={'#000'}/>
                    :
                      <Text style={styles.txtNextBtn(responsive)}>{'Submit'}</Text>
                  }
              </GradientView>
            </TouchableOpacity>
          </Animated.View>
        }
         {
          is_live_create?
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
      </View>
    </HomeBackground>
  )

};
export default PlugNPlay;
