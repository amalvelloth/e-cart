import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slice/productSlice";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import { addTowishlist } from "../Redux/Slice/wishListSlice";
import { addToCart } from "../Redux/Slice/cartSlice";
import Header from "../components/Header";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productReducer
  );
  const { wishlist } = useSelector((state) => state.WishlistReducer);
  const cart = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item?.id === product?.id);
    if (existingProduct) {
      alert("Product already exists in wishlist");
    } else {
      dispatch(addTowishlist(product));
    }
  };

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
      <Header insideHome={true} />
      <div className="d-flex justify-content-center" style={{marginTop: '5.7rem'}} >
        <img
          style={{width:'95%'}}
          src="https://cdn.vectorstock.com/i/500p/57/56/template-banner-for-online-store-with-shopping-vector-42935756.jpg"
          alt=""
        />
      </div>

      <div style={{ marginTop: "70px" }}>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <div className="mt-5 container">
            <Row className="justify-content-center">
              {products?.length > 0 ? (
                products.map((product, index) => (
                  <Col
                    key={index}
                    className="mt-4"
                    sm={12} // Full width on small screens
                    md={6} // Two per row on medium screens
                    lg={4} // Three per row on large screens
                    xl={3} // Four per row on extra-large screens
                  >
                    <Card
                      style={{
                        height: "520px",
                        width: "100%", // Ensure it takes up the full width of the column
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={`/view/${product.id}`}>
                        <Card.Img
                          style={{ width: "250px" }}
                          variant="top"
                          src={product.thumbnail}
                          className="mx-auto d-block"
                        />
                      </Link>
                      <Card.Body
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Card.Title className="mb-4">
                          {product.title.slice(0, 10)}
                        </Card.Title>

                        <Card.Text style={{ flexGrow: 1 }}>
                          {product.description.slice(0, 80)}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button
                            className="btn btn-light"
                            onClick={() => handleWishlist(product)}
                          >
                            <i className="fa-solid fa-heart text-danger"></i>
                          </Button>
                          <Button
                            className="btn btn-light"
                            onClick={() => handleCart(product)}
                          >
                            <i className="fa-solid fa-cart-shopping text-dark"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Nothing to display</p>
              )}
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
