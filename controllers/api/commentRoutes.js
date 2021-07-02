const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(req.body)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const allComments = await Comment.findAll(
      {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    }
    )
    res.status(200).json(allComments);
  }
  catch (err) {
    res.json(err);
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const individualComment = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
    res.status(200).json(individualComment);
  }
  catch (err) {
    res.json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;