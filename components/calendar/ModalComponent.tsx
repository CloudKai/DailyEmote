import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors, styles } from '../../styleSheets/Styles';
import ModalList from './modal/modalList';
import { readDateEntry } from '../firestore/FireStoreHandler';

type ModalComponentProps = {
  selectedDate: string,
  closeModal: () => void,
}

export default function ModalComponent({ selectedDate, closeModal }: ModalComponentProps) {
  
  return (
  <View style={modalStyles.modalView}>
    <Text style={[styles.headingText, { marginVertical: 15, color: "white" }]}>
      Selected Date: {selectedDate}
    </Text>
    <View style={modalListStyles.listEntries}>
      <ModalList 
        selectedDate={selectedDate}
        closeModal={closeModal}
      />
      <Text style={{color: 'white'}}>Test</Text>
    </View>
    
  </View>
  );
}

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background, //Color: Dark Blue
  },
  modalView: {
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: colors.secondaryBackground, //Color: Dark Gray
  },
})

const modalListStyles = StyleSheet.create({
  listEntries: {
    width: "90%",
    maxHeight: "80%",
    flexGrow: 1,
    marginVertical: 10,
  },
})