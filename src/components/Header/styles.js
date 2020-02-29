import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLeftButton: {
    position: 'absolute',
    left: 20
  },
  headerTitle: {
    fontSize: 20
  }
})

export default styles
