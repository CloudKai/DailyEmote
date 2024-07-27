import { View, Text, TextInput, Pressable, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { colors, styles } from '../../../styleSheets/Styles';
import { addEntry, formatDate } from '../../../utils/FireBaseHandler';
import ConfirmButton from '../../../components/ConfirmButton';
import DateInput from '../../../components/entry/DateInput';
import DescriptionInput from '../../../components/entry/DescriptionInput';
import TitleInput from '../../../components/entry/TitleInput';
import HeaderComponent from '../../../components/HeaderComponent';

/**
 * Create entry screen of the app
 * Contains the form to create a new entry
 */
export default function create() {

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [dateString, setDateString] = useState(formatDate(new Date())); //Format: "YYYY-MM-DD"

  /**
   * Function to handle when the add entry button is pressed
   */
  const handleAddEntry = () => {
    console.log("Add Entry Button Pressed");
    if (title === "" || dateString === "" || textEntry === "") {
      Alert.alert("Please don't leave any fields empty");
    }
    else {
      addEntry(title, dateString, textEntry);
    }
  }

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background, //Color: Dark Blue
      alignItems: 'center',
      padding: 10,
      justifyContent: "flex-start",
    }}>
      <View style={addEntryStyles.headerContainer}>
        <HeaderComponent title="Create Entry" goBack={goBack}/>
      </View>

      <View style={{padding: 10, alignItems: "center"}}>

        <View style={addEntryStyles.inputContainer}>
          <DateInput text={dateString} setText={setDateString}/>
        </View>

        <View style={addEntryStyles.inputContainer}>
          <TitleInput text={title} setText={setTitle}/>
        </View>

        <View style={addEntryStyles.inputContainer}>
          <DescriptionInput text={textEntry} setText={setTextEntry}/>
        </View>

      </View>

      <View style={addEntryStyles.buttonContainer}>
        <ConfirmButton handlePress={handleAddEntry} title="Add Entry"/>
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
    padding: 10,
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
});