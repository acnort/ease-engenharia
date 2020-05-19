import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    flexGrow: 1
  },
  button: {
    backgroundColor: Colors.danger,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lastButton: {
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: Colors.darkMain,
    height: 54,
    fontSize: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.white
  },
  icon: {
    color: Colors.white
  },
  lastIcon: {
    color: Colors.white
  }
})

export default styles
