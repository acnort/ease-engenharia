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
    color: Colors.lightGray
  },
  icon: {
    color: Colors.darkMain
  },
  menu: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border
  },
  menuItem: {
    flex: 1,
    backgroundColor: Colors.softBg,
    height: 50,
    justifyContent: 'center'
  },
  menuItemText: {
    textAlign: 'center'
  }
})

export default styles
