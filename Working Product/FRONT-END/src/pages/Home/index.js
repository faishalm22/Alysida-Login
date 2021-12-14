import React from 'react';
import {View,StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { BackIcon } from '../../assets';
import { 
Buttons,
Gap,
} from '../../components/atoms';
import {signInAction} from '../../redux/action';
//import {TouchableOpacity } from 'react-native';

const Home = ({navigation}) => {
const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };
const onSubmit = () => {
  dispatch(signInAction(form, navigation));
};
     return(
       <><View style={styles.header}>
         <TouchableOpacity onPress={() => handleGoTo('WelcomeAuth')}>
           <Image source={BackIcon} style={styles.iconBack} />
         </TouchableOpacity>
       </View>
       <Gap height={500} />
       <Buttons
           text="Log out"
           style={{
             height: 20,
             width: '50%'
           }}
           backgroundcolor="#757575"
           textcolor="black"
           onPress={onSubmit} /></>
         
     );

     };
     

 export default Home;

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
