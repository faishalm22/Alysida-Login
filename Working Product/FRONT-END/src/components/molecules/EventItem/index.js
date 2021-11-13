import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const EventItem = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        width: 250,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#757575',
            width: 40,
            height: 40,
            marginRight: 5,
          }}></View>
        <View>
          <Text
            style={{
              fontFamily: 'SarabunExtraBold',
              fontSize: 16,
              lineHeight: 20.7,
              letterSpacing: 0,
              color: '#2e3033',
              marginBottom: 3,
            }}>
            RACE HARI MINGGU
          </Text>
          <Text
            style={{
              fontFamily: 'Sarabun',
              fontSize: 11,
              lineHeight: 15.6,
              letterSpacing: 0,
              color: '#a7a5a5',
            }}>
            Sponsor: Air kelapa bang sani
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: 'Sarabun',
          fontSize: 12,
          lineHeight: 18,
          letterSpacing: 0,
          color: '#a7a5a5',
          paddingVertical: 5,
        }}>
        Event hari minggu start dari bundaran HI, sampai Pintu masuk utara GBK
      </Text>
      <Text
        style={{
          fontFamily: 'SarabunBold',
          fontSize: 12,
          lineHeight: 15.6,
          letterSpacing: 0,
          color: '#0c8eff',
        }}>
        Free
      </Text>
    </TouchableOpacity>
  );
};

export default EventItem;
