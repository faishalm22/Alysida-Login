import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput, Button, Gap} from '../../components/atoms';
import {getData, storeData} from '../../utils';
import {
  FeedItem,
  HeadProfile,
  ProfileHeader,
  ProfileInfo,
  ProfileTabs,
} from '../../components';

// const MenusProfile = () => {
//   const signOut = () => {
//     AsyncStorage.multiRemove([
//       'userProfile',
//       'tokenAccess',
//       'tokenRefresh',
//     ]).then(() => {
//       navigation.reset({index: 0, routes: [{name: 'WelcomeAuth'}]});
//     });
//   };
//   return (
//     <View
//       style={{
//         paddingHorizontal: 15,
//         paddingBottom: 10,
//       }}>
//       <TouchableOpacity style={styles.wrapperItem}>
//         <Text style={styles.textItem}>My e-Sertifikasi</Text>
//       </TouchableOpacity>
//       <Gap height={15} />
//       <View style={styles.wrapperItemInfo}>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Account Information</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Password & Security</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Notification</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Language</Text>
//         </TouchableOpacity>
//       </View>
//       <Gap height={20} />
//       <Text style={{fontSize: 14, fontWeight: 'bold', color: '#2e3033'}}>
//         Tentang Aplikasi
//       </Text>
//       <Gap height={15} />
//       <View style={styles.wrapperItemInfo}>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>App Version</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Terms & Conditions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.itemInfo}>
//           <Text style={styles.textItem}>Privacy Policy</Text>
//         </TouchableOpacity>
//       </View>
//       <Gap height={15} />
//       <View style={styles.wrapperItemInfo}>
//         <TouchableOpacity style={styles.itemInfo} onPress={signOut}>
//           <Text style={styles.textItem}>Log out</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

const Profile = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeadProfile />
        <ProfileTabs />
        <View>
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
});
