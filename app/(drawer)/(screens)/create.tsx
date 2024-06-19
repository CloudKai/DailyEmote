import { View, Text, TextInput, Pressable, SafeAreaView, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { entryData, homeStyles } from "./home";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons } from "@expo/vector-icons";

const create = () => {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState(new Date());
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
      <View
        style={{
          marginVertical: 20,
          // borderColor: "red",
          // borderWidth: 1,
          flexDirection: "row",
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: "10%",
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => {router.back()}}
          style={[
            {
              position: "absolute",
              left: 15,
              top: -15,
            },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={[{ 
          flex: 3, 
          alignItems: "center", 
          justifyContent: "center",
          }]}
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
        </View>
      </View>

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
      </View>
    </SafeAreaView>
  );
};

export default create;
