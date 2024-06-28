import { router } from 'expo-router'
import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../styleSheets/Styles'

function BackButton(props: any) {
  return (
    <View style = {{
      marginTop: 10,
      marginHorizontal: 10,
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
          size = {25}
          color= {colors.gray}
        /> 
      </TouchableOpacity>

      <Text style = {{ 
        fontSize: 20, 
        color: colors.gray 
      }}> 
        {props.name} 
      </Text>
    </View>
  )
}

export default BackButton