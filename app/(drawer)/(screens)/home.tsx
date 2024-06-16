import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable, Modal } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { Calendar } from "react-native-calendars";
import { FIREBASE_AUTH } from '../../../FireBaseConfig';
import { styles } from '../../../styleSheets/Styles';
import { ProfileTab } from '../../../components/ProfileTab';
import React, { useState } from 'react';

const home = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <View style = {{
    flex: 1,
    backgroundColor: '#161622',
    }}>

      <ProfileTab name = "Calender" />

      <View style ={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
        {/* Calendar */}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
        />
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={homeStyles.modalView}>
            <Text style={homeStyles.modalText}>Selected Date: {selectedDate}</Text>
            <Pressable
              style={[styles.button, homeStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={homeStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default home;

const homeStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
