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
    justifyContent: 'center',
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
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default styles
