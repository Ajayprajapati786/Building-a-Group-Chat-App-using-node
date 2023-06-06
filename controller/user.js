const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Error creating user backend');
      return;
    }

    console.log(name, email, hashedPassword);

    user
      .create({
        name: name,
        email: email,
        password: hashedPassword,
      })
      .then(() => {
        res.status(201).json({ message: 'User created successfully' });
      })
      .catch((err) => {
        console.error('Error creating user:', err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(400).send('Email address already exists');
        } else {
          res.status(500).send('Error creating user backend');
        }
      });
  });
};



exports.postLogin = (req, res) => {
    const { email, password } = req.body;
  
    user
      .findOne({
        where: { email: email },
      })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(404).send('User not found');
          return;
        }
  
        bcrypt.compare(password, foundUser.password, (err, result) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).send('Error logging in');
            return;
          }
  
          if (result) {
            // Generate a JWT
            const token = jwt.sign({ userId: foundUser.id }, 'your-secret-key', {
              expiresIn: '1h', // Token expiration time
            });
  
            res.status(200).json({ message: 'Login successful', token: token });
          } else {
            res.status(401).send('Invalid password');
          }
        });
      })
      .catch((err) => {
        console.error('Error finding user:', err);
        res.status(500).send('Error logging in');
      });
  };