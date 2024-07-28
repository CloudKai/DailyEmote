import { View, Text, ActivityIndicator } from 'react-native'
import { router, useFocusEffect } from 'expo-router';
import { colors, styles } from '../../../styleSheets/Styles';
import { ProfileTab } from '../../../components/ProfileTab';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CalendarComponent from '../../../components/home/calendar/CalendarComponent';
import CardListComponent from '../../../components/home/cardlist/CardListComponent';
import { entryData, getUser, readDateEntry } from '../../../utils/FireBaseHandler';

/**
 * Home screen of the app
 * Contains the calendar component and displays a list of entries below it when a date is pressed
 */
const home = () => {
  const userid = getUser();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showEntriesNum, setShowEntriesNum] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [entries, setEntries] = useState([] as entryData[]);

  const loadEntries = async () => {
    setShowEntriesNum(false);
    setEntries([]);
    setLoading(true);
    console.log("Loading entries for date: " + selectedDate)
    readDateEntry(selectedDate, userid).then((data) => {
      setEntries(data);
      setLoading(false);
      // if (data.length !== 0) {
      //   setDataLength(data.length);
      //   setShowEntriesNum(true);
      // }
    });
  };

  const gotoViewEntry = (entryID: string) => {
    router.push({
      pathname: '../../(others)/viewEntryFull',
      params: {
        id: entryID,
      }
    });
  }

  /**
   * When the screen is focused, load entries
   */
  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect")
      loadEntries();
    }, [selectedDate])
  );

  return (
    <View style={styles.overlay}>
      <ProfileTab name="Calendar" />

      <View style={{
        flex: 1,
        width: '100%',
        padding: 10,
      }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingBottom: 10 }}>
            <CalendarComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              loadEntries={loadEntries}
            />
          </View>

          {/* Display entries */}
          <View style={{ flex: 1 }}>
            {selectedDate === "" ? (
              <View style={{
                alignItems: 'center',
              }}>
                <Text style={{
                  color: colors.white, //Color: White
                  fontSize: 20,
                  textAlign: "center",
                  marginVertical: 20,
                }}>
                  Select a date to view entries
                </Text>
              </View>
            ) : (
              loading ? (
                <View>
                  <ActivityIndicator size="large" color={colors.skyBlue} />
                </View>
              ) : (
                <View style={{
                  backgroundColor: colors.background, //Color: Dark Blue
                  alignSelf: 'center',
                  width: '100%',
                }}>
                  <CardListComponent data={entries} gotoViewEntry={gotoViewEntry} />
                </View>
              )
            )}
          </View>
        </ScrollView>

        <View>
          {showEntriesNum ? (
            <View>
              <Text style={{
                color: 'white',
                justifyContent: 'center',
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 15,
                fontSize: 13,
              }}>
                Number of Entries: {dataLength}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>

  );

}

export default home;