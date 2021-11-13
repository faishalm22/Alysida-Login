import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from '../../atoms';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';

const TipsRidingItem = ({link, title}) => {
  const navigation = useNavigation();
  const source = {
    uri:
      // 'https://www.tutorialspoint.com/react_native/react_native_tutorial.pdf',
      `http://celeratesdev.zapto.org:8089/guidelines/documents/${link}`,
  };
  const image = {
    uri: `https://www.thenfapost.com/wp-content/uploads/2020/08/unnamed-2.png`,
  };
  console.log(source);
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <Image source={image} style={styles.imageContainer} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: 10,
            width: '53%',
          }}>
          {/* <Text style={styles.desContainer}>Contoh Judul Article Sepeda</Text> */}
          <Text style={styles.desContainer} numberOfLines={4}>
            {title}
          </Text>
          <View style={{width: '100%'}}>
            <Button
              backgroundcolor="#0c8eff"
              text="View Details"
              textcolor="white"
              onPress={() =>
                navigation.navigate('TipsPDF', {
                  source,
                })
              }
              // onPress={() => console.log(source.uri)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TipsRidingItem;

const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  imageContainer: {
    width: '44%',
    height: 125,
    backgroundColor: '#eeee',
    marginRight: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desContainer: {
    width: '100%',
    height: 80,
    fontFamily: 'SarabunSemiBold',
    textTransform: 'capitalize',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'justify',
    color: '#454749',
  },
});
