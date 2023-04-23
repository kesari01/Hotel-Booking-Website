const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post("/signup", async(req, res)=>{
  const user = req.body;
  const newuser = new User(user)

  try {
    const user = await newuser.save()
    res.send('successfully sign up')
  } catch (error) {
    console.log(error)
    return res.status(400).json({error})
  }
})


router.post("/login", async(req, res)=>{
  const {email, password} = req.body

  try{
    const user = await User.findOne({email: email, password: password})
    if(user){
      res.send(user)
    }else{
      return res.status(400).json({message: 'Login failed' })
    }
  }catch(error){
    return res.status(400).json({error})
  }
})




router.get("/getAllUsers", async(req, res) => {
  try{
    const users = await User.find()
    res.send(users)
  } catch(error){
    return res.status(400).json({error})
  }
})


module.exports = router
