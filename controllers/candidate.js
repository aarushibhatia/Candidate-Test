const Candidate = require("../models/candidate");
const Test = require("../models/test")

exports.registerCandidate = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    if (email && name) {
        Candidate.findOne({ email: email })
            .then(candidate => {
                if (!candidate) {
                    const candidate = new Candidate({
                        email: email,
                        name: name
                    });
                    return candidate.save().then(result => {
                        res.status(200).send('User Added');
                      });
                } else
                    return res.status(422).send('Alredy Exist');
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    } else {
        const error = new Error("Plz input Name & Email");
        error.httpStatusCode = 200;
        return next(error);
    }
};

exports.addCandidateScores = (req, res, next) => {
    const email = req.body.email;
    const scores1 = req.body.round1 ? req.body.round1 : 0;
    const scores2 = req.body.round2 ? req.body.round2 : 0;
    const scores3 = req.body.round3 ? req.body.round3 : 0;
    if (email) {
        Candidate.findOne({ email: email })
            .then(candidate => {
                if (candidate) {
                    Test.findOne({ candidate: candidate._id })
                        .then(test => {
                            if (!test)
                                test = new Test({
                                    score1: scores1,
                                    score2: scores2,
                                    score3: scores3,
                                    candidate: candidate
                                });
                            else {
                                test.score1 = scores1;
                                test.score2 = scores2;
                                test.score3 = scores3;    
                            }
                            return test.save().then(result => {
                                res.status(200).send('Scores Added');
                              });
                        }).catch(err => {
                            const error = new Error(err);
                            error.httpStatusCode = 500;
                            return next(error);
                        })
                } else
                    return res.status(422).send('Candidate Not Found');
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    } else {
        const error = new Error("Plz input Email");
        error.httpStatusCode = 200;
        return next(error);
    }
};

