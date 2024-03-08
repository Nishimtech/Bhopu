import React, { Fragment, useEffect, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { GradientView, HomeBackground, useResponsiveSizes } from '..';
import styles from './styles';
import { View, Text, Image, ActivityIndicator, Animated, Platform } from 'react-native';
import { API, Config, Constant, Core, Fonts, Images, Utils } from '../../../Helper';
import FastImage from 'react-native-fast-image';
const dummy = require('./dummy.png')


const MyTeam = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [teamItem] = useState(route?.params?.teamItem || undefined)
  const [userProfile] = useState(route?.params?.userProfile || undefined)
  const [selected_sports] = useState(route?.params?.selected_sports || undefined)
  const [apiCalling, setApiCalling] = useState(true)
  const [lineupData, setLineupData] = useState(undefined)
  const [team_info, setTeamInfo] = useState(undefined)
  const [team_detail, setTeamDetails] = useState([])


  const backAction = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (selected_sports) {
      GET_LINEUP_MASTER_DATA();
    }
  }, [selected_sports])
  GET_MY_TEAM_DATA = () => {
    let param = { "user_contest_id": teamItem.user_contest_id, "round_id": teamItem.round_id, "sports_id": selected_sports?.sports_id };
    API.GET_MY_TEAM_DATA(param).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setTeamInfo(result.data.team_info)
        setTeamDetails(result.data.team_detail)
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  GET_LINEUP_MASTER_DATA = () => {
    API.GET_LINEUP_MASTER_DATA({ 'sports_id': selected_sports?.sports_id || "" }).then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setLineupData(result.data)
        GET_MY_TEAM_DATA();
      }
    }).catch(error => {
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  const getPropsName = (prop_id) => {
    let sports_props = lineupData?.sports_props || [];
    return sports_props.find((e) => e.prop_id == prop_id).short_name
  }
  const renderHeader = () => {
    let widthAnim = new Animated.Value(1)
    return (
      <View style={{ width: '100%' }}>
        <View style={{ alignSelf: 'center', marginTop: responsive.size(20), marginBottom: responsive.size(30), width: '94%', borderRadius: responsive.size(10), paddingVertical: responsive.size(5), overflow: 'hidden' }}>
          <Image style={{ position: 'absolute', width: '100%' }} source={Images.MYTEAMBG} defaultSource={Images.MYTEAMBG} resizeMode='stretch' />
          <View style={{ marginHorizontal: '1.5%', width: '97%', height: responsive.size(38), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(14), backgroundColor: '#292D32', justifyContent: 'center' }}>
            <Text style={{ fontSize: responsive.fontSize(Fonts.xl), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{team_info.contest_name}</Text>
          </View>
          <View style={{ marginHorizontal: '1.5%', width: '97%', height: responsive.size(team_info.is_winner == '1' ? 84 : 63), flexDirection: 'row', justifyContent: 'space-between', paddingVertical: responsive.size(7) }}>
            <View style={{ flex: 1, paddingRight: responsive.size(15) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                  team_info.user_id == userProfile.user_id ?
                    <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22) }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                    :
                    <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22) }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + team_info.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                }
                <View style={{ marginLeft: responsive.size(5), flex: 1 }}>
                  <Text style={{ fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'left', color: '#FFF' }}>{team_info.user_name}({team_info.team_short_name})</Text>
                  <Text style={{ marginTop: responsive.size(-5), fontSize: responsive.fontSize(Fonts.md), fontFamily: Fonts.medium, textAlign: 'left', color: '#BEBEBE' }}>{team_info.game_rank} / {team_info.total_user_joined || contestItem.total_user_joined}</Text>
                </View>
              </View>
              {
                (team_info.is_winner == '1' && JSON.parse(team_info.prize_data).length > 0) &&
                <View style={{ marginTop: responsive.size(7), alignSelf: 'flex-start', paddingHorizontal: responsive.size(10), alignItems: 'center', justifyContent: 'center', height: responsive.size(21), borderRadius: responsive.size(60), backgroundColor: 'rgba(250, 250, 250, 0.15)' }}>
                  {
                    (JSON.parse(team_info.prize_data)[0].prize_type == 1) ?
                      <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'center', color: '#FAD60C' }}>{`$${JSON.parse(team_info.prize_data)[0].amount}`}</Text>
                      :
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: responsive.size(14), height: responsive.size(14), marginRight: responsive.size(3) }} source={JSON.parse(team_info.prize_data)[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={JSON.parse(team_info.prize_data)[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                        <Text style={{ fontSize: responsive.fontSize(Fonts.md), lineHeight: responsive.fontSize(Fonts.md_lineheight), fontFamily: Fonts.medium, textAlign: 'center', color: '#FAD60C' }}>{`${JSON.parse(team_info.prize_data)[0].amount}`}</Text>
                      </View>
                  }
                </View>
              }
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ marginTop: responsive.size(-15), fontSize: responsive.fontSize(Fonts.h3), fontFamily: Fonts.semibold, textAlign: 'right', color: '#FAD60C' }}>{team_info.total_score}</Text>
              <Text style={{ marginTop: responsive.size(-15), fontSize: responsive.fontSize(Fonts.lg), fontFamily: Fonts.semibold, textAlign: 'right', color: '#BEBEBE' }}>{team_info.total_fan_points}</Text>
            </View>
          </View>
          <View style={{ marginTop: responsive.size(2), marginHorizontal: '1.5%', width: '97%', height: responsive.size(6), borderRadius: responsive.size(60), backgroundColor: 'rgba(250, 214, 12, 0.20)', alignSelf: 'center', overflow: 'hidden' }}>
            <Animated.View style={{ width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${parseFloat(team_info.total_closed) / (parseFloat(team_info.total_matches) / 100)}%`], }), height: '100%', backgroundColor: Core.primaryColor }} />
          </View>
          <View style={{ marginBottom: responsive.size(10), marginTop: responsive.size(5), marginHorizontal: '1.5%', width: '97%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: 'rgba(255, 255, 255, 0.60)', textAlign: 'left', fontFamily: Fonts.regular }}>Complete</Text>
            <Text style={{ fontSize: responsive.fontSize(Fonts.md), color: 'rgba(255, 255, 255, 0.60)', textAlign: 'right', fontFamily: Fonts.regular }}>{team_info.total_closed}/{team_info.total_matches}</Text>
          </View>
          <Image style={{ position: 'absolute', width: responsive.size(30), right: responsive.fontSize(82), bottom: responsive.size(17) }} source={Images.SPARK} defaultSource={Images.SPARK} />
        </View>
        {
          team_detail.filter((e) => e.ice_pick == 0).map((item, idx) => {
            const isTrue = (item.prediction_points <= item.user_points && item.type == 1) || (item.prediction_points >= item.user_points && item.type == 2)
            return (
              <View style={{ alignSelf: 'center', marginBottom: responsive.size(30), width: '94%', height: responsive.size(76), borderRadius: responsive.size(10), borderWidth: 1, borderColor: (item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? '#F4D50D' : 'transparent' }}>
                <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ marginTop: responsive.size(10), width: '100%', height: responsive.size(76), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), borderWidth: 1, borderColor: "#6A6F76", flexDirection: 'row' }}>
                  <View style={{ paddingTop: responsive.size(15), marginRight: responsive.size(5), flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      {
                        item.jersey ?
                          <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                          :
                          <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                      }
                      <Text style={{ fontSize: Fonts.md, color: Core.white, fontFamily: Fonts.semibold, textAlign: 'left' }}>{item.display_name}</Text>
                    </View>
                    <View style={{ width: 'auto', justifyContent: 'center' }}>
                      <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -8 : -4), fontSize: Fonts.xxl, color: isTrue ? '#FAD60C' : "#BEBEBE", fontFamily: Fonts.bold, textAlign: 'left' }}>{`${item.prediction_points}`}</Text>
                      <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -5 : -9), fontSize: Fonts.md, color: '#BEBEBE', fontFamily: Fonts.medium, textAlign: 'left' }}>{`${item.home} vs ${item.away}`}</Text>
                      <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -2 : -5), width: '100%', fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'left' }}>{`${item.score_data?.home_score || ''} | ${item.score_data?.away_score || ''} `}</Text>
                    </View>
                  </View>
                  <View style={{ paddingTop: responsive.size(15), marginLeft: responsive.size(5), flex: 0.7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ alignSelf: 'center', minWidth: responsive.size(49), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        (!item.score_data?.quarter && (!item.score_data?.time_remaining || item.score_data?.time_remaining == ":")) ?
                          <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{'N/A'}</Text>
                          :
                          <>
                            <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{item.score_data?.quarter || 'N/A'}</Text>
                            <Text style={{ marginTop: responsive.size(-6), fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.score_data?.time_remaining == ':' ? 'N/A' : item.score_data?.time_remaining || 'N/A'}</Text>
                          </>
                      }
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ backgroundColor: (item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? '#FA0C45' : '#919DB1', alignItems: 'center', flexDirection: 'row', height: responsive.size(16), borderRadius: responsive.size(20), paddingHorizontal: responsive.size(4) }}>
                        <Text style={{ marginTop: responsive.size(-4), marginHorizontal: responsive.size(2), fontSize: Fonts.md, lineHeight: Fonts.md_lineheight, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{'•'}</Text>
                        <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? 0 : -2.5), fontSize: Fonts.md, lineHeight: Fonts.md_lineheight, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{'LIVE'}</Text>
                      </View>
                      <Text style={{ fontSize: Fonts.xl, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{(item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? item.score : item.final_score}</Text>
                    </View>
                    <View style={{ alignSelf: 'center', minWidth: responsive.size(49), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{item.type == 1 ? "UNDER" : "OVER"}</Text>
                      <Text style={{ marginTop: responsive.size(-6), fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.user_points}</Text>
                    </View>
                  </View>
                </GradientView>
                <View style={{ position: 'absolute', top: responsive.size(0), width: '94%', alignSelf: 'center', height: responsive.size(20), paddingHorizontal: responsive.size(1), borderRadius: responsive.size(6), backgroundColor: '#484B50', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ height: responsive.size(18), width: responsive.size(28), borderRadius: responsive.size(5), backgroundColor: '#3A3F45', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#6A6F76' }}>
                    <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -1 : -4), fontSize: Fonts.md, color: '#FAD60C', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.position}</Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? 0 : -2.5), marginRight: responsive.size(10), fontSize: Fonts.md, color: '#FAD60C', fontFamily: Fonts.medium, textAlign: 'right' }}>{getPropsName(item.prop_id)}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }


      </View>
    )
  }
  const getPropsFieldName = (prop_id) => {
    let sports_props = lineupData?.sports_props || [];
    return sports_props.find((e) => e.prop_id == prop_id).fields_name
  }
  const renderFooter = () => {
    if (team_detail.filter((e) => e.ice_pick == 1).length == 0) { return null }
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Fragment>
          <Image style={{ alignSelf: 'center', marginBottom: responsive.size(25) }} source={Images.PNPHEADER} defaultSource={Images.PNPHEADER} />
          <Fragment>
            {
              team_detail.filter((e) => e.ice_pick == 1).map((item, idx) => {
                const isTrue = (item.prediction_points <= item.user_points && item.type == 1) || (item.prediction_points >= item.user_points && item.type == 2)

                return (
                  <View style={{ alignSelf: 'center', marginBottom: responsive.size(30), width: '94%', height: responsive.size(76), borderRadius: responsive.size(10), borderWidth: 1, borderColor: (item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? '#F4D50D' : 'transparent' }}>
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={{ marginTop: responsive.size(10), width: '100%', height: responsive.size(76), borderRadius: responsive.size(10), paddingHorizontal: responsive.size(10), borderWidth: 1, borderColor: "#6A6F76", flexDirection: 'row' }}>
                      <View style={{ paddingTop: responsive.size(15), marginRight: responsive.size(5), flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                          {
                            item.jersey ?
                              <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                              :
                              <Image style={{ width: responsive.size(48), height: responsive.size(35) }} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                          }
                          <Text style={{ fontSize: Fonts.md, color: Core.white, fontFamily: Fonts.semibold, textAlign: 'left' }}>{item.display_name}</Text>
                        </View>
                        <View style={{ width: 'auto', justifyContent: 'center' }}>
                          <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -8 : -4), fontSize: Fonts.xxl, color: isTrue ? "#FAD60C" : "#BEBEBE", fontFamily: Fonts.bold, textAlign: 'left' }}>{`${item.prediction_points}`}</Text>
                          <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -5 : -9), fontSize: Fonts.md, color: '#BEBEBE', fontFamily: Fonts.medium, textAlign: 'left' }}>{`${item.home} vs ${item.away}`}</Text>
                          <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? -2 : -5), width: '100%', fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'left' }}>{`${item.score_data?.home_score || ''} | ${item.score_data?.away_score || ''} `}</Text>
                        </View>
                      </View>
                      <View style={{ paddingTop: responsive.size(15), marginLeft: responsive.size(5), flex: 0.7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'center', minWidth: responsive.size(49), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                          {
                            (!item.score_data?.quarter && (!item.score_data?.time_remaining || item.score_data?.time_remaining == ":")) ?
                              <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{'N/A'}</Text>
                              :
                              <>
                                <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{item.score_data?.quarter || 'N/A'}</Text>
                                <Text style={{ marginTop: responsive.size(-6), fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.score_data?.time_remaining == ':' ? 'N/A' : item.score_data?.time_remaining || 'N/A'}</Text>
                              </>
                          }
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ backgroundColor: (item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? '#FA0C45' : '#919DB1', alignItems: 'center', flexDirection: 'row', height: responsive.size(16), borderRadius: responsive.size(20), paddingHorizontal: responsive.size(4) }}>
                            <Text style={{ marginTop: responsive.size(-4), marginHorizontal: responsive.size(2), fontSize: Fonts.md, lineHeight: Fonts.md_lineheight, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{'•'}</Text>
                            <Text style={{ marginTop: responsive.size(Platform.OS == 'ios' ? 0 : -2.5), fontSize: Fonts.md, lineHeight: Fonts.md_lineheight, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{'LIVE'}</Text>
                          </View>
                          <Text style={{ fontSize: Fonts.xl, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{(item.status == 0 && Utils.getLiveStatus(item.schedule_date)) ? item.score : item.final_score}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', minWidth: responsive.size(49), borderRadius: responsive.size(9), paddingHorizontal: responsive.size(4), height: responsive.size(35), backgroundColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, borderColor: '#6A6F76', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.regular, textAlign: 'center' }}>{item.type == 1 ? "UNDER" : "OVER"}</Text>
                          <Text style={{ marginTop: responsive.size(-6), fontSize: Fonts.md, color: '#FFF', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.user_points}</Text>
                        </View>
                      </View>
                    </GradientView>
                    <View style={{ position: 'absolute', top: responsive.size(0), width: '94%', alignSelf: 'center', height: responsive.size(20), paddingHorizontal: responsive.size(1), borderRadius: responsive.size(6), backgroundColor: '#484B50', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                      <View style={{ height: responsive.size(18), width: responsive.size(28), borderRadius: responsive.size(5), backgroundColor: '#3A3F45', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#6A6F76' }}>
                        <Text style={{ marginTop: responsive.fontSize(Platform.OS == 'ios' ? -1 : -4), fontSize: responsive.fontSize(Fonts.md), color: '#FAD60C', fontFamily: Fonts.semibold, textAlign: 'center' }}>{item.position}</Text>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ marginTop: responsive.fontSize(Platform.OS == 'ios' ? 0 : -2.5), marginRight: responsive.size(10), fontSize: responsive.fontSize(Fonts.md), color: '#FAD60C', fontFamily: Fonts.medium, textAlign: 'right' }}>{getPropsName(item.prop_id)}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </Fragment>
        </Fragment>
      </View>
    )
  }
  return (
    <HomeBackground title={team_info ? (team_info.user_id == userProfile.user_id ? "My Team" : `${team_info.user_name} Team`) : "Team"} rightAction={() => backAction()} isCross={true} isRightIcon={true}>
      <View style={{ flex: 1 }}>
        {
          apiCalling ?
            <ActivityIndicator style={{ marginTop: responsive.size(20) }} color={Core.primaryColor} />
            : (team_info && team_detail) &&
            <ListView
              key={"MyTeam"}
              keyboardShouldPersistTaps='handled'
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={styles.wrapper}
              dataSource={ds.cloneWithRows([])}
              renderHeader={renderHeader}
              renderFooter={renderFooter}
              removeClippedSubviews={!(Platform.OS == "ios")}
            />
        }
      </View>

    </HomeBackground>
  )

};
export default MyTeam;
