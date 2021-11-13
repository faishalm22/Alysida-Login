import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Buttons, Gap} from '../../components/atoms';
import {BackIcon} from '../../assets';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useDispatch, useSelector} from 'react-redux';
import {verifyAction} from '../../redux/action';

const CheckEmailToken = ({navigation}) => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  const {signUpReducer} = useSelector((state) => state);

  const onSubmit = () => {
    dispatch({type: 'SET_IDENTITY_CODE_SIGN', value: code});

    const data = {
      ...signUpReducer,
    };

    dispatch(verifyAction(data, navigation));
  };

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const onTextChange = (pin) => {
    setCode(pin);
    dispatch({type: 'SET_IDENTITY_CODE_SIGN', value: pin});
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleGoTo('SignUp')}>
          <Image source={BackIcon} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Check your email</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                We have sent a verify account instruction to
              </Text>
              <Text style={styles.subtitleEmail}>{signUpReducer.identity}</Text>
            </View>
          </View>
          <Gap height={20} />
          {/* <View style={styles.verifyContainer}> */}
          <SmoothPinCodeInput
            keyboardType="numeric"
            containerStyle={styles.verifyContainer}
            codeLength={6}
            cellStyleFocused={styles.cellFocused}
            cellStyle={styles.numberInput}
            value={code}
            onTextChange={(pin) => onTextChange(pin)}
          />
          {/* </View> */}
          <Gap height={20} />
          <Text style={styles.subtitle}>
            Did not receive the email? Check your spam filter, or{' '}
            <Text style={styles.subtitleEmail}> try another email address</Text>
          </Text>
          <Gap height={40} />
          <Gap height={40} />
          <Buttons
            text="Verify Email"
            backgroundcolor="#0c8eff"
            textcolor="white"
            onPress={onSubmit}
          />
          <Gap height={100} />
          <View style={styles.helpWrapper}>
            <Text
              style={styles.textInner}
              onPress={() => handleGoTo('WelcomeAuth')}>
              Need more help?
            </Text>
          </View>
          <Gap height={100} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckEmailToken;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 40,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  main: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flex: 1,
  },
  iconBack: {
    width: 20,
    height: 20,
  },
  titleText: {
    fontSize: 25,
    fontFamily: 'SarabunExtraBold',
    textAlign: 'center',
  },
  title: {
    paddingHorizontal: 25,
  },
  subtitleContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  subtitle: {
    fontFamily: 'SarabunRegular',
    fontSize: 15,
    textAlign: 'center',
    color: '#6e6e6e',
  },
  subtitleEmail: {
    marginTop: -8,
    fontFamily: 'SarabunRegular',
    fontSize: 15,
    textAlign: 'center',
    color: '#0c8eff',
  },
  verifyContainer: {
    height: 80,
    width: '100%',
  },
  numberInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#80979797',
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  helpWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    fontSize: 14,
  },
  textInner: {
    fontFamily: 'SarabunMedium',
    marginLeft: 5,
    color: '#0c8eff',
  },
  cellFocused: {
    borderColor: '#0c8eff',
    borderWidth: 2,
  },
});
