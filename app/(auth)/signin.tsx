import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { styles } from '../../styleSheets/Styles';
import { useEffect, useState } from 'react';
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
   * Check if user is logged in
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push({pathname: '../(drawer)/(screens)/home'});
      }
    })

    return unsubscribe;
  }, [])

  /**
   * function when 'Login' Button is pressed
  */
  const logIn = async () => {

    setLoading(true);
    
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in with:', response.user?.email);

    } catch (error: any) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)')) {
        Alert.alert('Invalid email', 'Re-enter a valid email');
      } else if (msg.includes('(auth/invalid-credential)')) {
        Alert.alert('Invalid credentials', 'Wrong credentials');
      } else {
        Alert.alert(msg);
      }

    } finally { 
      setLoading(false);
    }
  }

  /**
   * UI Design
  */
  return (
    <View className = "flex-1 items-center justify-center bg-primary">
      <KeyboardAvoidingView behavior="padding">
        <Text style={{fontWeight: "bold", textAlign: 'center', color: 'white', fontSize: 30, marginBottom: 50}}>
          DailyEmote
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
          secureTextEntry={true} />

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

                <Text style = {{color: '#FF0'}} 
                    onPress={() => {router.navigate("/signup") }}>
                  Sign Up
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
