import React from "react";
import { useState, useEffect } from "react";
import "../css/HomePage.css";

// import API
import { API } from "../database/API";
// import CSS Library
import { Carousel } from "react-bootstrap";
import Axios from "axios";

const HomePage = () => {
  const [dataHOme, setDataHome] = useState([]);
  // get data home
  const GetDataHome = () => {
    Axios.get(`${API}/home`).then((res) => {
      setDataHome(res.data);
      console.log(dataHOme);
    });
  };

  useEffect(() => {
    GetDataHome();
  }, []);
  return (
    <div>
      <section className="Hero-home">
        <div className="konten_hero">
          <h1>
            SENJA <span>COFFEE</span>{" "}
          </h1>
          <h1>NIKMAT SECANGKIR KOPI</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            necessitatibus rem officia delectus in nam facilis dolores facere
            totam ratione placeat corrupti porro tenetur blanditiis architecto
            accusantium, aperiam voluptatem consequuntur!
          </p>
        </div>
        <div className="cont-button">
          <button>See product</button>
          <button>Order Now</button>
        </div>
      </section>
      <section className="cont1">
        <div className="img-cont">
          <Carousel className="carouserl_home">
            {dataHOme.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    src={item.home_img}
                    alt="image_home"
                    className="img_home"
                  />
                  <Carousel.Caption>
                    <h3>{item.des_img}</h3>
                    {/* <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="des-cont">
          <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            tenetur quibusdam aperiam dolorum culpa possimus quae amet, aliquid
            ratione exercitationem accusantium obcaecati et facilis laudantium,
            consequatur iusto minima dolor pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            tenetur quibusdam aperiam dolorum culpa possimus quae amet, aliquid
            ratione exercitationem accusantium obcaecati et facilis laudantium,
            consequatur iusto minima dolor pariatur?
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
