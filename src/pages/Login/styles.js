import { StyleSheet, Dimensions } from 'react-native';
import Colors from '~/utils/colors'

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkMain
  },
  logo: {
    width: windowHeight / 8,
    height: '55%',
    flexGrow: 0,
    flexShrink: 0
  },
  form: {
    height: '45%',
    flexGrow: 0,
    flexShrink: 0,
    marginTop: '15%',
    width: '100%',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    backgroundColor: Colors.white,
    flex: 0,
    top: '55%',
    height: windowHeight * 1.2,
    width: windowHeight * 1.2,
    borderRadius: windowHeight * 1.2
  }
})

export default styles
