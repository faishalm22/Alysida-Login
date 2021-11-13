import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Buttons, Gap} from '../../components/atoms';
import {SuccessIllustration, BackIcon} from '../../assets';
import {CloseIcon} from '../../assets';

const SucessSignUp = ({navigation}) => {
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
      <Gap height={50} />
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.titleText}>Create Account Success</Text>
          <Gap height={20} />
          <SuccessIllustration style={styles.illustrationSuccess} />
          <Gap height={15} />
          <Text style={styles.desctext}>Now you can sign in to sadhelX</Text>
          <Gap height={30} />
          <Buttons
            backgroundcolor="#0c8eff"
            textcolor="#ffff"
            text="Sign In"
            onPress={onSubmit}
          />
          <Gap height={30} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SucessSignUp;

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
  desctext: {
    textAlign: 'center',
    color: '#6e6e6e',
    fontSize: 14,
  },
  illustrationSuccess: {
    width: 250,
    height: 200,
  },
});
