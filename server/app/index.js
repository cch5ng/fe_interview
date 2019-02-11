const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const testRouter = require('./api/test');
const questionRouter = require('./api/question');
const authRouter = require('./api/auth');
const FEUserTable = require('./fe_user/table');

// passport auth configure

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
  function(username, password, cb) {
    FEUserTable.findByEmail({email: username, password})
    	.then(userId => {
    		if (!userId) {return cb(null, false);}
    		return cb(null, userId);
    	})
    	.catch(err => cb(err))
  }));

const app = express();

app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/test', testRouter);
app.use('/question', questionRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});

module.exports = app;
