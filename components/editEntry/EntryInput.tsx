import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles'

export type textInputProps = {
  text: string,
  setText: (text: string) => void,
}

export default function EntryInput({ text, setText }: textInputProps) {
  return (
    <View style={entryInputStyles.inputContainer}>
      <Text style={[styles.whiteText]}>Description: </Text>
      <TextInput 
        style={[entryInputStyles.inputBox, entryInputStyles.text]}
        placeholder="Enter how you are feeling here"
        value={text}
        onChangeText={(text) => setText(text)}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  )
}

const entryInputStyles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputBox: {
    padding: 10,
    borderRadius: 4,
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
    height: 300,
    alignSelf: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 20,
  }
})