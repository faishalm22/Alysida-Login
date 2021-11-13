import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileTabs = () => {
  const [isFocusedActivity, setIsFocusedActivity] = useState(false);
  const [isFocusedMenus, setIsFocusedMenus] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.name == 'ProfileActivity') {
      return setIsFocusedActivity(true), setIsFocusedMenus(false);
    }
    if (route.name == 'ProfileMenus') {
      return setIsFocusedActivity(false), setIsFocusedMenus(true);
    }
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileActivity')}
        style={isFocusedActivity ? styles.iconActive : styles.icon}>
        <Text style={isFocusedActivity ? styles.textActive : styles.text}>
          Activity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileMenus')}
        style={isFocusedMenus ? styles.iconActive : styles.icon}>
        <Text style={isFocusedMenus ? styles.textActive : styles.text}>
          Menus
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  iconActive: {
    width: 84,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#0c8eff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 84,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textActive: {
    color: 'white',
  },
  text: {
    color: '#757575',
  },
});
