import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios'

const { TabPane } = Tabs;

function Adminscreen(){

  useEffect(() =>{
    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
      window.location.href='/home'
    }

  }, [])


  return (
    <div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
      <h2 className='text-center'>ADMIN PANEL</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Booking" key="1">
          <Bookings />
        </TabPane>

        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>

        <TabPane tab="Add Rooms" key="3">
          <Addroom />
        </TabPane>

        <TabPane tab="User Details" key="4">
        <Users />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Adminscreen


// Booking List Component
export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get('/api/bookings/getallbookings');
        setbookings(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
        <div className="col-md-10">
          <h4>List of Bookings</h4>

          {bookings.length > 0 && (
            <table className="table table-bordered table-dark">
              <thead className="bs">
                <tr>
                  <th>Booking Id</th>
                  <th>Customer Id</th>
                  <th>Room</th>
                  <th>Check-in Date</th>
                  <th>Check-out Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {loading && <p>Loading...</p>}
        </div>
      </div>
  );
}






// Rooms List Component
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get('/api/rooms/getAllRooms');
        setrooms(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h4>List of Rooms</h4>

        {rooms.length > 0 && (
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Room Id</th>
                <th>Name Id</th>
                <th>Rent per day</th>
                <th>Max  Count</th>
                <th>Reception Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.receptionnumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}





// User List Component
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get('/api/users/getAllUsers');
        setusers(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h4>List of Users</h4>

        {users.length > 0 && (
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>User email</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}






// Add Room component
export function Addroom(){

  const [loading, setLoading] = useState(false);
  const[name, setname] = useState('')
  const[rentperday, setrentperday] = useState('')
  const[maxcount, setmaxcount] = useState('')
  const[facility, setfacility] = useState('')
  const[description, setdescription] = useState('')
  const[receptionnumber, setreceptionnumber] = useState('')
  const[imageurl1, setimageurl1] = useState('')
  const[imageurl2, setimageurl2] = useState('')

    async function addRoom() {
      const newroom = {
        name,
        rentperday,
        maxcount,
        facility,
        description,
        receptionnumber,
        imageurls:[imageurl1, imageurl2]
      }
      try{
          setLoading(true)
          const result = await axios.post('/api/rooms/addroom', newroom);
          setLoading(false)
          window.location.href = '/home'
      } catch(error){
          setLoading(false)
      }
    }

  return (
    <div className="row">
      <div className="col-md-5">
        <input type="text" className="form-control mt-2" placeholder="Hotel Name"
        value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Rent per Day"
        value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Max Count"
        value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Facility"
        value={facility} onChange={(e)=>{setfacility(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Description"
        value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Hotel Reception mobile"
        value={receptionnumber} onChange={(e)=>{setreceptionnumber(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Image URL1"
        value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}/>
        <input type="text" className="form-control mt-2" placeholder="Image URL2"
        value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}/>

        <div className="text-right">
          <button className="btn btn-primary mt-4" onClick={addRoom}> Add Room</button>
        </div>

      </div>
    </div>
  )
}
