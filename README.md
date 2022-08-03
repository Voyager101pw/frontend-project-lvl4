# Hexlet Chat 
[Hexlet Chat](https://project-hexlet-chat.herokuapp.com/login) - это мультиязычное и многопользовательское real-time приложение реализующее функционал чата (аналог Slack-чата).

[Превью функционала в конце Readme](https://github.com/Voyager101pw/frontend-project-lvl4/edit/main/README.md#%D0%BF%D1%80%D0%B5%D0%B2%D1%8C%D1%8E-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D0%B0)

Демонстрационная версия проекта на **[>> Heroku <<](https://project-hexlet-chat.herokuapp.com/login)**

[![github action status](https://github.com/hexlet-components/projects-frontend-l4-server/workflows/Node%20CI/badge.svg)](../../actions)


## Полученные навыки:
- [x] разработка Reaсt приложения на React Hooks
- [x] настройка взаимодействия приложения со стейтом: Redux Toolkit
- [x] организация роутинга: React-Router
- [x] верстка с помощью React-Bootstrap
- [x] валидация пользовательского ввода внутри формы
- [x] интернационализация интерфейса приложения
- [x] взаимодействие с серверной частью через веб-сокеты (Socket.IO)
- [x] работа с библиотеками Formik, React-Toastify, leo-profanity
- [x] отслеживание ошибок в Rollbar
- [x] развертывание приложения на Heroku 

## Функционал приложения:
* Регистрация и аутентификация пользователей;
* Управление каналами чата;
* Мгновенная отправка и получение сообщений;
* Фильтрация нецензурных слов (ru/en);
* Валидация форм;
* Выборка локали (ru/en).


## Стек технологий и библиотек:
* **React | Redux Toolkit | Bootstrap**
* **Formik | Yup | i18next | axios | react-toastify | leo-profanity**
* **AJAX | REST | JWT-токены | socket.io**
* **Webpack | Heroku | Rollbar**
* **Redux dev-tool | Profiler(test performance)**

## Особенности
- Адаптивность. Для поддержки единообразия интерфейса на разных разрешениях экрана (sm,md,xl,xxl) была задействована сеточная система(grid) бутстрапа из 12-столбцов. 
- Дизайн. Для достижения одинакового отображения внешнего вида и поведения интерфейса в разных браузерах была задейтсвована библиотеки bootstrap и набор готовых компонентов из react-bootstrap.


## Установка

```
// GIT: Step download
git clone git@github.com:Voyager101pw/frontend-project-lvl4.git

// NPM: Install deps
npm ci
OR
make install

// RUN
make start // start backend 8090 port & frontend 5000 prot

// BROWSER
http://localhost:5555
```
# Превью функционала
- [x] Регистрация и аутентификация пользователей;
- [x] Валидация форм;
- [x] Выборка локали (ru/en).

![1](https://user-images.githubusercontent.com/78823465/182243390-4a4999d6-4f51-416d-9957-441cd8479606.gif)

- [x] Управление каналами чата;

![2](https://user-images.githubusercontent.com/78823465/182245862-43fa72bf-c390-443e-983a-0ddf1ab5847b.gif)

- [x] Мгновенная отправка и получение сообщений;

![2 1](https://user-images.githubusercontent.com/78823465/182245919-898e4fd4-2abb-45fb-8ca0-90508246dc9c.gif)

- [x] Фильтрация нецензурных слов (ru/en);

![3](https://user-images.githubusercontent.com/78823465/182248606-21bbff89-d6cf-402b-9e53-821fafa8d99c.gif)
