import React, { useEffect, useMemo, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { HomeBackground, useResponsiveSizes, Images, Core, API, Constant, Utils } from '..';
import { Image, Text, View, Animated, FlatList, ActivityIndicator, Platform } from 'react-native';
import styles from './styles';
import { Config } from '../../../Helper';
import FastImage from 'react-native-fast-image';

const H2HLeaderboard = ({ navigation, route }) => {
    const responsive = useResponsiveSizes();
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
    const [apiCalling, setApiCalling] = useState(true)
    const [contestItem] = useState(route?.params?.contestItem || undefined)
    const [userProfile] = useState(route?.params?.userProfile || undefined)
    const [selected_sports] = useState(route?.params?.selected_sports || undefined)
    const [arrayData, setArrayData] = useState([])
    const [lineupData, setLineupData] = useState(undefined)

    useEffect(() => {
        GET_LINEUP_MASTER_DATA()
    }, [])
    GET_LINEUP_MASTER_DATA = () => {
        API.GET_LINEUP_MASTER_DATA({ 'sports_id': selected_sports?.sports_id || "" }).then(async (response) => {
            let result = response.data;
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setLineupData(result.data)
                GET_H2H_LEADERBOARD();
            }
        }).catch(error => {
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    const GET_H2H_LEADERBOARD = () => {
        let params = { "contest_id": contestItem.contest_id }
        API.GET_H2H_LEADERBOARD(params).then(async (response) => {
            let result = response.data;
            setApiCalling(false)
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setArrayData(result.data)
            }
        }).catch(error => {
            setApiCalling(false)
            Utils.handleCatchError(error, props.navigation)
            return error;
        });
    }
    const getPropsName = (prop_id) => {
        let sports_props = lineupData?.sports_props || [];
        return sports_props.find((e) => e.prop_id == prop_id).short_name
    }
    const getPropsFieldName = (prop_id) => {
        let sports_props = lineupData?.sports_props || [];
        return sports_props.find((e) => e.prop_id == prop_id).fields_name
    }
    const returnAmt = (item) => {
        let prizeAmount = { 'real': 0, 'bonus': 0, 'point': 0 };
        if (item.prize_data && item.prize_data.length > 0) {
            if (item.prize_data[0].prize_type == 1) {
                prizeAmount.real = parseFloat(parseFloat(item.prize_data[0].amount).toFixed(2))
            } else if (item.prize_data[0].prize_type == 2) {
                prizeAmount.point = parseFloat(parseFloat(item.prize_data[0].amount).toFixed(2))
            } else {
                prizeAmount.bonus = parseFloat(parseFloat(item.prize_data[0].amount).toFixed(2))
            }
        }
        return prizeAmount
    }
    const getPickPlayer = (data) => {
        let count = 0
        data.map(item => {
            if (item.ice_pick == 0) {
                count++
            }
        })
        return count
    }
    const getCompletePlayer = (data) => {
        let count = 0
        data.map(item => {
            if (item.status == 1 && item.ice_pick == 0) {
                count++
            }
        })
        return count
    }
    const renderCardView = useMemo(() => {
        let widthAnim = new Animated.Value(0)
        Animated.timing(widthAnim, { toValue: 1, duration: 2000 }).start()
        return (
            <View style={styles.headerContentView(responsive, apiCalling)}>
                <Image source={Images.LEADERBOARD_RECTANGLE} defaultSource={Images.LEADERBOARD_RECTANGLE} style={styles.headerBackImage(responsive, apiCalling)} />
                <View style={styles.viewHeaderCart(responsive)}>
                    <Text style={styles.txtHeaderCart(responsive)} >{contestItem.contest_title}</Text>
                </View>
                {
                    !apiCalling && arrayData.length > 0 ?
                        <View style={styles.viewCartContainer(responsive)} >
                            <View style={{ flex: 0.5 }}>
                                <View style={styles.viewCart1(responsive)}>
                                    <View>
                                        {
                                            arrayData[0].user_id == userProfile.user_id ?
                                                <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                                :
                                                <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + arrayData[0].image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                        }
                                        {
                                            arrayData[0].prize_data && arrayData[0].prize_data.length > 0 &&
                                            <View style={{ position: 'absolute', right: responsive.size(-5), width: responsive.size(20), height: responsive.size(20), borderRadius: responsive.size(10), backgroundColor: '#3A3F4D', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ width: responsive.size(16), height: responsive.size(16) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} tintColor={Core.primaryColor} />
                                            </View>
                                        }
                                    </View>
                                    <View>
                                        <Text style={styles.txtCartScore(responsive)}>{arrayData[0].total_score}</Text>
                                        <Text style={styles.txtCartPoints(responsive)}>{arrayData[0].total_fantasy_points}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: responsive.size(15), marginVertical: responsive.size(10) }}>
                                    <Text style={styles.txtCartPersonName1(responsive)}>{arrayData[0].user_id == userProfile.user_id ? "YOU" : arrayData[0].user_name}</Text>
                                    {
                                        returnAmt(arrayData[0]).real > 0 ?
                                            <Text style={styles.txtCartPrice1(responsive)}>${returnAmt(arrayData[0]).real}</Text>
                                            : returnAmt(arrayData[0]).point > 0 ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(2) }} source={Images.IC_COIN} defaultSource={Images.IC_COIN} />
                                                    <Text style={styles.txtCartPrice1(responsive)}>{returnAmt(arrayData[0]).point}</Text>
                                                </View>
                                                : returnAmt(arrayData[0]).bonus > 0 ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(4) }} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS} />
                                                        <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[0]).bonus}</Text>
                                                    </View>
                                                    : <Text style={styles.txtCartPrice1(responsive)}>$0</Text>
                                    }
                                </View>
                                <View>
                                    <View style={styles.lineContainer(responsive)}>
                                        <Animated.View style={styles.progressBar(((getCompletePlayer(arrayData[0].lineup) / (getPickPlayer(arrayData[0].lineup) / 100))), widthAnim)} />
                                    </View>
                                    <View style={styles.viewFooterCart(responsive)}>
                                        <Text style={styles.txtCartStatus1(responsive)}>Complete</Text>
                                        <Text style={styles.txtCartResult1(responsive)}>{getCompletePlayer(arrayData[0].lineup)}/{getPickPlayer(arrayData[0].lineup)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.viewCartCenterLine(responsive)}>
                                <View style={styles.viewCartVS(responsive)}>
                                    <Text style={styles.txtCartVS(responsive)}>VS</Text>
                                </View>
                            </View>
                            {
                                arrayData.length == 2 ?
                                    <View style={{ flex: 0.5 }}>
                                        <View style={styles.viewCart1(responsive)}>
                                            <View>
                                                <Text style={styles.txtCartScore2(responsive)}>{arrayData[1].total_score}</Text>
                                                <Text style={styles.txtCartPoints(responsive)}>{arrayData[1].total_fantasy_points}</Text>
                                            </View>
                                            <View>
                                                {
                                                    arrayData[1].user_id == userProfile.user_id ?
                                                        <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                                        :
                                                        <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + arrayData[1].image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                                }
                                                {
                                                    arrayData[1].prize_data && arrayData[1].prize_data.length > 0 &&
                                                    <View style={{ position: 'absolute', right: responsive.size(-5), width: responsive.size(20), height: responsive.size(20), borderRadius: responsive.size(10), backgroundColor: '#3A3F4D', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image style={{ width: responsive.size(16), height: responsive.size(16) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} tintColor={Core.primaryColor} />
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                        <View style={{ paddingHorizontal: responsive.size(15), marginVertical: responsive.size(10) }}>
                                            <Text style={styles.txtCartPersonName2(responsive)}>{arrayData[1].user_id == userProfile.user_id ? "YOU" : arrayData[1].user_name}</Text>
                                            {
                                                returnAmt(arrayData[1]).real > 0 ?
                                                    <Text style={styles.txtCartPrice2(responsive)}>${returnAmt(arrayData[1]).real}</Text>
                                                    : returnAmt(arrayData[1]).point > 0 ?
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(2) }} source={Images.IC_COIN} defaultSource={Images.IC_COIN} />
                                                            <Text style={styles.txtCartPrice2(responsive)}>{returnAmt(arrayData[1]).point}</Text>
                                                        </View>
                                                        : returnAmt(arrayData[1]).bonus > 0 ?
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Image style={{ width: responsive.size(12), height: responsive.size(12), marginRight: responsive.size(4) }} source={Images.IC_BONUS} defaultSource={Images.IC_BONUS} />
                                                                <Text style={styles.txtPrice(responsive)}>{returnAmt(arrayData[1]).bonus}</Text>
                                                            </View>
                                                            : <Text style={styles.txtCartPrice2(responsive)}>$0</Text>
                                            }
                                        </View>
                                        <View>
                                            <View style={styles.lineContainer(responsive)}>
                                                <Animated.View style={styles.progressBar((getCompletePlayer(arrayData[1].lineup) / (getPickPlayer(arrayData[1].lineup) / 100)), widthAnim)} />
                                            </View>
                                            <View style={styles.viewFooterCart(responsive)}>
                                                <Text style={styles.txtCartResult1(responsive)}>{getCompletePlayer(arrayData[1].lineup)}/{getPickPlayer(arrayData[1].lineup)}</Text>
                                                <Text style={styles.txtCartStatus1(responsive)}>Complete</Text>
                                            </View>
                                        </View>
                                    </View>
                                : <View style={{ flex: 0.5 }} />
                            }
                        </View>
                        : apiCalling &&
                        <ActivityIndicator color={Core.primaryColor} />
                }
            </View>
        )
    }, [arrayData])

    const renderHeader = () => {
        return (
            <View style={styles.headerCartView(responsive)}>
                {!apiCalling && <Image source={Images.SPARK} defaultSource={Images.SPARK} style={styles.headerSparkImage(responsive)} />}
                {renderCardView}
                {
                    !apiCalling && arrayData.length > 0 &&
                    <Text style={styles.txtMatchup(responsive)}>Matchup</Text>
                }
            </View>
        )
    }

    const renderItem = (data, rowId) => {
        const arr1 = arrayData.length > 0 ? arrayData[0].lineup.filter((e) => e.ice_pick == '0') : []
        const arr2 = arrayData.length > 1 ? arrayData[1].lineup.filter((e) => e.ice_pick == '0') : []
        return (
            <View style={{ flexDirection: 'row', width: 'auto' }}>
                <View style={{ flex: 0.5 }}>
                    {arr1.map(item => {
                        const isTrue = (parseFloat(item[getPropsFieldName(item.prop_id)]) > item.user_points && item.type == 1) || (parseFloat(item[getPropsFieldName(item.prop_id)]) < item.user_points && item.type == 2)

                        return  <View key={item.season_player_id} style={styles.viewListContainer(responsive)}>
                        <Image source={(item.status == '0' && Utils.getLiveStatus(item.schedule_date)) ? Images.ACTIVELEADERBOARD : Images.INACTIVELEADERBOARD} defaultSource={(item.status == '0' && Utils.getLiveStatus(item.schedule_date)) ? Images.ACTIVELEADERBOARD : Images.INACTIVELEADERBOARD} style={styles.imgListContainer(responsive)} />
                        <View style={styles.viewListMain(responsive)}>
                            <Image source={Images.LOCK} defaultSource={Images.LOCK} style={styles.imgLock(responsive)} />
                        </View>
                        <View style={styles.listContentView(responsive)}>
                            <View style={{ marginHorizontal: responsive.size(12), }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ paddingTop: responsive.size(5), paddingBottom: responsive.size(1.5) }}>
                                        <View>
                                            <View >
                                                {
                                                    item.jersey ?
                                                        <Image style={styles.imgProfileList(responsive)} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                                        :
                                                        <Image style={styles.imgProfileList(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                                                }
                                                {/* <Image source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} style={styles.imgProfileList(responsive)} /> */}
                                            </View>
                                            <View style={styles.viewPG(responsive)}>
                                                <Text style={styles.txtPG(responsive)}>{item.position}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.txtItemName(responsive, 2)}>{item.display_name}</Text>
                                    </View>
                                        <Text style={styles.txtItemTopScore(responsive, isTrue)}>{item.prediction_points}</Text>
                                </View>
                                <Text style={styles.txtItemPoints(responsive, 2)}>{item.home} vs {item.away}   <Text style={{ color: Core.white }}>{JSON.parse(item.score_data)?.home_score || '-'} | {JSON.parse(item.score_data)?.away_score || '-'}</Text></Text>
                            </View>
                            <View style={styles.viewListCenter(responsive, 2)}>
                                <View style={styles.view1List(responsive)}>
                                    {
                                        (!JSON.parse(item.score_data)?.quarter && (!JSON.parse(item.score_data)?.time_remaining || JSON.parse(item.score_data)?.time_remaining == ':'))?
                                             <Text style={styles.txtBoxTop(responsive)}>{'N/A'}</Text>
                                        :
                                        <>
                                            <Text style={styles.txtBoxTop(responsive)}>{JSON.parse(item.score_data)?.quarter || 'N/A'}</Text>
                                            <Text style={styles.txtBoxBottom(responsive)}>{JSON.parse(item.score_data)?.time_remaining == ':'?'N/A':JSON.parse(item.score_data)?.time_remaining || 'N/A'}</Text>
                                        </>
                                    }
                                </View>
                                <View style={styles.viewLiveParant}>
                                    <View style={styles.viewLive(responsive, (item.status == '0' && Utils.getLiveStatus(item.schedule_date)))}>
                                        <Text style={styles.txtStar(responsive)}>*</Text>
                                        <Text style={styles.txtLive(responsive)}>LIVE</Text>
                                    </View>
                                    <Text style={styles.txtBottomScore1(responsive)}>{item[getPropsFieldName(item?.prop_id)]}</Text>
                                </View>
                                <View style={styles.viewBox2(responsive)}>
                                    <Text style={styles.txtBoxTop(responsive)}>{item.type == 2 ? "UNDER" : "OVER"}</Text>
                                    <Text style={styles.txtBoxBottom(responsive)}>{item.user_points}</Text>
                                </View>
                            </View>
                            <View style={styles.viewItemBottom(responsive)}>
                                <Text style={styles.txtItemBottom(responsive)}>{getPropsName(item?.prop_id)}</Text>
                            </View>
                        </View>
                    </View>
                    }
                    )}
                </View>
                <View style={styles.viewCenterLine(responsive)} />
                <View style={{ flex: 0.5 }}>
                    {arr2.map(item => {
                        const isTrue = (parseFloat(item[getPropsFieldName(item.prop_id)]) > item.user_points && item.type == 1) || (parseFloat(item[getPropsFieldName(item.prop_id)]) < item.user_points && item.type == 2)
                        return <View key={item.season_player_id} style={styles.viewListContainer(responsive)}>
                            <Image source={(item.status == '0' && Utils.getLiveStatus(item.schedule_date)) ? Images.ACTIVELEADERBOARD : Images.INACTIVELEADERBOARD} defaultSource={(item.status == '0' && Utils.getLiveStatus(item.schedule_date)) ? Images.ACTIVELEADERBOARD : Images.INACTIVELEADERBOARD} style={styles.imgListContainer(responsive)} />
                            <View style={styles.viewListMain(responsive)}>
                                <Image source={Images.LOCK} defaultSource={Images.LOCK} style={styles.imgLock(responsive)} />
                            </View>
                            <View style={styles.listContentView(responsive)}>
                                <View style={{ marginHorizontal: responsive.size(12), }}>
                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ alignItems: 'flex-end', paddingTop: responsive.size(5), paddingBottom: responsive.size(1.5) }}>
                                            <View>
                                                <View >
                                                    {
                                                        item.jersey ?
                                                            <Image style={styles.imgProfileList(responsive)} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                                            :
                                                            <Image style={styles.imgProfileList(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                                                    }
                                                    {/* <Image source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} style={styles.imgProfileList(responsive)} /> */}
                                                </View>
                                                <View style={styles.viewPG2(responsive)}>
                                                    <Text style={styles.txtPG(responsive)}>{item.position}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.txtItemName(responsive)}>{item.display_name}</Text>
                                        </View>
                                        <Text style={styles.txtItemTopScore(responsive, isTrue)}>{item.prediction_points}</Text>
                                    </View>
                                    <Text style={styles.txtItemPoints(responsive, 1)}>{item.home} vs {item.away}   <Text style={{ color: Core.white }}>{JSON.parse(item.score_data)?.home_score || '-'} | {JSON.parse(item.score_data)?.away_score || '-'}</Text></Text>
                                </View>
                                <View style={styles.viewListCenter(responsive, 1)}>
                                    <View style={styles.view1List(responsive)}>
                                        {
                                            (!JSON.parse(item.score_data)?.quarter && (!JSON.parse(item.score_data)?.time_remaining || JSON.parse(item.score_data)?.time_remaining == ':'))?
                                                <Text style={styles.txtBoxTop(responsive)}>{'N/A'}</Text>
                                            :
                                            <>
                                                <Text style={styles.txtBoxTop(responsive)}>{JSON.parse(item.score_data)?.quarter || 'N/A'}</Text>
                                                <Text style={styles.txtBoxBottom(responsive)}>{JSON.parse(item.score_data)?.time_remaining == ':'?'N/A':JSON.parse(item.score_data)?.time_remaining || 'N/A'}</Text>
                                            </>
                                        }
                                        
                                    </View>
                                    <View style={styles.viewLiveParant}>
                                        <View style={styles.viewLive(responsive, (item.status == '0' && Utils.getLiveStatus(item.schedule_date)))}>
                                            <Text style={styles.txtStar(responsive)}>*</Text>
                                            <Text style={styles.txtLive(responsive)}>LIVE</Text>
                                        </View>
                                        <Text style={styles.txtBottomScore1(responsive)}>{item[getPropsFieldName(item?.prop_id)]}</Text>
                                    </View>
                                    <View style={styles.viewBox2(responsive)}>
                                        <Text style={styles.txtBoxTop(responsive)}>{item.type == 2 ? "UNDER" : "OVER"}</Text>
                                        <Text style={styles.txtBoxBottom(responsive)}>{item.user_points}</Text>
                                    </View>
                                </View>
                                <View style={styles.viewItemBottom(responsive)}>
                                    <Text style={styles.txtItemBottom(responsive)}>{getPropsName(item.prop_id)}</Text>
                                </View>
                            </View>
                        </View>
                    })}
                </View>

            </View>


        )
    }
    const renderItem2 = ({ item, index }) => {
        const isTrue = ((parseFloat(item[getPropsFieldName(item.prop_id)]) > item.user_points) && item.type == 1) || ((parseFloat(item[getPropsFieldName(item.prop_id)]) < item.user_points) && item.type == 2)
        return (
            <View key={item.season_player_id} style={styles.viewBottomListContainer(responsive, (item.status == '0' && Utils.getLiveStatus(item.schedule_date)))}>
                <View style={styles.viewBottomPG(responsive)}>
                    <Text style={styles.txtBottomPG(responsive)}>{item.position}</Text>
                </View>
                <View style={styles.viewBottomP1(responsive)}>
                    <Text style={styles.txtBottomP1(responsive)}>P{index + 1}</Text>
                </View>
                <View style={{ opacity: 0.6 }}>
                    <View style={{ marginHorizontal: responsive.size(12), marginTop: responsive.size(5), width: responsive.width(40) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* <Image source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} style={styles.imgProfileList2(responsive)} /> */}
                            {
                                item.jersey ?
                                    <Image style={styles.imgProfileList2(responsive)} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                    :
                                    <Image style={styles.imgProfileList2(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                            }
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', height: responsive.size(50), }}>
                                <Text style={styles.txtBottomScore(responsive, isTrue && item[getPropsFieldName(item?.prop_id)])}>{item.prediction_points}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.txtBottomName(responsive)}>{item.display_name}</Text>
                                <Text style={styles.txtBottomPoints(responsive)}>{item.home} vs {item.away}   <Text style={{ color: Core.white }}>{JSON.parse(item.score_data)?.home_score || '-'} | {JSON.parse(item.score_data)?.away_score || '-'}</Text></Text>
                            </View>
                            <View style={styles.viewLiveBottom(responsive, (item.status == '0' && Utils.getLiveStatus(item.schedule_date)))}>
                                <Text style={styles.txtBottomStar(responsive)}>*</Text>
                                <Text style={styles.txtBottomLive(responsive)}>LIVE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewListCenter2(responsive, 2)}>
                        <View style={styles.view1List(responsive)}>
                                    {
                                        (!JSON.parse(item.score_data)?.quarter && (!JSON.parse(item.score_data)?.time_remaining || JSON.parse(item.score_data)?.time_remaining == ':'))?
                                             <Text style={styles.txtBoxTop(responsive)}>{'N/A'}</Text>
                                        :
                                        <>
                                            <Text style={styles.txtBoxTop(responsive)}>{JSON.parse(item.score_data)?.quarter || 'N/A'}</Text>
                                            <Text style={styles.txtBoxBottom(responsive)}>{JSON.parse(item.score_data)?.time_remaining == ':'?'N/A':JSON.parse(item.score_data)?.time_remaining || 'N/A'}</Text>
                                        </>
                                    }
                         </View>
                        <View style={styles.viewBottomFooter(responsive)}>

                            <Text numberOfLines={1} style={styles.txtBottomFooter(responsive)}>{item[getPropsFieldName(item?.prop_id)]}</Text>
                            <Text
                                numberOfLines={1}
                                style={styles.txtREB(responsive)}>{getPropsName(item.prop_id)}</Text>
                        </View>
                        <View style={styles.view1List(responsive)}>
                            <Text style={styles.txtBoxTop(responsive)}>{item.type == 2 ? "UNDER" : "OVER"}</Text>
                            <Text style={styles.txtBoxBottom(responsive)}>{item.user_points}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const renderFooter = () => {
        if ((arrayData.length > 0 && arrayData[0].lineup.filter((e) => e.ice_pick == '1').length == 0) && (arrayData.length > 1 && arrayData[1].lineup.filter((e) => e.ice_pick == '1').length == 0)) { return null }
        return (
            <View style={{ width: responsive.width(100) }}>
                <View style={styles.viewRenderFooter(responsive)}>
                    <Image source={Images.ARROW4} defaultSource={Images.ARROW4} style={styles.imgArro1(responsive)} />
                    <Text style={styles.txtRenderFooter(responsive)}> PLUG  N  PLAYS </Text>
                    <Image source={Images.ARROW4} defaultSource={Images.ARROW4} style={styles.imgArro2(responsive)} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <FlatList
                        data={arrayData.length > 0 ? arrayData[0].lineup.filter((e) => e.ice_pick == '1') : []}
                        renderItem={renderItem2}
                        style={{ flex: 0.5  }}
                        horizontal={false}
                    />
                    <FlatList
                        data={arrayData.length > 1 ? arrayData[1].lineup.filter((e) => e.ice_pick == '1') : []}
                        renderItem={renderItem2}
                        style={{ flex: 0.5 }}
                        horizontal={false}
                    />
                </View>
            </View>
        )
    }
    return (
        <HomeBackground title={contestItem.group_name == 'Tourney'?'Leaderboard':'H2H Leaderboard'} backAction={() => navigation.goBack()} isLeftIcon={true} isBack={true}>
            <View style={{ flex: 1, paddingTop: 10, width: Constant.FULL_WIDTH }}>
                <ListView
                    key={"RoasterScreen"}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    style={styles.wrapper}
                    dataSource={ds.cloneWithRows(arrayData.length > 0 ? [1] : [])}
                    renderHeader={renderHeader}
                    renderRow={(data, sectionID, rowID, higlightRow) => renderItem(data, rowID)}
                    renderFooter={arrayData.length > 0 ? renderFooter : null}
                    removeClippedSubviews={!(Platform.OS == "ios")}
                />
            </View>
        </HomeBackground>
    )
};
export default H2HLeaderboard;
