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



console.log(process.env.POSTGRES_URI)
/*console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)
console.log(process.env.POSTGRES_DB)
console.log(process.env.POSTGRES_HOST)*/
const postgres = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
    /*host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,//'postgres',
    password: process.env.POSTGRES_PASSWORD,//'adarshserver1',
    database: process.env.POSTGRES_DB//'amemeusers'*/
  
});

/*console.log(postgres.select('*').from('users').then(data => {
  console.log(data);
}));*/

/*db.select('*').from('users').then(data =>{
  console.log(data);
});*/

const app = express();
console.log('I love yooooooooooou?')
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send("ha ha ha") })


///////////////////////////////////////////////////////////////////////1
app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) })
/*app.post('/signin', (req, res) => {
  const {email, password} = req.body;
  postgres.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        //console.log(isValid);
        if (isValid) {
          return postgres.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
           // console.log(user);
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }else{res.status(400).json('wrong credentials')}
      }) 
          .catch(err=>res.status(400).json('wrong credentials'))
        
      })*/




app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) })
/*app.post('/register', (req, res)=>{
  const { email, name, password} = req.body;
  postgres('users').returning('*').insert({
email: email,
name: name,
joined: new Date()
  
} ).then(user=>{
res.json(user[0]);}).catch(err=> res.status(400).json('unable to join'))  })
*/

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres) })
/*app.get('/profile/:id', (req, res) =>{
  const {id}= req.params;
  postgres.select('*').from('users').where({
      id
    }).then(user =>{
      if(user.length){
      res.json(user[0])
  }else{
    res.status(400).json('not found')}
  })
.catch(err => res.status(400).json('error getting user'))
  })*/

app.put('/image', (req, res) => { image.handleImage(req, res, postgres) })
/*app.put('/image', (req, res) => {
  const{id}= req.body;
  postgres('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  }).catch(err => res.status(400).json('unable to get entiries'))
})*/
//////////////////////////////////////////////////////////////////1

app.listen(process.env.PORT || 5505, () => {
  console.log('apppppppppppppppp  listeninh9 ${process.env.PORT}')
})