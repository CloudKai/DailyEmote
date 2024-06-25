import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../styleSheets/Styles';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function HeaderComponent() {
  return (
    <SafeAreaView style={headerStyles.headerContainer}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={headerStyles.headerButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={headerStyles.headerText}>New Entry</Text>
    </SafeAreaView>
  )
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 3,
  },
  headerButton: {
    padding: 10,
    flex: 1,
    position: 'absolute',
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});