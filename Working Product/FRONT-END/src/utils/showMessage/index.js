import {showMessage as showToast} from 'react-native-flash-message';
import {View, Button, StyleSheet} from 'react-native';

export const showMessage = (message, type) => {
  return showToast({
    message,
    type: type === 'success' ? 'success' : 'danger',
    backgroundColor: type === 'success' ? '#0c8eff' : '#e63939',
    style: styles.message,
  });
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 10,
    marginTop: 5,
    width: '90%',
    marginHorizontal: '5%',
  },
});
