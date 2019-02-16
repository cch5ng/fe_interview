const passport = require('passport');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const FEUserTable = require('../fe_user/table');

const router = Router();


router.post('/register', (req, res, next) => {
	let {email, password} = req.body;
	FEUserTable.storeUser({email, password})
  	.then(userId => { 
  		res.json(userId);
  	})
		.catch(err => {
			let message;
			if (err.detail.indexOf('already exists') > -1) {
				message = 'user already exists';
			}
			res.json({error: message});
		})
})

router.post('/login', (req, res, next) => {
	let {email, password} = req.body;
	FEUserTable.findByEmail({email, password})	
		.then(result => {
			if (result.error) {
				res.json(result);
			}
			if (result.userId) {
				if (process.env.JWT_SECRET) {
					var token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET, { expiresIn: '72h' });
					res.json({jwt: token, email });
				} else {
					res.json({error: 'error getting token'});
				}
			}
		})
		.catch(err => console.error('error', err))
})




module.exports = router;
