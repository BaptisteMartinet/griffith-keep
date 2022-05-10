# Griffith Keep

Griffith Keep is a [Google Keep](https://keep.google.com) clone made at [Griffith College Dublin](https://www.griffith.ie/).

## Stack
 - [Angular](https://angular.io/)
 - [Express](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)

## Setup steps
 - Install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
 - [Setup the Angular CLI](https://angular.io/guide/setup-local)
 - Clone the project
 - Copy past `.env.example` to simply `.env`
 - Run `npm install`
 - Run the server using `node server.js` in a separated prompt
 - Run the application using `ng serve --open`

## Workflow
 - use `ng generate component components/component-name` to create a component
 - use `ng generate service services/service-name` to create a service
 - Commit your work with git:
```
git add ./src/
git commit -m "message"
git push
```
