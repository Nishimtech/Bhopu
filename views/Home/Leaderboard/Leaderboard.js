import React, {  Fragment, useEffect, useRef, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import {  HomeBackground, useResponsiveSizes,  Images, Utils, Constant, API } from '..';
import {  ActivityIndicator, Image,  ImageBackground,  Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import { Config, Core } from '../../../Helper';

const Leaderboard = ({ navigation, route }) => {
  const responsive = useResponsiveSizes();
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const scrollViewRef = useRef();
  const [contestItem] = useState(route?.params?.contestItem || undefined)
  const [userProfile] = useState(route?.params?.userProfile || undefined)
  const [selected_sports] = useState(route?.params?.selected_sports || undefined)
  const [apiCalling, setApiCalling] = useState(true)
  const [arrayData,setArrayData] = useState([])
  const [prizeData,setPrizeData] = useState([])

  useEffect(()=>{
    GET_CONTEST_LEADERBOARD()
  },[])
  GET_CONTEST_LEADERBOARD = () => {
    let params = { "sports_id": selected_sports?.sports_id, "contest_id": contestItem.contest_id,page_size:'20',page_no:'1'}
    API.GET_CONTEST_LEADERBOARD(params).then(async (response) => {
      let result = response.data;
      setApiCalling(false)
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setPrizeData(result.data.prize_data || [])
        setArrayData([...result.data.own,...result.data.other_list].sort((a,b)=> (a.game_rank < b.game_rank && a.total_score > b.total_score)?-1:1))
      }
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, props.navigation)
      return error;
    });
  }
  const returnAmt =(item)=>{
      let findRankObj = prizeData.find((e)=>e.min >= item.game_rank && item.game_rank <= e.max)
      let prizeAmount = { 'real': 0, 'bonus': 0, 'point': 0 };
      if(findRankObj){
        if(findRankObj.prize_type == 1){
          prizeAmount.real =  parseFloat(parseFloat(findRankObj.amount/((findRankObj.max -findRankObj.min)+1)).toFixed(2))
        }else if(findRankObj.prize_type == 2){
          prizeAmount.point =  parseFloat(parseFloat(findRankObj.amount/((findRankObj.max -findRankObj.min)+1)).toFixed(2))
        }else{
          prizeAmount.bonus =  parseFloat(parseFloat(findRankObj.amount/((findRankObj.max -findRankObj.min)+1)).toFixed(2))
        }
      }
      return prizeAmount
  }
  const moveToMyTeamScreen = (teamItem) => {
    navigation.navigate('MyTeam', {contestItem,teamItem,selected_sports,userProfile})
  }
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerCartView(responsive)}>
          <Text style={styles.txtHeader(responsive)}>{contestItem.contest_name}</Text>
          {
            (contestItem.status == '0' && Utils.getLiveStatus(contestItem.schedule_date)) &&
              <View style={styles.viewLive(responsive)}>
                <Text style={styles.txtStar(responsive)}>*</Text>
                <Text style={styles.txtLive(responsive)}>LIVE</Text>
              </View>
          }
        </View>
        {
          arrayData.length > 0 &&
            <Fragment>
              <View style={[styles.viewHeaderBig(responsive),{marginTop:arrayData.length < 3?responsive.size(16):0}]}>
                {
                  arrayData.length > 1 ?
                  <View style={{ flex: 0.32 }}>
                    <Image source={Images.CUPSTAR} defaultSource={Images.CUPSTAR} style={styles.imgCup1(responsive)} />
                    <TouchableOpacity onPress={() => moveToMyTeamScreen(arrayData[1])}  style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <ImageBackground source={Images.POLYGON} defaultSource={Images.POLYGON} style={styles.imgUserPoly(responsive)}>
                          {
                            arrayData[1].user_id == userProfile.user_id ?
                            <FastImage style={{marginTop:'10%',width: '80%',height: '80%'}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                            :
                            <FastImage style={{marginTop:'10%',width: '80%',height: '80%'}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +arrayData[1].image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                          }
                      </ImageBackground>
                      <Text style={styles.txtUserName(responsive)}>{arrayData[1].user_id == userProfile.user_id?"You":arrayData[1].user_name} ({arrayData[1].game_rank})</Text>
                      <Text style={styles.txtUserPoints(responsive)}>{arrayData[1].total_score} Pts | {arrayData[1].team_short_name}</Text>
                      {
                        returnAmt(arrayData[1]).real > 0?
                        <Text style={styles.txtPrice(responsive)}>${returnAmt(arrayData[1]).real}</Text>
                        :returnAmt(arrayData[1]).point > 0?
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(2)}} source={Images.IC_COIN} defaultSource={Images.IC_COIN}/>
                                <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[1]).point}</Text>
                          </View>
                        :returnAmt(arrayData[1]).bonus > 0 ?
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                              <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(4)}} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS}/>
                              <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[1]).bonus}</Text>
                        </View>
                        :<Text style={styles.txtPrice(responsive)}>$0</Text>
                      }
                      <View style={styles.viewTopRank(responsive)}>
                        <Text style={styles.txtRank(responsive)}>{arrayData[1].game_rank}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ flex: 0.32 }}>
                    <Image source={Images.CUPSTAR} defaultSource={Images.CUPSTAR} style={styles.imgCup1(responsive)} />
                  </View>
                }
                {
                  arrayData.length > 0 &&
                  <View style={{ flex: 0.32 }}>
                    <TouchableOpacity onPress={() => moveToMyTeamScreen(arrayData[0])} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <ImageBackground source={Images.POLYGON} defaultSource={Images.POLYGON} style={styles.imgUserPoly(responsive)}>
                          {
                            arrayData[0].user_id == userProfile.user_id ?
                            <FastImage style={{marginTop:'10%',width: '80%',height: '80%'}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                            :
                            <FastImage style={{marginTop:'10%',width: '80%',height: '80%'}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +arrayData[0].image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                          }
                      </ImageBackground>
                      <Text style={styles.txtUserName(responsive)}>{arrayData[0].user_id == userProfile.user_id?"You":arrayData[0].user_name} ({arrayData[0].game_rank})</Text>
                      <Text style={styles.txtUserPoints(responsive)}>{arrayData[0].total_score} Pts | {arrayData[0].team_short_name}</Text>
                      {
                        returnAmt(arrayData[0]).real > 0?
                        <Text style={styles.txtPrice(responsive)}>${returnAmt(arrayData[0]).real}</Text>
                        :returnAmt(arrayData[0]).point > 0?
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(2)}} source={Images.IC_COIN} defaultSource={Images.IC_COIN}/>
                                <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[0]).point}</Text>
                          </View>
                        :returnAmt(arrayData[0]).bonus > 0 ?
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                              <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(4)}} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS}/>
                              <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[0]).bonus}</Text>
                        </View>
                        :<Text style={styles.txtPrice(responsive)}>$0</Text>
                      }
                      <View style={styles.viewTopRank(responsive)}>
                        <Text style={styles.txtRank(responsive)}>{arrayData[0].game_rank}</Text>
                      </View>
                    </TouchableOpacity>
                    <Image source={Images.CUPSTAR} defaultSource={Images.CUPSTAR} style={{ margin: responsive.width(10)}} />
                  </View>
                }
                {
                  arrayData.length > 2 ?
                  <View style={{ flex: 0.32 }}>
                    <Image source={Images.CUPSTAR} defaultSource={Images.CUPSTAR} style={styles.imgCup2(responsive)} />
                    <TouchableOpacity onPress={() => moveToMyTeamScreen(arrayData[2])}  style={{ justifyContent: 'center', alignItems: 'center',top:responsive.height(-1) }}>
                      <ImageBackground source={Images.POLYGON} defaultSource={Images.POLYGON} style={styles.imgUserPoly(responsive)}>
                            {
                              arrayData[2].user_id == userProfile.user_id ?
                              <FastImage style={styles.imgProfile(responsive)} source={{ uri: Config.s3URL + "upload/profile/thumb/" +userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                              :
                              <FastImage style={styles.imgProfile(responsive)} source={{ uri: Config.s3URL + "upload/profile/thumb/" +arrayData[2].image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                            }
                        </ImageBackground>
                      <Text style={styles.txtUserName(responsive)}>{arrayData[2].user_id == userProfile.user_id?"You":arrayData[2].user_name} ({arrayData[2].game_rank})</Text>
                      <Text style={styles.txtUserPoints(responsive)}>{arrayData[2].total_score} Pts | {arrayData[2].team_short_name}</Text>
                        {
                          returnAmt(arrayData[2]).real > 0?
                          <Text style={styles.txtPrice(responsive)}>${returnAmt(arrayData[2]).real}</Text>
                          :returnAmt(arrayData[2]).point > 0?
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                  <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(2)}} source={Images.IC_COIN} defaultSource={Images.IC_COIN}/>
                                  <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[2]).point}</Text>
                            </View>
                          :returnAmt(arrayData[2]).bonus > 0 ?
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width:responsive.size(16),height:responsive.size(16),marginRight:responsive.size(4)}} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS}/>
                                <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[2]).bonus}</Text>
                          </View>
                          :<Text style={styles.txtPrice(responsive)}>$0</Text>
                        }
                      <View style={styles.viewTopRank(responsive)}>
                        <Text style={styles.txtRank(responsive)}>{arrayData[2].game_rank}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ flex: 0.32 }}>
                    <Image source={Images.CUPSTAR} defaultSource={Images.CUPSTAR} style={styles.imgCup2(responsive)} />
                  </View>
                }
              </View>
              <View style={styles.viewListHeader(responsive)}>
                <Text style={styles.txtRankListHeader(responsive)}>Rank</Text>
                <Text style={styles.txtUserListHeader(responsive) }>User</Text>
                <Text style={styles.txtPriceListHeader(responsive) }>Prize</Text>
              </View>
            </Fragment>
        }
        {
          apiCalling &&
            <ActivityIndicator color={Core.primaryColor}/>
        }
      </View>
    )
  }
  const renderItem = (data, rowId) => {
    return (
      <TouchableOpacity onPress={() => moveToMyTeamScreen(data)} 
        key={'leaderboardragular' + rowId}
        style={styles.viewList(responsive)}>
        <Image source={Images.RECTANGLE79}
          style={styles.imgListBack(responsive, data.user_id == userProfile.user_id)}
        />
        <View style={styles.viewListItem(responsive)}>
          <View style={{  flex: 0.15}}>
            <View style={styles.viewRankItem(responsive)}>
              <Text style={styles.txtRankItem(responsive)}>{data.game_rank}</Text>
            </View>
          </View>
          <View style={styles.viewUserItem(responsive)}>
            {
              data.user_id == userProfile.user_id ?
              <FastImage style={{width:responsive.size(36),height:responsive.size(36),borderRadius:responsive.size(18)}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
              :
              <FastImage style={{width:responsive.size(36),height:responsive.size(36),borderRadius:responsive.size(18)}} source={{ uri: Config.s3URL + "upload/profile/thumb/" +data.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
            }
            <View style={{ paddingHorizontal: responsive.size(10), }}>
              <Text numberOfLines={1} style={styles.txtUserNameListItem(responsive)}>{data.user_id == userProfile.user_id?"You":data.user_name}</Text>
              <Text style={styles.txtPointsListItem(responsive)}>{data.total_score} Pts | Winner #{data.team_short_name}</Text>
            </View>
          </View>
          <View style={styles.viewPriceList(responsive)}>
              {
                returnAmt(data).real > 0?
                <Text style={styles.txtPriceList(responsive)}>${returnAmt(data).real}</Text>
                :returnAmt(data).point > 0?
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:responsive.size(12),height:responsive.size(12),marginRight:responsive.size(2)}} source={Images.IC_COIN} defaultSource={Images.IC_COIN}/>
                        <Text style={styles.txtPriceList(responsive)}>{returnAmt(data).point}</Text>
                  </View>
                :returnAmt(data).bonus > 0 ?
                <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Image style={{width:responsive.size(12),height:responsive.size(12),marginRight:responsive.size(4)}} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS}/>
                      <Text style={styles.txtPriceList(responsive)}>{returnAmt(data).bonus}</Text>
                </View>
                :<Text style={styles.txtPriceList(responsive)}>$0</Text>
              }
          </View>
        </View>
      </TouchableOpacity>

    )
  }
  let userList = arrayData.filter((e)=>e.user_id == userProfile.user_id);
  return (
    <HomeBackground
      title={'Leaderboard'}
      backAction={() => navigation.goBack()}
      isLeftIcon={true} isBack={true} isRightIcon={true} isRightIcon1={false} isNotification={true} isInfo={true}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ListView
          ref={scrollViewRef}
          key={"RoasterScreen"}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          style={styles.wrapper}
          dataSource={ds.cloneWithRows([...userList,...arrayData.filter((e)=>e.user_id != userProfile.user_id)])}
          renderHeader={renderHeader}
          renderRow={(data, sectionID, rowID, higlightRow) => renderItem(data, rowID)}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
      </View>
    </HomeBackground>
  )
};
export default Leaderboard;
