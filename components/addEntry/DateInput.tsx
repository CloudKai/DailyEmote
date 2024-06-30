import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerAndroid, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors, styles } from '../../styleSheets/Styles';

type textInputProps = {
  text: string;
  setText: (text: string) => void;
}

export default function DateInput({ text, setText }: textInputProps) {  
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const year: string = date.getFullYear().toString();
    const month: string =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    const day: string =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
    return year + "-" + month + "-" + day;
  }

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setDateModal(!dateModal);
      return;
    } else if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDateModal(!dateModal);
      console.log("Date selected: ", currentDate);
      const text = formatDate(currentDate);
      setText(text);
      console.log("Date set: ", text);
    }
  }

  return (
    <View style={dateStyles.dateContainer}>
       {/* Date Select */}
       {dateModal && (
        <DateTimePickerAndroid
          mode="date"
          display="spinner"
          value={date}
          onChange={onDateChange}
        />
      )}
      <Text style={[styles.whiteText]}>Date: </Text>
      <Pressable
        style={dateStyles.pressable}
        onPress={() => {
          setDateModal(!dateModal);
          console.log("Opened date modal");
        }}
      >
        <TextInput
          style={dateStyles.text}
          editable={false}
        >
          {formatDate(date)}
        </TextInput>
      </Pressable>
    </View>
  )
}

const dateStyles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  pressable: {
    backgroundColor: colors.contrastBackground,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 2,
  },
  text: {
    color: colors.black,
    fontSize: 20,
  }
});