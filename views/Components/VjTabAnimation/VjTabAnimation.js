import React, { useEffect, useState } from 'react';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import { View, Image, Animated, Easing, TouchableOpacity } from 'react-native';
import { Core, Images } from '../../../Helper';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const VjTabAnimation = ({ tabIdx, onChangeIndex, navigation, leagueData }) => {
    const [isAnimatedScreen, setAnimatedScreen] = useState(true)
    const [initial, setInitial] = useState(true)
    const responsive = useResponsiveSizes();
    const [bottomAnim] = useState(new Animated.Value(responsive.size(-90)))
    const [centerAnim] = useState(new Animated.Value(responsive.size(90)))
    const [opacityAnim] = useState(new Animated.Value(0))

    useEffect(() => {
        if (tabIdx > 0) {
            setAnimatedScreen(true)
            Animated.parallel([
                Animated.timing(bottomAnim, { toValue: 0, duration: 500, easing: Easing.linear }),
                Animated.timing(centerAnim, { toValue: responsive.size(-15), duration: 800, easing: Easing.cubic }),
                Animated.timing(opacityAnim, { toValue: 1, duration: initial ? 800 : 300, easing: Easing.cubic }),
            ]).start(()=>{
                setAnimatedScreen(false)
                setTimeout(() => {
                    setInitial(false)
                }, 100);
            });
        }
    }, [tabIdx])
    setResetAnimation = (idx) => {
        if (idx != tabIdx) {
            Animated.parallel([
                Animated.timing(opacityAnim, { toValue: 0, duration: 100, easing: Easing.cubic }),
            ]).start(() => { onChangeIndex(idx) });
        }
    }
    const renderTab = (val, title, img) => {
        const enableColor = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [Core.white, Core.primaryColor] });
        const disableColor = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [Core.white, Core.white] });
        const enableBulb = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [0, responsive.size(72)] });
        const disableBulb = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });
        const enableSwitch = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [0, responsive.size(2)] });
        const disableSwitch = opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });
        return (
            <TouchableOpacity key={val} onPress={() => setResetAnimation(val)} style={styles.touchView}>
                <Animated.Image style={styles.tabImg(responsive, val, tabIdx, enableColor, disableColor)} source={img} defaultSource={img} />
                <Animated.Text style={styles.txtTabTitle(responsive, val, tabIdx, enableColor, disableColor)}>{title}</Animated.Text>
                <Animated.View pointerEvents={'none'} style={styles.animatedTabView(responsive)}>
                    <Animated.View style={styles.viewLine(responsive, val, tabIdx, enableSwitch, disableSwitch)} />
                    <Animated.Image style={styles.imgCrcl(responsive, val, tabIdx, enableBulb, disableBulb)} source={Images.LIGHTCRCL} defaultSource={Images.LIGHTCRCL} />
                </Animated.View>
            </TouchableOpacity>
        )
    }
    return (
        <Animated.View pointerEvents={isAnimatedScreen ? "none" : "auto"} style={styles.bottomContainer(responsive, bottomAnim)}>
            <LinearGradient locations={[0, 1]} useAngle={true} angle={180} colors={[Core.golden_yellow, Core.golden_yellow]} style={styles.mainContainer(responsive)}>
                <LinearGradient locations={[0, 1]} useAngle={true} angle={180} colors={[Core.tuna_color, Core.bright_gray]} style={styles.innerContainer(responsive)}>
                    <View style={styles.viewTabContainer(responsive)}>
                        {renderTab(1, 'Lobby', Images.ROW_VERTICAL)}
                        {renderTab(2, 'My Contests', Images.CUP)}
                    </View>
                    <View style={styles.viewTabContainer(responsive)}>
                        {renderTab(3, 'Bulletin', Images.DOCUMENT_TEXT)}
                        {renderTab(4, 'My Stats', Images.RANKING)}
                    </View>
                </LinearGradient>
            </LinearGradient>
            <Animated.View style={styles.mainCenterView(responsive, centerAnim)}>
                <TouchableOpacity onPress={() => navigation.navigate('LandingScreen', { previousTypeID: leagueData?.type_id || '' })} style={styles.touchCenterView(responsive)}>
                    <LinearGradient locations={[0, 1]} useAngle={true} angle={180} colors={[Core.primaryColor, Core.gold_tips]} style={styles.gradientCenterView(responsive)}>
                        <Image style={styles.imgHome(responsive)} source={Images.IC_SPORTS_HUB} defaultSource={Images.IC_SPORTS_HUB} />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )

};
export default VjTabAnimation;
