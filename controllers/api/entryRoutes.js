const router = require('express').Router();
const { Entry, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newEntry = await Entry.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const allEntries = await Entry.findAll(
      {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    }
    )
    res.status(200).json(allEntries);
  }
  catch (err) {
    res.json(err);
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const individualEntry = await Entry.findByPk(req.params.id, 
      {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    }
    )
    res.status(200).json(individualEntry);
  }
  catch (err) {
    res.json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;