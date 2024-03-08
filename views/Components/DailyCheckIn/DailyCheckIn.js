import React, { useEffect, useState } from 'react';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import styles from './styles'
import { ActivityIndicator, Animated, BackHandler, Easing, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { API, Constant, Core, Images, Utils } from '../../../Helper';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import BoxBackground from '../BoxBackground';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

const DailyCheckIn = ({ onDismiss, dismissOnTouchOutside, navigation, setEnable, enable }) => {
    const responsive = useResponsiveSizes();
    const [activeSlide, setActiveSlide] = useState(0)
    const [daily_benifts, setDaily_benifts] = useState(undefined)
    const [is_claim_api, setClaim] = useState(false)
    const [success, setSuccess] = useState(false)
    const [topAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))

    useEffect(() => {
        GET_DAILY_STREAK_COINS()
    }, [])

    const handleBackButton = () => {
        return enable;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        }
    }, [enable])

    const GET_DAILY_STREAK_COINS = () => {
        API.GET_DAILY_STREAK_COINS().then(async (result) => {
            const objectData = result.data;
            if (result.status == Constant.SUCCESS_STATUS) {
                if (objectData.data.allow_claim == 1) {
                    await setDaily_benifts(objectData.data)
                    setEnable(true)
                    setTimeout(() => {
                        const currentIdx = get_index_current_day()
                        if (this._carousel) {
                            this._carousel.snapToItem(currentIdx, true);
                        }
                    }, 100);
                }
            }
        }).catch((error) => {
            setTimeout(() => {
                Utils.handleCatchError(error, navigation)
            }, 50);
            return error;
        });
    }
    const returnCoinValue = () => {
        let coinValue = 0;
        if (daily_benifts && daily_benifts.daily_streak_coins && daily_benifts.daily_streak_coins.length > 0) {
            const currentIdx = get_index_current_day();
            coinValue = daily_benifts.daily_streak_coins[0].coins
            if (daily_benifts.allow_claim == 1) {
                coinValue = daily_benifts.daily_streak_coins[currentIdx].coins
            } else if (currentIdx < daily_benifts.daily_streak_coins.length - 1) {
                coinValue = daily_benifts.daily_streak_coins[currentIdx + 1].coins
            }
        }
        return "+" + coinValue
    }

    const get_index_current_day = () => {
        let initialIndex = 0;
        for (let index = 0; index < daily_benifts?.daily_streak_coins.length; index++) {
            let dictCoin = daily_benifts?.daily_streak_coins[index];
            if (dictCoin.day_number == daily_benifts?.current_day) {
                initialIndex = index;
                break;
            }
        }
        return initialIndex;
    }
    const CLAIM_COINS = async () => {
        await setClaim(true)
        API.CLAIM_COINS().then(async (result) => {
            if (result.status == Constant.SUCCESS_STATUS) {
                await setSuccess(true);
                Animated.timing(topAnim, { toValue: 0, duration: 600, easing: Easing.linear }).start(() => {
                    setTimeout(async () => {
                        Animated.timing(topAnim, { toValue: Constant.FULL_HEIGHT, duration: 1000, easing: Easing.linear }).start(() => { setClaim(false); setEnable(false) })
                    }, 2000);
                })
            }
        }).catch((error) => {
            setTimeout(() => {
                setClaim(false)
                Utils.handleCatchError(error, navigation)
            }, 50);
            return error;
        });
    }



    const onSnapToItem = async (index) => {
        if (activeSlide != index) {
            Utils.enableAnimation(300, 2)
            await setActiveSlide(index)
            if (this._carousel) {
                this._carousel.snapToItem(index, true);
            }
        }
    }
    const isPrimaryColor = (item) => {
        return (daily_benifts.allow_claim == 1 && item.day_number == daily_benifts.current_day)
    }
    const _renderItem = ({ item, index }) => {
        const isPrimary = isPrimaryColor(item);
        const currentIdx = get_index_current_day()
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => onSnapToItem(index)} style={styles.actionItemView(responsive, activeSlide, index)}>
                <View style={styles.itemView(responsive, activeSlide, index)}>
                    <LinearGradient locations={[0, 1]} colors={isPrimary ? [Core.primaryColor, Core.gold_tips] : [Core.input_view_bg, Core.input_view_bg]} useAngle={true} angle={180} style={styles.itemGradientView(responsive)}>
                        <Text style={styles.txtDay(responsive, isPrimary)}>{Utils._i18n("Day")} {item.day_number}</Text>
                        <View style={styles.viewItemCoin(responsive)}>
                            <Image style={styles.imgItemCoin(responsive)} source={Images.IC_COIN} defaultSource={Images.IC_COIN} resizeMode={'contain'} />
                        </View>
                        <Text style={styles.txtAmtCoin(responsive)}>{item.coins}</Text>
                        <Text style={styles.txtItemCoin(responsive, isPrimary)}>{Utils._i18n("Coins")}</Text>
                        {
                            (index < currentIdx || (daily_benifts.allow_claim == 0 && item.day_number == daily_benifts.current_day)) &&
                            <Image style={styles.imgItemCorrect(responsive)} source={Images.IC_CORRECT} defaultSource={Images.IC_CORRECT} />
                        }
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <PopupDialog visible={enable} dismissOnTouchOutside={dismissOnTouchOutside} dialogAnimation={slideAnimation} onDismissed={() => onDismiss()} dialogStyle={styles.main_container} width={'100%'} height={'auto'} ref={(popupDialog1) => { this.popupDialog1 = popupDialog1; }} overlayOpacity={0.8}>
            <View style={styles.inside_main_container(responsive)}>
                <BoxBackground marginTop={responsive.size(90)}>
                    <Text style={styles.txt_title(responsive)}>{Utils._i18n("Daily Check-in")}</Text>
                    <View style={styles.subView}>
                        <Text style={styles.txtSubView(responsive)}>{daily_benifts?.allow_claim == 0 ? Utils._i18n("Check tommorow to get") : Utils._i18n("Check in to get")}</Text>
                        <View style={styles.viewCoinHeader(responsive)}>
                            <Image style={styles.imgCoinHeader(responsive)} source={Images.IC_COIN} defaultSource={Images.IC_COIN} resizeMode={'contain'} />
                            <Text style={styles.txtCoinValue(responsive)}>{returnCoinValue().replace('+', '')}</Text>
                        </View>
                    </View>
                    <View style={styles.carasoulView(responsive)}>
                        <Carousel
                            activeSlideAlignment={'center'}
                            ref={(c) => { this._carousel = c }}
                            data={daily_benifts?.daily_streak_coins || []}
                            renderItem={_renderItem}
                            sliderWidth={Constant.FULL_WIDTH}
                            itemWidth={responsive.size(179)}
                            inactiveSlideOpacity={0.7}
                            onSnapToItem={(index) => onSnapToItem(index)}
                            removeClippedSubviews={!(Platform.OS == "ios")}
                        />
                    </View>
                    <TouchableOpacity disabled={is_claim_api || (daily_benifts?.allow_claim == 0)} onPress={() => CLAIM_COINS()} style={styles.actionCarasoulView(responsive, is_claim_api)}>
                        <LinearGradient locations={[0, 1]} colors={daily_benifts && daily_benifts.allow_claim == 1 && !success ? [Core.primaryColor, Core.gold_tips] : [Core.border_color, Core.border_color]} useAngle={true} angle={180} style={styles.gradientView(responsive, is_claim_api)}>
                            {
                                is_claim_api ?
                                    <ActivityIndicator color={'black'} />
                                    :
                                    <Text style={styles.txtBtnView(responsive)}>{String((daily_benifts && daily_benifts.allow_claim == 0) ? Utils._i18n("Already Claimed") : success ? 'Claimed' : Utils._i18n('Claim')).toUpperCase()}</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.txtDescriptionView(responsive)}>{Utils._i18n("Claim bonus")}</Text>
                    <Animated.View pointerEvents={'none'} style={{ position: 'absolute', top: topAnim, width: '100%', height: '100%' }}>
                        {success && <FastImage style={{ flex: 1 }} source={{ uri: 'https://media.giphy.com/media/WNJATm9pwnjpjI1i0g/giphy.gif', priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly, testID: "giphy1.gif" }} />}
                    </Animated.View>
                </BoxBackground>
            </View>
        </PopupDialog>
    )


}
export default DailyCheckIn
