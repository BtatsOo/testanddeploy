import React, { useState, useEffect } from "react";
import logstyle from "../css/log.css";
import { egyptGovernorates } from "../data/data";
import { authenticateUser, isAuthenticated, createUser } from "./auth";

import { Link, useNavigate } from "react-router-dom";

function Login({ history }) {
  const [loading, setLoading] = useState(true); // Loading state
  const [auth, setAuth] = useState(false); // Authentication state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigateIfSuccessLogin = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);
  console.log(process.env.REACT_APP_API_URL);

  // Function to update state when the window is resized
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update window width on resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      //dont repeat your self
      const { user } = await isAuthenticated();
      console.log(user);
      if (user) {
        setAuth(true); // User is authenticated
        navigateIfSuccessLogin("/browse");
      } else {
        setAuth(false); // User is not authenticated
      }
      setLoading(false); // Loading is complete
    };

    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await authenticateUser(username, password);
      if (token) {
        navigateIfSuccessLogin("/browse");
      }
      // Redirect to the homepage after successful login
    } catch (error1) {
      setError(error1.message);
      // temprorily
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const user1 = await createUser(
        username,
        password,
        email,
        phoneNumber,
        city
      );

      // Redirect to the homepage after successful login
    } catch (error1) {
      setError(error1.message);
      // temprorily
    }
  };
  return (
    <div className="login">
      <div className="content-box">
        <h1>{isRegister ? " تسجيل حساب جديد" : "سجل دخولك"}</h1>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <Input
            placeName={" الاسم كامل"}
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.target.value);
            }}
          />
          <Input
            type={"password"}
            placeName={"كلمة السر"}
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />

          {isRegister && (
            <>
              <Input
                placeName={"البريد الالكتروني"}
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
              <Input
                placeName={"رقم الهاتف"}
                value={phoneNumber}
                onChange={(e) => {
                  setError("");
                  setPhoneNumber(e.target.value);
                }}
              />
              <label htmlFor="city">اختر محافظتك! : </label>
              <select
                name="المحافظة"
                id="city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                {egyptGovernorates.map((city) => {
                  return (
                    <option key={city.id} value={city.en}>
                      {city.ar}
                    </option>
                  );
                })}
              </select>
            </>
          )}
          {!isRegister ? (
            <h1>
              ليس عندك حساب ؟
              <span
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                {" "}
                تسجيل حساب جديد
              </span>
            </h1>
          ) : (
            <h1>
              عندك حساب ؟
              <span
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                تسجيل دخول
              </span>
            </h1>
          )}

          <button type="submit" className="btn">
            تسجيل
          </button>
        </form>
        <ErrorMessage error={error} />
      </div>
      {windowWidth >= 900 && (
        <div className="img-box">
          <div className="img-conatiner">
            <img src="/images/welcome.png" />
          </div>
          <h3>أهلا بعودتك !</h3>
        </div>
      )}
    </div>
  );
}

function Input({ placeName, value, onChange, type }) {
  return (
    <div className="input">
      <input
        type={type}
        placeholder={placeName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
function ErrorMessage({ error }) {
  return (
    <h1
      style={{ fontSize: "25px", letterSpacing: "1px" }}
      className="error-msg"
    >
      {error}
    </h1>
  );
}
export default Login;
