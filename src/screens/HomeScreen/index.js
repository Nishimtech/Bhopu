import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ImageBackground, FlatList, Dimensions, ScrollView, Button, TextInput, TouchableOpacity, Share } from "react-native";
import CarouselData from "../../components/CarouselData";
import carouselDetails from '../../data/carouselDetails';
import personInfo from '../../data/personInfo';
import image from '../../config/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";


const HomeScreen = () => {
    const [likes, setLikes] = useState({});
    const [personDetails, setPersonDetails] = useState(personInfo);
    const [commentText, setCommentText] = useState('');
    const [commentingPostId, setCommentingPostId] = useState(null);
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();
    const [isReplying, setIsReplying] = useState(false); // State to manage reply input display
    const [replyText, setReplyText] = useState(''); // State to capture reply text


    const showCommentsScreen = (item) => {

        navigation.navigate('CommentScreen', { item });
    }

    const carouselData = ({ item }) => {
        return (

            <View style={styles.imageContainer}>
                <View style={styles.subImageContainer}>
                    <Image source={item.image} style={styles.subImageStyle} />


                </View>
            </View>

        );
    }

    // useEffect(() => {
    //     retrieveComments();
    //   }, []);


    //   const retrieveComments = async () => {
    //     try {
    //       const storedComments = await AsyncStorage.getItem("comments");
    //       if (storedComments !== null) {
    //         setPersonDetails(JSON.parse(storedComments));
    //       }
    //     } catch (error) {
    //       console.error("Error retrieving comments:", error);
    //     }
    //   };

    //   const saveComments = async (updatedDetails) => {
    //     try {
    //       await AsyncStorage.setItem("comments", JSON.stringify(updatedDetails));
    //     } catch (error) {
    //       console.error("Error saving comments:", error);
    //     }
    //   };
    const ItemSeparator = () => {
        return (
            <View style={{ flex: 1, height: 15, backgroundColor: '#F0F0F0' }}></View>
        )
    };



    const handlePress = (postId, text, item) => {
        handleCommentSubmit(postId, text);
      

        if (item?.comments && item.comments.length === 0) {

            navigation.navigate('HomeScreen');
        } else if (item?.comments && item.comments.length > 1) {
            showCommentsScreen(item);
            // navigation.navigate('CommentScreen', { item });
        }
    };

    const handleLike = (postId) => {
        setPersonDetails((prevInfo) =>
            prevInfo.map((item) =>
                item.id === postId
                    ? {
                        ...item,
                        liked: !item.liked,
                        Likes: item.liked ? item.Likes - 1 : item.Likes + 1,
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
        hours = hours ? hours : 12; // 12-hour clock, '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    const handleReplyComment = (postId, commentIndex, replyText) => {
  
        setPersonDetails((prevDetails) =>
            prevDetails.map((item) =>
                item.id === postId
                    ? {
                        ...item,
                        comments: item.comments.map((comment, index) =>
                            index === commentIndex
                                ? {
                                    ...comment,
                                    isReplying: true,
                                    replyText: '',
                                    replies: [
                                        ...comment.replies,
                                        {
                                            text: replyText,
                                            timestamp: getFormattedDate(new Date()) + ' ' + getFormattedTime(new Date()),

                                        },
                                    ],
                                }
                                : comment
                        ),
                    }
                    : item
            )
        );
    };

    const handleReplySubmit = (postId, commentIndex) => {
        // Create a reply object with text and timestamp
        const newReply = {
            text: replyText,
            timestamp: getFormattedDate(new Date()) + ' ' + getFormattedTime(new Date()),
        };
    
        // Update the personDetails state to add a reply to the specified comment
        const updatedDetails = personDetails.map((item) =>
            item.id === postId
                ? {
                      ...item,
                      comments: item.comments.map((comment, index) =>
                          index === commentIndex
                              ? {
                                    ...comment,
                                    replies: [...comment.replies, newReply],
                                }
                              : comment
                      ),
                  }
                : item
        );
    
        // Set the updated state and clear the reply text
        setPersonDetails(updatedDetails);
        setReplyText('');
    };

    // const handleReplyTextChange = (postId, commentIndex, text) => {
    //     setPersonDetails((prevDetails) =>
    //         prevDetails.map((item) =>
    //             item.id === postId
    //                 ? {
    //                     ...item,
    //                     comments: item.comments.map((comment, index) =>
    //                         index === commentIndex
    //                             ? {
    //                                 ...comment,
    //                                 replyText: text,
    //                             }
    //                             : comment
    //                     ),
    //                 }
    //                 : item
    //         )
    //     );
    // };

    const handleReplyTextChange = (text) => {
        setReplyText(text); // Capture text from TextInput
    }

    const handleShare = (postId, description) => {
        Share.share({
            message: description,

        })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    };



    const handleFollow = (personId) => {
        setPersonDetails((prevDetails) =>
            prevDetails.map((person) =>
                person.id === personId ? { ...person, follow: !person.follow } : person
            )
        );
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

    // const handleToggleReply = (postId, commentIndex) => {
    //     setPersonDetails((prevDetails) =>
    //         prevDetails.map((item) =>
    //             item.id === postId
    //                 ? {
    //                     ...item,
    //                     comments: item.comments.map((comment, index) =>
    //                         index === commentIndex
    //                             ? {
    //                                 ...comment,
    //                                 isReplying: !comment.isReplying, // Toggle isReplying state
    //                                 replyText: '', // Clear any previously typed text
    //                             }
    //                             : comment
    //                     ),
    //                 }
    //                 : item
    //         )
    //     );
    // }

    const handleToggleReply = (postId, commentIndex) => {
        setIsReplying(!isReplying); // Toggle the reply input display
        setCommentingPostId(postId); // Set the postId when replying
        // Optionally, you might also set some state for commentIndex if needed
    };
    const personData = ({ item }) => {
        return (
            <View style={styles.personStyle}>
                <View style={styles.personInfo}>
                    <Image
                        source={item.image}
                        style={styles.profileStyle}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textImage}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleFollow(item.id)}>
                            <Text style={[styles.follow, { color: item.follow ? 'grey' : '#449779' }]}>{item.follow ? 'Following' : 'Follow'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={item.image1}
                        style={styles.dotStyle}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.companyStyle}>{item.company}</Text>

                </View>
                <View style={styles.textContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.addressStyle}>{item.address} {item.date} {item.time}</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', bottom: 20 }}>
                    <Image source={image.question} style={{ marginHorizontal: "3%", marginTop: 5 }} />
                    <Text multiLine={true} style={{ flex: 0.9, fontSize: 22, fontFamily: 'Roboto-Bold', color: '#010101' }}>{item.heading}</Text>
                </View>

                <Text style={styles.descriptionStyle}>{item.description}</Text>

                {item?.image2 && <Image source={item.image2} style={{ height: 170, bottom: 5 }} />}

                <Text style={{ fontSize: 18, color: '#449779', bottom: 4, fontFamily: 'Roboto-Medium', marginHorizontal: 16 }}>{item.vehicle}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => handleLike(item.id)}>
                            <Image source={item.liked ? image.green_heart : image.heart} style={{ height: 24, width: 24, marginHorizontal: 15 }} />
                            <Text style={{ marginHorizontal: 43, color: 'grey', bottom: 20, color: '#c0c0c0', fontFamily: 'Roboto-Bold' }}>{item.Likes} Likes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    
                        <TouchableOpacity onPress={() => setCommentingPostId(item.id)}> 
                            <Image source={image.Comment} style={{ height: 24, width: 24, marginHorizontal: "1%" }} />
                            <Text style={{ bottom: 23, marginHorizontal: 30, color: '#c0c0c0', fontFamily: 'Roboto-Bold' }}>{item.Comments} Comments</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleShare(item.id, item.description)}>
                        <View style={{ flexDirection: 'row' }}>

                            <Image source={image.Share} style={{ height: 24, width: 24, marginHorizontal: "7%", bottom: 3 }} />
                            <Text style={{ top: 2, color: '#c0c0c0', fontFamily: 'Roboto-Bold' }}>{item.Share}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                {/* comment */}
                <View>


                    {item.comments && item.comments.length > 0 && (
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={item.image} style={{
                                height: 30,
                                width: 30,
                                borderRadius: 20,
                                marginHorizontal: "3%",
                                bottom: 4
                            }} />

                            <View style={{ marginBottom: 10 }}>
                                {item.comments.map((comment, index) => ( 
                                
                                    <View style={{ flex: 1 }}>

                                        <View key={index} style={{ flex: 1, paddingHorizontal: 2, borderWidth: 1, borderColor: '#f5f5f5', borderRadius: 10, backgroundColor: "#f5f5f5", bottom: 4 }}>
                                            <View style={{ flex: 1., flexDirection: 'row' }}>
                                                <Text adjustsFontSizeToFit={true} style={{ flex: 0.7, fontFamily: 'Roboto-Bold', fontSize: 18, color: '#010101', marginHorizontal: 14 }}>{item.name}</Text>
                                                <Text style={{ flex: 0.3, color: '#449779', fontSize: 16, fontFamily: 'Roboto-Medium', paddingRight: "5%", marginTop: 1 }}>{item.follow}</Text>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={{ paddingTop: 15, fontSize: 15, fontFamily: 'Roboto-Light', color: '#7a7a7a', justifyContent: 'flex-start', paddingRight: 15 }}>{item.company}</Text>

                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={{ fontSize: 15, fontFamily: 'Roboto-Light', color: '#7a7a7a', paddingRight: 15 }}>{item.address}</Text>

                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={{ fontSize: 14 }}>{comment.text}</Text>

                                            </View>
                                        </View>


                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                <Text style={{ fontSize: 15, bottom: 10, alignItems: 'center', marginHorizontal: 3 }}>{comment.timestamp}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => handleLikeComment(item.id, index)}>
                                                    <Image source={comment.liked ? image.green_heart : image.heart} style={{ height: 15, width: 15, marginHorizontal: 4 }} />

                                                    <Text style={{ bottom: 18, marginHorizontal: 22 }}>{comment.Likes} Like</Text>
                                                </TouchableOpacity>
                                            </View>

                                            {/* 
                                            {comment.isReplying && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <Image source={comment.image} style={{ width: 30, height: 30 }} />
                        
                        <TextInput
                            placeholder="Reply"
                            onChangeText={(text) => handleReplyTextChange(item.id, index, text)}
                            value={comment.replyText}
                            style={{ borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 5, paddingHorizontal: 10, marginTop: 5}}
                        />
                        <TouchableOpacity onPress={() => handleReplyComment(item.id, index, comment.replyText)}> */}
                                            {/* <Image source={comment.image} style={{ marginHorizontal: 10 }} />
                                                <Text style={{ fontSize: 14, color: 'grey', marginHorizontal: 30, bottom: 16 }}>{comment.Reply}</Text>  */}
                                            {/* <Text>Send</Text>
                        </TouchableOpacity>
                       
                    </View> */}
                                            {/* )} */}
                                            {/* {!comment.isReplying && (
                    <TouchableOpacity onPress={() => handleToggleReply(item.id, index)}>
                        <Text>{comment.Reply}</Text>
                    </TouchableOpacity>
                )} */}
                                            {/* <TouchableOpacity onPress={() => handleReplyComment(item.id, index, comment.replyText )}>
                                            
                                                <Image source={image.Reply} style={{ marginHorizontal: 10 }} />
                                                <Text style={{ fontSize: 14, color: 'grey', marginHorizontal: 30, bottom: 16 }}>{item.Reply}</Text> */}
                                            {/* <Image source={image.replyIcon} style={{ height: 15, width: 15, marginLeft: 10 }} /> */}
                                            {/* </TouchableOpacity>  */}
                                            
                                            <TouchableOpacity onPress={() => handleToggleReply(item.id, index)}>
                                                <Image source={image.Reply}/>
                                                <Text>{item.Reply}</Text>
                                            </TouchableOpacity>

                                            {isReplying && (
                                                <View>
                                                    <TextInput
                                                        placeholder="Your reply..."
                                                        value={replyText}
                                                        onChangeText={handleReplyTextChange}
                                                    />
                                                    <TouchableOpacity onPress={() => handleReplySubmit(item.id, index)}>
                                                        <Text>Send</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    </View>


                                ))}
                            </View>
                        </View>
                    )}

                </View>


                <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                    <View style={{ flex: 0.13 }}>

                        <Image source={item.image} style={{
                            height: 35,
                            width: 35,
                            borderRadius: 25,
                            marginHorizontal: "25%",
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
                            onFocus={() => {
                                if (item?.comments && item.comments.length > 1) {
                                    showCommentsScreen(item);
                                } else {

                                    setCommentingPostId(item.id)
                                }
                            }}
                        />
                        <TouchableOpacity style={{
                            flex: 0.12,
                            alignItems: 'center', justifyContent: 'center'
                        }}
                            onPress={() => handlePress(item.id, commentText)}>
                            {/* onPress={() => handleCommentSubmit(item.id, commentText)}> */}
                            <Image source={image.send} tintColor="#f5f5f5" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Button title="Submit" onPress={showCommentsScreen}/> */}
            </View>


        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <ImageBackground source={require('../../assets/header.png')} style={styles.headerStyle}>
                    <View style={styles.headerContainer}>
                        <View style={styles.innerContainer}>
                            <Image source={require('../../assets/icon.png')} style={styles.icon} />
                            <Text style={styles.text}>Bhopu</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Image source={require('../../assets/message.png')} style={styles.messageIcon} />
                            <Image source={require('../../assets/notification.png')} style={styles.notifIcon} />
                        </View>
                    </View>
                </ImageBackground>
                <View>
                    <FlatList
                        data={carouselDetails}
                        renderItem={carouselData}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}

                    />
                </View>
                <View>
                    <FlatList
                        data={personDetails}
                        renderItem={personData}
                        ItemSeparatorComponent={ItemSeparator}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}


                    />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}





export default HomeScreen;