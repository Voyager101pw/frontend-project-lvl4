const ru = {
  translation: {
    languages: {
      ru: 'Русский',
      en: 'English',
    },
    signUp: {
      title: 'Регистрация',
      name: 'Имя пользователя',
      pass: 'Пароль',
      passConfirm: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        notUniq: 'Такой пользователь уже существует',
        someError: 'Запрос завершился ошибкой',
      },
    },
    logIn: {
      title: 'Войти',
      name: 'Ваш ник',
      pass: 'Пароль',
      submit: 'Войти',
      noAccount: 'Нет аккаунта? ',
      registration: 'Регистрация',
      error: {
        failLogIn: 'Неверные имя пользователя или пароль',
      },
    },
    chatPage: {
      exit: 'Выйти',
      channels: 'Каналы',
      messages: 'сообщений',
      input: 'Введите сообщение',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    modals: {
      sendBtn: 'Отправить',
      cancelBtn: 'Отменть',
      removeBtn: 'Удалить',
      add: {
        title: 'Добавить канал',
      },
      rename: {
        title: 'Переименовать канал',
      },
      remove: {
        title: 'Удалить канал',
        body: 'Уверены?',
      },
    },
    errors: {
      required: 'Обязательное поле',
      minMax: 'От 3 до 20 символов',
      uniq: 'Имя канала должно быть уникальным',
      least6: 'Не менее 6 символов',
      passMatch: 'Пароли должны совпадать',
      obscene: 'Не должно содержать непристойных слов',
    },
    toasts: {
      add: 'Канал добавлен 🎉',
      rename: 'Канал переименован.',
      remove: 'Канал удален',
      failAdd: 'Ошибка добавления канала',
      failRename: 'Не удалось переименовать канал',
      failRemove: 'Не удалось удалить канал',
      failSendMsg: 'Ошибка отправки сообщения',
      failLogIn: 'Ошибка соединения',
    },
  },
};

export default ru;
