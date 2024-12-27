import authApi from '../api/auth-api';

export default {
  signUp: async function (signUpData) {
    const tokenData = await authApi.signUp(signUpData);
    localStorage.setItem('jwt', tokenData.token);
  },

  signIn: async function (signInData) {
    const tokenData = await authApi.signIn(signInData);
    localStorage.setItem('jwt', tokenData.token);
  },

  me: async function () {
    return authApi.me();
  }
}
