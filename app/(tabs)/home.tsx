import { View, Text, Button } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { styles } from '../../styleSheets/Styles';

const home = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    console.log('logged out');
    router.navigate("/signin");
  };

  return (
    <View style={styles.container}>
      <Text  style={{color: 'white'}}>Home Page!</Text>
      <Button title="Sign Out" onPress={handleLogout}/>
      {/* <Button title="Sign Out" onPress={handleLogout} />*/}
    </View>
  );
}

export default home;