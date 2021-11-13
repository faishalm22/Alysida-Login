import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {SafetyHeader, Gap, CourseItem} from '../../components';

const SafetySertifikasi = () => {
  return (
    <View style={styles.page}>
      <SafetyHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin: 15}}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              letterSpacing: 0,
              color: '#8e8e93',
            }}>
            Courses
          </Text>
          <Gap height={10} />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </View>
      </ScrollView>
    </View>
  );
};

export default SafetySertifikasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
