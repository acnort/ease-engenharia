import { StyleSheet } from 'react-native';

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
  }
})

export default styles
