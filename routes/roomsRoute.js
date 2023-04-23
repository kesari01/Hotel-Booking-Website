const express = require('express')
const router = express.Router()

const Room = require('../models/room')

router.get('/getAllRooms', async(req, res)=>{
  try {
    const rooms = await Room.find({})
    res.send(rooms)
  } catch (error) {
    return res.status(400).json({message: error})
  }
})


router.get('/getRoomById/:id', async(req, res)=>{
  const roomid = req.params;
  try {
    const room = await Room.findOne({_id: roomid.id})
    res.send(room)
  } catch (error) {
    return res.status(400).json({message: error})
  }
})

router.post("/addroom", async(req, res) => {
  try{
    const {name, description, rentperday, maxcount, facility, receptionnumber } = req.body;
    const newroom = new Room(req.body)
    console.log(newroom);
    await newroom.save()
    res.send("new room added successfully")
  }catch (error){
    return res.status(400).json({error})
  }
})

module.exports = router
