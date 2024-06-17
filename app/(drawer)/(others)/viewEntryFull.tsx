import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import entryData from '../(screens)/home';
import { colors } from '../../../styleSheets/Styles';

export default function viewEntryFull() {
  const { id, title, textEntry, date } = useLocalSearchParams();

  return (
    <SafeAreaView style={[
      {
        flex: 1,
        backgroundColor: colors.background, //Color: Dark Blue
        justifyContent: "center",
        alignItems: "center",
      },
    ]}
    >
      <Text style={[{
        color: colors.primary, //Color: White
        fontSize: 20,
      }]}>
      {title}
      </Text>
    </SafeAreaView>
  )
}