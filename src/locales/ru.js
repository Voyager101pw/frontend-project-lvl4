const ru = {
  translation: {
    languages: {
      ru: 'Русский',
      en: 'English',
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passConfirm: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        userExist: 'Такой пользователь уже существует',
        someError: 'Запрос завершился ошибкой',
      },
    },
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      noAccount: 'Нет аккаунта? ',
      registration: 'Регистрация',
      failLogin: 'Неверные имя пользователя или пароль',
    },
    chatPage: {
      exit: 'Выйти',
      channels: 'Каналы',
      messages: 'сообщений',
      input: 'Введите сообщение',
      remove: 'Удалить',
      rename: 'Переименовать',
      channelIsNotSelected: 'Канал не выбран',
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
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
      failAdd: 'Ошибка добавления канала',
      failRename: 'Не удалось переименовать канал',
      failRemove: 'Не удалось удалить канал',
      failSendMsg: 'Ошибка отправки сообщения',
      failLogin: 'Попробуйте еще раз! 😉',
      successLogin: 'С возвращением',
      successSignup: 'Добро пожаловать',
      errorNetwork: 'Ошибка соединения',
    },
  },
};

export default ru;
