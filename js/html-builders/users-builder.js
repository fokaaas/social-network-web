import status from '../utils/friendship-status';

export default {
  buttons: (userId) => ({
    [status.NONE]: `
          <button id="${userId}" class="send-request btn btn-success btn-sm w-100">Send Request</button>`,
    [status.PENDING_SENDER]: `
          <button id="${userId}" class="btn btn-secondary btn-sm w-100" disabled>Pending</button>`,
    [status.PENDING_RECEIVER]: `
          <button id="${userId}" class="accept-request btn btn-primary btn-sm">Accept</button>
          <button id="${userId}" class="reject-request btn btn-danger btn-sm">Reject</button>`,
    [status.ACCEPTED]: `
          <button id="${userId}" class="btn btn-success btn-sm w-100" disabled>Friends</button>`,
    [status.REJECTED]: `
          <button id="${userId}" class="btn btn-danger btn-sm w-100" disabled>Rejected</button>`,
  }),

  getUserList: function (users) {
    let html = '';
    for (const user of users) {
      html += `
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="${user.avatarLink || '../default-avatar.jpg'}" alt="User Avatar" class="rounded-circle me-3" style="width: 50px; height: 50px;">
            <div>${user.name} ${user.surname}</div>
          </div>
          <div>${this.buttons(user.id)[user.status]}</div>
        </div>
      </div>`;
    }
    return html;
  },

  getSelectList: function (friends) {
    let html = '';
    for (const friend of friends) {
      html += `<option value="${friend.id}">${friend.name} ${friend.surname}</option>`;
    }
    return html;
  },
}
