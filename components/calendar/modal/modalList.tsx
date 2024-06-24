import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { modalStyles } from '../ModalComponent'
import { colors, styles } from '../../../styleSheets/Styles'
import Entry from './modalListEntry'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../../FireBaseConfig'
import { entryData } from '../../firestore/FireStoreHandler'

type modalContentProps = {
  selectedDate: string;
  closeModal: () => void;
}

export default function modalList({ selectedDate, closeModal }: modalContentProps) {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([] as entryData[]);


  const splitDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return { year, month, day };
  };  
  
  /**
   * Function to read all entries given a selectedDate
   */
  const readDateEntry = async (date: string) => {
    console.log("check " + date);
    setLoading(true);

    try {
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
      console.log(newEntries);
    } catch (error) {
      console.error("Error reading entries: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={modalListStyles.listEntries}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Entry
              item={item}
              reload={() => readDateEntry(selectedDate)}
              closeModal={closeModal}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
}

const modalListStyles = StyleSheet.create({
  listEntries: {
    width: "90%",
    maxHeight: "80%",
    flexGrow: 1,
    marginVertical: 10,
  },
})