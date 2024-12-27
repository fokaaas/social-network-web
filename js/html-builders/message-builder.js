export default {
  getMessages(messages) {
    let html = '';
    for (const message of messages) {
      html += `
        <div class="message p-3 border-bottom">
          <strong>${message.name} ${message.surname}: </strong><span>${message.content}</span>
        </div>`;
    }
    return html;
  }
}
