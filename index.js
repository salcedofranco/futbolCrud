const express = require('express');
const homeRoute= require('./routes/home');
const mongoose = require('mongoose');
const club = require('./models/Club');
//const keys = require('./config/keys');
const bodyParser = require('body-parser');

//importar variables de entorno locales
require('dotenv').config({ path: 'variables.env'});



const app = express();

// MIDDLEWARE SETUP 
//VIEW ENGINE SETUP
app.set('view engine', 'ejs');


//Conexion local
//const uri= 'mongodb://127.0.0.1:27017/ucl_crud'


//conexion nube
//const uri = 'mongodb+srv://user-crud:93eAM1sHs9aFkh3Y@dbcluster-7tws3.mongodb.net/test?retryWrites=true&w=majority' ;


mongoose.connect(process.env.DB_URL, 
{useNewUrlParser: true, useUnifiedTopology: true}
);



const db = mongoose.connection;
db.on('error', () => console.log('Problema para conectar a la base de datos'));
db.once('open', () => {
    console.log('Conexion exitosa a la base de datos')
});




// STATIC FOLDER SETUP
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// ROUTING 
app.use('/', homeRoute);

// RUNNING SERVER 
const PORT = process.env.PORT || 3000;

const HOST = process.env.HOST || '0.0.0.0'; 

// STARTING THE SERVER
app.listen( PORT, HOST, ()=>{
    console.log('App corriendo en puerto', PORT);
})


//ESTE PUERTO ES PARA HEROKU
//app.listen(process.env.PORT, () => {
    //console.log("Puerto 3000 funcionando!");
 //});