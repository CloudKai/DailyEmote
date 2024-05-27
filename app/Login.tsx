import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  /**
   * function when 'Login' Button is pressed
   */
  const logIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // router.replace('./home');
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message)
    } finally { 
      setLoading(false);
    }
  }

  /**
   * function when 'Sign Up' Button is pressed
   */
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your email!');
      // router.replace('./home');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
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
          secureTextEntry={true}/>

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            <Button title="Login" onPress={logIn}/>
            <Button title="Sign Up" onPress={signUp}/>
            {/* <Button title="Forgot Password" onPress={resetPassword}/> */}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

// import { View, Text } from 'react-native'
// import React from 'react'

// const Login = () => {
//   return (
//     <View>
//       <Text>Login</Text>
//     </View>
//   );
// }

// export default Login;