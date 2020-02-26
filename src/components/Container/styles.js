import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white
  },
  content: {
    height: '100%',
    backgroundColor: Colors.lightBg,
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
