import { StyleSheet } from 'react-native';
import Colors from '~/utils/colors';

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.softBg,
    borderStyle: 'dashed',
    borderColor: Colors.lightMain,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listItemText: {
    fontWeight: '700',
    color: Colors.lightMain,
    fontSize: 14
  },
  icon: {
    color: Colors.lightMain
  }
})

export default styles
