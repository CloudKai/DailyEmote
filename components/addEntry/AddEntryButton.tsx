import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles'
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FireBaseConfig';
import { router } from 'expo-router';
import { addEntry } from '../../utils/FireBaseHandler';

type AddEntryProps = {
  title: string;
  dateString: string;
  textEntry: string;
  resetAll: () => void;
}

export default function AddEntryButton({ title, dateString, textEntry, resetAll }: AddEntryProps) {
 
  const handleAddEntry = async () => {
    console.log("Add Entry Button Pressed");
    addEntry(title, dateString, textEntry);
    resetAll();
  }

  return (
    <View>
      <Pressable 
        style={[styles.button, addEntryButtonStyles.button]}
        onPress={handleAddEntry}
      >
        <Text style={styles.blackText}>Add Entry</Text>
      </Pressable>
    </View>
  );
}

const addEntryButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.navy
  },
});