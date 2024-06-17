import { StyleSheet } from 'react-native'

export const colors = {
  primary: '#fff', // Color: White
  secondary: '#FAFAFA', // Color: White Smoke
  tertiary: '#0A0F44', // Color: Dark Navy
  accent: '#1976D2', //Color: Sky Blue
  background: '#161622', //Color: Dark Blue
  secondaryBackground: '#212121', //Color: Dark Gray
  tertiaryBackground: '#303030', // Color: Charcoal
  contrastBackground: '#CFD8DC', //Color: Light Gray
  button: "#6082B6", //Color: Navy Blue
  border: '#2196F3', //Color: Light Blue
  shadow: '#000', //Color: Black
  disabled: "#A9A9A9", //Color: Gray 
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  textInput: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});
