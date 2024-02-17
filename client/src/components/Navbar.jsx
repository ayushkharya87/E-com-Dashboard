import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup")
  }

  return (
    <div>
        <div className='links'>
            <Link to="/">Products</Link>
            <Link to="/add">Add Product</Link>
            <Link to="/update">Update Product</Link>
            <Link to="/profile">Profile</Link>
            { auth ? <Link onClick={logout} to="/signup">Logout</Link> : <Link to="/signup">Sign Up</Link> }

        </div>
        
    </div>
  )
}

export default Navbar;