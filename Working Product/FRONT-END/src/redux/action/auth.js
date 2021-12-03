import Axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData, getData} from '../../utils';
import {setLoading} from './global';

// Axios.defaults.timeout = 5000;

export const signInAction = (form, navigation) => (dispatch) => {
  console.log(form);

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then((res) => {
      // console.log(res);
      const tokenAccess = `${res.data.data.token.token_access}`;
      const tokenRefresh = `${res.data.data.token.token_refresh}`;
      const profile = res.data.data.user;
      profile.profile_photo_url = `${API_HOST.url}/avatar-storage/${res.data.data.user.image_file}`;

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
