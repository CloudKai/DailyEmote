import { color } from '@rneui/base';
import { StyleSheet } from 'react-native'

export const colors = {
  white: '#fff', // Color: White
  black: '#000', // Color: Black
  darkNavy: '#0A0F44', // Color: Dark Navy
  skyBlue: '#1976D2', //Color: Sky Blue
  background: '#161622', //Color: Dark Blue
  secondaryBackground: '#212121', //Color: Dark Gray
  tertiaryBackground: '#303030', // Color: Charcoal
  contrastBackground: '#CFD8DC', //Color: Light Gray
  button: "#6082B6", //Color: Navy Blue
  border: '#2196F3', //Color: Light Blue
  disabled: "#A9A9A9", //Color: Gray 
  red: '#EF0827',
  yellow: '#FCC70B',
  green: '#4FEE57',
  gray: '#6E6E73',
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
    backgroundColor: colors.skyBlue, //Color: Sky Blue
  },
  roundButton: {
    height: 56,
    width: 56,
    borderRadius: 999,
    backgroundColor: colors.skyBlue, //Color: Navy Blue
    marginBottom: 26,
  },
  whiteText: {
    color: colors.white, //Color: White
    fontSize: 20,
  },
  blackText: {
    color: colors.black, //Color: Black
    fontSize: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "400",
  },
  block: {
    backgroundColor: colors.contrastBackground,
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray,
  },
});