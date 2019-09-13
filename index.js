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

// Session-persisted message middleware
app.use(function(req, res, next){
	var err = req.session.error;
	var msg = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
	next();
})

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