import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { FIREBASE_AUTH } from "../FireBaseConfig";
import { useRouter } from 'expo-router';
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'
import React from "react";
import { colors } from "../styleSheets/Styles";


export default function CustomDrawerContent(props: any) {
    const auth = FIREBASE_AUTH;
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();
    const name = auth.currentUser;

    const handleLogout = async () => {
    await auth.signOut();
    console.log('logged out');
    router.navigate("/signin");
    };
    
    return (
        <View style= {{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled = {false} 
                contentContainerStyle= {{ backgroundColor: '#dde3fe', paddingTop: top }}>
                
                <View style = {{ paddingTop: 40 }}>
                    <Image
                        source = {{ uri: auth?.currentUser?.photoURL!}}
                        style = {{ width: 100, height: 100, borderRadius: 100/2, alignSelf: 'center' }}
                    />
                
                    <Text
                        style = {{
                            alignSelf: 'center',
                            fontWeight: '500',
                            fontSize: 18,
                            paddingTop: 10,
                            paddingBottom: 10,
                            color: '#5363df',
                        }}>
                            {name?.displayName}
                    </Text>
                </View>

            <View style = {{ backgroundColor: '#fff', paddingTop: 10}}>
                <DrawerItemList {...props}/>
                <DrawerItem 
                    label = {'Logout'} 
                    onPress = {handleLogout}
                    labelStyle = {{fontSize: 14, marginLeft: -20}}
                    icon= {({focused, color, size }) => (
                        <Ionicons 
                            name = "exit-outline" 
                            size = {size} 
                            color = {color} 
                        />
                    )}
                />
            </View>
            </DrawerContentScrollView>

            <View 
                style = {{
                    borderTopColor: '#dde3fe',
                    borderTopWidth: 1,
                    padding: 20,
                    paddingBottom: 20 + bottom,
                    backgroundColor: colors.yellow
                }}>
                <Text style = {{fontSize: 15}}> DailyEmote </Text>
            </View>
        </View>
    );
}