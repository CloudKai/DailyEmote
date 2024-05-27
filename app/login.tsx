import { getAuth } from 'firebase/auth';
import { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/globalStyles';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useRouter } from 'expo-router';
import React from 'react';

/**
 * Log-in page that will be displayed when app is first opened.
 * @returns Login Page UI components
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  /**
   * layout formatter of the header
   */
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Login',
    });
  }, [navigation]);

  /**
   * function when 'Login' Button is pressed
   */
  const logIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response);
      router.replace('./home');
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
      router.replace('./home');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

export default Login;