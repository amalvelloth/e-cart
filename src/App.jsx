import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import View from './pages/View'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './bootstrap.min.css'


function App() {


  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view/:id" element={<View />} />
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
