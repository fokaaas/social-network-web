import userApi from '../api/user-api';
import authApi from '../api/auth-api';
import friendshipStatus from '../utils/friendship-status';

export default {
  getUsers: async function () {
    const usersData = await userApi.getUsers();
    const me = await authApi.me();
    const friendshipsData = await userApi.getFriendships(me.id);
    const users = [];
    for (const user of usersData.users) {
      if (user.id === me.id) continue;
      const friendship = friendshipsData.friendships
        .find(friendship => friendship.receiverId === user.id || friendship.senderId === user.id);
      const status = friendship
        ? friendship.senderId === me.id && friendship.status === 'Pending'
          ? friendshipStatus.PENDING_SENDER : friendship.receiverId === me.id && friendship.status === 'Pending'
            ? friendshipStatus.PENDING_RECEIVER
            : friendship.status === 'Accepted' ? friendshipStatus.ACCEPTED : friendshipStatus.REJECTED
        : friendshipStatus.NONE;
      users.push({
        id: user.id,
        name: user.name,
        surname: user.surname,
        avatarLink: user.avatarLink,
        status,
      });
    }
    return users;
  },

  sendRequest: async function (receiverId) {
    await userApi.createFriendship(receiverId);
  },

  acceptRequest: async function (senderId) {
    const me = await authApi.me();
    await userApi.updateFriendship(senderId, me.id, { status: 'Accepted' });
  },

  rejectRequest: async function (senderId) {
    const me = await authApi.me();
    await userApi.updateFriendship(senderId, me.id, { status: 'Rejected' });
  },

  getFriendsForSelect: async function () {
    const me = await authApi.me();
    const friendshipsData = await userApi.getFriendships(me.id);
    const friends = [];
    for (const friendship of friendshipsData.friendships) {
      if (friendship.status === 'Accepted') {
        if (friendship.senderId === me.id) {
          friends.push({
            id: friendship.receiverId,
            name: friendship.receiverName,
            surname: friendship.receiverSurname,
          });
        } else {
          friends.push({
            id: friendship.senderId,
            name: friendship.senderName,
            surname: friendship.senderSurname,
          });
        }
      }
    }
    return friends
  },
}
