import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../components/HeaderComponent'
import { router } from 'expo-router';
import { colors } from '../../../styleSheets/Styles';

const privacy = () => {

  const goBack = () => {
    router.back();
  };

  return (

    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 10,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        marginVertical: 15,
      }}>
        <HeaderComponent title="Privacy Page" goBack={goBack} />
      </View>
      <Text style={{
        color: 'white',
        textAlign: 'center'
      }}>
        We are not collecting any data from you. {'<3'} 
      </Text>
    </View>

  )

}



export default privacy