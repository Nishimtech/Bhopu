import React, { Fragment, useEffect, useState } from 'react';
import { API, AppPreferences, Core, EmptyScreen, GradientView, HomeBackground, PreferenceConstant, useResponsiveSizes } from '..';
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image, Platform } from 'react-native';
import ListView from "deprecated-react-native-listview";
import styles from './styles';
import { Config, Constant, Fonts, Images, Utils } from '../../../Helper';
import { SvgUri } from 'react-native-svg';
import { ConfirmationJoin } from '../../Components';
import FastImage from 'react-native-fast-image';

const LobbyDetail = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const [selectIdx, setSelectIdx] = useState(0)
  const [selectIdxPrize, setSelectIdxPrize] = useState(0)
  const [contestItem, setContestItem] = useState(route?.params?.contestItem || undefined)
  const [sportsData, setSportsData] = useState(undefined)
  const [apiCalling, setApiCalling] = useState(false)
  const [isLoadMore, setLoadMore] = useState(false)
  const [page_no, setPageNo] = useState(1)
  const [dataSportsHub, setSportsHubData] = useState([])
  const [userBalance] = useState(route?.params?.userBalance || 0)
  const [IsMyContest] = useState(route?.params?.IsMyContest || false)
  const [userProfile] = useState(route?.params?.userProfile || undefined)
  const [isVisible, setVisible] = useState(false)
  const [dataGames, setGamesData] = useState([])
  const [total_user_joined,setTotaluserJoined]= useState(-1)
  const [arrUsers,setArrUsers]= useState([])
  const [notificationCount] = useState(route?.params?.notificationCount || 0);

  useEffect(() => {
    if (selectIdx > 0) {
      if (selectIdx == 1 && dataGames.length == 0) {
        setApiCalling(true)
        API.GET_FIXTURE_DETAILS({ 'collection_id': contestItem?.collection_id || '', 'sports_id': sportsData?.sports_id || "" }).then(async (response) => {
          let result = response.data;
          setApiCalling(false)
          if (result.response_code == Constant.SUCCESS_STATUS) {
            const unique = [...new Set(result.data.map(item => item.round_id))];
            let arrayData = [];
            unique.map(round_id => {
              let obj = {
                name: `Round ${round_id}`,
                data: result.data.filter((e) => e.round_id == round_id)
              }
              arrayData.push(obj)
            })
            setGamesData(arrayData)
          }
        }).catch(error => {
          setApiCalling(false)
          Utils.handleCatchError(error, navigation)
          return error;
        });
      } else if (selectIdx == 3 && total_user_joined == -1) {
        setApiCalling(true)
        API.GET_CONTEST_USERS({ 'page_no': page_no, page_size: 20, 'collection_id': contestItem?.collection_id || '', 'contest_id': contestItem?.contest_id || "" }).then(async (response) => {
          let result = response.data;
          setApiCalling(false)
          if (result.response_code == Constant.SUCCESS_STATUS) {
            setArrUsers(result.data.users)
            setTotaluserJoined(result.data.total_user_joined)
          }
        }).catch(error => {
          setApiCalling(false)
          Utils.handleCatchError(error, navigation)
          return error;
        });
      }
    } else {
      setApiCalling(false)
    }
  }, [selectIdx])
  useEffect(() => {
    Promise.all([
      AppPreferences.getItem(PreferenceConstant.SPORTS_HUB_DATA),
    ]).then((dictObj) => {
      if (dictObj != null) {
        setSportsHubData(JSON.parse(dictObj).game_type)
        setApiCalling(!contestItem)
        API.GET_CONTEST_DETAIL({ 'contest_id': contestItem.contest_id }).then(async (response) => {
          let result = response.data;
          setApiCalling(false)
          if (result.response_code == Constant.SUCCESS_STATUS) {
            setSportsData(JSON.parse(dictObj).sports_list.find((e) => e.sports_id == result.data.sports_id))
            setContestItem(result.data)
          }
        }).catch(error => {
          setApiCalling(false)
          Utils.handleCatchError(error, navigation)
          return error;
        });
      }
    })
  }, [])
  const rightAction = () => {
    navigation.goBack()
  }
  const moveToRoasterScreen = () => {
    let array = [];
    dataGames.map(itm=>{
      array = [...array,...itm.data]
    })
    navigation.navigate('RoasterScreen', { notificationCount,userBalance,contestItem,dataGames:array })
    setVisible(false)
  }
  
  const returnContestName = () => {
    let ObjSports = dataSportsHub.find((e) => e.type_id == contestItem.group_type);
    if (ObjSports) {
      return ObjSports.name
    }
    return ''
  }
  const renderInfo = () => {
    return (
      <View style={styles.mainContainer(responsive)}>
        {
          apiCalling ?
            <ActivityIndicator color={Core.primaryColor} />
            :
            <Fragment>
              <View style={styles.viewInfo(responsive)}>
                <Text style={styles.txtContest(responsive)}>{Utils._i18n('Contest Details')}</Text>
                <View style={styles.viewContestDetails(responsive)}>
                  <View style={styles.viewDetails(responsive)} >
                    <Image style={styles.imgRectangle} source={Images.RECTANGLE} />
                    <Text style={styles.txtWindow(responsive)}>{Utils._i18n("Contest Window")}</Text>
                    <Text style={styles.txtContestWindow(responsive)}>{returnContestName()}</Text>
                  </View>
                  <View style={styles.viewDetails(responsive)} >
                    <Image style={styles.imgRectangle} source={Images.RECTANGLE} />
                    <Text style={styles.txtWindow(responsive)}>{Utils._i18n("Contest Type")}</Text>
                    <Text style={styles.txtContestWindow(responsive)}>{contestItem.contest_type || contestItem.group_name}</Text>
                  </View>
                  <View style={styles.viewDetails(responsive)} >
                    <Image style={styles.imgRectangle} source={Images.RECTANGLE} />
                    <Text style={styles.txtWindow(responsive)}>{Utils._i18n("Contest Mode")}</Text>
                    <Text style={styles.txtContestWindow(responsive)}>{contestItem.contest_mode}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.viewInfo(responsive)}>
                <Text style={styles.txtContest(responsive)}>{'Contest Window'}</Text>
                <View style={styles.viewWindow(responsive)}>
                  <Text style={styles.txtJoin(responsive)}>{Utils._i18n("Join contest")}</Text>
                  <View style={styles.viewContestWindow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollWindow(responsive)}>
                      {
                        dataSportsHub.map((itm, idx) => {
                          return (
                            <View key={idx} style={styles.viewWindowContest(responsive, idx, dataSportsHub)}>
                              <Text style={styles.txtName(responsive)}>{itm.name}</Text>
                              <Text style={styles.txtDesc(responsive)}>{itm.desc}</Text>
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </View>
              <View style={styles.viewContestType(responsive)}>
                <Text style={styles.txtContest(responsive)}>{Utils._i18n('Contest Type')}</Text>
                <GradientView colors={[Core.tuna_color, Core.bright_gray]} styles={styles.viewContest(responsive)}>
                  <Text style={styles.txtFormat(responsive)}>{Utils._i18n("Contest  formats")}</Text>
                  <View style={styles.viewInner(responsive)}>
                    <View style={styles.viewTypeHeader}>
                      <Text style={styles.txtTypeHeader(responsive)}>{Utils._i18n("Tournament")}</Text>
                      <View style={styles.viewTourney(responsive)}>
                        <Text style={styles.txtBtn(responsive)}>{Utils._i18n("Tourney")}</Text>
                      </View>
                    </View>
                    <Text style={styles.txtTypeDesc(responsive)}>{Utils._i18n("Complete")}</Text>
                  </View>
                  <View style={styles.viewInner(responsive)}>
                    <View style={styles.viewTypeHeader}>
                      <Text style={styles.txtTypeHeader(responsive)}>{Utils._i18n("Head 2 Head")}</Text>
                      <View style={styles.viewHead(responsive)}>
                        <Text style={styles.txtBtn(responsive)}>{Utils._i18n("H2H")}</Text>
                      </View>
                    </View>
                    <Text style={styles.txtTypeDesc(responsive)}>{Utils._i18n("Compete single opponent")}</Text>
                  </View>
                  <View style={styles.viewInner(responsive)}>
                    <View style={styles.viewTypeHeader}>
                      <Text style={styles.txtTypeHeader(responsive)}>{Utils._i18n("Bracket")}</Text>
                      <View style={styles.viewBrckt(responsive)}>
                        <Text style={styles.txtBtn(responsive)}>{Utils._i18n("Bracket")}</Text>
                      </View>
                    </View>
                    <Text style={styles.txtTypeDesc(responsive)}>{Utils._i18n("Bracket-desc")}</Text>
                  </View>
                  <View style={{ width: '100%' }}>
                    <View style={styles.viewTypeHeader}>
                      <Text style={styles.txtTypeHeader(responsive)}>{Utils._i18n("League")}</Text>
                      <GradientView colors={[Core.Ripe_Lemon, Core.buddha_gold]} styles={styles.leagueBox(responsive)}>
                        <Text style={styles.txtBtn(responsive)}>{Utils._i18n("League")}</Text>
                      </GradientView>
                    </View>
                    <Text style={styles.txtTypeDesc(responsive)}>{Utils._i18n("League-desc")}</Text>
                  </View>
                </GradientView>
              </View>
              <View style={styles.viewContestType(responsive)}>
                <Text style={styles.txtContest(responsive)}>{'Contest Mode'}</Text>
                <GradientView colors={[Core.tuna_color, Core.bright_gray]} styles={styles.viewContest(responsive)}>
                  <Text style={styles.txtMode(responsive)}>{Utils._i18n("Mode-text")}</Text>
                  <View style={styles.viewContestWindow}>
                    <View style={styles.viewContestMode(responsive)}>
                      <Text style={styles.txtSlcton(responsive)}>3 Selections</Text>
                      <Text style={styles.txtPick(responsive)}>PICK3</Text>
                    </View>
                    <View style={styles.viewContestMode(responsive)}>
                      <Text style={styles.txtSlcton(responsive)}>5 Selections</Text>
                      <Text style={styles.txtPick(responsive)}>PICK5</Text>
                    </View>
                    <View style={styles.viewContestMode(responsive)}>
                      <Text style={styles.txtSlcton(responsive)}>7 Selections</Text>
                      <Text style={styles.txtPick(responsive)}>PICK7</Text>
                    </View>
                  </View>
                </GradientView>
              </View>
            </Fragment>
        }
      </View>
    )
  }
  const renderGames = () => {
    return (
      <View style={styles.header_container(responsive)}>
        {
          apiCalling ?
            <ActivityIndicator color={Core.primaryColor} />
            :
            <Fragment>
              {
                dataGames.map((item) => {
                  return (
                    <View key={item.name} style={styles.viewGame(responsive)}>
                      <Text style={styles.txtRound(responsive)}>{item.name}</Text>
                      {
                        item.data && item.data.map((itm) => {
                          return (
                            <GradientView colors={[Core.tuna_color, Core.bright_gray]} styles={styles.viewRound(responsive)}>
                              <View style={styles.viewHome}>
                                {
                                  itm.home_flag && itm.home_flag.includes('svg')?
                                    <SvgUri width={responsive.size(33)} height={responsive.size(33)} uri={Config.s3URL + "upload/flag/" + itm.home_flag} />
                                  :
                                    <Image style={{width:responsive.size(33),height:responsive.size(33)}}  source={{uri:Config.s3URL + "upload/flag/" + itm.home_flag}} />
                                }
                                <Text style={styles.txtHome(responsive)}>{itm.home}</Text>
                              </View>
                              <View style={styles.viewTimeDate(responsive)}>
                                <Image source={Images.VS} defaultSource={Images.VS} />
                                <View style={styles.viewDateDay(responsive)}>
                                  <Text style={styles.txtDateTime(responsive)}>{Utils.getFormatedDateUTC(itm.scheduled_date, 'MMM DD | HH:mm A')}</Text>
                                </View>
                              </View>
                              <View style={styles.viewHome}>
                              {
                                  itm.away_flag && itm.away_flag.includes('svg')?
                                    <SvgUri width={responsive.size(33)} height={responsive.size(33)} uri={Config.s3URL + "upload/flag/" + itm.away_flag} />
                                  :
                                    <Image style={{width:responsive.size(33),height:responsive.size(33)}}  source={{uri:Config.s3URL + "upload/flag/" + itm.away_flag}} />
                                }
                                <Text style={styles.txtHome(responsive)}>{itm.away}</Text>
                              </View>
                            </GradientView>
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </Fragment>
        }
      </View>
    )
  }
  const renderPrize = () => {
    return (
      <View style={styles.viewPrizeItm(responsive)}>
        <Image style={styles.imageBlurLeft} source={Images.blurTopLeft} defaultSource={Images.blurTopLeft} />
        <View style={styles.viewPrize(responsive)}>
          <Text style={styles.txtPrize(responsive)}>{`Rank`}</Text>
          <Text style={styles.txtPrize(responsive)}>{`Type`}</Text>
          <Text style={styles.txtPrize(responsive)}>{`Prize`}</Text>
        </View>
        {
          ((selectIdxPrize==0?contestItem.prize_distibution_detail:contestItem.current_prize) || []).map((item) => {
            let amount = selectIdxPrize == 0 ?item.max_value:parseFloat(item.amount).toFixed(2)
            return (
              <View style={styles.viewPrizeType(responsive)}>
                <Text style={styles.txtRank(responsive)}>{item.max == item.min ? Utils.addSuffix(item.max) : `${Utils.addSuffix(item.min)} - ${Utils.addSuffix(item.max)}`}</Text>
                <Text style={styles.txtRank(responsive)}>{item.prize_type == 1 ? `Real Cash` :item.prize_type == 2?'Coins': 'Bonus'}</Text>
                {
                (item.prize_type == 1 ) ?
                  <Text style={styles.txtRank(responsive)}>{`$${item.min==item.max?parseFloat(amount):(parseFloat(amount)/((parseInt(item.max)+1)-item.min))}`}</Text>
                :
                  <View style={{ width:'45%',flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: responsive.size(14), height: responsive.size(14), marginRight:responsive.size(4) }} source={item.prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                    <Text style={{ fontSize: responsive.size(Fonts.lg),fontFamily: Fonts.semibold,textAlign: 'center',color: '#FFF',}}>{`${item.min==item.max?parseFloat(amount):parseFloat(parseFloat(amount/((parseInt(item.max)+1)-item.min)).toFixed(2))}`}</Text>
                  </View>
              }
              </View>
            )
          })
        }
      </View>
    )
  }
  const renderEntries = () => {
    return (
      <View style={styles.viewEntry(responsive)}>
        <View style={styles.lineContainer(responsive)}>
          <View style={{ width: `${parseInt(contestItem.total_user_joined) / (parseInt(contestItem.size) / 100)}%`, height: '100%', backgroundColor: Core.primaryColor }} />
        </View>
        <View style={styles.viewMinMax(responsive)}>
          <Text style={styles.txtTotalEntry(responsive)}>{contestItem.total_user_joined} / <Text style={{ color: '#919DB1' }}>{contestItem.size} {Utils._i18n("Entries")}</Text></Text>
          <Text style={styles.textMin(responsive)}>{Utils._i18n("min")} {contestItem.minimum_size} | Max {contestItem.size}</Text>
        </View>
        {
          apiCalling ?
            <ActivityIndicator color={Core.primaryColor} />
            : !apiCalling && total_user_joined == 0 &&
            <EmptyScreen title={Utils._i18n('There is no record found')} />
        }
      </View>
    )
  }
  const renderItem = (data,rowID) => {
    return (
      <View style={styles.itemContainer(responsive,rowID,arrUsers)}>
        <View style={styles.viewItm}>
          <FastImage style={styles.viewBox(responsive)} source={{ uri: Config.s3URL + "upload/profile/thumb/" +data.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
          <Text style={styles.txtUserName(responsive)}>{data.user_name}</Text>
        </View>
        <Text style={styles.txtTeam(responsive)}>{data.user_join_count > 0?`${data.user_join_count} Teams`:`${data.user_join_count} Team`}</Text>
      </View>
    )
  }
  const handleLoadMore = () => {
    if (!isLoadMore && !apiCalling && total_user_joined > arrUsers.length ) {
      setLoadMore(true)
      let pageNo = parseInt(page_no) + 1;
      setPageNo(pageNo)
      API.GET_CONTEST_USERS({ 'page_no': pageNo, page_size: 20, 'collection_id': contestItem?.collection_id || '', 'contest_id': contestItem?.contest_id || "" }).then(async (response) => {
        let result = response.data;
        if (result.response_code == Constant.SUCCESS_STATUS) {
          setArrUsers([...arrUsers,...result.data.users])
        }
      }).catch(error => {
        Utils.handleCatchError(error, navigation)
        return error;
      });
     
    }
  };
  return (
    <HomeBackground subtitle={contestItem ? Utils.getFormatedDateUTC(contestItem.scheduled_date, 'DD MMM, HH:mm A') : ""} title={contestItem ? contestItem.contest_name : 'Processing...'} isLeftIcon={true} isRightIcon={true} isCross={true} isHeaderBorder={false} sportsData={sportsData} ic_sports={true} rightAction={rightAction}>
      <View style={styles.container(responsive)}>
        {
          contestItem &&
          <TouchableOpacity disabled={((contestItem.total_user_joined == contestItem.size) || (IsMyContest && contestItem.multiple_lineup == 1))} onPress={()=>{contestItem.entry_fee == 0 ? moveToRoasterScreen() : setVisible(true)}}>
            <GradientView colors={((contestItem.total_user_joined == contestItem.size) || (IsMyContest && contestItem.multiple_lineup == 1))?['#999', '#999']:['#FAD60C', '#D8BA13']} styles={styles.topBtnContainer(responsive)}>
              {
                (contestItem.currency_type == 1) ?
                <Text style={styles.freeBtnTxt(responsive)}>{`Join for $${contestItem.entry_fee}`}</Text>
                :
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.freeBtnTxt(responsive)}>{`Join for  `}</Text>
                    <Image style={{ width: responsive.size(18), height: responsive.size(18), marginRight:responsive.size(-2) }} source={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                    <Text style={styles.freeBtnTxt(responsive)}>{` ${contestItem.entry_fee}`}</Text>
                  </View>
              }
            </GradientView>
          </TouchableOpacity>
        }
        <View style={styles.viewHeader(responsive)}>
          <TouchableOpacity onPress={() => setSelectIdx(0)} style={styles.touchText}>
            <Text style={styles.txtHeaderInfo(responsive, selectIdx)}>{Utils._i18n("Info")}</Text>
            <View style={styles.viewHeaderInfo(responsive, selectIdx)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectIdx(1)} style={styles.touchText}>
            <Text style={styles.txtHeaderGames(responsive, selectIdx)}>{Utils._i18n("Games")}</Text>
            <View style={styles.viewHeaderGames(responsive, selectIdx)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectIdx(2)} style={styles.touchText}>
            <Text style={styles.txtHeaderPrize(responsive, selectIdx)}>{Utils._i18n("Prizes")}</Text>
            <View style={styles.viewHeaderPrize(responsive, selectIdx)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectIdx(3)} style={styles.touchText}>
            <Text style={styles.txtHeaderEntry(responsive, selectIdx)}>{Utils._i18n("Entries")}</Text>
            <View style={styles.viewHeaderEntry(responsive, selectIdx)} />
          </TouchableOpacity>
        </View>
      </View>
      {
        selectIdx == 2  &&
          <GradientView colors={['#3A3E44','#3A3F4D']} styles={{alignSelf:'center',flexDirection:'row',alignItems:'center',width:'94%',marginTop:responsive.size(20),height:responsive.size(48),borderRadius:responsive.size(10)}}>
                <TouchableOpacity onPress={()=>setSelectIdxPrize(0)} style={{width:'50%',height:responsive.size(38),alignItems:'center',justifyContent:'center',borderWidth:selectIdxPrize==0?1:0,borderColor:Core.primaryColor,borderRadius:responsive.size(10)}}>
                      <Text style={{fontSize:responsive.fontSize(Fonts.lg),fontFamily:Fonts.medium,color:selectIdxPrize==0?Core.primaryColor:'#BEBEBE',textAlign:'center'}}>Maximum</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setSelectIdxPrize(1)} style={{width:'50%',height:responsive.size(38),alignItems:'center',justifyContent:'center',borderWidth:selectIdxPrize==1?1:0,borderColor:Core.primaryColor,borderRadius:responsive.size(10)}}>
                      <Text style={{fontSize:responsive.fontSize(Fonts.lg),fontFamily:Fonts.medium,color:selectIdxPrize==1?Core.primaryColor:'#BEBEBE',textAlign:'center'}}>Current</Text>
                </TouchableOpacity>
          </GradientView>
      }
      <ListView
        key={"LobbyDetail"}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        style={styles.wrapper}
        dataSource={ds.cloneWithRows(selectIdx == 3 ? arrUsers : [])}
        renderRow={(data, sectionID, rowID, higlightRow) => selectIdx == 3?renderItem(data, rowID):{}}
        renderHeader={selectIdx == 0 ? renderInfo : selectIdx == 1 ? renderGames : selectIdx == 2 ? renderPrize : renderEntries}
        removeClippedSubviews={!(Platform.OS == "ios")}
        onEndReached={() => handleLoadMore()}
        onEndThreshold={0.9}
        onEndReachedThreshold={200}
        pageSize={20}
      />
      <ConfirmationJoin userProfile={userProfile} userBalance={userBalance} contestItem={contestItem} openAlert={isVisible} actionBtn={() => moveToRoasterScreen()} onDismiss={() => setVisible(false)} />
    </HomeBackground>
  )
}
export default LobbyDetail;
