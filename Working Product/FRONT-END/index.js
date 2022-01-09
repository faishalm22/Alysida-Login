/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/redux/action/auth';
import {AxiosProvider} from './src/redux/action/auth';

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
