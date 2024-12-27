import clientApi from './client-api';

export default {
  clientApi: clientApi('/auth'),

  signUp: async function (signUpData) {
    const endpoint = '/sign-up';
    return  this.clientApi.postAsync(endpoint, signUpData);
  },

  signIn: async function (signInData) {
    const endpoint = '/sign-in';
    return this.clientApi.postAsync(endpoint, signInData);
  },

  me: async function () {
    const endpoint = '/me';
    return this.clientApi.getAsync(endpoint);
  }
}
