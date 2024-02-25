import { React, useState, useEffect } from "react";
import "../css/DetailProduct.css";
import { Button, Carousel, Modal } from "react-bootstrap";
import { API } from "../database/API";
import Axios from "axios";
import { UseSelector, useDispatch, useSelector } from "react-redux";

const DetailProduct = () => {
  // state
  const [detailProduk, setDetailProduk] = useState([]);
  const [qtyProduk, setQtyProduk] = useState(0);
  const [addCartProtect, setAddCartProtect] = useState([false, ""]);

  // react-redux
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);

  const onPlus = () => {
    // console.log(detailProduk[0].stock, typeof detailProduk[0].stock);
    if (qtyProduk < detailProduk[0].stock) {
      setQtyProduk((prevQty) => prevQty + 1);
    }
  };
  const onMinus = () => {
    if (qtyProduk > 0) {
      setQtyProduk((prevQty) => prevQty - 1);
    }
  };
  const getDetailProduk = async () => {
    try {
      let res = await Axios.get(
        `${API}/products?id=${document.location.search.substring(1)}`
      );
      // console.log(res.data[0].images);
      // console.log(res.data.images);
      setDetailProduk(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddCart = async () => {
    try {
      let qty = qtyProduk;
      let username = dataUser.username;
      let id = dataUser.id;

      if (qty === 0) {
        setAddCartProtect([true, "please add quantity product"]);
      } else if (qty > detailProduk[0].stock) {
        setAddCartProtect([
          true,
          "your order is out of stock, please check again",
        ]);
      } else if (!username) {
        setAddCartProtect([true, "Please login to continue transaction"]);
      }

      let obj = {
        id: detailProduk[0].id,
        name: detailProduk[0].name,
        image: detailProduk[0].images[0],
        price: detailProduk[0].price,
        qty,
      };

      // Fetch user data
      let res = await Axios.get(`${API}/users?id=${id}`);
      console.log(res);
      let tempCart = res.data[0].cart; // Assuming the response contains a 'users' property
      console.log(tempCart);
      // console.log(tempCart[0].id);
      // console.log(tempCart[0].cart);
      tempCart.push(obj);
      console.log(tempCart);

      // Update user's cart
      let response = await Axios.patch(`${API}/users?id=${id}`, {
        cart: tempCart,
      });
      console.log(response);
      console.log(id, username, qty);
    } catch (error) {
      console.log("Error:", error);
      // Handle errors here
    }
  };
  useEffect(() => {
    getDetailProduk();
  }, []);
  return (
    <div>
      <div className="Hero-Detail-Produk"></div>
      <div className="cont-detailProduk">
        <div>
          <Carousel>
            {detailProduk.map((item, index) =>
              item.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img src={img} alt="" />
                  <Carousel.Caption>
                    <h3>{item.imageDes[idx]}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            )}
          </Carousel>
        </div>
        {detailProduk.map((item, index) => (
          <div key={index}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <h3>Rp. {item.price.toLocaleString()}</h3>
            </div>
            <div className="jumlah-stock">
              <p>Jumlah Stok : {item.stock}</p>
              <p>
                Total Harga : Rp. {(qtyProduk * item.price).toLocaleString()}
              </p>
            </div>
            <div className="cont-qty-produk">
              <Button className="button" onClick={onMinus}>
                -
              </Button>
              <input
                type="number"
                placeholder="Qty"
                value={qtyProduk}
                onChange={(e) => setQtyProduk(+e.target.value)}
              />
              <Button className="button" onClick={onPlus}>
                +
              </Button>
            </div>
            <br />
            <div className="cont-qty-produk">
              <Button className="button" onClick={onAddCart}>
                add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={addCartProtect[0]}>
        <Modal.Header>
          <Modal.Title>Hallo Our Customers</Modal.Title>
        </Modal.Header>
        <Modal.Body>{addCartProtect[1]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setAddCartProtect([false, ""])}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailProduct;
