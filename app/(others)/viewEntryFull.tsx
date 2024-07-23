import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { colors, styles } from "../../styleSheets/Styles";
import { deleteEntry, readSingleEntry } from "../../utils/FireBaseHandler";
import HeaderComponent from "../../components/HeaderComponent";
import { Ionicons } from "@expo/vector-icons";
import ConfirmButton from "../../components/ConfirmButton";
import { MaterialCommunityIcons } from '@expo/vector-icons'

/**
 * Receives an entry id from the previous screen, displays the entry data for the given id
 * Allows the user to delete the entry and edit the entry
 * @returns View Entry Screen
 */
export default function viewEntryFull() {
  const { id } = useLocalSearchParams();

  /**
   * checks if id is a string
   */
  if (typeof id != 'string') {
    //error
    return null;
  }

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");

  /**
   * Function that loads the entry data onto the screen
   */
  const loadEntry = async () => {
    readSingleEntry(id).then((data) => {
      setTitle(data.title);
      setTextEntry(data.textEntry);
      setDate(data.year + "-" + data.month + "-" + data.day);
      setMood(data.mood);
    });
  }

  /**
   * Function to handle when the edit entry button is pressed
   */
  const handleEditButton = () => {
    router.push({
      pathname: './editEntry',
      params: {
        id: id,
        dateString: date,
      },
    });
  }

  /**
   * Function to handle when the delete entry button is pressed
   */
  const handleDeleteButton = () => {
    console.log("Delete Entry Button Pressed");
    deleteEntry(id).then(() => {
      goBack();
    });
  }

  /**
   * Function to go back to the previous screen
   * Back button and Delete button will call this function
   */
  const goBack = () => {
    router.back();
  }

  /**
   * When the screen is focused, load the entry data
   */
  useFocusEffect(
    useCallback(() => {
      loadEntry();
      console.log("View Entry Page loaded document: ", id)
    }, [])
  );

  return (
    <SafeAreaView style={[styles.overlay, { justifyContent: "flex-start", }]}>
      {/* Header */}
      <View style={viewEntryStyles.headerContainer}>
        <HeaderComponent title={"View Entry"} goBack={goBack} />
        <TouchableOpacity
          onPress={handleEditButton}
          style={viewEntryStyles.editButton}
        >
          <Ionicons name="create" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      {/* Entry Data */}
      <View style={viewEntryStyles.viewTextContainer}>
        <View style={viewEntryStyles.boxComponent}>
          <Text style={styles.whiteText}>Date: </Text>
          <View style={viewEntryStyles.textBox}>
            <Text style={styles.blackText}>{date}</Text>
          </View>
        </View>
        <View style={viewEntryStyles.boxComponent}>
          <Text style={styles.whiteText}>Title: </Text>
          <View style={viewEntryStyles.textBox}>
            <Text style={styles.blackText}>{title}</Text>
          </View>
        </View>
        <View style={[viewEntryStyles.boxComponent, { flexDirection: "column" }]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.whiteText}>Description: </Text>
            {mood === "Happy" ? (
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={30}
                color={"green"}
              />
            ) : mood === "Neutral" ? (
              <MaterialCommunityIcons
                name="emoticon-neutral-outline"
                size={30}
                color={"yellow"}
              />
            ) : (
              <MaterialCommunityIcons
                name="emoticon-sad-outline"
                size={30}
                color={"red"}
              />
            )}
          </View>
          <ScrollView style={viewEntryStyles.entryBox}>
            <Text style={styles.blackText}>{textEntry}</Text>
          </ScrollView>
        </View>
      </View>
      {/* Delete Entry Button */}
      <View style={viewEntryStyles.buttonContainer}>
        <ConfirmButton title={"Delete Entry"} handlePress={handleDeleteButton} />
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    position: 'absolute',
    right: 5,
    zIndex: 1,
  },
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