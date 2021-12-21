import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View,StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { BackIcon, } from '../assets';
import { Buttons, Gap } from '../components/atoms';
import {signInAction} from '../redux/action';
import {LogoGroup} from '../assets';
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
const onSubmit = () => {
  dispatch(signInAction(form, navigation));
};
//const Tab = createBottomTabNavigator();

const MainApp = ({navigation}) => {
  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };
   return (
       <View style={styles.wrapper}>
              <TouchableOpacity onPress={() => handleGoTo('WelcomeAuth')}>
            <Image source={BackIcon} style={styles.iconBack} />
          </TouchableOpacity>
            <View style={styles.inputcontainer}>
              <Image style={styles.container} source={LogoGroup}/>
              <Gap height={50} />
                <Buttons
                  text="Log Out"
                  backgroundcolor="#457b9d"
                  textcolor="white"
                  onPress={onSubmit}
                />
              </View>
              
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
      <Stack.Screen
        name="CheckEmailToken"
        component={CheckEmailToken}
        options={{headerShown: false}}
      />
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
  wrapper: {
    flex: 1,
    backgroundColor: '#b3e1e7',
  },
   iconBack: {
    marginTop: 10,
     width: 20,
     height: 20,
   },
   container:{
   borderRadius: 30,
    marginLeft: 42,
    marginTop: 70,
    height: 170,
    width: 170,
   },
   inputcontainer:{
    borderRadius: 30,
    marginLeft: 80,
    marginTop: 60,
    width: 250,
    height: 420,
    backgroundColor: '#ffff',
   }

});
export default Router;
