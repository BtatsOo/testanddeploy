import React from "react";
import Header from "./header";
import axios from "axios";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./auth";
import { MessageButton, MessageTitle } from "./course";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faInbox } from "@fortawesome/free-solid-svg-icons";
import { Courses } from "./browse";
import "../css/profile.css";
export function Profile() {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const [firstCssRender, setFirstCssRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBar, setActiveBar] = useState("userDetails");
  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await isAuthenticated();
      console.log(user);
      if (user) {
        setAuth(true); // User is authenticated
        setUserData(user);
        setIsLoading(false);
      } else {
        setAuth(false);
        setIsLoading(false); // User is not authenticated
      }

      // Loading is complete
    };
    checkAuth();
  }, []);
  useEffect(() => {
    const enrolledCoursesFn = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/courses/enrolled-courses`,
          {
            withCredentials: true,
          }
        );
        setEnrolledCoursesData(data.enrolledCourses);

        console.log(data.enrolledCourses);
      } catch (error) {
        console.log(error);
      }
    };
    enrolledCoursesFn();
  }, []);
  useEffect(() => {
    if (!isLoading) setFirstCssRender(true);
  }, [isLoading]);
  return (
    <div className="profile-container">
      <Header isLogin={auth} dataUser={userData} />
      {auth ? (
        <>
          <div className="profile-body">
            <div className="profile-bar">
              <ul>
                <li
                  className={`${activeBar === "userDetails" ? "active" : ""}`}
                  onClick={() => setActiveBar("userDetails")}
                >
                  حساب المستخدم
                </li>
                <li
                  className={`${activeBar === "userBocket" ? "active" : ""}`}
                  onClick={() => setActiveBar("userBocket")}
                >
                  محفظتي
                </li>
                <li
                  className={`${activeBar === "userCourses" ? "active" : ""}`}
                  onClick={() => setActiveBar("userCourses")}
                >
                  كورساتي
                </li>
              </ul>
            </div>
            {activeBar === "userDetails" && (
              <PorfileContent>
                <h1 className="title-framework">حساب المستخدم</h1>{" "}
                <div className="profile-details">
                  <div className="img-container">
                    <img src="/images/nat.png"></img>
                  </div>
                  <div className="account-details">
                    <h3>{userData.name}</h3>
                    <h4>
                      <FontAwesomeIcon
                        icon={faMobileScreen}
                        style={{ color: "#74C0FC", marginLeft: "8px" }}
                      />
                      {userData.phoneNumber}
                    </h4>
                    <h4>
                      <FontAwesomeIcon
                        icon={faInbox}
                        style={{ color: "#FFD43B", marginLeft: "8px" }}
                      />
                      {userData.email}
                    </h4>
                  </div>
                </div>
              </PorfileContent>
            )}
            {activeBar === "userBocket" && <PorfileContent></PorfileContent>}
            {activeBar === "userCourses" && (
              <PorfileContent>
                <div className="crs-container">
                  {enrolledCoursesData.map((dataCrs) => (
                    <Courses
                      style={{ transform: "scale(0.8)" }}
                      dataCrs={dataCrs}
                      isOpactiy={true}
                      key={dataCrs._id}
                    />
                  ))}
                </div>
              </PorfileContent>
            )}
          </div>
        </>
      ) : (
        <div className="overlayConfrimMessage">
          <div className={`confirmCard ${!firstCssRender ? "fs-render" : ""}`}>
            <MessageTitle>تحتاج لتسجيل دخولك اولا </MessageTitle>
            <div>
              <Link to={"/login"} className="btn">
                تسجيل دخول
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function PorfileContent({ children }) {
  return <div className="profile-content">{children}</div>;
}
