import { View, Text, StyleSheet } from 'react-native'
import { Calendar, DateData } from "react-native-calendars";
import React from 'react'
import { colors } from '../../styleSheets/Styles';

type CalendarComponentProps = {
  handleDayPress: (day: DateData) => void;
  selectedDate: string;
};

/**
 * component that displays a calendar, 
 * dates can be interacted with to open a modal that displays all entries from a given date.
 * 
 */
export default function CalendarComponent( { handleDayPress, selectedDate }: CalendarComponentProps) {
  
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
            textSectionTitleColor: colors.secondary, //Color: White Smoke
            textSectionTitleDisabledColor: colors.tertiary, //Color: Dark Navy
            selectedDayBackgroundColor: colors.accent, //Color: Sky Blue
            selectedDayTextColor: colors.primary, //Color: White
            todayTextColor: colors.accent, //Color: Sky Blue
            dayTextColor: colors.primary, //Color: White
            textDisabledColor: colors.disabled, //Color: Gray
            selectedDotColor: colors.primary, //Color: White
            arrowColor: colors.button, //Color: Light Blue
            disabledArrowColor: colors.disabled, //Color: Gray
            monthTextColor: colors.secondary, //Color: Dark Navy
            indicatorColor: colors.accent, //Color: Sky Blue
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
    shadowColor: colors.shadow,
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
