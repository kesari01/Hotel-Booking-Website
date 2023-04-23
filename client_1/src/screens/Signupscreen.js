import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Signupscreen() {
  const[name, setname] = useState('')
  const[mobile, setmobile] = useState('')
  const[city, setcity] = useState('')
  const[state, setstate] = useState('')
  const[email, setemail] = useState('')
  const[password, setpassword] = useState('')
  const[cpassword, setcpassword] = useState('')

  async function Signup(){
    if(password==cpassword){
      const user={
        name,
        mobile,
        city,
        state,
        email,
        password,
        cpassword
      }
      console.log("data",user);
      try {
          const result = await axios.post('/api/users/signup', user).data

          setname('')
          setmobile('')
          setcity('')
          setstate('')
          setemail('')
          setemail('')
          setpassword('')
          setcpassword('')

      } catch (error) {
        console.log(error)
      }
    }
    else{
      alert('check your password again')
    }
  }

  return (
    <div>
      <div className="row w-75 mx-auto mt-5">
        <div className="col-md-7">
          <div className="bs">
            <h2>Sign up</h2>
            <input type="text" className="form-control mt-1" placeholder="name" value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input type="text" className="form-control mt-1" placeholder="mobile" value={mobile} onChange={(e)=>{setmobile(e.target.value)}} />
            <input type="text" className="form-control mt-1" placeholder="city" value={city} onChange={(e)=>{setcity(e.target.value)}} />
            <input type="text" className="form-control mt-1" placeholder="state" value={state} onChange={(e)=>{setstate(e.target.value)}} />
            <input type="text" className="form-control mt-1" placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input type="text" className="form-control mt-1" type="password" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            <input type="text" className="form-control mt-1" type="password" placeholder="confirm password" value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>

            <button className="btn btn-primary mt-3" onClick={Signup}>Sign up</button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Signupscreen
