import React, { Fragment, useEffect } from 'react';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import styles from './styles'
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { Fonts, Images } from '../../../Helper';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import BoxBackground from '../BoxBackground';
import GradientView from '../GradientView';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

const ConfirmationJoin = ({ openAlert,userProfile, onDismiss, userBalance, contestItem, actionBtn, dismissOnTouchOutside }) => {
    const responsive = useResponsiveSizes();
    const affordableAmt=()=>{
        if(contestItem){
            let walletBal = contestItem.currency_type == 1?parseFloat((parseFloat((parseFloat(userBalance?.user_balance?.real_amount) || 0)+(parseFloat(userBalance?.user_balance?.winning_amount) || 0)).toFixed(2))):contestItem.currency_type == 2?parseFloat(userBalance.user_balance.point_balance):parseFloat(userBalance.user_balance.bonus_amount);
            let entryAmt =  parseFloat(contestItem.entry_fee);
            return walletBal >= entryAmt
        }else{
            return false
        }
    }
    const handleBackButton = () => {
        return openAlert;
     }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        }
    }, [openAlert])
    return (
        <PopupDialog visible={openAlert} dismissOnTouchOutside={dismissOnTouchOutside} dialogAnimation={slideAnimation} onDismissed={() => onDismiss()} dialogStyle={styles.main_container} width={'100%'} height={'auto'} ref={(popupDialog1) => { this.popupDialog1 = popupDialog1; }} overlayOpacity={0.8}>
            <View style={styles.inside_main_container(responsive, responsive.size(affordableAmt()?460:380))}>
                <BoxBackground>
                    <Text style={styles.txtHeaderTitle(responsive)}>{affordableAmt()?'Confirmation':'Insufficient Funds'}</Text>
                    {
                        contestItem &&
                            <>
                                <View style={{ marginVertical: responsive.size(40), width: '80%', height: responsive.size(171) }}>
                                    {
                                        affordableAmt() &&
                                            <Fragment>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={Images.USER_NAME} defaultSource={Images.USER_NAME} />
                                                    <Text style={{ marginLeft: responsive.size(4), color: '#FFF', textAlign: 'center', fontSize: responsive.size(Fonts.md), fontFamily: Fonts.medium, }}>{'User Name'}</Text>
                                                </View>
                                                <View style={{ marginTop: responsive.size(6), justifyContent: 'center', paddingHorizontal: responsive.size(15), width: '100%', height: responsive.size(49), backgroundColor: '#292D32', borderRadius: responsive.size(10) }}>
                                                    <Text style={{ color: '#FFF', textAlign: 'left', fontSize: responsive.size(14), fontFamily: Fonts.medium, }}>{userProfile.user_name}</Text>
                                                </View>
                                            </Fragment>
                                    }
                                    <View style={{ marginTop: responsive.size(21), width: '100%', height: responsive.size(101), borderRadius: responsive.size(10), borderColor: '#292D32', borderWidth: 1, borderStyle: 'dashed', overflow: 'hidden' }}>
                                        <View style={{ width: '100%', height: responsive.size(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsive.size(15) }}>
                                            <Text style={{ color: '#FFF', textAlign: 'left', fontSize: responsive.size(Fonts.lg), fontFamily: Fonts.medium, }}>{'Wallet Balance'}</Text>
                                            {
                                                (contestItem.currency_type == 1) ?
                                                    <Text style={{ color: '#FAD60C', textAlign: 'right', fontSize: responsive.size(18), fontFamily: Fonts.medium }}>${parseFloat((parseFloat((parseFloat(userBalance?.user_balance?.real_amount) || 0)+(parseFloat(userBalance?.user_balance?.winning_amount) || 0)).toFixed(2)))}</Text>
                                                    :
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image style={{ width: responsive.size(14), height: responsive.size(14), marginRight: responsive.size(3) }} source={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                        <Text style={{ color: '#FAD60C', textAlign: 'right', fontSize: responsive.size(18), fontFamily: Fonts.medium }}>{`${contestItem.currency_type == 2 ? userBalance.user_balance.point_balance : userBalance.user_balance.bonus_amount}`}</Text>
                                                    </View>
                                            }
                                        </View>
                                        <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#292D32', borderStyle: 'dashed' }} />
                                        <View style={{ width: '100%', height: responsive.size(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsive.size(15) }}>
                                            <Text style={{ color: '#FFF', textAlign: 'left', fontSize: responsive.size(Fonts.lg), fontFamily: Fonts.medium, }}>{'Entry Amount'}</Text>
                                            {
                                                (contestItem.currency_type == 1) ?
                                                    <Text style={{ color: '#FAD60C', textAlign: 'right', fontSize: responsive.size(18), fontFamily: Fonts.medium }}>${contestItem.entry_fee}</Text>
                                                    :
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image style={{ width: responsive.size(14), height: responsive.size(14), marginRight: responsive.size(3) }} source={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} defaultSource={contestItem.currency_type == 2 ? Images.IC_SMALL_COIN : Images.IC_BONUS} />
                                                        <Text style={{ color: affordableAmt()?'#FAD60C':'#FA0C45', textAlign: 'right', fontSize: responsive.size(18), fontFamily: Fonts.medium }}>{`${contestItem.entry_fee}`}</Text>
                                                    </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: responsive.size(affordableAmt()?25:-50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: responsive.size(48) }}>
                                    <TouchableOpacity style={{ borderRadius: responsive.size(14), width: affordableAmt()?'70%':'92%', height: '100%', overflow: 'hidden' }} onPress={() => affordableAmt()?actionBtn():null}>
                                        <GradientView styles={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#000', textAlign: 'center', fontSize: responsive.size(Fonts.xxl), lineHeight: responsive.size(27), fontFamily: Fonts.semibold, }}>{affordableAmt()?'Join Contest':'Add Funds and Join Contest'}</Text>
                                        </GradientView>
                                    </TouchableOpacity>
                                </View>
                            </>
                    }
                    <TouchableOpacity style={{ position: 'absolute', top: responsive.size(-50), right: responsive.size(20) }} onPress={onDismiss}>
                        <Image source={Images.X} defaultSource={Images.X} />
                    </TouchableOpacity>
                </BoxBackground>
            </View>
        </PopupDialog>
    )


}
export default ConfirmationJoin
