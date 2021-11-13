import React from 'react';
import {View, Text} from 'react-native';
import {Gap} from '../../atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';

const VideoItem = () => {
  const videoBuffer = (isBuffer) => {
    console.log(isBuffer);
    //here you could set the isBuffer value to the state and then do something with it
    //such as show a loading icon
  };
  return (
    <View
      style={{
        height: 220,
        width: '49%',
        borderRadius: 5.6,
        backgroundColor: '#ffffff',
        // backgroundColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: 0.7,
        borderColor: '#dfe1e5',
        marginBottom: 10,
      }}>
      <Video
        source={{
          uri:
            'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
        }}
        posterResizeMode={'cover'}
        controls={true}
        resizeMode={'cover'}
        paused={true}
        onBuffer={videoBuffer}
        poster={
          'https://i.pinimg.com/564x/60/49/41/6049413e5f0dc69eacc059800f86d290.jpg'
        }
        style={{
          backgroundColor: 'white',
          height: '55%',
          width: '100%',
          borderTopLeftRadius: 5.6,
          borderTopRightRadius: 5.6,
        }}
      />
      <View style={{paddingHorizontal: 7, paddingVertical: 10}}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 8.4,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 11.2,
            letterSpacing: 0.21,
            color: '#807fa1',
          }}>
          Source
        </Text>
        <Gap height={5} />
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 9.8,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 14,
            letterSpacing: 0.21,
            color: '#1d1c45',
          }}
          numberOfLines={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
    </View>
  );
};

export default VideoItem;
