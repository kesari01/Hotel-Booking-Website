import React from 'react'
import {Link} from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row '>
      <div className='col-md-12 text-center'>
        <h1 className="lh mt-5">Book Hotels </h1>
        <h6 className="sh mt-6">book hotel from this website</h6>
        <Link to='/home'>
          <button className='btn btn-primary mt-5'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default Landingscreen
