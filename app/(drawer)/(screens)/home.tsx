import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable, Modal, ActivityIndicator, FlatList, TouchableWithoutFeedback, } from 'react-native'
import { router } from 'expo-router';
import { styles, colors } from '../../../styleSheets/Styles';
import { ProfileTab } from '../../../components/ProfileTab';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CalendarComponent from '../../../components/home/calendar/CalendarComponent';
import CardListComponent from '../../../components/home/cardlist/CardListComponent';
import { entryData, readDateEntry } from '../../../utils/FireBaseHandler';

const home = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  const loadEntries = async () => {
    setLoading(true);
    console.log("Loading entries for date: " + selectedDate)
    readDateEntry(selectedDate).then((data) => {
      setEntries(data);
      setLoading(false);
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

  useEffect(() => {
    if (selectedDate !== "") {
      loadEntries();
    }
  }, [selectedDate]);

  return (
    <View style={homeStyles.overlay}>
      <ProfileTab name="Calendar" /> 

      <View style={homeStyles.scrollOverlay}>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingBottom: 10}}>
          {/* <Text>Calendar Component</Text> */}
          <CalendarComponent 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            loadEntries={loadEntries}
          />
          {/* <Text>End of Calendar Component</Text> */}
          
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

/*

*/