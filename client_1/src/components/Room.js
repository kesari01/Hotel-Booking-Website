import React,{useState, useEffect} from 'react'
import{Modal, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

function Room({room, fromdate, todate}){

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
      if (!user) {
      history.push("/login");
    }
  }, [user]);



  return (
    <div className="row bs">
      <div className='col-md-4'>
        <img alt="loading image" src={room.imageurls[0]} className='smallimg' />
      </div>
      <div className='col-md-7 '>
        <h5>{room.name}</h5>
        <p> Facility: {room.facility} </p>
        <p> Max Count : {room.maxcount} </p>
        <p> Reception Contact no : {room.receptionnumber} </p>
        <div style={{float: 'right'}}>

            {(fromdate && todate) && (
              <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <Button className='btn btn-primary m-2'>Book Now</Button>
              </Link>
            )}



          <button className='btn btn-primary' onClick={handleShow}> View Details</button>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} >
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Carousel>
          {room.imageurls.map(url=>{
            return <Carousel.Item>
                    <img
                      alt="loading image"
                      className="d-block w-100 bigimg"
                      src={url}
                    />
                  </Carousel.Item>
          })}
        </Carousel>

        <p> {room.description}</p>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Room
