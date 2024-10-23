import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from '../Redux/Slice/productSlice'

function Header({insideHome}) {
  const dispatch = useDispatch();
  
  // Local states for wishlist and cart counts
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Get wishlist and cart from Redux store
  const { wishlist } = useSelector((state) => state.WishlistReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  // Update counts whenever wishlist or cart changes
  useEffect(() => {
    setWishlistCount(wishlist?.length);
    setCartCount(cart?.length);
  }, [wishlist, cart]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary bg-light position-fixed top-0 w-100 " style={{zIndex:'99'}}>
        <Container>
          <Navbar.Brand href="">
            <Link to={'/'} className="text-dark">
              <img
                alt="E-Kart logo"
                src="https://cdn-icons-gif.flaticon.com/6172/6172531.gif"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              E-Kart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'black' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                insideHome && <Form.Control 
                onChange={e => dispatch(searchProduct(e.target.value.toLowerCase()))}
                type="text" 
                placeholder="Search" 
                style={{ borderRadius: '40px' }} 
              />
              }
              <Nav.Link as={Link} to="/wishlist" className="text-dark">
                <i className="fa-solid fa-heart text-danger">
                  {wishlistCount}
                </i>
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="text-dark">
                <i className="fa-solid fa-cart-shopping text-dark">
                  {cartCount}
                </i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
