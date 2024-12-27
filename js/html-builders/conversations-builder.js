export default {
  getConversations(conversations) {
    let html = '';
    for (const conversation of conversations) {
      html += `
        <li class="list-group-item d-flex align-items-center" id="${conversation.id}">
          <img src="${conversation.avatarLink || '../default-chat-avatar.jpg'}" alt="Chat Avatar" class="rounded-circle me-2" width="30" height="30" />
          ${conversation.name}
        </li>`;
    }
    return html;
  },
}
