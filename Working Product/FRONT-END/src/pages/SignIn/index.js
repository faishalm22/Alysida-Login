import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  TextInputIcon,
  TextInputPassword,
  Buttons,
  Gap,
} from '../../components/atoms';
import {ButtonGoogle} from '../../components/molecules';
import {
  BackIcon,
  UserIcon,
  LockIcon,
  UserIconActive,
  LockIconActive,
  SeePassword,
  SeePasswordActive,
} from '../../assets';
import {signInAction} from '../../redux/action';
import {useDispatch} from 'react-redux';
import {useForm} from '../../utils';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    identity: '',
    password: '',
  });
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
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
            <Text style={styles.titleText}>Sign in to sadhelX</Text>
            <Text style={styles.subtitleText}>Enter your detail below</Text>
          </View>
          <Gap height={30} />
          <TextInputIcon
            label="Username or Email"
            placeholder="Enter your full name"
            autoCapitalize="none"
            sourceImageLeft={UserIcon}
            sourceImageLeftActive={UserIconActive}
            value={form.identity}
            onChangeText={(value) => setForm('identity', value)}
          />
          <Gap height={10} />
          <TextInputPassword
            label="Password"
            placeholder="Password at least 8 characters"
            sourceImageLeft={LockIcon}
            sourceImageLeftActive={LockIconActive}
            sourceImageRight={SeePassword}
            sourceImageRightActive={SeePasswordActive}
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
          />
          <Gap height={20} />
          <Buttons
            text="Sign In"
            backgroundcolor="#757575"
            textcolor="white"
            onPress={onSubmit}
          />
          <Gap height={30} />
          <TouchableOpacity
            style={{
              height: 20,
              width: '100%',
            }}
            onPress={() => handleGoTo('ForgotPassword')}>
            <Text
              style={{
                fontFamily: 'RobotoRegular',
                fontSize: 11,
                color: '#0c8eff',
                textAlign: 'center'
              }}>
              Forgot your login password?{' '}
            </Text>
          </TouchableOpacity>
          <Gap height={30} />
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
          <Gap height={40} />
          <ButtonGoogle />
          <Gap height={30} />
          <View style={styles.signInWrapper}>
            <Text style={styles.textOuter}>Not a member?</Text>
            <Text style={styles.textInner} onPress={() => handleGoTo('SignUp')}>
              Create account
            </Text>
          </View>
          <Gap height={50} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

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
    paddingHorizontal: 30,
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
