import React, { useEffect, useMemo, useRef, useState } from 'react';
import ListView from "deprecated-react-native-listview";
import { HomeBackground, useResponsiveSizes, Images, Core, API, Constant, Utils } from '..';
import { Image, Text, View, Animated, FlatList, ActivityIndicator, Platform, InteractionManager } from 'react-native';
import styles from './styles';
import { Config, Fonts } from '../../../Helper';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from '../../Components';
import { useIsFocused } from '@react-navigation/native';

const BracketLobby = ({ navigation, route }) => {
    const responsive = useResponsiveSizes();
    const { contestItem, userProfile, selected_sports, details, round_id, arrayData, paringIdx } = route?.params
    const [currentPagination, setCurrentPagination] = useState(paringIdx+1 || 1)
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
    const [apiCalling, setApiCalling] = useState(false)
    const [lineupData, setLineupData] = useState(undefined)
    const [arrData, setArrData] = useState([])
    const scrollViewRef = useRef();
  
    useEffect(() => {
        GET_LINEUP_MASTER_DATA()
    }, [isFocus])
    GET_LINEUP_MASTER_DATA = () => {
        setApiCalling(true)
        API.GET_LINEUP_MASTER_DATA({ 'sports_id': selected_sports?.sports_id || "" }).then(async (response) => {
            let result = response.data;
            setApiCalling(false)
            if (result.response_code == Constant.SUCCESS_STATUS) {
                setLineupData(result.data)
            }
        }).catch(error => {
            setApiCalling(false)
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    const isFocus = useIsFocused()
    useEffect(() => {
       
        if (isFocus) {
            setCurrentPagination(paringIdx+1)
        }
        if (lineupData) {
            setApiCalling(true)
            setArrData([])
            let pairedUsers = details.leaderboard.filter((e) => e.round_id == round_id && currentPagination == e.pairing)
            let top_user = undefined;
            let bottom_user = undefined;
            if (pairedUsers && pairedUsers.length == 2) {
                top_user = pairedUsers[0].is_winner == 1 ? pairedUsers[0] : pairedUsers[1]
            } else if (pairedUsers && pairedUsers.length == 1) {
                top_user = pairedUsers[0].is_winner == 1 ? pairedUsers[0] : undefined
            }
            if (pairedUsers && pairedUsers.length == 2) {
                bottom_user = pairedUsers[0].is_winner == 1 ? pairedUsers[1] : pairedUsers[0]
            } else if (pairedUsers && pairedUsers.length == 1) {
                bottom_user = pairedUsers[0].is_winner == 1 ? undefined : pairedUsers[0]
            }
            API.GET_BRACKET_TEAM_COMPARE({ "round_id": round_id, "you_id": top_user?.user_contest_round_id, "opponent_id": bottom_user?.user_contest_round_id }).then(async (response) => {
                let result = response.data;
                setApiCalling(false)
                if (result.response_code == Constant.SUCCESS_STATUS) {
                    setArrData(result.data)
                }
            }).catch(error => {
                setApiCalling(false)
                Utils.handleCatchError(error, navigation)
                return error;
            });
        }
    }, [currentPagination, lineupData, isFocus])

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
    const renderCardView = (pairing, paringIdx) => {
        let pairedUsers = details.leaderboard.filter((e) => e.round_id == round_id && pairing == e.pairing)
        let top_user = undefined;
        let bottom_user = undefined;
        if (pairedUsers && pairedUsers.length == 2) {
            top_user = pairedUsers[0].is_winner == 1 ? pairedUsers[0] : pairedUsers[1]
        } else if (pairedUsers && pairedUsers.length == 1) {
            top_user = pairedUsers[0].is_winner == 1 ? pairedUsers[0] : undefined
        }
        if (pairedUsers && pairedUsers.length == 2) {
            bottom_user = pairedUsers[0].is_winner == 1 ? pairedUsers[1] : pairedUsers[0]
        } else if (pairedUsers && pairedUsers.length == 1) {
            bottom_user = pairedUsers[0].is_winner == 1 ? undefined : pairedUsers[0]
        }
        let widthAnim = new Animated.Value(0)
        Animated.timing(widthAnim, { toValue: 1, duration: 2000 }).start()
        return (
            <View style={styles.headerContentView(responsive)}>
                <View style={styles.viewHeaderCart(responsive)}>
                    <Text style={styles.txtHeaderCart(responsive)} >{contestItem?.contest_title}</Text>
                </View>
                {
                    arrayData.length > 0 &&
                    <View style={styles.viewCartContainer(responsive)} >
                        <View style={{ flex: 0.5 }}>
                            <View style={styles.viewCart1(responsive)}>
                                <View>
                                    {
                                        top_user.user_id == userProfile?.user_id ?
                                            <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile?.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                            :
                                            <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + top_user.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                    }
                                    {
                                        top_user.prize_data && top_user.prize_data.length > 0 &&
                                        <View style={{ position: 'absolute', right: responsive.size(-5), width: responsive.size(20), height: responsive.size(20), borderRadius: responsive.size(10), backgroundColor: '#3A3F4D', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ width: responsive.size(16), height: responsive.size(16) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} tintColor={Core.primaryColor} />
                                        </View>
                                    }
                                </View>
                                {top_user.is_winner == 1 && <Text style={styles.txtWinner(responsive)}>Winner</Text>}
                                <View>
                                    <Text style={styles.txtCartScore(responsive)}>{top_user.score}</Text>
                                    <Text style={styles.txtCartPoints(responsive)}>{top_user.total_fantasy_points}</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: responsive.size(5), marginVertical: responsive.size(8) }}>
                                <Text style={styles.txtCartPersonName1(responsive)}>{top_user.user_id == userProfile?.user_id ? "YOU" : top_user.user_name}</Text>

                            </View>
                            <View style={styles.viewPriceCart(responsive)}>
                                {
                                    (top_user.prize_data && top_user.prize_data.length > 0 && top_user.prize_data[0].prize_type == 1) ?
                                        <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$${parseFloat(parseFloat(top_user.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                        : (top_user.prize_data && top_user.prize_data.length > 0) ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ width: responsive.size(20), height: responsive.size(20), marginRight: responsive.size(5) }} source={top_user.prize_data[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`${parseFloat(parseFloat(top_user.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                            </View>
                                            :
                                            <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$0`}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.viewCartCenterLine(responsive)}>
                            <View style={styles.viewCartVS(responsive)}>
                                <Text style={styles.txtCartVS(responsive)}>VS</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <View style={styles.viewCart1(responsive, true)}>
                                <View>
                                    <Text style={styles.txtCartScore2(responsive)}>{bottom_user.score}</Text>
                                    <Text style={styles.txtCartPoints(responsive)}>{bottom_user.total_fantasy_points}</Text>
                                </View>
                                {bottom_user.is_winner == 1 && <Text style={styles.txtWinner(responsive)}>Winner</Text>}
                                <View>
                                    {
                                        bottom_user.user_id == userProfile?.user_id ?
                                            <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + userProfile?.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                            :
                                            <FastImage style={{ width: responsive.size(44), height: responsive.size(44), borderRadius: responsive.size(22), borderWidth: 1, borderColor: '#45484E' }} source={{ uri: Config.s3URL + "upload/profile/thumb/" + bottom_user.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />
                                    }
                                    {
                                        bottom_user.prize_data && bottom_user.prize_data.length > 0 &&
                                        <View style={{ position: 'absolute', right: responsive.size(-5), width: responsive.size(20), height: responsive.size(20), borderRadius: responsive.size(10), backgroundColor: '#3A3F4D', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ width: responsive.size(16), height: responsive.size(16) }} source={Images.FILLTROPHY} defaultSource={Images.FILLTROPHY} tintColor={Core.primaryColor} />
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: responsive.size(5), marginVertical: responsive.size(10) }}>
                                <Text style={styles.txtCartPersonName2(responsive)}>{bottom_user.user_id == userProfile?.user_id ? "YOU" : bottom_user.user_name}</Text>

                            </View>
                            <View style={styles.viewPriceCart(responsive, true)}>
                                {
                                    (bottom_user.prize_data && bottom_user.prize_data.length > 0 && bottom_user.prize_data[0].prize_type == 1) ?
                                        <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$${parseFloat(parseFloat(bottom_user.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                        : (bottom_user.prize_data && bottom_user.prize_data.length > 0) ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ width: responsive.size(20), height: responsive.size(20), marginRight: responsive.size(5) }} source={bottom_user.prize_data[0].prize_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={item.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`${parseFloat(parseFloat(bottom_user.prize_data[0].amount).toFixed(1))} Won`}</Text>
                                            </View>
                                            :
                                            <Text style={{ marginTop: Platform.OS == 'ios' ? 0 : responsive.size(-4), fontSize: responsive.fontSize(Fonts.xxxl), fontFamily: Fonts.semibold, textAlign: 'right', color: '#222' }}>{`$0`}</Text>
                                }
                                {/* <Text style={styles.txtPriceCart(responsive)}>${bottom_user?.prize_databottom_user?.prize_data[0]?.amount} Won</Text> */}
                            </View>
                        </View>
                    </View>

                }
            </View>
        )
    }

    const onScroll = (index) => {
        setCurrentPagination(index)
    }
    const PageView = useMemo(() => {
        return (
            arrayData.length>1&& <Pagination length={arrayData.length} currentPagination={currentPagination - 1} />
        );
    }, [arrayData, currentPagination]);
    const renderHeader = () => {
        try {

            return (
                <View style={styles.headerCartView(responsive)}>
                    {
                        arrayData.length > 0 &&
                        <>
                            <Text style={styles.txtMatchup(responsive)}>Matchup: Complete</Text>
                            <Carousel
                                data={arrayData}
                                sliderWidth={Constant.FULL_WIDTH}
                                itemWidth={Constant.FULL_WIDTH}
                                initialNumToRender={paringIdx+1}
                                firstItem={paringIdx}
                                initialScrollIndex={paringIdx}
                                ref={scrollViewRef}

                                useScrollView={true}

                                scrollEventThrottle={1000}
                                onSnapToItem={(index) => onScroll(index + 1)}
                                renderItem={({ item, index }) => {
                                    return <View style={{ margin: responsive.size(15), marginBottom: 0 }}>
                                        <Image source={Images.LEADERBOARD_RECTANGLE} defaultSource={Images.LEADERBOARD_RECTANGLE} style={styles.headerBackImage(responsive)} />
                                        {<Image source={Images.SPARK} defaultSource={Images.SPARK} style={styles.headerSparkImage(responsive)} />}
                                        {renderCardView(item, index)}
                                    </View>
                                }}
                            />
                            {PageView}
                            {apiCalling && <ActivityIndicator style={{ marginVertical: responsive.size(15) }} color={Core.primaryColor} />}
                        </>
                    }
                </View>
            )
        } catch (error) {

        }
    }

    const renderItem = (data, rowId) => {
        const arr1 = arrData.length > 0 ? arrData[0].lineup.filter((e) => e.ice_pick == '0') : []
        const arr2 = arrData.length > 1 ? arrData[1].lineup.filter((e) => e.ice_pick == '0') : []
      
        return (
            <View style={{ flexDirection: 'row', width: 'auto' }}>
                <View style={{ flex: 0.5 }}>
                    {arr1.map(item => {
                        const isTrue = ((parseFloat(item[getPropsFieldName(item.prop_id)]) > item.user_points) && item.type == 1) || ((parseFloat(item[getPropsFieldName(item.prop_id)]) < item.user_points) && item.type == 2)
                        return <View key={item.season_player_id} style={styles.viewListContainer(responsive)}>
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
                                                    {/* <Image source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} style={styles.imgProfileList(responsive)} /> */}
                                                    {
                                                        item.jersey ?
                                                            <Image style={styles.imgProfileList(responsive)} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                                            :
                                                            <Image style={styles.imgProfileList(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                                                    }
                                                </View>
                                                <View style={styles.viewPG(responsive)}>
                                                    <Text style={styles.txtPG(responsive)}>{item.position}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.txtItemName(responsive, 2)}>{item.display_name}</Text>
                                        </View>
                                        <Text style={styles.txtItemTopScore(responsive, isTrue && item[getPropsFieldName(item?.prop_id)])}>{item.prediction_points}</Text>
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
                                    <Text style={styles.txtItemBottom(responsive)}>{getPropsName(item.prop_id)}</Text>
                                </View>
                            </View>
                        </View>
                    })}
                </View>
                <View style={{ flex: 0.5 }}>
                    {arr2.map(item => {
                        const isTrue = ((parseFloat(item[getPropsFieldName(item.prop_id)]) > item.user_points) && item.type == 1) || ((parseFloat(item[getPropsFieldName(item.prop_id)]) < item.user_points) && item.type == 2)
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
                                                    {/* <Image source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} style={styles.imgProfileList(responsive)} /> */}
                                                    {
                                                        item.jersey ?
                                                            <Image style={styles.imgProfileList(responsive)} source={{ uri: Config.s3URL + "upload/jersey/" + item.jersey }} />
                                                            :
                                                            <Image style={styles.imgProfileList(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG} />
                                                    }
                                                </View>
                                                <View style={styles.viewPG2(responsive)}>
                                                    <Text style={styles.txtPG(responsive)}>{item.position}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.txtItemName(responsive)}>{item.display_name}</Text>
                                        </View>
                                        <Text style={styles.txtItemTopScore(responsive, isTrue && item[getPropsFieldName(item?.prop_id)])}>{item.prediction_points}</Text>
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
                               true || (!JSON.parse(item.score_data)?.quarter && (!JSON.parse(item.score_data)?.time_remaining || JSON.parse(item.score_data)?.time_remaining == ':'))?
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
        if ((arrData.length > 0 && arrData[0].lineup.filter((e) => e.ice_pick == '1').length == 0) && (arrData.length > 1 && arrData[1].lineup.filter((e) => e.ice_pick == '1').length == 0)) { return null }
        return (
            <View style={{ width: responsive.width(100) }}>
                <View style={styles.viewRenderFooter(responsive)}>
                    <Image source={Images.ARROW4} defaultSource={Images.ARROW4} style={styles.imgArro1(responsive)} />
                    <Text style={styles.txtRenderFooter(responsive)}> PLUG  N  PLAYS </Text>
                    <Image source={Images.ARROW4} defaultSource={Images.ARROW4} style={styles.imgArro2(responsive)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        data={arrData.length > 0 ? arrData[0].lineup.filter((e) => e.ice_pick == '1') : []}
                        renderItem={renderItem2}
                        style={{ flex: 0.5, }}
                        horizontal={false}
                    />
                    <FlatList
                        data={arrData.length > 1 ? arrData[1].lineup.filter((e) => e.ice_pick == '1') : []}
                        renderItem={renderItem2}
                        style={{ flex: 0.5, }}
                        horizontal={false}
                    />
                </View>
            </View>
        )
    }
    return (
        <HomeBackground title={'Bracket'} backAction={() => navigation.goBack()} isLeftIcon={true} isBack={true}>
            <View style={{ flex: 1, paddingTop: 10, width: Constant.FULL_WIDTH }}>
                <ListView
                    key={"RoasterScreen"}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    style={styles.wrapper}
                    dataSource={ds.cloneWithRows(arrData.length > 0 ? [1] : [])}
                    renderHeader={renderHeader}
                    renderRow={(data, sectionID, rowID, higlightRow) => renderItem(data, rowID)}
                    renderFooter={arrData.length > 0 ? renderFooter : null}
                    removeClippedSubviews={!(Platform.OS == "ios")}
                />
            </View>
        </HomeBackground>
    )
};
export default BracketLobby;
