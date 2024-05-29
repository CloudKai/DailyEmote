import { Alert, View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { styles } from '../../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useRouter } from 'expo-router';


const signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  const auth = FIREBASE_AUTH;

  /**
   * function when 'Sign Up' Button is pressed
   */
  const signUp = async () => {
    if (username === "" || email === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password); 
      Alert.alert('Check your email!');
      router.replace("/index");
      
    } catch (error: any) {
      console.log(error);
      //alert('Sign up failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        
        <TextInput 
          value={username} 
          style={styles.textInput} 
          placeholder='Enter Username' 
          onChangeText={(text) => setUsername(text)}/>

        <TextInput 
          value={email} 
          style={styles.textInput} 
          placeholder='Enter Email' 
          onChangeText={(text) => setEmail(text)}/>

        <TextInput 
          value={password} 
          style={styles.textInput} 
          placeholder='Enter Password' 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}/>

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            <View style={{marginVertical: 5}}>
              <Button title="Sign Up" onPress={signUp}/>
            </View>

            <View style={{marginVertical: 5}}>
              <Button title="Back" onPress={() => router.navigate('/signin')}/>
              </View>
          </>
        )}
        <Text style={{textDecorationLine: 'underline', textAlign: 'center', color: 'white', fontSize: 15, paddingTop: 10}}
            onPress={() => router.navigate('/tnc')}>
          Terms and Conditions apply
        </Text>

      </KeyboardAvoidingView>
    </View>
  );
};

export default signup;