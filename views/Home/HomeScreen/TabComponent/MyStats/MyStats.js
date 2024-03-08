import React, {useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {  Constant, Core, GradientView, SportsHeader, useResponsiveSizes } from '../../../index';
import styles from './styles';
import ListView from "deprecated-react-native-listview";
import { API, Fonts, Images, Utils } from '../../../../../Helper';
import CircularProgress from 'react-native-circular-progress-indicator';

const MyStats = ({ arrOfSports,sportsData,tabIdx,navigation }) => {
  const responsive = useResponsiveSizes();
  const [topAnim] = useState(new Animated.Value(-responsive.size(340)))
  const [opacityAnim] = useState(new Animated.Value(0))
  const [selected_sports, setSelectedSports] = useState(undefined)
  const [arrOFSportsPercentage, setSportsPercentage] = useState([])
  const [objHeader,setObjHeader]=useState({
      selectIdx:0,
      arrOfHeader:[{key:'W',value:'Weekly'},{key:'W',value:'Monthly'},{key:'Y',value:'Yearly'}]
  })
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  
  useEffect(()=>{
    if(tabIdx == 4){
      GET_MY_STATS(objHeader.arrOfHeader[objHeader.selectIdx].key)     
    }
  },[tabIdx])
  useEffect(()=>{
    if(selected_sports){
      GET_MY_STATS_DETAIL(objHeader.arrOfHeader[objHeader.selectIdx].key)
    }
  },[selected_sports])
  GET_MY_STATS = (type) => {
    API.GET_MY_STATS({"type":type}).then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
        setSelectedSports(sportsData)
        setSportsPercentage(result.data?.sports_per || [])
        Animated.parallel([
          Animated.timing(topAnim, { toValue: 0, duration: 1200, easing: Easing.cubic }),
        ]).start(()=>{
          Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 1, duration: 750, easing: Easing.cubic }),
          ]).start()
        });
      }
    }).catch(error => {
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }
  GET_MY_STATS_DETAIL= (type) => {
    API.GET_MY_STATS_DETAIL({"type":type,sports_id:selected_sports.sports_id}).then(async (response) => {
      let result = response.data;
      if (result.response_code == Constant.SUCCESS_STATUS) {
          console.log(JSON.stringify(result))
      }
    }).catch(error => {
      Utils.handleCatchError(error, navigation)
      return error;
    });
  }

  const actionSelectSport = async (item) => {
    if ((selected_sports == undefined) || (selected_sports && selected_sports.sports_id != item.sports_id)) {
      setSelectedSports(item)
    }
  }
  const HeaderSports = useMemo(() => {
    const bgColor = topAnim.interpolate({ inputRange: [-responsive.size(325), 0], outputRange: [Core.tuna, Core.transparent] });
    const borderBottomLeftRadius = topAnim.interpolate({ inputRange: [-responsive.size(325), 0], outputRange: [20, 0] });
    const borderBottomRightRadius = topAnim.interpolate({ inputRange: [-responsive.size(325), 0], outputRange: [20, 0] });
    return (
      <SportsHeader stylesBackground={{backgroundColor:bgColor,borderBottomLeftRadius:borderBottomLeftRadius,borderBottomRightRadius:borderBottomRightRadius}} selected_sports={selected_sports} arrOfSports={arrOfSports} onChangeItem={(item) => actionSelectSport(item)} />
    );
  }, [arrOfSports, selected_sports,topAnim]);
  const renderProgress=(item,idx)=>{
    return(
      <View style={{marginLeft:responsive.size(idx > 0?0:13),marginRight:responsive.size(13),width:responsive.size(58),height:'100%',paddingTop:idx%2==0?responsive.size(23):responsive.size(43),paddingBottom:idx%2==0?responsive.size(40):responsive.size(20)}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                  <CircularProgress
                    value={item.per}
                    radius={29}
                    duration={3000}
                    progressValueColor={Core.primaryColor}
                    activeStrokeWidth={6}
                    inActiveStrokeWidth={6}
                    inActiveStrokeOpacity={0.3}
                    inActiveStrokeColor={'#292D32'}
                    activeStrokeColor={Core.primaryColor}
                    maxValue={100}
                    valueSuffix={'%'}
                    titleColor={'white'}
                    titleStyle={{fontSize:responsive.size(Fonts.xl),textAlign:'center',fontFamily:'Saira-Bold'}}
                  />
                  <View style={{alignSelf:'center',width:responsive.size(2),height:responsive.size(2),backgroundColor:'white',borderRadius:responsive.size(1)}}/>
                  <Animated.View style={{width:responsive.size(1),flex:opacityAnim,backgroundColor:'rgba(255, 255, 255, 0.30)'}} />
                  <View style={{alignSelf:'center',width:responsive.size(2),height:responsive.size(2),backgroundColor:'white',borderRadius:responsive.size(1)}}/>
                  <Text style={{fontSize:responsive.size(Fonts.lg),fontFamily:'Saira-Regular',textAlign:'left',color:'#BEBEBE'}}>{item.sports_name}</Text>
            </View>
      </View>
    )
  }
  const headerMove=(increase)=>{
      let index = objHeader.selectIdx;
      index = increase?index+1:index-1;
      setObjHeader({selectIdx:index,arrOfHeader:objHeader.arrOfHeader})
      GET_MY_STATS(objHeader.arrOfHeader[index].key)     
  }
  return (
    <View style={styles.container}>
        {
          arrOFSportsPercentage.length > 0 &&
          <Animated.View style={{width:'96%',marginTop:topAnim,height:responsive.size(325),paddingHorizontal:'2%',alignSelf:'center'}}>
                <GradientView colors={['rgba(250, 214, 12, 0.16)','rgba(58, 63, 77, 0.80)']} styles={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:responsive.size(20),alignSelf:'center',width:'100%',height:responsive.size(38),borderRadius:responsive.size(10)}}>
                        <TouchableOpacity onPress={()=>headerMove(false)} disabled={objHeader.selectIdx == 0} style={{opacity:objHeader.selectIdx ==0?0.2:1,width:responsive.size(24),height:responsive.size(24)}}>
                                <Image style={{width:responsive.size(24),height:responsive.size(24),borderRadius:responsive.size(12)}} source={Images.ARROW_LEFT} defaultSource={Images.ARROW_LEFT}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:responsive.size(Fonts.lg),textAlign:'center',fontFamily:'Saira-SemiBold',color:'white'}}>{objHeader.arrOfHeader[objHeader.selectIdx].value}</Text>
                        <TouchableOpacity onPress={()=>headerMove(true)} disabled={objHeader.selectIdx == objHeader.arrOfHeader.length-1} style={{opacity:objHeader.selectIdx == objHeader.arrOfHeader.length-1?0.2:1,width:responsive.size(24),height:responsive.size(24)}}>
                                <Image style={{width:responsive.size(24),height:responsive.size(24),borderRadius:responsive.size(12)}} source={Images.ARROW_RIGHT} defaultSource={Images.ARROW_RIGHT}/>
                        </TouchableOpacity>
                </GradientView>
                <Text style={{marginTop:responsive.size(16),fontSize:responsive.size(Fonts.xxl),fontFamily:'Saira-SemiBold',textAlign:'left',color:Core.primaryColor}}>Sport</Text>
                <GradientView colors={['#3A3E44','#3A3F4D']} styles={{overflow:'hidden',borderRadius:responsive.size(10),marginTop:responsive.size(8),width:'100%',height:responsive.size(207),alignItems:'center'}}>
                    <View style={styles.behindContainer}>
                      <Image source={Images.blurTopLeft} defaultSource={Images.blurTopLeft} style={styles.rightTop(responsive)} />
                    </View>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex:1}}>
                              {
                                arrOFSportsPercentage.map((item,idx)=>{
                                    return renderProgress(item,idx)
                                })
                              }
                      </ScrollView>
                </GradientView>
          </Animated.View>
        }
        {selected_sports && HeaderSports}
        {
          arrOFSportsPercentage.length == 0 &&
            <ActivityIndicator style={{marginTop:responsive.size(15)}} color={Core.primaryColor} />
        }

    </View>
  )

};
export default MyStats;
