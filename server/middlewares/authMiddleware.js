const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    if(req.body.teacherToken){
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
    else if(req.body.studentToken){
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
   
}
module.exports=verifyToken;
