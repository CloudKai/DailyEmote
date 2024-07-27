import React from "react";
import { Pressable, View, Text } from "react-native";
import { colors, styles } from "../styleSheets/Styles";

type ConfirmButtonProps = {
  handlePress: () => void;
  title: string;
}

export default function ConfirmButton({ handlePress, title }: ConfirmButtonProps) {
  return (
    <View>
      <Pressable 
        style={{
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          alignContent: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          backgroundColor: colors.button, //Color: Sky Blue
        }}
        onPress={handlePress}
        testID="confirm-button"
      >
        <Text style={[styles.whiteText, {alignSelf: "center"}]}>{title}</Text>
      </Pressable>
    </View>
  );
}