import { Image, View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { styles } from '../../styleSheets/Styles';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

const signInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  /**
   * Check if user is logged in
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.replace({pathname: '../(drawer)/(screens)/home'});
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
        <Image 
          testID = 'logo'
          accessibilityRole="image"
          source = { require('../../assets/AppIcon.png') }
          style = {{ 
            marginTop: -60, 
            width: 300, 
            height: 200, 
            resizeMode: 'contain' 
          }}
        />

        <TextInput 
          testID = 'emailTextBox'
          value={email} 
          style={styles.textInput} 
          placeholder='Email' 
          onChangeText={(text) => setEmail(text)}/>

        <TextInput
          testID = 'pwdTextBox'
          value={password} 
          style={styles.textInput} 
          placeholder='Password' 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} />

        { loading ? (
          <ActivityIndicator testID='loadingIndicator' size="large" color="#0000ff"/>
        ) : (
          <View>
            <View style={{marginVertical: 15}}>
              <Button 
                testID = "loginButton" 
                title="Login" 
                onPress={logIn}
              />
            </View>

            <View style={{marginVertical: -5}}>
              <Text style={{
                color: 'white', 
                fontSize: 17, 
                textAlign: 'center'
              }}>
                Don't have an account? {" "}

                <Text 
                  testID = "signUpButton"
                  style = {{color: '#FF0'}}  
                  onPress={() => {router.navigate("/signup") }}
                >
                  Sign Up
                </Text>

              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default signInPage;
