import { TouchableOpacity, Image, ScrollView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FireBaseConfig';
import { colors, styles } from '../../../styleSheets/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { EmailAuthCredential, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@rneui/base';
import { router } from 'expo-router';

const name = () => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;



  const [passwordVisibility, setPasswordVisibility] = useState(true);  
  const [rightIcon, setRightIcon] = useState('eye-outline');  

  const handlePasswordVisibility = () => {  
    if (rightIcon === 'eye-outline') {  
        setRightIcon('eye-off-outline');  
        setPasswordVisibility(!passwordVisibility);  
    } else if (rightIcon === 'eye-off-outline') {  
        setRightIcon('eye-outline');  
        setPasswordVisibility(!passwordVisibility);  
    }  
  };    

  const [userImage, setUserImage] = useState<any>();
  const [userName, setUserName] = useState<any>();
  const [userEmail, setUserEmail] = useState<any>();
  const [userPassword, setUserPassword] = useState<any>();
  const [userOldPassword, setUserOldPassword] = useState<any>();

  const getUser = async () => {
    const docRef = doc(FIREBASE_DB, "users", auth.currentUser?.uid!);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setUserImage(docSnap.get('avatar'));
      setUserName(docSnap.get('username'));
      setUserEmail(docSnap.get('email'));
      setUserPassword(docSnap.get('password'));
      setUserOldPassword(docSnap.get('password'));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getUser();
  }, [])
  
  const handleUpdate = async () => {
    await updateProfile(user!, {
      displayName: userName,
      photoURL: userImage,
    });

    await updateDoc(doc(FIREBASE_DB, "users", user?.uid!), {
      username: userName,
      email: userEmail,
      password: userPassword,
      userID: auth.currentUser?.uid,
      avatar: userImage,
    });

    this.textInput.clear()

    if (userPassword != userOldPassword || user?.email! != userEmail){
      try {
        const credential = EmailAuthProvider.credential(
          user?.email!,
          userOldPassword
        );

        reauthenticateWithCredential(user!, credential)
          .then(async () => {
            updateEmail(user!, userEmail);
            updatePassword(user!, userPassword);
            await auth.signOut();
            // console.log('logged out');
            router.navigate("/signin");
          });
        } catch (error) {
          // console.log(error.message);
        }
    }
    
  }

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1
    })
    // console.log(result);

    if(!result.canceled){
      const uri = result.assets[0].uri;
      setUserImage(uri);
    }
  }

  function checkImageURL(URL: string | URL | Request) {
    fetch(URL)
      .then((res) => {
        if (res.status == 404) {
          return setUserImage(userImage);
        } else {
          return setUserImage(URL);
        }
      })
      .catch((error) => {
        return setUserImage(userImage);
      });
  }

  return (
      <SafeAreaView style = {{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 10,
      }}>
        <BackButton name = "Edit Profile"/>

        <ScrollView>
          <View style = {{
            alignItems: "center",
            marginVertical: 22,
          }}>
            <TouchableOpacity
              onPress={handleImageSelection}
            >
              <Image
                source = {{ uri: userImage }}
                style = {{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: '#FFF',
                }}
              />

              <View style = {{
                position: 'absolute',
                bottom: 0,
                right: 10,
                zIndex: 9999
              }}>
                <MaterialIcons
                  name = 'photo-camera'
                  size = {32}
                  color = {colors.skyBlue}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View style = {{
              flexDirection: 'column',
              marginBottom: 6
            }}>
              <Text style = {{fontSize: 10, color: 'white' }}>Name</Text>
              <View style = {{
                height: 44,
                width: '100%',
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8
              }}>
                <TextInput
                  style = {{ color: 'white'}}
                  value = {userName}
                  onChangeText = {(value: any) => setUserName(value)}
                  editable= {true}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style = {{
              flexDirection: 'column',
              marginBottom: 6
            }}>
              <Text style = {{fontSize: 10, color: 'white' }}>Email</Text>
              <View style = {{
                height: 44,
                width: '100%',
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8
              }}>
                <TextInput
                  style = {{ color: 'white'}}
                  value = {userEmail}
                  onChangeText = {(value: any) => setUserEmail(value)}
                  editable= {true}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style = {{
              flexDirection: 'column',
              marginBottom: 6
            }}>
              <Text style = {{fontSize: 10, color: 'white' }}>Password</Text>
              <View style = {{
                height: 44,
                width: '100%',
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                paddingLeft: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}>


                <TextInput
                  style = {{ color: 'white', flex: 1,}}
                  value = {userPassword}
                  onChangeText = {(value: any) => setUserPassword(value)}
                  editable= {true}
                  autoCorrect={false}
                  secureTextEntry ={passwordVisibility}
                />

                <TouchableOpacity
                  onPress={handlePasswordVisibility}>
                  <Ionicons 
                    name = {rightIcon} 
                    size={25} 
                    color={'#fff'} 
                    style = {{paddingRight: 10}}
                  />
                </TouchableOpacity>
              </View>

            <View style = {{
              flexDirection: 'column',
              marginBottom: 6,
              paddingTop: 6
            }}>
              <Text style = {{fontSize: 10, color: 'white' }}>Image URL</Text>
              <View style = {{
                height: 44,
                width: '100%',
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8
              }}>
                <TextInput
                  style = {{ color: 'white'}}
                  ref = {input => this.textInput = input}
                  placeholder = 'Enter Image URL'
                  placeholderTextColor = "#fff" 
                  onChangeText = {(value: any) => checkImageURL(value)}
                  editable= {true}
                  autoCorrect={false}
                />
              </View>
            </View>

            </View>

            <Button 
              title={'Update Info'} 
              onPress={handleUpdate}
              style = {styles.button}
            />

            <Text style={{
              color: colors.yellow, 
              alignSelf: 'center', 
              paddingTop: 10,
            }}>
              *Changing Email or Password requires a relogin
            </Text>

          </View>
        </ScrollView>
      </SafeAreaView>
  )
  
}

export default name