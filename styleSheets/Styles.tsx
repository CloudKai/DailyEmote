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
  overlay: {
    flex: 1,
    backgroundColor: colors.background, //Color: Dark Blue
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textInput: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: colors.primary, //Color: White
    fontSize: 15,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "400",
  },
  textBox: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: colors.secondaryBackground, //Color: Dark Gray
  }
});
