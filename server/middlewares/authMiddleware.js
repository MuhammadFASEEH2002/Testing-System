const jwt = require("jsonwebtoken");

exports.verifyTeacherToken = (req, res, next) => {
    const token = req.cookies.teachertToken
    if (!token) {
        return res.json({ status: false , message : 'User Not Authorized'  })
    }
    jwt.verify(token, "token", async (err, data) => {
        if (err) {
            return res.status(401).json({ status: false , message : 'User Not Authorized' })
        } else {
            req.user = data.id
            next()
        }
    })
}
