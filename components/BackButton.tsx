import { useRouter } from 'expo-router'
import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../styleSheets/Styles'

function BackButton(props: any) {
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
        }}
      >
        <MaterialIcons 
          name = 'keyboard-arrow-left'
          size = {30}
          color= {colors.gray}
        /> 
      </TouchableOpacity>

      <Text style = {{ 
        fontSize: 20, 
        color: colors.gray,
        fontWeight: 'bold'
      }}> 
        {props.name} 
      </Text>
    </View>
  )
}

export default BackButton