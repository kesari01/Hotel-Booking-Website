import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Loginscreen() {
  const[email, setemail] = useState('')
  const[password, setpassword] = useState('')

  async function Login(){

      const user={
        email,
        password
      }
      try{

        const result = (await axios.post('/api/users/login', user)).data

        localStorage.setItem('currentUser', JSON.stringify(result))
        window.location.href='/home'

      } catch(error){
        alert('Email or password is incorrect. Please try again.');
        console.log(error)
      }

  }

  return (
    <div>
      <div className="row w-75 mx-auto mt-5">
        <div className="col-md-7 mt-5">
          <div className="bs">
            <h2>Log in</h2>
            <input type="text" className="form-control mt-1" placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input type="text" className="form-control mt-1" type="password" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />

            <button className="btn btn-primary mt-3" onClick={Login}>Log in</button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Loginscreen
