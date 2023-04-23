import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room'
import 'antd/dist/reset.css'
import { DatePicker } from 'antd'
import moment from 'moment';

const { RangePicker } = DatePicker

const Homescreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')
  const [duplicaterooms, setduplicaterooms] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true)
        const data = (await axios.get('/api/rooms/getAllRooms')).data;
        setrooms(data);
        setduplicaterooms(data)
        setloading(false)
      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
        setrooms([]);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    const [fromDate, toDate] = dates;
    console.log(fromDate);
    console.log(toDate);

    // Convert the date strings to Date objects and extract year, month, and day components
    const fromDateTime = new Date(fromDate);
    const toDateTime = new Date(toDate);
    const fromYear = fromDateTime.getFullYear();
    const fromMonth = fromDateTime.getMonth() + 1;
    const fromDay = fromDateTime.getDate();
    const toYear = toDateTime.getFullYear();
    const toMonth = toDateTime.getMonth() + 1;
    const toDay = toDateTime.getDate();

    // Format the dates as desired
    const formattedFromDate = `${fromDay}-${fromMonth}-${fromYear}`;
    const formattedToDate = `${toDay}-${toMonth}-${toYear}`;

    console.log(formattedFromDate);
    console.log(formattedToDate);

    setfromdate(formattedFromDate);
    settodate(formattedToDate);
  }

  function filterBySearch(){
      const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
      setrooms(temprooms)
    }

  return (
    <div className=' container mt-5'>

      <div className="row justify-content-center">
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className='col-md-5'>
          <input type='text' className='form-control' placeholder='search rooms'
            value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}

          />
        </div>

      </div>

      <div className='row justify-content-center mt-5'>
        {loading ? (
          <h1 style={{textAlign: 'center'}}> Loading....</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-2" key={room.id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Homescreen;
