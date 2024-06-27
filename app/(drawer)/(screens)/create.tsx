import { View, Text, TextInput, Pressable, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";

import React, { useState } from "react";
import { router } from "expo-router";
import { styles } from "../../../styleSheets/Styles";
import HeaderComponent from "../../../components/createEntry/HeaderComponent";
import TitleInput from "../../../components/createEntry/TitleInput";
import DateInput from "../../../components/createEntry/DateInput";
import EntryInput from "../../../components/createEntry/EntryInput";
import AddEntryButton from "../../../components/createEntry/AddEntryButton";

const create = () => {
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
};

export default create;

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
