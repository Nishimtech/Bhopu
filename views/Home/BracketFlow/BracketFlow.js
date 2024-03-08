import React, { useEffect, useRef, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { HomeBackground, useResponsiveSizes, Images, Core, API, Utils, Constant } from '..';
import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const BracketFlow = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const [apiCalling, setApiCalling] = useState(true)
  const [userProfile] = useState(route?.params?.userProfile || undefined)
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [selected_sports] = useState(route?.params?.selected_sports || undefined)
  const [details, setDetails] = useState({ leaderboard: [], match_total: undefined })
  const [selected_round, setSelectedRound] = useState(1)

  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  var scrollViewRef = useRef(null);
  const scrollViewRef2 = useRef(null);

  useEffect(() => {
   
    API.GET_BRACKET_CONTEST_LEADERBOARD({ 'contest_id': contestItem?.contest_id || '' }).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setDetails({ leaderboard: result.data.leaderboard, match_total: result.data.match_total })
        setTimeout(() => {
          setSelectedRound(contestItem.teams[0].round_id)
          let index = contestItem.teams[0].round_id-1;
          if(scrollViewRef2 && scrollViewRef){
            scrollViewRef2.current?.scrollTo({ x: responsive.size(290) * index, animated: true });
            index = index - 1
            scrollViewRef.current?.scrollToIndex({
              index: ++index,
              animated: true,
            });
          }
        }, 300);
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }, [])
  const onScroll = (index, item) => {
    setSelectedRound(item)
    scrollViewRef2.current?.scrollTo({ x: responsive.size(290) * index, animated: true });
    index = index - 1
    scrollViewRef.current?.scrollToIndex({
      index: ++index,
      animated: true,
    });
  }
  const renderRound = ({ item, index }) => (
    <Pressable opacity={isEnableRound(item) ? 1 : 0.3} disabled={!isEnableRound(item)} onPress={() => onScroll(index, item)}>
      <LinearGradient locations={[0, 1]}
        colors={selected_round == item ? ['rgba(250, 214, 12, 0.04)', 'rgba(58, 63, 77, 0.80)'] : ['rgba(58, 63, 77, 0.80)', 'rgba(58, 63, 77, 0.80)']}
        useAngle={true} angle={180} style={styles.viewRound(responsive, false, index, 7)}>
        <Text style={styles.txtRound(responsive)}>Round {item}</Text>
      </LinearGradient>
    </Pressable>
  )
  const headerViews = () => {
    let selfObj = details.leaderboard.find((e) => e.round_id == selected_round && e.user_id == userProfile.user_id)
    return (
      <View>
        <View style={styles.viewMyMatch(responsive)}>
          <Text style={styles.txtMyMatch(responsive)}>My Matchup</Text>
          <Image source={Images.ARROW} defaultSource={Images.ARROW} style={styles.imgArrow(responsive)} />
        </View>
        <View style={styles.viewRoundParent(responsive)}>
          <FlatList
            ref={el => scrollViewRef = el}
            data={Array.from({ length: contestItem?.total_round || 0 }, (_, i) => i + 1)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderRound}
            flatListRef={React.createRef()}
          />
        </View>
        {
          details.match_total &&
          <LinearGradient colors={true ? ['rgba(250, 214, 12, 0.266)', '#5b5941'] : ['rgba(58, 63, 77, 0.80)', 'rgba(58, 63, 77, 0.80)']}
            useAngle={true} angle={180} style={styles.viewScoreContainer(responsive)}>
            <View style={styles.viewScore(responsive)}>
              <Text style={styles.txtScore1(responsive)}>{`${details.match_total[selected_round].closed}/${details.match_total[selected_round].total}`}</Text>
              <Text style={styles.txtScore2(responsive)}>Match Complete</Text>
            </View>
            <View style={styles.viewScore(responsive, true)}>
              {
                (selfObj && selfObj.round_rank == 1) ?
                  <>
                    {
                      (selfObj.prize_data && selfObj.prize_data.length > 0 && selfObj.prize_data[0].prize_type == 1) ?
                        <Text style={styles.txtScore1(responsive)}>{`$${parseFloat(parseFloat(selfObj.prize_data[0].amount).toFixed(1))}`}</Text>
                        : (selfObj.prize_data && selfObj.prize_data.length > 0) ?
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: responsive.size(20), height: responsive.size(20), marginRight: responsive.size(5) }} source={selfObj.prize_data[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                            <Text style={styles.txtScore1(responsive)}>{`${parseFloat(parseFloat(selfObj.prize_data[0].amount).toFixed(1))}`}</Text>
                          </View>
                          :
                          <Text style={styles.txtScore1(responsive)}>{`$0`}</Text>
                    }
                  </>
                  :
                  <Text style={styles.txtScore1(responsive)}>--</Text>
              }
              <Text style={styles.txtScore2(responsive)}>Cash Earned</Text>
            </View>
            <View style={styles.viewScore(responsive)}>
              <Text style={styles.txtScore1(responsive)}>{selfObj ? (selfObj.round_rank == 1 && (selected_round < contestItem.current_round || !Utils.getLiveStatus(contestItem.next_round_date))) ? "WON" : (selected_round < contestItem.current_round || !Utils.getLiveStatus(contestItem.next_round_date)) ? "LOSE" : "--" : "--"}</Text>
              <Text style={styles.txtScore2(responsive)}>My Result</Text>
            </View>
          </LinearGradient>
        }

        <Text style={styles.txtSouth(responsive)}>South</Text>

      </View>
    )
  }
  const isEnableRound = (item) => {
    if (contestItem.current_round != contestItem.last_round) {
      return parseInt(contestItem.current_round) >= parseInt(item)
    } else {
      return parseInt(contestItem.last_round) >= parseInt(item)
    }
  }
  let desired_output = (array) => {
    let unique_values = [
      ...new Set(array.map((element) => element.pairing)),
    ];
    return unique_values.sort(function (a, b) { return a - b });
  };
  const userAction = (params) => {
    navigation.navigate('BracketLobby', params)
  }
  const renderHeader = () => {
    return (
      <View>
        <ScrollView horizontal
          ref={scrollViewRef2}
          scrollEnabled={false}
          style={{
            flexDirection: 'row',
          }}>
          {
            Array.from({ length: contestItem?.total_round || 0 }, (_, i) => i + 1).map((round_id, idx) => {
              let arrayData = desired_output(details.leaderboard.filter((e) => e.round_id == round_id));
              return (
                <View style={idx == 0 ? {} : { alignItems: 'center', justifyContent: 'space-around' }}>
                  {
                    arrayData.map((pairing,paringIdx) => {
                      let pairedUsers = details.leaderboard.filter((e) => e.round_id == round_id && pairing == e.pairing)
                      let top_user = undefined;
                      let bottom_user = undefined;
                      if (pairedUsers && pairedUsers.length == 2) {
                        top_user = pairedUsers[0].round_rank == 1 ? pairedUsers[0] : pairedUsers[1]
                      } else if (pairedUsers && pairedUsers.length == 1) {
                        top_user = pairedUsers[0].round_rank == 1 ? pairedUsers[0] : undefined
                      }
                      if (pairedUsers && pairedUsers.length == 2) {
                        bottom_user = pairedUsers[0].round_rank == 1 ? pairedUsers[1] : pairedUsers[0]
                      } else if (pairedUsers && pairedUsers.length == 1) {
                        bottom_user = pairedUsers[0].round_rank == 1 ? undefined : pairedUsers[0]
                      }
                      return (
                        <>
                          <Pressable onPress={() => userAction({ contestItem, userProfile, selected_sports, details, round_id, arrayData, paringIdx })} disabled={((selected_round != round_id) || (selected_round == contestItem.current_round && Utils.getLiveStatus(contestItem.next_round_date)))} style={styles.viewMatchContainer(responsive)}>
                            <View style={styles.viewFirstUser(responsive)}>
                              <ImageBackground source={Images.VIEW_RIGHT} defaultSource={Images.VIEW_RIGHT} style={styles.imgContainer(responsive)}>
                                <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                                  <Image source={Images.USER} style={styles.imgUser(responsive)} />
                                </View>
                                <Text style={styles.txtUserName(responsive)}>{top_user?.user_name || '--'}</Text>
                                <View style={styles.viewRight(responsive)}>
                                  <View style={styles.viewRank(responsive)}>
                                    {
                                      (top_user && (contestItem.current_round > top_user.round_id || (contestItem.current_round == top_user.round_id && !Utils.getLiveStatus(contestItem.next_round_date)))) &&
                                      <Image source={Images.IC_CORRECT} style={styles.imgRight(responsive)} />
                                    }
                                    <Text style={styles.txtRank(responsive)} >{parseFloat(top_user?.score)}</Text>
                                  </View>
                                  <Text style={styles.txtPoints(responsive)}>{parseFloat(top_user?.total_fantasy_points)}</Text>
                                </View>
                              </ImageBackground>
                            </View>
                            <View style={styles.viewSecondUser(responsive)}>
                              <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={Images.USER} style={styles.imgUser(responsive)} />
                              </View>
                              <Text style={styles.txtUserName(responsive)}>{bottom_user?.user_name || '--'}</Text>
                              <View style={styles.viewRight(responsive)}>
                                <View style={styles.viewRank(responsive)}>
                                  <Text style={styles.txtRank(responsive)} >{parseFloat(bottom_user?.score)}</Text>
                                </View>
                                <Text style={styles.txtPoints(responsive)}>{parseFloat(bottom_user?.total_fantasy_points)}</Text>
                              </View>
                            </View>
                          </Pressable>
                        </>
                      )
                    })
                  }
                </View>
              )
            })
          }

        </ScrollView>
      </View>
    )
  }

  return (
    <HomeBackground
      title={'Bracket'}
      backAction={() => navigation.goBack()}
      isLeftIcon={true} isBack={true} isRightIcon={false} isRightIcon1={false} isNotification={false} isInfo={false}>
      <View style={{ flex: 1, paddingVertical: responsive.size(8) }}>
        {
          apiCalling ?
            <ActivityIndicator color={Core.primaryColor} />
            :
            <>
              {headerViews()}
              <ListView
                key={"RoasterScreen"}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                enableEmptySections={true}
                style={styles.wrapper}
                dataSource={ds.cloneWithRows([])}
                renderHeader={renderHeader}
                removeClippedSubviews={!(Platform.OS == "ios")}
              />
            </>
        }
      </View>
    </HomeBackground>
  )
};
export default BracketFlow;
