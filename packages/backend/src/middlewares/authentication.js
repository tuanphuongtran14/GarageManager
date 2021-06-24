const { Session } = require('../models');

async function checkAuthentication(req, res, next) {
    let sessionList = await Session.find({}).lean();
    let session = req.signedCookies.sessionId;
    let fakeSession = false;
    if (!session) {
        return res.status(400).json({
            statusCode: 400,
            error: 'You must login to access this'
        })
    }
    for (let i = 0; i < sessionList.length; i++) {
        if (session === sessionList[i].sessionId) {
            fakeSession = true;
        }
    }
    if (fakeSession) {
        next();
    }
    else
        return res.status(400).json({
            statusCode: 400,
            error: 'Fake session'
        })
}

module.exports = {
    checkAuthentication,
}