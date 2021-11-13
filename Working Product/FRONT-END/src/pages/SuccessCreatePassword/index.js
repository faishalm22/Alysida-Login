import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Buttons, Gap} from '../../components/atoms';
import {SuccessIllustration, BackIcon} from '../../assets';
import {CloseIcon} from '../../assets';

const SuccessCreatePassword = ({navigation}) => {
  const onSubmit = () => {
    navigation.navigate('SignIn');
  };

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleGoTo('WelcomeAuth')}>
          <Image source={CloseIcon} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.titleText}>Create Password Success</Text>
          <Gap height={10} />
          <SuccessIllustration style={styles.illustrationSuccess} />
          <Gap height={10} />
          <View style={styles.signInWrapper}>
            <Text style={styles.textOuter}>
              You have new password, please keep this only for you.
            </Text>
          </View>
          <Gap height={40} />
          <Buttons
            backgroundcolor="#0c8eff"
            textcolor="#ffff"
            text="Sign In"
            onPress={onSubmit}
          />
          <Gap height={40} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SuccessCreatePassword;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 40,
    flex: 1,
  },
  iconBack: {
    width: 20,
    height: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'SarabunExtraBold',
  },
  signInWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    fontSize: 14,
  },
  textOuter: {
    color: '#6e6e6e',
    fontFamily: 'SarabunMedium',
    textAlign: 'center',
    fontSize: 14,
    // paddingHorizontal: 30,
    width: 200,
  },
  textInner: {
    fontFamily: 'SarabunMedium',
    marginLeft: 5,
    color: '#0c8eff',
  },
  illustrationSuccess: {
    width: '100%',
    height: 200,
  },
});
