import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import react router dom
import { Route, Routes } from "react-router-dom";

// import Page
import Navibar from "./component/NaviBar";
import Footers from "./component/footer";
import HomePage from "./page/HomePage";
import CartComponent from "./component/cart";
import Produk from "./page/Product";
import LoginPage from "./page/Login";
import RegisterPage from "./page/RegisterPage";
import DetailProduct from "./page/detailProduct";
import Axios from "axios";
import { API } from "./database/API";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      let id = localStorage.getItem("id");
      let respones = await Axios.get(`${API}/users?id=${id}`);
      // console.log(respones);
      dispatch({
        type: "login",
        payload: respones.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="App">
      <Navibar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CartComp" element={<CartComponent />} />
        <Route path="/Produk" element={<Produk />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/DetailProduk" element={<DetailProduct />} />
      </Routes>
      <Footers />
    </div>
  );
}

export default App;
