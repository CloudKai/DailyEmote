import { View, Text, TextInput, Pressable, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { entryData } from "../../../types/Types";
import HeaderComponent from "../../../components/createEntry/HeaderComponent";

const create = () => {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateModal, setDateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  return (
    <View style={styles.overlay}>
      <HeaderComponent />
      <View style={addEntryStyles.inputContainer}>

      </View>
    </View>
  );
};

export default create;

const addEntryStyles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});