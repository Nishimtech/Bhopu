import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import ListView from "deprecated-react-native-listview";
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { HomeBackground,API, Constant, Images, Utils,PreferenceConstant,AppPreferences,useResponsiveSizes, Core } from '..';

const LandingScreen = (props) => {
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const responsive = useResponsiveSizes();
  const [poly1Anim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [poly2Anim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [poly3Anim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [poly4Anim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [animatedHeight] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [btnLoginAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [selectTypeID, setSelectTypeID] = useState('')
  const [previousTypeID] = useState(props.route?.params?.previousTypeID || '')
  const [apiCalling, setApiCalling] = useState(true)
  const [arrOfTabs, setTabsData] = useState([])

  const getPrefVariables = async () => {
    await Promise.all([
      AppPreferences.getItem(PreferenceConstant.SPORTS_HUB),
      AppPreferences.getItem(PreferenceConstant.SPORTS_HUB_DATA),
    ]).then(async (dictObj) => {
      await Promise.all([
        AppPreferences.removeItem(PreferenceConstant.SPORTS_HUB)
      ]).then(async () => {
        if(dictObj[1] == null){
          API.GET_GAME_TYPE_LIST().then(async (response) => {
            let result = response.data;
            setApiCalling(false)
            if (result.response_code == Constant.SUCCESS_STATUS) {
              await Promise.all([
                AppPreferences.setItem(PreferenceConstant.SPORTS_HUB_DATA, JSON.stringify(result?.data)),
              ]).then(() => {
                loadData(result?.data?.game_type || [],dictObj)
              });
            }
          }).catch(error => {
            setApiCalling(false)
            Utils.handleCatchError(error, props.navigation)
            return error;
          });
        }else{
            let data = JSON.parse(dictObj[1]);
            loadData(data?.game_type || [],dictObj)
        }
      });
    })
  }
  const loadData = (game_type,dictObj) => {
    setTabsData(game_type);
    if (dictObj[0] != null && JSON.parse(dictObj[0]).status == 1) {
      setSelectTypeID(JSON.parse(dictObj[0]).type_id)
    }
    Animated.parallel([
      Animated.timing(poly1Anim, { toValue: responsive.size(32), duration: 400, easing: Easing.linear }),
      Animated.timing(poly2Anim, { toValue: responsive.size(130), duration: 600, easing: Easing.linear }),
      Animated.timing(poly3Anim, { toValue: responsive.size(24), duration: 800, easing: Easing.linear }),
      Animated.timing(poly4Anim, { toValue: responsive.size(24), duration: 1000, easing: Easing.linear }),
      Animated.timing(animatedHeight, { toValue: responsive.size(550), duration: 1200, easing: Easing.linear }),
      Animated.timing(btnLoginAnim, { toValue: 0, duration: 1300, easing: Easing.linear }),
    ]).start();
  }
  useEffect(() => {
    getPrefVariables()
  }, [])
  const actionSelectTab = async () => {
    await Promise.all([
      AppPreferences.setItem(PreferenceConstant.SPORTS_HUB, JSON.stringify(arrOfTabs.find((e) => e.type_id == selectTypeID))),
    ]).then(async() => {
      if(previousTypeID != '' && previousTypeID == selectTypeID){
        props.navigation.navigate('HomeScreen')
      }else{
        await Promise.all([
          AppPreferences.removeItem(PreferenceConstant.SELECTED_SPORTS)
        ]).then(async () => {
            Utils.navToRoot('HomeScreen',props.navigation)
        })
      }
    })
  }
  const renderHeader = () => {
    return (
      <View style={styles.header_container(responsive)}>
        <Animated.Text style={styles.txt_contest_window(responsive)}>{Utils._i18n("Select A Contest Window")}</Animated.Text>
        {
          arrOfTabs.length > 0 ?
            <>
              <Animated.View style={styles.container_view(animatedHeight, responsive)}>
                <View style={styles.view_container(true, responsive)}>
                  {
                    arrOfTabs.slice(0, 2).map((item, idx) => {
                      let typeID = item.type_id;
                      return (
                        <Animated.View pointerEvents={item.status == 1 ? "auto" : "none"} key={typeID} style={styles.view_polygon_container(item.status == 1, idx == 0 ? poly1Anim : poly3Anim, responsive)}>
                          <TouchableOpacity onPress={() => setSelectTypeID(typeID)} style={styles.main_container}>
                            <Image style={styles.img_polygon} source={selectTypeID == typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} defaultSource={selectTypeID == typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} />
                            <View style={styles.view_polygon(responsive)}>
                              <Image style={[styles.img_polygon, ...(selectTypeID == typeID ? [styles.activeImg] : [])]} source={selectTypeID != typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} defaultSource={selectTypeID != typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} />
                              <Image style={styles.imagePolygon(responsive, selectTypeID, typeID)} source={Images[item.image_name]} defaultSource={Images[item.image_name]} />
                            </View>
                            <Text style={styles.txt_sports(selectTypeID == typeID, responsive)}>{item.name}</Text>
                            <Text style={styles.txt_sports_subtitle(selectTypeID == typeID, responsive)}>{item.desc}</Text>
                          </TouchableOpacity>
                        </Animated.View>
                      )
                    })
                  }
                </View>
                <View style={styles.view_container(false, responsive)}>
                  {
                    arrOfTabs.slice(2).map((item, idx) => {
                      let typeID = item.type_id;
                      return (
                        <Animated.View pointerEvents={item.status == 1 ? "auto" : "none"} key={typeID} style={styles.view_polygon_container(item.status == 1, idx == 0 ? poly2Anim : poly4Anim, responsive)}>
                          <TouchableOpacity onPress={() => setSelectTypeID(typeID)} style={styles.main_container}>
                            <Image style={styles.img_polygon} source={selectTypeID == typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} defaultSource={selectTypeID == typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} />
                            <View style={styles.view_polygon(responsive)}>
                              <Image style={[styles.img_polygon, ...(selectTypeID == typeID ? [styles.activeImg] : [])]} source={selectTypeID != typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} defaultSource={selectTypeID != typeID ? Images.ACTIVEPOLYGON : Images.POLYGON} />
                              <Image style={styles.imagePolygon(responsive, selectTypeID, typeID)} source={Images[item.image_name]} defaultSource={Images[item.image_name]} />
                            </View>
                            <Text style={styles.txt_sports(selectTypeID == typeID, responsive)}>{item.name}</Text>
                            <Text style={styles.txt_sports_subtitle(selectTypeID == typeID, responsive)}>{item.desc}</Text>
                          </TouchableOpacity>
                        </Animated.View>
                      )
                    })
                  }
                </View>
              </Animated.View>
              <Animated.View pointerEvents={selectTypeID != '' ? 'auto' : 'none'} style={styles.btnView(btnLoginAnim, selectTypeID != '')}>
                <TouchableOpacity onPress={() => actionSelectTab()} style={styles.wrapper}>
                  <LinearGradient
                    locations={[0, 1]}
                    colors={selectTypeID != '' ? [Core.primaryColor, Core.gold_tips] : [Core.light_gray,Core.light_gray]}
                    useAngle={true}
                    angle={180}
                    style={styles.btnNext(responsive)}>
                    <Text style={styles.buttonText(responsive)}>{Utils._i18n("Next")}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </>
            : apiCalling &&
            <View style={styles.viewIndicator(responsive)}>
              <ActivityIndicator color={Core.primaryColor} />
            </View>
        }
      </View>
    )
  }
  return (
    <HomeBackground>
      <ListView
        key={"LandingScreen"}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        style={styles.wrapper}
        dataSource={ds.cloneWithRows([])}
        renderHeader={renderHeader}
        removeClippedSubviews={!(Platform.OS == "ios")}
      />
    </HomeBackground>
  )

};
export default LandingScreen;
