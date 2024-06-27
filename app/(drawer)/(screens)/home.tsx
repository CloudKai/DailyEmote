import { View, Button, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { ProfileTab } from "../../../components/ProfileTab";
import { colors, styles } from "../../../styleSheets/Styles";
import { useEffect, useState } from "react";
import CalendarComponent from "../../../components/calendar/CalendarComponent";
import ModalComponent from "../../../components/calendar/ModalComponent";

/**
 * The `homeV2` function in TypeScript React sets up a calendar view with a modal that can be opened
 * and closed.
 * @returns A calendar view with a modal that can be opened and closed.
 */
const homeV2 = () => {
  const [selectedDate, setSelectedDate] = useState<string>(""); //Format: "YYYY-MM-DD"
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
    console.log("Modal opened");
  };

  const closeModal = () => {
    setModalVisible(false);
    console.log("Modal closed");
  };

  return (
    <View style={styles.overlay}>
      <ProfileTab name="Calendar" /> 

      <View style={homeV2_Styles.component_overlay}>
        <CalendarComponent 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          openModal={openModal}
        />
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Back Button pressed");
            closeModal();
          }}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={homeV2_Styles.modalOverlay}>
              <TouchableWithoutFeedback>
                  <ModalComponent selectedDate={selectedDate} closeModal={closeModal}/>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default homeV2;

const homeV2_Styles = StyleSheet.create({
  component_overlay: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});