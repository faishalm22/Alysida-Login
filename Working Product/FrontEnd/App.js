// import React, { Component } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator} from '@react-navigation/native-stack';

// import splashscreen from './src/pages/splashscreen';

// const Stack = createNativeStackNavigator();

// function App(){
//   return(
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name= "splashscreen" component={splashscreen}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image} from 'react-native';

class App extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle= "dark-content" backgroundColor= "#fafafa"/>
        
        <View style={{ flex:1 , justifyContent: 'center', alignItems: 'center'}}>
          <Image
          style = {{ width: 420, height: 320,resizeMode:'cover', marginTop:450, marginVertical:30 } }
          source = { require ('./src/assets/bike.png')}></Image>
        </View>
        
        <View
          styles={{
            flex:3,
            width: 30,
            height:30,
            backgroundColor:'#81d4fa',
            justifyContent: 'center',
            resizeMode:'cover',
          }}>

        </View>
        <View>
        <Text style={ {
          fontSize: 14, 
          fontWeight: 'bold', 
          fontStyle: 'normal',
          textAlign: 'center',
          letterSpacing: 2,
          marginTop: 100,
          }}>            "For wheels move the body.</Text>
          <Text style={ {
          fontSize: 14, 
          fontWeight: 'bold', 
          fontStyle: 'normal',
          textAlign: 'center',
          letterSpacing: 2,
          marginBottom: 20,
          }}>Two wheels move the soul."</Text>
        </View>
        
        <TouchableOpacity style={{
          backgroundColor: '#FFFFFF',
          paddingVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
         marginTop: 250,
          marginBottom: 30,
          marginHorizontal: 30,
          borderRadius: 15,
          elevation: 3
        }}>
        <Text styles={{
          color: '#FFFFFF', flex:1,
          }}>Sign In With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: '#0C8EFF',
          paddingVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 30,
          borderRadius: 15,
          elevation: 3,
        }}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        
        <View style ={{flex:5}}>
          <Text> Not a member</Text>
        </View>
        
        
        
      </View>
    );
  }
}

export default App


