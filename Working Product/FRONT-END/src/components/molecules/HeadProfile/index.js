import React from 'react';
import {View, Text} from 'react-native';
import {ProfileHeader, ProfileInfo, ProfileTabs} from '../index';
import {useEffect, useState} from 'react';
import {getData, storeData} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const HeadProfile = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserProfile();
    });
  }, [navigation]);

  const getUserProfile = () => {
    getData('userProfile').then((res) => {
      setUserProfile(res);
      console.log(res);
    });
  };
  return (
    <View>
      <ProfileHeader />
      <ProfileInfo
        username={userProfile.username}
        email={userProfile.email}
        image={userProfile.profile_photo_url}
      />
    </View>
  );
};

export default HeadProfile;
