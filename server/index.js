require('dotenv').config();
const express = require('express');
const massive = require('massive');
const ctrl = require('./controller');
const sessions = require('express-session')

const {SERVER_PORT, DB_CONNECTION, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    naxAge: null
}))

massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`if you are quiet you can hear port ${SERVER_PORT}`)
    })
})

// authentication
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)

//user data
app.get('/api/user', ctrl.getUser)
