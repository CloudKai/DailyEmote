import { View, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { entryData, homeStyles } from "../(screens)/home";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { colors } from "../../../styleSheets/Styles";

const editEntry = () => {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateModal, setDateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

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
    <View
      style={{
        flex: 1,
        backgroundColor: "#161622",
      }}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 30,
            height: "100%",
          },
        ]}
      >
        <Text
          style={[
            homeStyles.headingText,
            {
              color: colors.primary, //Color: White
              marginVertical: 20,
            },
          ]}
        >
          New Entry
        </Text>
        <TextInput
          style={[homeStyles.inputBox, {}]}
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
          style={{ width: "100%" }}
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
          style={[homeStyles.inputBox, { height: "40%" }]}
          placeholder="Enter new entry"
          value={textEntry}
          onChangeText={(text) => setTextEntry(text)}
          multiline={true}
          numberOfLines={5}
        />
        <View style={{}}>
          <Pressable
            style={[
              homeStyles.button,
              {
                backgroundColor: colors.button, //Color: Light Blue
              },
            ]}
            onPress={() => {}}
          >
            <Text style={homeStyles.text}>Add Entry</Text>
          </Pressable>
          <Pressable
            style={[
              homeStyles.button,
              {
                backgroundColor: colors.button, //Color: Light Blue
              },
            ]}
            onPress={() => router.back()}
          >
            <Text style={homeStyles.text}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default editEntry;
