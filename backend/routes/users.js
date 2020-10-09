const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, createUser, getUser, deleteUser } = require('../db/users');
const { query } = require('../db/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await query(getAllUsers());
    return res.json(users)
  } catch (e) {
    return res.send(e);
  }
});

router.post('/', async (req, res, next) => {
  const {username, password, first_name=null, last_name=null} = req.body
  try {
    await query(createUser(username, password, first_name, last_name))
    return res.send('User created');
  } catch (e) {
    if (e.includes('users_username_key')) 
      return res.send('Username already exists');
    return res.send(`${e}: Could not create user`);
  }
})

router.get('/:userId', async (req, res, next) => {
  const userId = req.params['userId'];
  try {
    const user = await query(getUser(userId));
    return res.send(user);
  } catch (e) {
    return res.send(e);
  }
})

router.put('/:userId', async (req, res, next) => {
  const userId = req.params['userId'];
  const {username, password, firstName=null, lastName=null} = req.body
  try {
    const users = await query(updateUser(userId, {username, userPassword: password, firstName, lastName}));
    return res.json(users)
  } catch (e) {
    if (e.includes('users_username_key')) 
      return res.send('Username already exists');
    return res.send(e);
  }
})

router.delete('/:userId', async (req, res, next) => {
  const userId = req.params['userId'];
  const { password } = req.body;
  try {
    await query(deleteUser(userId, password))
    return res.send('User deleted');
  } catch(e) {
    return res.send(`Could not delete user. Please provide valid userId and password`);
  }
})

module.exports = router;