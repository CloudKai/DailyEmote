import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, styles } from '../../../styleSheets/Styles'
import Entry from './modalListEntry'
import { entryData, modalContentProps } from '../../../types/Types'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../../FireBaseConfig'

/**
   * Function to display all entries given a selectedDate.
   * @param selectedDate - the date selected by the user
   * @param closeModal - function to close the modal
   * @returns loading circle if entries are being read, 
   * otherwise a list of entries
   */
export default function modalList({ selectedDate, closeModal }: modalContentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [entries, setEntries] = useState<entryData[]>([]);

  /**
   * splits date string into year, month, and day
   */
  const splitDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return { year, month, day };
  };
  
  /**
   * Asynchronously reads entries from the database for a given date
   * @param date - the date to read entries for
   */
  const readDateEntry = async (date: string) => {
    console.log("reading entries for: " + date);
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
  
      setEntries(newEntries); 
      console.log(newEntries);
    } catch (error) {
      console.error("Error reading entries: ", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to load entries
   */
  const loadEntries = async () => {
    await readDateEntry(selectedDate);
    console.log("ran readDateEntry");
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <View style={modalListStyles.listEntries}>
      {loading ? (
        console.log("Loading"),
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        console.log(entries),
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Entry
              item={item}
              closeModal={closeModal}
              reload={loadEntries}
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