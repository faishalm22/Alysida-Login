import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput as TextInputRN,
  Image,
} from 'react-native';

const TextInput = ({label, placeholder, ...restProps}) => {
  const [isFocused, setIsFocused] = useState();
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={isFocused ? styles.containerFocus : styles.container}>
        <TextInputRN
          style={styles.input}
          placeholder={placeholder}
          {...restProps}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'RobotoRegular',
    color: '#22262f',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#80979797',
    borderRadius: 20,
    paddingLeft: 15,
  },
  containerFocus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 20,
    paddingLeft: 15,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: '#22262f',
  },
});
