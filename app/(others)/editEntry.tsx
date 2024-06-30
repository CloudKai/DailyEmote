import { View, SafeAreaView, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { readSingleEntry } from "../../utils/FireBaseHandler";
import { styles } from "../../styleSheets/Styles";
import HeaderComponent from "../../components/editEntry/HeaderComponent";
import TitleInput from "../../components/editEntry/TitleInput";
import DateInput from "../../components/editEntry/DateInput";
import EntryInput from "../../components/editEntry/EntryInput";
import EditEntryButton from "../../components/editEntry/EditEntryButton";

export default function create() {
  const { id } = useLocalSearchParams();
  if (typeof id != 'string') {
    //error
    return null;
  }

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState("");

  const loadEntry = async () => {
    readSingleEntry(id).then((data) => {
      setTitle(data.title);
      setTextEntry(data.textEntry);
      setDate(data.day + "-" + data.month + "-" + data.year);
    });
  }

  const goBack = () => {
    router.back();
  };

  const resetAll = () => {
    setTitle("");
    setTextEntry("");
    setDate("");
    router.back();
  };

  useEffect(() => {
    loadEntry();
    console.log("Edit Entry Page loaded document: ", id);
  }, []);

  return (
    <SafeAreaView style={styles.overlay}>
      <View style={editEntryStyles.headerContainer}>
        <HeaderComponent goBack={goBack}/>
      </View>
      <View style={editEntryStyles.inputContainer}>
        <TitleInput text={title} setText={setTitle}/>
      </View>
      <View style={editEntryStyles.inputContainer}>
        <DateInput text={date} setText={setDate}/>
      </View>
      <View style={editEntryStyles.inputContainer}>
        <EntryInput text={textEntry} setText={setTextEntry}/>
      </View>
      <View style={editEntryStyles.buttonContainer}>
        <EditEntryButton
          id={id}
          title={title} 
          dateString={date} 
          textEntry={textEntry} 
          resetAll={resetAll}
        />
      </View>
    </SafeAreaView>
  );
};

const editEntryStyles = StyleSheet.create({
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