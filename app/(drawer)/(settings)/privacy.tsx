import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BackButton from '../../../components/BackButton'
import { colors } from '../../../styleSheets/Styles'

const privacy = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20
    }}>
      <BackButton name = "Privacy"/>
      <Text style = {{color: 'white', alignSelf: 'center'}}>
        privacy
      </Text>
    </View>
  )
}

export default privacy