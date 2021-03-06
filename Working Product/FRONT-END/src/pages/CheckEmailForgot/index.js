import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Buttons, Gap} from '../../components/atoms';
import {BackIcon} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {checkTokenAction} from '../../redux/action';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {forgotPasswordAction} from '../../redux/action';


const CheckEmailForgot = ({navigation}) => {
  const [code, setCode] = useState('');
  // console.log(code);
  const dispatch = useDispatch();

  const {forgotReducer} = useSelector((state) => state);

  const onRefresh = () => {

    const data = {
      ...forgotReducer,
    };
    console.log(data);

    dispatch(forgotPasswordAction(data, navigation));
  };

  const onSubmit = () => {
    dispatch({type: 'SET_IDENTITY_CODE', value: code});

    const data = {
      ...forgotReducer,
    };
    
    // console.log(data);
    dispatch(checkTokenAction(data, navigation));
  };

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const onTextChange = (pin) => {
    setCode(pin);
    dispatch({type: 'SET_IDENTITY_CODE', value: pin});
  };
   
    const [counter, SetCounter] = useState(120); 
    const refresh = () => {
      navigation.reset({index: 0, routes: [{name: 'CheckEmailForgot'}]});
 };
    

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleGoTo('ForgotPassword')}>
          <Image source={BackIcon} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Verification Account</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>We have sent verify account to your email. please check your email account to get OTP Code</Text>
              <Text style={styles.subtitleEmail}>{forgotReducer.identity}</Text>
            </View>
          </View>
          <Gap height={20} />
          <SmoothPinCodeInput
            keyboardType="numeric"
            containerStyle={styles.verifyContainer}
            codeLength={4}
            cellStyleFocused={styles.cellFocused}
            cellStyle={styles.numberInput}
            value={code}
            onTextChange={(pin) => onTextChange(pin)}
          />
          <Gap height={20} />
          <Text style={styles.subtitle}>
         <CountDown
            until={counter}
            size={15}
            onFinish={onRefresh}
            separatorStyle={{ color: 'black' }}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: 'black' }}
            timeToShow={['M', 'S']}
            showSeparator
            timeLabels={{ m: '', s: '' }}
          />
          </Text>
          <Gap height={15} />
          <TouchableOpacity
            style={{
              height: 20,
              width: '100%',
            }}
            onPress={onRefresh}>
            <Text
              style={{
                fontFamily: 'RobotoRegular',
                fontSize: 13,
                color: '#0c8eff',
                textAlign: 'center',
              }}>
              
              Resend code OTP to your email{' '}
            </Text>
          </TouchableOpacity>
          <Gap height={20} />
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

export default CheckEmailForgot;

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
    color: '#495057',
    textAlign: 'center',
  },
  title: {
    paddingHorizontal: 'auto',
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
