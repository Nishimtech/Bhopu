// import React from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import StackNavigator from './src/navigations/StackNavigator'
// const Stack = createNativeStackNavigator();
// import { NavigationContainer } from '@react-navigation/native';


// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   )
// }


// export default App;

import { View, TextInput, Button, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [student, setStudent] = useState({
    name: "",
    id: "",
    address: "",
    isMonitor: "",
    currentClass: "",
    marks: [],
  })

  const [showMarkInputs, setShowMarkInputs] = useState(false);
  const [monitorId, setMonitorId] = useState(null);
  const [newMark, setNewMark] = useState({
    subjectName: '',
    subjectCode: '',
    marks: '',
  });

  const [entries, setEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('studentData', JSON.stringify(entries));
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleChange = (field, value) => {
    setStudent((data) => ({
      ...data,
      [field]: value,
    }));
  };

 

  const handleAddMark = () => {
    setShowMarkInputs(true);
};

const editItem = (item, index) => {

    setEditingData({ ...item, index });
    setIsModalVisible(true);
  }
  const handleAddMonitor = (isMonitor) => {
    if (isMonitor === 'Yes') {
      const updatedEntries = entries.map((entry) => {
        if (entry.id === editingData.id) {
          return { ...entry, isMonitor: 'Yes' };
        }
        return entry;
      });
      setEntries(updatedEntries);
    }
  };
  
  

  const handleSubmit = () => {
    if (showMarkInputs) {
      const updatedStudent = {
        ...student,
        marks: [...student.marks, newMark],
      };
      setEntries([...entries, updatedStudent]);
      setStudent({
        name: '',
        id: '',
        address: '',
        currentClass: '',
        isMonitor: '',
        marks: [],
      });
      setShowMarkInputs(false);
      setNewMark({
        subjectName: '',
        subjectCode: '',
        marks: '',
      });
      handleAddMonitor(student.isMonitor);
      saveData();
    } else {
      setEntries([...entries, student]);
      setStudent({
        name: '',
        id: '',
        address: '',
        currentClass: '',
        isMonitor: '',
        marks: [],
      });
      handleAddMonitor(student.isMonitor);
      saveData();

    }
  };


  const handleModalClose = () => {
    setIsModalVisible(false);

  };

 const handleDone = () => {
    const updatedEntries = [...entries];
    if (editingData.index >= 0) {
      updatedEntries[editingData.index] = { ...editingData };
      delete updatedEntries[editingData.index].index;
      setEntries(updatedEntries);
      handleAddMonitor(editingData.isMonitor);
    }
    setIsModalVisible(false);
    saveData();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('studentData');
        if (storedData !== null) {
          setEntries(JSON.parse(storedData));
          console.log('Data loaded successfully');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    loadData();
  }, []);
  

  return (
    <View>
      <View style={styles.viewEdit}>
        {entries.map((item, index) => {
          return (
            <View style={{ flexDirection: 'row' }} key={item.id}>
              <Text style={styles.textEdit}>{item.name}</Text>
              <Text style={styles.textEdit}>{item.id}</Text>
              <Text style={styles.textEdit}>{item.address}</Text>
              <Text style={styles.textEdit}>{item.currentClass}</Text>
              <Text style={styles.textEdit}>{item.isMonitor}</Text>
              {!showMarkInputs && item?.marks?.map((mark, idx) => (
                <View key={idx}>
                  <Text style={styles.textEdit}>
                    {mark.subjectName} {mark.subjectCode} {mark.marks}
                  </Text>
                </View>
              ))}
              <View style={styles.viewEditBtn}>
                <Button title='Edit' onPress={() => editItem(item, index)} />
              </View>
            </View>
          )
        })}
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Name"
          onChangeText={(text) => handleChange('name', text)}
          value={student.name}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="ID"
          onChangeText={(text) => handleChange('id', text)}
          value={student.id}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Address"
          onChangeText={(text) => handleChange('address', text)}
          value={student.address}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Class"
          onChangeText={(text) => handleChange('currentClass', text)}
          value={student.currentClass}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Monitor"
          onChangeText={(text) => handleChange('isMonitor', text)}
          value={student.isMonitor}
        />
      </View>
      {showMarkInputs && (
        <View>
          <TextInput
            placeholder="Subject Name"
            onChangeText={(text) => setNewMark((mark) => ({ ...mark, subjectName: text }))}
            value={newMark.subjectName}
          />
          <TextInput
            placeholder="Subject Code"
            onChangeText={(text) => setNewMark((mark) => ({ ...mark, subjectCode: text }))}
            value={newMark.subjectCode}
          />
          <TextInput
            placeholder="Marks"
            onChangeText={(text) => setNewMark((mark) => ({ ...mark, marks: text }))}
            value={newMark.marks}
          />
        </View>
      )}


      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Add Mark" onPress={handleAddMark} />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <View style={styles.entryContainer}>

            <TouchableOpacity style={styles.editBtn} onPress={() => setIsModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TextInput 
            placeholder="Name"
            style={styles.text}
              value={editingData.name}
              onChangeText={(value) => {
                setEditingData({ ...editingData, name: value })
              }}
            />
            <TextInput 
             placeholder="Id"
             style={styles.text}
              value={editingData.id}
              onChangeText={(value) => {
                setEditingData({ ...editingData, id: value })
              }}
            />
            <TextInput 
            placeholder="Address"
            style={styles.text}
              value={editingData.address}
              onChangeText={(value) => {
                setEditingData({ ...editingData, address: value })
              }}
            />
            <TextInput 
            placeholder="Class"
            style={styles.text}
              value={editingData.currentClass}
              onChangeText={(value) => {
                setEditingData({ ...editingData, currentClass: value })
              }}
            />
            <TextInput 
            placeholder="Monitor"
            style={styles.text}
              value={editingData.isMonitor}
              onChangeText={(value) => {
                setEditingData({ ...editingData, isMonitor: value })
              }}
            />

            {editingData?.marks?.map((mark, idx) => (
              <View key={idx}>
                <TextInput
                placeholder="Subject Name"
                  style={styles.text}
                  value={mark.subjectName}
                  onChangeText={(value) => {
                    const updatedMarks = [...editingData.marks];
                    updatedMarks[idx].subjectName = value;
                    setEditingData({ ...editingData, marks: updatedMarks });
                  }}
                />
                <TextInput
                placeholder="Subject Code"
                  style={styles.text}
                  value={mark.subjectCode}
                  onChangeText={(value) => {
                    const updatedMarks = [...editingData.marks];
                    updatedMarks[idx].subjectCode = value;
                    setEditingData({ ...editingData, marks: updatedMarks });
                  }}
                />
                <TextInput
                placeholder="Marks"
                  style={styles.text}
                  value={mark.marks}
                  onChangeText={(value) => {
                    const updatedMarks = [...editingData.marks];
                    updatedMarks[idx].marks = value;
                    setEditingData({ ...editingData, marks: updatedMarks });
                  }}
                />
              </View>
            ))}

          </View>

          <Button title="Done" onPress={handleDone} />
        </View>
      </Modal>
    </View>


  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: 'grey',

  },
  viewEdit: {
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey'
  },
  text: {
    marginHorizontal: 10,
    padding: 4
  },
  textEdit: {
    marginHorizontal: 10,
    padding: 2
  },
  viewEditBtn: {
    marginTop: 10
  },
  editBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 5,
    width: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 4
  },
});


export default App;
