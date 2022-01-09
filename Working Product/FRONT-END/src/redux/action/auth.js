import Axios from 'axios';
import {API_HOST} from '../../config';
import React, {createContext, useContext} from 'react';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {useState} from 'react';
import {showMessage, storeData, getData} from '../../utils';

import {setLoading} from './global';

// Axios.defaults.timeout = 5000;

export const AuthContext = createContext(null);
const {Provider} = AuthContext;

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
     AsyncStorage.multiRemove([
       'userProfile',
       'tokenAccess',
       'tokenRefresh',
     ]).then(() => {
       navigation.reset({index: 0, routes: [{name: 'WelcomeAuth'}]});
    });
  };

  const getAccessToken = () => {
    const token = getData('tokenRefresh');
    return token;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export const AxiosContext = createContext();

export const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = Axios.create({
    baseURL: `${API_HOST.url}`,
  });

  const publicAxios = Axios.create({
    baseURL: `${API_HOST.url}`,
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = failedRequest => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: `${API_HOST.url}/refresh-token`,
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.data.token.token_access;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.data.token.token_access,
        });

        const tokenAccess = `${tokenRefreshResponse.data.data.token.token_access}`;
        storeData('tokenAccess', tokenAccess);
        return Promise.resolve();
      })
      .catch(e => {
        AsyncStorage.multiRemove([
          'userProfile',
          'tokenAccess',
          'tokenRefresh',
        ]);
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};


export const signInAction = (form, navigation) => (dispatch) => {
  console.log(form);

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then((res) => {
      // console.log(res);
      const tokenAccess = `${res.data.data.token.token_access}`;
      const tokenRefresh = `${res.data.data.token.token_refresh}`;
      const profile = res.data.data.user;
      profile.profile_photo_url = `${API_HOST.url}/avatar-storage/`;

      dispatch(setLoading(false));
      storeData('tokenAccess', tokenAccess);
      storeData('tokenRefresh', tokenRefresh);
      storeData('userProfile', profile);
      if (res.data.status == true) {
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      } else {
        showMessage(res?.data?.msg);
      }
    })
    .catch((err) => {
      dispatch(setLoading(false));
      // console.log(err.response.data);
      console.log(err);
      showMessage(
        err?.response?.data?.msg || 'Tidak berhasil login, silakan login ulang',
      );
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
};

export const forgotPasswordAction = (form, navigation) => (dispatch) => {
  console.log(form);

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/get-password-reset-code`, form)
    .then((res) => {
      console.log(res);
      dispatch(setLoading(false));
      navigation.reset({
        index: 0,
        routes: [{name: 'CheckEmailForgot'}],
      });
    })
    .catch((err) => {
      console.log(err?.response?.data);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.msg || 'Tidak berhasil mengirim OTP');
    });
};

export const checkTokenAction = (form, navigation) => (dispatch) => {
  console.log(form);

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/verify/password-reset`, form)
    .then((res) => {
      console.log(res);
      dispatch(setLoading(false));
      navigation.reset({
        index: 0,
        routes: [{name: 'CreateNewPassword'}],
      });
    })
    .catch((err) => {
      console.log(err?.response?.data);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.msg || 'Tidak berhasil mengirim OTP');
    });
};

export const createNewPasswordAction = (form, navigation) => (dispatch) => {
  console.log(form);

  dispatch(setLoading(true));
  Axios.put(`${API_HOST.url}/reset-password`, form)
    .then((res) => {
      console.log(res);
      dispatch(setLoading(false));
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessCreatePassword'}],
      });
    })
    .catch((err) => {
      console.log(err?.response?.data);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.msg || 'Tidak berhasil ganti password');
    });
};
