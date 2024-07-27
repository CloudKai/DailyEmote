import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export type BoxedIconProps = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  backgroundColor: string;
};

const BoxedIcon = ({ name, backgroundColor }: BoxedIconProps) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 6 }} testID="boxed-icon-view">
      <Ionicons name={name} size={22} color={'#fff'} testID="boxed-icon" />
    </View>
  );
};

export default BoxedIcon;
