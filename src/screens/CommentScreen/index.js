// CommentsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ImageBackground, KeyboardAvoidingView, FlatList, Dimensions, ScrollView, Button, TextInput, TouchableOpacity, Share } from "react-native";
import personInfo from '../../data/personInfo';
import styles from '../HomeScreen/styles';
import image from '../../config/Image';

const CommentScreen = ({ route }) => {

    const { item } = route.params;
    const [commentingPostId, setCommentingPostId] = useState(null);
    const [personDetails, setPersonDetails] = useState(personInfo);
    const [commentText, setCommentText] = useState('');



    const handlePress = (postId, text, item) => {
        handleCommentSubmit(postId, text);

        if (item?.comments && item.comments.length === 0) {

            navigation.navigate('HomeScreen');
        } else if (item?.comments && item.comments.length > 1) {
            showCommentsScreen(item);
            // navigation.navigate('CommentScreen', { item });
        }
    };


    const handleCommentSubmit = (postId, commentText) => {
        const currentDate = new Date();
        const formattedDate = getFormattedDate(currentDate);
        const formattedTime = getFormattedTime(currentDate);
        const updatedPersonDetails = personDetails.map((item) =>
            item.id === postId
                ? {
                    ...item,
                    Comments: item.Comments + 1,
                    comments: [
                        ...(item.comments || []),
                        {
                            text: commentText,
                            timestamp: formattedDate + ' ' + formattedTime,
                            liked: false,
                            Likes: 0,
                            replies: [
                                {
                                    text: "Reply to the comment",
                                    timestamp: "10 Dec, 11:00 AM",
                                },

                            ],
                        },
                    ],
                }
                : item
        );


        setPersonDetails(updatedPersonDetails);
        setCommentText('');
        setCommentingPostId(null);
        // saveComments(updatedPersonDetails);
    };
    const handleLikeComment = (postId, commentIndex) => {
        setPersonDetails((prevDetails) =>
            prevDetails.map((item) =>
                item.id === postId
                    ? {
                        ...item,
                        comments: item.comments.map((comment, index) =>
                            index === commentIndex
                                ? {
                                    ...comment,
                                    liked: !comment.liked,
                                    Likes: comment.liked ? comment.Likes - 1 : comment.Likes + 1,
                                }
                                : comment
                        ),
                    }
                    : item
            )
        );
    };
    const getFormattedDate = (date) => {
        const day = date.getDate();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const monthIndex = date.getMonth();
        const month = monthNames[monthIndex];

        return day + ' ' + month;
    };

    const getFormattedTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#50C878', height:70, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Comments</Text>
            </View>
            {/* <View style={styles.personStyle}>
           
                <View>


                    {item.comments && item.comments.length > 0 && (
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={item.image} style={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                marginHorizontal: "4%",
                                bottom: 15
                            }} />

                            <View style={{ marginBottom: 10 }}>
                                {item.comments.map((comment, index) => (
                                    <View style={{ flex: 1 }}>
                                        
                                        <View key={index} style={{flex: 1, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, backgroundColor: "#F0F0F0", marginVertical: 8}}>
                                            <View style={{ flex: 0.25, flexDirection: 'row', marginHorizontal:10 ,}}>
                                                <Text style={{ flex: 0.5, fontFamily: 'Roboto-Bold', fontSize: 18, color: '#010101'}}>{item.name}</Text>
                                                <Text style={{ flex: 0.5, color: '#449779', fontSize: 16, fontFamily: 'Roboto-Medium', paddingRight: "35%" }}>{item.follow}</Text>
                                            </View>

                                            <Text style={{ flex: 0.25, justifyContent: 'flex-start', fontSize: 15, fontFamily: 'Roboto-Light', color: '#7a7a7a', paddingHorizontal: 7 }}>{item.company}</Text>
                                            <Text style={{ flex: 0.25, justifyContent: 'flex-start', fontSize: 15, fontFamily: 'Roboto-Light', color: '#7a7a7a', paddingTop: 1, paddingHorizontal: 7 }}>{item.address}</Text>
                                            <Text style={{ flex: 0.25, justifyContent: 'flex-start', fontFamily: 'Roboto-Regular', fontSize: 15, paddingTop: 2, color: '#1d1d1d', paddingHorizontal: 7 }}>{comment.text}</Text>
                                        </View>
                             

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                <Text style={{ fontSize: 15, bottom: 10, alignItems: 'center' }}>{comment.timestamp}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => handleLikeComment(item.id, index)}>
                                                    <Image source={comment.liked ? image.green_heart : image.heart} style={{ height: 15, width: 15, marginHorizontal: 4 }} />

                                                    <Text style={{ bottom: 18, marginHorizontal: 22 }}>{comment.Likes} Like</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>


                                ))}
                            </View>
                        </View>
                    )}

                </View> */}

            
                <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center', justifyContent:'flex-end' }}>
                <KeyboardAvoidingView
                style={{ flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                backgroundColor: 'white',
            
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0}}
                
            >
                    <View style={{ flex: 0.13 }}>

                        <Image source={item.image} style={{
                            height: 40,
                            width: 40,
                            borderRadius: 25,
                            marginHorizontal: "4%",
                        }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Write a comment..."
                            style={styles.inputStyle}
                            value={commentingPostId === item.id ? commentText : ""}
                            multiline={true}
                            placeholderTextColor={"#b3b3b3"}
                            onChangeText={(text) => setCommentText(text)}
                            onFocus={() => setCommentingPostId(item.id)}
                        />
                        <TouchableOpacity style={{
                            flex: 0.12,
                            alignItems: 'center', justifyContent: 'center'
                        }}
                            onPress={() => handlePress(item.id, commentText)}>
                            {/* onPress={() => handleCommentSubmit(item.id, commentText)}> */}
                            <Image source={image.send} />
                        </TouchableOpacity>

                    </View>
            </KeyboardAvoidingView>
        </View>
               
            {/* </View> */ }
            </SafeAreaView >

        )
    
  
};

export default CommentScreen;
