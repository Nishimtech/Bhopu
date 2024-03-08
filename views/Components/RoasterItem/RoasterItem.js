import React, { useEffect, useMemo, useState } from "react"
import { ActivityIndicator, Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import GradientView from "../GradientView"
import AnimatedArrow from "../AnimatedArrow"
import { API, Constant, Images, Utils } from "../../Home"
import { Config } from "../../../Helper"

const RosterItem = ({ ice_pick,navigation,setScrollEnabled,is_cross_icon=true,is_disble_action=false,filterItem,propsItem,item, idx, onChangeRoster, getPropsName, is_disble_player, rosterDataChanges, styles, responsive, setPlayerSeasonID, selectPlayerSeasonID }) => {
    const [isExpandItem, setExpandItem] = useState(false)
    const [selected, setSelected] = useState(false)
    const [apiCalling, setApiCalling] = useState(false)
    const player_selected = propsItem[propsItem.prop_id].selected_data;

    useEffect(() => {
        if ((item.season_player_id == selectPlayerSeasonID && !selected) || (item.season_player_id != selectPlayerSeasonID && selected)) {
            setSelected(item.season_player_id == selectPlayerSeasonID)
        }
        if (!(item.season_player_id == selectPlayerSeasonID)) {
            setApiCalling(false)
            setExpandItem(false)
            if(setScrollEnabled){
                setScrollEnabled(true)
            }
        }
    }, [selectPlayerSeasonID])
    const crossItemSelected = () => {
        let findIndex = rosterDataChanges.findIndex((e) => e.season_player_id == propsItem.season_player_id);
        propsItem[propsItem.prop_id].selected_data = undefined
        rosterDataChanges.splice(findIndex, 1);
        rosterDataChanges.splice(findIndex, 0, propsItem);
        onChangeRoster(rosterDataChanges)
    }
    const CHECK_FANTASY_POINTS = (increase) => {
        if (propsItem[propsItem.prop_id].array_data.length > 0) {
            updatePts(increase)
        } else {
            setApiCalling(true)
            API.CHECK_FANTASY_POINTS({ "season_id": item.season_id, "prop_id": propsItem.prop_id, "player_id": item.player_id }).then(async (response) => {
                setApiCalling(false)
                let result = response.data;
                if (result.response_code == Constant.SUCCESS_STATUS) {
                    propsItem[propsItem.prop_id].array_data = JSON.parse(result.data?.projection) || [];
                    updatePts(increase)
                }
            }).catch(error => {
                setApiCalling(false)
                Utils.handleCatchError(error, navigation)
                return error;
            });
        }
    }
    const updatePts = (increase) => {
        let findIndex = rosterDataChanges.findIndex((e) => e.season_player_id == item.season_player_id);
        let valueMedian = increase ? parseFloat(propsItem[propsItem.prop_id].change_data.median) + 1 : parseFloat(propsItem[propsItem.prop_id].change_data.median) - 1;
        let findata = propsItem[propsItem.prop_id].array_data.find((e) => e.p == valueMedian)
        let data = {
            'max': propsItem[propsItem.prop_id].change_data.max,
            'median': valueMedian,
            'min': propsItem[propsItem.prop_id].change_data.min,
            'over': findata.u || '',
            'under': findata.o || '',
        }
        propsItem[propsItem.prop_id].change_data = data
        rosterDataChanges.splice(findIndex, 1);
        rosterDataChanges.splice(findIndex, 0, propsItem);
        onChangeRoster(rosterDataChanges)
    }
    const addPlayerItem = (type) => {
        let findIndex = rosterDataChanges.findIndex((e) => e.season_player_id == item.season_player_id);
        let data = {
            'max': propsItem[propsItem.prop_id].change_data.max,
            'median': propsItem[propsItem.prop_id].change_data.median,
            'min': propsItem[propsItem.prop_id].change_data.min,
            'over': propsItem[propsItem.prop_id].change_data.over,
            'under': propsItem[propsItem.prop_id].change_data.under,
            'ice_pick':ice_pick,
            'type': type,
        }
        propsItem[propsItem.prop_id].selected_data = data
        rosterDataChanges.splice(findIndex, 1);
        rosterDataChanges.splice(findIndex, 0, propsItem);
        setExpandItem(false)
        setScrollEnabled(true)
        onChangeRoster(rosterDataChanges)
    }
    const onChangePropsData = (childItem) => {
        let findIndex = rosterDataChanges.findIndex((e) => e.season_player_id == item.season_player_id);
        propsItem.prop_id = childItem.prop_id;
        if (!propsItem[childItem.prop_id]) {
            propsItem[childItem.prop_id] = {
                'prop_name': getPropsName(childItem.prop_id),
                'prop_id': childItem.prop_id,
                'array_data': [],
                'selected_data': undefined,
                'change_data': {
                    'max': childItem.fantasy_points.max,
                    'median': childItem.fantasy_points.median,
                    'min': childItem.fantasy_points.min,
                    'over': childItem.fantasy_points.under,
                    'under': childItem.fantasy_points.over
                },
                'default_data': {
                    'max': childItem.fantasy_points.max,
                    'median': childItem.fantasy_points.median,
                    'min': childItem.fantasy_points.min,
                    'over': childItem.fantasy_points.under,
                    'under': childItem.fantasy_points.over
                }
            }
        }
        rosterDataChanges.splice(findIndex, 1);
        rosterDataChanges.splice(findIndex, 0, propsItem);
        setExpandItem(false)
        setScrollEnabled(true)
        onChangeRoster(rosterDataChanges)
    }
    const returnPropsName = () => {
        let object = propsItem[propsItem.prop_id];
        return object.prop_name
    }
    const getDefaultObj = () => {
        let object = propsItem[propsItem.prop_id];
        return object.selected_data || object.change_data
    }
    const itemRoster = useMemo(() => {
        let defaultObj = getDefaultObj()
        return (
            <Animated.View key={idx} pointerEvents={(!player_selected && is_disble_player) ? 'none' : 'auto'} style={{ opacity: ((!player_selected && is_disble_player)) ? 0.4 : 1, zIndex: rosterDataChanges.length - idx, marginRight: '2.1%', marginBottom: '5%', width: (Constant.FULL_WIDTH) / 2.14, height: ((Constant.FULL_WIDTH) / 2.14) * 1.0977 }}>
                <Image style={styles.inactiveImage} source={(selectPlayerSeasonID == item.season_player_id || is_disble_action) ? Images.ACTIVEBG : Images.INACTIVEBG} defaultSource={(selectPlayerSeasonID == item.season_player_id || is_disble_action) ? Images.ACTIVEBG : Images.INACTIVEBG} />
                <View onStartShouldSetResponder={() => !is_disble_action}  onResponderRelease={()=>setPlayerSeasonID(selected ? '' : item.season_player_id)}  style={{ flex: 1, opacity: (selected || player_selected) ? 1 : 0.4 }}>
                    <View style={styles.viewTeamOuter}>
                        <View style={styles.viewTeamInner}>
                            <View style={styles.viewTeamData(responsive)}>
                                <Text style={styles.txtFanPts(responsive)}>{'FAN PTS'}</Text>
                                <View pointerEvents={((player_selected && player_selected.type == 2) || !selected || apiCalling) ? 'none' : 'auto'} onStartShouldSetResponder={() => !is_disble_action} onResponderGrant={() => addPlayerItem(2)} style={styles.numBox(responsive, player_selected, 2)}>
                                    {
                                        apiCalling ?
                                            <ActivityIndicator />
                                            :
                                            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtPts(responsive, player_selected, 2)}>{parseFloat(defaultObj.over)}</Text>
                                    }
                                </View>
                                <Text style={styles.txtOver(responsive, player_selected, 2)}>{'Over'}</Text>
                            </View>
                            {
                                (selected && !player_selected && parseFloat(defaultObj.max) != parseFloat(defaultObj.median)) ?
                                    <View onStartShouldSetResponder={() => true} onResponderGrant={() => CHECK_FANTASY_POINTS(true)} disabled={apiCalling}>
                                        <Text style={styles.txtLabelView(responsive)}>{'Max'}</Text>
                                        <GradientView colors={['#FA2D5E', '#FA0C45']} styles={styles.viewMax(responsive, true)}>
                                            <AnimatedArrow is_animated={true} />
                                            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtMax(responsive)}>{`${parseFloat(defaultObj.max)}`}</Text>
                                        </GradientView>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.txtLabelView(responsive)}>{'Max'}</Text>
                                        <View  style={styles.viewMax(responsive, true)}>
                                            <AnimatedArrow />
                                            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtMax(responsive)}>{`${parseFloat(defaultObj.max)}`}</Text>
                                        </View>
                                    </View>
                            }
                        </View>

                        <View style={styles.insideContainer(responsive)}>
                            <View style={{ flex: 1 }}>
                                {
                                    item.jersey ?
                                    <Image style={styles.image(responsive)} source={{uri:Config.s3URL + "upload/jersey/" + item.jersey}} />
                                    :
                                    <Image style={styles.image(responsive)} source={Images.EMPTYIMG} defaultSource={Images.EMPTYIMG}/>
                                }
                                <Text pointerEvents={'none'} numberOfLines={1} adjustsFontSizeToFit style={styles.txtName(responsive)}>{item.display_name}</Text>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtTeam(responsive)}>{`${item.home} vs ${item.away}`}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setPlayerSeasonID(selected ? '' : item.season_player_id)} activeOpacity={0.9}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtPoint(responsive, player_selected)}>{parseFloat(defaultObj.median)}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewTeamInner}>
                            <View style={styles.viewTeamData(responsive)}>
                                <Text style={styles.txtFanPts(responsive)}>{'FAN PTS'}</Text>
                                <View pointerEvents={((player_selected && player_selected.type == 1) || !selected || apiCalling) ? 'none' : 'auto'} onStartShouldSetResponder={() => !is_disble_action} onResponderGrant={() => addPlayerItem(1)} style={styles.numBox(responsive, player_selected, 1)}>
                                    {
                                        apiCalling ?
                                            <ActivityIndicator />
                                            :
                                            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtPts(responsive, player_selected, 1)}>{parseFloat(defaultObj.under)}</Text>
                                    }
                                </View>
                                <Text style={styles.txtOver(responsive, player_selected, 1)}>{'Under'}</Text>
                            </View>
                            {
                                (selected && !player_selected && parseFloat(defaultObj.min) != parseFloat(defaultObj.median)) ?
                                    <View onStartShouldSetResponder={() => true} onResponderGrant={() => CHECK_FANTASY_POINTS(false)} disabled={apiCalling}>
                                        <Text style={styles.txtLabelView(responsive)}>{'Min'}</Text>
                                        <GradientView colors={['#436CFE', '#2A52E1']} styles={styles.viewMax(responsive, true)}>
                                            <AnimatedArrow is_down={true} is_animated={true} />
                                            <Text numberOfLines={1} style={styles.txtMax(responsive)}>{`${parseFloat(defaultObj.min)}`}</Text>
                                        </GradientView>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.txtLabelView(responsive)}>{'Min'}</Text>
                                        <View  style={styles.viewMax(responsive, true)}>
                                            <AnimatedArrow is_down={true}  />
                                            <Text numberOfLines={1} style={styles.txtMax(responsive)}>{`${parseFloat(defaultObj.min)}`}</Text>
                                        </View>
                                    </View>
                            }

                        </View>
                    </View>
                    <View pointerEvents={(selected && !player_selected) ? 'auto' : "none"} style={styles.viewBtm}>
                        <TouchableOpacity onPress={() => {setExpandItem(!isExpandItem);setScrollEnabled(false)}} style={styles.itmContainer}>
                            <Text style={styles.itemTxt(responsive, player_selected, selected)}>{returnPropsName()}</Text>
                            {
                                !is_disble_action &&
                                    <Image style={{ transform: [{ rotate: isExpandItem ? '180deg' : '0deg' }], ...(selected && { tintColor: 'white' }) }} source={Images.ARROW_DOWN} defaultSource={Images.ARROW_DOWN} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewTopSports(responsive)}>
                    <Text style={styles.txtTopSports(responsive)}>{item.position}</Text>
                </View>
                {
                    (player_selected && is_cross_icon) &&
                    <TouchableOpacity onPress={() => crossItemSelected(item)} style={styles.touch_player_selected(responsive)}>
                        <Image style={styles.imgClose(responsive)} source={Images.IC_ClOSE} defaultSource={Images.IC_ClOSE} />
                    </TouchableOpacity>
                }
                {
                    (isExpandItem && !player_selected) &&
                    <GradientView colors={['#3A3E44', '#3A3F4D']} styles={styles.viewExpand(responsive)} >
                        {
                            item.props.map((childItem, row) => {
                                let median = propsItem[childItem.prop_id]?.change_data.median || childItem.fantasy_points.median
                                return (
                                    <TouchableOpacity disabled={childItem.prop_id == propsItem.prop_id} onPress={() => { onChangePropsData(childItem) }} key={idx + row} style={{ width: '100%', height: responsive.size(20), marginBottom: responsive.size(row == item.props.length - 1 ? 0 : 16), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={styles.txtExpand(responsive, childItem, propsItem )}>{getPropsName(childItem.prop_id)}</Text>
                                        <Text style={styles.txtExpandPts(responsive, childItem, propsItem)}>{parseFloat(median)}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </GradientView>
                }
            </Animated.View>
        )
    }, [item,rosterDataChanges,selected,isExpandItem,player_selected,is_disble_player,apiCalling]);
    if(filterItem && !filterItem(item) || (player_selected && player_selected.ice_pick != ice_pick)){
        return null
    }
    return itemRoster
}
export default RosterItem
