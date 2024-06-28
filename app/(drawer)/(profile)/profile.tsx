import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const name = () => {
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
            <Text style={{color: "#fff"}}> Name Page </Text>
            <Button title='Go Back' onPress={onToogleReturn}/>
        </View>
    )
}

export default name