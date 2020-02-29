import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    maxWidth: 300,
    width: '100%',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 100,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 10
  },
  button: {
    borderRadius: 100,
    backgroundColor: Colors.darkMain,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: Colors.white
  }
})

export default styles
