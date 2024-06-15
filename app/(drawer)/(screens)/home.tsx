import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '../../../FireBaseConfig';
import { ProfileTab } from '../../../components/ProfileTab';

const home = () => {
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    return (
        <View style = {{
        flex: 1,
        backgroundColor: '#161622',
        }}>

            <ProfileTab name = "Calender" />

            <View style ={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
                <Text  style={{color: 'white'}}>Calender Page!</Text>
            </View>
        </View>
    );
}

export default home;
