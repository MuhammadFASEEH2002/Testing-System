const jwt = require("jsonwebtoken");

verifyTeacherToken = (req, res, next) => {
    const token = req.body.teacherToken;
    if (!token) {
        return res.json({ status: false , message : 'User Not Authorized'  })
    }
    jwt.verify(token, "token", async (err, data) => {
        if (err) {
            return res.json({ status: false , message : 'User Not Authorized' })
        } else {
            req.user = data.id
            next()
        }
    })
}
module.exports=verifyTeacherToken;

verifyStudentToken = (req, res, next) => {
    const token = req.body.studentToken;
    if (!token) {
        return res.json({ status: false , message : 'User Not Authorized'  })
    }
    jwt.verify(token, "token", async (err, data) => {
        if (err) {
            return res.json({ status: false , message : 'User Not Authorized' })
        } else {
            req.user = data.id
            next()
        }
    })
}
module.exports=verifyStudentToken;