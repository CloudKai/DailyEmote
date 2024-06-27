import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  goBack: () => void;
  goEdit: () => void;
}

export default function HeaderComponent({ goBack, goEdit }: HeaderProps) {
  return (
    <View style={headerStyles.headerContainer}>
      <TouchableOpacity 
        onPress={() => goBack()} 
        style={[headerStyles.backButton, styles.button]}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={headerStyles.headerText}>View Entry</Text>
      <TouchableOpacity
        onPress={() => goEdit()}
        style={[headerStyles.editButton, styles.button]}
      >
        <Ionicons name="create" size={24} color={colors.primary} />
      </TouchableOpacity>
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
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    position: 'absolute',
    right: 5,
    zIndex: 1,
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