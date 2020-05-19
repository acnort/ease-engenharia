import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  listItem: {
    width: '100%',
    padding: 20,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkMain
  },
  listItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightGray
  }
})

export default styles
