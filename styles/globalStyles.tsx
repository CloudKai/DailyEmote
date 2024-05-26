import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  }
});

export default globalStyles;