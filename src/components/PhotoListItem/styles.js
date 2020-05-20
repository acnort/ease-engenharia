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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80,
    height: 80
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.border
  },
  infoWrapper: {
    padding: 20,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkMain,
    marginBottom: 5
  },
  infoObs: {
    fontSize: 14,
    color: Colors.lightGray
  },
  infoRisk: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.danger,
    marginBottom: 5
  },
  infoRight: {
    alignItems: 'flex-end'
  },
  okIcon: {
    color: Colors.lightMain
  }
})

export default styles
