import $ from 'jquery';
import authService from './services/auth-service';
import userService from './services/user-service';
import usersHtmlBuilder from './html-builders/users-builder';
import conversationService from './services/conversation-service';
import conversationHtmlBuilder from './html-builders/conversations-builder';
import messageBuilder from './html-builders/message-builder';
import messageService from './services/message-service';

const whiteList = ['/sign-up/', '/sign-in/'];

$(document).ready(async () => {
  if (!whiteList.includes(window.location.pathname)) {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/sign-in';
    } else {
      const { name, surname, avatarLink } = await authService.me();
      $('#userName').text(`${name} ${surname}`);
      if (avatarLink) $('#userAvatar').attr('src', avatarLink);
    }
  }

  // Sign up and sign in forms

  $('#signUpForm').on('submit', async function (e) {
    e.preventDefault();
    if (this.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await authService.signUp({
        name: $('#name').val(),
        surname: $('#surname').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        avatarLink: $('#avatarLink').val(),
      });
      window.location.href = '/';
    }
    this.classList.add('was-validated');
  });

  $('#signInForm').on('submit', async function (e) {
    e.preventDefault();
    if (this.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await authService.signIn({
        email: $('#signInEmail').val(),
        password: $('#signInPassword').val(),
      });
      window.location.href = '/';
    }
    this.classList.add('was-validated');
  });

  // Tabs

  const hideAllTabs = () => {
    $('#usersContent').hide();
    $('#chatsContent').hide();
  };

  $('#usersTab').click(async () => {
   hideAllTabs();
   const users = await userService.getUsers();
   const html = usersHtmlBuilder.getUserList(users);
    $('#usersContent').html(html).show();
  });

  $(document).on('click', '.accept-request', async function () {
    const userId = $(this).attr('id');
    await userService.acceptRequest(userId);
    $('#usersTab').click();
  });

  $(document).on('click', '.reject-request', async function () {
    const userId = $(this).attr('id');
    await userService.rejectRequest(userId);
    $('#usersTab').click();
  });

  $(document).on('click', '.send-request', async function () {
    const userId = $(this).attr('id');
    await userService.sendRequest(userId);
    $('#usersTab').click();
  });

  $('#friendsTab').click(async () => {
    hideAllTabs();
  });

  $('#chatsTab').click(async () => {
    hideAllTabs();
    const users = await userService.getFriendsForSelect();
    const usersHtml = usersHtmlBuilder.getSelectList(users);
    $('#groupUsers').html(usersHtml);
    $('#userSelect').html(usersHtml);

    const chats = await conversationService.getConversations();
    const conversationsHtml = conversationHtmlBuilder.getConversations(chats);
    $('#chatsList').html(conversationsHtml);

    $('#chatsContent').show();
  });

  $('#privateChatModal .btn-success').on('click', async function () {
    const selectedUser = $('#userSelect').val();
    await conversationService.createConversation({
      participantIds: [+selectedUser],
    });
    $('#chatsTab').click();
  });

  $('#groupChatModal .btn-primary').on('click', async function () {
    const name = $('#groupName').val().trim();
    const description = $('#groupDescription').val().trim();
    const selectedUsers = $('#groupUsers').val();

    await conversationService.createConversation({
      participantIds: selectedUsers.map(Number),
      groupDetails: {
        name,
        description,
      }
    });
    $('#chatsTab').click();
  });

  $(document).on('click', '.list-group-item', async function () {
    $('.message').remove();
    const conversationId = $(this).attr('id');
    const conversation = await conversationService.getConversation(conversationId);
    $('#chatTitle').text(conversation.name).attr('data-conv-id', conversation.id);
    $('#chatDescription').text(conversation.description ? conversation.description : '');
    const messagesHtml = messageBuilder.getMessages(conversation.messages);
    $('#welcome-message').after(messagesHtml);
  });

  $(document).on('click', '#sendMessage', async function () {
    const content = $('#messageInput').val();
    const conversationId = $('#chatTitle').attr('data-conv-id');
    await messageService.createMessage({ conversationId: Number(conversationId), content });
    $(`#${conversationId}`).click();
    $('#messageInput').val('')
  });
});
