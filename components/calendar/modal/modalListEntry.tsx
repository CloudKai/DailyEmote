import { StyleSheet, SafeAreaView, Text, View, Pressable, Modal, Touchable, TouchableOpacity } from "react-native";
import { colors, styles } from "../../../styleSheets/Styles";
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import { router } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { EntryProps } from "../../../types/Types";

/**
 * Function to display an entry in a modal.
 * @param item - the entry to display
 * @param closeModal - function to close the modal
 * @param reload - function to reload the entries
 * @returns a view of the entry with an edit and delete button
 */
export default function DisplayEntry({ item, closeModal, reload }: EntryProps) {
  const formatDate = () => `${item.day}-${item.month}-${item.year}`;

  const enableViewFull = () => {
    closeModal();
    router.push({
      pathname: '../(others)/viewEntryFull',
      params: {
        id: item.id,
        title: item.title,
        textEntry: item.textEntry,
        date: formatDate(),
      },
    });
  };

  const editEntry = () => {
    closeModal();
    router.push({
      pathname: '../(others)/editEntry',
      params: {
        id: item.id,
        title: item.title,
        textEntry: item.textEntry,
        date: formatDate(),
      },
    });
  };

  const handleDeleteButton = async () => {
    const entryRef = doc(FIREBASE_DB, "entries", item.id);
    await deleteDoc(entryRef);
    reload();
  };

  return (
    <View style={entryStyles.entry}>
      <TouchableOpacity style={{ flexDirection: "row", flex: 1 }} onPress={enableViewFull}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={[entryStyles.text, { borderBottomColor: "#1976D2", borderBottomWidth: 2, fontSize: 20 }]}>
            {item.title}
          </Text>
          <Text style={entryStyles.text}>{item.textEntry}</Text>
        </View>
        <View style={[entryStyles.icons, { flex: 0.3 }]}>
          <Pressable onPress={editEntry}>
            <AntDesign name="edit" size={24} color={colors.white} />
          </Pressable>
          <Pressable onPress={handleDeleteButton}>
            <AntDesign name="delete" size={24} color={colors.white} />
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const entryStyles = StyleSheet.create({
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 4,
    padding: 10,
    borderRadius: 4,
    width: "100%",
    backgroundColor: colors.tertiaryBackground, //Color: Dark Gray
  },
  text: {
    marginLeft: 1,
    marginRight: 10,
    fontSize: 17,
    fontWeight: '500',
    color: colors.white, //Color: White
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})