// src/auth.js
import axios from "axios";

// Function to authenticate user
export const authenticateUser = async (name, password) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        name,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { data } = res;
    console.log(data);
    // localStorage.setItem("token", { data }); // Store token in local storage

    return data;
  } catch (error) {
    console.error("Authentication error:", error.response.data);
    throw error.response.data;
  }
};
export const createUser = async (name, password, email, phoneNumber, city) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/register`,
      {
        name,
        password,
        email,
        phoneNumber,
        city,
      },
      {
        withCredentials: true,
      }
    );

    const data = res;
    console.log(data);
    // localStorage.setItem("token", { data }); // Store token in local storage

    return data;
  } catch (error) {
    console.error("Error Creating User :", error.response.data);
    throw error.response.data;
  }
};

// // Function to check if user is authenticated from front end
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return token != null;
// };
// in backend (cookies)
export const isAuthenticated = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, {
      withCredentials: true,
    });

    const { data } = res;

    return data;
  } catch (err) {
    // in axios when its err it returns err
    return err;
  }
};

// // Function to get JWT token
// export const getToken = () => {
//   return localStorage.getItem("token");
// };
