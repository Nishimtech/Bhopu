import React, { useEffect, useMemo, useState } from 'react';
import { View, Animated, Easing, SafeAreaView } from 'react-native';
import { Lobby, MyContest, MyStats } from './TabComponent'
import { Constant, PreferenceConstant, AppPreferences, HomeBackground, SportsHeader, VjTabAnimation, Utils, API, MoreScreen, Core } from '..';
import styles from '../LandingScreen/styles';
import { EventRegister } from 'react-native-event-listeners';

const HomeScreen = (props) => {
  const [arrOfSports, setArraySports] = useState([])
  const [selected_sports, setSelectedSports] = useState(undefined)
  const [leagueData, setLeagueData] = useState(undefined)
  const [tabIdx, setTabIdx] = useState(0)
  const [notificationCount, setNotificationCount] = useState(0)
  const [userBalance, setUserBalance] = useState(undefined)
  const [userProfile, setUserProfile] = useState(undefined)
  const [isHomeVisible, setHomeVisible] = useState(false)
  const [leftAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    if (tabIdx > 0) {
      Animated.parallel([
        Animated.timing(leftAnim, { toValue: -Constant.FULL_WIDTH * (tabIdx - 1), duration: 300, easing: Easing.linear }),
      ]).start();
    }
  }, [tabIdx])
  
  useEffect(()=>{
    let listener = EventRegister.addEventListener('joinContest', (item) => {
      setTimeout(async () => {
        await Promise.all([
          ...(item.entry_fee > 0 && [GET_USER_BALANCE()])
        ])
      }, 100);
    })
    async function fetchData() {
      await Promise.all([
        AppPreferences.getItem(PreferenceConstant.SPORTS_HUB_DATA),
        AppPreferences.getItem(PreferenceConstant.SELECTED_SPORTS),
        AppPreferences.getItem(PreferenceConstant.SPORTS_HUB),
        GET_UNREAD_NOTIFICATION(),
        GET_USER_BALANCE(),
      ]).then(async (dictObj) => {
        if (dictObj) {
          let objData = JSON.stringify(JSON.parse(dictObj[0]))
          let arraySports = JSON.parse(objData)?.sports_list || [];
          setArraySports(arraySports)
          if (dictObj[1] == null && arraySports.length > 0) {
            actionSelectSport(arraySports[0])
          } else if (dictObj[1] != null) {
            let selectedSports = JSON.parse(dictObj[1])
            actionSelectSport(selectedSports)
          }
          if (dictObj[2] != null && JSON.parse(dictObj[2]).status == 1) {
            setLeagueData(JSON.parse(dictObj[2]))
          }
          setTabIdx(1)
        }
      })
    }
    fetchData();
    return (() => {
      EventRegister.removeEventListener(listener)
      EventRegister.removeEventListener(listener1)
    })
  },[])
  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        AppPreferences.getItem(PreferenceConstant.USER_PROFILE)
      ]).then(async (data) => {
        if (data) {
            let objProfile = JSON.parse(data[0])
            setUserProfile(objProfile)
        }
      })
    }
    fetchData()
  }, [])

  const GET_UNREAD_NOTIFICATION=()=>{
    API.GET_UNREAD_NOTIFICATION().then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setNotificationCount(result.data)
      }
    }).catch(error => {
      Utils.handleCatchError(error, props.navigation)
      return error;
    });
  }
  const GET_USER_BALANCE = () => {
    API.GET_USER_BALANCE().then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setUserBalance(result.data)
      }
    }).catch(error => {
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
 
  const actionSelectSport = async (item) => {
    if ((selected_sports == undefined) || (selected_sports && selected_sports.sports_id != item.sports_id)) {
      await Promise.all([
        AppPreferences.setItem(PreferenceConstant.SELECTED_SPORTS, JSON.stringify(item)),
      ]).then(() => {
        setSelectedSports(item)
      })
    }
  }
  const TabAnimated = useMemo(() => {
    return (
      <VjTabAnimation {...props} leagueData={leagueData} tabIdx={tabIdx} onChangeIndex={(val) => setTabIdx(val)} />
    );
  }, [tabIdx]);

  const HeaderSports = useMemo(() => {
    return (
      <SportsHeader selected_sports={selected_sports} arrOfSports={arrOfSports} onChangeItem={(item) => actionSelectSport(item)} />
    );
  }, [arrOfSports, selected_sports]);

  const LobbyView = useMemo(() => {
    return (
      <Lobby  {...props} notificationCount={notificationCount} userProfile={userProfile} userBalance={userBalance} leagueData={leagueData} selected_sports={selected_sports} tabIdx={tabIdx} onChangeIndex={(val) => setTabIdx(val)} />
    );
  }, [tabIdx, selected_sports,userBalance,userProfile,notificationCount]);

  const MyContestView = useMemo(() => {
    return (
      <MyContest  {...props} notificationCount={notificationCount} userProfile={userProfile} leagueData={leagueData} userBalance={userBalance} selected_sports={selected_sports} tabIdx={tabIdx} onChangeIndex={(val) => setTabIdx(val)} />
    );
  }, [tabIdx, selected_sports,userBalance,userProfile,notificationCount]);

  const MyStatsView = useMemo(() => {
    return (
      <MyStats  {...props} arrOfSports={arrOfSports} sportsData={selected_sports} tabIdx={tabIdx}  />
    );
  }, [tabIdx, selected_sports,arrOfSports]);

  return (
    <>
      <HomeBackground title={tabIdx != 4?"":'My Stats'} isHomeVisible={isHomeVisible} real_amount={parseFloat((parseFloat((parseFloat(userBalance?.user_balance?.real_amount) || 0)+(parseFloat(userBalance?.user_balance?.winning_amount) || 0)).toFixed(2)))} isRightIcon1={tabIdx != 4} notificationCount={notificationCount} backAction={()=>setHomeVisible(true)} isLeftIcon={tabIdx != 4} isHomeIcon={true} isRightIcon={tabIdx != 4} isNotification={true} isHeaderBorder={tabIdx == 4}>
        <View style={styles.wrapper}>
          {tabIdx != 4 && HeaderSports}
          <Animated.View style={{marginLeft:leftAnim,flexDirection:'row',width:Constant.FULL_WIDTH*4,height:'100%',overflow:'hidden'}}>
            {LobbyView}
            {MyContestView}
            <View style={{width:Constant.FULL_WIDTH}}/>
            {MyStatsView}
          </Animated.View>
        </View>
        {TabAnimated}
        {
          userProfile &&
            <MoreScreen userProfile={userProfile} isVisible={isHomeVisible} hideFunc={()=>setHomeVisible(false)} logoutRecieved={()=>Utils.clearData(props.navigation)}/>
        }
      </HomeBackground>
     
    </>
  )

};
export default HomeScreen;
