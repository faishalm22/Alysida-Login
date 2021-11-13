import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  FeedIcon,
  FeedActiveIcon,
  SearchIcon,
  SearchActiveIcon,
  SafetyIcon,
  SafetyActiveIcon,
  ProfileIcon,
  ProfileActiveIcon,
  CyclingIcon,
} from '../../../assets';

const IconCycling = () => {
  return (
    <View style={{width: 70, height: 70}}>
      <CyclingIcon width={'100%'} height={'100%'} />
    </View>
  );
};

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Feed':
      return focus ? (
        <View style={styles.icon}>
          <FeedActiveIcon />
          <Text style={styles.textIconActive}>{label}</Text>
        </View>
      ) : (
        <View style={styles.icon}>
          <FeedIcon />
          <Text style={styles.textIcon}>{label}</Text>
        </View>
      );
    case 'Search':
      return focus ? (
        <View style={styles.icon}>
          <SearchActiveIcon />
          <Text style={styles.textIconActive}>{label}</Text>
        </View>
      ) : (
        <View style={styles.icon}>
          <SearchIcon />
          <Text style={styles.textIcon}>{label}</Text>
        </View>
      );
    case 'Cycling':
      return focus ? <IconCycling /> : <IconCycling />;
    case 'Safety':
      return focus ? (
        <View style={styles.icon}>
          <SafetyActiveIcon />
          <Text style={styles.textIconActive}>{label}</Text>
        </View>
      ) : (
        <View style={styles.icon}>
          <SafetyIcon />
          <Text style={styles.textIcon}>{label}</Text>
        </View>
      );
    case 'Profile':
      return focus ? (
        <View style={styles.icon}>
          <ProfileActiveIcon />
          <Text style={styles.textIconActive}>{label}</Text>
        </View>
      ) : (
        <View style={styles.icon}>
          <ProfileIcon />
          <Text style={styles.textIcon}>{label}</Text>
        </View>
      );
    default:
      return <FeedIcon />;
  }
};

const BottomNavigator = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.wrapper}>
              <Icon label={label} focus={isFocused} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 13,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '9%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#ffffff',
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    borderColor: '#ddd',
    borderWidth: 0.5,
    shadowColor: '#ddd',
    shadowOffset: {width: 10, height: 20},
    shadowOpacity: 10,
    shadowRadius: 2,
    elevation: 1,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // backgroundColor: 'yellow',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    color: '#9a9a9a',
    fontSize: 10,
  },
  textIconActive: {
    color: '#0c8eff',
    fontSize: 10,
  },
});
