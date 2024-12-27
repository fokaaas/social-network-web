import messageApi from '../api/message-api';

export default {
  createMessage: async function (messageData) {
    await messageApi.createMessage(messageData);
  }
}
