/* eslint-disable */

import React from 'react'

function Navbar() {

const user = JSON.parse(localStorage.getItem('currentUser'))
function logout(){
  localStorage.removeItem('currentUser')
  window.location.href='/login'
}

return (
<div>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">BookRooms</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/aboutus">About us</a>
          </li>
        </ul>
        <ul class="navbar-nav nbr">
          {user ? (<>
            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {user.name}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a style={{textDecoration: 'none'}} href="/profile"><button class="dropdown-item" type="button">Profile</button></a></li>
                <li><button class="dropdown-item" type="button" onClick={logout}>Log out</button></li>
              </ul>
            </div>
          </>) : (<>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/signup">Sign up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/login">Log in</a>
            </li>
          </>)}
        </ul>
      </div>
    </div>
  </nav>
</div>
)
}

export default Navbar;
