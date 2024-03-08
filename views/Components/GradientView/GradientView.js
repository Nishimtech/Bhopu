import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const GradientView = ({ styles,children,colors=['#FAD60C', '#D8BA13'] }) => {
  return (
    <LinearGradient locations={[0,1]} colors={colors} useAngle={true} angle={180} style={styles}>
      {children}
    </LinearGradient>

  )
};
export default GradientView;
