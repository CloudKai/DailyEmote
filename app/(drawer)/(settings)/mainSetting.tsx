import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const mainSetting = () => {
    const router = useRouter();
    
    const onToogleReturn = () => {
        router.back();
      };

    return (
        <View style = {{ 
            flex: 1, 
            backgroundColor: '#161622', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <Text style={{color: "#fff"}}> Setting Page </Text>
            <Button title='Go Back' onPress={onToogleReturn}/>
        </View>
    )
}

export default mainSetting