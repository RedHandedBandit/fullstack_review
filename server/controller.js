const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res) => {
        console.log('endpoint reg', req.body)
        const { username, password} = req.body
        const { session } = req
        const db = req.app.get('db')

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        //pass in password and salt --> hashSync will create the encryptied password combined with all 3

        // console.log({hash})
        let newUser = await db.user.register({user: username, pass: hash })
        // user and pass is connected to the register.sql

        newUser = newUser[0]
        console.log({newUser})
        console.log({session})
        session.user = {...newUser};
        console.log({session})
        res.status(201).send(session.user);
    },

    login: async (req,res) => {
        console.log('endpoint login', req.body)
        const {username, password} = req.body
        const {session} = req

        const db = req.app.get('db')
        let user = await db.user.login({user: username});
        // console.log({user})
        user = user[0]; // pulling the object out of the array 
        if (!user) {
            return res.sendStatus(418)
        }
        // console.log({user})

        const foundUser = bcrypt.compareSync(password, user.password);
        // console.log({foundUser})
        if (foundUser) {
            delete user.password
            session.user = user;
            res.status(200).send(session.user);
        } else {
            res.sendStatus(401);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        const {user} = req.session
        console.log({user});
        if (user) {
            res.status(200).send(user);
        } else {
            res.sendStatus(418);
        }
    }
}