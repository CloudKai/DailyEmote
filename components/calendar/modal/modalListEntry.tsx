import { StyleSheet, SafeAreaView, Text, View, Pressable, Modal, Touchable, TouchableOpacity } from "react-native";
import { colors, styles } from "../../../styleSheets/Styles";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { entryData } from "../../../app/(drawer)/(screens)/home";
import React from "react";
import { router } from "expo-router";
import { deleteEntry } from "../../firestore/FireStoreHandler";

type EntryProps = {
  item: entryData
  reload: () => void
  closeModal: () => void
}

export default function DisplayEntry({ item, reload, closeModal }: EntryProps) {
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

  const handleDeleteButton = () => {
    deleteEntry(item);
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
            <AntDesign name="edit" size={24} color={colors.primary} />
          </Pressable>
          <Pressable onPress={handleDeleteButton}>
            <AntDesign name="delete" size={24} color={colors.primary} />
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
    color: colors.primary, //Color: White
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})