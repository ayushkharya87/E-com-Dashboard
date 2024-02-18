import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from "./components/Login";
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route element={<PrivateComponent />}>
         <Route path='/' element={<Products />}></Route>
         <Route path='/add' element={<AddProduct />}></Route>
         <Route path='/update/:id' element={<UpdateProduct />}></Route>
         <Route path='/logout' element={<h1>logout</h1>}></Route>
         <Route path='/profile' element={<h1>profile</h1>}></Route>
        </Route>
        
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
