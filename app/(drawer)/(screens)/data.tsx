import { View, Text } from 'react-native'
import { ProfileTab } from '../../../components/ProfileTab';
import React from 'react';

const data = () => {
  return (
    <View
      style={
        styles.overlay
      }
    >
      <ProfileTab name="Data" />

      <View className="flex-1 items-center justify-center bg-primary">
        <Text style={{ color: "white" }}> Data Here! </Text>
      </View>
    </View>
  );
};

export default data;
