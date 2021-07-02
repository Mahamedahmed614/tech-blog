const router = require('express').Router();
const { User, Entry, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [
        {
          model: Entry,
          attributes: ['title']
        },
        {
          model: Comment,
          attributes: ['id']
        }
      ]
    })
    res.status(200).json(allUsers);
  }
  catch (err) {
    res.json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const individualUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Entry,
          attributes: ['title']
        },
        {
          model: Comment,
          attributes: ['id']
        }
      ]
    })
    res.status(200).json(individualUser);
  }
  catch (err) {
    res.json(err);
  }
})

router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;