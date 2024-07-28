import { Alert, View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { styles } from '../../styleSheets/Styles';
import { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';


const signupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  /**
   * function when 'Sign Up' Button is pressed
   */
  const signUp = async () => {
    if (username === "" || email === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else if (isSelected === false) {
      Alert.alert("Error", "Please agree to our Terms and Agreements");
    } else {
      setLoading(true);

      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        //console.log('response.user :', response?.user);

        //await sendEmailVerification(auth.currentUser!);
        // Alert.alert('Check your email!');

        const userImage = "https://t4.ftcdn.net/jpg/00/23/72/59/360_F_23725944_W2aSrg3Kqw3lOmU4IAn7iXV88Rnnfch1.jpg";
        await updateProfile(auth.currentUser!, {
          displayName: username,
          photoURL: userImage,
        })

        await setDoc(doc(FIREBASE_DB, "users", response?.user?.uid), {
          username,
          email,
          password,
          userID: response?.user?.uid,
          avatar: userImage,
        });
        router.replace('/signin');

      } catch (error: any) {
        let msg = error.message;
        if (msg.includes('(auth/invalid-email)')) {
          Alert.alert('Invalid email', 'Re-enter a valid email');
        } else if (msg.includes('(auth/email-already-in-use)')) {
          Alert.alert('Invalid email', 'This email is already in use');
        } else if (msg.includes('(auth/weak-password)')) {
          Alert.alert('Weak Password', 'Password should be at least 6 characters');
        } else {
          Alert.alert(msg);
        }

      }
      finally {
        setLoading(false);
      }
    }
  }

  /**
   * UI Design
  */
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <KeyboardAvoidingView behavior="padding">
        <Text style={{ fontWeight: "bold", textAlign: 'center', color: 'white', fontSize: 30, marginBottom: 20 }}>
          Create Account
        </Text>

        <TextInput
          value={username}
          style={styles.textInput}
          placeholder='Enter Username'
          onChangeText={(text) => setUsername(text)} />

        {/* <TextInput
          value={avatar}
          style={styles.textInput}
          placeholder='Enter your Image Url (Optional)'
          onChangeText={(text) => setAvatar(text)} /> */}

        <TextInput
          value={email}
          style={styles.textInput}
          placeholder='Enter Email'
          onChangeText={(text) => setEmail(text)} />

        <TextInput
          value={password}
          style={styles.textInput}
          placeholder='Enter Password'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} />

        <View className='flex-row' style={{ marginVertical: 5 }}>
          <CheckBox style={{ alignSelf: 'center' }}
            value={isSelected}
            onValueChange={(newValue) => setSelection(newValue)}
          />

          <Text style={{ marginLeft: 8, textAlign: 'center', color: 'white', fontSize: 15 }}>
            Read our {" "}
          </Text>

          <Text style={{ textDecorationLine: 'underline', textAlign: 'center', color: 'white', fontSize: 15 }}
            onPress={() => router.navigate('/tnc')}>
            Terms and Conditions
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={{ paddingTop: 10, marginVertical: 5 }}>
              <Button title="Sign Up" onPress={signUp} />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Button title="Back" onPress={() => router.navigate('/signin')} />
            </View>
          </>
        )}

      </KeyboardAvoidingView>
    </View>
  );
};

export default signupPage;
