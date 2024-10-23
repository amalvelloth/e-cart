import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart, removeFromCart } from "../Redux/Slice/cartSlice";
import { Button } from "react-bootstrap";
import Header from "../components/Header";


function Cart() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [total,setTotal] = useState(0)

  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
    }
    else{
      setTotal(0)
    }
  },[cart])

  return (
    <>
    <Header/>
    <div className="container" style={{ marginTop: "100px" }}>
      {cart?.length > 0 ? (
        <div className="row mt-5">
          <div className="col-lg-8">
            <table className="table shadow">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart?.map((product,index)=>(
                    <tr>
                  <td>{index+1}</td>
                  <td>{product.title}</td>
                  <td>
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={product.thumbnail}
                      alt=""
                    />
                  </td>
                  <td><input type="text" readOnly value={product.quantity} className="form-control" style={{width:'35px'}} /></td>
                  <td>{product.totalprice}</td>
                  <td>
                    <Button className="btn btn-light" onClick={()=>dispatch(removeFromCart(product.id))}><i class="fa-solid fa-trash text-danger"></i></Button>
                  </td>
                </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-danger" onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
              <Link
                to={"/"}
                style={{ textDecoration: "none" }}
                className="btn btn-outline-dark"
              >
                Shop More
              </Link>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <div className="container border rounded  shadow  mt-5 p-5 w-100">
              <h1>Cart Summary</h1>
              <h4>Total Products:{cart?.length}</h4>
              <h5>
                Total:<span className="text-danger fw-bolder">${total}</span>
              </h5>
            </div>
            <div className="d-grid">
              <button className="btn btn-dark mt-3 rounded">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 d-flex justify-content-center">
          <img
            style={{width:'300px'}}
            src="https://schoolville.com/assets/img/empty-cart-illustration.gif"
            alt=""
          />
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;
