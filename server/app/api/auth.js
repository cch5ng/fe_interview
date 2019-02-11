const passport = require('passport');
const { Router } = require('express');
const FEUserTable = require('../fe_user/table');

const router = Router();

router.post('/login', 
	passport.authenticate('local'),
	(req, res, next) => {
		if (res) {console.log('res', res)}

	// XXX
	// 	.then(result => {
	// 	})
	// 	.catch(err => console.error('error', err))
})




module.exports = router;
