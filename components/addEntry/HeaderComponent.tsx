import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  goBack: () => void;
}

export default function HeaderComponent({ goBack }: HeaderProps) {
  return (
    <View style={headerStyles.headerContainer}>
      <TouchableOpacity 
        onPress={() => goBack()} 
        style={[headerStyles.backButton, styles.button]}
      >
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>
      <Text style={headerStyles.headerText}>Add Entry</Text>
    </View>
  )
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerButton: {
    position: 'absolute',
    left: 0,
    padding: 15,
  },
  backButton:{
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
});