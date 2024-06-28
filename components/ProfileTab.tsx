import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from "react";

export const ProfileTab = (props: any) => {
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(auth?.currentUser?.photoURL!);
    
    useEffect(()=> {
      setSelectedImage(props.icon ? props.icon : auth?.currentUser?.photoURL!);
    }, [])

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
               {props.name}
            </Text>
    
            <TouchableOpacity onPress={onToggleDrawer}>
              <Image
                source = {{ uri: selectedImage }}
                style = {{ 
                  width: 55, 
                  height: 55,
                  borderRadius: 55/2,
                  marginRight: 20,
                }}/>
            </TouchableOpacity>
          </View>
    );
}