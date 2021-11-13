import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {SafetyHeader} from '../../components';
import {VideoItem} from '../../components';

const SafetyVideo = () => {
  return (
    <View style={styles.page}>
      <SafetyHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            margin: 15,
          }}>
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
        </View>
      </ScrollView>
    </View>
  );
};

export default SafetyVideo;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
