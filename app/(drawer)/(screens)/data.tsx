import { View, Text } from 'react-native'
import { ProfileTab } from '../../../components/ProfileTab';


const data = () => {
  return (
    <View style = {{
        flex: 1,
        backgroundColor: '#161622',
      }}>

        <ProfileTab name = 'Data' />

        <View className = "flex-1 items-center justify-center bg-primary">
            <Text style={{color: 'white'}}> Data Here! </Text>
        </View>
    </View>
  )
}

export default data