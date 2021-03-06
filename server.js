const express = require('express');
const bodyParser = require('body-parser')
var bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/singin');
const profileGet = require('./controllers/profileGet');
const image = require('./controllers/image');

/* knex conection to the postgresql database allocated in heroku*/
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : true,
    }
  });
// bodyParser allows us to format the responses and requests
app.use(bodyParser.json());
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());


app.get('/', (req,res)=>res.json('welcome')); 
app.post('/signin', (req, res) => { signin.handleSignIn(req,res,db,bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id',(req, res) => { profileGet.handleProfileGet(req,res,db)});
app.put('/image', (req,res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req,res) => { image.handleApiCall(req, res)});

// second parameter is a function that runs right after the listen
app.listen(process.env.PORT || 300,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
