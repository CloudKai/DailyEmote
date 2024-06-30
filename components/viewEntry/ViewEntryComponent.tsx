import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles';

type ViewTextProps = {
  title: string,
  textEntry: string,
  date: string,
}

export default function ViewEntryComponent({ title, textEntry, date }: ViewTextProps) {
  return (
    <View style={{width: "100%"}}>
    <View style={ViewEntryStyles.boxComponent}>
      <Text style={styles.whiteText}>Date: </Text>
      <View style={ViewEntryStyles.textBox}>
      <Text style={styles.blackText}>{date}</Text>
      </View>
    </View>
    <View style={ViewEntryStyles.boxComponent}>
      <Text style={styles.whiteText}>Title: </Text>
      <View style={ViewEntryStyles.textBox}>
      <Text style={styles.blackText}>{title}</Text>
      </View>
    </View>
    <View style={[ViewEntryStyles.boxComponent, {flexDirection: "column"}]}>
      <Text style={styles.whiteText}>Description: </Text>
      <ScrollView style={ViewEntryStyles.entryBox}>
      <Text style={styles.blackText}>{textEntry}</Text>
      </ScrollView>
    </View>
    </View>
  )
}

const ViewEntryStyles = StyleSheet.create({
  boxComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  textBox: {
    backgroundColor: colors.contrastBackground,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 2,
  },
  entryBox: {
    backgroundColor: colors.contrastBackground,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 300,
    width: '100%',
  }
});