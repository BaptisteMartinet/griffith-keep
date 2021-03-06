# Griffith Keep

[Griffith Keep](https://griffith-keep.vercel.app/) is a [Google Keep](https://keep.google.com) clone made at [Griffith College Dublin](https://www.griffith.ie/).

## Stack
 - [Angular](https://angular.io/)
 - [Express](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)

## Setup steps
 - Install [MongoDB Community](https://www.mongodb.com/try/download/community?tck=docs_server)
 - [Setup the Angular CLI](https://angular.io/guide/setup-local)

Backend setup:
 - Clone the backend `git clone https://github.com/BaptisteMartinet/griffith-keep-api`
 - Copy past `.env.example` to simply `.env`
 - Run `npm install`
 - Run `npm start`

Frontend setup:
 - Clone the frontend `git clone git@github.com:BaptisteMartinet/griffith-keep.git`
 - Run `npm install`
 - Run the application using `npm start` or `ng serve --open`

## Workflow
 - use `ng generate component components/component-name` to create a component
 - use `ng generate service services/service-name` to create a service
 - Commit your work with git:
```
git add ./src/
git commit -m "message"
git push
```
