import React, { useState } from "react";
import callApi from "../api";

const AuthScreen = (props) => {
  const [registerValue, setRegisterValue] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    if (event.target.className === "form-register__input") {
      setRegisterValue({
        ...registerValue,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.className === "form-login__input") {
      setLoginValue({
        ...loginValue,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleClick = async (event) => {
    if (event.target.className === "form-register__submit") {
      if (
        registerValue.email &&
        registerValue.password &&
        registerValue.repeatPassword &&
        registerValue.password !== registerValue.repeatPassword
      ) {
        alert(
          "Password input values ​are different, repeat your password correctly."
        );
        setRegisterValue({
          ...registerValue,
          password: "",
          repeatPassword: "",
        });
      }
      if (
        registerValue.email &&
        registerValue.password &&
        registerValue.repeatPassword &&
        registerValue.password === registerValue.repeatPassword
      ) {
        try {
          const { data } = await callApi("register").post("", {
            email: registerValue.email,
            password: registerValue.password,
          });
          const { token } = data;

          if (token) {
            localStorage.setItem("token", token);
            window.location.reload(false); // reload page
          }
        } catch (err) {
          alert(err.response.data);
          window.location.reload(false);
        }
      }
    }
    if (event.target.className === "form-login__submit") {
      if (loginValue.email && loginValue.password) {
        try {
          const { data } = await callApi("login").post("", {
            email: loginValue.email,
            password: loginValue.password,
          });
          const { token } = data;
          console.log(token);
          if (token) {
            localStorage.setItem("token", token);
            window.location.reload(false); // reload page
          }
        } catch (err) {
          alert(err.response.data);
          window.location.reload(false);
        }
      }
      if (!loginValue.email || !loginValue.password) {
        alert("Enter email and password to login.");
      }
    }
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="main__form">
        <h1 className="form-title">Create your account!</h1>
        <label className="main__form__title">Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={registerValue.email}
          placeholder="Eg. youremail@mail.com"
          className="form-register__input"
        />
        <label className="main__form__title">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={registerValue.password}
          placeholder="Insert your password"
          className="form-register__input"
        />
        <label className="main__form__title">
          Repeat your password
        </label>
        <input
          type="password"
          name="repeatPassword"
          required
          onChange={handleChange}
          value={registerValue.repeatPassword}
          placeholder="Insert your password"
          className="form-register__input"
        />
        <button
          type="submit"
          onClick={handleClick}
          className="form-register__submit"
        >
          Register
        </button>
      </form>

      <form onSubmit={handleSubmit} className="main__form">
        <h1 className="form-title">Already have an account?</h1>
        <label className="main__form__title">Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={loginValue.email}
          placeholder="Eg. youremail@mail.com"
          className="form-login__input"
        />
        <label className="main__form__title">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={loginValue.password}
          placeholder="Insert your password"
          className="form-login__input"
        />
        <button
          type="submit"
          onClick={handleClick}
          className="form-login__submit"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default AuthScreen;
