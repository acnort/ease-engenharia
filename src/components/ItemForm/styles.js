import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'flex-start'
  },
  input: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderRadius: 4,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 10
  },
  button: {
    borderRadius: 4,
    backgroundColor: Colors.darkMain,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: Colors.white
  },
  subtitle: {
    textAlign: 'left',
    marginBottom: 15
  }
})

export default styles
