import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FireBaseConfig";
import { styles, colors } from "../../../styleSheets/Styles";
import { ProfileTab } from "../../../components/ProfileTab";
import Entry from "../../../components/displayModalEntry";
import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
    4.1 Year
    4.2 Month
    4.3 Day
  5. textEntry
*/
export type entryData = {
  id: string;
  title: string;
  isHappy: boolean;
  year: number;
  month: number;
  day: number;
  textEntry: string;
};

const home = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
    readDateEntry(day.dateString);
  };

  const splitDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return { year, month, day };
  };

  const closeModal = () => {
    setModalVisible(false);
    setEntries([]);
  }

  /**
   * Function to read all entries given a selectedDate
   */
  const readDateEntry = async (date: string) => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    const newEntries: entryData[] = [];
    const { year, month, day } = splitDate(date);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().year, doc.data().month, doc.data().day);
      console.log(year, month, day);
      if (
        doc.data().year === year &&
        doc.data().month === month &&
        doc.data().day === day
      ) {
        newEntries.push({
          id: doc.id,
          title: doc.data().title,
          isHappy: doc.data().isHappy,
          year: doc.data().year,
          month: doc.data().month,
          day: doc.data().day,
          textEntry: doc.data().textEntry,
        });
      }
    });
    setEntries(newEntries); // Update state once with new entries
    console.log(entries);
    setLoading(false);
  };

  return (
    <View
      style={[
        styles.overlay
      ]}
    >
      <ProfileTab name="Calender" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          width: "90%",
        }}
      >
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
          style={homeStyles.calendar}
        />
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal();
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => closeModal()}
          >
            <View
              style={[homeStyles.modalOverlay]}
              onStartShouldSetResponder={() => true}
            >
              <TouchableWithoutFeedback onPress={() => {}}>
                <View
                  style={[
                    homeStyles.modalView,
                    {
                      width: "90%",
                      backgroundColor: colors.secondaryBackground,
                    },
                  ]}
                  // onStartShouldSetResponder={() => true}
                >
                  <Text
                    style={[
                      styles.headingText,
                      { marginVertical: 15, color: "white" },
                    ]}
                  >
                    Selected Date: {selectedDate}
                  </Text>
                  <View
                    style={[
                      homeStyles.listEntries,
                      { width: "90%", maxHeight: "80%" },
                    ]}
                    onStartShouldSetResponder={() => true}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {}}
                    >
                      {/* flatlist */}
                      {loading ? (
                        <ActivityIndicator size="large" color={colors.accent} /> //Color: Sky Blue (Accent)
                      ) : (
                        <FlatList
                          data={entries}
                          renderItem={({ item }) => (
                            <Entry
                              item={item}
                              reload={() => readDateEntry(selectedDate)}
                              closeModal={() => closeModal()}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                          scrollEnabled={true}
                          contentContainerStyle={{ flexGrow: 1 }}
                        />
                      )}
                    </TouchableWithoutFeedback>
                  </View>
                  <Pressable
                    style={[
                      styles.button,
                      {
                        backgroundColor: colors.button, //Color: Light Blue
                      },
                    ]}
                    onPress={() => closeModal()}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          color: colors.primary, //Color: White
                        },
                      ]}
                    >
                      Hide Modal
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default home;

export const homeStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background, //Color: Dark Blue
  },
  modalView: {
    // maxHeight: '95%',
    width: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  listEntries: {
    width: "100%",
    flexGrow: 1,
    marginVertical: 10,
  },
  inputBox: {
    padding: 10,
    fontSize: 17,
    borderRadius: 4,
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  calendar: {
    width: "100%",
    height: "77%",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
