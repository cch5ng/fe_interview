const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
const path = require('path')
const testRouter = require('./api/test_endpoint');
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
opts.jwtFromRequest = ExtractJwt.fromBodyField('token');
opts.secretOrKey = process.env.JWT_SECRET;
opts.passReqToCallback = true;
passport.use(new JwtStrategy(opts, function(req, jwt_payload, done) {
  let userId = jwt_payload.userId;

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

app.use(function(req, res, next) {
  let allowed;
  allowed = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ROOT_PROD : process.env.CLIENT_ROOT;

  res.header("Access-Control-Allow-Origin", "*"); // "*"
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(cors({ origin: process.env.CLIENT_ROOT_PROD }));
// } else if (process.env.NODE_ENV === 'develop') {
//   app.use(cors({ origin: process.env.CLIENT_ROOT }));
// }
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/test', testRouter);
app.use('/api/question', questionRouter);
app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
  });
}

module.exports = app;
