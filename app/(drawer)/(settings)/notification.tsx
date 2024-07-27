import React, { useState } from 'react';
import { View, Text, Switch, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../../../styleSheets/Styles';
import HeaderComponent from '../../../components/HeaderComponent';
import { router } from 'expo-router';

export default function Notifications() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderComponent title="Notifications" goBack={goBack} />
      </View>
      <View style={styles.content}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
});
