import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors'

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  content: {
    height: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 100,
    backgroundColor: 'navy',
  },
  buttonText: {
    color: 'white',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 200,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15
  },
  icon: {
    color: Colors.lightMain
  }
})

export default styles
