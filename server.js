const express = require('express');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'adarshserver1',
    database: 'amemeusers'
  }
});

/*console.log(postgres.select('*').from('users').then(data => {
  console.log(data);
}));*/

/*db.select('*').from('users').then(data =>{
  console.log(data);
});*/

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(database.users) })


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








app.listen(5505, () => {
  console.log('apppppppppppppppp  listeninh8')
})