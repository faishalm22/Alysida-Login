import React from 'react';
import {View, Text, Image} from 'react-native';

const ProfileInfo = ({username, email, image}) => {
  // console.log(username, email, image);
  return (
    <View style={{backgroundColor: 'white', height: 180}}>
      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          height: 150,
          justifyContent: 'space-between',
        }}>
        <Image
          source={{uri: `${image}`}}
          style={{
            backgroundColor: '#f7f7f7',
            height: '100%',
            width: '34%',
            borderRadius: 11,
          }}
        />
        <View
          style={{
            height: '100%',
            width: '62%',
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontFamily: 'Sarabun',
              fontSize: 22,
              fontWeight: 'normal',
              letterSpacing: 0,
              color: '#141b26',
              marginBottom: 4,
              textTransform: 'capitalize',
            }}
            numberOfLines={1}>
            {username}
          </Text>
          <Text
            style={{
              fontFamily: 'Sarabun',
              fontSize: 15,
              fontWeight: '300',
              letterSpacing: 0,
              color: '#939399',
              marginBottom: 7,
            }}>
            {email}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '97%',
              height: 40,
              alignItems: 'center',
              borderBottomColor: '#d1d9de',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
              }}>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 15,
                  fontWeight: '300',
                  color: '#454749',
                  marginRight: 10,
                }}>
                Goals
              </Text>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 15,
                  fontWeight: '300',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#0c8eff',
                }}>
                100km | 25 hours
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 15,
                  fontWeight: 'normal',
                  letterSpacing: 0,
                  color: '#0c8eff',
                }}>
                {'>'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              width: '100%',
              alignItems: 'center',
              borderBottomColor: '#d1d9de',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                width: '33%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#141b26',
                  marginBottom: 2,
                }}>
                100
              </Text>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 9,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  color: '#404f68',
                  textTransform: 'uppercase',
                }}>
                Post
              </Text>
            </View>
            <View
              style={{
                width: '33%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#141b26',
                  marginBottom: 2,
                }}>
                450K
              </Text>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 9,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  color: '#404f68',
                  textTransform: 'uppercase',
                }}>
                Followers
              </Text>
            </View>
            <View
              style={{
                width: '33%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#141b26',
                  marginBottom: 2,
                }}>
                124
              </Text>
              <Text
                style={{
                  fontFamily: 'Sarabun',
                  fontSize: 9,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  color: '#404f68',
                  textTransform: 'uppercase',
                }}>
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;
