import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { styles } from '../../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useRouter } from 'expo-router';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  /**
   * function when 'Login' Button is pressed
   */
  const logIn = async () => {

    setLoading(true);
    
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      router.navigate('/home');
    } catch (error: any) {
      //console.log(error);
      Alert.alert('Sign in failed: ' + error.message)
    } finally { 
      setLoading(false);
      this.textInput.clear();
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={{fontWeight: "bold", textAlign: 'center', color: 'white', fontSize: 30, marginBottom: 50}}>
          EmoteDaily
        </Text>

        <TextInput 
          value={email} 
          style={styles.textInput} 
          placeholder='Email' 
          onChangeText={(text) => setEmail(text)}/>

        <TextInput
          value={password} 
          style={styles.textInput} 
          placeholder='Password' 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} 
          ref={input => { this.textInput = input }} />

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            <View style={{marginVertical: 15}}>
              <Button  title="Login" onPress={logIn}/>
            </View>

            <View style={{marginVertical: -5}}>
              <Text style={{color: 'white', fontSize: 17, textAlign: 'center'}}>
                Don't have an account? {" "}

                <Text style = {{textDecorationLine: 'underline', marginLeft: 50, color: '#FF0' }} 
                    onPress={() => {router.navigate("/signup") }}>
                  sign up
                </Text>

              </Text>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default signin;
