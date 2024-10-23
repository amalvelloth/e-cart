import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { addTowishlist } from '../Redux/Slice/wishListSlice';
import { addToCart } from '../Redux/Slice/cartSlice';
import Header from '../components/Header';


function View() {
  const {id}= useParams()
  //  console.log(id);
  const {loading} = useSelector((state)=>state.productReducer)
  const [Product,setProduct]=useState({})
  const{wishlist}=useSelector((state)=>state.WishlistReducer)
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()  

  useEffect(()=>{
    const products =JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(Product=>Product?.id==id))
  },[])
  // console.log(Product);
  const handleWishlist=(Product)=>{
    const existingProduct = wishlist.find(item=>item.id==Product?.id)
    if(existingProduct){
      alert("Product already exist in wishlist")
    }else{
      dispatch(addTowishlist(Product))
    }
  }

  const handleCart = (products) => {
    const existingProduct = cart?.find(item => item.id == products.id);
    if (existingProduct) {
      dispatch(addToCart(products));
      // alert("Item added")
    } else {
      dispatch(addToCart(products));
      alert("Items added");
    }
  };
  return (
    <>
    <Header/>
    <div className="mt-5">
      {
        loading?<div>
          <Spinner animation="border" variant="dark" />
        </div>:<div className='container row ' style={{marginTop:"100px"}}>
      <div className='col-lg-4'>
        <img style={{width:"100%",height:"400px"}} src={Product.thumbnail} alt="" />
      </div>
      <div className='col-lg-2'></div>
      <div className='col-lg-6'>
        <p>Product Id:{Product.id}</p>
        <h1>{Product.title}</h1>
        <h5 className='fw-bolder'>
          price:<span style={{color:"red"}}>{Product.price}</span>
        </h5>
        <p>
          {Product.description}
        </p>
        <div className='d-flex justify-content-between mt-4'>
          <Button className='btn btn-light' onClick={()=>handleWishlist(Product)}><i className='fa-solid fa-heart text-danger'></i></Button>
          <Button className='btn btn-light' onClick={() => handleCart(Product)}><i className='fa-solid fa-cart-shopping text-dark'></i></Button>
        </div>
      </div>
    </div>
      }
    </div>
    </>
  )
}

export default View