import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

const SafetyHeader = () => {
  const [isFocusedTips, setIsFocusedTips] = useState(false);
  const [isFocusedVideo, setIsFocusedVideo] = useState(false);
  const [isFocusedSert, setIsFocusedSert] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.name == 'SafetyTips') {
      return (
        setIsFocusedTips(true),
        setIsFocusedVideo(false),
        setIsFocusedSert(false)
      );
    }
    if (route.name == 'SafetyVideo') {
      return (
        setIsFocusedTips(false),
        setIsFocusedVideo(true),
        setIsFocusedSert(false)
      );
    }
    if (route.name == 'SafetySertifikasi') {
      return (
        setIsFocusedTips(false),
        setIsFocusedVideo(false),
        setIsFocusedSert(true)
      );
    }
  });

  return (
    <View style={styles.header}>
      <View style={styles.wrapper}>
        <Text style={styles.textHeader}>Safety</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconHeader}></View>
          <View style={styles.iconHeader}></View>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <TouchableOpacity
          style={isFocusedTips ? styles.iconActive : styles.icon}
          onPress={() => navigation.navigate('SafetyTips')}>
          <Text style={isFocusedTips ? styles.textActive : styles.text}>
            Tips Riding
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isFocusedVideo ? styles.iconActive : styles.icon}
          onPress={() => navigation.navigate('SafetyVideo')}>
          <Text style={isFocusedVideo ? styles.textActive : styles.text}>
            Video Riding
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isFocusedSert ? styles.iconActive : styles.icon}
          onPress={() => navigation.navigate('SafetySertifikasi')}>
          <Text style={isFocusedSert ? styles.textActive : styles.text}>
            e-Sertifikasi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SafetyHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    height: 80,
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
  iconActive: {
    width: 94,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#0c8eff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 94,
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
