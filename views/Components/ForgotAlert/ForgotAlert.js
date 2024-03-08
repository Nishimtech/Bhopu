import React, { useEffect } from 'react';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import styles from './styles'
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { Core, Fonts, Images, Utils } from '../../../Helper';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import BoxBackground from '../BoxBackground';
import LinearGradient from 'react-native-linear-gradient';
import GradientView from '../GradientView';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

const ForgotAlert = ({ openAlert,autoAdjust=false,headertitle='',title=Utils._i18n('Reset password'),desc='',imgName=Images.SMS, onDismiss, dismissOnTouchOutside,btnTitle=Utils._i18n("Ok"),btnTitle1="",onDismiss1}) => {
    const responsive = useResponsiveSizes();
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
            <View style={styles.inside_main_container(responsive)}>
                <BoxBackground>
                   {
                     headertitle != '' &&
                         <Text style={styles.txtHeaderTitle(responsive)}>{headertitle}</Text>
                   }
                    {
                        imgName != '' &&
                            <View style={styles.viewCircle(responsive)}>
                                <Image style={autoAdjust?(imgName == Images.VECTOR?styles.imgIcon1(responsive):{}):styles.imgIcon(responsive)} source={imgName} defaultSource={imgName} />
                            </View>
                    }
                    <Text style={styles.txtTitle(responsive)}>{title}</Text>
                    {
                        desc != '' &&
                            <Text style={{width:'94%',fontSize:responsive.size(14),fontFamily:Fonts.regular,color:Core.white,textAlign:'center'}}>{desc}</Text>
                    }
                    {
                        (btnTitle1 != '') ?
                            <View style={{marginTop:responsive.size(41),flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',width:'100%',height:responsive.size(48)}}>
                                 <TouchableOpacity onPress={() => onDismiss()} style={{borderRadius:responsive.size(14),width:'44%',height:'100%',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#D8BA13'}}>
                                     <Text style={{ color:'#FAD60C',textAlign:'center',fontSize:responsive.size(Fonts.xxl),lineHeight:responsive.size(27),fontFamily:Fonts.semibold,}}>{btnTitle}</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity disabled={!onDismiss1} style={{borderRadius:responsive.size(14),width:'44%',height:'100%',overflow:'hidden'}} onPress={() => onDismiss1()}>
                                    <GradientView styles={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{ color:'#000',textAlign:'center',fontSize:responsive.size(Fonts.xxl),lineHeight:responsive.size(27),fontFamily:Fonts.semibold,}}>{btnTitle1}</Text>
                                    </GradientView> 
                                </TouchableOpacity>
                            </View>
                        :btnTitle != '' &&
                        <TouchableOpacity onPress={() => onDismiss()} style={styles.wrapper}>
                            <LinearGradient
                                locations={[0, 1]}
                                colors={[Core.primaryColor, Core.gold_tips]}
                                useAngle={true}
                                angle={180}
                                style={styles.btnLogin(responsive)}>
                                <Text style={styles.buttonText(responsive)}>{btnTitle}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                </BoxBackground>
            </View>
        </PopupDialog>
    )


}
export default ForgotAlert
