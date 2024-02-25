import { React, useEffect, useState } from "react";
import Axios from "axios";
import "../css/Produk.css";
import { API } from "../database/API";
import { CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Produk = () => {
  const [allProduct, setAllProduct] = useState([]);

  const getAllProduk = async () => {
    try {
      const res = await Axios.get(`${API}/products`);
      setAllProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduk();
  }, []);
  return (
    <div>
      <div className="hero-produk">
        <h1>
          Produk Senja <span>Coffee</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sed
          doloremque, sit quidem vero placeat fugiat, commodi blanditiis quis
          facilis iusto reiciendis asperiores eveniet adipisci quaerat. Non
          dolorem quis enim.
        </p>
      </div>
      <section className="kategori-produk">
        <div>
          <button>Makanan</button>
          <button>Minuman</button>
          <button>Snack</button>
        </div>
        <div>
          <input type="text" placeholder="Cari Produk Senja Coffee" />
          <button>
            <CgSearch />
          </button>
        </div>
      </section>
      <section className="produk-cont">
        {allProduct.map((item, index) => {
          return (
            <div className="cont-cart" key={index}>
              <img src={item.images[0]} alt="produk-senja-coffee" />
              <div className="cont-ket-cart">
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
                <p>{item.description}</p>
                <div className="cont-cart-button">
                  <div>
                    <Button
                      as={Link}
                      to={`/DetailProduk?${item.id}`}
                      className="button"
                    >
                      Buy Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Produk;
