import clientApi from './client-api';

export default {
  clientApi: clientApi('/conversations'),

  getConversations: async function () {
    const endpoint = '/';
    return this.clientApi.getAsync(endpoint);
  },

  createConversation: async function (conversationData) {
    const endpoint = '/';
    await this.clientApi.postAsync(endpoint, conversationData);
  },

  getConversation: async function (conversationId) {
    const endpoint = `/${conversationId}`;
    return this.clientApi.getAsync(endpoint);
  },
}
