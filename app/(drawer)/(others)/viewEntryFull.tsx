import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import entryData from "../(screens)/home";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons } from "@expo/vector-icons";

export default function viewEntryFull() {
  const { id, title, textEntry, date } = useLocalSearchParams();

  return (
    <SafeAreaView style={[
      styles.overlay,
      {
        justifyContent: "flex-start",
      }
      ]}
    >
      <View
        style={{
          marginVertical: 20,
          // borderColor: "red",
          // borderWidth: 1,
          flexDirection: "row",
          position: 'relative',
          alignItems: 'center',
          height: 50,
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            {
              position: "absolute",
              left: 10,
              top: 10,
              // zIndex: 1,
              // padding: 10,
              // borderRadius: 50,
              // backgroundColor: colors.primary
            },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={[{ 
          flex: 1, 
          alignItems: "center", 
          justifyContent: "center",
          }]}
        >
        <Text
          style={[
            styles.headingText,
            {
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
              color: colors.primary,
            },
          ]}
        >
          {date}
        </Text>
        </View>
      </View>

      <View 
        style={[
          styles.textBox,
          {
            marginVertical: 10,
          },
        ]}
      >
        <Text
          style={[
            styles.headingText,
            {
              color: colors.primary,
              marginVertical: 10,
            },
          ]}
        >
          Title: {title}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.text,
            {
              color: colors.primary,
              marginVertical: 10,
            },
          ]}
        >
          {textEntry}
        </Text>
      </View>
    </SafeAreaView>
  );
}
