import React, { useState, useEffect } from 'react';
import { BackHandler, Animated, Easing, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Constant, GradientView, HomeBackground, Images, Utils, useResponsiveSizes } from '..';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ListView from "deprecated-react-native-listview";
import { EventRegister } from 'react-native-event-listeners'

const LobbyFilter = (props) => {
      const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
      const applyFilter = props.route?.params?.applyFilter;
      const filterData = props.route?.params?.filterData;
      const responsive = useResponsiveSizes();
      const [backPos] = useState(new Animated.Value(Constant.FULL_HEIGHT))
      const [isAnimatedScreen, setAnimatedScreen] = useState(true)
      const [filterObj, setFilterObj] = useState({
            contest_mode_ids: applyFilter?.contest_mode_ids,
            group_ids: applyFilter?.group_ids,
            min_entry: applyFilter?.min_entry,
            max_entry: applyFilter?.max_entry,
            min_prize: applyFilter?.min_prize,
            max_prize: applyFilter?.max_prize,
            min_user: applyFilter?.min_user,
            max_user: applyFilter?.max_user,
      });

      useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', function () { return false; });
            return (() => {
                  backHandler.remove()
            })
      }, [])
      const actionReset = () => {
            // setFilterObj({
            //       contest_mode_ids: [],
            //       group_ids: [],
            //       min_entry: 0,
            //       max_entry: filterData?.contest_filter.max_entry_fee,
            //       min_prize: 0,
            //      // max_prize: filterData?.contest_filter.max_prize_pool,
            //       max_prize: 5200,
            //       min_user: 0,
            //       max_user: filterData?.contest_filter.max_participation,
            // });
            let obj = {
                  contest_mode_ids: [],
                  group_ids: [],
                  min_entry: 0,
                  max_entry: filterData?.contest_filter.max_entry_fee,
                  min_prize: 0,
                 // max_prize: filterData?.contest_filter.max_prize_pool,
                  max_prize: 5200,
                  min_user: 0,
                  max_user: filterData?.contest_filter.max_participation,
            }
            props.navigation.goBack()
            EventRegister.emit('filterData', obj)
      }
      const loadAnimation = (value) => {
            setAnimatedScreen(true)
            Animated.parallel([
                  Animated.timing(backPos, { toValue: value, duration: 400, easing: Easing.linear }),
            ]).start(setAnimatedScreen(false));
      }
      const rightAction = async () => {
            props.navigation.goBack()
      }
      const applyAction = async () => {
            props.navigation.goBack()
            EventRegister.emit('filterData', filterObj)
      }
      const setEntryFee = (min, max) => {
            setFilterObj({
                  contest_mode_ids: filterObj.contest_mode_ids,
                  group_ids: filterObj.group_ids,
                  min_prize: filterObj.min_prize,
                  max_prize: filterObj.max_prize,
                  min_user: filterObj.min_user,
                  max_user: filterObj.max_user,
                  min_entry: min,
                  max_entry: max
            })
      }
      const setPrizePool = (min, max) => {
            setFilterObj({
                  contest_mode_ids: filterObj.contest_mode_ids,
                  group_ids: filterObj.group_ids,
                  min_entry: filterObj.min_entry,
                  max_entry: filterObj.max_entry,
                  min_user: filterObj.min_user,
                  max_user: filterObj.max_user,
                  min_prize: min,
                  max_prize: max
            })
      }
      const setUserJoin = (min, max) => {
            setFilterObj({
                  contest_mode_ids: filterObj.contest_mode_ids,
                  group_ids: filterObj.group_ids,
                  min_entry: filterObj.min_entry,
                  max_entry: filterObj.max_entry,
                  min_prize: filterObj.min_prize,
                  max_prize: filterObj.max_prize,
                  min_user: min,
                  max_user: max
            })
      }
      const renderHeader = () => {
            const { contest_mode_ids, group_ids, min_entry, max_entry, min_prize, max_prize, min_user, max_user } = filterObj;
            return (
                  <Animated.View style={styles.headerContainer(responsive, backPos)}>
                        <View style={{ width: '100%' }}>
                              <Text style={styles.txtContest(responsive)}>{Utils._i18n("Contest Mode")}</Text>
                              <View style={styles.viewContestMode(responsive)}>
                                    <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                                    {
                                          filterData.contest_mode.map((itm, idx) => {
                                                return (
                                                      <TouchableOpacity onPress={() => setFilterObj({ contest_mode_ids: contest_mode_ids.includes(itm.contest_mode_id)? contest_mode_ids.filter((e)=>e != itm.contest_mode_id) : [...contest_mode_ids,...[itm.contest_mode_id]], group_ids: group_ids, min_entry: min_entry, max_entry: max_entry, min_prize: min_prize, max_prize: max_prize, min_user: min_user, max_user: max_user })} key={idx} style={styles.touchText}>
                                                            <View style={styles.viewModePick(responsive, contest_mode_ids, itm.contest_mode_id)}>
                                                                  {

                                                                        contest_mode_ids.includes(itm.contest_mode_id) &&
                                                                        <Image style={styles.imgCorrect(responsive)} source={Images.IC_CORRECT} defaultSource={Images.IC_CORRECT} />
                                                                  }
                                                            </View> 
                                                            <Text style={styles.txtName(responsive)}>{itm.name}</Text>
                                                      </TouchableOpacity>
                                                )
                                          })
                                    }
                              </View>
                        </View>
                        <View style={styles.viewContestType(responsive)}>
                              <Text style={styles.txtContest(responsive)}>{Utils._i18n("Contest Type")}</Text>
                              <View style={styles.viewContestMode(responsive)}>
                                    <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                                    {
                                          filterData.contest_type.map((itm, idx) => {
                                                return (
                                                      <TouchableOpacity onPress={() => setFilterObj({ group_ids: group_ids.includes(itm.group_id)? group_ids.filter((e)=>e != itm.group_id) : [...group_ids,...[itm.group_id]], contest_mode_ids: contest_mode_ids, min_entry: min_entry, max_entry: max_entry, min_prize: min_prize, max_prize: max_prize, min_user: min_user, max_user: max_user })} key={idx} style={styles.touchText}>
                                                            <View style={styles.typeView(responsive, itm.group_id, group_ids)}>
                                                                  {
                                                                        group_ids.includes(itm.group_id) &&
                                                                        <Image style={styles.imgCorrect(responsive)} source={Images.IC_CORRECT} defaultSource={Images.IC_CORRECT} />
                                                                  }
                                                            </View>
                                                            <Text style={styles.txtName(responsive)}>{itm.group_name}</Text>
                                                      </TouchableOpacity>
                                                )
                                          })
                                    }
                              </View>
                        </View>
                        <View style={styles.viewContestType(responsive)}>
                              <Text style={styles.txtEntry(responsive)}>{Utils._i18n("Entry Fee")}</Text>
                              <View style={styles.viewEntryFee(responsive)}>
                                    <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                                    <MultiSlider
                                          sliderLength={Constant.FULL_WIDTH - responsive.size(80)}
                                          values={[min_entry, max_entry]}
                                          onValuesChangeFinish={(value) => { setEntryFee(value[0], value[1]) }}
                                          min={0}
                                          max={filterData.contest_filter.max_entry_fee}
                                          trackStyle={styles.trackStyle(responsive)}
                                          selectedStyle={styles.selectedStyle}
                                          customMarker={() => { return <View style={styles.viewSlider(responsive)} /> }}
                                          step={1}
                                          allowOverlap={true}
                                    />
                                    <View style={styles.viewMinMax(responsive)}>
                                          <Text style={styles.textMin(responsive)}>{Utils._i18n("Min")} {min_entry}</Text>
                                          <Text style={styles.textMax(responsive)}>{Utils._i18n("Max")} {max_entry}</Text>
                                    </View>
                              </View>
                        </View>
                        <View style={styles.viewContestType(responsive)}>
                              <Text style={styles.txtEntry(responsive)}>{Utils._i18n("Prize Pool")}</Text>
                              <View style={styles.viewEntryFee(responsive)}>
                                    <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                                    <MultiSlider
                                          sliderLength={Constant.FULL_WIDTH - responsive.size(80)}
                                          values={[min_prize, max_prize]}
                                          onValuesChangeFinish={(value) => { setPrizePool(value[0], value[1]) }}
                                          min={0}
                                          max={5200}
                                          trackStyle={styles.trackStyle(responsive)}
                                          selectedStyle={styles.selectedStyle}
                                          customMarker={() => { return <View style={styles.viewSlider(responsive)} /> }}
                                          step={1}
                                          allowOverlap={true}
                                    />
                                    <View style={styles.viewMinMax(responsive)}>
                                          <Text style={styles.textMin(responsive)}>{Utils._i18n("Min")} {min_prize}</Text>
                                          <Text style={styles.textMax(responsive)}>{Utils._i18n("Max")} {max_prize}</Text>
                                    </View>
                              </View>
                        </View>
                        <View style={styles.viewContestType(responsive)}>
                              <Text style={styles.txtEntry(responsive)}>{Utils._i18n("Participation")}</Text>
                              <View style={styles.viewEntryFee(responsive)}>
                                    <Image source={Images.LEFTVIEW} defaultSource={Images.LEFTVIEW} style={styles.imgLeftView} />
                                    <MultiSlider
                                          sliderLength={Constant.FULL_WIDTH - responsive.size(80)}
                                          values={[min_user, max_user]}
                                          onValuesChangeFinish={(value) => { setUserJoin(value[0], value[1]) }}
                                          min={0}
                                          max={filterData.contest_filter.max_participation}
                                          trackStyle={styles.trackStyle(responsive)}
                                          selectedStyle={styles.selectedStyle}
                                          customMarker={() => { return <View style={styles.viewSlider(responsive)} /> }}
                                          step={1}
                                          allowOverlap={true}
                                    />
                                    <View style={styles.viewMinMax(responsive)}>
                                          <Text style={styles.textMin(responsive)}>{Utils._i18n("Min")} {min_user}</Text>
                                          <Text style={styles.textMax(responsive)}>{Utils._i18n("Max")} {max_user}</Text>
                                    </View>
                              </View>
                        </View>
                       
                  </Animated.View>
            )
      }
      return (
            <HomeBackground title={'Filters'} isAnimatedScreen={isAnimatedScreen} backPos={backPos} isLeftIcon={true} isReset={true} isRightIcon={true} isCross={true} backAction={actionReset} rightAction={rightAction} loadAnimation={loadAnimation}>
                  <ListView
                        key={"LobbyFilter"}
                        keyboardShouldPersistTaps='handled'
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        style={styles.wrapper}
                        dataSource={ds.cloneWithRows([])}
                        renderHeader={renderHeader}
                        removeClippedSubviews={!(Platform.OS == "ios")}
                  />
                   <TouchableOpacity style={{  position:'absolute',alignSelf:'center', alignItems: 'center',justifyContent: 'center',bottom: responsive.size(20),width: responsive.size(276),height: responsive.size(48),borderRadius: responsive.size(14),overflow:'hidden'}} onPress={() => applyAction()}>
                        <GradientView styles={styles.btnFilter(responsive)}>
                              <Text style={styles.txtApplyFilter(responsive)}>{Utils._i18n("Apply Filters")}</Text>
                        </GradientView>
                  </TouchableOpacity>
            </HomeBackground>
      )

};
export default LobbyFilter;
