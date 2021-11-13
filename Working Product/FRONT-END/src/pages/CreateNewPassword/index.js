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
import {showMessage, useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {createNewPasswordAction} from '../../redux/action';

const CreateNewPassword = ({navigation}) => {
  const [form, setForm] = useForm({
    password: '',
    password_re: '',
  });

  const {forgotReducer} = useSelector((state) => state);

  const dispatch = useDispatch();

  const onSubmit = () => {
    // navigation.navigate('SuccessCreatePassword');
    const data = {
      ...form,
      ...forgotReducer,
    };

    dispatch(createNewPasswordAction(data, navigation));
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
            <Text style={styles.titleText}>Create New Password</Text>
            <Text style={styles.subtitleText}>
              Your new password must be different from previous used passwords.
            </Text>
          </View>
          <Gap height={30} />
          <TextInputPassword
            label="New Password"
            placeholder="Password at least 8 characters"
            sourceImageLeft={LockIcon}
            sourceImageLeftActive={LockIconActive}
            sourceImageRight={SeePassword}
            sourceImageRightActive={SeePasswordActive}
            onChangeText={(value) => setForm('password', value)}
          />
          <Gap height={20} />
          <TextInputPassword
            label="Confrim Password"
            placeholder="Password at least 8 characters"
            sourceImageLeft={LockIcon}
            sourceImageLeftActive={LockIconActive}
            sourceImageRight={SeePassword}
            sourceImageRightActive={SeePasswordActive}
            onChangeText={(value) => setForm('password_re', value)}
          />
          <Gap height={20} />
          <Text style={{fontSize: 12, fontFamily: 'RobotoRegular'}}>
            Both password must be match.
          </Text>
          <Gap height={40} />
          <Buttons
            text="Create new password"
            backgroundcolor="#757575"
            textcolor="white"
            onPress={onSubmit}
          />
          <Gap height={40} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateNewPassword;

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
    paddingHorizontal: 10,
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
