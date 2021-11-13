import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {Buttons} from '../../components';

import Pdf from 'react-native-pdf';

const TipsPDF = ({navigation, route}) => {
  // const source = {
  //   // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  //   uri:
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  //   cache: true,
  // };
  const {source} = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

export default TipsPDF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
