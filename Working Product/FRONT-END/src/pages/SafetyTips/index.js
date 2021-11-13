import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {SafetyHeader, TipsRidingItem} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getSafetyTips} from '../../redux/action/safety';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SafetyTips = () => {
  const dispatch = useDispatch();
  const {tips} = useSelector((state) => state.safetyReducer);
  useEffect(() => {
    dispatch(getSafetyTips());
  }, []);
  return (
    <View style={styles.page}>
      <SafetyHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {tips.length > 0 ? (
          tips.map((data) => {
            // console.log(data);
            return (
              <TipsRidingItem
                key={data.id}
                title={data.guidelines_name}
                link={data.guidelines_link}
              />
            );
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              height: hp('70%'),
            }}>
            <Text>Memuat Data...</Text>
          </View>
        )}
        {/* {tips.map((data) => {
          console.log(data);
          return (
            <TipsRidingItem
              key={data.id}
              title={data.guidelines_name}
              link={data.guidelines_link}
            />
          );
        })} */}
      </ScrollView>
    </View>
  );
};

export default SafetyTips;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
