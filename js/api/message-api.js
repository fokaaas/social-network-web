import clientApi from './client-api';

export default {
  clientApi: clientApi('/messages'),

  createMessage: async function (messageData) {
    const endpoint = '/';
    await this.clientApi.postAsync(endpoint, messageData);
  },
}
