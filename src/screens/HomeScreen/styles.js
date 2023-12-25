import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        marginTop: 20,
        flexDirection: 'row',

    },
    timeStyle: {
        flexDirection: 'row'
    },

    text: {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 5
    },
    follow: {
        top:2,
        color: '#23956a',
        fontSize: 16,
        marginHorizontal: 16,
        fontFamily: 'Roboto-Medium'
    },
    headerStyle: {
        height: 70,
    },
    inputStyle: {
        fontSize: 14,
        paddingRight: 8,
        flex: 0.8
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#f5f5f5',
        borderRadius: 25,
        backgroundColor: "#f5f5f5",
        flex: 0.80,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        flexDirection: 'row',
        marginHorizontal: 8
    },
    innerContainer: {
        flexDirection: 'row',

    },
    dotStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    company: {
        fontSize: 17,
        marginTop: 10,
        marginHorizontal: "23%",
        bottom: "100%"
    },
    companyStyle: {
        fontSize: 16,
        marginHorizontal: 60,
        bottom: 12,
        flexWrap: 'wrap',
        fontFamily: 'Roboto-Light',
        color: '#7a7a7a'
    },
    addressStyle: {
        fontSize: 16,
        flexWrap: 'wrap',
        bottom: 12,
        marginHorizontal: "17%",
        fontFamily: 'Roboto-Light',
        color: '#7a7a7a'
    },
    descriptionStyle: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        marginHorizontal: 18,
        bottom: 12
    },
    address: {
        fontSize: 16,
        color: 'grey',

        marginHorizontal: "4%",

    },
    date: {
        fontSize: 17,
        marginTop: 20,
        bottom: "85%"
    },
    time: {
        fontSize: 17,
        marginTop: 20,

        bottom: "90%"
    },
    subContainer: {
        flexDirection: 'row',
        marginHorizontal: "48%",

    },
    personStyle: {
        paddingTop: 12,
        flex: 1
    },

    icon: {
        height: 25,
        width: 25,
        marginHorizontal: 10
    },
    messageIcon: {
        height: 20,
        width: 20,
        tintColor: 'black'
    },
    notifIcon: {
        marginHorizontal: '26%',
        tintColor: 'black'
    },
    imageContainer: {
        width: 300,
        height: 150,
        backgroundColor: 'lightgrey'
    },

    subImageContainer: {
        resizeMode: 'cover',
        marginHorizontal: 10,
        marginTop: 10
    },
    subImageStyle: {
        height: "94%",
        width: 300

    },
    personInfo: {
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,

    },
    commentContainer: {
       
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1, borderColor: '#f5f5f5', borderRadius: 10, backgroundColor: "#f5f5f5"

    },
    profileStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 30,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        bottom: 15
    },
    textImage: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: '#010101',
       

    },
})
export default styles