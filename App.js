


// import { View, TextInput, Button, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native'
// import React, { useState } from 'react'

// const App = () => {
//   const [student, setStudent] = useState({
//     name: "",
//     id: "",
//     address: "",
//     isMonitor: "",
//     currentClass: "",
//     marks: [],
//   })
 

//   const [showMarkInputs, setShowMarkInputs] = useState(false);
//   const [newSubject, setNewSubject] = useState({
//     subjectName: '',
//     subjectCode: '',
//     marks: '',
//   });
//   const [subjects, setSubjects] = useState([])
//   const [monitoredClasses, setMonitoredClasses] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingData, setEditingData] = useState({});


//   const handleAddMark = () => {
//     setShowMarkInputs(!showMarkInputs);
//   };

//   const handleNext = () => {
//     let user = editingData
//     user.marks = subjects
//     setEditingData(user)
//     setShowMarkInputs(false)
//   };

//   const handleNext1 = () => {
//     let temp = subjects
//     temp.push(newSubject)
//     setSubjects(temp)
//     setNewSubject({
//       subjectName: '',
//       subjectCode: '',
//       marks: '',
//     });

//   };

//   const editItem = (item, index) => {
//     setEditingData({ ...item });
//     setSubjects(item?.marks)
//     setIsModalVisible(true);
//   }


//   // const handleSubmit = () => {

//   //   if (entries.length > 0) {

//   //     const updatedEntries = entries.map((entry) => ({ ...entry, isMonitor: 'No' }));

//   //     const updatedStudent = { ...student, isMonitor: 'Yes' };

//   //     setEntries([...updatedEntries, updatedStudent]);
//   //   } else {
//   //     let temp = entries
//   //     temp.push(student)
//   //     setEntries(temp)
//   //   }
//   //   setStudent({
//   //     name: '',
//   //     id: '',
//   //     address: '',
//   //     currentClass: '',
//   //     isMonitor: '',

//   //   });
//   //   setIsModalVisible(false);
//   // };

//   const handleSubmit = () => {
//     if (entries.length > 0) {
//       const classHasMonitor = entries.some(entry => entry.currentClass === student.currentClass && entry.isMonitor === 'Yes');
      
//       const updatedEntries = entries.map(entry => {
//         if (entry.currentClass === student.currentClass) {
//           return { ...entry, isMonitor: 'No' };
//         }
//         return entry;
//       });
     
      
      
//       const updatedStudent = { ...student, isMonitor: classHasMonitor ? 'No' : 'Yes' };

//       setEntries([...updatedEntries, updatedStudent]);
   
  
//   } else {
//         let temp = entries
//         temp.push(student)
//         setEntries(temp)
//       }
   
//     setStudent({
//         name: '',
//         id: '',
//         address: '',
//         currentClass: '',
//         isMonitor: '',
//     });
//     setIsModalVisible(false);
// };

//   const handleDone = () => {
//     let updatedEntries = [...entries];
//     if (updatedEntries.length >= 0) {
    
//       let data = updatedEntries.map(item => item.id == editingData.id ? editingData : item)
//       console.log(data)
//       setEntries(data);
//     }
//     setIsModalVisible(false);

//   };


//   const handleDeleteSubject = (index) => {
//     const newSubjects = [...subjects];
//     newSubjects.splice(index, 1);
//     setSubjects(newSubjects);
//   }

//   return (
//     <View>
//       <View style={styles.viewEdit}>
//         {entries.map((item, index) => {
//           return (
//             <View style={{ flexDirection: 'row' }} key={item.id}>
//               <Text style={styles.textEdit}>{item.name}</Text>
//               <Text style={styles.textEdit}>{item.id}</Text>
//               <Text style={styles.textEdit}>{item.address}</Text>
//               <Text style={styles.textEdit}>{item.currentClass}</Text>
//               <Text style={styles.textEdit}>{item.isMonitor}</Text>

//               <View style={styles.viewEditBtn}>
//                 <Button title='Edit' onPress={() => editItem(item, index)} />
//               </View>
//             </View>
//           )
//         })}
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <TextInput
//           placeholder="Name"
//           onChangeText={(text) => setStudent({ ...student, name: text })}
//           value={student.name}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <TextInput
//           placeholder="ID"
//           onChangeText={(text) => setStudent({ ...student, id: text })}
//           value={student.id}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <TextInput
//           placeholder="Address"
//           onChangeText={(text) => setStudent({ ...student, address: text })}
//           value={student.address}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <TextInput
//           placeholder="Class"
//           onChangeText={(text) => setStudent({ ...student, currentClass: text })}
//           value={student.currentClass}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <TextInput
//           placeholder="Monitor"
//           onChangeText={(text) => setStudent({ ...student, isMonitor: text })}
//           value={student.isMonitor}
//         />
//       </View>
//       <Button title="Submit" onPress={handleSubmit} />
//       <Modal visible={isModalVisible} animationType="slide">
//         <ScrollView>

//           <View style={styles.modalContainer}>
//             <View style={styles.entryContainer}>

//               <TouchableOpacity style={styles.editBtn} onPress={() => setIsModalVisible(false)}>
//                 <Text>Close</Text>
//               </TouchableOpacity>

//               <TextInput
//                 placeholder="Name"
//                 style={styles.text}
//                 value={editingData.name}
//                 onChangeText={(value) => {
//                   setEditingData({ ...editingData, name: value })
//                 }}
//               />
//               <TextInput
//                 placeholder="Id"
//                 style={styles.text}
//                 value={editingData.id}
//                 onChangeText={(value) => {
//                   setEditingData({ ...editingData, id: value })
//                 }}
//               />
//               <TextInput
//                 placeholder="Address"
//                 style={styles.text}
//                 value={editingData.address}
//                 onChangeText={(value) => {
//                   setEditingData({ ...editingData, address: value })
//                 }}
//               />
//               <TextInput
//                 placeholder="Class"
//                 style={styles.text}
//                 value={editingData.currentClass}
//                 onChangeText={(value) => {
//                   setEditingData({ ...editingData, currentClass: value })
//                 }}
//               />
//               <TextInput
//                 placeholder="Monitor"
//                 style={styles.text}
//                 value={editingData.isMonitor}
//                 onChangeText={(value) => {
//                   setEditingData({ ...editingData, isMonitor: value })
//                 }}
//               />
//             </View>
//             <Button title="Done" onPress={handleDone} />
//             <View>
//             </View>
//           </View>
//           {<Button title={showMarkInputs ? "Hide sheet" : "Add Marks"} onPress={handleAddMark} />}

//           {subjects?.map((subject, idx) => {
//             console.log("Subject Data:", subject);
//             return (
//               <View key={idx} style={{ flexDirection: 'row' }}>
//                 <Text>Subject Name: {subject.subjectName}</Text>
//                 <Text>Subject Code: {subject.subjectCode}</Text>
//                 <Text>Marks: {subject.marks}</Text>
//                 <TouchableOpacity onPress={() => handleDeleteSubject(idx)}>

//                   <Text>Delete</Text>
//                 </TouchableOpacity>

//               </View>
//             );
//           })}
//           {showMarkInputs && (
//             <View>
//               <TextInput
//                 placeholder="Subject Name"
//                 onChangeText={(text) => setNewSubject({ ...newSubject, subjectName: text })}
//                 value={newSubject.subjectName}
//               />
//               <TextInput
//                 placeholder="Subject Code"
//                 onChangeText={(text) => setNewSubject({ ...newSubject, subjectCode: text })}
//                 value={newSubject.subjectCode}
//               />
//               <TextInput
//                 placeholder="Marks"
//                 onChangeText={(text) => setNewSubject({ ...newSubject, marks: text })}
//                 value={newSubject.marks}
//               />
//             </View>
//           )}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>

//             <Button title={"Next"} onPress={handleNext1} />
//             <Button title={"Submit"} onPress={handleNext} />
//           </View>
//         </ScrollView>

//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },
//   modalHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   entryContainer: {
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderColor: 'grey',

//   },
//   viewEdit: {
//     marginTop: 10,
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: 'grey'
//   },
//   text: {
//     marginHorizontal: 10,
//     padding: 4
//   },
//   textEdit: {
//     marginHorizontal: 10,
//     padding: 2
//   },
//   viewEditBtn: {
//     marginTop: 10
//   },
//   editBtn: {
//     alignSelf: 'flex-end',
//     marginRight: 20,
//     marginTop: 5,
//     width: 60,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     padding: 4
//   },
// });


// export default App;

import React, { Fragment, useEffect, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, LoginScreen, SignupScreen, SplashScreen, VerifyEmail, LandingScreen, HowToPlay, HomeScreen, LobbyFilter, LobbyDetail, CreateContest, RoasterScreen, TeamPreview, PlugNPlay, Leaderboard, H2HLeaderboard, MyTeam, MyTeamPreview, BracketFlow, BracketLobby, PrivateContest } from './Views';


const Stack = createNativeStackNavigator();

function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    
    return (
        <Fragment>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='SplashScreen'
                    screenOptions={{
                        headerShown: false,
                        orientation: 'portrait'
                    }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LoginScreen" navigationKey="LoginScreen" component={LoginScreen} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="SignupScreen" navigationKey="SignupScreen" component={SignupScreen} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="ForgotPassword" navigationKey="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="VerifyEmail" navigationKey="VerifyEmail" component={VerifyEmail} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="LandingScreen" navigationKey="LandingScreen" component={LandingScreen} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="HomeScreen" navigationKey="HomeScreen" component={HomeScreen} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />
                    <Stack.Screen name="HowToPlay" navigationKey="HowToPlay" component={HowToPlay}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="LobbyFilter" navigationKey="LobbyFilter" component={LobbyFilter}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="LobbyDetail" navigationKey="LobbyDetail" component={LobbyDetail}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="CreateContest" navigationKey="CreateContest" component={CreateContest}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_right' }} />
                    <Stack.Screen name="RoasterScreen" navigationKey="RoasterScreen" component={RoasterScreen}  options={{ gestureEnabled: true }} />
                    <Stack.Screen name="PrivateContest" navigationKey="PrivateContest" component={PrivateContest}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="Leaderboard" navigationKey="Leaderboard" component={Leaderboard}  options={{ gestureEnabled: true }} />
                    <Stack.Screen name="H2HLeaderboard" navigationKey="H2HLeaderboard" component={H2HLeaderboard}  options={{ gestureEnabled: true }} />
                    <Stack.Screen name="TeamPreview" navigationKey="TeamPreview" component={TeamPreview}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="MyTeamPreview" navigationKey="MyTeamPreview" component={MyTeamPreview}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="MyTeam" navigationKey="MyTeam" component={MyTeam}  options={{ gestureEnabled: false,animationDuration:600,animation: 'slide_from_bottom' }} />
                    <Stack.Screen name="PlugNPlay" navigationKey="PlugNPlay" component={PlugNPlay} options={{ gestureEnabled: false, animation: Platform.OS == 'ios' ? 'fade' : 'none' }} />                    
                    <Stack.Screen name="BracketFlow" navigationKey="BracketFlow" component={BracketFlow} options={{ gestureEnabled: false, animation: 'slide_from_right' }} />                    
                    <Stack.Screen name="BracketLobby" navigationKey="BracketLobby" component={BracketLobby} options={{ gestureEnabled: false, animation: 'slide_from_right' }} />                    
                      
                </Stack.Navigator>
            </NavigationContainer>
        </Fragment>
    );
}

export default App;
