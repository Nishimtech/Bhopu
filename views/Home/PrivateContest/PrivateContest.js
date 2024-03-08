import { View, Text, Image, TouchableOpacity, Animated,ScrollView, TextInput,Keyboard, KeyboardEvent, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ConfirmationJoin, MainBackground } from '../../Components'
import { Easing } from 'react-native-reanimated'
import { API, Constant, Core, Fonts, Images, Toast, Utils } from '../../../Helper'
import ListView from 'deprecated-react-native-listview'
import styles from './styles'
import { useResponsiveSizes } from 'react-native-responsive-sizes'
import TagInput from '../../Components/TagInput'
import Clipboard from '@react-native-clipboard/clipboard';

const PrivateContest = ({ navigation, route }) => {
    const [isAnimatedScreen, setAnimatedScreen] = useState(true)
    const [apiCalling, setApiCalling] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [isVisibleUser, setVisibleUser] = useState(false)
    const [backPos] = useState(new Animated.Value(Constant.FULL_HEIGHT))
    const [txtAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
    const [userNameList, setUserNameList] = useState([])
    const [inviteUserList, setInviteUserList] = useState([])
    const [username, setUserName] = useState('')
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
    const responsive = useResponsiveSizes();
    const { contest_id, prize_pool, contestItem, userBalance, userProfile, notificationCount } = route?.params
    const [inviteData, setInviteData] = useState('')
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        function onKeyboardDidShow(e) { // Remove type here if not using TypeScript
          setKeyboardHeight(e.endCoordinates.height);
        }
    
        function onKeyboardDidHide() {
          setKeyboardHeight(0);
        }
    
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);
    
    const loadAnimation = (value) => {
        setAnimatedScreen(true)
        Animated.parallel([
            Animated.timing(backPos, { toValue: value, duration: 400, easing: Easing.linear }),
            Animated.timing(txtAnim, { toValue: responsive.size(1), duration: 400, easing: Easing.linear }),
        ]).start(setAnimatedScreen(false));
    }

    const moveToJoinContest = () => {
        if(contestItem.entry_fee == 0){
            moveToRoasterScreen()
        }else{
            setVisible(true)
        }
    }
    const moveToRoasterScreen = () => {
        navigation.navigate('RoasterScreen', { notificationCount, userBalance, contestItem })
        setVisible(false)
    }
    const getData = () => {
        API.GET_USERNAME_LIST({ 'keyword': username })
            .then((response) => {
                let result = response.data;
                if (result.response_code == Constant.SUCCESS_STATUS) {
                    setVisibleUser(result.data.length > 0 && username != '')
                    setUserNameList(result.data)
                }
            })
            .catch(error => {
                Utils.enableAnimation(250);
                Utils.handleCatchError(error, navigation);
            });
    }

    useEffect(() => {
        inviteCode()
    }, []);

    const inviteCode = () => {
        setApiCalling(true);
        API.INVITE_CODE({ "contest_id": contest_id }).then(async (response) => {
            let result = response.data;
            setApiCalling(false)
            if (result.response_code == Constant.SUCCESS_STATUS) {
                Utils.enableAnimation(400, 2)
                setInviteData(result.data)
                setApiCalling(false);
            }
        }).catch(error => {
            setApiCalling(false)
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    const SENT_CONTEST_INVITE=()=>{
        setApiCalling(true);
        API.SENT_CONTEST_INVITE({ "join_code":inviteData,"emails":paramsUserList(),"invitee_name":userProfile.user_name,"join_link":"https://props.vinfotech.org/prop-fantasy/nba/contest/ApIEtvelP?referral=87620C&sgmty=cHJvcHNfZmFudGFzeQ==","contest_id":contest_id}).then(async (response) => {
            let result = response.data;
            setApiCalling(false)
            if (result.response_code == Constant.SUCCESS_STATUS) {
                Toast.successShowToast('User Invitation successfully sent.')
                setUserName('');
                setUserNameList([]);
                setInviteUserList([]);
                setVisibleUser(false)
            }
        }).catch(error => {
            setApiCalling(false)
            Utils.handleCatchError(error, navigation)
            return error;
        });
    }
    useEffect(()=>{
        if(inviteUserList.length < 20){
            if(username == ''){
                setVisibleUser(false)
            }else if(username.length > 3){
                setTimeout(() => {
                    getData()
                }, 500);
            }
        }
    },[username,inviteUserList])
    const onChangeText = (text, type) => {
        setUserName(text)
       
      };
    const remainUserList=()=>{
        let array = []
        {
            userNameList.map((item)=>{
                if(inviteUserList.find((e)=>e.user_id == item.user_id)){return null}
                array.push(item)
            })
        }
        return array
    }
    const paramsUserList=()=>{
        let array = []
        {
            inviteUserList.map((item)=>{
                array.push(item.email)
            })
        }
        return array
    }
    const renderHeader = () => {
        return (
            <View  style={{ flex: 1 }}>
                <Animated.Text style={styles.txtWlcme(responsive, txtAnim)}>Congrats, you've created a new contest! Enjoy the hostilities!</Animated.Text>
                <Text style={styles.txtHeader(responsive)}>{contestItem.contest_name}</Text>
                <View style={styles.viewWin(responsive)}>
                    <Text style={styles.txtWin(responsive)}>{prize_pool > 0 ? `Win $${prize_pool}` : 'FREEBIE'}</Text>
                </View>
                <Text style={styles.txtSubHdr(responsive)}>More rivals you complete with, more rewards you earn!</Text>
                <Image source={Images.SOCIAL_IMAGES} style={styles.imgSocial(responsive)} />
                <View style={styles.viewUser(responsive)}>
                    <Image source={Images.USER} />
                    <Text style={styles.txtUserName(responsive)}>User Names</Text>
                </View>
              
                <View style={styles.viewName(responsive)}>
                    {
                        inviteUserList.map((item)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:responsive.size(10),justifyContent:'center',backgroundColor:'#3A3F4B',height:responsive.size(28),marginRight:responsive.size(13),marginTop:responsive.size(10)}}>
                                    <Text style={{fontSize:responsive.size(Fonts.lg),textAlign:'left',fontFamily:'Saira-Regular',color:'#BEBEBE'}}>{item.user_name}</Text>
                                    <TouchableOpacity onPress={()=>setInviteUserList(inviteUserList.filter((e)=>e.user_id != item.user_id))} style={{marginLeft:responsive.size(10),marginRight:responsive.size(5),width:responsive.size(20),height:responsive.size(20)}}>
                                        <Image style={{width:responsive.size(20),height:responsive.size(20)}} source={Images.CROSS} defaultSource={Images.CROSS} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                    <View style={{flex:1,justifyContent:'center',height:responsive.size(28),marginTop:responsive.size(10)}}>
                       <TextInput
                                numberOfLines={1}
                                style={{fontSize:responsive.size(Fonts.lg),flex:1,color:'white',minWidth:responsive.size(100)}}
                                placeholder={'Search User..'}
                                placeholderTextColor={Core.light_gray}
                                blurOnSubmit={false}
                                selectionColor={Core.primaryColor}
                                onChangeText={(text) => onChangeText(text, 'user name')}
                                value={username}
                            /> 
                    </View>
                </View>
                <Text  style={styles.txtValidation(responsive)}>Max 20 user ids at a time</Text>
                {
                isVisibleUser &&
                    <View style={{width:'80%',borderBottomRightRadius:responsive.size(20),borderBottomLeftRadius:responsive.size(20),height:responsive.size(remainUserList().length == 0?0:remainUserList().length *40),maxHeight:responsive.size(200),backgroundColor:'#999',alignSelf:'center',shadowColor: "#000",shadowColor: "#000",shadowOffset: {width: 0,height: -6,},shadowOpacity: 0.37,shadowRadius: 7.49,elevation: 12,overflow:'hidden'}}>
                                {
                                    userNameList.map((item)=>{
                                        if(inviteUserList.find((e)=>e.user_id == item.user_id)){return null}
                                        return(
                                            <TouchableOpacity onPress={()=>{if(inviteUserList.length == 20){Toast.WarningShowToast('User add limit full');setUserName("");setUserNameList([]);setVisibleUser(false)}else{setInviteUserList([...inviteUserList,...[item]])}}} style={{borderBottomWidth:1,borderBottomColor:'#BEBEBE',width:'100%',height:responsive.size(40),justifyContent:'center',paddingHorizontal:responsive.size(15)}}>
                                                <Text style={{fontSize:responsive.size(Fonts.lg),fontFamily:'Saira-Regular',textAlign:'left',color:'black'}}>{item.user_name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                    </View>
                }
                <TouchableOpacity onPress={SENT_CONTEST_INVITE} disabled={inviteUserList.length == 0} style={styles.btnInvite(responsive,inviteUserList.length == 0)} >
                    <Text style={styles.txtBtnInvite(responsive,inviteUserList.length == 0)}>Send Invite</Text>
                </TouchableOpacity>
                <Text style={styles.txtShareCode(responsive)}>Share Contest Code Invite Rivals</Text>
                <View style={styles.touchCode(responsive)} >
                    <Text style={styles.txtCode(responsive)}>{inviteData}</Text>
                    <TouchableOpacity style={{position:'absolute',right:responsive.size(20),width:responsive.size(24),height:responsive.size(24),alignItems:'center',justifyContent:'center'}} onPress={() => { Clipboard.setString(`${inviteData}`);Toast.successShowToast('Invite code copied successfully.') }}>
                            <Image source={Images.COPY} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={moveToJoinContest} style={styles.btnJoin(responsive)}>
                    <Text style={styles.txtBtnJoin(responsive)}>Join This Contest</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <>
        <MainBackground isAnimatedScreen={isAnimatedScreen} isAnimated={true} isSkip={true} rightAction={()=>navigation.navigate('HomeScreen')} loadAnimation={loadAnimation}>
            <ListView
                key={"PrivateContest"}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                enableEmptySections={true}
                // scrollEnabled={!isVisibleUser}
                style={styles.wrapper}
                dataSource={ds.cloneWithRows([])}
                renderHeader={renderHeader}
                removeClippedSubviews={!(Platform.OS == "ios")}
            />
            <View pointerEvents='none' style={styles.bottomView(responsive)}>
                <Image source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} style={styles.left_pos(responsive)} />
                <Image source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} style={styles.right_pos(responsive)} />
            </View>
            <ConfirmationJoin userProfile={userProfile} userBalance={userBalance} contestItem={contestItem} openAlert={isVisible} actionBtn={() => moveToRoasterScreen()} onDismiss={() => setVisible(false)} />
      
        </MainBackground>
            {
                apiCalling && 
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.4)'}}>
                            <ActivityIndicator size={'large'} color={Core.primaryColor} />
                    </View>
            }
        </>
    )
}
export default PrivateContest
