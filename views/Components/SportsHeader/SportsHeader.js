import React, { useEffect } from 'react';
import { View,Text,TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import styles from './styles';

const SportsHeader = ({ arrOfSports,onChangeItem,selected_sports,stylesBackground }) => {
    const responsive = useResponsiveSizes();
   
    return (
        <Animated.View style={styles.mainContainer(responsive,stylesBackground)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer(responsive)}>
                {
                    arrOfSports.map((item, idx) => {
                        let isExistSportsID = selected_sports && selected_sports.sports_id == item.sports_id;
                        return (
                            <TouchableOpacity onPress={() => onChangeItem(item)} key={item.sports_id} style={styles.touchSports(responsive,arrOfSports)}>
                                <Text style={styles.txtSportsName(responsive,isExistSportsID)}>{item.sports_name}</Text>
                                <View style={styles.viewSports(responsive,idx,isExistSportsID,arrOfSports)} />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )

};
export default SportsHeader;
