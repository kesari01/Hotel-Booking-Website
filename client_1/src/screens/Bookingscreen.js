import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState({});
  const [totalamount, setTotalamount] = useState(0);
  const { roomid, fromdate, todate } = useParams();

  const fromDate = moment(fromdate, 'DD-MM-YYYY');
  const toDate = moment(todate, 'DD-MM-YYYY');
  const totalDays = toDate.diff(fromDate, 'days');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/rooms/getRoomById/${roomid}`);
        setRoom(data);
        setTotalamount(data.rentperday * totalDays);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchData();
  }, [roomid, totalDays]);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate: fromDate.toISOString(),
      todate: toDate.toISOString(),
      totaldays: totalDays,
      totalamount: totalamount,
      token: token,
    };

    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      setLoading(false);
      window.location.href = '/profile'
    } catch (error) {
      setLoading(false);
        window.location.href = '/profile'
    }
  }

  return (
    <div className="w-75 mx-auto mt-5">
      {loading ? (
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
      ) : (
        <div>
          <div className="row bs">
            <div className="col-md-5">
              <h3>{room.name}</h3>
              <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
            </div>
            <div className="col-md-5">
              <div>
                <div style={{ textAlign: 'center' }}>
                  <h5>Booking Details</h5>
                  <hr />
                </div>
                <div>
                  <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From Date: {fromDate.format('DD/MM/YYYY')}</p>
                  <p>To Date: {toDate.format('DD/MM/YYYY')}</p>
                  <p>Max Count: {room.maxcount}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h5>Payment Details</h5>
                  <hr />
                </div>
                <div>
                  <p>Rent per Day: {room.rentperday}</p>
                  <p>Total Days: {totalDays}</p>
                  <p>Total Amount: {totalamount}</p>
                </div>
              <div style={{float:'right'}}>
              <StripeCheckout amount={totalamount*100} token={onToken} stripeKey="pk_test_51Mz5zESGBYZdrxe8xdTDgwCZlLqtXdo96X43DL22CRZD9ufgEi6r7iOs1BHx4xnrS57mMueMqORcnjlinHF24HIT00hQrCqVlL" currency="INR">
                <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
                </div>

                </div>
                </div>
                </div>
                </div>
              )}
              </div>
)}

export default Bookingscreen;
