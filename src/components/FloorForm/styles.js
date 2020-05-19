import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  input: {
    backgroundColor: Colors.white,
    // borderBottomLeftRadius: 100,
    // borderTopLeftRadius: 100,
    height: 80,
    fontSize: 16,
    paddingHorizontal: 20,
    flexGrow: 1
  },
  button: {
    backgroundColor: Colors.white,
    height: 80,
    fontSize: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
  lastButton: {
    // borderBottomRightRadius: 100,
    // borderTopRightRadius: 100,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    backgroundColor: Colors.white,
    height: 80,
    fontSize: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.danger,
  },
  icon: {
    color: Colors.danger
  },
  lastIcon: {
    color: Colors.lightMain
  }
})

export default styles
