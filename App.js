


import { View, TextInput, Button, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'

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
  const [newSubject, setNewSubject] = useState({
    subjectName: '',
    subjectCode: '',
    marks: '',
  });
  const [subjects, setSubjects] = useState([])

  const [entries, setEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState({});


  const handleAddMark = () => {
    setShowMarkInputs(true);
  };

  const handleNext = () => {
    if (subjects.length == 3) {
      let user = editingData
      user.marks = subjects
      setEditingData(user)
      setShowMarkInputs(false)
      return
    }
    let temp = subjects
    temp.push(newSubject)
    setSubjects(temp)
    setNewSubject({
      subjectName: '',
      subjectCode: '',
      marks: '',
    });

  };

  const editItem = (item, index) => {
    setEditingData({ ...item });
    setSubjects(item?.marks)
    setIsModalVisible(true);
  }

  const handleSubmit = () => {

    if (entries.length > 0) {

      const updatedEntries = entries.map((entry) => ({ ...entry, isMonitor: 'No' }));

      const updatedStudent = { ...student, isMonitor: 'Yes' };

      setEntries([...updatedEntries, updatedStudent]);
    } else {
      let temp = entries
      temp.push(student)
      setEntries(temp)
    }
    setStudent({
      name: '',
      id: '',
      address: '',
      currentClass: '',
      isMonitor: '',

    });
    setIsModalVisible(false);
  };

  const handleDone = () => {
    const updatedEntries = [...entries];
    if (editingData.index >= 0) {
      updatedEntries[editingData.index] = { ...editingData };
      delete updatedEntries[editingData.index].index;
      setEntries(updatedEntries);
    }
    setIsModalVisible(false);
  };


  const handleDeleteSubject = (index, idx) => {
    const newSubjects = subjects.filter(subject => subject?.length !== 1);
    setSubjects(newSubjects);
  };

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
          onChangeText={(text) => setStudent({ ...student, name: text })}
          value={student.name}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="ID"
          onChangeText={(text) => setStudent({ ...student, id: text })}
          value={student.id}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Address"
          onChangeText={(text) => setStudent({ ...student, address: text })}
          value={student.address}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Class"
          onChangeText={(text) => setStudent({ ...student, currentClass: text })}
          value={student.currentClass}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Monitor"
          onChangeText={(text) => setStudent({ ...student, isMonitor: text })}
          value={student.isMonitor}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
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
          </View>
          <Button title="Done" onPress={handleDone} />
          <View>
          </View>
        </View>
        {!editingData?.marks?.length > 0 && <Button title="Add Marks" onPress={handleAddMark} />}

        {subjects?.map((subject, idx) => {
          console.log("Subject Data:", subject);
          return (
            <View key={idx} style={{ flexDirection: 'row' }}>
              <Text>Subject Name: {subject.subjectName}</Text>
              <Text>Subject Code: {subject.subjectCode}</Text>
              <Text>Marks: {subject.marks}</Text>
              {/* <TouchableOpacity onPress={() => handleDeleteSubject(idx)}>  */}
              <TouchableOpacity onPress={handleDeleteSubject}>
                <Text>Delete</Text>
              </TouchableOpacity>

            </View>
          );
        })}
        {showMarkInputs && (
          <View>
            <TextInput
              placeholder="Subject Name"
              onChangeText={(text) => setNewSubject({ ...newSubject, subjectName: text })}
              value={newSubject.subjectName}
            />
            <TextInput
              placeholder="Subject Code"
              onChangeText={(text) => setNewSubject({ ...newSubject, subjectCode: text })}
              value={newSubject.subjectCode}
            />
            <TextInput
              placeholder="Marks"
              onChangeText={(text) => setNewSubject({ ...newSubject, marks: text })}
              value={newSubject.marks}
            />
          </View>
        )}
        <Button title={subjects?.length == 3 ? "Submit" : "Next"} onPress={handleNext} />

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