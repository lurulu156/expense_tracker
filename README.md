# Expense Tracker
A simple web application for expense tracker
![image](./public/snapshot_expense_tracker.JPG)

## Features
#### Main page
- user registeration and authentication 
- login from Facebook
- listing expenses with relationship to the user from seeds in MongoDB
- sorting expenses by the category.
- add a new expense by clicking the center-bottom button
- update the expense info by clicking the edit button
- delete the expense by clicking the delete button

## How to install
1. Install node.js
2. Clone this project to local
3. After opening the file in local, go to the folder by terminal and then input
```bash
  npm install
```
4. After the installation, prepare your own MongoDB link: MONGODB_URI
5. If you already have a list, you could generate the seeds by inputting:
```bash
  npm run seed
```
or  you could just directly run the app by inputting:
```bash
  npm run start
```

7. If you see below message, it means it's running successfully. And just type the URL into the browser.
```bash
  Express is listening on http://localhost:3000
```
8. Exist it by :
```bash
   ctrl + c
```
### Languages & Packages
- Javascript
- Express @4.16.4
- Express-Handlebars @3.0.0
- Node.js @16.18.0
- Bootstrap @5.2.2
- Font-awesome @6.2.0
- Mongoose @5.9.7

