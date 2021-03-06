const express = require('express');

const candidateController = require('../controllers/candidate');

const router = express.Router();

router.post('/register', candidateController.registerCandidate);

router.post('/addScores', candidateController.addCandidateScores);

module.exports = router;
