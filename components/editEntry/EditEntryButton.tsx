import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles'
import { editEntry } from '../../utils/FireBaseHandler';

type EditEntryProps = {
  id: string;
  title: string;
  dateString: string;
  textEntry: string;
  resetAll: () => void;
}

export default function EditEntryButton({ id, title, dateString, textEntry, resetAll }: EditEntryProps) {
 
  const handleEditEntry = async () => {
    console.log("Add Entry Button Pressed");
    editEntry(id, title, dateString, textEntry);
    resetAll();
  }

  return (
    <View>
      <Pressable 
        style={[styles.button]}
        onPress={handleEditEntry}
      >
        <Text style={styles.blackText}>Save Entry</Text>
      </Pressable>
    </View>
  );
}

const editEntryButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.navy
  },
});