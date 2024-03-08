import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    logoSize:(isContentLoading,responsive) =>({
        marginTop: responsive.size((Platform.OS=='android' && isContentLoading)?5:0),
        width:responsive.size(isContentLoading?160:272),
        height: responsive.size(isContentLoading ? (Platform.OS == 'ios' ? 47 : 48):81),
    })
})
export default styles
