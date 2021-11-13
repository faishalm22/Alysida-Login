import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GoogleIcon} from '../../../assets';

const ButtonGoogle = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <GoogleIcon style={styles.icons} />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonGoogle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#80979797',
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  text: {
    // backgroundColor: 'yellow',
    fontSize: 14,
    fontFamily: 'RobotoMedium',
    color: '#757575',
    textAlign: 'center',
  },
});
