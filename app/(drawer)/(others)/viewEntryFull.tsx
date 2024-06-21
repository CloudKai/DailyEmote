import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import entryData from "../(screens)/home";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function viewEntryFull() {
  const { id, title, textEntry, date } = useLocalSearchParams();

  const handleEditButton = () => {
    router.push({
      pathname: '../(others)/editEntry',
      params: {
        id: id,
        title: title,
        textEntry: textEntry,
        date: date,
      },
    });
  }

  return (
    <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
      <View style={viewEntryStyles.overview}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={viewEntryStyles.backbutton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
        <View style={viewEntryStyles.headerPosition}>
        <Text style={[styles.headingText, viewEntryStyles.underline]}>
          {date}
        </Text>
        </View>
      <TouchableOpacity onPress={() => {handleEditButton}}>
        <AntDesign name="edit" size={24} color={colors.primary} />
      </TouchableOpacity>
      </View>

      <View style={[styles.textBox,{ marginVertical: 10, },]}>
      <Text style={[styles.headingText,{ color: colors.primary, marginVertical: 10,},]}>
        Title: {title}
      </Text>
      </View>

      <View>
      <Text style={[styles.text,{ color: colors.primary, marginVertical: 10, },]}>
        {textEntry}
      </Text>
      </View>
    </SafeAreaView>
  );
}

const viewEntryStyles = StyleSheet.create({
  overview: {
    marginVertical: 20,
    flexDirection: "row",
    position: 'relative',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  backbutton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  headerPosition: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
  },
  underline: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    color: colors.primary,
  }
}) 
