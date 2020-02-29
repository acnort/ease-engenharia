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
    flexBasis: '70%'
  },
  form: {
    flexBasis: '30%'
  },
  background: {
    position: 'absolute',
    backgroundColor: Colors.white,
    flex: 0,
    top: '65%',
    height: windowHeight * 1.2,
    width: windowHeight * 1.2,
    borderRadius: windowHeight * 1.2
  }
})

export default styles
