const express = require('express')
const router = express.Router();
const Booking = require("../models/booking")
const moment = require('moment')
const Room = require('../models/room')
const stripe = require('stripe')('sk_test_51Mz5zESGBYZdrxe8hlSKqtolL9H1LZzUtzt3t8oowslQCiuFICkZu36S7FcoDIqaMdeQQIz13izjE0Zed3K11U7y00qOtZoCbT')
const { v4: uuidv4 } = require('uuid');

router.post('/bookroom', async(req, res)=> {
  const {
    room,
    userid,
    fromdate,
    todate,
    totaldays,
    totalamount,
    token
  } = req.body

  // try {
  //   const customer = await stripe.customers.create({
  //     email: token.email,
  //     source: token.id
  //   })
  //
  //   const payment = await stripe.charges.create(
  //     {
  //       amount: totalamount*100,
  //       customer: customer.id,
  //       currency: 'INR',
  //       receive_email: token.email
  //     },
  //     {
  //       idempotencykey: uuidv4()
  //     }
  //   )
  //
  //   if(payment){}
  //
  //
  //   res.send('Payment successfull, your room is booked')
  //
  // }catch(error){
  //   return res.status(400).json({error})
  // }

  try{
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format('DD-MM-YYYY'),
      todate: moment(todate).format('DD-MM-YYYY'),
      totalamount: Number(totalamount),
      totaldays,
      transactionId: '1234'
    })

    const booking = await newbooking.save()
    const roomtemp = await Room.findOne({_id: room._id})
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format('DD-MM-YYYY'),
      todate:  moment(todate).format('DD-MM-YYYY'),
      userid: userid,
      status: booking.status
    })

    await roomtemp.save()

    res.send('Room booked successfully')

  } catch(error){
    return res.status(400).json({error})
  }
})


router.get("/getbookingsbyuserid", async(req, res) => {

  const userid = req.body.userid

  try {
      const bookings = await Booking.find({user: userid})
      res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }

})


router.get("/getallbookings", async(req, res) => {
  try{
    const bookings = await Booking.find()
    res.send(bookings)
  }catch(error){
    return res.status(400).json({error})
  }
})

module.exports = router
