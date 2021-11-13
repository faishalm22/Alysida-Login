import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CourseItem = () => {
  return (
    <View
      style={{
        height: 100,
        borderRadius: 4,
        backgroundColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        marginBottom: 5,
      }}>
      <View style={{padding: 10, flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#ffe6e2',
            height: 80,
            width: '25%',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            marginLeft: 10,
            width: '70%',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontWeight: '700',
              fontSize: 14,
              color: '#757575',
              height: 40,
            }}>
            [ Materi Learning title ]
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text>Source by: [ institute]</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#0c8eff',
                }}>
                View Source
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseItem;
