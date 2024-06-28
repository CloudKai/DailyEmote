import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable, Modal, ActivityIndicator, FlatList, TouchableWithoutFeedback, } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { Calendar } from "react-native-calendars";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FireBaseConfig';
import { styles, colors } from '../../../styleSheets/Styles';
import { ProfileTab } from '../../../components/ProfileTab';
import Entry from '../../../components/displayModalEntry';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '@rneui/base';

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
  id: string,
  title: string,
  isHappy: boolean,
  year: number,
  month: number,
  day: number,
  textEntry: string,
}

const home = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);
  const [data, setData] = useState<any[]>([]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
    readDateEntry(day.dateString);
  };

  const splitDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return { year, month, day };
  };

  /**
   * Function to read all entries given a selectedDate
   */

  const readDateEntry = async (date: string) => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    const newEntries: entryData[] = [];
    const { year, month, day } = splitDate(date);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().year, doc.data().month, doc.data().day,);
      console.log(year, month, day,);
      if (doc.data().year === year && doc.data().month === month && doc.data().day === day) {
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
    setData(newEntries);
    console.log(entries);
    setLoading(false);
  }


  return (
    <>
    <View style = {[{
      flexDirection: 'column',
      flex: 6,
      backgroundColor: colors.background,
    }]}>

      <ProfileTab name = "Calender" />
    
      <View style ={{
        flex: 4,
        flexDirection: 'column',
        marginTop: 50,
      }}>

        {/* Calendar */}
        <View style ={{ 
          flex: 2, 
          width: "90%",
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
        }} >

        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          hideExtraDays={true}
          theme={{
            calendarBackground: colors.secondaryBackground, //Color: Dark Gray
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
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
          style={homeStyles.calendar}
        />
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEntries([]);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View 
            style={[homeStyles.modalOverlay]} 
            onStartShouldSetResponder={() => true}
          >
            <TouchableWithoutFeedback onPress={() => console.log("cancer 1")}>
              <View 
                style={[homeStyles.modalView, {width: "90%", backgroundColor:colors.secondaryBackground}]}
                // onStartShouldSetResponder={() => true}
              >
                
                  
                  <Text style={[homeStyles.headingText, {marginVertical: 15, color: 'white'}]}>Selected Date: {selectedDate}</Text>
                  <View 
                      style={[homeStyles.listEntries, {width: "90%", maxHeight: "80%"}]}
                      onStartShouldSetResponder={() => true}
                    >
                  <TouchableWithoutFeedback onPress={() => console.log("cancer 2")}>
                    
                    {/* flatlist */}
                    {loading ? (
                      <ActivityIndicator size="large" color={colors.accent}/> //Color: Sky Blue (Accent)
                    ) : (
                      <FlatList
                        extraData={entries}
                        data={entries}
                        renderItem={({item}) => (
                          <Entry item={item} reload={() => readDateEntry(selectedDate)}/>
                        )}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                      />
                    )} 
                    
                  </TouchableWithoutFeedback>
                  </View>
                  <Pressable
                    style={[
                      homeStyles.button, {
                        backgroundColor: colors.button //Color: Light Blue
                        }]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={[
                      homeStyles.text, {
                        color: colors.primary //Color: White
                        }]}>
                    Hide Modal
                    </Text>
                  </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {/* End of Calendar */}
      

      <View style = {{
            flex: 2, 
            backgroundColor: colors.background,
            alignSelf: 'center',
            marginTop: 20,
            paddingLeft: 7
          }}>
            
          <FlatList
            extraData={data}
            data = {data}
            horizontal
            persistentScrollbar = {true}
            showsHorizontalScrollIndicator = {false}
            keyExtractor={i => i.id}
            renderItem={({item}) => {
              return (
                <View style ={{
                  width: 300
                }}>
                <Card containerStyle = {{height: 265}}>
                  <Card.Title 
                    numberOfLines = {1}
                    ellipsizeMode = "tail"
                    style = {{marginBottom: -10}}
                  >
                    {item.title}
                  </Card.Title>
                  <Card.Divider style = {{marginTop: 15}}/>
                  <Card.Image
                    style={{ paddingTop: -10}}
                    source={{
                      uri:
                        'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    }}
                  />
                  <Text 
                    numberOfLines = {2} 
                    ellipsizeMode = "tail" 
                    style={{ textAlign: 'justify', paddingTop: 10 }}
                  >
                    {item.textEntry}
                  </Text>
              </Card>
              </View>
              );
            }}>
        </FlatList>
        </View>
        {/* End of Cards */}
      </View>
      {/* End of Calendar + Cards Slider */}
    </View>
    {/* End of Whole Body */}
    </>
  );
  
}

export default home;

export const homeStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  headingText: {
    fontSize: 24,
    fontWeight: '400',
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
    height: "100%",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 30
  },
});

{/* <FlatList
  data={entries}
  renderItem={({item}) => (
    <Entry item={item} reload={() => readDateEntry(selectedDate)}/>
  )}
  keyExtractor={item => item.id}
  scrollEnabled={true}
  contentContainerStyle={{ flexGrow: 1 }}
/> */}