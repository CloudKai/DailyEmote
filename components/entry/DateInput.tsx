import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors, styles } from '../../styleSheets/Styles';
import { formatDate } from '../../utils/FireBaseHandler';

type dateInputProps = {
  text: string;
  setText: (text: string) => void;
}

export default function DateInput({ text, setText }: dateInputProps) {  
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(new Date(text));

  /**
   * handles the date change event
   * @param event 
   * @param selectedDate 
   */
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setDateModal(!dateModal);
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
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onDateChange}
          testID="date-picker" 
        />
      )}
      <Text style={[styles.whiteText]}>Date: </Text>
      <Pressable
        style={dateStyles.pressable}
        onPress={() => {
          setDateModal(!dateModal);
          console.log("Opened date modal", dateModal);
        }}
        testID="date-pressable" 
      >
        <TextInput 
          style={dateStyles.text} 
          editable={false} 
          value={formatDate(date)} 
          testID="date-text-input" // Added testID for testing purposes
        />
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
