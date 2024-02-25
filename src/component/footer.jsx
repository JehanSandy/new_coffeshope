import React from "react";
import "../component/footer.css";
// import icon
import { IoLogoInstagram } from "react-icons/io5";
import { PiTiktokLogoThin } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
const Footers = () => {
  return (
    <div>
      <div className="cont-footers">
        <div>
          <h2>Alamat</h2>
          <p>Lorem, ipsum dolor sit amet consectetur </p>
          <br />
          <h2>No Tlpn</h2>
          <p>0983-3232-3323</p>
          <p>0983-3232-3323</p>
        </div>
        <div>
          <h2>Sosial Media</h2>
          <div>
            <IoLogoInstagram className="icon-footer" />
            <PiTiktokLogoThin className="icon-footer" />
            <FaXTwitter className="icon-footer" />
          </div>
        </div>
        <div>
          <h2>Our Store</h2>
          <p>Jl. Lorem ipsum dolor sit amet consectetur</p>
          <p>Jl. Lorem ipsum dolor sit amet consectetur</p>
          <p>Jl. Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </div>
    </div>
  );
};

export default Footers;
