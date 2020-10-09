const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { userInDB, userAndPassInDB } = require('../db/sessions');
const { query } = require('../db/index');

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const rows = await query(userAndPassInDB(username, password));
        const id = rows[0]

        if (id) {
            const accessToken = await jwt.sign({ id }, process.env.ACCESSTOKENSECRET, { expiresIn: '1m' });
            const refreshToken = await jwt.sign({ id }, process.env.REFRESHTOKENSECRET, { expiresIn: '90m' });
            // res.cookie('refresh-token', refreshToken, { httpOnly:true, secure:true, signed:true, sameSite:true });
            res.cookie('refresh-token', refreshToken);
            // res.cookie('username', username, { httpOnly:true, secure:true, signed:true, sameSite:true });
            res.cookie('username', username);
            res.status(201).json({ token: accessToken });
        }
        else {
            throw 'Bad credentials';
        }
    } catch (e) {
        res.status(401).json({ error: new Error('Username/Password invalid')});
    }
    
})

router.post('/token', async (req, res, next) => {
    const username = req.cookies['username'];
    try {
        const rows = await query(userInDB(username));
        const id = rows[0]

        // check if user has a refresh token
        const refreshToken = req.cookies['refresh-token'];
        const isTokenValid = jwt.verify(refreshToken, process.env.REFRESHTOKENSECRET);
        
        if (isTokenValid) {
            const accessToken = await jwt.sign({ id }, process.env.ACCESSTOKENSECRET, { expiresIn: '1m' });
            const refreshToken = await jwt.sign({ id }, process.env.REFRESHTOKENSECRET, { expiresIn: '90m' });
            res.cookie('refresh-token', refreshToken);
            // res.cookie('refresh-token', refreshToken, { httpOnly:true, secure:true, signed:true, sameSite:true });
            res.status(201).json({ token: accessToken });
        } else {
            throw 'Invalid user or refresh token';
        }
    } catch (e) {
        res.status(401).send(e+'Unable to send token. User must sign in again');
    }
    
})

router.delete('/logout', (req, res, next) => {
    // refresh token killed implies can no longer get tokens
    // hence user must login again
    res.cookie('refresh-token', 0, { maxAge: 0 });
})

module.exports = router;

// Grant user a token (1 min) and refresh token (90 min)
// Everytime a user requests a token, reset refresh token time
// If refresh token expires, then user must login again

// Refresh token is stored only in cookies
// If user makes too many requests then stop them from making anymore request for 1 min