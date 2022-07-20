const en = {
  translation: {
    languages: {
      ru: 'Russian',
      en: 'English',
    },
    signUp: {
      title: 'Sign Up',
      name: 'Username',
      pass: 'Password',
      passConfirm: 'Confirm password',
      submit: 'Create an Account',
      errors: {
        notUniq: 'This user is already registered',
        someError: 'The request ended with an error',
      },
    },
    logIn: {
      title: 'Log in',
      name: 'Your username',
      pass: 'Your password',
      submit: 'Log in',
      noAccount: 'New to hexlet chat? ',
      error: {
        failLogIn: 'Your username or password is not correct',
      },
    },
    chatPage: {
      exit: 'Sign out',
      channels: 'Channels',
      messages: 'messages',
      input: 'Input message...',
      remove: 'Remove',
      rename: 'Rename',
      channelIsNotSelected: 'Channel is not selected',
    },
    modals: {
      sendBtn: 'Send',
      cancelBtn: 'Cancel',
      removeBtn: 'Remove',
      add: {
        title: 'Add channel',
      },
      rename: {
        title: 'Rename channel',
      },
      remove: {
        title: 'Remove channel',
        body: 'Are you sure?',
      },
    },
    errors: {
      least6: 'At least 6 characters',
      passMatch: 'Password must match',
      required: 'Required field',
      minMax: '3 to 20 characters',
      uniq: 'Channel name must be unique',
      obscene: 'Should not contain obscene words',
    },
    toasts: {
      add: 'Channel is added 🎉',
      rename: 'Channel renamed.',
      remove: 'Channel removed',
      failAdd: 'Error channel adding',
      failRename: 'Failed to rename channel',
      failRemove: 'Failed to delete channel',
      failSendMsg: 'Failed to send message',
      failLogIn: 'No connection',
    },
  },
};

export default en;
