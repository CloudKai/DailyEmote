import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from '../../styleSheets/Styles'
import { deleteEntry } from '../../utils/FireBaseHandler';

type DeleteEntryProps = {
  id: string;
  goBack: () => void;
}

export default function DeleteEntryButton( {id, goBack}: DeleteEntryProps ) {
  const handleDeleteEntry = async () => {
    console.log("Delete Entry Button Pressed");
    deleteEntry(id).then(() => {
      goBack();
    });
  }

  return (
    <View>
      <Pressable 
        style={[styles.button]}
        onPress={handleDeleteEntry}
      >
        <Text style={styles.blackText}>Delete Entry</Text>
      </Pressable>
    </View>
  )
}