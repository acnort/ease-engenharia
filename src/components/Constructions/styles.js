import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 20
  },
  listItem: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
})

export default styles
