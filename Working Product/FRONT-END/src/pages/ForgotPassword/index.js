import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInputIcon, Buttons, Gap} from '../../components/atoms';
import {ButtonGoogle} from '../../components/molecules';
import {showMessage, useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {BackIcon, UserIcon, UserIconActive} from '../../assets';
import {forgotPasswordAction} from '../../redux/action';

const ForgotPassword = ({navigation}) => {
  const [form, setForm] = useForm({
    identity: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({type: 'SET_IDENTITY', value: form});

    const data = {
      ...form,
    };
    console.log(data);

    dispatch(forgotPasswordAction(data, navigation));
  };
  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleGoTo('WelcomeAuth')}>
          <Image source={BackIcon} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Forgot Password</Text>
            <Text style={styles.subtitleText}>
              Enter your username or the email or phone number linked to your
              account
            </Text>
          </View>
          <Gap height={30} />
          <TextInputIcon
            label="Username or Email"
            placeholder="Enter your full name"
            autoCapitalize="none"
            sourceImageLeft={UserIcon}
            sourceImageLeftActive={UserIconActive}
            onChangeText={(value) => setForm('identity', value.toLowerCase())}
          />
          <Gap height={30} />
          <Buttons
            text="Next"
            backgroundcolor="#757575"
            textcolor="white"
            onPress={onSubmit}
          />
          <Gap height={50} />
          <View
            style={{
              height: 1,
              backgroundColor: '#757575',
              position: 'relative',
            }}>
            <Text
              style={{
                position: 'absolute',
                left: '45%',
                bottom: -10,
                backgroundColor: 'white',
                textAlign: 'center',
                height: 25,
                width: 25,
                fontSize: 16,
                fontFamily: 'SarabunMedium',
              }}>
              OR
            </Text>
          </View>
          <Gap height={50} />
          <ButtonGoogle />
          <Gap height={150} />
          <View style={styles.signInWrapper}>
            <Text
              style={styles.textInner}
              onPress={() => handleGoTo('WelcomeAuth')}>
              Need more help?
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

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
  titleContainer: {
    paddingHorizontal: 0,
  },
  titleText: {
    fontSize: 26,
    fontFamily: 'SarabunExtraBold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: 'SarabunRegular',
    color: '#6e6e6e',
    textAlign: 'center',
  },
  signInWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 80,
    fontSize: 14,
  },
  textOuter: {
    color: '#22262f',
    fontFamily: 'SarabunMedium',
  },
  textInner: {
    fontFamily: 'SarabunMedium',
    marginLeft: 5,
    color: '#0c8eff',
  },
});
