import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from '../styleSheets/Styles';

type HeaderProps = {
  title: string;
  goBack: () => void;
}

export default function HeaderComponent({ title, goBack }: HeaderProps) {
  return (
    <View style={headerStyles.headerContainer}>
      <TouchableOpacity 
        onPress={() => goBack()} 
        style={headerStyles.backButton}
        testID="back-button"
      >
        <MaterialIcons 
          name="keyboard-arrow-left" 
          size={24} 
          color={colors.gray} 
        />
      </TouchableOpacity>
      <Text style={headerStyles.headerText}>{title}</Text>
    </View>
  );
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
    color: colors.gray,
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