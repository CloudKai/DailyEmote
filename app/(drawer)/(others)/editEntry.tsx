import { View, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { entryData, homeStyles } from "../(screens)/home";
import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { colors, styles } from "../../../styleSheets/Styles";

export default function create() {
  const { id, titleView, textEntryView, dateView } = useLocalSearchParams();

  const [title, setTitle] = useState(titleView);
  const [textEntry, setTextEntry] = useState(textEntryView);
  const [date, setDate] = useState(dateView);
  const [dateModal, setDateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  const addEntry = async () => {
    try {
      const entriesRef = collection(FIREBASE_DB, "entries");
      const { year, month, day } = formatDate(date);
      const document = await addDoc(entriesRef, {
        title: title,
        isHappy: false,
        year: year,
        month: month,
        day: day,
        textEntry: textEntry,
      });
      console.log("Document written with ID: ", document.id);
      setTitle("");
      setTextEntry("");
      router.back();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDateModal(false);
    setDate(currentDate);
    console.log(currentDate.toDateString().split(" "));
  };

  const formatDate = (date: Date) => {
    const year: string = date.getFullYear().toString();
    const month: string =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    const day: string =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
    return { year, month, day };
  };

  return (
    <SafeAreaView
      style={[
        styles.overlay
      ]}
    >
      <Text
        style={[
          styles.headingText,
          {
            color: colors.primary, //Color: White
            marginVertical: 20,
          },
        ]}
      >
        New Entry
      </Text>
      <TextInput
        style={[homeStyles.inputBox, {width: "80%"}]}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        multiline={true}
        numberOfLines={1}
      />
      {/* Date Select */}
      {dateModal && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onDateChange}
        />
      )}
      <Pressable
        style={{ width: "80%" }}
        onPress={() => {
          setDateModal(true);
          console.log("Opened date modal");
        }}
      >
        <TextInput
          style={[homeStyles.inputBox, { color: colors.tertiary }]}
          editable={false}
        >
          Date: {formatDate(date).year}-{formatDate(date).month}-
          {formatDate(date).day}
        </TextInput>
      </Pressable>
      <TextInput
        style={[homeStyles.inputBox, { height: "40%", width: "80%" }]}
        placeholder="Enter new entry"
        value={textEntry}
        onChangeText={(text) => setTextEntry(text)}
        multiline={true}
        numberOfLines={5}
      />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "80%"
      }}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.button, //Color: Light Blue
            },
          ]}
          onPress={addEntry}
        >
          <Text style={styles.text}>Add Entry</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.button, //Color: Light Blue
            },
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.text}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
