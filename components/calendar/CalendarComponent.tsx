import { View, Text, StyleSheet } from 'react-native'
import { Calendar, DateData } from "react-native-calendars";
import React from 'react'
import { colors } from '../../styleSheets/Styles';
import { CalendarComponentProps } from '../../types/Types';

/**
 * component that displays a calendar, 
 * dates can be interacted with to open a modal that displays all entries from a given date.
 * 
 */
export default function CalendarComponent( { selectedDate, setSelectedDate, openModal }: CalendarComponentProps) {

  const handleDayPress = async (day: DateData) => {
    console.log("selectedDate " + day.dateString);
    console.log("parameter " + selectedDate);
    setSelectedDate(day.dateString);
    console.log("parameter " + selectedDate);
    openModal();   
  };
  
  return (
    <View>
      {/* Calendar */}
      <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
          hideExtraDays={true}
          theme={{
            calendarBackground: colors.background, //Color: Dark Gray
            textSectionTitleColor: colors.white, //Color: White
            textSectionTitleDisabledColor: colors.darkNavy, //Color: Dark Navy
            selectedDayBackgroundColor: colors.skyBlue, //Color: Sky Blue
            selectedDayTextColor: colors.white, //Color: White
            todayTextColor: colors.skyBlue, //Color: Sky Blue
            dayTextColor: colors.white, //Color: White
            textDisabledColor: colors.disabled, //Color: Gray
            selectedDotColor: colors.white, //Color: White
            arrowColor: colors.border, //Color: Light Blue
            disabledArrowColor: colors.disabled, //Color: Gray
            monthTextColor: colors.white, //Color: White
            indicatorColor: colors.skyBlue, //Color: Sky Blue
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          style={calendarStyles.calendar}
        />
    </View>
  )
}

const calendarStyles = StyleSheet.create({
  calendar: {
    width: "100%",
    height: "77%",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
})

/**
   * on day press, set selectedDate param as date string,
   * turn on modal, enable read from database
   * @param day 
   */
  // const handleDayPress = (day: { dateString: string }) => {
  //   setSelectedDate(day.dateString);
  //   console.log("selectedDate " + day.dateString);
  //   openModal(true);
  // };
