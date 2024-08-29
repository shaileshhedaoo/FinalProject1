const express = require('express');
const router = express.Router();

const {
    getAnswerById,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    approveAnswer,
    getApprovedAnswersForQuestion,
    getUnApprovedAnswersForQuestion,
    likeAnswer,
    unlikeAnswer,
    getNumOfLikesForAnswer,
    getAllAnswers,
    disapproveAnswer
} = require('../controllers/answersController.js');

const { protect, admin } = require('../middleware/authMiddleware.js');

// Routes for answer management
router.get('/approved/:qid', protect, getApprovedAnswersForQuestion);
router.get('/unapproved/:qid', protect, admin, getUnApprovedAnswersForQuestion);
router.get('/id/:id', protect, admin, getAnswerById);
router.post('/:qid', protect, createAnswer);
router.put('/approve/:id', protect, admin, approveAnswer);
router.delete('/:id', protect, admin, deleteAnswer);
router.put('/like/:id', protect, likeAnswer);
router.put('/unlike/:id', protect, unlikeAnswer);
router.get('/likescount/:id', getNumOfLikesForAnswer);
router.get('/answers', getAllAnswers);
router.put('/disapprove/:id', protect, admin, disapproveAnswer); // Correct route for disapproving answers
router.put('/:id', protect, updateAnswer);

module.exports = router;
