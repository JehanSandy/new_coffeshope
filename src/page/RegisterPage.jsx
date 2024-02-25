import { React, useState, useEffect } from "react";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";

import "../css/Login.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { API } from "../database/API";
import Axios from "axios";

const RegisterPage = () => {
  // state for input value
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  // handle error and validations
  const [usernameErr, setUsernameErr] = useState([false, ""]);
  const [emailErr, setEmailErr] = useState([false, ""]);
  const [passwordErr, setPasswordErr] = useState([false, ""]);
  const [conPassErr, setConPassErr] = useState([false, ""]);
  // handle Register error
  const [registerErr, setRegisterErr] = useState([false, ""]);
  // visible password
  const SwitchVisPass = () => {
    setVisible(!visible);
  };
  const SwitchVisPassC = () => {
    setVisibleC(!visibleC);
  };
  // validations input
  const usernameValid = (e) => {
    let inpUsername = e.target.value;
    // regex
    let symb = /[!@#$%^&1234567890*]/;
    if (inpUsername.length === 0) {
      setUsernameErr([false, ""]);
    } else if (symb.test(inpUsername) || inpUsername.length < 5) {
      setUsernameErr([
        true,
        "Please input your name correctly, don't use symbol and number!",
      ]);
    } else {
      setUsernameErr([false, ""]);
    }
    setUsername(inpUsername);
  };
  const emailValid = (e) => {
    let inpEmail = e.target.value;
    // regex
    let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;

    if (inpEmail.length === 0) {
      setEmailErr([false, ""]);
    } else if (!regex.test(inpEmail)) {
      setEmailErr([true, "Plese make sure your email correct!"]);
    } else {
      setEmailErr([false, ""]);
    }
    setEmail(inpEmail);
  };

  const passwordValid = (e) => {
    let inpPassword = e.target.value;
    let number = /[0-9]/;
    let symb = /[!@#%^&*]/;

    if (inpPassword.length === 0) {
      setPasswordErr([false, ""]);
    } else if (
      !number.test(inpPassword) ||
      !symb.test(inpPassword) ||
      inpPassword.length < 6
    ) {
      setPasswordErr([
        true,
        "Please contain symbol and number for your password, and min 6 character!",
      ]);
    } else {
      setPasswordErr([false, ""]);
    }
    setPassword(inpPassword);
  };

  const confPassValid = (e) => {
    let inpConfPass = e.target.value;
    // let pass = password;

    if (inpConfPass.length === 0) {
      setConPassErr([false, ""]);
    } else if (inpConfPass != password) {
      setConPassErr([true, "Please make sure your confirm password correct!"]);
    } else {
      setConPassErr([false, ""]);
    }
    setConfirmPass(inpConfPass);
  };
  const Register = () => {
    try {
      if (!username || !password || !email || !confirmPass) {
        return setRegisterErr([true, "Please complet your identity"]);
      } else if (
        usernameErr[0] ||
        passwordErr[0] ||
        emailErr[0] ||
        conPassErr[0]
      ) {
        console.log(usernameErr[0]);
        return setRegisterErr([true, "Please make sure your data valid"]);
      } else {
        Axios.get(
          `${API}/users?username=${username}&password=${password}`
        ).then((res) => {
          console.log(res.data.length);
          if (res.data.length === 1) {
            return setRegisterErr([true, "Your account already axis"]);
          } else {
            let data = {
              username,
              password,
              email,
              role: "default",
              card: [],
            };
            Axios.post(`${API}/users`, data);
            setUsername("");
            setPassword("");
            setEmail("");
            setConfirmPass("");
            setRegisterErr([
              true,
              "Register success, please Login before transaction!",
            ]);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cont-Register">
      <div className="cart-register">
        <h1>
          Welcome to Senja <span>Coffee</span>
        </h1>
        <p>Please Register before Your Order</p>
        <div>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="basic-url">Username</Form.Label>

            <Form.Control
              placeholder="Username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => usernameValid(e)}
              value={username}
            />
            <Form.Text>{usernameErr[1]}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="basic-url">Email</Form.Label>
            <Form.Control
              placeholder="Email"
              onChange={(e) => emailValid(e)}
              value={email}
            />
            <Form.Text>{emailErr[1]}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="basic-url">Password</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Password"
                type={visible ? "text" : "password"}
                onChange={(e) => passwordValid(e)}
                value={password}
              />
              <InputGroup.Text id="basic-addon2" onClick={SwitchVisPass}>
                {visible ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
              </InputGroup.Text>
            </InputGroup>
            <Form.Text>{passwordErr[1]}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="basic-url">Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Confirm Password"
                type={visibleC ? "text" : "password"}
                onChange={(e) => confPassValid(e)}
                value={confirmPass}
              />
              <InputGroup.Text id="basic-addon2" onClick={SwitchVisPassC}>
                {visibleC ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
              </InputGroup.Text>
            </InputGroup>
            <Form.Text>{conPassErr[1]}</Form.Text>
          </Form.Group>
        </div>
        <div className="cont-button-login">
          <button onClick={() => Register()}>Register</button>
          <p>Click {<a href="/Login">Here</a>} for Login!</p>
        </div>
      </div>
      <Modal show={registerErr[0]}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{registerErr[1]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setRegisterErr([false, ""])}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;
