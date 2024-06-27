import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../styleSheets/Styles';
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
        style={headerStyles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={headerStyles.headerText}>New Entry</Text>
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
    color: colors.primary,
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
    height: 56,
    width: 56,
    borderRadius: 999,
    backgroundColor: "#6082B6",
    marginBottom: 26,
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
});