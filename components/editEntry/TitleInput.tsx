import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles';

type textInputProps = {
  text: string;
  setText: (text: string) => void;
}

export default function TitleInput({ text, setText }: textInputProps) {
  return (
    <View style={titleStyles.inputContainer}>
      <Text style={[styles.whiteText]}>Title: </Text>
      <TextInput 
        style={[titleStyles.inputBox, titleStyles.text]}
        placeholder="Title"
        value={text}
        onChangeText={(text) => setText(text)}
        multiline={true}
        numberOfLines={1}
      />
    </View>
  )
}

const titleStyles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: 'row',
  },
  inputBox: {
    backgroundColor: colors.contrastBackground,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 2,
  },
  text: {
    color: colors.black,
    fontSize: 20,
  }
});