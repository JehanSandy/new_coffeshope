import React from "react";
import "../component/cart.css";
import { MdOutlineAddShoppingCart, MdBookmarkBorder } from "react-icons/md";

const CartComponent = (data) => {
  return (
    <div>
      <div className="cont-cart">
        <img src="" alt="" />
        <div className="cont-ket-cart">
          <h2>helloow</h2>
          <h3>helo helo</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            exercitationem architecto, quam totam illum recusandae dolores,
            corrupti molestias nesciunt reiciendis ipsa unde quae harum maiores
            consectetur autem, dignissimos aspernatur! Expedita! z
          </p>
          <div className="cont-cart-button">
            <div>
              <button>Buy Product</button>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default CartComponent;
