import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  TextInputPassword,
  TextInput,
  Buttons,
  Gap,
} from '../../components/atoms';
import {
  BackIcon,
  LockIcon,
  SeePassword,
  LockIconActive,
  SeePasswordActive,
} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {signUpAction} from '../../redux/action';
import {showMessage, useForm} from '../../utils';

const SignUpForm = ({navigation}) => {
  const [form, setForm] = useForm({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const {registerReducer, photoReducer} = useSelector((state) => state);

  const onSubmit = () => {
    dispatch({type: 'SET_IDENTITY_SIGN', value: form.email});

    if (form.username == '' || form.email == '' || form.password == '') {
      showMessage('Isi semua field');
    } else if (form.password != form.confirm_password) {
      showMessage('Password tidak sama');
    } else {
      const data = {
        ...form,
        ...registerReducer,
      };
      dispatch(signUpAction(data, photoReducer, navigation));
    }
  };

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Image source={BackIcon} style={styles.iconBack}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.titleText}>Welcome to sadhelX</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleLeft}>
              We just need a few quick details to continue
            </Text>
            <Text style={styles.subtitleRight}>2/2</Text>
          </View>
          <Gap height={20} />
          <TextInput
            label="Username"
            autoCapitalize="none"
            placeholder="Enter your username"
            onChangeText={(value) => setForm('username', value.toLowerCase())}
          />
          <Gap height={20} />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => setForm('email', value.toLowerCase())}
          />
          <Gap height={20} />
          <TextInputPassword
            label="Create Password"
            placeholder="Password at least 8 characters"
            sourceImageLeft={LockIcon}
            sourceImageLeftActive={LockIconActive}
            sourceImageRight={SeePassword}
            sourceImageRightActive={SeePasswordActive}
            onChangeText={(value) => setForm('password', value)}
          />
          <Gap height={20} />
          <TextInputPassword
            label="Confirm Password"
            placeholder="Password at least 8 characters"
            sourceImageLeft={LockIcon}
            sourceImageLeftActive={LockIconActive}
            sourceImageRight={SeePassword}
            sourceImageRightActive={SeePasswordActive}
            onChangeText={(value) => setForm('confirm_password', value)}
          />
          <Gap height={10} />
          <Text style={styles.confrimtext}>Both password must be match</Text>
          <Gap height={20} />
          <Buttons
            backgroundcolor="#757575"
            backgroundcoloronpress="#0c8eff"
            textcolor="#ffff"
            text="Create Account"
            onPress={onSubmit}
          />
          {/* <Buttons /> */}
          <Gap height={30} />
          <View style={styles.signInWrapper}>
            <Text style={styles.textOuter}>Already a member?</Text>
            <Text style={styles.textInner} onPress={() => handleGoTo('SignIn')}>
              Sign In
            </Text>
          </View>
        </View>
        <Gap height={30} />
      </View>
    </ScrollView>
  );
};

export default SignUpForm;

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
    fontSize: 26,
    fontFamily: 'SarabunExtraBold',
  },
  subtitleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  subtitleLeft: {
    fontFamily: 'SarabunRegular',
    width: 200,
    color: '#6e6e6e',
  },
  subtitleRight: {
    fontFamily: 'SarabunMedium',
    fontSize: 16,

    alignItems: 'center',
    width: 25,
    height: 25,
  },
  labelTitle: {
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    color: '#22262f',
  },
  signInWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
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
  confrimtext: {
    color: '#6e6e6e',
    fontSize: 12,
  },
});
