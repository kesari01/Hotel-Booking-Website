import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios'

const { TabPane } = Tabs;

function Profilescreen(){

  const user = JSON.parse(localStorage.getItem("currentUser"))
  console.log(user);

  useEffect(() => {

    if(!user){
      window.location.href='/login'
    }
  }, [user])

  return (
    <div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h3>My Profile</h3>
          <br/>
          <h5>Name: {user.name}</h5>
          <h5>Email: {user.email}</h5>
          <h5>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h5>

        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />

        </TabPane>
      </Tabs>
    </div>

  )
}

export default Profilescreen;


export function MyBookings () {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setbookings] = useState([])
      const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true)
          const rooms = await axios.get('/api/bookings/getbookingsbyuserid', { userid: user._id });
          console.log(rooms.data);
          setbookings(rooms.data)
          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      }
      fetchData();
    }, [user._id]);


    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            <div className="col-md-6">
              {bookings && bookings.map((booking) => {
              if (JSON.parse(localStorage.getItem("currentUser"))["_id"] === booking["userid"]) {
                return (
                  <div className="bs" key={booking._id}>
                    <h5>Room: {booking.room}</h5>
                    <p>Customer id: {booking.userid}</p>
                    <p>Check-in: {booking.fromdate}</p>
                    <p>Check-out: {booking.todate}</p>
                    <p>Amount paid: {booking.totalamount}</p>
                  </div>
                )
              }
            })}
            </div>
          </div>
        )}
      </div>
    );

}
