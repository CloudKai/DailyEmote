import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../../styleSheets/Styles';

type textInputProps = {
  text: string;
  setText: (text: string) => void;
}

export default function TitleInput({ text, setText }: textInputProps) {
  return (
    <View style={titleStyles.inputContainer}>
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
  },
  inputBox: {
    padding: 10,
    borderRadius: 4,
    width: "90%",
    marginVertical: 10,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  text: {
    color: colors.black,
    fontSize: 20,
  }
});