import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors, styles } from '../../styleSheets/Styles';
import ModalList from './modal/modalList';

type ModalComponentProps = {
  closeModal: () => void;
  selectedDate: string;
}

export default function ModalComponent({ closeModal, selectedDate }: ModalComponentProps) {

  return (
  <View style={modalStyles.modalView}>
    <Text style={[styles.headingText, { marginVertical: 15, color: "white" }]}>
      Selected Date: {selectedDate}
    </Text>
    <ModalList 
      closeModal={closeModal}
      selectedDate={selectedDate}
    />
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