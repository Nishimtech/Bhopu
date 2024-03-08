import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { Core, GradientView,Images,useResponsiveSizes } from '../../Home';
import styles from './styles';

const EmptyScreen = ({title='',subTitle='',btnTitle='',btnAction,apiCalling=false}) => {
  const responsive = useResponsiveSizes();
  return (
    <View style={styles.main_container(responsive)}> 
          <Image style={styles.logoSize(responsive)} source={Images.LOGO} defaultSource={Images.LOGO} />
          {
            title != '' &&
            <Text style={styles.txtTitle(responsive)}>{title}</Text>
          }
          {
            btnTitle != '' &&
              <TouchableOpacity pointerEvents={apiCalling?'none':'auto'} onPress={apiCalling?null:btnAction} styles={styles.actionBtn(responsive,apiCalling)}>
                  <GradientView styles={styles.viewBtn(responsive,apiCalling)}>
                        {
                          apiCalling ?
                              <ActivityIndicator color={Core.input_view_bg}/>
                          :
                          <Text style={styles.txtBtn(responsive)}>{btnTitle}</Text>
                        }   
                  </GradientView>
              </TouchableOpacity>
          }
     </View>

  )
};
export default EmptyScreen;
