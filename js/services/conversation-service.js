import conversationApi from '../api/conversation-api';
import authApi from '../api/auth-api';

export default {
  getConversations: async function () {
    const conversationsData = await conversationApi.getConversations();
    return conversationsData.conversations;
  },

  createConversation: async function (conversationData) {
    const me = await authApi.me();
    conversationData.participantIds.push(me.id);
    await conversationApi.createConversation(conversationData);
  },

  getConversation: async function (conversationId) {
    return conversationApi.getConversation(conversationId);
  }
}
