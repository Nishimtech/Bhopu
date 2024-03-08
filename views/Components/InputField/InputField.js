import React, {Fragment, useState } from "react";
import { View,Keyboard, StyleSheet, Text,TextInput, Image, TouchableOpacity } from "react-native";
import {Core, Fonts, Images} from "../../../Helper";
import PropTypes from "prop-types";
import { useResponsiveSizes } from "react-native-responsive-sizes";
import styles from './styles';


const InputField = ({clickOnAction,createContest=false,info_icon=false,drop_down=false,isTransparent=false,img_name,editable,value,label,numberOfLines,maxLength,label_name,onChangeText,textContentType,type,returnKeyType,keyboardType,vailidationMsg}) => {
    const responsive = useResponsiveSizes();
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    return (
        <Fragment>
            {
                img_name &&
                    <View style={styles.labelViewContainer(responsive)}>
                        <Image style={styles.imgContainer(responsive)} source={img_name} defaultSource={img_name} />
                        <Text style={styles.txtLabel(responsive)}>{label}</Text>
                    </View>
            }
            <View style={styles.inputContainer(createContest,responsive,isTransparent)}  {...(editable && { pointerEvents: 'box-none' })}>
                <View style={[StyleSheet.absoluteFill,styles.viewInput(responsive)]}>
                    <TextInput
                       numberOfLines={numberOfLines}
                        style={[styles.labelInput,{fontSize:responsive.size(Fonts.lg)}]}
                        placeholder={label_name}
                        placeholderTextColor={Core.light_gray}
                        blurOnSubmit={false}
                        selectionColor={Core.primaryColor}
                        onChangeText={(text) => onChangeText(text, type)}
                        value={value}
                        textContentType={textContentType}
                        returnKeyType={returnKeyType}
                        keyboardType={keyboardType}
                        editable={editable}
                        onSubmitEditing={(event) => (Keyboard.dismiss())}
                        {...(type.includes('password') && { secureTextEntry: secureTextEntry })}
                        {...(maxLength > 0 && { maxLength: maxLength })}
                    /> 
                </View>
                {
                    type.includes('password') ?
                    <TouchableOpacity onPress={()=>setSecureTextEntry(!secureTextEntry)} style={styles.viewRight(responsive)}>
                            <Image style={styles.imgRight(responsive,secureTextEntry)} source={Images.IC_EYE} defaultSource={Images.IC_EYE}/>
                    </TouchableOpacity>
                    :type.includes('search') ?
                    <View pointerEvents="none" style={styles.viewRight(responsive)}>
                            <Image style={styles.imgRight(responsive,false)} source={Images.SEARCH} defaultSource={Images.SEARCH}/>
                    </View>
                    :info_icon?
                    <View pointerEvents="none" style={styles.viewRight(responsive)}>
                            <Image style={styles.imgRightContest(responsive)} source={Images.INFOCIRCLE} defaultSource={Images.INFOCIRCLE}/>
                    </View>
                    :drop_down &&
                    <View pointerEvents="none" style={styles.viewRight(responsive)}>
                            <Image style={styles.imgRightContest(responsive)} source={Images.DROPDOWN} defaultSource={Images.DROPDOWN}/>
                    </View>
                }
                {
                    clickOnAction &&
                        <TouchableOpacity onPress={clickOnAction} style={{position:'absolute',width:'100%',height:'100%'}}/>
                }
            </View>
            {
                vailidationMsg &&
                <Text style={styles.txtBottomValidation(responsive)}>{vailidationMsg}</Text>
            }
        </Fragment>
    );

}
InputField.propTypes = {
    editable: PropTypes.bool,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    numberOfLines: PropTypes.number,
  };
  InputField.defaultProps = {
   
    editable: true,
    returnKeyType: "next",
    keyboardType: "default",
    maxLength: 0,
    numberOfLines: 1
  };
  
export default InputField;
