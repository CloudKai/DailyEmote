import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BackButton from '../../../components/BackButton'
import { colors } from '../../../styleSheets/Styles'

const notification = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20
    }}>
      <BackButton name = "Notification"/>
      <Text style = {{color: 'white', alignSelf: 'center'}}>
        notification
      </Text>
    </View>
  )
}

export default notification