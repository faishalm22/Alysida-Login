import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FeedItem, EventItem} from '../../components';
import {getData, storeData} from '../../utils';

const Feed = () => {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Feed</Text>
        <View style={styles.iconHeader}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: 'SarabunExtraBold',
                fontSize: 16,
                lineHeight: 20,
                letterSpacing: 0,
                color: '#2e3033',
              }}>
              EVENT FOR YOU
            </Text>
            <Text
              style={{
                fontFamily: 'SarabunBold',
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0,
                color: '#0c8eff',
              }}>
              See All
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 10}}>
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
          </ScrollView>
        </View>
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </ScrollView>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    height: 60,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
