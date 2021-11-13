import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';

export default function Buttons({
  onPress,
  text,
  textcolor,
  backgroundcolor,
  ...touchProps
}) {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#0c8eff', // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal(backgroundcolor), // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };

  return (
    <View>
      <TouchableHighlight onPress={onPress} {...touchProps}>
        <Text style={styles.text(textcolor)}>{text}</Text>
      </TouchableHighlight>
    </View>
  );
}

var styles = StyleSheet.create({
  btnNormal: (backgroundcolor) => ({
    backgroundColor: backgroundcolor,
    borderRadius: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#80979797',
    justifyContent: 'center',
    height: 40,
  }),
  btnPress: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#80979797',
    justifyContent: 'center',
    height: 40,
  },
  text: (textcolor) => ({
    fontSize: 14,
    fontFamily: 'RobotoMedium',
    color: textcolor,
    textAlign: 'center',
  }),
});
