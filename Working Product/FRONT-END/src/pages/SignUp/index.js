import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput, Buttons, Gap} from '../../components/atoms';
import {BackIcon, PhotoDummy} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {showMessage, useForm} from '../../utils';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
  });

  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({type: 'SET_REGISTER', value: form});
    navigation.navigate('SignUpForm');
  };
  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
      },
      (response) => {
        console.log(response);
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          const source = {uri: response.uri};
          // console.log(response);

          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          // console.log('source', source);
          // console.log('data image', dataImage);
          setPhoto(source);
          console.log(source);
          dispatch({type: 'SET_PHOTO', value: dataImage});
          dispatch({type: 'SET_UPLOAD_STATUS', value: true});
        }
      },
    );
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeAuth')}>
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
            <Text style={styles.subtitleRight}>1/2</Text>
          </View>
          <Gap height={10} />
          <Text style={styles.labelTitle}>Profile Photo</Text>
          <View style={styles.photoWrapper}>
            <TouchableOpacity style={styles.photoContainer} onPress={addPhoto}>
              {photo ? (
                <Image source={photo} style={styles.photoContainer} />
              ) : (
                <PhotoDummy width="50" height="50" />
              )}
            </TouchableOpacity>
            <View style={styles.addPhoto}>
              <Text style={{color: 'white'}}>+</Text>
            </View>
          </View>
          <Gap height={10} />
          <TextInput
            label="Name"
            placeholder="Enter your full name"
            onChangeText={(value) => setForm('name', value)}
          />
          <Gap height={40} />
          <Buttons
            text="Next"
            textcolor="white"
            backgroundcolor="#757575"
            backgroundcoloronpress="#0c8eff"
            onPress={onSubmit}
          />
          <Gap height={70} />
          <View style={styles.signInWrapper}>
            <Text style={styles.textOuter}>Already a member?</Text>
            <Text style={styles.textInner} onPress={() => handleGoTo('SignIn')}>
              Sign In
            </Text>
          </View>
          <Gap height={70} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    // backgroundColor: 'red',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  photoWrapper: {
    height: 90,
    width: 85,
    position: 'relative',
  },
  photoContainer: {
    height: 75,
    width: 75,
    borderWidth: 1,
    borderColor: '#80979797',
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    backgroundColor: '#0c8eff',
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 5,
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
