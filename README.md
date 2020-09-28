## Дипломная работа Backend

Публичный ip: 84.201.179.102
url: https://api.explorer-news.ml
github: https://merymegg.github.io/news-explorer-api/

Версия: 0.0.1

**Автор:** Скосырская Мария

## Цели:

- создать API для сервиса по поиску новостей
- создать удаленный сервер и развернуть на нем API

## Задачи:

- настроить авторизацию и аутентификацию 
- создать схемы и модели для статей и пользователей
- создать контроллеры и роуты для пользователей
- создать контроллеры и роуты для статей
- создать контроллеры и роуты для авторизации и аутентификации
- обеспечить безопасность
- настроить централизованную обработку ошибок
- настроить валидацию запросов
- реализовать логирование запросов и ошибок
- создать и настроить облачный сервер
- подготовить и задеплоить бекэнд на сервер
- создать домен и прикрепить его к серверу
- выпустить сертификать SSL

## Стек технологий:

- ES6
- JavaScript
- npm
- Express
- MongoDB
- Mongoose
- ESlint
- EditorConfig
- Nodemon
- Joi и celebrate
- Git

## Пакеты которые используются в сборках:

- [EditorConfig](https://metanit.com/web/nodejs/6.6.php)
- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Nodemon](https://nodemon.io/)
- [Validator](https://www.npmjs.com/package/validator)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [helmet](https://www.npmjs.com/package/helmet)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [joi](https://joi.dev/api/?v=17.2.1)
- [celebrate](https://github.com/arb/celebrate)
- [winston](https://github.com/winstonjs/winston)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [pm2](https://www.npmjs.com/package/pm2)
- [nginx](https://nginx.org/ru/)
- [certbot](https://certbot.eff.org/)

## Работа с API

| ЗАПРОС | ОБЯЗАТЕЛЬНЫЕ ПОЛЯ В ТЕЛЕ ЗАПРОСА | ОТВЕТ | 
| :---         |     :---       |  :---         |
| POST `api.explorer-news.ml/signup`  | name, email, password | Регистрация нового пользователя. В ответе: статус - 201, объект с данными зарегистрированного пользователя - name и email |
| POST `api.explorer-news.ml/signin`   | email, password | Авторизация зарегистрированного пользователя. В ответе: "Авторизация прошла успешно  |
| GET `api.explorer-news.ml/users/me`  | тело запроса отсутствует | Получение информации о пользователе. В ответе: объект с данными авторизированного пользователя - name и email      |
| GET `api.explorer-news.ml/articles`   | тело запроса отсутствует  | Получение всех всех статей сохраненных пользователем. В ответе: массив объектов с данными статей сохраненных авторизированным пользователем. Содержатся все поля обязательные для создания статьи и owner | 
| POST `api.explorer-news.ml/articles`   | keyword, title, text, date, source, link, image | Создание статьи. В ответе: статус - 201, объект с данными созданной статьи   | 
| DELETE `api.explorer-news.ml.me/articles/:id` | тело запроса отсутствует   | Удаление статьи. В ответе:объект с данными удаленной статьи | 



## Инструкция по запуску проекта

Скачать или склонировать репозиторий

```bash

# установка зависимостей
$ npm install

# запуск MongoDB
$ mongod

# запуск сервера с "горячей" перезагрузкой на localhost:3000
$ npm run dev

# запуск сервера на localhost:3000
$ npm run start


```
