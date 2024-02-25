import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import "../css/Login.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../database/API";
import Axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [warning, setWarning] = useState([false, ""]);
  const [visible, setVisible] = useState(false);

  // dispatch
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  const SwitchVisPassword = () => {
    setVisible(!visible);
  };
  const onLogin = () => {
    try {
      if (!username && !password) {
        return setWarning([true, "Please complete your password and email"]);
      } else {
        Axios.get(
          `${API}/users?username=${username}&password=${password}`
        ).then((res) => {
          if (res.data.length === 0) {
            return setWarning([true, "Your account dosn't axis"]);
          } else {
            localStorage.setItem("id", res.data[0].id);
            dispatch({
              type: "login",
              payload: res.data[0],
            });
          }
          setUsername("");
          setPassword("");
        });
        // console.log(dataUser);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const navigate = useNavigate();

  const navigasiLogin = () => {
    if (dataUser.username) {
      navigate("/");
      console.log(dataUser.username);
    }
  };
  useEffect(() => {
    navigasiLogin();
  }, [dataUser.username, navigate]);
  return (
    <div className="cont-login">
      <div className="cart-login">
        <h1>
          Welcome to Senja <span>Coffee</span>
        </h1>
        <p>Please Log in before Your Order</p>
        <div>
          <Form.Label htmlFor="basic-url">Username</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <Form.Label htmlFor="basic-url">Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              type={visible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2" onClick={SwitchVisPassword}>
              {" "}
              {visible ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="cont-button-login">
          <button onClick={() => onLogin()}>Log In</button>
          <p>Don't have an account click {<a href="/Register">Register</a>}</p>
        </div>
      </div>
      <Modal show={warning[0]}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{warning[1]}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setWarning([false, ""])}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
