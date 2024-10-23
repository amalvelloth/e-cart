import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../Redux/Slice/wishListSlice";
import { addToCart } from "../Redux/Slice/cartSlice";
import Header from "../components/Header";

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.WishlistReducer);

  const handleCart = (product) =>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product.id))
  }
  return (
    <>
    <Header/>
    <div style={{ marginTop: "70px" }} className="mt-5 container">
      <Row className="justify-content-center">
        {wishlist?.length > 0 ? (
          wishlist.map((products) => (
            <Col className="mt-5" sm={12} md={10} lg={4} xl={3}>
              <Card
                style={{
                  height: "520px",
                  width: "100%", 
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to={`/view/${products.id}`}>
                  <Card.Img
                    style={{ width: "250px" }}
                    variant="top"
                    src={products.thumbnail}
                    className="mx-auto d-block"
                  />
                </Link>
                <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                  <Card.Title>{products.title.slice(0, 10)}</Card.Title>
                  <Card.Text style={{ flexGrow: 1 }}>{products.description.slice(0, 80)}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      className="btn btn-light"
                      onClick={() => dispatch(removeFromWishlist(products.id))}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </Button>
                    <Button className="btn btn-light" onClick={() => dispatch(handleCart(products))}>
                      <i className="fa-solid fa-cart-shopping  text-dark"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0EPYhSvoJWwMX3Zc7KZvJb_zbvhgOojDWQ&s"
              alt=""
            />
          </div>
        )}
      </Row>
    </div>
    </>
  );
}

export default Wishlist;
