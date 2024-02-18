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
          <img className='logo' src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png" alt="" />

            { auth ? <> <Link to="/">Products</Link>
            <Link to="/add">Add Product</Link>
            <Link to="/update">Update Product</Link>
            <Link to="/profile">Profile</Link>
             <Link onClick={logout} to="/signup">Logout- {JSON.parse(auth).name}</Link> </>
              : 
             <> <Link to="/signup">Sign Up</Link> <Link to="/login">Login</Link> </> }
 
        </div>
        
    </div>
  )
}

export default Navbar;