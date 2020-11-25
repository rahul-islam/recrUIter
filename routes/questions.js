const express = require('express');
const router = express.Router();
router.get('/1', (req, res) => {
	res.render('questions/question1', {});
});

router.get('/2', (req, res) => {
	res.render('questions/question2', {});
});




module.exports = router;
