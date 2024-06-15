import { View, Text } from 'react-native'
import React from 'react'

const create = () => {
  return (
    <View className = "flex-1 items-center justify-center bg-primary">
      <Text style={{color: 'white'}}> Create Post Here! </Text>
    </View>
  )
}

export default create