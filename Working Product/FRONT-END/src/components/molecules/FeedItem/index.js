import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FeedItem = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headCard}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.userIconHeader}></TouchableOpacity>
          <View style={{marginLeft: 5}}>
            <Text style={styles.textUsername}>Your username</Text>
            <Text style={{fontSize: 10, marginTop: 3}}>5 min</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#eee',
            height: 30,
            width: 30,
          }}></TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity style={styles.imagecCardContent}></TouchableOpacity>
        <View style={styles.interactionCardContent}>
          <View style={styles.interactionWrapper}>
            <TouchableOpacity style={styles.likesContainer}>
              <View style={styles.iconMock}></View>
              <Text>2,566</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likesContainer}>
              <View style={styles.iconMock}></View>
              <Text>534</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#eee',
                height: 25,
                width: 25,
              }}></TouchableOpacity>
          </View>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.textUsername}>
            <Text>Your username{'  '}</Text>
            <Text style={styles.textCaption}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              efficitur arcu. In et velit sed est vulputate tristique a id
              leo...
            </Text>
            <Text style={styles.textMore} onPress={() => console.log('Detail')}>
              {'  '}More
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  card: {
    // height: 360,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  headCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    height: 60,
    paddingVertical: 5,
    // backgroundColor: 'yellow',
  },
  userIconHeader: {
    width: 40,
    height: 40,
    marginRight: 5,
    backgroundColor: '#eeee',
    borderWidth: 1,
    borderColor: '#0c8eff',
    borderRadius: 100,
  },
  cardContent: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  imagecCardContent: {
    height: 200,
    backgroundColor: '#eeee',
    borderRadius: 20,
    elevation: 5,
    // marginHorizontal: 5,
  },
  interactionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '100%',
    marginTop: 10,
    marginHorizontal: 2,
    // backgroundColor: 'yellow',
  },
  interactionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconMock: {
    backgroundColor: '#eee',
    height: 25,
    width: 25,
    marginRight: 5,
    borderRadius: 20,
  },
  captionContainer: {
    paddingVertical: 10,
  },
  textUsername: {
    fontFamily: 'SarabunBold',
    fontSize: 14,
    lineHeight: 12.6,
    letterSpacing: 0,
    color: '#22262f',
  },
  textCaption: {
    fontFamily: 'Sarabun',
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.15,
    textAlign: 'justify',
    color: '#22262f',
  },
  textMore: {
    fontFamily: 'SarabunBold',
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.15,
    color: '#757575',
  },
});
