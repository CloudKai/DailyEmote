import { View, Text, TextInput, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { router } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../FireBaseConfig';
import { colors, styles } from '../../../styleSheets/Styles';
import HeaderComponent from '../../../components/addEntry/HeaderComponent';
import TitleInput from '../../../components/addEntry/TitleInput';
import DateInput from '../../../components/addEntry/DateInput';
import EntryInput from '../../../components/addEntry/EntryInput';
import AddEntryButton from '../../../components/addEntry/AddEntryButton';

export default function create() {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [dateString, setDateString] = useState(""); //Format: "YYYY-MM-DD"

  const goBack = () => {
    router.back();
  };

  const resetAll = () => {
    setTitle("");
    setTextEntry("");
    setDateString("");
    router.back();
  };

  return (
    <SafeAreaView style={styles.overlay}>
      <View style={addEntryStyles.headerContainer}>
        <HeaderComponent goBack={goBack}/>
      </View>
      <View style={addEntryStyles.inputContainer}>
        <TitleInput text={title} setText={setTitle}/>
      </View>
      <View style={addEntryStyles.inputContainer}>
        <DateInput text={dateString} setText={setDateString}/>
      </View>
      <View style={addEntryStyles.inputContainer}>
        <EntryInput text={textEntry} setText={setTextEntry}/>
      </View>
      <View style={addEntryStyles.buttonContainer}>
        <AddEntryButton 
          title={title} 
          dateString={dateString} 
          textEntry={textEntry} 
          resetAll={resetAll}
        />
      </View>

    </SafeAreaView>
  );
}

const addEntryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    marginVertical: 0,
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
});