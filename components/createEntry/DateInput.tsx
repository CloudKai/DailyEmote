import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerAndroid, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors } from '../../styleSheets/Styles';
import { textInputProps } from '../../types/Types';

export default function DateInput({ text, setText }: textInputProps) {  
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setDateModal(!dateModal);
      return;
    } else if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDateModal(!dateModal);
      console.log("Date selected: ", currentDate);
      const year: string = currentDate.getFullYear().toString();
      const month: string =
        currentDate.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : (currentDate.getMonth() + 1).toString();
      const day: string =
        currentDate.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
      setText(year + "-" + month + "-" + day);
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
          Date: {date.toDateString()}
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
  },
  pressable: {
    padding: 10,
    borderRadius: 4,
    width: "90%",
    marginVertical: 10,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
  }
});