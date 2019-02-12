const passport = require('passport');
const { Router } = require('express');
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

// router.post('/login', 
// 	passport.authenticate('local'),
// 	(req, res, next) => {
// 		if (res) {console.log('res', res)}

// 	// XXX
// 	// 	.then(result => {
// 	// 	})
// 	// 	.catch(err => console.error('error', err))
// })




module.exports = router;
