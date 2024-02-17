import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route element={<PrivateComponent />}>
         <Route path='/' element={<h1>Home</h1>}></Route>
         <Route path='/add' element={<h1>Add</h1>}></Route>
         <Route path='/update' element={<h1>update</h1>}></Route>
         <Route path='/logout' element={<h1>logout</h1>}></Route>
         <Route path='/profile' element={<h1>profile</h1>}></Route>
        </Route>
        
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
