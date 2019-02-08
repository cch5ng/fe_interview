const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;
const testRouter = require('./api/test');
const questionRouter = require('./api/question');
const FEUserTable = require('./fe_user/table');

// passport auth configure

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

const app = express();

app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/test', testRouter);
app.use('/question', questionRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});

module.exports = app;
