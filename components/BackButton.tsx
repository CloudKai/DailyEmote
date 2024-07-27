import { useRouter } from 'expo-router'
import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../styleSheets/Styles'

export default function BackButton({ name }: { name: string }) {
  const router = useRouter();
  
  return (
    <View style = {{
      marginTop: 15,
      marginHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style = {{
          position: 'absolute',
          left: 0,
          zIndex: 1,
        }}
        testID="back-button"
      >
        <MaterialIcons 
          name = 'keyboard-arrow-left'
          size = {30}
          color= {colors.gray}
          testID="back-icon"
        /> 
      </TouchableOpacity>

      <Text style = {{ 
        fontSize: 20, 
        color: colors.gray,
        fontWeight: 'bold'
      }}> 
        {name} 
      </Text>
    </View>
  )
}
