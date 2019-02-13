const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
const testRouter = require('./api/test');
const questionRouter = require('./api/question');
const authRouter = require('./api/auth');
const FEUserTable = require('./fe_user/table');

if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()
 
	if (result.error) {
  	throw result.error
	}
}

// passport auth configure
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//TODO store secret, figure out other options
opts.secretOrKey = process.env.JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'http://localhost:1234';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //TODO how to verify the jwt for the user

    let userId = jwt_payload.sub;

    FEUserTable.findById({ userId })
    	.then(email => {
    		if (email) { 
    			return done(null, email);
    		} else {
    			return done(null, false);
    		}
    	})
    	.catch(err => {
    		console.error('error', err);
    		return done(err, false);
    	})
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
