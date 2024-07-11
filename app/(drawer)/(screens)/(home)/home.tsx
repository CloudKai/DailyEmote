import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable, Modal, ActivityIndicator, FlatList, TouchableWithoutFeedback, } from 'react-native'
import { router, useFocusEffect } from 'expo-router';
import { styles, colors } from '../../../../styleSheets/Styles';
import { ProfileTab } from '../../../../components/ProfileTab';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CalendarComponent from '../../../../components/home/calendar/CalendarComponent';
import CardListComponent from '../../../../components/home/cardlist/CardListComponent';
import { entryData, getUser, readDateEntry } from '../../../../utils/FireBaseHandler';

/**
 * Home screen of the app
 * Contains the calendar component and displays a list of entries below it when a date is pressed
 */
const home = () => {
  const userid = getUser();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  const loadEntries = async () => {
    setLoading(true);
    setEntries([]);
    console.log("Loading entries for date: " + selectedDate)
    readDateEntry(selectedDate, userid).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  };

  const gotoViewEntry = (entryID: string) => {
    router.push({
      pathname: './viewEntryFull',
      params: {
        id: entryID,
      }
    });
  }

  // useEffect(() => {
  //   if (selectedDate !== "") {
  //     console.log("useEffect");
  //     loadEntries();
  //   }
  // }, [selectedDate]);

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
    <View style={homeStyles.overlay}>
      <ProfileTab name="Calendar" /> 

      <View style={homeStyles.scrollOverlay}>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingBottom: 10}}>
          <CalendarComponent 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            loadEntries={loadEntries}
          />  
          </View>

          {/* Display entries */}     
          <View style={{flex: 1}}>
            { selectedDate === "" ? (
              <View style={homeStyles.text}>
                <Text style={homeStyles.headingText}>
                  Select a date to view entries
                </Text>
              </View>
            ) : (
              loading ? (
                <View>
                  <ActivityIndicator size="large" color={colors.skyBlue} />
                </View>
              ) : (
                <View style={homeStyles.cardList}>
                  <CardListComponent data={entries} gotoViewEntry={gotoViewEntry} />
                </View>
              )
            )}
          </View>
        </ScrollView>
      </View>
      
    </View>
  );
  
}

export default home;

export const homeStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background, //Color: Dark Blue
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  scrollOverlay: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  component_overlay: {
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  headingText: {
    color: colors.white, //Color: White
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  cardList: {
    backgroundColor: colors.background, //Color: Dark Blue
    alignSelf: 'center',
  },
  text: {
    alignItems: 'center',
  },
});