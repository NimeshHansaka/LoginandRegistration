


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

//  http://localhost:8070/user/register
router.route('/register').post((req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  const newUser = new User({ name, email, password, confirmpassword });

  newUser
    .save()
    .then(() => {
      res.json('User registered successfully from backend');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to register user' });
    });
});

//  http://localhost:8070/user/login
router.route('/login').post((req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign({ email }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
          const refreshToken = jwt.sign({ email }, 'jwt-refresh-token-secret-key', { expiresIn: '5m' });
          
          res.cookie('accessToken', accessToken, { maxAge: 60000 });
          res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, sameSite: 'strict' });

          return res.json({ login: true });
        } else {
          return res.json({ login: false, error: 'Password is incorrect' });
        }
      } else {
        return res.json({ login: false, error: 'User not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to log in' });
    });
});

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    } else {
      return res.status(403).json({ valid: false, error: 'No access token provided' });
    }
  } else {
    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, error: 'Access token is invalid' });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let tokenRenewed = false;

  if (!refreshToken) {
    res.json({ valid: false, message: 'No refresh token' });
  } else {
    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
      if (err) {
        res.json({ valid: false, error: 'Refresh token is invalid' });
      } else {
        const newAccessToken = jwt.sign({ email: decoded.email }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
        res.cookie('accessToken', newAccessToken, { maxAge: 60000 });
        tokenRenewed = true;
      }
    });
  }

  return tokenRenewed;
};

//  http://localhost:8070/user/dashboard
router.route('/dashboard').get(verifyUser, (req, res) => {
  return res.json({ valid: true, message: 'Authorized' });
});

module.exports = router;
