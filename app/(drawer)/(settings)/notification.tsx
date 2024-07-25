import { View, Text } from 'react-native'
import { useState } from 'react'
import { colors } from '../../../styleSheets/Styles'
import { BackButton } from '../../../components/BackButton'
import { Button } from '@rneui/base'
import React from 'react'
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const notification = () => {
  const [isNotification, setIsNotification] = useState(false);

  const setNotifcation = () => {
    setIsNotification(true);
  }

  const notificationSent = () => {
    if(isNotification) {

    }
  }

  return (
    <View style = {{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 30
    }}>
      <BackButton name= 'Notifications' />
      
      <Button 
      title={"On Notifications"} 
      onPress={setNotifcation}/>
    </View>
  )
}

export default notification