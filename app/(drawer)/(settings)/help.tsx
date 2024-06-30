import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BackButton from '../../../components/BackButton'
import { colors } from '../../../styleSheets/Styles'

const help = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20
    }}>
      <BackButton name="Contact Info" />
      
        <Text style = {{color: 'white', alignSelf: 'center'}}>No Help</Text>
      </View>

  )
}

export default help