const express = require('express');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');


const postgres = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.POSTGRES_URI,
    ssl: true,
    /*host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,//'postgres',
    password: process.env.POSTGRES_PASSWORD,//'adarshserver1',
    database: process.env.POSTGRES_DB//'amemeusers'*/
  
}});


const app = express();
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());
app.get('/', function(req, res){res.redirect('/todo');});
app.get('/', (req, res) => { res.send("ha ha ha") })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres) })
app.put('/image', (req, res) => { image.handleImage(req, res, postgres) })
app.listen(process.env.PORT || 5505, () => {
  console.log('server is running ${process.env.PORT}')
})