import BoxedIcon from '../../../components/BoxedIcon';
import { styles, colors } from '../../../styleSheets/Styles';
import { Ionicons } from '@expo/vector-icons'
import { View, ScrollView, Text, FlatList, Button } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const mainSetting = () => {
  const router = useRouter();

  const items = [
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
      route: '/privacy',
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: colors.red,
      route: '/notification',
    },

  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: colors.green,
      route: '/help',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 50 }}>
        <View style = {{paddingLeft: 10}}>
            <Text style = {{ color: 'white', fontSize: 30 }}> Settings </Text>
        </View>

      <ScrollView
        contentInsetAdjustmentBehavior = "automatic"
        contentContainerStyle = {{ paddingBottom: 40 }}>

        <View style = {styles.block}>
          <FlatList
            data = {items}
            scrollEnabled = {false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={ () => {router.push(item.route!)}}>
                <View style={styles.item}>
                    <BoxedIcon  name={item.icon} backgroundColor={item.backgroundColor} />

                    <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </View>
            </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={ () => {router.push(item.route!)}}>
                <View style={styles.item}>
                  <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                  <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style = {{
          borderRadius: 50,
          padding: 10,
          paddingTop: 20,
          }}>
            <Button 
                title = 'Back' 
                onPress={router.back}
            />
        </View>
      </ScrollView>
    </View>
  );
};

export default mainSetting;