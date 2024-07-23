import { View, Text, TextInput, Pressable, SafeAreaView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, styles } from '../../../styleSheets/Styles';
import { addEntry, formatDate } from '../../../utils/FireBaseHandler';
import ConfirmButton from '../../../components/ConfirmButton';
import DateInput from '../../../components/entry/DateInput';
import DescriptionInput from '../../../components/entry/DescriptionInput';
import TitleInput from '../../../components/entry/TitleInput';
import HeaderComponent from '../../../components/HeaderComponent';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { color } from '@rneui/base';

/**
 * Create entry screen of the app
 * Contains the form to create a new entry
 */
export default function create() {

  const currDate = formatDate(new Date());
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [dateString, setDateString] = useState(currDate); //Format: "YYYY-MM-DD"
  const [mood, setMood] = useState("Happy");
  
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

  const triggerMood = (newMood: React.SetStateAction<string>) => {
    setMood(newMood);
  };

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
        <HeaderComponent title="Create Entry" goBack={goBack} />
      </View>

      <View style={{ padding: 10, alignItems: "center" }}>

        <View style={addEntryStyles.inputContainer}>
          <DateInput text={dateString > currDate ? currDate : dateString} setText={setDateString} />
        </View>

        <View style={addEntryStyles.inputContainer}>
          <TitleInput text={title} setText={setTitle} />
        </View>

        <Text style={{
          fontSize: 20,
          color: 'white',
          paddingTop: 5,
          alignSelf: 'center'
        }}>
          Mood:
        </Text>
        <View style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignContent: 'space-evenly',
        }}>
          <TouchableOpacity
            onPress={() => triggerMood("Sad")}
            style={{
              paddingHorizontal: 30,
            }}>
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={60}
              color={mood === "Sad" ? "red" : "gray"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => triggerMood("Neutral")}
            style={{
              paddingHorizontal: 30,
            }}>
            <MaterialCommunityIcons
              name="emoticon-neutral-outline"
              size={60}
              color={mood === "Neutral" ? "yellow" : "gray"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => triggerMood("Happy")}
            style={{
              paddingHorizontal: 30,
            }}>
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={60}
              color={mood === "Happy" ? "green" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <View style={addEntryStyles.inputContainer}>
          <DescriptionInput text={textEntry} setText={setTextEntry} />
        </View>

      </View>

      <View style={addEntryStyles.buttonContainer}>
        <ConfirmButton handlePress={handleAddEntry} title="Add Entry" />
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
    padding: 7,
    flexDirection: "row",
    borderColor: 'red',
    borderWidth: 0,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});