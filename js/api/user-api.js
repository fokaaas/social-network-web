import userApi from './client-api'

export default {
  clientApi: userApi('/users'),

  getUsers: async function () {
    const endpoint = '/';
    return this.clientApi.getAsync(endpoint);
  },

  createFriendship: async function (receiverId) {
    const endpoint = `/${receiverId}/friendships`;
    await this.clientApi.postAsync(endpoint, {});
  },

  getFriendships: async function (userId) {
    const endpoint = `/${userId}/friendships`;
    return this.clientApi.getAsync(endpoint);
  },

  updateFriendship: async function (senderId, receiverId, updateFriendshipData) {
    const endpoint = `/${senderId}/friendships/${receiverId}`;
    await this.clientApi.patchAsync(endpoint, updateFriendshipData);
  },

  deleteFriendship: async function (senderId, receiverId) {
    const endpoint = `/${senderId}/friendships/${receiverId}`;
    await this.clientApi.deleteAsync(endpoint);
  }
};
