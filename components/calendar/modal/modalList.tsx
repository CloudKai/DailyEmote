import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, styles } from '../../../styleSheets/Styles'
import Entry from './modalListEntry'
import { entryData } from '../../../types/Types'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../../FireBaseConfig'

type modalContentProps = {
  selectedDate: string,
  closeModal: () => void,
}

export default function modalList({ selectedDate, closeModal }: modalContentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [entries, setEntries] = useState<entryData[]>([]);

  const splitDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return { year, month, day };
  };
  
  /**
   * Function to read all entries given a selectedDate
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
  
      setEntries(newEntries); // Update state once with new entries
      console.log(newEntries);
    } catch (error) {
      console.error("Error reading entries: ", error);
    } finally {
      setLoading(false);
    }
  };

  const loadEntries = async () => {
    setLoading(true);
    await readDateEntry(selectedDate);
    console.log("ran readDateEntry");
    await setLoading(false);
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