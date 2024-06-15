import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export const ProfileTab = (props: any) => {
    const navigation = useNavigation();

    const onToggleDrawer =  () => {
        navigation.dispatch(DrawerActions.openDrawer());
      };

    return (
        <View style = {{
            flexDirection: 'row',
            paddingTop: 50,
            marginLeft: 20,
          }}>
    
            <Text style = {{ 
              color: '#fff', 
              fontSize: 30,
              flex: 1,
            }}> 
               {props.name}
            </Text>
    
            <TouchableOpacity onPress={onToggleDrawer}>
              <Image
                source = {{ uri: 'https://t4.ftcdn.net/jpg/00/23/72/59/360_F_23725944_W2aSrg3Kqw3lOmU4IAn7iXV88Rnnfch1.jpg' }}
                style = {{ 
                  width: 55, 
                  height: 55, 
                  borderRadius: 55/2,
                  marginRight: 20,
                }}/>
            </TouchableOpacity>
          </View>
    );
}