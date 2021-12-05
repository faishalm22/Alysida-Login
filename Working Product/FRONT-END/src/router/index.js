import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View,StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { BackIcon } from '../assets';
import {
  SplashScreen,
  WelcomeAuth,
  CheckEmailToken,
  SignIn,
  ForgotPassword,
  CheckEmailForgot,
  SuccessCreatePassword,
  CreateNewPassword,
  Profile,
  ProfileMenus,
  Home
} from '../pages';
import {BottomNavigator} from '../components';

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

const MainApp = ({navigation}) => {
  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };
   return (
       <View style={styles.header}>
                <TouchableOpacity onPress={() => handleGoTo('WelcomeAuth')}>
            <Image source={BackIcon} style={styles.iconBack} />
          </TouchableOpacity>
        </View>     
  //   // <Tab.Navigator
  //   //   sceneContainerStyle={{height: 1000}}
  //   //   tabBar={(props) => <BottomNavigator {...props} />}
  //   //   initialRouteName="Feed">
  //   //   <Tab.Screen name="Feed" component={Feed} />
  //   //   <Tab.Screen name="Search" component={Search} />
  //   //   <Tab.Screen name="Cycling" component={Cycling} />
  //   //   <Tab.Screen name="Safety" component={SafetyStackScreen} />
  //   //   <Tab.Screen name="Profile" component={ProfileScreen} />
  //   // </Tab.Navigator>
   )
};

// const ProfileScreen = () => {
//   return (
//     <Stack.Navigator initialRouteName="ProfileActivity">
//       <Stack.Screen
//         name="ProfileActivity"
//         component={Profile}
//         options={{headerShown: false, animationEnabled: false}}
//       />
//       <Stack.Screen
//         name="ProfileMenus"
//         component={ProfileMenus}
//         options={{headerShown: false, animationEnabled: false}}
//       />
//     </Stack.Navigator>
//   );
// };

// const SafetyStackScreen = () => {
//   return (
//     <Stack.Navigator initialRouteName="SafetyTips">
//       <Stack.Screen
//         name="SafetyTips"
//         component={SafetyTips}
//         options={{headerShown: false, animationEnabled: false}}
//       />
//       <Stack.Screen
//         name="SafetyVideo"
//         component={SafetyVideo}
//         options={{headerShown: false, animationEnabled: false}}
//       />
//       <Stack.Screen
//         name="SafetySertifikasi"
//         component={SafetySertifikasi}
//         options={{headerShown: false, animationEnabled: false}}
//       />
//       <Stack.Screen
//         name="TipsPDF"
//         component={TipsPDF}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="CheckEmailToken"
        component={CheckEmailToken}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckEmailForgot"
        component={CheckEmailForgot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessCreatePassword"
        component={SuccessCreatePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

 const styles = StyleSheet.create({
   header: {
     height: 20,
     justifyContent: 'center',
   },
   iconBack: {
     width: 20,
     height: 20,
  
   },
});
export default Router;
