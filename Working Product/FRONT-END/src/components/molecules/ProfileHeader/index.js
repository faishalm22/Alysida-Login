import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.wrapper}>
        <Text style={styles.textHeader}>Profile</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.iconHeader}></TouchableOpacity>
          <TouchableOpacity style={styles.iconHeader}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    height: 50,
    elevation: 5,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'yellow',
    // paddingTop: 300,
  },
  iconHeader: {
    width: 30,
    height: 30,
    marginRight: 5,
    backgroundColor: '#eeee',
    borderWidth: 1,
    borderColor: '#0c8eff',
  },
  textHeader: {
    height: 16,
    fontFamily: 'Sarabun',
    fontSize: 15.4,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 15.4,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#313233',
  },
});
