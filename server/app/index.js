const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const testRouter = require('./api/test');
const questionRouter = require('./api/question');
const authRouter = require('./api/auth');
const FEUserTable = require('./fe_user/table');

// passport auth configure
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//TODO store secret, figure out other options
//opts.secretOrKey = 'secret';
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
//passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //TODO how to verify the jwt for the user
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
//}));

const app = express();

app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json());
//app.use(passport.initialize());
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
