import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, styles } from '../../../styleSheets/Styles'
import Entry from './modalListEntry'
import { entries, readDateEntry } from '../../firestore/FireStoreHandler'

type modalContentProps = {
  selectedDate: string,
  closeModal: () => void,
}

export default function modalList({ selectedDate, closeModal }: modalContentProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const loadEntries = async () => {
    setLoading(true);
    await readDateEntry(selectedDate);
    console.log("ran readDateEntry");
    await setLoading(false);
  };

  const reload = () => {
    loadEntries();
  }

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
              reload={reload}
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