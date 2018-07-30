const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

const urldb = 'mongodb://danilo:xxxxxx@ds111138.mlab.com:11138/mylistof';

var db

MongoClient.connect(urldb, (err, client) => {
	if (err) 
		return console.log(err)
	db = client.db('mylistof')
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) 
		return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})