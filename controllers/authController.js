import { db } from "../models/index.js"

const register = async (req, res) => {
    try {
      if(req.body.role=="teacher"){
        await db.Teacher.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
           }) 
           res.json({ status: true, message: error.message })
    
      }else{}
      
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

export {
    register
}