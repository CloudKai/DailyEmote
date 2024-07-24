import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { useNavigation } from 'expo-router';
import React from "react";

type ProfileProps = {
  name: string
}

export const ProfileTab = ({ name }: ProfileProps) => {
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const onToggleDrawer =  () => {
      navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style = {{
            flexDirection: 'row',
            paddingTop: 50,
            marginLeft: 20,
          }}>
    
            <Text style = {{ 
              color: '#fff', 
              fontSize: 30,
              flex: 1,
            }}> 
               {name}
            </Text>
    
            <TouchableOpacity onPress={onToggleDrawer}>
              <Image
                style = {{ 
                  width: 55, 
                  height: 55,
                  borderRadius: 55/2,
                  marginRight: 20,
                }}
                source = {{ uri: auth?.currentUser?.photoURL! }}
                />
            </TouchableOpacity>
          </View>
    );
}