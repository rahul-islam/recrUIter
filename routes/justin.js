const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
	res.sendFile(path.resolve('static/justin/Login.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.resolve('static/justin/RecrUIter-Home.html'));
});

router.get('/resetpwd', (req, res) => {
    res.sendFile(path.resolve('static/justin/resetpwd.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('static/justin/signup.html'));
});

router.get('/test', (req, res) => {
	res.sendFile(path.resolve('static/justin/test.html'));
});

module.exports = router;