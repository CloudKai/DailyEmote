import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HeaderComponent from "../../../components/viewEntry/HeaderComponent";
import ViewEntryComponent from "../../../components/viewEntry/ViewEntryComponent";

export default function viewEntryFull() {
  const { id, title, textEntry, date } = useLocalSearchParams();

  if (typeof id != 'string' || typeof title != 'string' || typeof textEntry != 'string' || typeof date != 'string') {
    //error
    return null;
  }

  const handleEditButton = () => {
    router.push({
      pathname: 'editEntry',
      params: {
        id: id,
        title: title,
        textEntry: textEntry,
        date: date,
      },
    });
  }

  const goBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
      <View style={viewEntryStyles.headerContainer}>
        <HeaderComponent goBack={goBack} goEdit={handleEditButton}/>
      </View>
      <View style={viewEntryStyles.viewTextContainer}>
        <ViewEntryComponent title={title} textEntry={textEntry} date={date}/>
      </View>
      
    </SafeAreaView>
  );
}

const viewEntryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  viewTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
}) 
