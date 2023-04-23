const express = require("express")
const app = express()
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const cors = require('cors');
const usersRoute = require('./routes/usersRoute')
const bodyParser = require('body-parser')
const bookingsRoute = require('./routes/bookingsRoute')


app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`node server has started on port number ${port}`))
